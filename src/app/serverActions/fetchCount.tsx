"use server"

import prisma from "@/lib/prisma";

export async function fetchCount():Promise<{girls:number , boys:number}> {
    const data = await prisma.student.groupBy({
        by:["sex"],
        _count:true
    })
    return {
        boys: data.find((d) => d.sex === "MALE")?._count ?? 0,
        girls: data.find((d) => d.sex === "FEMALE")?._count ?? 0,
    };
}

export async function fetchEvents(date:string) {
    
    const parsedDate = new Date(date).toISOString().split('T')[0];
    console.log(parsedDate)
    const events = await prisma.event.findMany({
        where :{startDate:{
            gte:parsedDate+'T00:00:00.000Z',
            lte:parsedDate+'T23:59:59.999Z'
        }} ,
        select:{
            id:true,
            title:true,
            startDate:true,
            endDate:true,
            description:true
        }
    })
    //console.log(events)
    return events;
}