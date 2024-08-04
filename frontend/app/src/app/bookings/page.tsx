"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Booking {
  id: number;
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
}

const BookingsList: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch('http://host.docker.internal:5000/api/bookings')
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error('Error fetching bookings:', error));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Bookings</h1>
        <ul className="list-none p-0">
          {bookings.map((booking) => (
            <li key={booking.id} className="mb-4 p-4 border border-gray-300 rounded hover:bg-gray-50 transition">
              <Link href={`/bookings/${booking.id}`} className="text-blue-600 hover:underline">
                A Booking on {booking.date} starting at {booking.start_time}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-center">
          <Link href="/" className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingsList;
