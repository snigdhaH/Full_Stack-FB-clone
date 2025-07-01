import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 2);
  const decrement = () => setCount(prev => prev - 1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center">
        <h1 className="text-4xl font-bold mb-6 text-indigo-600">Counter</h1>
        <p className="text-6xl font-mono text-gray-800 mb-6">{count}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={increment}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl transition"
          >
            +2
          </button>
          <button
            onClick={decrement}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition"
          >
            -1
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
