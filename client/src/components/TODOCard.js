import React, { useEffect, useState } from 'react';
import { useQuery} from '@apollo/client';
import { Jumbotron, Container, Col, Form, Button, Card } from 'react-bootstrap';
import {GET_USER_ALL} from '../utils/queries'

const TODOCard = (props) => {
// HERE - Test data until working  queries 
  const testDataTodo = [{_id: 1,name: "test", priority: "high", date: "1024389"},{_id: 2,name: "test2", priority: "high", date: "1024389"},{_id: 3,name: "test3", priority: "low", date: "1024385"}]
    const { loading, data } = useQuery(GET_USER_ALL);
    const userInfo = data?.getUser.todos || {};
    console.log(userInfo)
  



  return (
    <Container>
    <h2>
      {userInfo.length
        ? `Viewing ${userInfo.length} To Do's:`
        : 'Create a ToDo'}
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
              <input type="checkbox" onChange={(e) => {alert(0)}}/>
              </label>
            </Card.Body>
          </Card>
        );
      })}
    
  </Container>
  );
};

export default TODOCard;
