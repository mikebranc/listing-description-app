import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import TextInput from './TextInput';
import GenerateButton from './GenerateButton';
import Form from 'react-bootstrap/Form';


function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [listingDescription, setListingDescription] = React.useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log(selectedFile)
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    console.log(text)
  };

  return (
    <div className="App">
      <div className='content'>
        <h1>Listing Description Generator</h1>
        <Form className='formData'>
          <FileUpload file={file} handleFileChange={handleFileChange}/>
          <TextInput text={text} handleTextChange={handleTextChange}/>
        </Form>
        <GenerateButton fileContent={file} textContent={text} handleListingDescription={setListingDescription} />
        {listingDescription && 
          <div className='text-start w-100 mt-5'>
            <h3>Generated Description:</h3>
            <p>
              {listingDescription}
            </p>
          </div>
        }
      </div>
    </div>
  );
}

export default App;