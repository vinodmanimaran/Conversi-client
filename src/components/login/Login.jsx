import { useState, useEffect } from 'react';
import { usePostLoginMutation, usePostSignUpMutation } from '../../state/api';

const Login = ({ setUser, setSecret }) => {
  const [isRegister, setIsRegister] = useState(false); // State to track whether the user is registering or logging in
  const [username, setUsername] = useState(''); // State to store the entered username
  const [password, setPassword] = useState(''); // State to store the entered password
  const [triggerLogin, resultLogin] = usePostLoginMutation(); // Mutation hook for login
  const [triggerSignUp] = usePostSignUpMutation(); // Mutation hook for registration

  const handleLogin = () => {
    triggerLogin({ username, password }); // Trigger the login mutation with the entered username and password
  };

  const handleRegister = () => {
    triggerSignUp({ username, password }); // Trigger the registration mutation with the entered username and password
  };

  useEffect(() => {
    if (resultLogin.data?.response) {
      // If the login mutation is successful and a response is received
      setUser(username); // Set the user using the entered username
      setSecret(password); // Set the secret using the entered password
    }
  }, [resultLogin.data]); // Trigger useEffect when resultLogin.data changes

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="title">Conversi
</h2>
        <p
          className="register-change"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Already a user?' : 'Are you a new user?'}
        </p>

        <div>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update the username state as the input value changes
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update the password state as the input value changes
          />
        </div>

        <div className="login-actions">
          {isRegister ? (
            <button type="button" onClick={handleRegister}>
              Register
            </button>
          ) : (
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
