import Pagination from '@/components/Pagination'
import TableList from '@/components/TableList'
import TableSearch from '@/components/TableSearch'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { role, lessonsData } from '@/lib/data'

type Lesson = {
    id:number;
    subject:string;
    class:string;
    teacher:string;
}

const columns = [
    {
        header:"Subject Name",
        accessor:'name'
    },
    {
        header:"Class Name",
        accessor: "class",
    },
    {
        header:"Teacher",
        accessor: "teacher",
        className: "hidden md:table-cell"
    },
    {
        header:"Actions",
        accessor: "action",
    },
]

function LessonListPage() {

    const renderRow = (item:Lesson) => (
        <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-custPurpleLight'>
            <td className='flex items-center gap-4 p-4'>
                <div className='flex flex-col'>
                    <h3 className='font-semibold'>{item.subject}</h3>
                </div>
            </td>
            <td className='md:table-cell'>{item.class}</td>
            <td className='hidden md:table-cell'>{item.teacher}</td>
            <td>
                <div className='flex items-center gap-2'>
                    <Link href={`/list/teachers/${item.id}`}>
                        <button className='w-7 h-7 flex items-center justify-center rounded-full bg-custColor'>
                            <Image src="/edit.png" alt='' width={16} height={16}/>
                        </button>
                    </Link>
                    {
                        role === "admin" && (<button className='w-7 h-7 flex items-center justify-center rounded-full bg-custPurple'>
                            <Image src="/delete.png" alt='' width={16} height={16}/>
                        </button>
                    )}
                </div>
            </td>
        </tr>
    )

  return (
    <div className='bg-white h-full p-4 rounded-md flex-1 mt-0 m-4'>
        {/* TOP */}
        <div className='flex items-center justify-between'>
            <h1 className='hidden md:block text-lg font-semibold'>All Lessons</h1>
            <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
                <TableSearch/>
                <div className='flex gap-4 self-end items-center'>
                    <button className='w-8 h-8 flex justify-center items-center bg-custYellow rounded-full'>
                        <Image src="/filter.png" alt='filter' width={14} height={14} />
                    </button>
                    <button className='w-8 h-8 flex justify-center items-center bg-custYellow rounded-full'>
                        <Image src="/sort.png" alt='plus' width={14} height={14} />
                    </button>
                    <button className='w-8 h-8 flex justify-center items-center bg-custYellow rounded-full'>
                        <Image src="/plus.png" alt='plus' width={14} height={14} />
                    </button>
                </div>
            </div>
        </div>

        {/*List*/}
        <TableList columns={columns} renderRow={renderRow} data={lessonsData}/>
        {/*Pagination*/}
        <Pagination/>
    </div>
  )
}

export default LessonListPage