'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ViewClub = () => {

    const { id } = useParams();
    const [clubDetails, setClubDetails] = useState(null);

    const fetchClubData = async () => {

        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/club/getbyid/${id}`);
            setClubDetails(res.data);
        } catch (err) {
            console.error('Error fetching club details:', err);
        }
    };

    const requestMembership = async () => {
        try {

            // assuming the token is stored in localstorage

            const token = localStorage.getItem('token');

            if (!token) {
                alert('you must be logged in to request membership');
                return;
            }

            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/club/addmember/${id}`, {},
                {
                    headers: {
                        'x-auth-token' : token, // sender the token in the authorization header
                    },
                }
            );

            toast.success('Membership request sent successfully!');
        }catch (err) {
            console.error('Error requesting membership:', err);
            if (err.response && err.response.status === 403) {
                toast.error('You are not authorized to request membership for this club.');
            } else {
                toast.error('An error occurred while requesting membership.');
            }
        }
    };

    useEffect(() => {
        fetchClubData();
    }, []);

    if (clubDetails === null) {
        return <h1>Loading...</h1>;
    }

  return (
    <div>
      <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link
    href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
    rel="stylesheet"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n    /* Add subtle animation */\n    .fade-in {\n      animation: fadeIn 1s ease-in-out;\n    }\n\n    @keyframes fadeIn {\n      0% { opacity: 0; transform: translateY(20px); }\n      100% { opacity: 1; transform: translateY(0); }\n    }\n  "
    }}
  />
  {/* Header */}
  
  {/* Hero Section */}
  <section className="relative bg-white py-16 fade-in">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
      <img
        src={clubDetails.image}
        alt="Club"
        className="rounded-3xl shadow-xl w-full md:w-1/2 hover:scale-105 transform transition duration-300"
      />
      <div className="md:w-1/2">
        <h2 className="text-5xl font-extrabold text-indigo-700 mb-4">
         {clubDetails.name}
        </h2>
        <p className="text-lg text-gray-600 mb-4 leading-relaxed">
          {clubDetails.description}
        </p>
        <div className="flex space-x-4 mt-4">
          <button 
          onClick={requestMembership}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition duration-300">
            Request Membership
          </button>
          <button className="bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-xl font-semibold transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  </section>
  {/* Events Section */}
  <section className="bg-indigo-50 py-20 fade-in">
    <div className="max-w-7xl mx-auto px-6">
      <h3 className="text-4xl font-bold text-center text-indigo-700 mb-16">
        Upcoming Events
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300">
          <h4 className="text-xl font-semibold text-indigo-600 mb-2">
            AI Workshop
          </h4>
          <p className="text-gray-600 mb-4">
            Learn the basics of AI and create your first neural network!
          </p>
          <span className="text-sm text-gray-500">May 10, 2025</span>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300">
          <h4 className="text-xl font-semibold text-indigo-600 mb-2">
            Hackathon 2025
          </h4>
          <p className="text-gray-600 mb-4">
            A 24-hour coding challenge with exciting prizes and opportunities!
          </p>
          <span className="text-sm text-gray-500">May 20, 2025</span>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300">
          <h4 className="text-xl font-semibold text-indigo-600 mb-2">
            Tech Talks
          </h4>
          <p className="text-gray-600 mb-4">
            Exclusive talks from tech leaders and alumni innovators.
          </p>
          <span className="text-sm text-gray-500">May 25, 2025</span>
        </div>
      </div>
    </div>
  </section>
  {/* Core Team */}
  <section className="py-20 fade-in">
    <div className="max-w-7xl mx-auto px-6">
      <h3 className="text-4xl font-bold text-center text-indigo-700 mb-16">
        Meet the Team
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition duration-300">
          <img
            src="https://source.unsplash.com/100x100/?person,1"
            className="rounded-full mx-auto mb-4"
            alt="President"
          />
          <h5 className="font-semibold text-lg text-indigo-600">
            Alex Johnson
          </h5>
          <p className="text-sm text-gray-500">President</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition duration-300">
          <img
            src="https://source.unsplash.com/100x100/?person,2"
            className="rounded-full mx-auto mb-4"
            alt="VP"
          />
          <h5 className="font-semibold text-lg text-indigo-600">Riya Patel</h5>
          <p className="text-sm text-gray-500">Vice President</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition duration-300">
          <img
            src="https://source.unsplash.com/100x100/?person,3"
            className="rounded-full mx-auto mb-4"
            alt="Tech Head"
          />
          <h5 className="font-semibold text-lg text-indigo-600">Samuel Lee</h5>
          <p className="text-sm text-gray-500">Technical Head</p>
        </div>
      </div>
    </div>
  </section>
  
</>

    </div>
  )
}

export default ViewClub;
