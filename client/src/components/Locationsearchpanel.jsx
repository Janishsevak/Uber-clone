import React from 'react'

const Locationsearchpanel = ({suggestions,setpickup,setdestination,activefield}) => {

  const handleSuggestions = (suggestion) => {
    if(activefield === "pickup"){
      setpickup(suggestion)
   } else if(activefield === "destination"){
    setdestination(suggestion)
  }
}
  return (
    <div>
      {
        suggestions.map((elem,index)=>(
          <div key={index} onClick={()=>{
            handleSuggestions(elem) 
          }} className='flex items-center border-2 p-2 mt-5 rounded-xl  border-gray-100 active:border-black active:border-2 justify-start my-4 gap-3 shadow-2xl hover:shadow-lg cursor-pointer'>
          <h2 className='bg-[#eee],rounded-full justify-center '><i className="ri-map-pin-2-fill text-xl"></i></h2>
          <h4 className='font-medium'>
            {elem}
          </h4>
         </div> 
        ))
      }
      

    </div>
  )
}

export default Locationsearchpanel 