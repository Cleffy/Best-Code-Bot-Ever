import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { validateEmail } from '../utils/helpers';
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

    // if (!event.target.value.length){
    //   setErrorMessage(`${event.target.name} is required.`)
    // } else {
    //   setErrorMessage('')
    // }
    // if (event.target.name === 'email') {
    //   const isValid = validateEmail(event.target.value);
    //   // isValid conditional statement
    //   if (!isValid) {
    //     setErrorMessage('Your email is invalid.');
    //   } else {
    //     setErrorMessage('');
    //   }
    // }
    // if (event.type === 'blur' && !event.target.value.length){
    //   setErrorMessage(`${event.target.name} field is required`);
    // } else {
    //   setErrorMessage('');
    // }
    if (!errorMessage){
      setUserFormData({ ...userFormData, [name]: value });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // if (!userFormData.username || !userFormData.email || !userFormData.password){
    //   setErrorMessage('All fields are required.')
    // }
    // console.log(userFormData)
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
      setErrorMessage('Something went wrong.')
     
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
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
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
            defaultValue={userFormData.username}
            required
          />
          {/* <Form.Control.Feedback type='invalid'>Username is required.</Form.Control.Feedback> */}
        </Form.Group>

        <Form.Group className='mb-3'>
          {/*<Form.Label htmlFor='email'>Email</Form.Label>*/}
          <Form.Control
            type='email'
            placeholder='Email'
            name='email'
            onChange={handleInputChange}
          defaultValue={userFormData.email}
            required
          />
          {/* <Form.Control.Feedback type='invalid'>Email is required.</Form.Control.Feedback> */}
        </Form.Group>

        <Form.Group className='mb-3'>
          {/*<Form.Label htmlFor='password'>Password</Form.Label>*/}
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleInputChange}
          defaultValue={userFormData.password}
            required
          />
          {/* <Form.Control.Feedback type='invalid'>Password is required.</Form.Control.Feedback> */}
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
