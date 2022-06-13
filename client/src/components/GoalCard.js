import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Card } from 'react-bootstrap';
import { GET_USER_ALL } from '../utils/queries'
import StepModal from './StepModal'
import GoalsModal from './GoalsModal'
import GearButton from './GearButton'
import { UPDATE_STEP, REMOVE_STEP, UPDATE_GOAL, REMOVE_GOAL } from '../utils/mutations';


const GoalCard = (props) => {
  const { data, refetch } = useQuery(GET_USER_ALL);

  useEffect(() => {
    refetch()
  })

  const userInfo = data?.getUser.goals || [];

  // const [userState, setUserState] = useState([...userInfo]) unused vars 
  const [showStepModal, setShowStepModal] = useState(false)
  // changed goalModal state to be able to hold boolean value and goalId value
  const [showGoalModal, setShowGoalModal] = useState({ boolean: false, goalId: '' })
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

  const openStepModal = () => {
    setShowStepModal(true)
  }

  const openGoalModal = (param) => {
    // param holds the goal id made from the button click. its stored in state to pass it to GoalModal component
    setShowGoalModal({ boolean: true, goalId: param })
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
            <button className='w-fit-content custom-btn-clr' onClick={() => { setViewState('') }}>View Completed Goals</button>
          </div>
          {userInfo.map((goal) => {
            let priorityColor = goal.priority.toLowerCase()
            return (
              goal.completed ? ('') : (
                <Card key={goal._id} border='dark'>
                  <Card.Body>
                    <div className='display-flex custom-fill-secondary'>
                      <h5 className='col-11 text-center'>{goal.name}</h5>
                      <GearButton className='col-1 gear-button' onClick={() => openGoalModal(goal._id)} />
                    </div>

                    {showGoalModal.boolean ? <GoalsModal setShowGoalModal={setShowGoalModal} goalId={showGoalModal.goalId} /> : null}

                    <div className='display-flex justify-space-between'>
                      <div>
                        <div className='w-fit-content display-flex flex-column mt-5'>
                          <h6 className={priorityColor}>Priority: {goal.priority}</h6>
                          <h6>Complete by date: {new Date(+goal.completeByDate + 86400000).toLocaleString("en-US", { day: "numeric", "month": "numeric", "year": "numeric" })}</h6>
                          <h6>Steps: {goal.steps.length}</h6>
                        </div>
                      </div>
                      <div className='w-25 display-flex flex-column justify-space-around align-center'>
                        <button className='w-fit-content custom-btn-clr custom-btn-width ' onClick={(e) => showSteps(goal._id)}>Add/View Steps</button>
                        <button className='w-fit-content custom-btn-clr custom-btn-width ' onClick={(e) => {
                          updateGoal({ variables: { _id: goal._id, name: goal.name, completeByDate: goal.completeByDate, priority: goal.priority, completed: true } })
                          refetch()
                        }}>Mark as Complete</button>
                        <button className='w-fit-content custom-btn-clr custom-btn-width ' onClick={(e) => {
                          removeGoal({ variables: { _id: goal._id } })
                          refetch()
                        }}>Remove</button>
                      </div>
                    </div>
                    {stepArray.includes(goal._id) ? (
                      <>
                        <div key={goal._id} className='mt-3 ml-5'>
                          <div className='b-border display-flex justify-space-between'>
                            <h5>Step(s) to complete {goal.name}</h5>
                            <button className='custom-btn-clr custom-btn-width' onClick={openStepModal}>Add Step</button>
                            {showStepModal ? <StepModal setShowStepModal={setShowStepModal} goalId={goal._id} /> : null}
                          </div>
                          <div className='display-flex flex-column'>
                            {goal.steps.map((step) => (
                              step.completed ? (
                                <div key={step._id} className='display-flex flex-row justify-space-between'>
                                  <h6 className='b-border-step ml-5 line-through'>{step.name}</h6>
                                  <div className='w-25 display-flex flex-end justify-space-around'>
                                    <button className='custom-btn-clr custom-btn-width' onClick={(e) => {
                                      updateStep({ variables: { _id: step._id, name: step.name, completed: false } })
                                      refetch()
                                    }}>Completed!</button>
                                    <button className='custom-btn-clr custom-btn-width' onClick={(e) => {
                                      removeStep({ variables: { _id: step._id, goalId: goal._id } })
                                      refetch()
                                    }}>Remove</button>
                                  </div>
                                </div>
                              ) : (
                                <div key={step._id} className='display-flex flex-row justify-space-between'>
                                  <h6 className='b-border-step ml-5'> - {step.name}</h6>
                                  <div className='w-25 display-flex flex-end justify-space-around'>
                                    <button className='custom-btn-clr custom-btn-width m-1' onClick={(e) => {
                                      updateStep({ variables: { _id: step._id, name: step.name, completed: true } })
                                      refetch()
                                    }}>Mark Complete</button>
                                    <button className='custom-btn-clr custom-btn-width m-1' onClick={(e) => {
                                      removeStep({ variables: { _id: step._id, goalId: goal._id } })
                                      refetch()
                                    }}>Remove</button>
                                  </div>
                                </div>
                              )
                            ))}
                            <button className='custom-btn-clr w-fit-content p-1' onClick={() => closeSteps(goal._id)}>Close Steps</button>
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
            <button className='custom-btn-clr custom-btn-width' onClick={() => { setViewState('incomplete') }}>View Incomplete Goals</button>
          </div>
          {userInfo.map((goal) => {
            let priorityColor = goal.priority.toLowerCase()
            return (
              goal.completed ? (
                <Card key={goal._id} border='dark'>
                  <Card.Body>
                    <div className='display-flex custom-fill-secondary'>
                      <h5 className='col-11 text-center'>{goal.name}</h5>
                      <GearButton className='col-1 gear-button' onClick={() => openGoalModal(goal._id)} />
                    </div>
                    <div className='display-flex justify-space-between'>
                      <div>
                        <div className='w-fit-content display-flex flex-column mt-5'>
                          <h6 className={priorityColor}>Priority: {goal.priority}</h6>
                          <h6>Complete by date: {new Date(+goal.completeByDate).toLocaleString("en-US", { day: "numeric", "month": "numeric", "year": "numeric" })}</h6>
                          <h6>Steps: {goal.steps.length}</h6>
                        </div>
                      </div>
                      <div className='w-25 display-flex flex-column justify-space-around align-center'>
                        <button className='custom-btn-clr custom-btn-width' onClick={(e) => showSteps(goal._id)}>Add/View Steps</button>
                        <button className='custom-btn-clr custom-btn-width' onClick={(e) => {
                          updateGoal({ variables: { _id: goal._id, name: goal.name, completeByDate: goal.completeByDate, priority: goal.priority, completed: false } })
                          refetch()
                        }}>Completed!</button>
                        <button className='custom-btn-clr custom-btn-width' onClick={(e) => {
                          removeGoal({ variables: { _id: goal._id } })
                          refetch()
                        }}>Remove</button>
                      </div>
                    </div>
                    {stepArray.includes(goal._id) ? (
                      <>
                        <div key={goal._id} className='mt-3 ml-5'>
                          <div className='b-border display-flex justify-space-between'>
                            <h5>Step(s) to complete {goal.name}</h5>
                            <button className='custom-btn-clr custom-btn-width' onClick={openStepModal}>Add Step</button>
                            {showStepModal ? <StepModal setShowStepModal={setShowStepModal} goalId={goal._id} /> : null}
                          </div>
                          <div className='display-flex flex-column'>
                            {goal.steps.map((step) => (
                              step.completed ? (
                                <div key={step._id} className='display-flex flex-row justify-space-between'>
                                  <h6 className='b-border-step ml-5 line-through'>{step.name}</h6>
                                  <div className='w-25 display-flex flex-end justify-space-around'>
                                    <button className='custom-btn-clr custom-btn-width' onClick={(e) => {
                                      updateStep({ variables: { _id: step._id, name: step.name, completed: false } })
                                      refetch()
                                    }}>Completed!</button>
                                    <button className='custom-btn-clr custom-btn-width' onClick={(e) => {
                                      removeStep({ variables: { _id: step._id, goalId: goal._id } })
                                      refetch()
                                    }}>Remove</button>
                                  </div>
                                </div>
                              ) : (
                                <div key={step._id} className='display-flex flex-row justify-space-between'>
                                  <h6 className='b-border-step ml-5'> - {step.name}</h6>
                                  <div className='w-25 display-flex flex-end justify-space-around'>
                                    <button className='custom-btn-clr custom-btn-width m-1' onClick={(e) => {
                                      updateStep({ variables: { _id: step._id, name: step.name, completed: true } })
                                      refetch()
                                    }}>Mark Complete</button>
                                    <button className='custom-btn-clr custom-btn-width m-1' onClick={(e) => {
                                      removeStep({ variables: { _id: step._id, goalId: goal._id } })
                                      refetch()
                                    }}>Remove</button>
                                  </div>
                                </div>
                              )
                            ))}
                            <button className='custom-btn-clr w-fit-content p-1' onClick={() => closeSteps(goal._id)}>Close Steps</button>
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
