import React from 'react';
import Form from 'react-bootstrap/Form';

const TextInput = ({text, handleTextChange}) => {
  return (
    <div>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Listing Description</Form.Label>
        <Form.Control as="textarea" rows={5} value={text} onChange={handleTextChange}/>
      </Form.Group>
    </div>
  );
};

export default TextInput;