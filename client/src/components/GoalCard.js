import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Card } from 'react-bootstrap';
import { GET_USER_ALL } from '../utils/queries'
import StepModal from './StepModal'
import { UPDATE_STEP, REMOVE_STEP } from '../utils/mutations';


const GoalCard = (props) => {
  const { loading, data } = useQuery(GET_USER_ALL);
  const userInfo = data?.getUser.goals || [];

  const [userState, setUserState] = useState([...userInfo])
  const [showModal, setShowModal] = useState(false)
  const [stepState, setStepState] = useState([])
  const [updateStep] = useMutation(UPDATE_STEP);
  const [removeStep] = useMutation(REMOVE_STEP);
  let stepArray = []
  if(stepState[0]) {
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
      <h2>
        {userInfo.length
          ? `Viewing ${userInfo.length} Goals:`
          : 'Create a Goal'}
      </h2>

      {userState.map((goal) => {
        return (
          <Card key={goal._id} border='dark'>
            <Card.Body>
              <Card.Title>
                <a
                  name="step"
                  value={goal._id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => showSteps(goal._id)}
                >{goal.name} - (click to view steps)</a>
              </Card.Title>
              <Card.Text>
                <p>Priority: {goal.priority}</p>
                <p>Complete by date: {new Date(+goal.completeByDate).toLocaleString("en-US", { day: "numeric", "month": "numeric", "year": "numeric" })}</p>
              </Card.Text>
              <label> Mark as Complete
                <input type="checkbox" />
              </label>
              <label> Remove
                <input type="checkbox" onChange={(e) => { alert(0) }} />
              </label>
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
                        <div key={step._id} className='display-flex flex-row justify-space-between'>
                          <p className='b-border-step ml-5'> - {step.name}</p>
                          <div className='display-flex flex-end'>
                            <label className='mr-3 mt-2'> Mark as Complete
                              {/* <input type="checkbox" onChange={(e) => { updateStep({variables: { _id: step._id, name: step.name, completed: true }})}}/> */}
                            </label>
                            <label className='mr-3 mt-2'> Remove
                              <input type="checkbox" onChange={(e) => { alert(0) }} />
                            </label>
                          </div>
                        </div>))}
                        <button className='w-fit-content' onClick={() => closeSteps(goal._id)}>Close Steps</button>
                    </div>
                  </div>
                </>) : ('')}
            </Card.Body>
          </Card>
        );
      })}

    </Container>
  );
};

export default GoalCard;
