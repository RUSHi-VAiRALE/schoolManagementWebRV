import Pagination from '@/components/Pagination'
import TableList from '@/components/TableList'
import TableSearch from '@/components/TableSearch'
import Image from 'next/image'
import React from 'react'
import { role, resultsData } from '@/lib/data'
import FormModal from '@/components/FormModal'
import { Prisma ,Result, Student, Exam, Assignment} from '@prisma/client'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/settings'
import { it } from 'node:test'

type ResultList = {
            id:number,
            title:string,
            studentName:string,
            studentSurname:string,
            teacherName : string,
            teacherSurname : string,
            score : number,
            className : string,
            startTime : Date
}

const columns = [
    {
        header:"Title",
        accessor:'title'
    },
    {
        header:"Student",
        accessor: "student",
    },
    {
        header:"Score",
        accessor: "score",
        className : "hidden md:table-cell"
    },
    {
        header:"Teacher",
        accessor: "teacher",
        className: "hidden md:table-cell"
    },
    {
        header : "Class",
        accessor: "class",
        className : "hidden md:table-cell"
    },
    {
        header:"Date",
        accessor: "date",
        className: "hidden md:table-cell"
    },
    {
        header:"Actions",
        accessor: "action",
    },
]

const renderRow = (item:ResultList) => (
    <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-custPurpleLight'>
        <td className='flex items-center gap-4 p-4'>
            <div className='flex flex-col'>
                <h3 className='font-semibold'>{item.title}</h3>
            </div>
        </td>
        
        <td className='md:table-cell'>{item.studentName + " " + item.studentSurname}</td>
        <td className='hidden md:table-cell'>{item.score}</td>
        <td className='hidden md:table-cell'>{item.teacherName + " " + item.teacherSurname}</td>
        <td className='hidden md:table-cell'>{item.className}</td>
        <td className='hidden md:table-cell'>{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
        <td>
            <div className='flex items-center gap-2'>
                {role==='admin' && (
                    <>
                        <FormModal table='result' type='update' data={item}/>
                        <FormModal table='result' type='delete' id={item.id}/>
                    </>
                )}
            </div>
        </td>
    </tr>
)

async function ResultListPage({searchParams,}:{searchParams:{[key:string]:string | undefined};}) {

    const {page , ...queryParams} = await searchParams;
    const p = page ? parseInt(page) : 1;

    // URL Params condition

    const query: Prisma.ResultWhereInput = {}

    if(queryParams){
        for(const [key,value] of Object.entries(queryParams)){
            if(value !== undefined){
                switch (key) {
                    case "studentId":
                        query.studentId = value;
                        break;
                    case "search":
                        query.OR = [
                            {exam:{title:{contains:value, mode:"insensitive"}}},
                            {student:{name:{contains:value, mode:"insensitive"}}},
                        ]
                        break;
                    default:
                        break;
                }
            }
        }
    }

    const [dataRes,count] = await prisma.$transaction([
        prisma.result.findMany(
        {
            where:query,
            include:{
                exam : {
                    include:{
                        lesson:{
                            select:{
                                class: {select:{name:true}},
                                teacher: {select:{name:true, surname:true}},
                            }
                        }
                    }
                },
                student: {select:{name:true, surname:true}},
                assignment : {
                    include:{
                        lesson:{
                            select:{
                                class: {select:{name:true}},
                                teacher: {select:{name:true, surname:true}},
                            }
                        }
                    }
                },
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p-1),
        }),
        prisma.result.count({where:query})
    ])

    const data = dataRes.map((item) => {
        const assessment = item.exam || item.assignment
        if(!assessment) return null
        const isExam = "startTime" in assessment;
        return{
            id:item.id,
            title:assessment.title,
            studentName:item.student.name,
            studentSurname:item.student.surname,
            teacherName : assessment.lesson.teacher.name,
            teacherSurname : assessment.lesson.teacher.surname,
            score : item.score,
            className : assessment.lesson.class.name,
            startTime : isExam? assessment.startTime : null
        };
    })

  return (
    <div className='bg-white h-full p-4 rounded-md flex-1 mt-0 m-4'>
        {/* TOP */}
        <div className='flex items-center justify-between'>
            <h1 className='hidden md:block text-lg font-semibold'>All Results</h1>
            <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
                <TableSearch/>
                <div className='flex gap-4 self-end items-center'>
                    <button className='w-8 h-8 flex justify-center items-center bg-custYellow rounded-full'>
                        <Image src="/filter.png" alt='filter' width={14} height={14} />
                    </button>
                    <button className='w-8 h-8 flex justify-center items-center bg-custYellow rounded-full'>
                        <Image src="/sort.png" alt='plus' width={14} height={14} />
                    </button>
                    {role==='admin' && <FormModal table='result' type='create'/>}
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

export default ResultListPage;