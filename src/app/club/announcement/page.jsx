'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Announcement = () => {

    const { id } = useParams();
    const [ userData, setUSerData ] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUSerData(decoded);
            } catch (error) {
                console.error('Error decoding token:', error);
                toast.error('Authentication error');
            }
        }
    }, []);

    const announcementForm = useFormik({
        initialValues: {
            title: '',
            description: '',
        },

        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error('Please login to create an announcement');
                    return;
                }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/announcement/add`,
                {
                    ...values,
                    clubId: id,
                    createdBy: userData.name,
                },
                {
                    headers: {
                        'x-auth-token': token,
                    },
                }
            );

            console.log(response.data);
            toast.success('Announcement created successfully');
            resetForm();
            } catch (err) {
                console.error(err);
                toast.error(err.response?.data?.error || 'Announcement posting failed');
            } finally {
                setSubmitting(false);
            }
        },
    });

    
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
        "\n    .fade-in {\n      animation: fadeIn 0.6s ease-in-out;\n    }\n    @keyframes fadeIn {\n      from { opacity: 0; transform: translateY(10px); }\n      to { opacity: 1; transform: translateY(0); }\n    }\n  "
    }}
  />
 
  {/* Add Announcement Form */}
  <main className="max-w-3xl mx-auto py-10 px-6 fade-in">
    <h2 className="text-3xl font-bold text-indigo-700 mb-6">
      📢 Create New Announcement
    </h2>
    {
        userData && (
            <p className='text-sm text-gray-600 mb-4'>
                posting as {userData.name}
            </p>
        )
    }
    <form className="bg-white shadow-xl rounded-xl p-8 space-y-6"
    onSubmit={announcementForm.handleSubmit}
    >
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name='title'
          value={announcementForm.values.title}
          onChange={announcementForm.handleChange}
          placeholder="e.g. Coding Bootcamp this Friday"
          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
      </div>
      {/* Category */}
      {/* <div>
        <label
          htmlFor="category"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Category
        </label>
        <select
          id="category"
          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        >
          <option disabled="" selected="">
            Select category
          </option>
          <option>Event</option>
          <option>Workshop</option>
          <option>Result</option>
          <option>Notice</option>
        </select>
      </div> */}
      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
            name="description"
            onChange={announcementForm.handleChange}
            value={announcementForm.values.description}
          rows={4}
          placeholder="Provide details about the announcement..."
          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          defaultValue={""}
        />
      </div>
      {/* Date */}
      {/* <div>
        <label
          htmlFor="date"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
      </div> */}
      {/* Submit Button */}
      <div className="text-right">
        <button
          type="submit"
          disabled={announcementForm.isSubmitting}
          className="bg-indigo-600 text-white px-6 py-3 rounded-md shadow hover:bg-indigo-700 transition"
        >
            {announcementForm.isSubmitting ?
            'Posting...' : 'Post Announcement'}
          📤 
        </button>
      </div>
    </form>
  </main>
  {/* Footer */}
 
</>
 
    </div>
  );
};

export default Announcement;
