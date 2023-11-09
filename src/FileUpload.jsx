import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

const FileUpload = ({file, handleFileChange}) => {
  return (
    <div>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Select Listing Image</Form.Label>
        <Form.Control type="file" accept=".txt, .png, .jpeg, .jpg" onChange={handleFileChange}/>
      </Form.Group>
    </div>
  );
};

export default FileUpload;