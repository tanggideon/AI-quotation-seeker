import { Mic } from 'lucide-react'
import React from 'react'

const StartButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className='bg-black rounded-full h-[48px] flex flex-row justify-center items-center gap-2 px-[28px] py-[14px] cursor-pointer hover:bg-gray-800 transition duration-300'
    >
      <Mic className='text-white' />
      <h2 className='text-white font-semibold'>Start Listening</h2>
    </button>
  )
}

export default StartButton
