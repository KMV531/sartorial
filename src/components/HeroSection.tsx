import React from 'react'
import { HERO_QUERYResult } from '../../sanity.types'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

const HeroSection = ({ hero }: { hero: HERO_QUERYResult }) => {
  return (
    <>
      {/* Hero Section */}
      <section className='relative bg-brand-950 text-white'>
        {hero?.map((item) => (
          <div
            key={item?._id}
            className='container-custom py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center'
          >
            <div className='order-2 md:order-1'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                {item?.title}
              </h1>
              <p className='mt-4 text-lg md:text-xl text-brand-200'>
                {item?.description}
              </p>
              <div className='mt-8 flex flex-wrap gap-4'>
                <Button
                  asChild
                  size='lg'
                  className='bg-white text-brand-900 hover:bg-brand-100'
                >
                  <Link href='/category/short-sleeve'>Shop Collection</Link>
                </Button>
                <Button
                  asChild
                  variant='outline'
                  size='lg'
                  className='border-white text-white hover:bg-white/10'
                >
                  <Link href='/new-arrivals'>New Arrivals</Link>
                </Button>
              </div>
            </div>
            <div className='order-1 md:order-2 flex justify-end'>
              {item?.image && (
                <div className='w-full max-w-md aspect-[3/4] bg-white/10 rounded-md overflow-hidden'>
                  <Image
                    src={urlFor(item?.image).url()}
                    width={500}
                    height={500}
                    alt='Featured shirt'
                    className='w-full h-full object-cover'
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}

export default HeroSection
