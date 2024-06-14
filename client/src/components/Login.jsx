import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import sky from '../../../public/images/perfect-sky.jpg';
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from '../../utils/auth';
import "./Login.css"; // Ensure the path is correct

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const [login, { loading }] = useMutation(LOGIN_USER, {
    onError: (error) => {
      setError(error.message);
    }
  });

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
        variables: { email, password },
      });

      console.log('Sign-in successful. Data:', data);

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
    <div
      style={{
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
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          zIndex: '1',
          position: 'relative',
        }}
      >
        <h1 className="lightblue-text" style={{ marginBottom: '50px', fontSize: '75px' }}>Life Organizer!</h1>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSignIn}>
          <label className="lightblue-text large-bold-text label-email" style={{ marginTop: '20px' }}>
            Email:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="large-input"
              style={{ marginLeft: '10px' }}
              placeholder="Enter email"
              required
            />
          </label>
          <label className="lightblue-text large-bold-text" style={{ marginTop: '20px' }}>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="large-input"
              style={{ marginLeft: '10px' }}
              placeholder="Enter password"
              required
            />
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px', marginTop: '20px' }}>
            <button type="submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            <button>
              <Link to="/signup" style={{ color: 'black' }}>Sign Up</Link>
            </button>
          </div>
          <button style={{ marginTop: '10px' }}>
            <Link to="/home" style={{ color: 'purple' }}>Home</Link>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
