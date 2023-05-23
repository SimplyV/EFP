import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/login', {email, password })
    .then((response) => {
      localStorage.setItem('super_site_token', response.data.token)
      navigate('/profile')
    })
    .catch((err) => {
      console.error(err);
    })
  }

  return(
    <Form className="container" onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
  
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  );
}

export default LoginForm;