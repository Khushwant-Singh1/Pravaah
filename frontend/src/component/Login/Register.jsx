import React, { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('User registered successfully');
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className='login-container'>
      <section className='login-sec'>
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          <div className="inputbox">
            <ion-icon name="mail-outline"></ion-icon>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>
          <div className="inputbox">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>
          <button type="submit">Register</button>
          {message && <p>{message}</p>}
        </form>
      </section>
    </div>
  );
};

export default Register;
