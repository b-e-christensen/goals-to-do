import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Card } from 'react-bootstrap';
import { GET_USER_ALL } from '../utils/queries'
import ToDoModal from './ToDoModal'
import { UPDATE_TODO, REMOVE_TODO } from '../utils/mutations';

const TODOCard = (props) => {
  const [showToDoModal, setShowToDoModal] = useState({ boolean: false, todoId: ''})
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [removeTodo] = useMutation(REMOVE_TODO);
  const { loading, data, refetch } = useQuery(GET_USER_ALL);

  useEffect(() => {
    refetch()
  })

  const userInfo = data?.getUser.todos || [];

  const openToDoModal = (param) => {
    setShowToDoModal({ boolean: true, todoId: param})
  }

  const [viewState, setViewState] = useState('incomplete')


  return (
    <Container className='custom-cont-alter' data-count={props.count}>
      {/* initial render will display incomplete to dos */}
      {viewState ? (
        <>
          <div className='w-100 display-flex justify-space-between'>
            <h2>
              {userInfo.length
                ? `Viewing Incomplete To Do's:`
                : 'Create a To Do'}
            </h2>
            <button className='w-fit-content h-fit-content' onClick={() => { setViewState('') }}>View Completed To Do's</button>
          </div>
          {userInfo.map((todo) => {
            return (
              todo.completed ? ('') :
                (<Card key={todo._id} border='dark' className='custom-card-width'>
                  <Card.Body id={todo._id}>
                    <Card.Title className='text-center'>
                    <h5>{todo.name}</h5>
                    </Card.Title>

                    <div className='b-border display-flex justify-space-between'>
                            <h6>{todo.name}</h6>
                            
                            <button key={todo._id} id={todo._id} 
                             className='w-fit-content' onClick={() => openToDoModal (todo._id)}>Edit TODO</button>
                            {showToDoModal.boolean ? <ToDoModal setShowToDoModal={setShowToDoModal} todoId={showToDoModal.todoId} /> : null}
                          </div>
                    <div className='display-flex justify-space-between'>
                      <div className='w-fit-content display-flex flex-column mt-5'>
                        <p className='small'>Priority: {todo.priority}</p>
                        <Card.Text>Incomplete</Card.Text>
                      </div>
                      <div className='w-50 display-flex flex-column justify-space-around align-center'>
                        <button className='w-fit-content' onClick={(e) => {
                          updateTodo({ variables: { _id: todo._id, name: todo.name, priority: todo.priority, completed: true } })
                          refetch()
                        }}>Mark as Complete</button>
                        <button className='w-fit-content' onClick={(e) => {
                          removeTodo({ variables: { _id: todo._id } })
                          refetch()
                        }}>Remove</button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>))
          })}
        </>) :
          // displaying completed to do's
          (<>
            <div className='w-100 display-flex justify-space-between'>
              <h2>
                {userInfo.length
                  ? `Viewing Completed To Do's:`
                  : 'Create a To Do'}
              </h2>
              <button className='w-fit-content h-fit-content' onClick={() => { setViewState('incomplete') }}>View Incomplete To Do's</button>
            </div>
            {userInfo.map((todo) => {
              return (
                todo.completed ? (
                  <Card key={todo._id} border='dark' className='custom-card-width'>
                    <Card.Body id={todo._id}>
                      <Card.Title>{todo.name}</Card.Title>
                      <p className='small'>Priority: {todo.priority}</p>
                      <Card.Text>Completed</Card.Text>
                      <button className='w-fit-content' onClick={(e) => {
                        updateTodo({ variables: { _id: todo._id, name: todo.name, priority: todo.priority, completed: false } })
                        refetch()
                      }}>Completed!</button>
                      <button className='w-fit-content' onClick={(e) => {
                        removeTodo({ variables: { _id: todo._id } })
                        refetch()
                      }}>Remove</button>
                    </Card.Body>
                  </Card>) : ('')
              )
            })}
          </>)}
    </Container>
  );
};

export default TODOCard;
