import Link from 'next/link'
import React from 'react'

const UpgradeInfo = ({ userData, loadingNotion, notion }) => {
  const notionPdfsCount = notion?.length
  return (
    <div>
      <div className="flex flex-col gap-2 bg-[#c4ff23] text-[#111] p-2 rounded-lg mb-2">
        <h1 className="font-semibold">Your Plan</h1>
        <div className="flex items-center justify-between">
          <p className="text-sm opacity-50">{userData.subscriptionLevel} Plan</p>
            {notionPdfsCount < 5 &&
              <p className="text-sm">{notionPdfsCount}/5</p>
            }
            {notionPdfsCount > 5 &&
              <Link href={"/pricings"} className="text-sm underline">Expired</Link>
            }
        </div>
      </div>

    </div>
  )
}

export default UpgradeInfo