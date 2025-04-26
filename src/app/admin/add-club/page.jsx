'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import toast from 'react-hot-toast';

const AddClub = () => {

    // initialize formik

    const clubForm = useFormik({
        initialValues: {
             name: '',
             description: '',
             clubtype: '',
             image: '',
             createdBy: '',
        },

        onSubmit: (values, { resetForm, setSubmitting }) => {

            // fetch

            axios.post('http://localhost:5000/club/add', values)
            .then((result) => {
                toast.success('Club added successfully');
                resetForm();
                //router.push('/admin/clubs');
            }).catch((err) => {
                console.log(err);
                toast.error('Club add failed');
                setSubmitting(false);
            });

        },
    });

    // send data to backend

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append('file', file);
        formData.append('upload_preset', 'mypreset');
        formData.append('cloud_name', 'dtyeyssrb');

        const res = await axios.post('https://api.cloudinary.com/v1_1/dtyeyssrb/image/upload', formData);

        if (res.status === 200 ) {
            console.log(res.data);
            toast.success('Image uploaded successfully');
            clubForm.setFieldValue('image', res.data.url);
        }

    }

  return (
     <div>
           <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
  <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
      Add New Club
    </h2>
    <form className="space-y-5" onSubmit={clubForm.handleSubmit}>
      {/* Club Name */}
      <div>
        <label
        htmlFor="Name"
        className="block text-gray-700 font-medium mb-1">
          Club Name
        </label>
        <input
          type="text"
          name="name"
          onChange={clubForm.handleChange}
          value={clubForm.values.name}
          placeholder="Enter Club Detail"
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      {/* Club Description */}
      <div>
        <label 
        htmlFor="description"
        className="block text-gray-700 font-medium mb-1">
          Description
        </label>
        <input
         type="text"
        name="description"
        onChange={clubForm.handleChange}
        value={clubForm.values.description}
          placeholder="Write a short description..."
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />
      </div>
      {/* Category */}
      <div>
        <label 
        htmlFor="category" 
        className="block text-gray-700 font-medium mb-1">Club Type</label>
        <select 
        name="clubtype" 
        onChange={clubForm.handleChange}
        value={clubForm.values.clubtype}
        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option value="" label="Select club type">Select Club Type</option>
          <option value="sports" label="sports">Sports</option>
          <option value="arts" label="Arts">Arts</option>
          <option value="tech" label="tech">Technology</option>
          <option value="social" label="social">Social</option>
        </select>
      </div>
       
        {/* Created By */}
        <div>
        <label 
        htmlFor="contact"
        className="block text-gray-700 font-medium mb-1">Created By 
        </label>
        <input
          type="text"
          name="createdBy"
          onChange={clubForm.handleChange}
          value={clubForm.values.createdBy}
          placeholder="Enter Club Detail"
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        </div>
      {/* Upload Logo */}
      <div>
        <label 
        htmlFor="image"
        className="block text-gray-700 font-medium mb-1">
          Club Logo
        </label>
        <input
          type="file"
          onChange={uploadImage}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
        />
      </div>
      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={clubForm.isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition duration-300"
        >
            {clubForm.isSubmitting }
          Add Club
        </button>
      </div>
    </form>
  </div>
</div>
</div>
  )
}

export default AddClub;
