import {useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Chat from './components/Chat/Chat';
import Login from './components/login/Login';

function App () {
  const [user, setUser] = useState (null);
  const [secret, setSecret] = useState (null);
  const isAuth = Boolean (user) && Boolean (secret);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/* Route for the home page */}
          <Route
            path="/"
            element={
              // If authenticated, navigate to the chat page
              isAuth
                ? <Navigate to="/chat" />
                : <Login setUser={setUser} setSecret={setSecret} />
            }
          />
          {/* Route for the chat page */}
          <Route
            path="/chat"
            element={
              // If authenticated, render the Chat component
              isAuth
                ? <Chat user={user} secret={secret} />
                : <Navigate to="/" />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
