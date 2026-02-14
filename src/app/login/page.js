"use client"
import Link from "next/link"
import { useState } from "react"

import React from 'react'

const LoginPage = () => {
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
  return (
    <div className="h-80 flex justify-center  px-4">
        <div className="w-full max-w-md bg-white rounded-xl flex flex-col items-center justify-center shadow-lg p-8">
            <h2 className=" capitalize text-2xl text-black">sing In</h2>
            <hr className="text-2xl w-12 border-2 mt-1 text-black"/>
            <form className="flex flex-col w-full">
                
                <input
                type="email"
                placeholder="Enter your email"
                value={email}
                className="bg-[#E3E3E3] text-black py-1 px-2 rounded w-full mt-10 border-none outline-none"
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Enter your password"
                value={password}
                className="bg-[#E3E3E3] text-black py-1 px-2 rounded w-full mt-4 border-none outline-none"
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <button type="submit" className="bg-[#9DA1F1] rounded-full px-6 py-1 capitalize text-black mt-5 m-auto">
                    Login
                </button>
            </form>
            <h3 className="text-black capitalize mt-5">Don't  have an account ? <Link href={'/register'} className="text-blue-400 cursor-pointer">Sign Up</Link> </h3>
        </div>
    </div>
  )
}

export default LoginPage