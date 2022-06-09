import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_SINGLE_PROJECT } from '../utils/queries';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import CollaboratorModal from './CollaboratorModal'
import { ADD_TASK } from '../utils/mutations';
import TaskCard from './TaskCard';
import Auth from '../utils/auth';

function SingleProject() {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if(!token) {
      window.location.href = "/"
  }


  const { projectId } = useParams()
  console.log(projectId)
  const { loading, data, refetch } = useQuery(GET_SINGLE_PROJECT, {
    variables: { id: projectId },
  })

  const project = data?.getSingleProject || []
  const collaborators = project.collaborators || []

  useEffect(() => {
    refetch()
  })
  
  console.log(project)

  const [formDisplayState, setFormDisplayState] = useState('collapsed')
  const [formState, setFormState] = useState({ name: '', priority: 'Low' });
  const [assigneesState, setAssigneesState] = useState([])

  const [addTask] = useMutation(ADD_TASK)

  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  let assigneesArr = [...assigneesState]

  console.log(assigneesArr)
  console.log(assigneesState)



  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  console.log(formState)
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    console.log([...assigneesState])
    const arrOfObj = []
    assigneesArr.map((assignee) => {
      arrOfObj.push({
        assignee
      })
    } )
    console.log(arrOfObj)
    try {
      const { data } = await addTask({
        variables: { 
          name: formState.name,
          priority: formState.priority,
          assignees: [...assigneesState],
          projectId: projectId
        },
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      name: '',
      priority: 'Low',
      completeByDate: ''
    });
  };

  const assigneesFunction = async (id) => {

    const checkbox = document.getElementById(id)

    if (checkbox.checked) {
      setAssigneesState([
        ...assigneesState,
        checkbox.value
      ])
    } else if (!checkbox.checked) {
      const assignees = assigneesArr.filter((assignee) => assignee !== checkbox.value)
      setAssigneesState([...assignees])
    }
  }


  return (
    <>
      <Navbar />
      <div className='display-flex h-100'>
        <div className='w-75 display-flex justify-center align-center'><h4 className='text-center custom-color-m'>{project.name}</h4></div>
        <div className='w-25 overflow-scroll'>
          <div className='display-flex justify-space-between mr-3 mt-3 align-items'><h4 className='custom-color-m'>Collaborators</h4><div className='plus radius' onClick={openModal}></div>
            {showModal ? <CollaboratorModal setShowModal={setShowModal} projectId={projectId} /> : null}
          </div>
          {collaborators.map((collaborator) => {
            return (
              <div>
                <p className='custom-color-m'>{collaborator.name} - {collaborator.email}</p>
              </div>
            )
          })}
        </div>
      </div>

      {formDisplayState ? (
        <main className="flex-row justify-center mb-4">
          <div className="col-12 col-lg-10 text-center card-header bg-dark text-light p-2 display-flex justify-space-between align-center">
            <h4>Create A Task</h4>
            <div className='plus radius' onClick={() => (setFormDisplayState(''))}></div>
          </div>
        </main>
      ) : (
        <main className="flex-row justify-center mb-4">
          <div className="col-12 col-lg-10">
            <div className="card">
              <div className="w-100 text-center card-header bg-dark text-light p-2 display-flex justify-space-between align-center">
                <h4>Create A Task</h4>
                <div className='minus' onClick={() => (setFormDisplayState('collapsed'))}>X</div>
              </div>
              <div className="card-body">

                <form onSubmit={handleFormSubmit}>
                  <input
                    className="form-input"
                    placeholder="Name of task"
                    name="name"
                    type="text"
                    value={formState.task}
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
                          onChange={(e) => assigneesFunction(collaborator.email)}></input>
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


              </div>
            </div>
            
          </div>
        </main>
      )}
        <TaskCard projectId={projectId}/>
    </>
  )
}

export default SingleProject