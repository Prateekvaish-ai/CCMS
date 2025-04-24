'use client';
import { IconCheck, IconLoader3 } from '@tabler/icons-react';
import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Fill the Name'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Password is required')
    .matches(/[a-z]/, 'lowercase letter is required')
    .matches(/[A-Z]/, 'uppercase letter is required')
    .matches(/[0-9]/, 'number is required')
    .matches(/\W/, 'special character is required')
    .min(8, 'minimum 8 charcters are required'),
  
});

const Signup = () => {

  const router = useRouter();

  // initializing formik
  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
      
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {

      // setTimeout(() => {
      //   console.log(values);
      //   resetForm();
      // }, 2000);

      // fetch
      axios.post('http://localhost:5000/user/add', values)
        .then((result) => {
          toast.success('User registered successfully');
          resetForm();
          router.push('/login');
        }).catch((err) => {
          console.log(err);
          toast.error('User registration failed');
          setSubmitting(false);
        });

      // send values to backend
    },
    validationSchema: SignupSchema
  });

  return (
    <>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Signup Page</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <style
      dangerouslySetInnerHTML={{
        __html:
          "\n    body {\n      font-family: 'Inter', sans-serif;\n    }\n    .floating-label input:focus ~ label,\n    .floating-label input:not(:placeholder-shown) ~ label {\n      transform: translateY(-1.5rem) scale(0.85);\n      color: #6366f1;\n    }\n  "
      }}
    />
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-6xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 bg-indigo-500 p-10 text-white flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-lg mb-6">
            Join us and experience the best service. Sign up in seconds!
          </p>
          <img
            src="https://img.freepik.com/free-vector/tiny-people-programmers-with-laptops-save-data-backup-server-with-lifebuoy_335657-2439.jpg?ga=GA1.1.480836426.1744216816&semt=ais_hybrid&w=740"
            alt="Welcome"
            className="w-full mt-6 rounded-2xl"
          />
        </div>
        {/* Right Side - Signup Form */}
        <div className="w-1/2 p-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
           register 
          </h2>
          <form  onSubmit={signupForm.handleSubmit} className="space-y-6">
            <div className="floating-label relative">
              <input
                type="text"
                placeholder=" "
                id="name"
                required=""
                onChange={signupForm.handleChange}
                value={signupForm.values.name}
                className="peer w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none py-2 px-1 text-gray-800 bg-transparent"
              />
              <label
                htmlFor="name"
                className="absolute left-1 top-2 text-gray-500 transition-all pointer-events-none"
              >
                Full Name
              </label>
              {
                (signupForm.touched.name && signupForm.errors.name) && (
                  <p className='text-xs text-red-600 mt-2' id='name-error'>{
                  signupForm.errors.name}</p>
                )
              }
            </div>
            <div className="floating-label relative">
              <input
                type="email"
                placeholder=" "
                id="email"
                required=""
                onChange={signupForm.handleChange}
                value={signupForm.values.email}
                className="peer w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none py-2 px-1 text-gray-800 bg-transparent"
              />
              <label
                htmlFor="email"
                className="absolute left-1 top-2 text-gray-500 transition-all pointer-events-none"
              >
                Email Address
              </label>
              {
                (signupForm.touched.email && signupForm.errors.email) && (
                  <p className='text-xs text-red-600 mt-2' id='email-error'>{
                  signupForm.errors.email}</p>
                )
              }
            </div>
            <div className="floating-label relative">
              <input
                type="password"
                placeholder=" "
                id="password"
                required=""
                onChange={signupForm.handleChange}
                value={signupForm.values.password}
                className="peer w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none py-2 px-1 text-gray-800 bg-transparent"
              />
              <label
                htmlFor="password"
                className="absolute left-1 top-2 text-gray-500 transition-all pointer-events-none"
              >
                Password
              </label>
              {
                (signupForm.touched.password && signupForm.errors.password) && (
                  <p className='text-xs text-red-600 mt-2' id='password-error'>{
                  signupForm.errors.password}</p>
                )
              }
            </div>
            <button
              type="submit"
              disabled={
                signupForm.isSubmitting
              }
              className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all text-white font-semibold py-3 rounded-xl shadow-md"
            >
              Sign Up
              {signupForm.isSubmitting }
            </button>
            <p className="text-sm text-gray-600 text-center">
              Already have an account?
              <Link href="login" className="text-indigo-500 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </>
  
  )
}

export default Signup;