import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import {ADD_USER} from '../utils/mutations';
import {useMutation} from '@apollo/client';
import Auth from '../utils/auth';

const RegisterForm = () => {
  // Sets initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // Sets state for form validation
  const [validated] = useState(false);
  // Sets state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [addUser] = useMutation(ADD_USER)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Checks if form has all required inputs 
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
        const{data} = await addUser({variables:{...userFormData} })
        console.log(data)


      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      {/* Necessary for validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* Displays an alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          There was an error completing your sign up.
        </Alert>
        <h3>Register</h3>
        <Form.Group className='mb-3'>
          {/*<Form.Label htmlFor='username'>Username</Form.Label>*/}
          <Form.Control
            type='text'
            placeholder='Name'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          {/*<Form.Label htmlFor='email'>Email</Form.Label>*/}
          <Form.Control
            type='email'
            placeholder='Email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          {/*<Form.Label htmlFor='password'>Password</Form.Label>*/}
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required.</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;
