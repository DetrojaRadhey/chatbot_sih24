import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useState, useRef } from 'react';
import axios from "axios";

function BotField() {

  const [query,setQuery] = useState("");
  const [chat,setchat] = useState([
    {text:"Hello how can I help you!",type:"bot"},
  ]);

  const chatRef = useRef(null);

  const handlesubmit = () => {
    setchat((prevChat) => [...prevChat,{text:query,type:"user"}]);
    axios.post("http://localhost:8080/chat/getanswer",{query})
      .then((res)=>{
          console.log(res.data);
          setchat((prevChat) => [...prevChat,{text:res.data.message,type:"bot"}]);
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
      })
      .catch((err)=>{
          console.log(err);
      });
    setQuery("");
  }

  return ( 
    <>
      <div className='chat' ref={chatRef} style={{overflowY: "auto"}}>
        {
          chat.map((item,index)=>{
            return <div key={index}>
              <div style={{background:item.type=="bot"?"rgba(83, 160, 237, 0.507)":"", margin: "1%", padding: "1%"}}>{item.text}</div>
            </div>
          })
        }
      </div>
      
      <div className='search'>
        <div className='send'>
        <input
          placeholder='Enter something...'
          value={query}
          onChange={e => setQuery(e.target.value)}
          className='input'
        />
        <button className='btn' onClick={handlesubmit}><SendIcon/></button>
        </div>
      </div>
    </>
  );
}

export default BotField;