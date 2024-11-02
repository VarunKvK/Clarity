"use client";

import { useParams } from 'next/navigation'
import React from 'react'

const Dashboard = () => {
    const {userId}=useParams()
  return (
    <div>
      Hello
    </div>
  )
}

export default Dashboard