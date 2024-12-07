"use client"

import React from 'react'
import Image from 'next/image'

function Announcement() {
  return (
    <div className='bg-white p-4 rounded-lg'>
        <div className='flex items-center justify-between'>
            <h1 className='text-xl font-semibold my-4'>Events</h1>
            <span className='text-xs text-gray-400'>View All</span>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
            <div className='bg-custColorLight rounded-md p-4'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-medium'>Lorem ipsum dolor sit amet consectetur </h2>
                    <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1'>2025-01-01</span>
                </div>
                <p className='text-sm text-gray-400 mt-1'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti doloribus ea aspernatur eum accusamus id </p>
            </div>
            <div className='bg-custPurpleLight rounded-md p-4'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-medium'>Lorem ipsum dolor sit amet consectetur </h2>
                    <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1'>2025-01-01</span>
                </div>
                <p className='text-sm text-gray-400 mt-1'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti doloribus ea aspernatur eum accusamus id </p>
            </div>
            <div className='bg-custYellowLight rounded-md p-4'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-medium'>Lorem ipsum dolor sit amet consectetur </h2>
                    <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1'>2025-01-01</span>
                </div>
                <p className='text-sm text-gray-400 mt-1'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti doloribus ea aspernatur eum accusamus id </p>
            </div>
        </div>
    </div>
  )
}

export default Announcement