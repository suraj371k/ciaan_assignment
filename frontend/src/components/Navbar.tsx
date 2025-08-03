"use client"
import Link from "next/link"
import { useState } from "react"
import { Menu, X, Home, User, PencilLine, LogOut, LogIn, UserPlus } from "lucide-react"
import { useAuthStore } from "@/store/authStore"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuthStore()

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            MiniLinked
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all duration-300 relative"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Feed</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
            </Link>

            {user && (
              <>
                <Link
                  href="/profile"
                  className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all duration-300 relative"
                >
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">My Profile</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                </Link>
                <Link
                  href="/create-post"
                  className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all duration-300 relative"
                >
                  <PencilLine className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Create Post</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 rounded-lg hover:bg-blue-50"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-red-500 hover:text-red-600 font-medium transition-all duration-300 rounded-lg hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-4 space-y-3 border border-gray-200/50">
            <Link
              href="/"
              className="flex items-center gap-3 p-3 text-gray-700 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-300 group"
              onClick={() => setIsOpen(false)}
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Feed</span>
            </Link>

            {user && (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 p-3 text-gray-700 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-300 group"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">My Profile</span>
                </Link>
                <Link
                  href="/create-post"
                  className="flex items-center gap-3 p-3 text-gray-700 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-300 group"
                  onClick={() => setIsOpen(false)}
                >
                  <PencilLine className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Create Post</span>
                </Link>
              </>
            )}

            <div className="border-t border-gray-200 pt-3 mt-3">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-3 p-3 text-gray-700 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-300 group"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">Login</span>
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center gap-3 p-3 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">Register</span>
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    logout()
                    setIsOpen(false)
                  }}
                  className="flex items-center gap-3 p-3 w-full text-left text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 group"
                >
                  <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
