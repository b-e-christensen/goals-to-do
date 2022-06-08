import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { GET_PROJECTS } from '../utils/queries';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Projects() {

  const { loading, data, refetch } = useQuery(GET_PROJECTS)

  const userInfo = data?.getUser.projects || []

  console.log(userInfo)
  // console.log(userInfo.projects)
  return (
    <>
      <div className='text-center w-100 mt-4'><h4>Your Projects</h4></div>
      <Container>
        {userInfo.map((project) => {
          return (
            <Card className='m-3 '>
              <Link
                to={`/projects/${project._id}`}>
                <h5 className='m-2'>{project.name}</h5>
              </Link>
            </Card>
          )
        })}
      </Container>
    </>
  )
}

export default Projects