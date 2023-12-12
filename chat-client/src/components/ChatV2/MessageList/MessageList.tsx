import React, { useEffect, useState, memo } from 'react';
import Compose from './Compose/Compose';
import Toolbar from '../Toolbar/Toolbar';
import Message from './Message/Message';

import './MessageList.css';
import { object } from 'yup';
import { observer } from 'mobx-react';
import { useStore } from 'src/stores';
import { ConstructionOutlined } from '@mui/icons-material';

const MY_USER_ID = 'dattrinh';

function MessageList(props: any) {
  const { chatStore } = useStore();
  const { chosenRoom } = chatStore;

  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   getMessages();
  // }, [])

  // const getMessages = () => {
  //   setMessages([...messages, ...chosenRoom.messages])
  // }

  const renderMessages = () => {
    const messages = chosenRoom.messages;
    console.log(messages)
    let i = 0;
    let messageCount = messages.length;
    let tempArray = [];
    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let type = current.messageType.name;
      console.log(type)
      let isMine = current.user.username === MY_USER_ID;
      let startsSequence = true;
      let endsSequence = false;
      let photo = "test";


      if (previous && previous.user.username === current.user.username) {
        startsSequence = false
      }

      if (next && next.user.username !== current.user.username) {
        endsSequence = true
      }

      tempArray.push(
        <Message
          key={i}
          isMine={isMine}
          type={type}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          data={current.content}
          author={current.user.username}
          photo
        />
      );
      i += 1;
    }
    return tempArray;
  }

  return (
    <div className="message-list">
      <Toolbar title="Conversation Title" />
      {!chosenRoom ? <> No conversation was chosen</>
        : <div className="message-list-container">
          {
            renderMessages() 
          }
        </div>
      }
      <Compose></Compose>
    </div>
  );
}

export default memo(observer(MessageList));