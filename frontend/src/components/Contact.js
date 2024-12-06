import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
const Contact = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    let newContact = {
      name: name,
      surname: surname,
      email: email,
      comment: comment,
    };
    await axios
      .post("http://localhost:5000/addContact", newContact)
      .then(() => console.log("Added"))
      .catch((err) => console.log("Not added " + err));
  };
  return (
    <Container>
      <Form onSubmit={handelSubmit}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Contact;
