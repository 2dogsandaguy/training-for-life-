import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import Sky from "../../public/images/endless-sky.jpg";
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div
    className="create-container"
    style={{
      backgroundImage: `url(${Sky})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      /* overflow: 'hidden', */
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      Height: '100vh',
      position: 'relative',
      overflowY: 'auto',
    }}
  >
    <ApolloProvider client={client}>
    <div>
      <h1>Hello, Life Organizer!
        UnSuck your life?
      </h1>
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
      <Outlet />
    </div>
    </ApolloProvider>
    </div>
  );
}

export default Investments;
