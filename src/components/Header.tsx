'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, Search, ShoppingCart, Heart, X } from 'lucide-react'
import Link from 'next/link'
import UserAuthSection from './UserAuthSection'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const toggleSearch = () => setSearchOpen(!searchOpen)

  const categories = [
    { name: 'Short Sleeve', path: '/category/short-sleeve' },
    { name: 'Long Sleeve', path: '/category/long-sleeve' },
    { name: 'Party', path: '/category/party' },
    { name: 'Traditional', path: '/category/traditional' },
  ]

  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <div className='container-custom'>
        <div className='flex items-center justify-between py-4'>
          {/* Mobile menu button */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden cursor-pointer'
            onClick={toggleMobileMenu}
          >
            <Menu size={24} />
          </Button>

          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link
              href='/'
              className='text-2xl font-bold tracking-tight text-brand-900'
            >
              Sartorial
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex space-x-8'>
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.path}
                className='text-sm font-medium text-brand-700 hover:text-brand-900 transition-colors'
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Action buttons */}
          <div className='flex items-center space-x-4'>
            <Button
              variant='ghost'
              size='icon'
              className='text-brand-700 cursor-pointer'
              onClick={toggleSearch}
            >
              <Search size={20} />
            </Button>

            <Link href='/wishlist'>
              <Button
                variant='ghost'
                size='icon'
                className='text-brand-700 relative cursor-pointer'
              >
                <Heart size={20} />
                <span className='absolute -top-1 -right-1 bg-brand-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                  {0}
                </span>
              </Button>
            </Link>

            <Link href='/cart'>
              <Button
                variant='ghost'
                size='icon'
                className='text-brand-700 relative cursor-pointer'
              >
                <ShoppingCart size={20} />
                <span className='absolute -top-1 -right-1 bg-brand-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                  {0}
                </span>
              </Button>
            </Link>

            {/* Auth Buttons */}
            <UserAuthSection />
          </div>
        </div>
      </div>

      {/* Search bar overlay */}
      {searchOpen && (
        <div className='absolute inset-x-0 top-full bg-white py-4 shadow-md animate-fade-in'>
          <div className='container-custom'>
            <div className='flex items-center'>
              <input
                type='search'
                placeholder='Search for products...'
                className='flex-1 p-2'
                autoFocus
              />
              <Button
                variant='ghost'
                size='icon'
                className='ml-2 cursor-pointer'
                onClick={toggleSearch}
              >
                <X size={20} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className='fixed inset-0 z-50 bg-white animate-fade-in'>
          <div className='container-custom py-4'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-xl font-semibold'>Menu</h2>
              <Button
                variant='ghost'
                size='icon'
                onClick={toggleMobileMenu}
                className='cursor-pointer'
              >
                <X size={24} />
              </Button>
            </div>

            <nav className='flex flex-col space-y-4'>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.path}
                  className='text-lg font-medium py-2 border-b border-gray-100'
                  onClick={toggleMobileMenu}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
