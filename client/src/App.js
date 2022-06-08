import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Custom components and page loads 
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login'
import ProfilePage from './pages/ProfilePage';
import Signup from './pages/Signup'
import Start from './components/Start'
import TodoDashboard from './pages/TodoDashboard';
import GoalDashboard from './pages/GoalDashboard'
import ProjectDashboard from './pages/ProjectDashboard'
import useLocalStorage from 'use-local-storage'
import SingleProject from './components/SingleProject';
//import Auth from './utils/auth';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
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
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const el = document.getElementById('root')
  el.classList.add(`${theme}`)

  const switchTheme = () => {
    el.classList.remove(`${theme}`)
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  }

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Start />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/todos"
                element={<TodoDashboard />}
              />
              <Route
                path="/goals"
                element={<GoalDashboard />}
              />
              <Route
                path="/projects"
                element={<ProjectDashboard />}
              />
              <Route
                path="/projects/:projectId"
                element={<SingleProject />}
              />
              <Route
                path="/profile"
                element={<ProfilePage />}
              />
            </Routes>
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
