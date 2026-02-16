'use client'
import Link from 'next/link'
import { useRegisterMutation } from '@/redux/services/authApi'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import React from 'react'

const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const router = useRouter()
  const [register, { isLoading }] = useRegisterMutation()
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    console.log('click to register in btn ')
    try {
      const res = await register({
        email,
        password,
        firstName,
        role: 'user',
      }).unwrap()

      router.push('/verify-email')
      console.log('register SUCCESS')
    } catch (error) {
      console.log('error', error)
      setError(error?.data?.message || 'registeration failed')
    }
  }
  return (
    <div className=" mt-10  flex justify-center  px-4">
      <div className="w-full max-w-md bg-white rounded-xl flex  flex-col items-center justify-center shadow-lg p-8">
        <h2 className=" capitalize text-2xl text-black mt-10">sing up</h2>
        <hr className="text-2xl w-12 border-2 mt-1 text-black" />
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          {/* name  */}

          <div>
            <label className='text-black capitalize' >name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={firstName}
              className="bg-[#E3E3E3] text-black py-1 px-2 rounded w-full  border-none outline-none my-2"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* email  */}

          <div>
            <label className='text-black capitalize'>email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              className="bg-[#E3E3E3] text-black py-1 px-2 rounded w-full my-2 border-none outline-none"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* password  */}

          <div>
            <label className='text-black capitalize'>password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              className="bg-[#E3E3E3] text-black py-1 px-2 rounded w-full my-2 border-none outline-none"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#9DA1F1] rounded-full cursor-pointer px-6 py-1 capitalize text-black mt-5 m-auto"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Sing Up'}
          </button>
        </form>
        <h3 className="text-black capitalize mt-5">
          already have an account ?{' '}
          <Link href={'/login'} className="text-blue-400 cursor-pointer">
          sing in 
          </Link>{' '}
        </h3>
      </div>
    </div>
  )
}

export default RegisterPage
