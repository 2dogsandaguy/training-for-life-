// src/components/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import sky from '../../../public/images/perfect-sky.jpg';
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from '../../utils/auth';
import "./Login.css"; // Update the path if needed

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useMutation(LOGIN_USER);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      console.log('Before login request');
      const { data } = await login({
        variables: { email: email, password },
      });

      console.log('Sign-in successful. Data:', data);
      // Store the token in local storage
      Auth.login(data.login.token);

      setEmail('');
      setPassword('');

      if (data) {
        navigate('/profile');
      }
    } catch (e) {
      console.error('Sign-in error:', e);
    }
  };
  return (
    <div style={{
      backgroundImage: `url(${sky})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        zIndex: '1',
        position: 'relative'
      }}>
        <h1 className="lightblue-text" style={{ marginBottom: '50px', fontSize: '75px' }}>Life Organizer!</h1>
        <label className="lightblue-text large-bold-text label-email" style={{ marginTop: '20px' }}>
          Email:
          <input type="text" value={email} onChange={handleEmailChange} className="large-input" style={{ marginLeft: '10px' }} placeholder="Enter email" />
        </label>
        <label className="lightblue-text large-bold-text" style={{ marginTop: '20px' }}>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} className="large-input" style={{ marginLeft: '10px' }} placeholder="Enter password" />
        </label>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px', marginTop: '20px' }}>
          <button onClick={handleSignIn}>Sign In</button>
          <button><Link to="/signup" style={{ color: 'black' }}>Sign Up</Link></button>
          
        </div>
        
        <button><Link to="/home" style={{color: 'purple'}}>Home</Link></button>
      </div>
      
    </div>
  );
}

export default Login;
