import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

function Table() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: '', Author: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:4200/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const postBooks = async () => {
    try {
      await axios.post('http://localhost:4200/books/', formData);
      setFormData({ title: '', Author: '' });
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleEdit = (book) => {
    setFormData(book);
    setIsEditing(true);
    setEditId(book.id);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4200/books/${editId}`, formData);
      setFormData({ title: '', Author: '' });
      setIsEditing(false);
      fetchBooks();
      setShowModal(false);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4200/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitModal = (e) => {
    e.preventDefault();
    if (isEditing) {
      handleUpdate();
    } else {
      postBooks();
    }
  };

  return (
    <div className=' justify-content-center'>
      <Button variant="primary" onClick={() => setShowModal(true)} className="mx-5">Add book</Button>

      <Row className='align-items-center'>
        <Col>
          <table className="striped bordered hover table border border-secondary w-50 m-5">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th className='mx-3'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.Author}</td>
                  <td>
                    <Button variant="primary" className='mx-2' onClick={() => handleEdit(book)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(book.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className=''>{isEditing ? 'Edit Book' : 'Add Book'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitModal}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" name="title" value={formData.title} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" placeholder="Enter author" name="Author" value={formData.Author} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit" className="m-3 w-20">{isEditing ? 'Update' : 'Add'}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Table;
