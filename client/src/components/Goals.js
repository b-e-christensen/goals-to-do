import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_GOAL } from '../utils/mutations';
import GoalCard from './GoalCard'
// Here we are importing a CSS file as a dependency
import '../styles/Header.css';

function Goals() {

  const [formState, setFormState] = useState({ name: '', priority: 'Low', completeByDate: '' });
  const [formDisplayState, setFormDisplayState] = useState('collapsed')
  const [addGoal, { error }] = useMutation(ADD_GOAL);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(formState)
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addGoal({
        variables: { ...formState },
      });

    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormDisplayState({
      name: '',
      priority: 'Low',
      completeByDate: ''
    });
  };

  return (
    <>
      {formDisplayState ? (
        <main className="flex-row justify-center mb-4">
        <div className="col-12 col-lg-10">
          <div className="w-100 text-center card-header bg-dark text-light p-2 display-flex justify-space-between align-center">
            <h4>Create A Goal</h4>
            <div className='plus radius' onClick={() => (setFormDisplayState(''))}></div>
          </div>
          <div className='m-5'>
            <GoalCard />
          </div>
        </div>  
        </main>
      ) : (
        <main className="flex-row justify-center mb-4">
          <div className="col-12 col-lg-10">
            <div className="card">
            <div className="w-100 text-center card-header bg-dark text-light p-2 display-flex justify-space-between align-center">
                <h4>Create A Goal</h4>
                <div className='minus' onClick={() => (setFormDisplayState('collapsed'))}>X</div>
              </div>
              <div className="card-body">

                <form onSubmit={handleFormSubmit}>
                  <input
                    className="form-input"
                    placeholder="Name of goal"
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                  />
                  <label>
                    Priority
                    <select
                      className="form-input"
                      placeholder="Priority"
                      name="priority"
                      value={formState.priority}
                      onChange={handleChange}
                    >
                      <option value='Low'>Low</option>
                      <option value='Medium'>Medium</option>
                      <option value='High'>High</option>
                    </select>
                  </label>
                  <input
                    className="form-input"
                    placeholder="Date to complete by"
                    name="completeByDate"
                    type="date"
                    value={formState.completeByDate}
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

                {error && (
                  <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                  </div>
                )}
              </div>
            </div>
            <GoalCard />
          </div>
        </main>
      )}

    </>
  );
}
export default Goals;