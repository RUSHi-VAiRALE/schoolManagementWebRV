'use client'

import Image from 'next/image';
import React from 'react'
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import { fetchCount } from '@/app/serverActions/fetchCount';
import { useEffect , useState} from 'react';
import { Girassol } from 'next/font/google';


function CountChart() {
  const [dataTmp, setDataTmp] = useState<{girls:number ; boys:number}>({
    girls : 0,
    boys : 0
  })
  useEffect(() => {
    const updateCount = async () => {
      const data = await fetchCount();
      setDataTmp(data);
    }
    updateCount();
  },[])
  const data = [
  {
    name: 'Total',
    count: dataTmp.boys+dataTmp.girls,
    fill: 'white',
  },
  {
    name: 'Girls',
    count: dataTmp.girls,
    fill: '#FAE27C',
  },
  {
    name: 'Boys',
    count: dataTmp.boys,
    fill: '#C3EBFA',
  },
];
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
        {/*section 1 Title*/}
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Students</h1>
            <Image src='/moreDark.png' alt='moreDark' width={20} height={20}/>
        </div>
        {/*section 2 chart*/}
        <div className='w-full h-[75%] relative'>
            <ResponsiveContainer>
                <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
                    <RadialBar
                        background
                        dataKey="count"
                    />
                </RadialBarChart>
            </ResponsiveContainer>
            <Image src='/maleFemale.png' alt='maleFemale' width={50} height={50} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
        </div>
        {/*section 3 bottom*/}
        <div className='flex gap-16 justify-center'>
            <div className='flex flex-col gap-1'>
                <div className='w-5 h-5 bg-custColor rounded-full'></div>
                <h1 className='font-bold'>{dataTmp.boys}</h1>
                <h2 className='text-xs text-gray-300'>Boys ({(dataTmp.boys!==0)?Math.round((dataTmp.boys/(dataTmp.boys+dataTmp.girls)) * 100):0}%)</h2>
            </div>
            <div className='flex flex-col gap-1'>
                <div className='w-5 h-5 bg-custYellow rounded-full'></div>
                <h1 className='font-bold'>{dataTmp.girls}</h1>
                <h2 className='text-xs text-gray-300'>Girls ({(dataTmp.girls!==0)?Math.round((dataTmp.girls/(dataTmp.boys+dataTmp.girls)) * 100):0}%)</h2>
            </div>
        </div>
    </div>
  )
}

export default CountChart