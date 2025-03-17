'use client'

import Image from 'next/image';
import React,{useEffect, useState} from 'react'
import { Calendar } from './ui/calendar';
import { useRouter } from 'next/navigation';
import 'react-calendar/dist/Calendar.css';
import { fetchEvents } from '@/app/serverActions/fetchCount';


const events = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function EventCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    

    const handleDateSelect = async (newDate: Date | undefined) => {
      setDate(newDate);
      
      if (newDate) {
        try {
          // Format the date as YYYY-MM-DD
          const formattedDate = newDate.toISOString().split('T')[0];
          console.log("Fetching events for:", formattedDate);
          
          // Fetch events for the selected date
          const fetchedEvents = await fetchEvents(formattedDate);
          
          // Update events state if data is returned
          if (fetchedEvents && Array.isArray(fetchedEvents)) {
            //setEvents(fetchedEvents);
            console.log("Updated events:", fetchedEvents);
          }
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      }
    };
    
    // Fetch events for the initial date on component mount
    useEffect(() => {
      const fetchInitialEvents = async () => {
        if (date) {
          const formattedDate = date.toISOString().split('T')[0];
          try {
            const initialEvents = await fetchEvents(formattedDate);
            if (initialEvents && Array.isArray(initialEvents)) {
              //setEvents(initialEvents);
              console.log("Initial events:", initialEvents);
            }
          } catch (error) {
            console.error("Error fetching initial events:", error);
          }
        }
      };
      
      fetchInitialEvents();
    }, []);
   
  return (
    <div className='bg-white p-4 rounded-lg'>
        <Calendar
      mode="single"
      selected={date}
      onSelect={handleDateSelect}
      className="rounded-md border shadow w-full"
    />
        <div className='flex items-center justify-between'>
            <h1 className='text-xl font-semibold my-4'>Events</h1>
            <Image src="/moreDark.png" alt='moreDark' width={20} height={20}/>
        </div>
        <div className='flex flex-col gap-4'>
            {events.map(event=>(
                <div className='p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-custColor even:border-t-custPurple' key={event.id}>
                    <div className='flex items-center justify-between'>
                        <h1 className='font-semibold text-gray-600'>{event.title}</h1>
                        <span className='text-gray-300 text-xs'>{event.time}</span>
                    </div>
                    <p className='mt-2 text-gray-400 text-sm'>{event.description}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default EventCalendar