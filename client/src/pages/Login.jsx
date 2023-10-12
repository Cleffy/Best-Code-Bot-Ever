import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import {LOGIN} from '../utils/mutations';
import {useMutation} from '@apollo/client';
import Auth from '../utils/auth';

const LoginForm = () => {
  // Sets initial form state
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  // Sets state for form validation
  const [validated] = useState(false);
  // Sets state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [login] = useMutation(LOGIN)

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
        const{data} = await login({variables:{...userFormData} })
        console.log(data)


      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
    // Resets form after submit button is pushed
    setUserFormData({
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
        <h3>Log In</h3>
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
          {/* <Form.Control.Feedback type='invalid'>Password is required.</Form.Control.Feedback> */}
        </Form.Group>
        <Button

          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;

