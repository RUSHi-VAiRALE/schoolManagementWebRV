import Image from 'next/image'
import React from 'react'

function Navbar() {
  return (
    <div className='flex justify-between items-center p-4'>
      {/* Search bar */}
      <div className='hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
        <Image src="/search.png" alt='search' width={14} height={14}/>
        <input type='text' placeholder='Search...' className='w-[200px] p-2 bg-transparent outline-none'/>
      </div>
       {/* Icon and user */}
      <div className='flex items-center gap-6 justify-end w-full'>
        <div className='flex justify-center bg-white rounded-full w-7 h-7 items-center cursor-pointer'>
          <Image src="/message.png" alt='message' width={20} height={20}/>
        </div>
        <div className='flex justify-center bg-white rounded-full w-7 h-7 items-center cursor-pointer relative'>
          <Image src="/announcement.png" alt='announcement' width={20} height={20} />
          <div className='absolute -top-3 -right-3 w-5 h-5 items-center pl-2 pt-1 justify-center bg-purple-500 text-white rounded-full text-xs' >1</div>
        </div>
        <div className='flex flex-col'>
          <span className='text-xs leading-3 font-medium'>Rushi</span>
          <span className='text-[10px] text-gray-500 text-right'>Admin</span>
        </div>
        <Image src='/avatar.png' alt='avatar' width={36} height={36} className='rounded-full' />
      </div>
    </div>
  )
}

export default Navbar