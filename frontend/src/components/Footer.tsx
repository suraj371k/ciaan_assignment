"use client";

import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white py-8 px-4 mt-10 shadow-2xl rounded-t-3xl">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-lg font-semibold text-white/80">Socially</span>
        </div>
        <div className="flex gap-4">
          <a href="https://github.com/suraj371k" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.93.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98.01 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.23 2.73.12 3.02.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.41-5.27 5.7.42.36.8 1.09.8 2.2v3.26c0 .31.21.67.8.56A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/></svg>
          </a>
          <a href="mailto:suraj371k@gmail.com" className="hover:scale-110 transition-transform duration-200">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5A2.25 2.25 0 0 1 22.5 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 17.25V6.75zm2.25-.75a.75.75 0 0 0-.75.75v.637l8.25 5.513 8.25-5.513V6.75a.75.75 0 0 0-.75-.75H3.75zm16.5 2.13-7.8 5.215a1.25 1.25 0 0 1-1.4 0L3.75 8.13v9.12a.75.75 0 0 0 .75.75h15a.75.75 0 0 0 .75-.75V8.13z"/></svg>
          </a>
        </div>
        <div className="text-xs sm:text-sm text-white/70 font-medium text-center sm:text-right">
          &copy; {new Date().getFullYear()} Ciaan Assignment. All rights reserved.
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-white/60 italic tracking-wide animate-fade-in">
        "Stand out. Make your mark. Be unforgettable."
      </div>
    </footer>
  );

}

export default Footer