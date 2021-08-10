import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Auth from './Auth'
const Login = () => {
    let history = useHistory();
    const [user, setUser] = useState('');
  
    const handleEvent=async()=>{
      
        await localStorage.setItem('user', user);
        await  Auth.authenticate();
        history.push('/chat',{state: user })
    }
    return (
        <div style={container}>
            <div style={inputFieldContainer}>
                <div style={{
                    color: '#fff', fontSize: 40,
                    textAlign: 'center', marginBottom: 10
                }}>Welcome</div>
                <input
                    type="text"
                    style={inputStyle}
                    placeholder="Please enter your name"
                    value={user}
                    onChange={e => setUser(e.target.value)}
                />
                {user!== '' &&
                <button style={buttonStyles} 
                    onClick={handleEvent}>
                    Continue
                </button>}

            </div>
        </div>
    )
}
const container = {
    alignItems: 'center',
    background: '#282c34',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
};
const inputFieldContainer = {
    display: 'flex',
    flexDirection: 'column',
    height: '50vh',
    width: '50%',
};

const inputStyle = {
    height: '20px',
    marginBottom: 10,
    fontSize: '16px',
    padding: '5px 10px',
};
const buttonStyles = {
    fontSize: '1.1rem',
    padding: '10px 15px',

};
export default Login
