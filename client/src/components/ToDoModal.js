import React, { useRef, useState } from "react";
import ReactDom from "react-dom";
import { useMutation } from '@apollo/client';
import { EDIT_TODO } from '../utils/mutations';

const StepModal = ({ setShowStepModal, goalId }) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowStepModal(false);
    }
  };

  const [formState, setFormState] = useState({ name: '', goalId: goalId });
  // const [addStep, { error, data }] = useMutation(ADD_STEP);
  const [addStep, { error, data }] = useMutation(EDIT_TODO);

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
      const { data } = await addStep({
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
    });
  };

  //render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal display-flex flex-column">
        <h5 className='m-3'>Edit TODO</h5>
        <form className='w-75' onSubmit={handleFormSubmit}>
          <input
            className="form-input"
            placeholder="Name of TODO"
            name="name"
            type="text"
            value={formState.name}
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
        <button className='modal-button w-25' onClick={() => setShowStepModal(false)}>X</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default StepModal;