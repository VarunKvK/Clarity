'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

const transactions = [
  { id: 1, date: '2023-05-01', amount: '$29.99', status: 'Paid' },
  { id: 2, date: '2023-04-01', amount: '$29.99', status: 'Paid' },
  { id: 3, date: '2023-03-01', amount: '$29.99', status: 'Paid' },
  { id: 4, date: '2023-02-01', amount: '$29.99', status: 'Failed' },
  { id: 5, date: '2023-01-01', amount: '$29.99', status: 'Paid' },
]

export function BillingHistory() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3
  const totalPages = Math.ceil(transactions.length / itemsPerPage)

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Billing History</h2>
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Date</TableHead>
              <TableHead className="text-white">Amount</TableHead>
              <TableHead className="text-white">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="text-white">{transaction.date}</TableCell>
                <TableCell className="text-white">{transaction.amount}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      transaction.status === 'Paid'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-800 text-white hover:bg-gray-700"
        >
          Previous
        </Button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-gray-800 text-white hover:bg-gray-700"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

