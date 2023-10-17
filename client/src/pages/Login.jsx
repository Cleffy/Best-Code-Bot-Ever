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
  const [errorMessage, setErrorMessage] = useState('')

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

      if (Auth.loggedIn() === false){
        //will most likely get rid of this code
          setErrorMessage('A valid email and password are required.')
       console.log("Log In failed due to missing fields")
      } else {
         window.location.assign('/chat')
      }
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
    <section className="formGroup">
      {/* Necessary for validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* Displays an alert if server response is bad */}
        <Alert onClose={() => setShowAlert(false)} show={showAlert} style={{"color":"white"}}>
          A valid email and password are required.
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
       
        </Form.Group>
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
        <Button

          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </section>
  );
};

export default LoginForm;

