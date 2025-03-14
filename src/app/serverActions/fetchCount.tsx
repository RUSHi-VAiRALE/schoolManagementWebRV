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