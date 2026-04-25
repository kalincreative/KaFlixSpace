import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check, X, Clock, AlertCircle } from 'lucide-react'
import { getBookings, updateBookingStatus, deleteBooking } from '../lib/data'

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-700', icon: Check },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: X },
}

export default function Admin() {
  const [bookings, setBookings] = useState(getBookings())

  const handleStatusChange = (id, status) => {
    updateBookingStatus(id, status)
    setBookings(getBookings())
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      deleteBooking(id)
      setBookings(getBookings())
    }
  }

  return (
    <div className="min-h-screen py-24 px-4 bg-[#F5F5F5]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-[#101010]/60 hover:text-[#101010]">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <div className="glass p-6 mb-8">
          <h1 className="text-2xl font-bold text-[#101010] mb-2">Admin Dashboard</h1>
          <p className="text-[#101010]/60">Manage all venue bookings</p>
        </div>

        {bookings.length === 0 ? (
          <div className="glass p-12 text-center">
            <AlertCircle className="w-16 h-16 text-[#101010]/20 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-[#101010] mb-2">No bookings yet</h2>
            <p className="text-[#101010]/60">Bookings will appear here once users make reservations.</p>
          </div>
        ) : (
          <div className="glass overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F5F5F5] border-b border-[#F5F5F5]">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium text-[#101010]/60">Room</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-[#101010]/60">Contact</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-[#101010]/60">Date & Time</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-[#101010]/60">Attendees</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-[#101010]/60">Total</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-[#101010]/60">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-[#101010]/60">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F5F5]">
                  {bookings.map((booking) => {
                    const status = statusConfig[booking.status]
                    const StatusIcon = status.icon
                    return (
                      <tr key={booking.id} className="hover:bg-[#F5F5F5]/50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-[#101010]">{booking.roomName}</div>
                          <div className="text-sm text-[#101010]/60">{booking.date}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-[#101010]">{booking.name}</div>
                          <div className="text-sm text-[#101010]/60">{booking.email}</div>
                          <div className="text-sm text-[#101010]/60">{booking.company}</div>
                        </td>
                        <td className="px-6 py-4 text-[#101010]/80">
                          {booking.startTime} - {booking.endTime}
                        </td>
                        <td className="px-6 py-4 text-[#101010]/80">
                          {booking.attendees}
                        </td>
                        <td className="px-6 py-4 text-[#101010] font-medium">
                          ${booking.totalPrice}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${status.color}`}>
                            <StatusIcon className="w-4 h-4" />
                            {status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {booking.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleStatusChange(booking.id, 'approved')}
                                  className="p-2 bg-green-100 hover:bg-green-200 rounded-lg text-green-700"
                                  title="Approve"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleStatusChange(booking.id, 'rejected')}
                                  className="p-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-700"
                                  title="Reject"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleDelete(booking.id)}
                              className="p-2 bg-[#F5F5F5] hover:bg-[#F5F5F5]/80 rounded-lg text-[#101010]/70"
                              title="Delete"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}