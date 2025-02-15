import { MicOff } from 'lucide-react'
import React from 'react'

const StopButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className='bg-red-300 rounded-full h-[48px] flex flex-row justify-center items-center gap-2 px-[28px] py-[14px] cursor-pointer hover:bg-red-400 transition duration-300'
    >
      <MicOff className='text-red-500' />
      <h2 className='text-red-500 font-semibold'>Stop Listening</h2>
    </button>
  )
}

export default StopButton
