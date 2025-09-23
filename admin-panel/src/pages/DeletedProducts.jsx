import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { 
  ArrowUturnLeftIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  CubeIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { productsAPI } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

const DeletedProducts = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selectedProducts, setSelectedProducts] = useState([])
  const queryClient = useQueryClient()

  // Fetch deleted products
  const { data, isLoading, error } = useQuery(
    ['deletedProducts', { search, page }],
    () => productsAPI.getDeleted({ search, page, limit: 10 }),
    {
      keepPreviousData: true,
      select: (response) => response.data.data,
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    }
  )

  // Restore product mutation
  const restoreMutation = useMutation(productsAPI.restore, {
    onSuccess: () => {
      queryClient.invalidateQueries('deletedProducts')
      queryClient.invalidateQueries('products') // Refresh main products list
      toast.success('Product restored successfully')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to restore product')
    }
  })

  // Bulk restore mutation
  const bulkRestoreMutation = useMutation(productsAPI.bulkRestore, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('deletedProducts')
      queryClient.invalidateQueries('products')
      setSelectedProducts([])
      toast.success(`${response.data.data.restoredCount} products restored successfully`)
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to restore products')
    }
  })

  // Permanent delete mutation
  const permanentDeleteMutation = useMutation(productsAPI.permanentDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries('deletedProducts')
      toast.success('Product permanently deleted')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to permanently delete product')
    }
  })

  // Bulk permanent delete mutation
  const bulkPermanentDeleteMutation = useMutation(productsAPI.bulkPermanentDelete, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('deletedProducts')
      setSelectedProducts([])
      toast.success(`${response.data.data.deletedCount} products permanently deleted`)
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to permanently delete products')
    }
  })

  const handleRestore = async (id, name) => {
    if (window.confirm(`Are you sure you want to restore "${name}"?`)) {
      restoreMutation.mutate(id)
    }
  }

  const handlePermanentDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to PERMANENTLY DELETE "${name}"? This action cannot be undone!`)) {
      permanentDeleteMutation.mutate(id)
    }
  }

  const handleBulkRestore = async () => {
    if (selectedProducts.length === 0) return
    
    if (window.confirm(`Are you sure you want to restore ${selectedProducts.length} product(s)?`)) {
      bulkRestoreMutation.mutate(selectedProducts)
    }
  }

  const handleBulkPermanentDelete = async () => {
    if (selectedProducts.length === 0) return
    
    if (window.confirm(`Are you sure you want to PERMANENTLY DELETE ${selectedProducts.length} product(s)? This action cannot be undone!`)) {
      bulkPermanentDeleteMutation.mutate(selectedProducts)
    }
  }

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProducts(data?.products?.map(p => p._id) || [])
    } else {
      setSelectedProducts([])
    }
  }

  const handleSelectProduct = (productId, checked) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId])
    } else {
      setSelectedProducts(selectedProducts.filter(id => id !== productId))
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load deleted products</p>
        {error.response?.status === 404 && (
          <p className="text-sm text-gray-500 mt-2">
            The deleted products endpoint may not be available. Please check the server.
          </p>
        )}
        {error.response?.status === 401 && (
          <p className="text-sm text-gray-500 mt-2">
            Authentication failed. Please log in again.
          </p>
        )}
        {!error.response && (
          <p className="text-sm text-gray-500 mt-2">
            Network error. Please check your connection and server status.
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deleted Products</h1>
          <p className="text-gray-600">Manage and restore deleted jewelry products</p>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
          <span className="text-sm text-yellow-800">Products here are hidden from the main website</span>
        </div>
      </div>

      {/* Search and bulk actions */}
      <div className="card">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search deleted products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            
            {selectedProducts.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={handleBulkRestore}
                  disabled={bulkRestoreMutation.isLoading}
                  className="btn-success flex items-center"
                >
                  <ArrowUturnLeftIcon className="h-4 w-4 mr-2" />
                  Restore Selected ({selectedProducts.length})
                </button>
                
                <button
                  onClick={handleBulkPermanentDelete}
                  disabled={bulkPermanentDeleteMutation.isLoading}
                  className="btn-danger flex items-center"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete Forever ({selectedProducts.length})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Deleted products table */}
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead className="table-head">
              <tr>
                <th className="table-header">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === data?.products?.length && data?.products?.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="table-header">Product</th>
                <th className="table-header">SKU</th>
                <th className="table-header">Category</th>
                <th className="table-header">Price</th>
                <th className="table-header">Deleted Date</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {data?.products?.map((product) => (
                <tr key={product._id} className="table-row">
                  <td className="table-cell">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product._id)}
                      onChange={(e) => handleSelectProduct(product._id, e.target.checked)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  
                  <td className="table-cell">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden opacity-60">
                        {product.images?.[0]?.url ? (
                          <img 
                            src={product.images[0].url} 
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <CubeIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-600">{product.name}</p>
                        <p className="text-sm text-gray-400">{product.type}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="table-cell">
                    <span className="font-mono text-sm text-gray-500">{product.sku}</span>
                  </td>
                  
                  <td className="table-cell">
                    <span className="text-sm text-gray-500">{product.category}</span>
                  </td>
                  
                  <td className="table-cell">
                    <div>
                      <span className="font-medium text-gray-600">₹{product.pricing?.basePrice?.toLocaleString()}</span>
                      {product.pricing?.offerPrice && (
                        <div className="text-sm text-gray-400">
                          Offer: ₹{product.pricing.offerPrice.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td className="table-cell">
                    <span className="text-sm text-gray-500">
                      {formatDate(product.updatedAt)}
                    </span>
                  </td>
                  
                  <td className="table-cell">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleRestore(product._id, product.name)}
                        className="text-green-600 hover:text-green-500"
                        title="Restore Product"
                        disabled={restoreMutation.isLoading}
                      >
                        <ArrowUturnLeftIcon className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => handlePermanentDelete(product._id, product.name)}
                        className="text-red-600 hover:text-red-500"
                        title="Delete Permanently"
                        disabled={permanentDeleteMutation.isLoading}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {data?.products?.length === 0 && (
            <div className="text-center py-12">
              <CubeIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No deleted products found</p>
              <p className="text-sm text-gray-400 mt-2">Deleted products will appear here and can be restored</p>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="card-body border-t">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Showing {data.pagination.currentPage} of {data.pagination.totalPages} pages
              </p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={!data.pagination.hasPrevPage}
                  className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={!data.pagination.hasNextPage}
                  className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DeletedProducts