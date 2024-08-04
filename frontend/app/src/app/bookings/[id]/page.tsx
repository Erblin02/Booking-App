"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Booking {
  id: number;
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
}

const BookingDetails: React.FC = () => {
  const { id } = useParams(); // Get the booking ID from the URL
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      console.log(`Fetching booking details for ID: ${id}`);
      fetch(`http://host.docker.internal:5000/api/bookings/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Fetched booking data:', data);
          setBooking(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching booking details:', error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div className="text-xl text-red-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-xl text-red-500">Error: {error}</div>;
  }

  if (!booking) {
    return <div className="text-xl text-gray-500">No booking details available.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Booking Details</h1>
        <p className="text-lg text-gray-700 mb-4">
          This Booking is with {booking.doctor_name} for {booking.service} and it ends on {booking.end_time}
        </p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default BookingDetails;
