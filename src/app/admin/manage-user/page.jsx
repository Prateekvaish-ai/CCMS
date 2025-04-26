'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ManageUser = () => {

    const [ userList, setUserList ] = useState([]);
    const token = localStorage.getItem('token');

    const router = useRouter();

    const fetchUsers = () => {
        axios.get('http://localhost:5000/user/getall', {
            headers: {
                'x-auth-token': token
            }
        })

        .then((result) => {
            console.log(result.data);
            setUserList(result.data);
        })
        .catch((err) => {
            console.log(err);

            if (err.response.status === 403 || err.response.status === 401) {
                toast.error('please login to continue');
                router.push('/login');
            }
        });
    }

    useEffect(() => {
        fetchUsers();
    }, []);

   const deleteUser = async (id) => {
    const res = await axios.delete(`http://localhost:5000/user/delete/${id}`);
    if (res.status === 200) {
        toast.success('User deleted successfully');
        fetchUsers();
    } else {
        toast.error('failed  deleting user');
    }
   }


  return (
    <div>
      <>
  {/* Table Section */}
  <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    {/* Card */}
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="bg-white border border-gray-200 rounded-xl shadow-2xs overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
            {/* Header */}
            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                  Users
                </h2>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  Add users, edit and more.
                </p>
              </div>
              <div>
                <div className="inline-flex gap-x-2">
                  <a
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    href="/signup"
                  >
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    Add user
                  </a>
                </div>
              </div>
            </div>
            {/* End Header */}
            {/* Table */}
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead className="bg-gray-50 dark:bg-neutral-800">
                <tr>
                  <th scope="col" className="ps-6 py-3 text-start">
                    <label
                      htmlFor="hs-at-with-checkboxes-main"
                      className="flex"
                    >
                      <span className="sr-only"></span>
                    </label>
                  </th>
                  <th
                    scope="col"
                    className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start"
                  >
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                        Name
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-start">
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                        Email
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-start">
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                        Status
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-start">
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                        Role
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-end" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {
                    userList.map((user) => {
               return <tr key={user._id}>
                  <td className="size-px whitespace-nowrap">
                    <div className="ps-6 py-3">
                      <label htmlFor="hs-at-with-checkboxes-1" className="flex">
                        
                        <span className="sr-only"></span>
                      </label>
                    </div>
                  </td>
                  <td className="size-px whitespace-nowrap">
                    <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                      <div className="flex items-center gap-x-3">
                       
                        <div className="grow">
                          <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                            {user.name}
                          </span>
                          
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="h-px w-72 whitespace-nowrap">
                    <div className="px-6 py-3">
                      <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                       {user.email}
                      </span>
                      
                    </div>
                  </td>
                  <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-3">
                      <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                        <svg
                          className="size-2.5"
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                        Active
                      </span>
                    </div>
                  </td>
                  <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-3">
                      <div className="flex items-center gap-x-3">
                        <span className="text-xs text-gray-500 dark:text-neutral-500">
                          {user.role}
                        </span>
                        <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700">
                          <div
                            className="flex flex-col justify-center overflow-hidden bg-gray-800 dark:bg-neutral-200"
                            role="progressbar"
                            style={{ width: "25%" }}
                            aria-valuenow={25}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-1.5">
                      <button
                        className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
                       onClick={() => 
                    {
                        deleteUser(user._id)
                    }}
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
                 })
                }
            
              </tbody>
            </table>
            {/* End Table */}
          </div>
        </div>
      </div>
    </div>
    {/* End Card */}
  </div>
  {/* End Table Section */}
</>

    </div>
  )
}

export default ManageUser;
