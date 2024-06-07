import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import Sky from "./../../../public/images/perfect-sky.jpg";


function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [addUser] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }
    try {
      const { data } = await addUser({
        variables: {
          username,
          email,
          password,
        },
      });
      console.log("addUser", data);
      // Set the success message
      setMessage('Signup successful! Redirecting to home page...');

      // Redirect to the home page after a delay
      setTimeout(() => {
        navigate('/');
      }, 4000); // 4000ms delay
    } catch (err) {
      // Handle signup error`
      console.error("Mutation error:", err);
      console.log("Error details:", err.message, err.graphQLErrors, err.networkError);
      setMessage('Signup failed. Please try again.');
    }
  };
  const containerStyle = {
    backgroundImage: `url(${Sky})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'repeat', // You can choose 'repeat', 'repeat-x', or 'repeat-y' based on your preference
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      {message && <h2 style={{ color: message === 'Signup successful! Redirecting to home page...' ? 'green' : 'red', textAlign: 'center' }}>{message}</h2>}
      <header className="header">
        <Link to="/Login">Back to Login</Link>
      </header>

      <div className="container" style={containerStyle}>
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <div className="input-group">
              <input type={showPassword ? "text" : "password"} className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password:</label>
            <div className="input-group">
              <input type={showConfirmPassword ? "text" : "password"} className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <button type="button" className="btn btn-outline-secondary" onClick={toggleConfirmPasswordVisibility}>
                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default SignUp; 
