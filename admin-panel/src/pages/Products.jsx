import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { 
  PlusIcon, 
  EyeIcon, 
  PencilIcon, 
  TrashIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  CubeIcon
} from '@heroicons/react/24/outline'
import { productsAPI, downloadFile } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

const Products = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selectedProducts, setSelectedProducts] = useState([])
  const queryClient = useQueryClient()

  // Fetch products
  const { data, isLoading, error } = useQuery(
    ['products', { search, page }],
    () => productsAPI.getAll({ search, page, limit: 10 }),
    {
      keepPreviousData: true,
      select: (response) => {
        console.log('📊 Products API Response:', response.data);
        return response.data.data; // Contains both products and pagination
      }
    }
  )

  // Delete product mutation
  const deleteMutation = useMutation(productsAPI.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('products')
      toast.success('Product deleted successfully')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete product')
    }
  })

  // Bulk delete mutation
  const bulkDeleteMutation = useMutation(productsAPI.bulkDelete, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('products')
      setSelectedProducts([])
      toast.success(`${response.data.data.deletedCount} products deleted successfully`)
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete products')
    }
  })

  // Export CSV mutation
  const exportMutation = useMutation(productsAPI.exportCSV, {
    onSuccess: (response) => {
      downloadFile(response.data, 'products.csv')
      toast.success('Products exported successfully')
    },
    onError: (error) => {
      toast.error('Failed to export products')
    }
  })

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteMutation.mutate(id)
    }
  }

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return
    
    if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} product(s)?`)) {
      bulkDeleteMutation.mutate(selectedProducts)
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

  const getStatusBadge = (status) => {
    const styles = {
      'In Stock': 'badge-success',
      'Low Stock': 'badge-warning',
      'Out of Stock': 'badge-danger',
      'Discontinued': 'badge-gray'
    }
    return styles[status] || 'badge-gray'
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
        <p className="text-red-600">Failed to load products</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your jewelry products</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => exportMutation.mutate()}
            disabled={exportMutation.isLoading}
            className="btn-outline flex items-center"
          >
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            {exportMutation.isLoading ? 'Exporting...' : 'Export CSV'}
          </button>
          
          <Link to="/products/add" className="btn-primary flex items-center">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Search and filters */}
      <div className="card">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            
            {selectedProducts.length > 0 && (
              <button
                onClick={handleBulkDelete}
                disabled={bulkDeleteMutation.isLoading}
                className="btn-danger flex items-center"
              >
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete Selected ({selectedProducts.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Products table */}
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
                <th className="table-header">Stock</th>
                <th className="table-header">Status</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {data?.products?.length > 0 ? data.products.map((product) => (
                <tr key={product._id || product.id} className="table-row">
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
                      <div className="h-12 w-12 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentNode.innerHTML = '<div class="h-full w-full flex items-center justify-center"><svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg></div>';
                            }}
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <CubeIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="table-cell">
                    <span className="font-mono text-sm">{product.sku}</span>
                  </td>
                  
                  <td className="table-cell">
                    <span className="text-sm">{product.category}</span>
                  </td>
                  
                  <td className="table-cell">
                    <div>
                      <span className="font-medium">
                        {product.price ? `${product.price}` : '₹0'}
                      </span>
                      {product.originalPrice && product.originalPrice !== product.price && (
                        <div className="text-sm text-gray-500 line-through">
                           {product.originalPrice}
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td className="table-cell">
                    <span className="text-sm">
                      {product.inStock ? (
                        <span className="text-green-600 font-medium">In Stock</span>
                      ) : (
                        <span className="text-red-600 font-medium">Out of Stock</span>
                      )}
                    </span>
                  </td>
                  
                  <td className="table-cell">
                    <div className="flex items-center space-x-1">
                      {product.featured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Featured
                        </span>
                      )}
                      {product.isActive !== false ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Inactive
                        </span>
                      )}
                    </div>
                  </td>
                  
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/products/edit/${product._id}`}
                        className="text-primary-600 hover:text-primary-500"
                        title="Edit"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Link>
                      
                      <button
                        onClick={() => handleDelete(product._id, product.name)}
                        className="text-red-600 hover:text-red-500"
                        title="Delete"
                        disabled={deleteMutation.isLoading}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="table-cell text-center text-gray-500 py-8">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {data?.products?.length === 0 && (
            <div className="text-center py-12">
              <CubeIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No products found</p>
              <Link to="/products/add" className="btn-primary mt-4 inline-flex items-center">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Your First Product
              </Link>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="card-body border-t">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Showing page {data.pagination.page} of {data.pagination.totalPages} 
                ({data.pagination.total} total products)
              </p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={!data.pagination.hasPrev}
                  className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <span className="px-3 py-1 text-sm bg-gray-100 rounded">
                  {data.pagination.page}
                </span>
                
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={!data.pagination.hasNext}
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

export default Products