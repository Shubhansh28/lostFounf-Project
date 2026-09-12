import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import "./global.css"

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
    <div className='w-screen h-screen'>
      
      <div className='w-screen h-15 bg-[oklch(0.696_0.17_162.48)] p-3 flex justify-between mb-10' >
        <h1 className='text-[#001d3d] font-bold text-3xl font-serif'>Lost & Found</h1>
        <button className='p-1.5 bg-[#e9c46a] font-semibold rounded-lg'>Report New Item</button>
      </div>
      
      <div className='w-screen h-fit bg-[#168aad] grid grid-cols-2 grid-flow-row gap-10 p-10 justify-items-center'>
        {data.map((el) => {
          return (
            <div key={el.id} className='bg-[#b5e48c] w-4/5 h-fit p-5 rounded-lg shadow-lg shadow-lime-500/10 pl-10'>
              <ul className='list-disc font-medium'>
                <li className='bg-[#809bce] w-fit p-1 rounded-lg mb-2.5'>Lost Item <span className='text-red-700'>{"===>"}</span> {el.itemName}</li>
                <li className='bg-[#95b8d1] w-fit p-1 rounded-lg mb-2.5'>Item Type <span className='text-red-700'>{"===>"}</span> {el.type}</li>
                <li className='bg-[#b8e0d2] w-fit p-1 rounded-lg mb-2.5'>Place Where Lost <span className='text-red-700'>{"===>"}</span> {el.place}</li>
                <li className='bg-[#d6eadf] w-fit p-1 rounded-lg mb-2.5'>Date When Lost <span className='text-red-700'>{"===>"}</span> {el.date}</li>
                <li className='bg-[#eac4d5] w-fit p-1 rounded-lg mb-2.5'>Owner Contact No. <span className='text-red-700'>{"===>"}</span> {el.contact}</li>
                <li className='bg-[#f5ebe0] w-fit p-1 rounded-lg mb-2.5'>Lost Status <span className='text-red-700'>{"===>"}</span> {el.status}</li>
              </ul>
              <div className="group flex justify-around items-center w-4/5 ml-9 mt-5 rounded-lg bg-[#003049] p-3 pb-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#003049]/40">
                <button className="rounded-lg bg-cyan-500 p-1.5 w-20 font-medium tracking-widest text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-cyan-500/50 active:scale-95">
                  Claim
                </button>

                <button className="rounded-lg bg-blue-500 p-1.5 w-20 font-medium tracking-widest text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-blue-500/50 active:scale-95">
                  Edit
                </button>

                <button className="rounded-lg bg-indigo-500 p-1.5 w-20 font-medium tracking-widest text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-indigo-500/50 active:scale-95">
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App