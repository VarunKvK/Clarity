"use client"
import { BadgeCheckIcon, BadgeXIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Integrate = () => {
  const { userId } = useParams()
  const [notionData, setNotionData] = useState(false)
  const [notionId, setNotionId] = useState();
  const [notionEmail, setNotionEmail] = useState();
  useEffect(() => {
    const fetchNotionData = async () => {
      const res = await fetch("/api/user")
      const data = await res.json()
      setNotionData(data?.user?.notionIntegrationStatus)
      setNotionId(data?.user?.notionAccessToken)
      setNotionEmail(data?.user?.email)
    }
    fetchNotionData()
  }, [userId])
  return (
    <div className="w-full">
      <div className="flex items-center justify-between pt-8 px-6 pb-4">
        <div className="leading-tight">
          <h1 className="text-[3rem] font-medium">
            Integration
          </h1>
          <p className="text-gray-200 font-normal opacity-50">This is where you can integrate your Notion pages with your workspace.</p>
        </div>
      </div>
      <div className="p-6">
        <div className="bg-[#161616] rounded-lg p-4 flex items-center justify-between">
          <div className="w-full flex items-center justify-between">
            <div className="">
              <p className="text-white font-medium text-xl">
                Notion Integration
              </p>
              <div className="pt-2 flex items-center gap-2">
                <p className="text-white font-medium text-sm">
                  Your Notion ID
                </p>
                {notionId && (
                  <p className="text-gray-400 font-medium text-sm">
                    {notionId.slice(0, 3)}*****************{notionId.slice(-1)}
                </p>
              )}
              </div>
              <div className="pt-2 flex items-center gap-2">
                <p className="text-white font-medium text-sm">
                  Your Notion Email
                </p>
                <p className="text-gray-400 font-medium text-sm">
                  {notionEmail}
                </p>
              </div>
            </div>
            <div className="">
              {notionData ? (
                <div className="flex items-center gap-2">
                  <BadgeCheckIcon className="w-5 h-5 text-[#cf0]" />
                  <p className="font-medium text-[#cf0]">Connected</p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <BadgeXIcon className="w-5 h-5 text-[#cf0000]" />
                  <p className="font-medium text-[#cf0000]">Not Connected</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Integrate