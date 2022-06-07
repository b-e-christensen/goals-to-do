import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TODO } from '../utils/mutations';
import TODOCard from './TODOCard';

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
          <h4 className="card-header bg-dark text-light p-2">Create To Do</h4>
          <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Name of todo"
                  name="name"
                  type="text"
                  value={formState.todo}
                  onChange={handleChange}
                />
                <label>
                  Priority
                  <select value={formState.priority} onChange={handleChange} name="priority" className="form-input">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </label>
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div> 
        <TODOCard />
       
      </div>
    </main>
  );
};

export default Todo;
