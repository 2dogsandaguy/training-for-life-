import './Home.css'
import { useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import Sky from "./../../../public/images/perfect-sky.jpg";

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});
const handleLogout = () => {
  Auth.logout();
};

function Profile() {
  return (
    <div
      className="create-container"
      style={{
        backgroundImage: `url(${Sky})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',  // Ensure the 'h' is lowercase
        width: '100vw',   // Cover full width of the viewport
        display: 'flex',
        flexDirection: 'column',  // Use column to ensure content stacks vertically
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflowY: 'auto',
      }}
    >
      <ApolloProvider client={client}>
        {/* <div className="dropdown-menu-container">
          <div className="dropdown">
            <button className="dropbtn">Menu</button>
            <div className="dropdown-content">
              <Link to="/">Home</Link>
              
              {/* Add more links as needed */}
            {/* </div> */}
          {/* </div> */}
        {/* </div> */} 
        <div>
          <h1>Life Organizer! UnSuck your life?</h1>
          <button className="logout" onClick={handleLogout}>
                <span>Log Out</span>
              </button>
          <Link to="/Investment">
            <section className='outline'>
              Investment
              <li>nivida</li>
              <li>microsoft</li>
              <li>Robinhood</li>
              <li>Webull</li>
            </section>
          </Link>
          <Link to="/Journal">
            <div className='outline'>
              Journal
              <p> good day </p>
            </div>
          </Link>
          <Link to="/Bills">
            <div className='outline'>
              Bills
            </div>
          </Link>
          <Link to="/seclude">
            <div className='outline'>
              Seclude
            </div>
          </Link>
          <Link to="/Goals">
            <div className='outline'>
              Dreams/Goals
            </div>
          </Link>
        </div>
      </ApolloProvider>
    </div>
  );
}

export default Profile;
