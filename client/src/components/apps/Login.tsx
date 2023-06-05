import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // Create a login object
    const loginData = {
      username: username,
      password: password,
    };

    // Send a POST request to the server
    fetch('https://focuslab.azurewebsites.net/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful login
          console.log('Login successful');
        } else if (response.status === 401) {
          // Handle invalid credentials
          console.error('Invalid username or password');
        } else {
          // Handle other errors
          console.error('Error logging in');
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br /><br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br /><br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
