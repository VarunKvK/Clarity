'use client'
import { HowItWorksDemo } from './mini_components/Working'

const HowItWorks = () => {
    return (
        <div className='flex items-center w-full flex-col px-4 h-[160vh] relative'>
            <div className='flex items-center relative z-100'>
                <div className="flex flex-col gap-8">
                    <h1 className="header xl:text-[7rem] lg:text-[6rem] md:text-[5rem] sm:text-[4rem] text-[2.5rem] text-center">
                        How it works?
                    </h1>
                    <div className="">
                        <HowItWorksDemo />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks