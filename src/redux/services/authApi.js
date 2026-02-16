import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
      }
    }
      return headers
    }
  }),


  endpoints: (builder) => ({

    // login 
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),

      // register 

      register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),

  }),

  // email verify 

  verifyEmail : builder.mutation ({
    query : (data) =>({
      url : "/auth/verify-email",
      method : "POST",
      body : data
    })
  })
}),
})

export const {
  useLoginMutation ,
  useRegisterMutation,
  useVerifyEmailMutation
} = authApi