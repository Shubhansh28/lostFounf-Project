import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const App = () => {
  const [data,setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/items');
        const resData = await response.json();
        setData(resData)
      } catch (error) {
        console.error(error)
      }
    };
    fetchData();
  }, []);
  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export default App