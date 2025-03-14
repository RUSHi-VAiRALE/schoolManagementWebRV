"use client"

import Image from 'next/image';
import React, { useState } from 'react'
import TeacherForm from './Forms/TeacherForm';

function FormModal({table,type,data,id}:{
    table : "teacher" | "student" | "parent" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement";
    type: "create" | "update" | "delete";
    data?:any;
    id?:number | string;
}){
    const size = type==='create' ? "w-8 h-8" : "w-7 h-7"
    const bgColor = type === 'create' ? "bg-custYellow" : type === 'update' ? "bg-custColor" : "bg-custPurple"

    const [open, setOpen] = useState(false);

    const Form = () => {
      return type === 'delete' && id ? (
        <form action='' className='p-4 flex flex-col gap-4'>
          <span className='text-center font-medium'>All data will be lost. Are you sure you want to delete this {table}?</span>
          <button className='bg-red-700 text-white py-2 px-4 rounded-md border-none self-center'>Delete</button>
        </form>
      ) : (
        <TeacherForm type='create'/>
      )
    }


  return <>
    <button className={
        `${size} flex justify-center items-center rounded-full ${bgColor}`} 
        onClick={()=>setOpen(true)
      }>
        <Image src={`/${type}.png`} alt='' width={14} height={14}/>
    </button>
    {open && (
      <div className='w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center'>
        <div className='bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]'>
          <Form />
          <div className='absolute top-4 right-4' onClick={()=>setOpen(false)}>
          <Image src='/close.png' alt='close' width={14} height={14}/>
        </div>
        </div> 
      </div>
    )}
  </>
}

export default FormModal;