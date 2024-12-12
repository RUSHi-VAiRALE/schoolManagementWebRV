import Pagination from '@/components/Pagination'
import TableList from '@/components/TableList'
import TableSearch from '@/components/TableSearch'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { role} from '@/lib/data'
import FormModal from '@/components/FormModal'
import { Class, Prisma, Subject, Teacher } from '@prisma/client'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/settings'


type TeacherList = Teacher & {subject:Subject[]} & {classes:Class[]}

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

const renderRow = (item:TeacherList) => (
        <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-custPurpleLight'>
            <td className='flex items-center gap-4 p-4'>
                <Image src={item.img || '/avatar.png'} alt='photo' width={40} height={40} className='md:hidden xl:block w-10 h-10 object-cover rounded-full'/>
                <div className='flex flex-col'>
                    <h3 className='font-semibold'>{item.name}</h3>
                    <p className='text-xs text-gray-500'>{item?.email}</p>
                </div>
            </td>
            <td className='hidden md:table-cell'>{item.username}</td>
            <td className='hidden md:table-cell'>{item.subject.map(item=>item.name).join(",")}</td>
            <td className='hidden md:table-cell'>{item.classes.map(item=>item.name).join(',') || '-'}</td>
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
                        role === "admin" && (<FormModal table='teacher' type='delete' id={item.id}/>
                    )}
                </div>
            </td>
        </tr>
    )


async function TeacherListPage({searchParams,}:{searchParams:{[key:string]:string | undefined};}) {

    const {page , ...queryParams} = await searchParams;
    const p = page ? parseInt(page) : 1;

    const [data,count] = await prisma.$transaction([
        prisma.teacher.findMany(
        {
            include:{
                subject:true,
                classes:true,
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p-1),
        }),
        prisma.teacher.count()
    ])
    console.log("rendered")
    //console.log(data)
    
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
                    {role==='admin' && (<FormModal table='teacher' type='create'/>)}
                </div>
            </div>
        </div>

        {/*List*/}
        <TableList columns={columns} renderRow={renderRow} data={data}/>
        {/*Pagination*/}
        <Pagination page={p} count={count}/>
    </div>
  )
}

export default TeacherListPage