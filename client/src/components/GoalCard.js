import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Container, Card } from 'react-bootstrap';
import { GET_USER_ALL } from '../utils/queries'

const TODOCard = (props) => {
    const { loading, data } = useQuery(GET_USER_ALL);
    const userInfo = data?.getUser.goals || [];
    console.log(userInfo)

    const [userState, setUserState] = useState([...userInfo])
    console.log('userState --------> ' + userState)
    userState.map((index) => {(
        index.name = 'hey'
        )})
        // 1653955200000
        // 1575909015 
    return (    
        <Container>
            <h2>
                {userInfo.length
                    ? `Viewing ${userInfo.length} Goals:`
                    : 'Create a Goal'}
            </h2>

            {userInfo.map((goal) => {
                return (
                    <Card key={goal._id} border='dark'>
                        <Card.Body>
                            <Card.Title>{goal.name}</Card.Title>
                            <Card.Text><p className='small'>Priority: {goal.priority}</p>
                            TEST</Card.Text>
                            <label> Mark as Complete
                            <input type="checkbox" />
                            </label>
                            <label> Remove
                            <input type="checkbox" onChange={(e) => { alert(0) }} />
                            </label>
                        </Card.Body>
                    </Card>
                );
            })}

        </Container>
    );
};

export default TODOCard;
