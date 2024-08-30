import React from 'react'
import MapBox from './MapBox'
import WeatherDisplay from './WeatherDisplay'
import Citz from './Citz'
const Main = () => {
  return (
    <div className=' flex h-[90vh] justify-center p-2 w-full bg-blue-300'>
        <div className='flex flex-col max-w-6xl items-center w-full'>
            <div className='flex w-full flex-row h-full gap-10'>
                <WeatherDisplay />
                <MapBox />
                <Citz />
            </div>
            <div className='flex h-full flex-row '>

            </div>
        </div>
    </div>
  )
}

export default Main