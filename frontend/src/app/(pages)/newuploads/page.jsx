'use client'
import { FileUploader } from '@/components/mini_components/Upload'
import { useEffect, useState } from 'react'


const NewUploads = () => {
    const [fileUploaded,uploaded]=useState(false);
    return (
        <div className="xl:max-w-6xl lg:max-w-4xl md:max-w-2xl max-w-2xl flex items-center w-full flex-col px-4 h-[90vh] relative">
            <div className='h-full flex items-center relative z-100'>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1 md:gap-2 lg:gap-2.5 xl:gap-4">
                        <h1 className="header xl:text-[2.5rem] lg:text-[2rem] md:text-[1.5rem] sm:text-[1.2rem] text-[1.2rem] text-center xl:leading-[4rem] lg:leading-[3.5rem] md:leading-[3rem] sm:leading-[2.5rem] leading-[2rem]">
                            Drop your <span className='text-[#cf0] font-bold'>PDFs</span> here and watch magic happen!
                        </h1>
                        <FileUploader uploaded={uploaded}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewUploads