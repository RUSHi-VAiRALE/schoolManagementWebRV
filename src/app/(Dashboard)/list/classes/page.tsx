import Pagination from '@/components/Pagination'
import TableList from '@/components/TableList'
import TableSearch from '@/components/TableSearch'
import Image from 'next/image'
import React from 'react'
import { role, classesData } from '@/lib/data'
import FormModal from '@/components/FormModal'
import { Class, Teacher, Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/settings'

type ClassList = Class & {supervisor:Teacher}

const columns = [
    {
        header:"Class Name",
        accessor:'name'
    },
    {
        header:"Capacity",
        accessor: "capacity",
        className: "hidden md:table-cell"
    },
    {
        header:"Grade",
        accessor: "grade",
        className: "hidden md:table-cell"
    },
    {
        header:"Supervisor",
        accessor: "supervisor",
        className: "md:table-cell"
    },
    {
        header:"Actions",
        accessor: "action",
    },
]

const renderRow = (item:ClassList) => (
    <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-custPurpleLight'>
        <td className='flex items-center gap-4 p-4'>
            <div className='flex flex-col'>
                <h3 className='font-semibold'>{item.name}</h3>
            </div>
        </td>
        <td className='hidden md:table-cell'>{item.capacity}</td>
        <td className='hidden md:table-cell'>{item.name[0]}</td>
        <td className='md:table-cell'>{item.supervisor.name + " " + item.supervisor.surname}</td>
        <td>
            <div className='flex items-center gap-2'>
                {role==='admin' && (
                    <>
                        <FormModal table='class' type='update' data={item}/>
                        <FormModal table='class' type='delete' id={item.id}/>
                    </>
                )}
            </div>
        </td>
    </tr>
)

async function ClassListPage({searchParams,}:{searchParams:{[key:string]:string | undefined};}) {

        const {page , ...queryParams} = await searchParams;
    const p = page ? parseInt(page) : 1;

    // URL Params condition

    const query: Prisma.ClassWhereInput = {}

    if(queryParams){
        for(const [key,value] of Object.entries(queryParams)){
            if(value !== undefined){
                switch (key) {
                    case "supervisorId":
                        query.supervisorId = value
                        break;
                    case "search":
                        query.name = {contains:value, mode:"insensitive"}
                        break;
                    default:
                        break;
                }
            }
        }
    }

    const [data,count] = await prisma.$transaction([
        prisma.class.findMany(
        {
            where:query,
            include:{
                supervisor:true,
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p-1),
        }),
        prisma.class.count({where:query})
    ])

  return (
    <div className='bg-white h-full p-4 rounded-md flex-1 mt-0 m-4'>
        {/* TOP */}
        <div className='flex items-center justify-between'>
            <h1 className='hidden md:block text-lg font-semibold'>All Classes</h1>
            <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
                <TableSearch/>
                <div className='flex gap-4 self-end items-center'>
                    <button className='w-8 h-8 flex justify-center items-center bg-custYellow rounded-full'>
                        <Image src="/filter.png" alt='filter' width={14} height={14} />
                    </button>
                    <button className='w-8 h-8 flex justify-center items-center bg-custYellow rounded-full'>
                        <Image src="/sort.png" alt='plus' width={14} height={14} />
                    </button>
                    {
                        role==='admin' && <FormModal table='class' type='create' />
                    }
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

export default ClassListPage