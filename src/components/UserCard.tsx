import Image from 'next/image'
import React from 'react'

function UserCard({type}:{type:string}) {
  return (
    <div className='rounded-2xl odd:bg-custPurple even:bg-custYellow p-4 flex-1 min-w-[130px]'>
        {/*section 1*/}
        <div className='flex justify-between items-center'>
            <span className='rounded-full px-2 py-1 h-6 bg-white text-[10px] text-green-600'>2024/05</span>
            <Image src="/more.png" alt='threeDots' width={20} height={20}/>
        </div>
        {/*section 2*/}
        <h1 className='text-2xl font-semibold my-4'>6,123</h1>
        {/*section 3*/}
        <h2 className='capitalize text-sm font-medium text-gray-500'>{type}</h2>
    </div>
  )
}

export default UserCard