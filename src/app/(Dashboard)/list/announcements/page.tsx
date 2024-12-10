import Pagination from '@/components/Pagination'
import TableList from '@/components/TableList'
import TableSearch from '@/components/TableSearch'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { role, announcementsData } from '@/lib/data'
import FormModal from '@/components/FormModal'

type Announcements = {
    id:number;
    title:string;
    class:string;
    date:string;
}

const columns = [
    {
        header:"Title",
        accessor:'title'
    },
    {
        header:"Class",
        accessor: "class",
    },
    {
        header:"Date",
        accessor: "date",
        className : "hidden md:table-cell"
    },
    {
        header:"Actions",
        accessor: "action",
    },
]

function AnnouncementListPage() {

    const renderRow = (item:Announcements) => (
        <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-custPurpleLight'>
            <td className='flex items-center gap-4 p-4'>
                <div className='flex flex-col'>
                    <h3 className='font-semibold'>{item.title}</h3>
                </div>
            </td>
            
            <td className='md:table-cell'>{item.class}</td>
            <td className='hidden md:table-cell'>{item.date}</td>
            <td>
                <div className='flex items-center gap-2'>
                    {role==='admin' && (
                        <>
                            <FormModal table='announcement' type='update' data={item}/>
                            <FormModal table='announcement' type='delete' id={item.id}/>
                        </>
                    )}
                </div>
            </td>
        </tr>
    )

  return (
    <div className='bg-white h-full p-4 rounded-md flex-1 mt-0 m-4'>
        {/* TOP */}
        <div className='flex items-center justify-between'>
            <h1 className='hidden md:block text-lg font-semibold'>All Announcements</h1>
            <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
                <TableSearch/>
                <div className='flex gap-4 self-end items-center'>
                    <button className='w-8 h-8 flex justify-center items-center bg-custYellow rounded-full'>
                        <Image src="/filter.png" alt='filter' width={14} height={14} />
                    </button>
                    <button className='w-8 h-8 flex justify-center items-center bg-custYellow rounded-full'>
                        <Image src="/sort.png" alt='plus' width={14} height={14} />
                    </button>
                    {role === 'admin' && <FormModal table='announcement' type='create' />}
                </div>
            </div>
        </div>

        {/*List*/}
        <TableList columns={columns} renderRow={renderRow} data={announcementsData}/>
        {/*Pagination*/}
        <Pagination/>
    </div>
  )
}

export default AnnouncementListPage;