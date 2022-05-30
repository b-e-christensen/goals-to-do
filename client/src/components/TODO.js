import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_TODO } from '../utils/mutations';


const Todo = (props) => {
  const [formState, setFormState] = useState({ name: '', priority: '' });
  const [addTodo, { error, data }] = useMutation(ADD_TODO);

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
      const { data } = await addTodo({
        variables: { ...formState },
      });

      console.log(data);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      name: '',
      priority: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Create ToDo</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/dashboard">back to the dashboard.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Name of todo"
                  name="name"
                  type="text"
                  value={formState.todo}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Priority"
                  name="priority"
                  type="text"
                  value={formState.priority}
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
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Todo;
