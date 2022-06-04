import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Card } from 'react-bootstrap';
import { GET_USER_ALL } from '../utils/queries'
import StepModal from './StepModal'
import { UPDATE_STEP, REMOVE_STEP, UPDATE_GOAL, REMOVE_GOAL } from '../utils/mutations';


const GoalCard = (props) => {
  const { loading, data, refetch } = useQuery(GET_USER_ALL);

  useEffect(() => {
    refetch()
  })

  const userInfo = data?.getUser.goals || [];

  const [userState, setUserState] = useState([...userInfo])
  const [showModal, setShowModal] = useState(false)
  const [stepState, setStepState] = useState([])
  const [viewState, setViewState] = useState('incomplete')

  const [updateStep] = useMutation(UPDATE_STEP);
  const [removeStep] = useMutation(REMOVE_STEP);
  const [updateGoal] = useMutation(UPDATE_GOAL)
  const [removeGoal] = useMutation(REMOVE_GOAL)

  let stepArray = []

  if (stepState[0]) {
    stepArray = stepState
  } else {
    stepArray = Object.keys(stepState)
  }

  const openModal = () => {
    setShowModal(true)
  }

  const showSteps = (goalId) => {
    setStepState({
      ...stepState,
      [goalId]: { step: true }
    })
  }

  const closeSteps = (goalId) => {
    const steps = stepArray.filter((step) => step !== goalId)
    setStepState([...steps])
  }

  return (
    <Container>
    {/* initial render will display incomplete goals */}
      {viewState ? (
        <>
          <div className='display-flex justify-space-between'>
            <h2>
              {userInfo.length
                ? `Viewing Incomplete Goals:`
                : 'Create a Goal'}
            </h2>
            <button className='w-fit-content' onClick={() => { setViewState('') }}>View Complete Goals</button>
          </div>

          {userInfo.map((goal) => {
            return (
              goal.completed ? ('') : (
                <Card key={goal._id} border='dark'>
                  <Card.Body>
                    <Card.Title className='text-center'>
                      <h5>{goal.name}</h5>
                    </Card.Title>
                    <div className='display-flex justify-space-between'>
                      <Card.Text>
                        <div className='w-fit-content display-flex flex-column mt-5'>
                          <p className='mb-0'>Priority: {goal.priority}</p>
                          <p className='mb-0'>Complete by date: {new Date(+goal.completeByDate).toLocaleString("en-US", { day: "numeric", "month": "numeric", "year": "numeric" })}</p>
                          <p>Steps: {goal.steps.length}</p>
                        </div>
                      </Card.Text>
                      <div className='w-25 display-flex flex-column justify-space-around align-center'>
                        <button className='w-fit-content' onClick={(e) => showSteps(goal._id)}>Add/View Steps</button>
                        {goal.completed ?
                          (<button className='w-fit-content' onClick={(e) => {
                            updateGoal({ variables: { _id: goal._id, name: goal.name, completeByDate: goal.completeByDate, priority: goal.priority, completed: false } })
                            refetch()
                          }}>Completed!</button>) :
                          (<button className='w-fit-content' onClick={(e) => {
                            updateGoal({ variables: { _id: goal._id, name: goal.name, completeByDate: goal.completeByDate, priority: goal.priority, completed: true } })
                            refetch()
                          }}>Mark as Complete</button>)}
                        <button className='w-fit-content' onClick={(e) => {
                          removeGoal({ variables: { _id: goal._id } })
                          refetch()
                        }}>Remove</button>
                      </div>
                    </div>
                    {stepArray.includes(goal._id) ? (
                      <>
                        <div key={goal._id} className='mt-3 ml-5'>
                          <div className='b-border display-flex justify-space-between'>
                            <h6>Step(s) to complete {goal.name}</h6>
                            <button className='w-fit-content' onClick={openModal}>Add Step</button>
                            {showModal ? <StepModal setShowModal={setShowModal} goalId={goal._id} /> : null}
                          </div>
                          <div className='display-flex flex-column'>
                            {goal.steps.map((step) => (
                              step.completed ? (
                                <div key={step._id} className='display-flex flex-row justify-space-between'>
                                  <p className='b-border-step ml-5 line-through'>{step.name}</p>
                                  <div className='w-25 display-flex flex-end justify-space-around'>
                                    <button className='w-fit-content' onClick={(e) => {
                                      updateStep({ variables: { _id: step._id, name: step.name, completed: false } })
                                      refetch()
                                    }}>Completed!</button>
                                    <button className='w-fit-content' onClick={(e) => {
                                      removeStep({ variables: { _id: step._id, goalId: goal._id } })
                                      refetch()
                                    }}>Remove</button>
                                  </div>
                                </div>
                              ) : (
                                <div key={step._id} className='display-flex flex-row justify-space-between'>
                                  <p className='b-border-step ml-5'> - {step.name}</p>
                                  <div className='w-25 display-flex flex-end justify-space-around'>
                                    <button className='w-fit-content' onClick={(e) => {
                                      updateStep({ variables: { _id: step._id, name: step.name, completed: true } })
                                      refetch()
                                    }}>Mark Complete</button>
                                    <button className='w-fit-content' onClick={(e) => {
                                      removeStep({ variables: { _id: step._id, goalId: goal._id } })
                                      refetch()
                                    }}>Remove</button>
                                  </div>
                                </div>
                              )
                            ))}
                            <button className='w-fit-content' onClick={() => closeSteps(goal._id)}>Close Steps</button>
                          </div>
                        </div>
                      </>) : ('')}
                  </Card.Body>
                </Card>
              ))
          })}

        </>) : 
        // displays all the completed goals
        (<>
          <div className='display-flex justify-space-between'>
            <h2>
              {userInfo.length
                ? `Viewing Completed Goals:`
                : 'Create a Goal'}
            </h2>
            <button className='w-fit-content' onClick={() => { setViewState('incomplete') }}>View Incomplete Goals</button>
          </div>
          {userInfo.map((goal) => {
            return (
              goal.completed ? (
                <Card key={goal._id} border='dark'>
                  <Card.Body>
                    <Card.Title className='text-center'>
                      <h5>{goal.name}</h5>
                    </Card.Title>
                    <div className='display-flex justify-space-between'>
                      <Card.Text>
                        <div className='w-fit-content display-flex flex-column mt-5'>
                          <p className='mb-0'>Priority: {goal.priority}</p>
                          <p className='mb-0'>Complete by date: {new Date(+goal.completeByDate).toLocaleString("en-US", { day: "numeric", "month": "numeric", "year": "numeric" })}</p>
                          <p>Steps: {goal.steps.length}</p>
                        </div>
                      </Card.Text>
                      <div className='w-25 display-flex flex-column justify-space-around align-center'>
                        <button className='w-fit-content' onClick={(e) => showSteps(goal._id)}>Add/View Steps</button>
                        {goal.completed ?
                          (<button className='w-fit-content' onClick={(e) => {
                            updateGoal({ variables: { _id: goal._id, name: goal.name, completeByDate: goal.completeByDate, priority: goal.priority, completed: false } })
                            refetch()
                          }}>Completed!</button>) :
                          (<button className='w-fit-content' onClick={(e) => {
                            updateGoal({ variables: { _id: goal._id, name: goal.name, completeByDate: goal.completeByDate, priority: goal.priority, completed: true } })
                            refetch()
                          }}>Mark as Complete</button>)}
                        <button className='w-fit-content' onClick={(e) => {
                          removeGoal({ variables: { _id: goal._id } })
                          refetch()
                        }}>Remove</button>
                      </div>
                    </div>
                    {stepArray.includes(goal._id) ? (
                      <>
                        <div key={goal._id} className='mt-3 ml-5'>
                          <div className='b-border display-flex justify-space-between'>
                            <h6>Step(s) to complete {goal.name}</h6>
                            <button className='w-fit-content' onClick={openModal}>Add Step</button>
                            {showModal ? <StepModal setShowModal={setShowModal} goalId={goal._id} /> : null}
                          </div>
                          <div className='display-flex flex-column'>
                            {goal.steps.map((step) => (
                              step.completed ? (
                                <div key={step._id} className='display-flex flex-row justify-space-between'>
                                  <p className='b-border-step ml-5 line-through'>{step.name}</p>
                                  <div className='w-25 display-flex flex-end justify-space-around'>
                                    <button className='w-fit-content' onClick={(e) => {
                                      updateStep({ variables: { _id: step._id, name: step.name, completed: false } })
                                      refetch()
                                    }}>Completed!</button>
                                    <button className='w-fit-content' onClick={(e) => {
                                      removeStep({ variables: { _id: step._id, goalId: goal._id } })
                                      refetch()
                                    }}>Remove</button>
                                  </div>
                                </div>
                              ) : (
                                <div key={step._id} className='display-flex flex-row justify-space-between'>
                                  <p className='b-border-step ml-5'> - {step.name}</p>
                                  <div className='w-25 display-flex flex-end justify-space-around'>
                                    <button className='w-fit-content' onClick={(e) => {
                                      updateStep({ variables: { _id: step._id, name: step.name, completed: true } })
                                      refetch()
                                    }}>Mark Complete</button>
                                    <button className='w-fit-content' onClick={(e) => {
                                      removeStep({ variables: { _id: step._id, goalId: goal._id } })
                                      refetch()
                                    }}>Remove</button>
                                  </div>
                                </div>
                              )
                            ))}
                            <button className='w-fit-content' onClick={() => closeSteps(goal._id)}>Close Steps</button>
                          </div>
                        </div>
                      </>) : ('')}
                  </Card.Body>
                </Card>
              ) : (''))
          })}
        </>)}
    </Container>
  );
};

export default GoalCard;
