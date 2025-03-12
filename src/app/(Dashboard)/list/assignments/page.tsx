import Pagination from '@/components/Pagination'
import TableList from '@/components/TableList'
import TableSearch from '@/components/TableSearch'
import Image from 'next/image'
import React from 'react'
import { role, assignmentsData } from '@/lib/data'
import FormModal from '@/components/FormModal'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/settings'
import { Prisma, Assignment,Subject,Class,Teacher } from '@prisma/client'
import { currentUser } from '@clerk/nextjs/server'

type AssignmentList = Assignment & {lesson:{subject:Subject, class:Class, teacher:Teacher}}

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
        header:"Due Date",
        accessor: "dueDate",
        className: "hidden md:table-cell"
    },
    {
        header:"Actions",
        accessor: "action",
    },
]
const renderRow = (item:AssignmentList) => (
    <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-custPurpleLight'>
        <td className='flex items-center gap-4 p-4'>
            <div className='flex flex-col'>
                <h3 className='font-semibold'>{item.lesson.subject.name}</h3>
            </div>
        </td>
        <td className='md:table-cell'>{item.lesson.class.name}</td>
        <td className='hidden md:table-cell'>{item.lesson.teacher.name + " " + item.lesson.teacher.surname}</td>
        <td className='hidden md:table-cell'>{new Intl.DateTimeFormat("en-US").format(item.dueDate)}</td>
        <td>
            <div className='flex items-center gap-2'>
                {role==='admin' && (
                    <>
                        <FormModal table='assignment' type='update' data={item}/>
                        <FormModal table='assignment' type='delete' id={item.id}/>
                    </>
                )}
            </div>
        </td>
    </tr>
)

async function AssignmentListPage({searchParams,}:{searchParams:{[key:string]:string | undefined};}) {

    const {page , ...queryParams} = await searchParams;
    const userRole = await currentUser();
    const p = page ? parseInt(page) : 1;

    // URL Params condition

    const query: Prisma.AssignmentWhereInput = {}
    query.lesson = {}
    if(queryParams){
        for(const [key,value] of Object.entries(queryParams)){
            if(value !== undefined){
                switch (key) {
                    case "classId":
                        query.lesson = {classId : parseInt(value)};
                        break;
                    case "teacherId":
                        query.lesson = {teacherId : value};
                        break;
                    case "search":
                        query.lesson = {
                            subject:{
                                name:{
                                    contains: value,
                                    mode : "insensitive"
                                },
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }
    
    switch (userRole?.publicMetadata.role) {
        case "admin":
            break;
        case "student":
            query.lesson.class = {
                students:{
                    some:{
                        id : 'student2'
                    }
                }
            };
            break
        case "teacher":
            query.lesson.teacherId = 'teacher3'
            break
        case "parent":
            query.lesson.class = {
                students:{
                    some:{
                        parentId : 'parentId1'
                    }
                }
            }
            break
        default:
            break;
    }
    const [data,count] = await prisma.$transaction([
        prisma.assignment.findMany(
        {
            where:query,
            include:{
                lesson:{
                    select:{
                        subject:true,
                        class:true,
                        teacher:true,
                    }
                }
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p-1),
        }),
        prisma.assignment.count({where:query})
    ])

return (
    <div className='bg-white h-full p-4 rounded-md flex-1 mt-0 m-4'>
        {/* TOP */}
        <div className='flex items-center justify-between'>
            <h1 className='hidden md:block text-lg font-semibold'>All Assignments</h1>
            <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
                <TableSearch/>
                <div className='flex gap-4 self-end items-center'>
                    <button className='w-8 h-8 flex justify-center items-center bg-custYellow rounded-full'>
                        <Image src="/filter.png" alt='filter' width={14} height={14} />
                    </button>
                    <button className='w-8 h-8 flex justify-center items-center bg-custYellow rounded-full'>
                        <Image src="/sort.png" alt='plus' width={14} height={14} />
                    </button>
                    {role === 'admin' && <FormModal table='assignment' type='create' />}
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

export default AssignmentListPage;