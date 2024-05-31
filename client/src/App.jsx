
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div>
      <h1>Hello, Life Organizer!
        UnSuck your life?
      </h1>
      <Outlet />
    </div>
    </ApolloProvider>
  );
}

export default App;
