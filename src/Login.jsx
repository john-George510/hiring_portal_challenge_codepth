// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase.config'; // Adjust the path as needed

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate('/');
        // ...
      })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError(error.message);
    }
  };

  return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-md w-96 backdrop-blur-lg bg-opacity-30">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 w-full rounded-md bg-gray-100"
                />
              </div>
    
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 w-full rounded-md bg-gray-100"
                />
              </div>
    
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
              >
                Login
              </button>
            </form>
    
            {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
          </div>
        </div>
  );
};

export default Login;
