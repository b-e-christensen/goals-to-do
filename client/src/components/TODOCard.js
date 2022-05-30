import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Card } from 'react-bootstrap';
import { GET_USER_ALL } from '../utils/queries'
import { UPDATE_TODO } from '../utils/mutations';

const TODOCard = (props) => {
  const [updateTodo] = useMutation(UPDATE_TODO);
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
            <Card.Body id={todo._id}>
              <Card.Title>{todo.name}</Card.Title>
              <p className='small'>Priority: {todo.priority}</p>
              {todo.completed ? (<Card.Text>Completed</Card.Text>) : (
                <Card.Text>Not yet completed</Card.Text>
              )}
              
              <label> Mark as Complete
                <input type="checkbox" onChange={(e) => { updateTodo({variables: {_id: todo._id, name: todo.name, completed: true, priority: todo.priority}}) }}/>
              </label>
              <label> Remove
                <input type="checkbox" onChange={(e) => { updateTodo({variables: {_id: todo._id, name: todo.name, completed: true, priority: todo.priority}}) }} />
              </label>
            </Card.Body>
          </Card>
        );
      })}

    </Container>
  );
};

export default TODOCard;
