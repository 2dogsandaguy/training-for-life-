import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Seclude from './components/Seclude';
import SignUp from './components/SignUp'; 
import Journal from './components/Journal';
import Goals from './components/Goals';
import Bills from './components/Bills';
import Investment from './components/Investment';
 
const httpLink = createHttpLink({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
        <Routes>
          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/login" element={<Login />} />           
          <Route path="*" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="seclude" element={<Seclude />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="journal" element={<Journal />} />
          <Route path="goals" element={<Goals />} />
          <Route path="bills" element={<Bills />} />
          <Route path="investment" element={<Investment />} />

        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
