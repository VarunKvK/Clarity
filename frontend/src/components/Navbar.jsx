import { UserCircle2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    const navcomponents=[
        {name:"About",href:"/about"},
        {name:"Profile",href:"/profile"},
    ]
    return (
        <nav className='header font-medium flex items-center justify-between py-8 w-full'>
            <Link href={"/"} className='font-semibold text-lg'>Clarity</Link>
            <div className="flex items-center gap-4">
                {navcomponents.map((item,index)=>(
                    <Link href={item.href} key={item.name} className='ml-4'>{item.name}</Link>
                ))}
            </div>
                <Link href={"/"} className=''>
                    <UserCircle2 className='h-8 w-8'/>
                </Link>
        </nav>
    )
}

export default Navbar