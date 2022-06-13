import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import { ADD_CHAT_MESSAGE, UPDATE_LAST_VIEWED } from "../utils/mutations";
import { GET_SINGLE_PROJECT } from '../utils/queries';


const ProjectChat = ({ setShowChat, projectId, currentUser }) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();

  useEffect(() => {
    if (document.getElementById('chat-box')){
      const element = document.getElementById('chat-box');
      element.scrollTop = element.scrollHeight;
    }
  })

  const { data } = useQuery(GET_SINGLE_PROJECT, {
    variables: { id: projectId },
    pollInterval: 500,
  })

  const project = data?.getSingleProject || []

  const [formState, setFormState] = useState({ message: '', _id: project._id });
  const [addChatMessage] = useMutation(ADD_CHAT_MESSAGE)
  const [updateLastViewed] = useMutation(UPDATE_LAST_VIEWED)
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addChatMessage({
        variables: { ...formState }
      })
    } catch (e) {
      console.error(e);
    }
    // clear form values
    setFormState({
      message: '',
      _id: project._id,
    })
  };

  const closeModal = async (e) => {
    await updateLastViewed({
      variables: {
        _id: project._id,
        lastViewed: currentUser[0].lastViewed,
        newLastViewed: JSON.stringify(project.groupChat.length)
      }
    })
    if (e.target === modalRef.current) {
      setShowChat(false);
    }
  };


  //render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="chat-box-container display-flex flex-column">
        <div id="chat-box" className="chat-box display-flex flex-row">
          {project.groupChat.map((message) => {
            if (message.email === currentUser[0].email) {
              return (
                <div  className="m-1 col-12">
                  <h6 className="text-right">{message.name} <span className="message-time"> @ {new Date(+message.time).toLocaleTimeString()} {new Date(+message.time).toLocaleString("en-US", { day: "numeric", "month": "numeric", "year": "numeric" })}</span></h6>
                  <div className="chat-bubble my-chat-bubble">
                    <span className="ml-1 mr-1">{message.message}</span>
                  </div>
                </div>
              )} else {
              return (
                <div className="m-1 col-12">
                  <h6 className="text-left">{message.name} <span className="message-time"> @ {new Date(+message.time).toLocaleTimeString()} {new Date(+message.time).toLocaleString("en-US", { day: "numeric", "month": "numeric", "year": "numeric" })}</span></h6>
                  <div className="chat-bubble">
                  <span className="ml-1 mr-1">{message.message}</span>
                  </div>
                </div>
              )}
          })}
        </div>
        <form className='w-100 display-flex' onSubmit={handleFormSubmit}>
          <textarea
            className="form-input col-11"
            placeholder="Send a message to your group"
            name="message"
            type="text"
            value={formState.message}
            onChange={handleChange}
          />
          <button
            className="btn btn-block btn-info"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            Send
          </button>
        </form>
        <button className='modal-button' onClick={() => setShowChat(false)}>X</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default ProjectChat;