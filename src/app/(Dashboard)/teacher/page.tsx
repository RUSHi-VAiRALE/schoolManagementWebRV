'use client'

import React from 'react'
import Announcement from '@/components/Announcement'
import EventCalendar from '@/components/EventCalendar'
import BigCaledar from '@/components/BigCalendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

function Teacher() {
  return (
    <div className='flex flex-1 flex-col p-4 xl:flex-row gap-4'>
      {/* left Box */}
      <div className='w-full xl:w-2/3'>
        <div className='h-full bg-white p-4 rounded-md'>
          <h1 className='font-semibold text-xl'>Schedule(4A)</h1>
          <BigCaledar/>
        </div>
      </div>
      {/* right Box */}
      <div className='w-full xl:w-1/3 flex flex-col gap-8'>
        <EventCalendar/>
        <Announcement/>
      </div>
    </div>
  )
}

export default Teacher