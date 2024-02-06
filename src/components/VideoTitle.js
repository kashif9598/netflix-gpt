import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='pt-[20%] px-24 absolute bg-gradient-to-r from-black text-white w-screen aspect-video'>
        <h1 className='text-4xl font-bold'>{title}</h1>
        <p className='py-6 text-lg w-1/2'>{overview}</p>
        <div>
            <button className='bg-white px-10 p-2 font-bold rounded-md text-black hover:bg-opacity-50'>Play</button>
            <button className='bg-gray-500 px-10 p-2 text-white font-bold rounded-md mx-2 bg-opacity-50'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle