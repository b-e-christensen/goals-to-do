import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TODO } from '../utils/mutations';
import TODOCard from './TODOCard';

const Todo = (props) => {
  const [formState, setFormState] = useState({ name: '', priority: 'Low' });
  const [formDisplayState, setFormDisplayState] = useState('collapsed')
  const [addTodo, { error }] = useMutation(ADD_TODO);

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
      await addTodo({
        variables: { ...formState },
      });

    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      name: '',
      priority: 'Low'
    });
  };

  return (
    <>
      {formDisplayState ? (
        <main className="flex-row justify-center mb-4">
        <div className="col-12 col-lg-10">
          <div className="w-100 text-center card-header bg-dark text-light p-2 display-flex justify-space-between align-center">
            <h4>Create A To Do</h4>
            <div className='plus radius' onClick={() => (setFormDisplayState(''))}></div>
          </div>
          <div className='m-5'>
            <TODOCard />
          </div>
        </div>  
        </main>
      ) : (

    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
        <div className="w-100 text-center card-header bg-dark text-light p-2 display-flex justify-space-between align-center">
                <h4>Create A To Do</h4>
                <div className='minus' onClick={() => (setFormDisplayState('collapsed'))}><span className="custom-color-m">X</span></div>
              </div>
          <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Name of todo"
                  name="name"
                  type="text"
                  value={formState.name}
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
    </main>)}
    </>
  );
};

export default Todo;
