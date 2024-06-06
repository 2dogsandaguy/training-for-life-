import './Home.css'
import { useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Sky from "./../../../public/images/perfect-sky.jpg";

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function Home() {
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
        <div>
          <h1>Hello, Life Organizer! UnSuck your life?</h1>
          <section className='outline'>
            Investment
            <li>nivida</li>
            <li>microsoft</li>
            <li>Robinhood</li>
            <li>Webull</li>
          </section>
          <div className='outline'>
            Journal
            <p> good day </p>
          </div>
          <div className='outline'>
            Bills
          </div>
          <div className='outline'>
            Seclude
          </div>
          <div className='outline'>
            Dreams/Goals
          </div>
          
        </div>
      </ApolloProvider>
    </div>
  );
}

export default Home;
