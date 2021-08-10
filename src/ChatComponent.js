import React, { useState, useEffect, useRef } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import {useLocation, useHistory} from 'react-router-dom' 



function ChatComponent() {
  const location=useLocation()
  
  const pubnub = new PubNub({
    publishKey: 'pub-c-a5f1540b-0bac-4261-a25f-25145a62b1f6',
    subscribeKey: 'sub-c-e2d75260-f39d-11eb-9d61-d6c76bc6f614',
    uuid: location.state.state
});

console.log('chatcomponent ************');
  
  return (
    <PubNubProvider client={pubnub}>
      <Chat />
    </PubNubProvider>
  );
}

const useWindowUnloadEffect = (handler, callOnCleanup) => {
  const cb = useRef()
  
  cb.current = handler
  
  useEffect(() => {
    const handler = () => cb.current()
  
    window.addEventListener('beforeunload', handler)
    
    return () => {
      if(callOnCleanup) handler()
    
      window.removeEventListener('beforeunload', handler)
    }
  }, [cb])
}

function Chat() {
  let history = useHistory();
  const pubnub = usePubNub();
  const [channels] = useState(['awesome-channel']);
  const [messages, addMessage] = useState([]);
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   console.log("component did unmount ************");
  //   addMessage(JSON.parse(localStorage.getItem("messages")) || []);
  //   pubnub.addListener({ message: handleMessage });
  //   pubnub.subscribe({ channels });
  // }, []);

  useEffect(() => {
    console.log("component did unmount ************");
    addMessage(JSON.parse(localStorage.getItem("messages")) || []);
    pubnub.addListener({ message: handleMessage });
    pubnub.subscribe({ channels });
    // Specify how to clean up after this effect:
    // return () => {
    //   console.log("component will unmount ************");
    //   localStorage.setItem("messages", JSON.stringify(messages));
    // };
  }, []);

  useWindowUnloadEffect(() => {
    console.log('unloaded')
    localStorage.setItem("messages", JSON.stringify(messages));
  }, true)

  const handleMessage = event => {
    console.log('handle msg ************');
    const message = event.message.text;
      addMessage(messages => [...messages, {content:message, 
        user:event.message.userId}]);  
  };
const Signout=()=>{
  addMessage([])
  localStorage.clear()
  history.push('/')

}
  const sendMessage = message => { 
    console.log('send msg ************');
    if (message) {
      let data= {
        text:message,
        userId:pubnub.getUUID()
      }
     
      pubnub
        .publish({ channel: channels[0], message:data})
        .then(() => setMessage(''));
    }
  };

  

  return (
    <div style={pageStyles}>
      <div style={chatStyles}>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:10}}>
      <div style={headerStyles}>Demo Chat app</div>
      <div style={signout} onClick={Signout}>Sign Out</div>
      </div>
      <>
        {/* <div style={{textAlign:'left',
      color:'#fff', fontSize:12, lineHeight:2}}>General chat</div> */}
        <div style={{textAlign:'right',
      color:'#fff', fontSize:12, lineHeight:2}}>logged in as {localStorage.getItem('user')}</div>
      </>
        <div style={listStyles}>
        {messages.map((message, index) => {
              return (
                <div key={`message-${index}`} style={message.user===pubnub.getUUID()? 
                messageStyles:messageStylesFor}>
                  {message.content} 
                </div>
              );
            })}
        </div>
        <div style={footerStyles}>
          <input
            type="text"
            style={inputStyles}
            placeholder="Type your message"
            value={message}
            onKeyPress={e => {
              if (e.key !== 'Enter') return;
              sendMessage(message);
            }}
            onChange={e => setMessage(e.target.value)}
          />
          <button
            style={buttonStyles}
            onClick={e => {
              sendMessage(message);
            }}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

const pageStyles = {
  alignItems: 'center',
  background: '#282c34',
  display: 'flex',
  justifyContent: 'center',
  minHeight: '100vh',
};

const chatStyles = {
  display: 'flex',
  flexDirection: 'column',
  height: '50vh',
  width: '50%',
};

const headerStyles = {
  background: '#323742',
  color: 'white',
  fontSize: '1.4rem',
  padding: '10px 15px',
};

const signout = {
  background: '#323742',
  color: 'white',
  fontSize: '1.4rem',
  padding: '10px 15px',
  cursor: 'pointer'
};

const listStyles = {
  alignItems: 'flex-start',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  overflow: 'auto',
  padding: '10px',
};

const messageStyles = {
  backgroundColor: '#e7feff',
  borderRadius: '5px',
  color: '#333',
  fontSize: '1.1rem',
  margin: '5px',
  padding: '8px 15px',
};

const footerStyles = {
  display: 'flex',
};

const inputStyles = {
  flexGrow: 1,
  fontSize: '1.1rem',
  padding: '10px 15px',
};
const messageStylesFor = {
  backgroundColor: '#E5E4E2',
  borderRadius: '5px',
  color: '#333',
  fontSize: '1.1rem',
  margin: '5px',
  padding: '8px 15px',
};
const buttonStyles = {
  fontSize: '1.1rem',
  padding: '10px 15px',
};

export default ChatComponent;