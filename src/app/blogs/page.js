'use client'

import React from 'react'
import { Search } from 'lucide-react'
import Image from 'next/image'

import { useGetBlogsQuery } from '@/redux/services/blogApi'

const BLogsPage = () => {
  const API_URL = process.env.NEXT_PUBLIC_BASE_URL
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN
const { data, isLoading, error } = useGetBlogsQuery()
  if (isLoading) return <p className="text-center mt-10">Loading...</p>
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load blogs</p>
    )
console.log("data ", data)
  return (
    <div className="bg-white pt-5 h-screen text-black">
      {/* search bar  */}
      <div className=" relative m-auto max-w-md">
        <input
          className="rounded-full outline-none w-full px-3 py-1 bg-[#848484]/48"
          placeholder="Search Blog Post"
        />
        <Search className=" cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 " />
      </div>

      <div className="sm:flex justify-center mt-2 gap-8">
        <div>
          {data?.map((blog) => (
            <div key={blog._id}>
              {blog.image && (
                <Image alt='img' width={220} height={220} 
                
                className="w-[350px] m-auto border"  src={`${DOMAIN}/uploads/blogsImage/${blog.image}`} unoptimized />
              )}
              <div>
                {/* title and category  */}
                <div className="flex justify-between mt-2 px-5">
                  <h2>{blog.title}</h2>
                  {console.log("blog title ", blog.title)}
                  <h4>{blog.category}</h4>
                </div>

                {/* auther and time  */}
                <div className="flex justify-between px-5">
                  <h4>auther</h4>
                  <h5>a mint ago</h5>
                </div>
                <p className="px-5">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BLogsPage
