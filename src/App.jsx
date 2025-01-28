import { useState, useEffect } from 'react'
import { onValue } from 'firebase/database'
import { counterRef, incrementCounter } from './firebase'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const unsubscribe = onValue(counterRef, (snapshot) => {
      const data = snapshot.val()
      if (data !== null) {
        setCount(data)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleClick = () => {
    incrementCounter(count)
  }

  return (
    <div className="container">
      <h1>Shared Counter</h1>
      <div className="card">
        <button onClick={handleClick}>
          Count is {count}
        </button>
        <p>
          Click the button to increment the counter for all users
        </p>
      </div>
    </div>
  )
}

export default App
