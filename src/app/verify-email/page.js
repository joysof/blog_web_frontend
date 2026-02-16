'use client'
import Link from 'next/link'
import { useVerifyEmailMutation } from '@/redux/services/authApi'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import React from 'react'

const emailVerificationPage = () => {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const router = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    console.log('click to verification  btn ')
    try {
      const res = await verifyEmail({ email, code }).unwrap()

      setSuccess('Email verified successfully')

      setTimeout(() => {
        router.push('/login')
      }, 1500)

      console.log('verify  SUCCESS')
    } catch (error) {
      console.log('error', error)
      setError(error?.data?.message || ' verification failed')
    }
  }
  return (
    <div className="h-80 flex justify-center  px-4">
      <div className="w-full max-w-md bg-white rounded-xl flex flex-col items-center justify-center shadow-lg p-8">
        <h2 className=" capitalize text-2xl text-black">sing In</h2>
        <hr className="text-2xl w-12 border-2 mt-1 text-black" />
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <div>
            <label className="text-black capitalize">email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              className="bg-[#E3E3E3] text-black py-1 px-2 rounded w-full my-2 border-none outline-none"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/*  code */}

          <div>
            <label className="text-black capitalize">password</label>
            <input
              type="text"
              placeholder="Enter your verification code"
              value={code}
              className="bg-[#E3E3E3] text-black py-1 px-2 rounded w-full my-2 border-none outline-none"
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#9DA1F1] rounded-full cursor-pointer px-6 py-1 capitalize text-black mt-5 m-auto"
            disabled={isLoading}
          >
            {isLoading ? 'verifying...' : 'vefify email'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default emailVerificationPage
