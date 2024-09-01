import React from 'react'

const WatherDisplay = () => {
  return (
    <div className='isolate aspect-video bg-white/20 shadow-lg ring-1 ring-black/10 w-[25%] rounded-2xl '>
        <h3 className='p-3 '>Current Weather</h3>
        <img src="/weather-app.png" alt="" className='w-[11.65vh] h-[11.65vh] relative top-8 left-5 ' />
        <h1 className='text-4xl relative left-10 bottom-8'>25&deg;C</h1>
      <div className='flex flex-row gap-8 p-1 relative -bottom-8'>
        <img src="https://img.icons8.com/?size=100&id=Nn9CKpExQ3wn&format=png&color=000000" alt="" className='w-10 h-10  '/>
        <img src="https://img.icons8.com/?size=100&id=y9ZLj50ta7xS&format=png&color=000000" alt="" className='w-10 h-10  ' />
        <img src="https://img.icons8.com/?size=100&id=WD34LOxyxWwv&format=png&color=000000" alt="" className='w-10 h-10  ' />
        <img src="https://img.icons8.com/?size=100&id=5tpnFthSXugw&format=png&color=000000" alt="" className='w-10 h-10'/>
      </div>    
      
    </div>
  )
}

export default WatherDisplay