import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  Email,
  Phone,
  LocationOn,
  CreditCard,
  Security,
  LocalShipping,
  Autorenew
} from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">ShopZone</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted online shopping destination with quality products, 
              competitive prices, and exceptional customer service.
            </p>
            <div className="flex space-x-4 pt-4">
              <Facebook className="w-6 h-6 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors" />
              <LinkedIn className="w-6 h-6 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
              <YouTube className="w-6 h-6 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">FAQs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Size Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Track Order</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Returns</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Electronics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Fashion</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Home & Garden</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Sports</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Books</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Beauty</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <LocationOn className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300 text-sm">123 Commerce St, City, State 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300 text-sm">+91 9669907552</span>
              </div>
              <div className="flex items-center space-x-3">
                <Email className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300 text-sm">support@shopzone.com</span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="pt-4">
              <h5 className="text-sm font-semibold text-white mb-2">Subscribe to Newsletter</h5>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 text-sm bg-gray-800 text-white border border-gray-700 rounded-l-md focus:outline-none focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <LocalShipping className="w-8 h-8 text-blue-500" />
              <div>
                <h6 className="font-semibold text-white text-sm">Free Shipping</h6>
                <p className="text-gray-400 text-xs">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Autorenew className="w-8 h-8 text-green-500" />
              <div>
                <h6 className="font-semibold text-white text-sm">Easy Returns</h6>
                <p className="text-gray-400 text-xs">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Security className="w-8 h-8 text-yellow-500" />
              <div>
                <h6 className="font-semibold text-white text-sm">Secure Payment</h6>
                <p className="text-gray-400 text-xs">SSL encrypted checkout</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CreditCard className="w-8 h-8 text-purple-500" />
              <div>
                <h6 className="font-semibold text-white text-sm">Multiple Payment</h6>
                <p className="text-gray-400 text-xs">Cards, PayPal & more</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © 2025 ShopZone. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;