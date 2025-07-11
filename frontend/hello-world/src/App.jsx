import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';

function App() {
  const [view, setView] = useState('signup'); // "signup" or "login"
  const [theme, setTheme] = useState('light');

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <div
      className={
        theme === 'dark'
          ? 'bg-gray-800 text-white min-h-screen'
          : 'bg-gray-100 text-gray-900 min-h-screen'
      }
    >
      <div className="max-w-md mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">FB Clone Auth</h1>
          <div className="flex gap-2">
            <button
              onClick={toggleTheme}
              className="px-3 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
            >
              {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
            <button
              onClick={() =>
                setView((prev) => (prev === 'signup' ? 'login' : 'signup'))
              }
              className="px-3 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700"
            >
              {view === 'signup' ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </div>

        {/* Auth Forms */}
        {view === 'signup' ? <Signup /> : <Login />}
      </div>
    </div>
  );
}

export default App;
