import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './components/MainLayout';
import HomeLayout from './components/HomeLayout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import History from './pages/History';
import FourOhFour from './pages/404';

const httpLink = createHttpLink({
  uri: '/graphql',
});

//create a token authentication link on local storage
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

//create an Apollo client that links to auth token
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

/**
 * HomeLayout for home page
 * Route to Home page
 * 
 * MainLayout for all other routes
 * Route to Register page
 * Route to Login page
 * Route to Chat page
 * Route to History page
 * Route to 404 page
 * @returns App with routes to all pages
 */
function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />  
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:chatIndex" element={<Chat />} />
            <Route path="history" element={<History />} />
            <Route path="*" element={<FourOhFour />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App;
