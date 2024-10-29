'use client'
import { MenuIcon, UserCircle2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Dropmenu from './mini_components/Dropmenu'
import { SignInButton, SignUpButton, useAuth } from '@clerk/nextjs'

const Navbar = () => {
    const { isSignedIn } = useAuth();
    const navcomponents = [
        { name: "Why Clarity?", href: "#why" },
        { name: "Add Files", href: "/newuploads" },
        { name: "My Space", href: "/profile" },
        { name: "Terms&Condition", href: "/terms&conditions" },
    ]
    return (
        <nav className='xl:max-w-6xl lg:max-w-4xl md:max-w-2xl max-w-2xl header font-medium flex items-center justify-between md:py-8 py-6 md:px-4 px-6  w-full relative z-20'>
            <Link href={"/"} className='font-semibold text-lg hidden md:block'>Clarity</Link>
            {/* Menubar for resonsivenss */}
            <Link href={"/"} className='font-semibold text-[1.8rem] md:hidden block'>C</Link>
            {/* Menubar for resonsivenss */}
            <div className="items-center gap-4 hidden md:flex">
                {navcomponents.map((item) => (
                    <Link href={item.href} key={item.name} className='ml-4'>{item.name}</Link>
                ))}
            </div>  

            {!isSignedIn && <div className="items-center gap-4 hidden md:flex">
                <SignInButton className="bg-[#cf0] rounded-md px-6 py-2 text-[#111]" />
                <SignUpButton className="border border-[#cf0] rounded-md px-6 py-2 text-[#ffff]" />
            </div>}

            {isSignedIn && <Link href={"/"} className='hidden md:block'>
                <UserCircle2 className='h-8 w-8' />
            </Link>}
            {/* Menubar for resonsivenss */}
            {isSignedIn && <div className="block md:hidden">
                <Dropmenu icon={<MenuIcon />} dropdownMenu={navcomponents} />
            </div>}

            {!isSignedIn && <div className="block md:hidden items-center gap-4">
                <SignInButton className="bg-[#cf0] rounded-md px-4 py-1.5 text-[#111]" />
            </div>}
            {/* Menubar for resonsivenss */}
        </nav>
    )
}

export default Navbar