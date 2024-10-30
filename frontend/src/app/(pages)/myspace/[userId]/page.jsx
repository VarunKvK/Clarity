"use client";

import { useParams } from 'next/navigation'
import React from 'react'

const Dashboard = () => {
    const {userId}=useParams()
    console.group(userId)
  return (
    <div>
        Hello
    </div>
  )
}

export default Dashboard