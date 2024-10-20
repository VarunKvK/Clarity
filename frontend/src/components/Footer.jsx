import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='flex items-center justify-center w-full flex-col px-4 relative bg-[#cf0]'>
            <div className='flex flex-col items-center relative z-100'>
                <Link href={"/"} className='header xl:text-[20rem] lg:text-[18rem] md:text-[15rem] sm:text-[13rem] text-[8rem] font-bold text-center text-[#111]'>
                    Clarity
                </Link>
                <p className="text-[#111]">© 2024 Clarity. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer