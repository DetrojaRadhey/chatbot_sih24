import React from 'react';
import SendIcon from '@mui/icons-material/Send';

function BotField() {
  return ( 
    <>
      <div className='chat'>

      </div>
      
      <div className='search'>
        <div className='send'>
          <input placeholder='Enter something...' type='text' className='input'></input>
          <button className='btn'><SendIcon/></button>
        </div>
      </div>
    </>
  );
}

export default BotField;