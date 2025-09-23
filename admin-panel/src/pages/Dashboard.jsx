import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import {
  CubeIcon,
  EyeIcon,
  ExclamationTriangleIcon,
  TrophyIcon,
  PlusIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'
import { productsAPI } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

const Dashboard = () => {
  const { data: stats, isLoading: statsLoading } = useQuery(
    'products-stats',
    productsAPI.getStats,
    {
      select: (response) => response.data.data
    }
  )

  if (statsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: CubeIcon,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Products',
      value: stats?.activeProducts || 0,
      icon: EyeIcon,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Out of Stock',
      value: stats?.outOfStockProducts || 0,
      icon: ExclamationTriangleIcon,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Featured Products',
      value: stats?.featuredProducts || 0,
      icon: TrophyIcon,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="card">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome to Admin Panel</h2>
              <p className="text-gray-600 mt-1">Manage your jewelry store products and settings</p>
            </div>
            <Link
              to="/products/add"
              className="btn-primary flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Product
            </Link>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.title} className={`card hover:shadow-md transition-shadow ${stat.bgColor}`}>
            <div className="card-body">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category distribution */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Category Distribution</h3>
          </div>
          <div className="card-body">
            {stats?.categoryDistribution?.length > 0 ? (
              <div className="space-y-3">
                {stats.categoryDistribution.slice(0, 6).map((category) => (
                  <div key={category._id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{category._id}</span>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ 
                            width: `${(category.count / Math.max(...stats.categoryDistribution.map(c => c.count))) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{category.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No data available</p>
            )}
          </div>
        </div>

        {/* Recent products */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Recent Products</h3>
            <Link
              to="/products"
              className="text-sm text-primary-600 hover:text-primary-500 font-medium"
            >
              View all
            </Link>
          </div>
          <div className="card-body">
            {stats?.recentProducts?.length > 0 ? (
              <div className="space-y-3">
                {stats.recentProducts.map((product) => (
                  <div key={product._id} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent products</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/products/add"
              className="group p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center">
                <PlusIcon className="h-8 w-8 text-primary-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900 group-hover:text-primary-600">
                    Add New Product
                  </h4>
                  <p className="text-sm text-gray-500">Create a new jewelry product</p>
                </div>
              </div>
            </Link>

            <Link
              to="/products?status=Low+Stock"
              className="group p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center">
                <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900 group-hover:text-yellow-600">
                    Low Stock Alert
                  </h4>
                  <p className="text-sm text-gray-500">
                    {stats?.overview?.lowStockProducts || 0} products need restocking
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/products?featured=true"
              className="group p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center">
                <ArrowTrendingUpIcon className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900 group-hover:text-purple-600">
                    Featured Products
                  </h4>
                  <p className="text-sm text-gray-500">Manage homepage products</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard