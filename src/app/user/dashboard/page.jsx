'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

const Dashboard = () => {
    const [clublist, setclubList] = useState([]);


    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    const fetchClubs = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/club/getbyuser`, {
            headers: {
                'x-auth-token': token, // Send the token in the Authorization header
            }
        })
            .then((res) => {
                console.log(res.data);
                setclubList(res.data);  // state ko update kar rha h jaise hi data aayega list bna dega
            }).catch((err) => {
                console.log(err);
                if (err.response.status === 403 || err.response.status === 401) {
                    toast.error('Please Login to Continue');
                    router.push('/login');
                  }
            });
    }

    useEffect(() => {
      fetchClubs();
    }, [])
    

      return (
        <div>
          <section className="lg:px-20 md:px-10 px-5 py-10">
            <div className="mx-auto flex justify-center object-center px-4 py-16 sm:py-24 lg:max-w-7xl">
              <div className="flex justify-center object-center flex-col">
                <h2 className="text-4xl font-semibold tracking-tight text-blue-950 sm:text-5xl lg:text-6xl">
                  Clubs
                </h2>
                <div className="grid gap-5 pt-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                  {
                    clublist.map(club => (
                      <Link
                        key={club._id}
                        href={'/club/announcement/' + club._id}
                        className="group flex justify-center [perspective:1000px]"
                      >
                        <div className="relative lg:h-[400px] lg:w-64 md:h-[365px] md:64 sm:h-[365px] sm:w-60 h-[450px] w-[300px] rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                          {/* Front Face */}
                          <div className="absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden]">
                            <img
                              className="object-cover cursor-pointer object-left h-full w-full rounded-xl"
                              src={club.image}
                              alt="Service 1 Heading"
                              width={250}
                              height={250}
                            />
                          </div>
                          <div className="absolute rounded-xl inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-blue/70" />
                          <div className="absolute inset-0 translate-y-[78%] px-8 text-center">
                            <p className="font-dmserif text-xl font-bold text-white">
                              {club.name}
                            </p>
                          </div>
                          {/* Back Face */}
                          <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-5 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                            <div className="flex min-h-full flex-col items-center justify-center">
                              <h2 className="text-xl font-bold mb-4">{club.name}</h2>
                              <Link
                        href={'/club/details/' + club._id}
                        className="p-4 border"
                      >details</Link>
                              <p className="text-lg text-pretty text-center mb-4">
                                {new Date(club.createdAt).toDateString()}
                              </p>
                              <div className="inline-flex">
                                <button className=" bg-yellow-800 hover:bg-yellow-700 text-white font-bold py-1 px-4 w-auto rounded-full inline-flex items-center">
                                  <span>Read More</span>
                                  <svg
                                    className="h-6 w-6 ml-2"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                  >
    
                                    <path d="M..." />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  }
                </div>
              </div>
            </div>
          </section>
    
    
        </div>
      )
    }

export default Dashboard;