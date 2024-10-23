import React from 'react';
import { Toast } from 'react-bootstrap';

const MyToast = (props) => {
  return (
    <Toast
      className="bg-success text-white"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '9999'
      }}
      show={props.show}
      delay={3000}
      autohide
    >
      <Toast.Body>{props.message}</Toast.Body>
    </Toast>
  );
};

export default MyToast;
