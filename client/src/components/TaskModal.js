import React, { useRef, useState } from "react";
import ReactDom from "react-dom";
import { useMutation } from '@apollo/client';
import { UPDATE_TASK } from '../utils/mutations';

const TaskModal = ({ setShowTaskModal, taskId, collaborators }) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowTaskModal({ boolean: false });
    }
  };

  const [formState, setFormState] = useState({ name: '', priority: 'High', _id: taskId });
  const [assigneesState, setAssigneesState] = useState([])
  let assigneesArr = [...assigneesState]

  const [updateTask] = useMutation(UPDATE_TASK);
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
    const arrOfObj = []
    assigneesArr.map((assignee) => {
      return (
        arrOfObj.push({
          assignee
        })
      )
    })

    try {
      const { data } = await updateTask({
        variables: {
          name: formState.name,
          priority: formState.priority,
          assignees: [...assigneesState],
          taskId: taskId,
        },
      });

    } catch (e) {
      console.error(e);
    }

    // clear form values
    setShowTaskModal({ boolean: false });
  };

  const assigneesFunction = async (name) => {
    if (!assigneesArr.includes(name)) {
      setAssigneesState([
        ...assigneesState,
        name
      ])
    } else if (assigneesArr.includes(name)) {
      const assignees = assigneesArr.filter((assignee) => assignee !== name)
      setAssigneesState([...assignees])
    }
  }

  //render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal display-flex flex-column">
        <h5 className='m-3'>Edit Task</h5>
        <form onSubmit={handleFormSubmit}>
          <input
            className="form-input"
            placeholder="Name of task"
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
          <br></br>

          <label>Assign Collaborators</label>
          {collaborators.map((collaborator) => {
            return (
              <div className='ml-3'>
                <input type='checkbox'
                  id={collaborator.email}
                  name="assignees"
                  value={collaborator.name}
                  onChange={(e) => assigneesFunction(collaborator.name)}
                ></input>
                <label>{collaborator.name}</label><br></br>
              </div>
            )
          })}

          <button
            className="btn btn-block btn-info"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            Submit
          </button>
        </form>
        <button className='modal-button w-25' onClick={() => setShowTaskModal({ boolean: false })}>X</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default TaskModal;