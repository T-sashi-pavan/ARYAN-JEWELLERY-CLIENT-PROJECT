import React from 'react'
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'

const Header = ({ title, onMenuClick }) => {
  const { admin } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Menu button and title */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          
          <h1 className="ml-2 lg:ml-0 text-2xl font-semibold text-gray-900">
            {title}
          </h1>
        </div>

        {/* Right side - Notifications and user menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500">
            <BellIcon className="h-6 w-6" />
          </button>

          {/* User info */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900">
                {admin?.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500">
                {admin?.role === 'superadmin' ? 'Super Admin' : 'Admin'}
              </p>
            </div>
            
            <div className="h-8 w-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header