import React, { useRef, useState } from "react";
import ReactDom from "react-dom";
import { useMutation } from '@apollo/client';
import { ADD_COLLABORATOR } from '../utils/mutations';

const CollaboratorNodal = ({ setShowModal, projectId }) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  const [formState, setFormState] = useState({ email: '', id: projectId })
  const [addCollaborator] = useMutation(ADD_COLLABORATOR);

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
      const { data } = await addCollaborator({
        variables: { ...formState },
      });
      console.log(formState);
      console.log(data);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setShowModal(false);
  };

  //render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal display-flex flex-column">
        <h5 className='m-3'>Add Collaborator</h5>
        <form className='w-75' onSubmit={handleFormSubmit}>
          <input
            className="form-input"
            placeholder="Collaborator's Email"
            name="email"
            type="text"
            value={formState.email}
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
        <button className='modal-button w-25' onClick={() => setShowModal(false)}>X</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default CollaboratorNodal;