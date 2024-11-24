import Link from 'next/link';
import React from 'react';

const UpgradeInfo = ({ userData, loadingNotion, notion }) => {
  if (loadingNotion) {
    return <p>Loading...</p>;
  }

  const notionPdfsCount = notion?.length;
  const plan = userData?.subscriptionLevel;

  // Plan-specific conditions
  const planLimits = {
    Free: 3,         // Free plan: Limit 5 PDFs
    Starter: 15,     // Starter plan: Limit 20 PDFs
    Premium: Infinity, // Premium plan: Unlimited
  };

  const currentLimit = planLimits[plan] || 0; // Default limit 0 if plan is undefined
  return (
    <div>
      <div className="flex flex-col gap-2 bg-[#c4ff23] text-[#111] p-2 rounded-lg mb-2">
        <h1 className="font-semibold">Your Plan</h1>
        <div className="flex items-start justify-between">
          <p className="text-sm opacity-50">{plan ? `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan` : 'No Plan Selected'}</p>
          {plan === 'premium' ? (
            <p className="text-sm">Unlimited PDFs</p>
          ) : (
            <div className='flex flex-col gap-0 justify-end'>
              {notionPdfsCount <= currentLimit && (
                <p className="text-sm">{notionPdfsCount}/{currentLimit}</p>
              )}
              {notionPdfsCount >= currentLimit && (
                <Link href="/pricings" className="text-sm underline">
                  {plan === 'Free' ? 'Upgrade to Starter' : 'Upgrade to Premium'}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpgradeInfo;
