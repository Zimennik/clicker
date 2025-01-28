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
      <button onClick={handleClick}>
        {count}
      </button>
    </div>
  )
}

export default App
