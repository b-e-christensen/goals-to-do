import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_TODO } from '../utils/mutations';
import { Jumbotron, Container, Col, Form, Button, Card } from 'react-bootstrap';


const Todo = (props) => {
  const [formState, setFormState] = useState({ name: '', priority: '' });
  const [addTodo, { error, data }] = useMutation(ADD_TODO);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await addTodo({
        variables: { ...formState },
      });

      console.log(data);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      name: '',
      priority: '',
    });
  };
// HERE - Test data until working  queries 
  const testDataTodo = [{_id: 1,name: "test", priority: "high", date: "1024389"},{_id: 2,name: "test2", priority: "high", date: "1024389"},{_id: 3,name: "test3", priority: "low", date: "1024385"}]

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Create To Do</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success!
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Name of todo"
                  name="name"
                  type="text"
                  value={formState.todo}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Priority"
                  name="priority"
                  type="text"
                  value={formState.priority}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
        <Container>
        <h2>
          {testDataTodo.length
            ? `Viewing ${testDataTodo.length} To Do's:`
            : 'Create a ToDo'}
        </h2>
        
          {testDataTodo.map((todo) => {
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
      </div>
    </main>
  );
};

export default Todo;
