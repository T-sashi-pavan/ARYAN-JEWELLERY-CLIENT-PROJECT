import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/BridalCollection.css';

// Import women rings videos
import ringVideo1 from '../ASSETS/womenCollections/women_rings/Elegant_Floral_Ring_Video_Generation.mp4';
import ringVideo2 from '../ASSETS/womenCollections/women_rings/gold ring.mp4';
import ringVideo3 from '../ASSETS/womenCollections/women_rings/Realistic_D_Ring_Video_Generation.mp4';

// Import fallback images
import women1 from '../ASSETS/womenCollections/women1.jpg';
import women2 from '../ASSETS/womenCollections/women2.jpg';
import women4 from '../ASSETS/womenCollections/women4.jpg';

const WomenRingsCollection = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        setTimeout(() => setIsLoading(false), 500);
    }, []);

    const ringsProducts = [
        {
            id: 1,
            name: 'Elegant Floral Ring',
            video: ringVideo1,
            image: women1,
            price: '₹2,500',
            originalPrice: '₹3,000',
            category: 'rings',
            subcategory: 'women-rings',
            size: 'Adjustable',
            material: '925 Sterling Silver',
            description: 'Beautiful silver ring with intricate floral design perfect for everyday wear'
        },
        {
            id: 501,
            name: 'Golden Ring Collection',
            video: ringVideo2,
            image: women2,
            price: '₹3,500',
            originalPrice: '₹4,200',
            category: 'rings',
            subcategory: 'women-rings',
            size: 'Multiple Sizes',
            material: '925 Sterling Silver with Gold Plating',
            description: 'Beautiful golden ring with premium plating and elegant design'
        },
        {
            id: 502,
            name: 'Realistic Ring Design',
            video: ringVideo3,
            image: women4,
            price: '₹4,200',
            originalPrice: '₹5,000',
            category: 'rings',
            subcategory: 'women-rings',
            size: 'Adjustable',
            material: '925 Sterling Silver',
            description: 'Realistic ring design with intricate details and modern styling'
        },
        // {
        //   id: 503,
        //   name: 'Classic Silver Ring',
        //   image: women1,
        //   price: '₹2,800',
        //   originalPrice: '₹3,300',
        //   category: 'rings',
        //   subcategory: 'women-rings',
        //   size: 'Multiple Sizes',
        //   material: '925 Sterling Silver',
        //   description: 'Classic silver ring with timeless appeal and elegant finish'
        // },
        // {
        //   id: 504,
        //   name: 'Designer Ring Set',
        //   image: women2,
        //   price: '₹6,500',
        //   originalPrice: '₹7,800',
        //   category: 'rings',
        //   subcategory: 'women-rings',
        //   size: 'Complete Set',
        //   material: '925 Sterling Silver with Gemstones',
        //   description: 'Designer ring set with precious gemstones for special occasions'
        // },
        // {
        //   id: 505,
        //   name: 'Vintage Style Ring',
        //   image: women4,
        //   price: '₹3,200',
        //   originalPrice: '₹3,800',
        //   category: 'rings',
        //   subcategory: 'women-rings',
        //   size: 'Adjustable',
        //   material: '925 Sterling Silver',
        //   description: 'Vintage style ring with antique finish and classic charm'
        // }
    ];

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading Women's Rings Collection...</p>
            </div>
        );
    }

    return (
        <div className="bridal-collection-page">
            <div className="container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <Link to="/" className="breadcrumb-link">
                        <span className="back-arrow">←</span>
                    </Link>
                    <span className="breadcrumb-separator">|</span>
                    <Link to="/women-collection" className="breadcrumb-link">Women Collection</Link>
                    <span className="breadcrumb-separator">|</span>
                    <h1 className="page-title">RINGS</h1>
                </div>

                {/* Category Filter Navigation */}
                <div className="category-filters">
                    <Link to="/women-collection" className="category-filter-btn">
                        ALL
                    </Link>
                    <Link to="/women-collection/payal" className="category-filter-btn">
                        PAYAL
                    </Link>
                    <Link to="/women-collection/chains" className="category-filter-btn">
                        CHAINS
                    </Link>
                    <Link to="/women-collection/bracelets" className="category-filter-btn">
                        BRACELETS
                    </Link>
                    <Link to="/women-collection/bangles" className="category-filter-btn">
                        BANGLES
                    </Link>
                    <Link to="/women-collection/necklace" className="category-filter-btn">
                        NECKLACE
                    </Link>
                    <Link to="/women-collection/rings" className="category-filter-btn active">
                        RINGS
                    </Link>
                    <Link to="/women-collection/nose-rings" className="category-filter-btn">
                        NOSE RINGS
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="products-grid">
                    {ringsProducts.map(product => (
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            state={{ product: product }}
                            className="product-card"
                        >
                            <div className="product-image">
                                {product.video ? (
                                    <video
                                        src={product.video}
                                        alt={product.name}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        onMouseEnter={(e) => e.target.pause()}
                                        onMouseLeave={(e) => e.target.play()}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '8px'
                                        }}
                                    />
                                ) : (
                                    <img src={product.image} alt={product.name} />
                                )}
                                <div className="product-overlay">
                                    <div className="overlay-content">
                                        <p className="product-description">{product.description}</p>
                                        <span className="view-details">View Details</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <div className="product-price">
                                    <span className="current-price">{product.price}</span>
                                    {product.originalPrice && (
                                        <span className="original-price">{product.originalPrice}</span>
                                    )}
                                </div>
                                <div className="product-details">
                                    <span className="product-size">{product.size}</span>
                                    <span className="product-material">{product.material}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WomenRingsCollection;