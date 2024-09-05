import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BotField from '../components/BotField';
import '../App.css'

function Home() {
    return (
        <>
            <Navbar />
            <div className='outer'>
                <div className='left'> 
                    <Sidebar/>
                </div>
                <div className='right'>
                    <BotField/>
                </div>
            </div>
        </>
    );
}

export default Home