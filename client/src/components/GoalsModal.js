import React, { useRef, useState } from "react";
import ReactDom from "react-dom";
import { useMutation } from '@apollo/client';
import { UPDATE_GOAL } from '../utils/mutations';

const GoalsModal = ({ setShowGoalModal, goalId }) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      // refactored state here to have boolean as a value as that is what the ternary is checking to be true or false
      setShowGoalModal({ boolean: false });
    }
  };

  const [formState, setFormState] = useState({ name: '', priority: 'Low', completeByDate: '', completed: false, _id: goalId });
  const [updateGoal, { error, data }] = useMutation(UPDATE_GOAL);

  console.log(formState)

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await updateGoal({
        variables: { ...formState },
      });
      console.log(formState);
      console.log(data);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      name: '',
      priority: 'Low',
      completeByDate: '',
      completed: false
    });
  };

  //render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal display-flex flex-column">
        <h5 className='m-3'>Edit Goal</h5>
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
        {/* refactored state again to have boolean as a value */}
        <button className='modal-button w-25' onClick={() => setShowGoalModal({ boolean: false})}>X</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default GoalsModal;