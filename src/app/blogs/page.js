'use client'

import React from 'react'
import { Search } from 'lucide-react'
import Image from 'next/image'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { useGetBlogsQuery } from '@/redux/services/blogApi'
dayjs.extend(relativeTime)
const BLogsPage = () => {
  const API_URL = process.env.NEXT_PUBLIC_BASE_URL
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN
  const [search, setSearch] = React.useState('')

  const [debouncedSearch, setDebouncedSearch] = React.useState('')
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  const { data, isLoading, isError } = useGetBlogsQuery({
    search: debouncedSearch,
    page: 1,
    limit: 10,
  })
  const blogs = data?.data?.attributes?.results

  if (isLoading) return <p className="text-center mt-10">Loading...</p>

  if (isError) {
    console.log('search data' + debouncedSearch)
    
  return <p className="text-center mt-10 text-red-500">Failed to load blogs</p>
  }
  console.log('ERROR:', isError)
  console.log('DATA:', data)






  console.log('data ', blogs)
  return (
    <div className="bg-white pt-5 text-black">
      {/* search bar  */}
      <div className=" relative m-auto max-w-md">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-full outline-none w-full px-3 py-1 bg-[#848484]/48"
          placeholder="Search Blog..."
        />
        <Search className=" cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 " />
      </div>

      <div className="gap-8">
        <div className=" sm:grid md:grid-cols-2 lg:grid-cols-4">
          {blogs?.map((blog, index) => (
            <div className="mt-5" key={blog._id || index}>
              {blog.image && (
                <div className="w-full h-[300px] overflow-hidden">
                  <Image
                    alt="img"
                    width={220}
                    height={220}
                    className="w-[300px] m-auto border rounded-2xl"
                    src={`${DOMAIN}/uploads/blogsImage/${blog.image}`}
                    unoptimized
                  />
                </div>
              )}

              <div className="w-[300] m-auto">
                {/* title and category  */}
                <div className="flex justify-between items-center mt-2 px-5">
                  <h2 className=" text-2xl">{blog.title}</h2>
                  {console.log('blog title ', blog.title)}
                  <h4 className=" text-blue-400">
                    {blog.category || 'Uncategorized'}
                  </h4>
                </div>

                {/* auther and time  */}
                <div className="flex gap-5 items-center my-1  px-5">
                  <h4 className=" text-blue-400 capitalize">
                    {blog.user_id?.firstName
                      ? `${blog.user_id.firstName} ${blog.user_id.lastName ? `${blog.user_id.lastName}` : ''}`
                      : blog.user_id?.email || 'Unknown Author'}
                  </h4>
                  <h5>{dayjs(blog.createdAt).fromNow()}</h5>
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
