'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Pencil, LogOut, CircleUserRound, LogIn, Home,moveUp  } from 'lucide-react'

export default function Navbar() {
  const [token, setToken] = useState(null)
  const [open, setopen] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    window.location.href = '/'
  }

  return (
    <nav className="bg-[rgb(217,217,217)] w-full shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-blue-600">
        BlogApp
      </Link>

      {/* Menu */}
      <div className="flex items-center gap-6">
        <Link
          href="/blogs"
          className="flex items-center gap-2 bg-[#1e1e1e] px-5 py-1 rounded-full"
        >
          <span>Home</span>
        </Link>
        {token ? (
          <>
            <Link
              href="/create-blog"
              className="flex items-center gap-2 px-5 py-1 rounded-full bg-[#1e1e1e]"
            >
              <Pencil size={18} />
              <span>Create</span>
            </Link>
            {/* profile icon  */}

            <button onClick={() => setopen(!open)}>
              <CircleUserRound size={20} />
            </button>

            {/* Dropdown  */}
            {open && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            )}: 
          </>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
          >
            <LogIn size={18} />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
