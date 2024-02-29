import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function MyFormModal() {
    const [showModal, setShowModal] = useState(false);
   
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
   
    return (
  <>
  <Button variant="primary" onClick={handleShow}>
          Open Modal
  </Button>
   
        <Modal show={showModal} onHide={handleClose}>
  <Modal.Header closeButton>
  <Modal.Title>Modal Title</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <Form>
  <Form.Group controlId="formBasicEmail">
  <Form.Label>Email address</Form.Label>
  <Form.Control type="email" placeholder="Enter email" />
  <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
  </Form.Text>
  </Form.Group>
   
              <Form.Group controlId="formBasicPassword">
  <Form.Label>Password</Form.Label>
  <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Button variant="primary" type="submit">
                Submit
  </Button>
  </Form>
  </Modal.Body>
  <Modal.Footer>
  <Button variant="secondary" onClick={handleClose}>
              Close
  </Button>
  </Modal.Footer>
  </Modal>
  </>
    );
  }
   
  export default MyFormModal;