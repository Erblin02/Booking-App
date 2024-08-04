"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 text-center">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to the Booking App</h1>
      <div className="space-y-2">
        <Link href="/bookings" className="text-blue-500 text-xl font-semibold hover:text-blue-700">View Bookings</Link><br/>
        <Link href="/add-bookings" className="text-blue-500 text-xl font-semibold hover:text-blue-700">Add Booking</Link><br/>
      </div>
    </main>
  );
}
