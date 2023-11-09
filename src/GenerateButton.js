import React,{ useState } from 'react';
import OpenAI from "openai";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const encodeImage = (image) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      const base64Data = reader.result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

const getImageDescription = async (imagePath) => {
  const headers = {
    'Access-Control-Allow-Origin': 'https://api.openai.com/v1/chat/completions',
    'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true', 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${OPENAI_API_KEY}`
  };
  console.log(imagePath);

  if (imagePath) {
    const base64Data = await encodeImage(imagePath);
    const payload = {
      "model": "gpt-4-vision-preview",
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": "What’s in this image?"
            },
            {
              "type": "image_url",
              "image_url": {
                "url": `data:image/jpeg;base64,${base64Data}`
              }
            }
          ]
        }
      ],
      "max_tokens": 100
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log(data);
    return data?.choices[0]?.message?.content;
  } else {
    return null;
  }
};

const getFinalDescription = async (imageDescription, text) => {
  // probably don't want to do this dangerously in the future
  const openai = new OpenAI({apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true});
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "system", "content": "You are a helpful real estate assistant that can generate listing descriptions based on the info provided."},
        {"role": "user", "content": `generate a description based on this image description: ${imageDescription} and this text: ${text} Don't over emphasize the detailed features of the image, keep it high level. Only provide info relevant to the data you have.`}],
  });
  console.log(response);
  return response?.choices[0]?.message?.content
};

const GenerateButton = ({ fileContent, textContent, handleListingDescription }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    const imageDescription = await getImageDescription(fileContent);
    const result = await getFinalDescription(imageDescription, textContent);
    handleListingDescription(result);
    setLoading(false);
    return result
  };

  return (
    <div>
      { loading ? (
        <div>
          <p>Generating description...</p>
          <Spinner animation="border" variant="light" />
        </div>
      ) : (
        <Button variant="primary" onClick={handleClick}>
          Generate Listing Description
        </Button>
      )}

    </div>
  );
};

export default GenerateButton;
