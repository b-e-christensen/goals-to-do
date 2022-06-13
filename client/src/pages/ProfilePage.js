import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { GET_USER_ALL } from '../utils/queries'
import Navbar from '../components/Navbar'

const ProfilePage = (props) => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if(!token) {
      window.location.href = "/"
  }


  const [formState, setFormState] = useState({ email: '', password: '' });
  const [updateUser] = useMutation(UPDATE_USER);
  const { data, refetch } = useQuery(GET_USER_ALL);
  const userInfo = data?.getUser || {};

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      await updateUser({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: '',
      password: '',
      username: '',
    });
    refetch()
  };


  return (
  
    <main className="flex-row justify-center mb-4">
        <Navbar/>
        <div className="col-12 col-lg-10">
        {userInfo ? (    
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Profile</h4>
          <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                 <input
                  className="form-input"
                  placeholder={userInfo.username}
                  name="username"
                  type="username"
                  value={formState.username}
                  onChange={handleChange}
                />  
                <input
                  className="form-input"
                  placeholder={userInfo.email}
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
          </div>
        </div>) : ('')
}
      </div>
    </main>
      
  )};

export default ProfilePage;