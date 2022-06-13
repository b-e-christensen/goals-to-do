import React, { useRef, useState } from "react";
import ReactDom from "react-dom";
import { useMutation } from '@apollo/client';
import { UPDATE_TODO } from '../utils/mutations';

const ToDoModal = ({ setShowToDoModal, todoId }) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowToDoModal({ boolean: false });
    }
  };

  const [formState, setFormState] = useState({ name: '', priority: 'High', completed: false,  _id: todoId });
  
  const [updateToDo] = useMutation(UPDATE_TODO);


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

    try {
      const { data } = await updateToDo({
        variables: { ...formState },
      });

    } catch (e) {
      console.error(e);
    }

    // clear form values
    setShowToDoModal({ boolean: false });
  };

  //render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal display-flex flex-column">
        <h5 className='m-3'>Edit TODO</h5>
        <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Name of ToDo"
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
        <button className='modal-button w-25' onClick={() => setShowToDoModal({ boolean: false})}>X</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default ToDoModal;