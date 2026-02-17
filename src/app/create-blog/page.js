'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCreateBlogMutation } from '@/redux/services/blogApi'
import { MoveUp } from 'lucide-react'
const createBlogPage = () => {
    const router = useRouter()
    const [createBlog, { isLoading }]=useCreateBlogMutation()

  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
const [category, setCategory] = useState("All");

  const handleSubmit = async(e)=>{
    e.preventDefault()
    setError("")
    setMessage("")

    try {
      console.log("click to submit btn")
      const formData = new FormData()
      formData.append("description" , description)
      formData.append("category" , category)
      formData.append("title", title)
      if (image) formData.append("image" , image)

        await createBlog(formData).unwrap()

        setMessage("Blog created successfully")

        setTimeout(() => router.push("/blogs",1500))
    } catch (err) {
      setError(err?.data?.message || "Failed to create blog");
      console.log("submit error")
    }
  }
  return (
    <div className="bg-white h-screen text-black flex justify-center">
      <div className="flex w-[300px] sm:w-[400px] flex-col gap-2 mt-5">
        <h2 className="text-3xl capitalize text-gray-700">create Blog</h2>
        <form onSubmit={handleSubmit} className="">
          <div className="flex items-center ">
            <label className="text-3xl capitalize whitespace-nowrap">
              title :
            </label>
            <input
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="ml-2 focus:outline-none pl-2 py-1.5 w-full "
              type="text"
            />
          </div>

          {/* image uploader  */}

          <div className=" mt-5">
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
              id="imageUpload"
              accept="image/*"
            />
            <label
              htmlFor="imageUpload"
              className=" border-dotted border rounded-sm flex items-center justify-center  cursor-pointer h-40 "
            >
              <div className="flex flex-col justify-center items-center">
                <MoveUp />
                <span className="px-2 py-2 bg-[#649DFF] mt-2 rounded-2xl">
                  {' '}
                  Upload image
                </span>
              </div>
            </label>
          </div>

          <div>
            
            <textarea
              className=" h-40 outline-none shadow rounded-md bg-[#D9D9D9]/25 mt-5 w-full px-2 py-2"
              placeholder="Enter your Description"
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
              type="text"
              value={description}
            />
          </div>
          <select   value={category}
  onChange={(e) => setCategory(e.target.value)} className='border mt-5 px-2 py-2'>
            <option value="All">All</option>
            <option value="Technology">Technology </option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education"> Education</option>
            <option value="Food">Food</option>
          </select>
          <button className='bg-gray-400 cursor-pointer px-5 py-2 ml-5 rounded-2xl' type="submit" disabled={isLoading}>
            {isLoading ? 'Posting...' : 'create Blog'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default createBlogPage
