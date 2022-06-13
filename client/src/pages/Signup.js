import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: {...userFormData}
      });

      if (error) {
        throw new Error('Something went wrong!');
      }

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
      {/* This is needed for the validation functionality above */}
      <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
        <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
        <div className="card-body">
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Form.Group className='form-group-custom '>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control className="form-input"
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='form-group-custom'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control className="form-input"
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='form-group-custom'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control className="form-input"
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button  className="btn btn-block btn-info"
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
       
      </Form>
      {error && (
        <Alert className="my-3 p-3 bg-danger text-white" show={showAlert} key='danger' variant='danger'>
                <Button
                    variant="danger" onClick={() => setShowAlert(false)}>
                    {error.message}
                </Button>
        </Alert>)}
      </div>
      </div>
      </div>
      </main>
    </>
  );
};

export default SignupForm;