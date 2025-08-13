import React, { useState, useEffect } from 'react';
import { 
  Search, User, Heart, ShoppingBag, Filter, Star, ExternalLink, 
  ArrowRight, Settings, TrendingUp, Award, Calendar, Check, Menu, X
} from 'lucide-react';

// Custom color palette for Locus brand
const colors = {
  charcoal: '#1A1A1A',
  sand: '#E9E4DA',
  slate: '#50514F',
  copper: '#A46B42',
  sage: '#B6C2A1'
};

// Brand data with tags and descriptions
const brands = [
  { 
    name: 'Rhoback', 
    tags: ['Coastal Prep', 'Outdoor', 'Performance', 'Sporty', 'Relaxed Fit'],
    description: 'Premium performance wear with coastal vibes',
    mission: 'Where sport meets style, inspired by the coast.'
  },
  { 
    name: 'Howler Bros', 
    tags: ['Rugged', 'Outdoor', 'Heritage', 'Sustainable', 'Relaxed Fit'],
    description: 'Adventure-ready outdoor apparel',
    mission: 'Built for the journey, not just the destination.'
  },
  { 
    name: 'Marine Layer', 
    tags: ['Coastal Prep', 'Minimalist', 'Sustainable', 'Urban Casual', 'Relaxed Fit'],
    description: 'California-inspired sustainable basics',
    mission: 'Absurdly soft shirts that make a difference.'
  },
  { 
    name: 'Buck Mason', 
    tags: ['Minimalist', 'Performance', 'Heritage', 'Urban Casual'],
    description: 'Modern American essentials',
    mission: 'Timeless design meets modern craftsmanship.'
  },
  { 
    name: 'Taylor Stitch', 
    tags: ['Rugged', 'Minimalist', 'Outdoor', 'Performance', 'Heritage'],
    description: 'Thoughtfully designed menswear',
    mission: 'Responsibly built for the long haul.'
  },
  { 
    name: 'Aether', 
    tags: ['Rugged', 'Minimalist', 'Outdoor', 'Performance', 'Heritage', 'Urban Casual'],
    description: 'Technical luxury outdoor wear',
    mission: 'Where urban meets alpine.'
  },
  { 
    name: 'Wellen', 
    tags: ['Coastal Prep', 'Minimalist', 'Outdoor', 'Sustainable', 'Relaxed Fit'],
    description: 'Surf-inspired lifestyle brand',
    mission: 'Clean oceans, timeless style.'
  },
  { 
    name: 'Faherty', 
    tags: ['Coastal Prep', 'Minimalist', 'Performance', 'Sustainable', 'Urban Casual', 'Relaxed Fit'],
    description: 'Effortless coastal style',
    mission: 'Life is better in Faherty.'
  },
  { 
    name: 'Flint and Tinder', 
    tags: ['Rugged', 'Outdoor', 'Performance', 'Heritage'],
    description: 'Authentic American craftsmanship',
    mission: '10-year hoodie. Enough said.'
  },
  { 
    name: 'Public Rec', 
    tags: ['Minimalist', 'Performance', 'Sustainable', 'Urban Casual', 'Sporty', 'Relaxed Fit'],
    description: 'All-day comfort meets style',
    mission: 'Comfort without compromise.'
  }
];

// All available style tags
const allTags = ['Coastal Prep', 'Minimalist', 'Sustainable', 'Performance', 'Heritage', 'Rugged', 'Outdoor', 'Urban Casual', 'Sporty', 'Relaxed Fit'];

// Sample product data
const sampleProducts = [
  { 
    id: 1, 
    name: 'Coastal Henley', 
    brand: 'Marine Layer', 
    price: '$68', 
    tags: ['Coastal Prep', 'Sustainable', 'Relaxed Fit'], 
    trending: true,
    rating: 4.8,
    description: 'Soft, sustainable henley perfect for coastal adventures'
  },
  { 
    id: 2, 
    name: 'Performance Polo', 
    brand: 'Rhoback', 
    price: '$85', 
    tags: ['Performance', 'Sporty', 'Coastal Prep'], 
    rating: 4.9,
    description: 'Technical polo that performs in any situation'
  },
  { 
    id: 3, 
    name: 'Heritage Chino', 
    brand: 'Buck Mason', 
    price: '$98', 
    tags: ['Heritage', 'Minimalist', 'Urban Casual'], 
    rating: 4.7,
    description: 'Classic chino with modern tailoring'
  },
  { 
    id: 4, 
    name: 'Outdoor Jacket', 
    brand: 'Taylor Stitch', 
    price: '$245', 
    tags: ['Rugged', 'Outdoor', 'Heritage'], 
    trending: true,
    rating: 4.9,
    description: 'Durable jacket built for adventure'
  },
  { 
    id: 5, 
    name: 'Relaxed Tee', 
    brand: 'Faherty', 
    price: '$58', 
    tags: ['Relaxed Fit', 'Sustainable', 'Coastal Prep'], 
    rating: 4.6,
    description: 'Ultra-comfortable everyday tee'
  },
  { 
    id: 6, 
    name: 'Urban Hoodie', 
    brand: 'Aether', 
    price: '$165', 
    tags: ['Urban Casual', 'Performance', 'Minimalist'], 
    rating: 4.8,
    description: 'Premium hoodie for city life'
  },
  { 
    id: 7, 
    name: 'Surf Shorts', 
    brand: 'Wellen', 
    price: '$72', 
    tags: ['Coastal Prep', 'Sustainable', 'Outdoor'], 
    rating: 4.5,
    description: 'Board shorts for land and sea'
  },
  { 
    id: 8, 
    name: 'Work Pant', 
    brand: 'Public Rec', 
    price: '$89', 
    tags: ['Performance', 'Urban Casual', 'Minimalist'], 
    rating: 4.7,
    description: 'Professional pants with athletic comfort'
  }
];

// Navigation Component
// Updated Navigation Component with Logo and "Locus Marketplace"
// This replaces the Navigation component in your code

const Navigation = ({ currentPage, setCurrentPage, savedProductsCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 md:space-x-8">
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setCurrentPage('homepage')}
          >
            {/* Trendy Logo */}
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden shadow-sm"
              style={{ 
                background: `linear-gradient(135deg, ${colors.charcoal} 0%, ${colors.copper} 100%)` 
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-20" 
                   style={{ backgroundImage: `linear-gradient(45deg, ${colors.sage}, transparent)` }}>
              </div>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="relative z-10"
              >
                <path 
                  d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" 
                  fill="white" 
                  stroke="white" 
                  strokeWidth="0.5"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight" style={{ 
                color: colors.charcoal, 
                fontFamily: 'Playfair Display, serif' 
              }}>
                Locus Marketplace
              </h1>
              <p className="text-xs font-medium leading-tight" style={{ 
                color: colors.copper,
                fontFamily: 'Inter, sans-serif'
              }}>
                Curated Menswear
              </p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          {currentPage !== 'onboarding' && (
            <div className="hidden md:flex space-x-6">
              <button 
                onClick={() => setCurrentPage('homepage')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'homepage' 
                    ? `border-b-2 pb-1` 
                    : 'hover:opacity-80'
                }`}
                style={{ 
                  color: currentPage === 'homepage' ? colors.charcoal : colors.slate,
                  borderColor: currentPage === 'homepage' ? colors.copper : 'transparent'
                }}
                aria-label="Go to homepage"
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentPage('discovery')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'discovery' 
                    ? `border-b-2 pb-1` 
                    : 'hover:opacity-80'
                }`}
                style={{ 
                  color: currentPage === 'discovery' ? colors.charcoal : colors.slate,
                  borderColor: currentPage === 'discovery' ? colors.copper : 'transparent'
                }}
                aria-label="Go to discovery page"
              >
                Discover
              </button>
              <button 
                onClick={() => setCurrentPage('profile')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'profile' 
                    ? `border-b-2 pb-1` 
                    : 'hover:opacity-80'
                }`}
                style={{ 
                  color: currentPage === 'profile' ? colors.charcoal : colors.slate,
                  borderColor: currentPage === 'profile' ? colors.copper : 'transparent'
                }}
                aria-label="Go to profile"
              >
                Profile
              </button>
            </div>
          )}
        </div>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: colors.slate }} />
            <input 
              type="text" 
              placeholder="Search brands, products..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent w-64"
              style={{ borderColor: colors.sage, backgroundColor: '#FAFAFA' }}
              aria-label="Search products and brands"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button className="relative" aria-label="View saved items">
              <Heart className="w-5 h-5 hover:opacity-80 transition-opacity" style={{ color: colors.slate }} />
              {savedProductsCount > 0 && (
                <div 
                  className="absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  style={{ backgroundColor: colors.copper }}
                >
                  {savedProductsCount}
                </div>
              )}
            </button>
            <button aria-label="Shopping bag">
              <ShoppingBag className="w-5 h-5 hover:opacity-80 transition-opacity" style={{ color: colors.slate }} />
            </button>
            <button aria-label="User profile">
              <User className="w-5 h-5 hover:opacity-80 transition-opacity" style={{ color: colors.slate }} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && currentPage !== 'onboarding' && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg">
          <div className="px-4 py-4 space-y-4">
            <button 
              onClick={() => { setCurrentPage('homepage'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2"
              style={{ color: currentPage === 'homepage' ? colors.charcoal : colors.slate }}
            >
              Home
            </button>
            <button 
              onClick={() => { setCurrentPage('discovery'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2"
              style={{ color: currentPage === 'discovery' ? colors.charcoal : colors.slate }}
            >
              Discover
            </button>
            <button 
              onClick={() => { setCurrentPage('profile'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2"
              style={{ color: currentPage === 'profile' ? colors.charcoal : colors.slate }}
            >
              Profile
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// Brand Selector Component
const BrandSelector = ({ brand, isSelected, onToggle }) => (
  <div 
    className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
      isSelected ? 'ring-2 shadow-lg' : 'shadow-sm hover:shadow-md'
    }`}
    style={{ 
      backgroundColor: isSelected ? colors.sage + '20' : '#FFFFFF',
      ringColor: isSelected ? colors.copper : 'transparent'
    }}
    onClick={() => onToggle(brand.name)}
    role="button"
    tabIndex={0}
    aria-label={`Select ${brand.name} brand`}
    aria-pressed={isSelected}
  >
    <div className="aspect-square flex items-center justify-center relative p-4">
      <div className="text-center">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
          style={{ backgroundColor: colors.sand }}
        >
          <span className="text-2xl font-bold" style={{ color: colors.charcoal }}>
            {brand.name.charAt(0)}
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-2" style={{ color: colors.charcoal, fontFamily: 'Playfair Display, serif' }}>
          {brand.name}
        </h3>
        <p className="text-xs mb-3 px-2 line-clamp-2" style={{ color: colors.slate }}>
          {brand.description}
        </p>
        <div className="flex flex-wrap gap-1 justify-center">
          {brand.tags.slice(0, 3).map(tag => (
            <span 
              key={tag} 
              className="px-2 py-1 text-xs rounded-full"
              style={{ backgroundColor: colors.sand, color: colors.charcoal }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {isSelected && (
        <div 
          className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: colors.copper }}
        >
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  </div>
);

// Product Card Component
const ProductCard = ({ product, onSave, isSaved, onViewDetails }) => {
  const trackExternalClick = (brand, productName) => {
    console.log(`[Analytics] External click tracked:`, {
      brand,
      product: productName,
      timestamp: new Date().toISOString()
    });
    // In production, this would send to analytics service
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all duration-300 transform hover:scale-105">
      <div className="aspect-square relative" style={{ backgroundColor: colors.sand + '40' }}>
        <button 
          onClick={(e) => { e.stopPropagation(); onSave(product.id); }}
          className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all duration-200 transform hover:scale-110"
          aria-label={isSaved ? "Remove from saved items" : "Save item"}
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${isSaved ? 'fill-current' : ''}`} 
            style={{ color: isSaved ? colors.copper : colors.slate }}
          />
        </button>
        <div 
          className="absolute bottom-3 left-3 px-3 py-1 rounded-full"
          style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
        >
          <span className="text-xs font-medium" style={{ color: colors.charcoal }}>
            {product.brand}
          </span>
        </div>
        {product.trending && (
          <div 
            className="absolute top-3 left-3 text-white px-2 py-1 rounded-full"
            style={{ backgroundColor: colors.copper }}
          >
            <TrendingUp className="w-3 h-3" />
          </div>
        )}
        {product.rating && (
          <div className="absolute bottom-3 right-3 bg-yellow-400 text-white px-2 py-1 rounded-full flex items-center space-x-1">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium mb-1" style={{ color: colors.charcoal, fontFamily: 'Inter, sans-serif' }}>
          {product.name}
        </h3>
        <p className="text-sm mb-2" style={{ color: colors.slate }}>
          {product.price}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 3).map(tag => (
            <span 
              key={tag} 
              className="px-2 py-1 text-xs rounded-full"
              style={{ backgroundColor: colors.sage + '30', color: colors.charcoal }}
            >
              {tag}
            </span>
          ))}
        </div>
        <button 
          onClick={() => {
            trackExternalClick(product.brand, product.name);
            if (onViewDetails) onViewDetails();
          }}
          className="w-full text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
          style={{ backgroundColor: colors.charcoal }}
          onMouseEnter={(e) => e.target.style.backgroundColor = colors.slate}
          onMouseLeave={(e) => e.target.style.backgroundColor = colors.charcoal}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

// Page Navigation Pills Component (for development/demo)
const PageNavigation = ({ currentPage, setCurrentPage }) => (
  <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
    <div className="bg-white rounded-full shadow-lg px-4 py-2 flex space-x-2 border">
      {['onboarding', 'homepage', 'discovery', 'product-detail', 'profile'].map(page => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 rounded-full text-xs transition-colors ${
            currentPage === page 
              ? 'text-white' 
              : 'hover:opacity-80'
          }`}
          style={{
            backgroundColor: currentPage === page ? colors.charcoal : 'transparent',
            color: currentPage === page ? '#FFFFFF' : colors.slate
          }}
        >
          {page.charAt(0).toUpperCase() + page.slice(1).replace('-', ' ')}
        </button>
      ))}
    </div>
  </div>
);

// Main App Component
const LocusWireframe = () => {
  // State management - using React state instead of localStorage
  const [currentPage, setCurrentPage] = useState('onboarding');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [onboardingStep, setOnboardingStep] = useState(0);

  // Smart recommendation logic based on selected brand tags
  const getRecommendedProducts = () => {
    if (selectedBrands.length === 0) return sampleProducts.slice(0, 4);
    
    const selectedBrandTags = new Set();
    selectedBrands.forEach(brandName => {
      const brand = brands.find(b => b.name === brandName);
      if (brand) {
        brand.tags.forEach(tag => selectedBrandTags.add(tag));
      }
    });

    return sampleProducts
      .filter(product => 
        product.tags.some(tag => selectedBrandTags.has(tag))
      )
      .sort((a, b) => {
        const aMatches = a.tags.filter(tag => selectedBrandTags.has(tag)).length;
        const bMatches = b.tags.filter(tag => selectedBrandTags.has(tag)).length;
        return bMatches - aMatches;
      })
      .slice(0, 4);
  };

  // Toggle functions
  const toggleBrandSelection = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleTagSelection = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const toggleSaveProduct = (productId) => {
    setSavedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Onboarding steps configuration
  const onboardingSteps = [
    {
      title: 'What\'s your style?',
      subtitle: 'Select the aesthetic tags that resonate with you',
      type: 'tags'
    },
    {
      title: 'Choose your brands',
      subtitle: 'Pick brands that match your aesthetic',
      type: 'brands'
    }
  ];

// Onboarding Page
  const renderOnboarding = () => (
    <div className="min-h-screen" style={{ backgroundColor: colors.sand }}>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} savedProductsCount={savedProducts.length} />
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm mb-6">
            <span className="text-sm" style={{ color: colors.slate }}>
              Step {onboardingStep + 1} of {onboardingSteps.length}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: colors.charcoal, fontFamily: 'Playfair Display, serif' }}>
            {onboardingSteps[onboardingStep].title}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: colors.slate }}>
            {onboardingSteps[onboardingStep].subtitle}
          </p>
        </div>
        
        {/* Step 1: Tag Selection */}
        {onboardingStep === 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTagSelection(tag)}
                className={`p-4 rounded-xl transition-all duration-300 border-2`}
                style={{
                  backgroundColor: selectedTags.includes(tag) ? colors.sage + '30' : '#FFFFFF',
                  borderColor: selectedTags.includes(tag) ? colors.copper : '#E5E5E5',
                  color: colors.charcoal
                }}
              >
                <span className="font-medium text-sm md:text-base">{tag}</span>
              </button>
            ))}
          </div>
        )}
        
        {/* Step 2: Brand Selection */}
        {onboardingStep === 1 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-12">
            {brands.map(brand => (
              <BrandSelector
                key={brand.name}
                brand={brand}
                isSelected={selectedBrands.includes(brand.name)}
                onToggle={toggleBrandSelection}
              />
            ))}
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="flex justify-center space-x-4">
          {onboardingStep > 0 && (
            <button 
              onClick={() => setOnboardingStep(prev => prev - 1)}
              className="px-6 py-3 border rounded-lg font-medium transition-colors"
              style={{ 
                borderColor: colors.slate, 
                color: colors.slate 
              }}
            >
              Back
            </button>
          )}
          {onboardingStep < onboardingSteps.length - 1 ? (
            <button 
              onClick={() => setOnboardingStep(prev => prev + 1)}
              disabled={onboardingStep === 0 ? selectedTags.length === 0 : selectedBrands.length === 0}
              className={`px-8 py-3 rounded-lg font-medium transition-colors`}
              style={{
                backgroundColor: (onboardingStep === 0 ? selectedTags.length > 0 : selectedBrands.length > 0) ? colors.charcoal : '#D1D1D1',
                color: '#FFFFFF',
                cursor: (onboardingStep === 0 ? selectedTags.length > 0 : selectedBrands.length > 0) ? 'pointer' : 'not-allowed'
              }}
            >
              Continue
            </button>
          ) : (
            <button 
              onClick={() => setCurrentPage('homepage')}
              disabled={selectedBrands.length === 0}
              className={`px-8 py-3 rounded-lg font-medium transition-colors`}
              style={{
                backgroundColor: selectedBrands.length > 0 ? colors.charcoal : '#D1D1D1',
                color: '#FFFFFF',
                cursor: selectedBrands.length > 0 ? 'pointer' : 'not-allowed'
              }}
            >
              Enter Locus ({selectedBrands.length} brands selected)
            </button>
          )}
        </div>
      </div>
    </div>
  );

// Homepage
// Enhanced Homepage Section
// This replaces the renderHomepage() function in your code

// Clean Simple Homepage
// This replaces the renderHomepage() function in your code

const renderHomepage = () => {
  const recommendedProducts = getRecommendedProducts();
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.sand + '40' }}>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} savedProductsCount={savedProducts.length} />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-sm border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: colors.charcoal, fontFamily: 'Playfair Display, serif' }}>
                Welcome back
              </h1>
              <p className="text-base md:text-lg mb-4" style={{ color: colors.slate }}>
                Your curated marketplace for discovering exceptional menswear
              </p>
              <div className="flex items-center justify-center md:justify-start space-x-4 text-sm" style={{ color: colors.slate }}>
                <span className="flex items-center space-x-1">
                  <Award className="w-4 h-4" />
                  <span>{selectedBrands.length} brands curated</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{savedProducts.length} items saved</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button 
                onClick={() => setCurrentPage('discovery')}
                className="text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                style={{ backgroundColor: colors.charcoal }}
              >
                <span>Discover More</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setCurrentPage('profile')}
                className="border px-6 py-3 rounded-lg transition-colors"
                style={{ borderColor: colors.slate, color: colors.slate }}
              >
                View Profile
              </button>
            </div>
          </div>
        </div>

        {/* Empty State - No Brands Selected */}
        {selectedBrands.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: colors.sage + '30' }}>
              <Award className="w-12 h-12" style={{ color: colors.copper }} />
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.charcoal, fontFamily: 'Playfair Display, serif' }}>
              Let's build your style profile
            </h2>
            <p className="mb-6" style={{ color: colors.slate }}>
              Select your favorite brands to get personalized recommendations
            </p>
            <button 
              onClick={() => { setCurrentPage('onboarding'); setOnboardingStep(0); }}
              className="text-white px-8 py-3 rounded-lg transition-colors"
              style={{ backgroundColor: colors.charcoal }}
            >
              Get Started
            </button>
          </div>
        ) : (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm" style={{ color: colors.slate }}>New Arrivals</p>
                    <p className="text-2xl font-bold" style={{ color: colors.charcoal }}>24</p>
                  </div>
                  <TrendingUp className="w-8 h-8" style={{ color: colors.copper }} />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm" style={{ color: colors.slate }}>Saved Items</p>
                    <p className="text-2xl font-bold" style={{ color: colors.charcoal }}>{savedProducts.length}</p>
                  </div>
                  <Heart className="w-8 h-8" style={{ color: colors.copper }} />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm" style={{ color: colors.slate }}>Brands</p>
                    <p className="text-2xl font-bold" style={{ color: colors.charcoal }}>{selectedBrands.length}</p>
                  </div>
                  <Award className="w-8 h-8" style={{ color: colors.sage }} />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm" style={{ color: colors.slate }}>This Week</p>
                    <p className="text-2xl font-bold" style={{ color: colors.charcoal }}>12</p>
                  </div>
                  <Calendar className="w-8 h-8" style={{ color: colors.charcoal }} />
                </div>
              </div>
            </div>

            {/* Featured Brands */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: colors.charcoal, fontFamily: 'Playfair Display, serif' }}>
                  Your Favorite Brands
                </h2>
                <button 
                  onClick={() => setCurrentPage('profile')}
                  className="text-sm hover:opacity-80 transition-opacity"
                  style={{ color: colors.slate }}
                >
                  View all →
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {selectedBrands.slice(0, 5).map(brandName => {
                  const brand = brands.find(b => b.name === brandName);
                  return (
                    <div key={brandName} className="bg-white p-6 rounded-lg shadow-sm border text-center hover:shadow-md transition-shadow">
                      <div 
                        className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
                        style={{ backgroundColor: colors.sand }}
                      >
                        <span className="text-xl font-bold" style={{ color: colors.charcoal }}>{brandName.charAt(0)}</span>
                      </div>
                      <h3 className="font-medium mb-1" style={{ color: colors.charcoal }}>{brandName}</h3>
                      <p className="text-xs" style={{ color: colors.slate }}>{brand?.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommended Products */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: colors.charcoal, fontFamily: 'Playfair Display, serif' }}>
                  Recommended for You
                </h2>
                <button 
                  onClick={() => setCurrentPage('discovery')}
                  className="text-sm hover:opacity-80 transition-opacity"
                  style={{ color: colors.slate }}
                >
                  View all →
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {recommendedProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onSave={toggleSaveProduct} 
                    isSaved={savedProducts.includes(product.id)}
                    onViewDetails={() => setCurrentPage('product-detail')}
                  />
                ))}
              </div>
            </div>

            {/* Trending Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: colors.charcoal, fontFamily: 'Playfair Display, serif' }}>
                  Trending Now
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {sampleProducts.filter(p => p.trending).map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onSave={toggleSaveProduct} 
                    isSaved={savedProducts.includes(product.id)}
                    onViewDetails={() => setCurrentPage('product-detail')}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Discovery Page
  const renderDiscovery = () => (
    <div className="min-h-screen" style={{ backgroundColor: colors.sand + '40' }}>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} savedProductsCount={savedProducts.length} />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: colors.charcoal, fontFamily: 'Playfair Display, serif' }}>
            Discover Products
          </h1>
          <p style={{ color: colors.slate }}>AI-curated recommendations based on your style preferences</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium" style={{ color: colors.charcoal }}>Filter & Sort</h2>
            <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity" style={{ color: colors.slate }}>
              <Filter className="w-4 h-4" />
              <span>Advanced Filters</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Style Tags Filter */}
            <div>
              <h3 className="text-sm font-medium mb-3" style={{ color: colors.charcoal }}>Style Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button 
                    key={tag} 
                    onClick={() => toggleTagSelection(tag)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors border`}
                    style={{
                      backgroundColor: selectedTags.includes(tag) ? colors.sage + '30' : '#FFFFFF',
                      borderColor: selectedTags.includes(tag) ? colors.copper : '#E5E5E5',
                      color: colors.charcoal
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div>
              <h3 className="text-sm font-medium mb-3" style={{ color: colors.charcoal }}>Price Range</h3>
              <div className="flex items-center space-x-4">
                <input 
                  type="range" 
                  min="0" 
                  max="500" 
                  className="flex-1"
                  style={{ accentColor: colors.copper }}
                />
                <span className="text-sm" style={{ color: colors.slate }}>$0 - $500</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sort and Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm" style={{ color: colors.slate }}>{sampleProducts.length} products found</p>
          <div className="flex items-center space-x-4">
            <span className="text-sm" style={{ color: colors.slate }}>Sort by:</span>
            <select 
              className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2"
              style={{ 
                borderColor: colors.sage,
                focusRingColor: colors.copper 
              }}
            >
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
              <option>Rating</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {sampleProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onSave={toggleSaveProduct} 
              isSaved={savedProducts.includes(product.id)}
              onViewDetails={() => setCurrentPage('product-detail')}
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button 
            className="px-8 py-3 border-2 rounded-lg font-medium transition-colors hover:bg-opacity-10"
            style={{ 
              borderColor: colors.charcoal,
              color: colors.charcoal,
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = colors.charcoal + '10'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Load More Products
          </button>
        </div>
      </div>
    </div>
  );

// Product Detail Page
  const renderProductDetail = () => {
    const product = sampleProducts[0]; // Using first product as example
    const brand = brands.find(b => b.name === product.brand);
    
    return (
      <div className="min-h-screen" style={{ backgroundColor: colors.sand + '40' }}>
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} savedProductsCount={savedProducts.length} />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="aspect-square rounded-xl mb-4 relative" style={{ backgroundColor: colors.sand + '60' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-white bg-opacity-80 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl font-bold" style={{ color: colors.charcoal }}>{product.brand.substring(0, 2)}</span>
                    </div>
                    <p style={{ color: colors.slate }}>{product.brand}</p>
                  </div>
                </div>
              </div>
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-square rounded-lg cursor-pointer hover:opacity-80 transition-opacity" style={{ backgroundColor: colors.sand + '40' }}></div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: colors.sage + '30', color: colors.charcoal }}>
                    New Arrival
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm" style={{ color: colors.slate }}>{product.rating} (124 reviews)</span>
                  </div>
                </div>
                <h1 className="text-4xl font-bold mb-2" style={{ color: colors.charcoal, fontFamily: 'Playfair Display, serif' }}>
                  {product.name}
                </h1>
                <p className="text-xl mb-4" style={{ color: colors.slate }}>{product.brand}</p>
                <p className="text-3xl font-bold" style={{ color: colors.charcoal }}>{product.price}</p>
              </div>

              {/* Style Tags */}
              <div className="mb-6">
                <h3 className="font-medium mb-3" style={{ color: colors.charcoal }}>Style Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-sm rounded-full" style={{ backgroundColor: colors.sage + '30', color: colors.charcoal }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <h3 className="font-medium mb-3" style={{ color: colors.charcoal }}>Size Guide</h3>
                <div className="grid grid-cols-6 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <button 
                      key={size} 
                      className="p-2 border rounded-lg text-sm hover:border-opacity-80 transition-colors"
                      style={{ borderColor: colors.sage }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = colors.sage + '20';
                        e.target.style.borderColor = colors.copper;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.borderColor = colors.sage;
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="font-medium mb-3" style={{ color: colors.charcoal }}>Description</h3>
                <p className="leading-relaxed" style={{ color: colors.slate }}>
                  {product.description}. This versatile piece features a comfortable fit that's perfect for weekend adventures 
                  or casual city strolls. Made with organic cotton and recycled polyester blend for sustainability without 
                  compromising on comfort or style.
                </p>
              </div>

              {/* Brand Story Section */}
              {brand && (
                <div className="p-6 rounded-xl mb-8 border" style={{ backgroundColor: colors.sage + '20', borderColor: colors.sage + '40' }}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.sand }}>
                      <span className="font-bold" style={{ color: colors.charcoal }}>{brand.name.substring(0, 2)}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-2" style={{ color: colors.charcoal }}>About {brand.name}</h3>
                      <p className="text-sm mb-3" style={{ color: colors.slate }}>
                        {brand.description}
                      </p>
                      <p className="text-sm italic mb-3" style={{ color: colors.copper }}>
                        "{brand.mission}"
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {brand.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: colors.sand, color: colors.charcoal }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Customer Reviews */}
              <div className="mb-8">
                <h3 className="font-medium mb-4" style={{ color: colors.charcoal }}>Customer Reviews</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Alex M.', rating: 5, comment: 'Perfect fit and incredibly soft material. The quality exceeds the price point.' },
                    { name: 'Jordan K.', rating: 5, comment: 'Love the coastal vibe and sustainable materials. Will definitely buy more from this brand.' }
                  ].map((review, i) => (
                    <div key={i} className="border-l-4 pl-4" style={{ borderColor: colors.copper }}>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm" style={{ color: colors.charcoal }}>{review.name}</span>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, j) => (
                            <Star key={j} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm" style={{ color: colors.slate }}>{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <button 
                  onClick={() => console.log('[Analytics] External click tracked:', { brand: product.brand, product: product.name, timestamp: new Date().toISOString() })}
                  className="w-full text-white py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2 text-lg font-medium"
                  style={{ backgroundColor: colors.charcoal }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = colors.slate}
                  onMouseLeave={(e) => e.target.style.backgroundColor = colors.charcoal}
                >
                  <span>Shop at {product.brand}</span>
                  <ExternalLink className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => toggleSaveProduct(product.id)}
                  className={`w-full border-2 py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2`}
                  style={{
                    borderColor: savedProducts.includes(product.id) ? colors.copper : colors.sage,
                    backgroundColor: savedProducts.includes(product.id) ? colors.copper + '20' : 'transparent',
                    color: savedProducts.includes(product.id) ? colors.copper : colors.slate
                  }}
                >
                  <Heart className={`w-5 h-5 ${savedProducts.includes(product.id) ? 'fill-current' : ''}`} />
                  <span>{savedProducts.includes(product.id) ? 'Saved' : 'Save for Later'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.charcoal, fontFamily: 'Playfair Display, serif' }}>
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {sampleProducts.slice(1, 5).map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onSave={toggleSaveProduct} 
                  isSaved={savedProducts.includes(product.id)}
                  onViewDetails={() => setCurrentPage('product-detail')}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

// Profile Page
  const renderProfile = () => (
    <div className="min-h-screen" style={{ backgroundColor: colors.sand + '40' }}>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} savedProductsCount={savedProducts.length} />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: colors.charcoal }}>
                  <span className="text-white text-2xl font-bold">You</span>
                </div>
                <h2 className="text-xl font-bold mb-1" style={{ color: colors.charcoal }}>Your Style Profile</h2>
                <p className="text-sm" style={{ color: colors.slate }}>Curated since joining</p>
              </div>
              
              <div className="space-y-4">
                {/* Style DNA */}
                <div>
                  <h3 className="font-medium mb-2" style={{ color: colors.charcoal }}>Style DNA</h3>
                  <div className="flex flex-wrap gap-2">
                    {(selectedTags.length > 0 ? selectedTags : ['Coastal Prep', 'Minimalist', 'Sustainable']).map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: colors.sage + '30', color: colors.charcoal }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Favorite Brands */}
                <div>
                  <h3 className="font-medium mb-2" style={{ color: colors.charcoal }}>Favorite Brands</h3>
                  <div className="space-y-2">
                    {selectedBrands.length > 0 ? (
                      selectedBrands.slice(0, 4).map(brandName => {
                        const brand = brands.find(b => b.name === brandName);
                        return (
                          <div key={brandName} className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: colors.sand }}>
                              <span className="text-xs font-bold">{brandName.charAt(0)}</span>
                            </div>
                            <span className="text-sm" style={{ color: colors.slate }}>{brandName}</span>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-sm" style={{ color: colors.slate }}>No brands selected yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-medium mb-4" style={{ color: colors.charcoal }}>Your Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: colors.slate }}>Items Saved</span>
                  <span className="font-medium" style={{ color: colors.charcoal }}>{savedProducts.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: colors.slate }}>Brands Following</span>
                  <span className="font-medium" style={{ color: colors.charcoal }}>{selectedBrands.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: colors.slate }}>Products Viewed</span>
                  <span className="font-medium" style={{ color: colors.charcoal }}>47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: colors.slate }}>Member Since</span>
                  <span className="font-medium" style={{ color: colors.charcoal }}>Today</span>
                </div>
              </div>
            </div>

            {/* Settings Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-medium mb-4" style={{ color: colors.charcoal }}>Settings</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => { setCurrentPage('onboarding'); setOnboardingStep(0); }}
                  className="w-full text-left text-sm hover:opacity-80 transition-opacity flex items-center space-x-2"
                  style={{ color: colors.slate }}
                >
                  <Settings className="w-4 h-4" />
                  <span>Update Style Preferences</span>
                </button>
                <button className="w-full text-left text-sm hover:opacity-80 transition-opacity flex items-center space-x-2" style={{ color: colors.slate }}>
                  <Heart className="w-4 h-4" />
                  <span>Saved Items Settings</span>
                </button>
                <button className="w-full text-left text-sm hover:opacity-80 transition-opacity flex items-center space-x-2" style={{ color: colors.slate }}>
                  <User className="w-4 h-4" />
                  <span>Account Information</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-8">
            {/* Saved Products Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: colors.charcoal, fontFamily: 'Playfair Display, serif' }}>
                  Saved Products
                </h2>
                <span className="text-sm" style={{ color: colors.slate }}>{savedProducts.length} items</span>
              </div>
              {savedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sampleProducts.filter(p => savedProducts.includes(p.id)).map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onSave={toggleSaveProduct} 
                      isSaved={true}
                      onViewDetails={() => setCurrentPage('product-detail')}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl">
                  <Heart className="w-12 h-12 mx-auto mb-4" style={{ color: colors.sage }} />
                  <h3 className="text-lg font-medium mb-2" style={{ color: colors.charcoal }}>Nothing saved yet</h3>
                  <p className="mb-4" style={{ color: colors.slate }}>Start discovering your style!</p>
                  <button 
                    onClick={() => setCurrentPage('discovery')}
                    className="text-white px-6 py-3 rounded-lg transition-colors"
                    style={{ backgroundColor: colors.charcoal }}
                  >
                    Discover Products
                  </button>
                </div>
              )}
            </div>

            {/* Recently Viewed Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.charcoal, fontFamily: 'Playfair Display, serif' }}>
                Recently Viewed
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleProducts.slice(0, 3).map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onSave={toggleSaveProduct} 
                    isSaved={savedProducts.includes(product.id)}
                    onViewDetails={() => setCurrentPage('product-detail')}
                  />
                ))}
              </div>
            </div>

            {/* Discover New Brands Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.charcoal, fontFamily: 'Playfair Display, serif' }}>
                Discover New Brands
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {brands.filter(b => !selectedBrands.includes(b.name)).slice(0, 4).map(brand => (
                  <div key={brand.name} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.sand }}>
                        <span className="text-xl font-bold" style={{ color: colors.charcoal }}>{brand.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1" style={{ color: colors.charcoal }}>{brand.name}</h3>
                        <p className="text-sm mb-2" style={{ color: colors.slate }}>{brand.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {brand.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: colors.sage + '30', color: colors.charcoal }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleBrandSelection(brand.name)}
                      className="w-full mt-4 text-white py-2 px-4 rounded-lg transition-colors text-sm"
                      style={{ backgroundColor: colors.charcoal }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = colors.slate}
                      onMouseLeave={(e) => e.target.style.backgroundColor = colors.charcoal}
                    >
                      Follow Brand
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

// Page Router
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'onboarding':
        return renderOnboarding();
      case 'homepage':
        return renderHomepage();
      case 'discovery':
        return renderDiscovery();
      case 'product-detail':
        return renderProductDetail();
      case 'profile':
        return renderProfile();
      default:
        return renderOnboarding();
    }
  };

  // Main App Return
  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.sand }}>
      {/* Development/Demo Navigation Pills */}
      <PageNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* Render Current Page */}
      {renderCurrentPage()}
    </div>
  );
};

// Export the component
export default LocusWireframe;