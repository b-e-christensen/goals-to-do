import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Card, Container } from 'react-bootstrap';
import { GET_SINGLE_PROJECT } from '../utils/queries';
import GearButton from './GearButton'
import TaskModal from './TaskModal';
import { UPDATE_TASK, REMOVE_TASK } from '../utils/mutations';

function TaskCard({ projectId, collaborators }) {

  const [showTaskModal, setShowTaskModal] = useState({ boolean: false, taskId: '' })

  const { data, refetch } = useQuery(GET_SINGLE_PROJECT, {
    variables: { id: projectId },
  })

  const [updateTask] = useMutation(UPDATE_TASK);
  const [removeTask] = useMutation(REMOVE_TASK)
  const [viewState, setViewState] = useState('incomplete')

  useEffect(() => {
    refetch()
  })

  const tasks = data?.getSingleProject.tasks || []
  console.log(tasks)

  const openTaskModal = (param) => {
    console.log(param)
    setShowTaskModal({ boolean: true, taskId: param })
  }

  return (

    <Container>

      {viewState ? (
        <>
          <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
              <div className='display-flex justify-space-between'>

                <h2>
                  {tasks.length
                    ? `Viewing Incomplete Tasks:`
                    : 'Create a Task'}
                </h2>
                <button className='w-fit-content custom-btn-clr' onClick={() => { setViewState('') }}>View Completed Tasks</button>
              </div>
            </div>
          </main>

          {tasks.map((task) => {
            return (
              task.completed ? null : (
                <Card border='dark' className='custom-card-width'>
                  <Card.Body>

                    <Card.Title className='display-flex custom-fill-secondary'>
                      <h5 className='col-11 text-center'>{task.name} - <span className='created-by'>created by</span> {task.creator}</h5>
                      <GearButton className='col-1 gear-button'
                        onClick={() => openTaskModal(task._id)} />
                    </Card.Title>

                    {showTaskModal.boolean ? <TaskModal setShowTaskModal={setShowTaskModal} taskId={showTaskModal.taskId} collaborators={collaborators} /> : null}

                    <Card.Text>
                      <div className='display-flex justify-space-between h-fit-content'>
                        <div className='w-fit-content display-flex flex-column mt-5'>
                          <h6 className='mb-0'>Priority: {task.priority}</h6>
                        </div>
                        <div className='w-50 display-flex flex-column justify-space-around align-center'>
                          <button className='h-fit-content custom-btn-clr custom-btn-width m-1' onClick={(e) => {
                            updateTask({ variables: { taskId: task._id, name: task.name, assignees: task.assignees, priority: task.priority, completed: true } })
                            refetch()
                          }}>Mark as Complete</button>
                          <button className='m-1 custom-btn-clr custom-btn-width' onClick={(e) => {
                            removeTask({ variables: { _id: task._id, projectId: projectId } })
                            refetch()
                          }}>Remove</button>
                        </div>
                      </div>
                      {task.assignees[0] ? (
                        <div>
                          <h6>This task has been assigned to:</h6>
                          {task.assignees.map((assignee) => {
                            return (
                              <p className='mb-0 ml-2'>-- {assignee}</p>
                            )
                          })}
                        </div>) : ('')}

                    </Card.Text>
                  </Card.Body>
                </Card>
              ))
          })}
        </>) : (
        <>
          <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
              <div className='display-flex justify-space-between'>
                <h2>
                  {tasks.length
                    ? `Viewing Completed Tasks:`
                    : 'Create a Task'}
                </h2>
                <button className='w-fit-content custom-btn-clr' onClick={() => { setViewState('incomplete') }}>View Incomplete Tasks</button>
              </div>
            </div>
          </main>
          {tasks.map((task) => {
            return (
              task.completed ? null : (
                <Card border='dark' className='custom-card-width'>
                  <Card.Body>

                    <Card.Title className='display-flex custom-fill-secondary'>
                      <h5 className='col-11 text-center'>{task.name} - <span className='created-by'>created by</span> {task.creator}</h5>
                      <GearButton className='col-1 gear-button'
                        onClick={() => openTaskModal(task._id)} />
                    </Card.Title>

                    {showTaskModal.boolean ? <TaskModal setShowTaskModal={setShowTaskModal} taskId={showTaskModal.taskId} collaborators={collaborators} /> : null}

                    <Card.Text>
                      <div className='display-flex justify-space-between h-fit-content'>
                        <div className='w-fit-content display-flex flex-column mt-5'>
                          <h6 className='mb-0'>Priority: {task.priority}</h6>
                        </div>
                        <div className='w-50 display-flex flex-column justify-space-around align-center'>
                          <button className='h-fit-content custom-btn-clr custom-btn-width m-1' onClick={(e) => {
                            updateTask({ variables: { taskId: task._id, name: task.name, assignees: task.assignees, priority: task.priority, completed: false } })
                            refetch()
                          }}>Completed</button>
                          <button className='m-1 custom-btn-clr custom-btn-width' onClick={(e) => {
                            removeTask({ variables: { _id: task._id, projectId: projectId } })
                            refetch()
                          }}>Remove</button>
                        </div>
                      </div>
                      {task.assignees[0] ? (
                        <div>
                          <h6>This task has been assigned to:</h6>
                          {task.assignees.map((assignee) => {
                            return (
                              <p className='mb-0 ml-2'>-- {assignee}</p>
                            )
                          })}
                        </div>) : ('')}

                    </Card.Text>
                  </Card.Body>
                </Card>
              ))
          })}
        </>
      )}
    </Container>


  )
}

export default TaskCard