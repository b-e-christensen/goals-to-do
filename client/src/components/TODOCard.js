import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Card } from 'react-bootstrap';
import { GET_USER_ALL } from '../utils/queries'
import { UPDATE_TODO, REMOVE_TODO } from '../utils/mutations';

const TODOCard = (props) => {
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [removeTodo] = useMutation(REMOVE_TODO);

  const { loading, data, refetch } = useQuery(GET_USER_ALL);
  const userInfo = data?.getUser.todos || [];


  return (
    <Container className='custom-cont-alter' data-count={props.count}>
      <h2>
        {userInfo.length
          ? `Viewing ${userInfo.length} To Do's:`
          : 'Create a To Do'}
      </h2>

      {userInfo.map((todo) => {
        return (
          <Card key={todo._id} border='dark' className='custom-card-width'>
            <Card.Body id={todo._id}>
              <Card.Title>{todo.name}</Card.Title>
              <p className='small'>Priority: {todo.priority}</p>
              {todo.completed ? (<Card.Text>Completed</Card.Text>) : (
                <Card.Text>Not yet completed</Card.Text>
              )}
              
              <label> Mark as Complete
                <input type="checkbox" onChange={(e) => {updateTodo({variables: {_id: todo._id, name: todo.name, completed: true, priority: todo.priority}}); refetch()}}/>
              </label>
              <label> Remove
                <input type="checkbox" onChange={(e) => { removeTodo({variables: {_id: todo._id}}); refetch() }} />
              </label>
            </Card.Body >
          </Card>
        );
      })}

    </Container>
  );
};

export default TODOCard;
