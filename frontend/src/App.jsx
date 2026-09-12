import React from 'react'
import { useEffect,useState,useRef } from 'react'
import "./global.css"

const App = () => {
  const [data,setData] = useState([])
  const [popup,setPopup] = useState(false)
  const inputRef = useRef(null)
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
  
  useEffect(()=>{
    const handleClick = (e) => {
      if (popup && inputRef.current && !inputRef.current.contains(e.target)) {
        setPopup(false)
      }
    }
    if (popup){
      document.addEventListener('mousedown',handleClick)
    }
    return ()=>{document.removeEventListener('mousedown',handleClick)}
  },[popup])

  const fields = [
  {
    id: "name",
    name: "itemName",
    label: "Item Name",
    placeholder: "Macbook pro charger",
    type: "text",
  },
  {
    id: "location",
    name: "place",
    label: "Place",
    placeholder: "class room 505",
    type: "text",
  },
  {
    id: "date",
    name: "date",
    label: "Date",
    placeholder: "select a date",
    type: "text",
  },
  {
    id: "contact",
    name: "contact",
    label: "Contact",
    placeholder: "Enter your Contact",
    type: "text",
  },
]
  return (
    <div className='w-screen h-screen'>
      
      <div className={`w-screen h-15 bg-[oklch(0.696_0.17_162.48)] p-3 flex justify-between mb-10 relative ${popup?'pointer-events-none opacity-50':'pointer-events-auto'}`} >
        <h1 className='text-[#001d3d] font-bold text-3xl font-serif'>Lost & Found</h1>
        <button className='p-1.5 bg-[#e9c46a] font-semibold rounded-lg cursor-pointer' onClick={()=>{setPopup(!popup)}}>Report New Item</button>
      </div>

      {popup && (
        <div className='w-1/3 h-3/4 bg-white absolute left-1/2 -translate-x-1/2 -translate-y-1/10 z-1 rounded-2xl' ref={inputRef}>
          <h1 className='text-teal-800 text-center p-5 font-bold text-4xl font-heading2'>Report a New Item</h1>
          <div className='p-5'>
            {fields.map((field) => (
              <div key={field.id} className="mb-3">
                <label htmlFor={field.id}>{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.name}
                  id={field.id}
                  className="w-full rounded-lg border border-gray-400 p-1.5 pl-2 outline-0"
                  onFocus={field.id === "date"? (event) => {event.target.type = "date"}: undefined}
                  onBlur={field.id === "date"? (event) => {if (!event.target.value) {event.target.type = "text"}}: undefined}
                  required
                />
              </div>
            ))}
            
            <label htmlFor='disc'>Discription</label>
            <textarea name="discription"
            id='disc'
            className='w-full border border-gray-400 outline-0 p-1.5 pl-2 rounded-lg'
            placeholder='Discription of your lost item'>
            </textarea>

          </div>
        </div>
      )}

      <div className={`w-screen h-fit bg-[#168aad] grid grid-cols-2 grid-flow-row gap-10 p-10 justify-items-center ${popup?'pointer-events-none opacity-50':'pointer-events-auto'}`}>
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