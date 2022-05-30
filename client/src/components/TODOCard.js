import React from 'react';
import { useQuery } from '@apollo/client';
import { Container, Card } from 'react-bootstrap';
import { GET_USER_ALL } from '../utils/queries'

const TODOCard = (props) => {
  const { loading, data } = useQuery(GET_USER_ALL);
  const userInfo = data?.getUser.todos || [];
  console.log(userInfo)

  return (
    <Container>
      <h2>
        {userInfo.length
          ? `Viewing ${userInfo.length} To Do's:`
          : 'Create a To Do'}
      </h2>

      {userInfo.map((todo) => {
        return (
          <Card key={todo._id} border='dark'>
            <Card.Body>
              <Card.Title>{todo.name}</Card.Title>
              <p className='small'>Priority: {todo.priority}</p>
              <Card.Text>TEST</Card.Text>
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
