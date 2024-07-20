import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import logo from '@/public/images/logo.png'
import Link from 'next/link'
const Navbar = () => {
  return (
    <div className='flex items-center justify-between w-screen bg-black px-5 py-4 shadow-white md:px-10 md:py-4'>
      <div className='flex'>
      <Image src={logo} alt='logo-image' width={70} height={70} className='mb-3' />
        <h1 className='flex items-center  text-[12px] text-white font-bold sm:text-[18px]' > ImagicaAI</h1>
      </div>
      <div className='sm:flex hidden  gap-1'>
       <Link href='/login'> <Button>sign in</Button> </Link>
        <Button className=' text-whitehover:bg-gray-200 text-[15px] bg-blue-400  font-bold'>Get Started</Button>
      </div>
    </div>
  )
}

export default Navbar
