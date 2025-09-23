import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  HomeIcon,
  CubeIcon,
  PlusIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Products',
    href: '/products',
    icon: CubeIcon,
  },
  {
    name: 'Add Product',
    href: '/products/add',
    icon: PlusIcon,
  },
  {
    name: 'Deleted Products',
    href: '/products/deleted',
    icon: TrashIcon,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: CogIcon,
  }
]

const Sidebar = ({ open, setOpen }) => {
  const { admin, logout } = useAuth()
  const location = useLocation()

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white lg:pt-5 lg:pb-4">
        <div className="flex items-center flex-shrink-0 px-6">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AJ</span>
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-semibold text-gray-900">
                Aryan's Jewels
              </h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col flex-1">
          <nav className="flex-1 px-3 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                      isActive
                        ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-500'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </NavLink>
              )
            })}
          </nav>
          
          {/* User info and logout */}
          <div className="px-3 mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center px-3 py-2">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
                  </span>
                </div>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {admin?.name || 'Admin'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {admin?.email || 'admin@aryanjewels.com'}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="mt-2 w-full group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={`lg:hidden fixed inset-0 z-30 ${open ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-white pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center justify-between px-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AJ</span>
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">
                  Aryan's Jewels
                </h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          
          <div className="mt-6 flex flex-col flex-1">
            <nav className="flex-1 px-3 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                        isActive
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`
                    }
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    {item.name}
                  </NavLink>
                )
              })}
            </nav>
            
            {/* User info and logout */}
            <div className="px-3 mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center px-3 py-2">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
                    </span>
                  </div>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {admin?.name || 'Admin'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {admin?.email || 'admin@aryanjewels.com'}
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="mt-2 w-full group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
              >
                <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar