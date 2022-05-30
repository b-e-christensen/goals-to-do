import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Container, Card } from 'react-bootstrap';
import { GET_USER_ALL } from '../utils/queries'

const GoalCard = (props) => {
    const { loading, data } = useQuery(GET_USER_ALL);
    const userInfo = data?.getUser.goals || [];

    const [userState, setUserState] = useState([...userInfo])
    console.log(userState)

    const [stepState, setStepState] = useState('')

    const showSteps = (goalId) => {
        console.log('hello')
        setStepState({
            ...stepState,
            [goalId]: { step: true }
        })
    }

    let stepArray = Object.keys(stepState)

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
                            <Card.Text><p>Priority: {goal.priority}</p>
                            Complete by date: {new Date(+goal.completeByDate).toLocaleString("en-US", {day: "numeric", "month": "numeric", "year": "numeric"})}</Card.Text>
                            <label> Mark as Complete
                            <input type="checkbox" />
                            </label>
                            <label> Remove
                            <input type="checkbox" onChange={(e) => { alert(0) }} />
                            </label>
                            {stepArray.includes(goal._id)? goal.steps.map((step) => <p>{step.name}</p>) : <p></p>}
                        </Card.Body>
                    </Card>
                );
            })}

        </Container>
    );
};

export default GoalCard;
