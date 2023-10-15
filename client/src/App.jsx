import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomeLayout from './components/HomeLayout';
import UserLayout from './components/UserLayout';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import History from './pages/History';
import FourOhFour from './pages/404';

import './App.css';

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

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<UserLayout />}>
            <Route path="register" element={<Register />} />
            
            <Route path="login" element={<Login />} />            
            {/* <Route path="chat" element={<Chat />} />*/}
            <Route path="history" element={<History />} /> 
            <Route
              path="history"
              element={<History />}
            />
          </Route>
          <Route element={<MainLayout />}>    
            <Route path="chat" element={<Chat />} />
            <Route path="history" element={<History />} />
          </Route>
          <Route path="*" element={<FourOhFour />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App;
