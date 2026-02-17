import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token')
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        }
      }
      return headers
    },
  }),

  endpoints : (builder) =>({

    // create a new blog 
    createBlog : builder.mutation({
        query : (data) => ({
            url : "/blog",
            method : "POST",
            body : data
        })
    }),

    // get all blogs 

    getBlogs : builder.query({
      query : (data)=>({
        url : "/blog",
        method : "Get",
        body: data
      })
    })


  })

})

export const {
    useCreateBlogMutation,
    useGetBlogsQuery
} = blogApi
