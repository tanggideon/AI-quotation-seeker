import { Mic } from 'lucide-react'
import React from 'react'

const ContinueButton = () => {
  return (
    <div className='bg-black rounded-full h-[48px] flex flex-row justify-center items-center gap-2 px-[28px] py-[14px]'>
            <Mic className='text-white'/>
            <h2 className='text-white font-semibold'>Continue Listening</h2>
    </div>
  )
}

export default ContinueButton