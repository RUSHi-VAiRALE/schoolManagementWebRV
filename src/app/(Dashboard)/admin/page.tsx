import AttendanceChart from '@/components/AttendanceChart'
import CountChart from '@/components/CountChart'
import UserCard from '@/components/UserCard'
import React from 'react'

export default function Admin() {
  return (
    <div className='flex flex-col p-4 md:flex-row gap-4'>
      {/* left Box */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
        {/*UserCard*/}
        <div className='flex gap-4 justify-between flex-wrap'>
          <UserCard type='student' /> 
          <UserCard type='teacher' />
          <UserCard type='parent' />
          <UserCard type='staff' />
        </div>
        {/*Middle charts*/}
        <div className='flex gap-4 flex-col lg:flex-row'>
          {/* Count Chart */}
          <div className='w-full lg:w-1/3 h-[450px]'>
            <CountChart />
          </div>
          {/* Student Attendance */}
          <div className='w-full lg:w-2/3 h-[450]'>
            <AttendanceChart />
          </div>
        </div>
        {/*Bottom charts*/}
        <div></div>
      </div>
      {/* right Box */}
      <div className='w-full lg:w-1/3 bg-green-400'>
        2
      </div>
    </div>
  )
}
