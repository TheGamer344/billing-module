import React, { useState } from 'react';

function Login({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded demo account
    if ((username === 'user' && password === 'password') || (username === 'demo' && password === 'demo')) {
      onLogin();
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-orange-500">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-2 mb-4 border rounded bg-gray-700 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 mb-4 border rounded bg-gray-700 text-white"
        />
        <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
