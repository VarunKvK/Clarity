import React from 'react'
import { FileUploadDemo } from './mini_components/Upload_Cta'

const CTA = () => {
    return (
        <div className='xl:max-w-6xl lg:max-w-4xl md:max-w-2xl max-w-2xl flex items-center w-full flex-col px-4 h-[100vh] relative'>
            <div className='flex items-center relative z-100'>
                <div className="flex flex-col gap-8">
                    <h1 className="header xl:text-[7rem] lg:text-[6rem] md:text-[5rem] sm:text-[4rem] text-[2.5rem] text-center">
                        Ready for it?
                    </h1>
                    <FileUploadDemo/>
                </div>
            </div>
        </div>
    )
}

export default CTA