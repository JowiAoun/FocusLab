import React, { useState } from 'react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // Create a new user object
    const newUser = {
      username: username,
      password: password,
    };

    // Send a POST request to the server
    fetch('https://focuslab.azurewebsites.net/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful signup
          console.log('Signup successful');
        } else {
          // Handle error
          console.error('Error creating user');
        }
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <div>
      <h1>Signup</h1>
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
        <input type="submit" value="Signup" />
      </form>
    </div>
  );
};

export default Signup;
