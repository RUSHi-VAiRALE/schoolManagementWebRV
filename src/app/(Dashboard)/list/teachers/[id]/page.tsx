'use client'
import Announcement from '@/components/Announcement'
import BigCaledar from '@/components/BigCalendar'
import Performance from '@/components/Performance'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function SingleTeacherPage() {
  return (
    <div className='flex-1 p-4 flex flex-col xl:flex-row gap-4'>
        {/* Left */}
        <div className='w-full xl:w-2/3'>
            {/*TOP*/}
            <div className='flex flex-col lg:flex-row gap-4'>
                {/*User info card*/}
                <div className='bg-custColor py-6 px-4 rounded-md flex-1 flex gap-4'>
                    <div className='w-1/3'>
                        <Image src="https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=1200" alt='photo' width={140} height={140} className='w-36 h-36 rounded-full object-cover'/>
                    </div>
                    <div className='w-2/3 flex flex-col justify-between gap-4'>
                        <h1 className='text-xl font-semibold'>Leonard Snyder</h1>
                        <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
                        <div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
                            <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                                <Image src='/blood.png' alt='' width={14} height={14}/>
                                <span>O+</span>
                            </div>
                            <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                                <Image src='/date.png' alt='' width={14} height={14}/>
                                <span>january 2025</span>
                            </div>
                            <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                                <Image src='/mail.png' alt='' width={14} height={14}/>
                                <span>user@gmail.com</span>
                            </div>
                            <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                                <Image src='/blood.png' alt='' width={14} height={14}/>
                                <span>+1 234 567</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Small cards*/}
                <div className='flex-1 flex gap-4 justify-between flex-wrap'>
                    {/*Card*/}
                    <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[47.5%]'>
                        <Image src="/singleAttendance.png" alt='' width={24} height={24} className='w-6 h-6'/>
                        <div>
                            <h1 className='text-xl font-semibold'>90%</h1>
                            <span className='text-sm text-gray-400'>Attendance</span>
                        </div>
                    </div>
                    <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[47.5%]'>
                        <Image src="/singleBranch.png" alt='' width={24} height={24} className='w-6 h-6'/>
                        <div>
                            <h1 className='text-xl font-semibold'>2</h1>
                            <span className='text-sm text-gray-400'>Branches</span>
                        </div>
                    </div>
                    <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[47.5%]'>
                        <Image src="/singleLesson.png" alt='' width={24} height={24} className='w-6 h-6'/>
                        <div>
                            <h1 className='text-xl font-semibold'>6</h1>
                            <span className='text-sm text-gray-400'>Lessons</span>
                        </div>
                    </div>
                    <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[47.5%]'>
                        <Image src="/singleClass.png" alt='' width={24} height={24} className='w-6 h-6'/>
                        <div>
                            <h1 className='text-xl font-semibold'>6</h1>
                            <span className='text-sm text-gray-400'>Classes</span>
                        </div>
                    </div>
                </div>
            </div>
            {/*bottom*/}
            <div className='mt-4 bg-white rounded-md p-4 h-full'>
                <h1 className='font-semibold text-lg'>Teacher&apos;s Schedule</h1>
                <BigCaledar/>
            </div>
        </div>

        {/*Right*/}
        <div className='w-full xl:w-1/3 flex flex-col gap-4'>
            <div className='bg-white p-4 rounded-md'>
                <h1 className='text-xl font-semibold'>Shortcuts</h1>
                <div className='mt-4 flex gap-4 flex-wrap text-xs text-gray-500'>
                    <Link className='p-3 rounded-md bg-custColorLight' href={`/list/classes?supervisorId=${"teacher12"}`}>Teacher&apos;s Class</Link>
                    <Link className='p-3 rounded-md bg-custPurpleLight' href={`/list/students?teacherId=${"teacher2"}`}>Teacher&apos;s Students</Link>
                    <Link className='p-3 rounded-md bg-custYellowLight' href={`/list/lessons?teacherId=${"teacher2"}`}>Teacher&apos;s Lessons</Link>
                    <Link className='p-3 rounded-md bg-pink-50' href={`/list/exams?teacherId=${"teacher2"}`}>Teacher&apos;s Exams</Link>
                    <Link className='p-3 rounded-md bg-custColorLight' href={`/list/assignments?teacherId=${"teacher2"}`}>Teacher&apos;s Assignments</Link>
                </div>
            </div>
            <Performance/>
            <Announcement/>
        </div>
    </div>
  )
}

export default SingleTeacherPage