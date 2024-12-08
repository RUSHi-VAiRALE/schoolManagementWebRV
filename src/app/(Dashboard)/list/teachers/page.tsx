import Pagination from '@/components/Pagination'
import TableList from '@/components/TableList'
import TableSearch from '@/components/TableSearch'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { role, teachersData } from '@/lib/data'

type Teacher = {
    id:number;
    teacherId:string;
    name:string;
    email?:string;
    photo:string;
    subjects:string[];
    classes:string[];
    address:string;
    phone:number;
}

const columns = [
    {
        header:"Info",
        accessor:'info'
    },
    {
        header:"Teacher Id",
        accessor: "teacherId",
        className: "hidden md:table-cell"
    },
    {
        header:"Subjects",
        accessor: "subjects",
        className: "hidden md:table-cell"
    },
    {
        header:"Classes",
        accessor: "classes",
        className: "hidden md:table-cell"
    },
    {
        header:"Phone",
        accessor: "phone",
        className: "hidden lg:table-cell"
    },
    {
        header:"Address",
        accessor: "address",
        className: "hidden lg:table-cell"
    },
    {
        header:"Actions",
        accessor: "action",
    },
]

function TeacherListPage() {

    const renderRow = (item:Teacher) => (
        <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-custPurpleLight'>
            <td className='flex items-center gap-4 p-4'>
                <Image src={item.photo} alt='photo' width={40} height={40} className='md:hidden xl:block w-10 h-10 object-cover rounded-full'/>
                <div className='flex flex-col'>
                    <h3 className='font-semibold'>{item.name}</h3>
                    <p className='text-xs text-gray-500'>{item?.email}</p>
                </div>
            </td>
            <td className='hidden md:table-cell'>{item.teacherId}</td>
            <td className='hidden md:table-cell'>{item.subjects.join(",")}</td>
            <td className='hidden md:table-cell'>{item.classes.join(",")}</td>
            <td className='hidden md:table-cell'>{item.phone}</td>
            <td className='hidden md:table-cell'>{item.address}</td>
            <td>
                <div className='flex items-center gap-2'>
                    <Link href={`/list/teachers/${item.id}`}>
                        <button className='w-7 h-7 flex items-center justify-center rounded-full bg-custColor'>
                            <Image src="/view.png" alt='' width={16} height={16}/>
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
            <h1 className='hidden md:block text-lg font-semibold'>All Teachers</h1>
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
        <TableList columns={columns} renderRow={renderRow} data={teachersData}/>
        {/*Pagination*/}
        <Pagination/>
    </div>
  )
}

export default TeacherListPage