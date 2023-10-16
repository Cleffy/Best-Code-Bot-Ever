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
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (!errorMessage){
      setUserFormData({ ...userFormData, [name]: value });
    }
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
       console.log(Auth.loggedIn())
    if (Auth.loggedIn() === false){
      //will most likely get rid of this code
      setErrorMessage(' A valid username, email and password are required.')
     console.log("Sign Up failed due to missing fields")
    } else {
       window.location.assign('/chat')
    }
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
        <Alert onClose={() => setShowAlert(false)} show={showAlert} style={{"color":"white"}}>
          A valid username, email and password are required.
        </Alert>
        <h3>Register</h3>
        <Form.Group className='mb-3'>
          {/*<Form.Label htmlFor='username'>Username</Form.Label>*/}
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
        
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
    </>
  );
};

export default RegisterForm;
