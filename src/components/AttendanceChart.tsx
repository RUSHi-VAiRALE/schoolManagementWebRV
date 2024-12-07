"use client"

import React from 'react'
import Image from 'next/image';

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Mon',
    present: 86,
    absent:78
  },
  {
    name: 'Tue',
    present: 56,
    absent: 45,
  },
  {
    name: 'Wed',
    present: 85,
    absent: 56,
  },
  {
    name: 'Thu',
    present: 80,
    absent: 38,
  },
  {
    name: 'Fri',
    present: 50,
    absent: 48
  },
];

function AttendanceChart() {
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
        {/*section 1 Title*/}
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Attendance</h1>
            <Image src='/moreDark.png' alt='moreDark' width={20} height={20}/>
        </div>
        {/*section 2 chart*/}
        <div className='w-full h-[90%]'>
            <ResponsiveContainer>
                <BarChart
                width={500}
                height={300}
                data={data}
                barSize={20}
                >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#bbb'/>
                <XAxis dataKey="name" axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false}/>
                <YAxis axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false}/>
                <Tooltip 
                    contentStyle={{borderRadius:"10px",borderColor:"lightgray"}}
                />
                <Legend 
                    align='left'
                    verticalAlign='top'
                    wrapperStyle={{paddingTop:"20x", paddingBottom:"40px"}}
                />
                <Bar dataKey="present" fill="#FAE27C" legendType='circle' radius={[10,10,0,0]}/>
                <Bar dataKey="absent" fill="#C3EBFA" legendType='circle' radius={[10,10,0,0]}/>
                </BarChart>
        </ResponsiveContainer>
        </div>
    </div>
  )
}

export default AttendanceChart