import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Check, ArrowRight, ArrowLeft, Calendar, Users, Clock, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { z } from 'zod'
import { rooms, saveBooking } from '../lib/data'

const bookingSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company is required'),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  attendees: z.number().min(1, 'At least 1 attendee required'),
  notes: z.string().optional(),
})

export default function Booking() {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const room = rooms.find(r => r.id === roomId)

  useEffect(() => {
    const storedUser = localStorage.getItem('kaflix_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: '',
    date: '',
    startTime: '09:00',
    endTime: '10:00',
    attendees: 10,
    notes: '',
  })

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-[#101010]/20 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-[#101010] mb-2">Room not found</h2>
          <Link to="/" className="text-[#FF1493] hover:underline">Back to Home</Link>
        </div>
      </div>
    )
  }

  const totalHours = () => {
    const start = parseInt(formData.startTime.split(':')[0])
    const end = parseInt(formData.endTime.split(':')[0])
    return Math.max(0, end - start)
  }

  const totalPrice = () => totalHours() * room.pricePerHour

  const validateStep = (currentStep) => {
    const fieldsToValidate = {
      1: ['date', 'startTime', 'endTime', 'attendees'],
      2: ['name', 'email', 'company'],
      3: [],
    }

    const fields = fieldsToValidate[currentStep]
    const newErrors = {}

    fields.forEach(field => {
      const value = formData[field]
      if (field === 'attendees') {
        if (!value || value < 1) newErrors[field] = 'At least 1 attendee required'
        else if (value > room.capacity) newErrors[field] = `Maximum capacity is ${room.capacity}`
      } else if (!value || (typeof value === 'string' && value.trim() === '')) {
        newErrors[field] = 'This field is required'
      }
    })

    if (currentStep === 1) {
      const start = parseInt(formData.startTime.split(':')[0])
      const end = parseInt(formData.endTime.split(':')[0])
      if (end <= start) newErrors.endTime = 'End time must be after start time'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = () => {
    if (validateStep(step)) {
      const booking = saveBooking({
        ...formData,
        roomId: room.id,
        roomName: room.name,
        totalPrice: totalPrice(),
        userId: user?.id,
      })
      setStep(4)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8
    return `${hour.toString().padStart(2, '0')}:00`
  })

  return (
    <div className="min-h-screen py-24 px-4 bg-[#F5F5F5]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-[#101010]/60 hover:text-[#101010]">
            <ArrowLeft className="w-4 h-4" />
            Back to Spaces
          </Link>
        </div>

        <div className="glass p-6 mb-8">
          <div className="flex items-center justify-between mb-2">
            {[{ num: 1, label: 'Select Time' }, { num: 2, label: 'Your Details' }, { num: 3, label: 'Confirm' }].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  step >= s.num ? 'bg-[#FF1493] text-white' : 'bg-[#F5F5F5] text-[#101010]/60'
                }`}>
                  {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                </div>
                <span className={`ml-2 hidden sm:inline ${step >= s.num ? 'text-[#101010]' : 'text-[#101010]/60'}`}>
                  {s.label}
                </span>
                {i < 2 && (
                  <div className={`w-12 sm:w-24 h-0.5 mx-2 ${step > s.num ? 'bg-[#FF1493]' : 'bg-[#F5F5F5]'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass p-6"
                >
<h2 className="text-xl font-semibold text-[#101010] mb-6">Select Date & Time</h2>
                   
                   <div className="space-y-4">
                     <div>
                       <label className="block text-sm font-medium text-[#101010]/80 mb-2">Date</label>
                       <input
                         type="date"
                         value={formData.date}
                         onChange={(e) => handleChange('date', e.target.value)}
                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF1493]"
                       />
                       {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <label className="block text-sm font-medium text-[#101010]/80 mb-2">Start Time</label>
                         <select
                           value={formData.startTime}
                           onChange={(e) => handleChange('startTime', e.target.value)}
                           className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF1493]"
                         >
                           {timeSlots.map(t => (
                             <option key={t} value={t}>{t}</option>
                           ))}
                         </select>
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-[#101010]/80 mb-2">End Time</label>
                         <select
                           value={formData.endTime}
                           onChange={(e) => handleChange('endTime', e.target.value)}
                           className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF1493]"
                         >
                           {timeSlots.map(t => (
                             <option key={t} value={t}>{t}</option>
                           ))}
                         </select>
                         {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
                       </div>
                     </div>

                     <div>
                       <label className="block text-sm font-medium text-[#101010]/80 mb-2">Number of Attendees</label>
                       <input
                         type="number"
                         value={formData.attendees}
                         onChange={(e) => handleChange('attendees', parseInt(e.target.value) || 0)}
                         min={1}
                         max={room.capacity}
                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF1493]"
                       />
                       {errors.attendees && <p className="text-red-500 text-sm mt-1">{errors.attendees}</p>}
                       <p className="text-sm text-[#101010]/60 mt-1">Maximum capacity: {room.capacity}</p>
                     </div>
                   </div>

                   <button
                     onClick={handleNext}
                     className="w-full mt-6 bg-[#FF1493] hover:bg-[#D9117F] text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                   >
                     Continue
                     <ArrowRight className="w-4 h-4" />
                   </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass p-6"
                >
<h2 className="text-xl font-semibold text-[#101010] mb-6">Your Details</h2>
                   
                   <div className="space-y-4">
                     <div>
                       <label className="block text-sm font-medium text-[#101010]/80 mb-2">Full Name</label>
                       <input
                         type="text"
                         value={formData.name}
                         onChange={(e) => handleChange('name', e.target.value)}
                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF1493]"
                       />
                       {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                     </div>

                     <div>
                       <label className="block text-sm font-medium text-[#101010]/80 mb-2">Email</label>
                       <input
                         type="email"
                         value={formData.email}
                         onChange={(e) => handleChange('email', e.target.value)}
                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF1493]"
                       />
                       {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                     </div>

                     <div>
                       <label className="block text-sm font-medium text-[#101010]/80 mb-2">Company</label>
                       <input
                         type="text"
                         value={formData.company}
                         onChange={(e) => handleChange('company', e.target.value)}
                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF1493]"
                       />
                       {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                     </div>

                     <div>
                       <label className="block text-sm font-medium text-[#101010]/80 mb-2">Notes (Optional)</label>
                       <textarea
                         value={formData.notes}
                         onChange={(e) => handleChange('notes', e.target.value)}
                         rows={3}
                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF1493]"
                       />
                     </div>
                   </div>

                   <div className="flex gap-4 mt-6">
                     <button
                       onClick={handleBack}
                       className="flex-1 bg-[#F5F5F5] hover:bg-[#F5F5F5]/80 text-[#101010] px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                     >
                       <ArrowLeft className="w-4 h-4" />
                       Back
                     </button>
                     <button
                       onClick={handleNext}
                       className="flex-1 bg-[#FF1493] hover:bg-[#D9117F] text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                     >
                       Continue
                       <ArrowRight className="w-4 h-4" />
                     </button>
                   </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass p-6"
                >
<h2 className="text-xl font-semibold text-[#101010] mb-6">Confirm Booking</h2>
                   
                   <div className="space-y-4 mb-6">
                     <div className="flex justify-between py-3 border-b border-[#F5F5F5]">
                       <span className="text-[#101010]/60">Room</span>
                       <span className="font-medium text-[#101010]">{room.name}</span>
                     </div>
                     <div className="flex justify-between py-3 border-b border-[#F5F5F5]">
                       <span className="text-[#101010]/60">Date</span>
                       <span className="font-medium text-[#101010]">{formData.date}</span>
                     </div>
                     <div className="flex justify-between py-3 border-b border-[#F5F5F5]">
                       <span className="text-[#101010]/60">Time</span>
                       <span className="font-medium text-[#101010]">{formData.startTime} - {formData.endTime}</span>
                     </div>
                     <div className="flex justify-between py-3 border-b border-[#F5F5F5]">
                       <span className="text-[#101010]/60">Attendees</span>
                       <span className="font-medium text-[#101010]">{formData.attendees}</span>
                     </div>
                     <div className="flex justify-between py-3 border-b border-[#F5F5F5]">
                       <span className="text-[#101010]/60">Contact</span>
                       <span className="font-medium text-[#101010]">{formData.name} ({formData.email})</span>
                     </div>
                     <div className="flex justify-between py-3">
                       <span className="text-[#101010]/60">Total</span>
                       <span className="font-bold text-xl text-[#FF1493]">${totalPrice()}</span>
                     </div>
                   </div>

                   <div className="flex gap-4">
                     <button
                       onClick={handleBack}
                       className="flex-1 bg-[#F5F5F5] hover:bg-[#F5F5F5]/80 text-[#101010] px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                     >
                       <ArrowLeft className="w-4 h-4" />
                       Back
                     </button>
                     <button
                       onClick={handleSubmit}
                       className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                     >
                       <Check className="w-4 h-4" />
                       Confirm Booking
                     </button>
                   </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass p-6 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#101010] mb-2">Booking Confirmed!</h2>
                  <p className="text-[#101010]/60 mb-6">
                    Your booking request has been submitted. We'll send a confirmation email to {formData.email}
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-[#FF1493] hover:bg-[#D9117F] text-white px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    Back to Home
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <div className="glass p-6 sticky top-24">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h3 className="text-lg font-semibold text-[#101010] mb-2">{room.name}</h3>
              <p className="text-sm text-[#101010]/60 mb-4">{room.description}</p>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#101010]/60">Capacity</span>
                  <span className="font-medium">{room.capacity} people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#101010]/60">Rate</span>
                  <span className="font-medium">${room.pricePerHour}/hr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#101010]/60">Duration</span>
                  <span className="font-medium">{totalHours()} hours</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#F5F5F5]">
                  <span className="text-[#101010] font-semibold">Total</span>
                  <span className="text-[#FF1493] font-bold">${totalPrice()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}