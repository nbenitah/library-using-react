import React, { useState } from 'react';

function Counter() {
  const [counter, setCounter] = useState(0);

  function incrementCounter() {
    setCounter(prevCounter => prevCounter + 1);
  }

  function decrementCounter() {
    setCounter(prevCounter => prevCounter - 1);
  }

  return (
    <div>
      <button onClick={decrementCounter}>-</button>
      <span>{counter}</span>
      <button onClick={incrementCounter}>+</button>
    </div>
  );
}

export default Counter;