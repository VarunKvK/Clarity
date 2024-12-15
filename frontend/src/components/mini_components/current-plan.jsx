'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function CurrentPlan() {
  const [currentPlan, setCurrentPlan] = useState('premium')

  const handlePlanChange = (value) => {
    setCurrentPlan(value)
    // Implement plan change logic here
    console.log(`Changing plan to ${value}...`)
  }

  return (
    <Card className="w-full bg-gray-900 text-white">
      <CardHeader>
        <CardTitle>Current Plan</CardTitle>
        <CardDescription className="text-gray-300">Manage your subscription</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="font-bold text-2xl">
            {currentPlan === 'premium' ? 'Premium' : 'Freemium'}
          </div>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>Benefit 1</li>
            <li>Benefit 2</li>
            <li>Benefit 3</li>
          </ul>
          <Select onValueChange={handlePlanChange} value={currentPlan}>
            <SelectTrigger className="w-full bg-gray-800 text-white">
              <SelectValue placeholder="Select a plan" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              <SelectItem value="freemium">Downgrade to Freemium</SelectItem>
              <SelectItem value="premium">Upgrade to Premium</SelectItem>
            </SelectContent>
          </Select>
          <Button
            className="w-full bg-[#cf0] text-black hover:bg-[#cf0]/80"
            onClick={() => handlePlanChange(currentPlan === 'premium' ? 'freemium' : 'premium')}
          >
            {currentPlan === 'premium' ? 'Downgrade to Freemium' : 'Upgrade to Premium'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

