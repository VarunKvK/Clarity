import Link from 'next/link'
import React from 'react'
import { BackgroundLines } from './ui/background-lines'
import { Button } from './ui/button'


const Header = () => {
    return (
        <BackgroundLines className="xl:max-w-6xl lg:max-w-4xl md:max-w-2xl max-w-2xl flex items-center w-full flex-col px-4 h-[90vh] relative">
            <div className='h-full flex items-center relative z-100'>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1 md:gap-2 lg:gap-2.5 xl:gap-0">
                        <h1 className="header xl:text-[7rem] lg:text-[6rem] md:text-[4.5rem] sm:text-[4rem] text-[3rem] text-center xl:leading-[6.5rem] lg:leading-[5.5rem] md:leading-[4.5rem] sm:leading-[4rem] leading-[3rem]">
                            Clarity for Your Study Workflow
                        </h1>
                        <p className="body xl:text-xl lg:text-lg md:text-md sm:text-md text-sm font-thin opacity-50 text-center">Organize notes, PDFs, and study materials in one place with AI-powered insights.</p>
                    </div>
                    <div className="flex items-center justify-center md:gap-8 gap-4">
                        <Button asChild variant="primary" className="bg-[#cf0] md:px-8 px-12 py-2">
                            <Link href={"/newupload"} className='body font-semibold text-[#111]'>Upload Your PDFs</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </BackgroundLines>
    )
}

export default Header