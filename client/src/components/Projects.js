import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_PROJECTS } from '../utils/queries';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ADD_PROJECT, REMOVE_PROJECT } from '../utils/mutations';
import Auth from '../utils/auth';

function Projects() {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    window.location.href = "/"
  }

  const { data, refetch } = useQuery(GET_PROJECTS)
  const userInfo = data?.getUser.projects || []
  const userEmail = data?.getUser.email || []


  const [removeProject] = useMutation(REMOVE_PROJECT)

  useEffect(() => {
    refetch()
  })

  const [formDisplayState, setFormDisplayState] = useState('collapsed')
  const [formState, setFormState] = useState({ name: '' });
  const [addProject] = useMutation(ADD_PROJECT)

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
      const { data } = await addProject({
        variables: { ...formState },
      });
      console.log(data)
    } catch (e) {
      console.error(e);
    }
    // clear form values
    setFormDisplayState('collapsed');
  };

  return (
    <>
      <div>
        {formDisplayState ? (
          <div className='flex-display flex-row justify-center align-center w-100 mt-4'>
            <h4 className='custom-color-m'>Your Projects</h4>
            <div className='plus radius ml-5' onClick={() => (setFormDisplayState(''))}></div>
          </div>) : (
          <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10 custom-color-m">
              <h4 className='text-center mt-4 custom-color-m'>Your Projects</h4>
              <div className="card">
                <div className="w-100 text-center card-header bg-dark text-light p-2 display-flex justify-space-between align-center">
                  <h4>Create A Project</h4>
                  <div className='minus' onClick={() => (setFormDisplayState('collapsed'))}><span className="custom-color-m">X</span></div>
                </div>
                <div className="card-body">

                  <form onSubmit={handleFormSubmit}>
                    <input
                      className="form-input"
                      placeholder="Name of task"
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
                </div>
              </div>
            </div>
          </main>
        )}
      </div>
      <Container>
        {userInfo.map((project) => {
          let lastViewed = project.collaborators.filter((collaborator) => collaborator.email === userEmail)
          return (
            <Card className='m-3 display-flex justify-space-between custom-fill-secondary'>
              <Link
                to={`/projects/${project._id}`}>
                <h5 className='m-2'>{project.name}
                {project.groupChat.length - +lastViewed[0].lastViewed ? (
                  <span className="message-time ml-4">
                  -- <i>you have {project.groupChat.length - (+lastViewed[0].lastViewed)} new message(s)</i>
                  </span>
                ) : null }
                
                </h5>
              </Link>
              <button className='custom-btn-clr custom-btn-width project-button m-1'
              onClick={(e) => {
                if(project.collaborators.length === 1) {
                  let deleteProject = prompt(`You are the last person on this project. If you leave it will be deleted permanently. Enter the name of this project, "${project.name}" to delete it.`)
                  if(!deleteProject) {
                    return
                  } else if (deleteProject.toLocaleLowerCase() === project.name.toLocaleLowerCase()) {
                  removeProject({ variables: { _id: project._id, remove: true }})
                  refetch()}
                } else {
                  removeProject({ variables: { _id: project._id, remove: false }})
                  refetch()}
              }} >Leave Project</button>
            </Card>
          )
        })}
      </Container>
    </>
  )
}

export default Projects