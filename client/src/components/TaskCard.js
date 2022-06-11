import React from 'react';
import { useQuery } from '@apollo/client';
import { Card, Container } from 'react-bootstrap';
import { GET_SINGLE_PROJECT } from '../utils/queries';

function TaskCard({ projectId }) {

  const { data } = useQuery(GET_SINGLE_PROJECT, {
    variables: { id: projectId },
  })

  const tasks = data?.getSingleProject.tasks || []
  console.log(tasks)


  return (
    <>
      <Container className='display-flex justify-center align-center flex-column'>
        {tasks.map((task) => {
          return (
            <Card border='dark' className='custom-card-width'>
              <Card.Body>
                <Card.Title className='display-flex align-center justify-center'>
                  <h5>{task.name} - <span className='created-by'>created by</span> {task.creator}</h5>
                </Card.Title>
                <Card.Text>
                  <div className='w-fit-content display-flex flex-column mt-5'>
                    <h6 className='mb-0'>Priority: {task.priority}</h6>
                    {task.assignees[0] ? (
                      <div>
                      <h6>This task has been assigned to:</h6>
                      {task.assignees.map((assignee) => {
                        return (
                          <p className='mb-0 ml-2'>-- {assignee}</p>
                        )
                      })}
                    </div>) : ('')}



                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          )
        })}



      </Container>

    </>
  )
}

export default TaskCard