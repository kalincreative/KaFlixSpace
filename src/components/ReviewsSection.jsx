import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Quote } from 'lucide-react'

const reviews = [
  {
    id: 1,
    name: 'Sarah Ahmad',
    title: 'CEO, TechVenture Malaysia',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    quote: 'KaFlix Space transformed our annual tech summit into an unforgettable experience. The facilities and service were impeccable.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Director, Apex Consulting',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    quote: 'Professional, clean, and inspiring. The best venue we have worked with for our corporate training programs.'
  },
  {
    id: 3,
    name: 'Dr. Amanda Lee',
    title: 'Founder, MedInnovate Asia',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    quote: 'Our medical conference was a huge success thanks to the exceptional facilities and support at KaFlix Space.'
  },
  {
    id: 4,
    name: 'James Wong',
    title: 'VP Operations, FinanceHub',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    quote: 'The attention to detail and premium amenities make KaFlix Space our go-to choice for important client meetings.'
  }
]

function ReviewCard({ review, isTop, onSwipe }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-150, 0, 150], [-12, 0, 12])

  const handleDragEnd = (event, info) => {
    const threshold = 80
    if (info.offset.x > threshold || info.offset.x < -threshold) {
      onSwipe()
      x.set(0)
    }
  }

  return (
    <motion.div
      className={`absolute left-1/2 -translate-x-1/2 w-full max-w-lg ${isTop ? 'z-30 cursor-grab active:cursor-grabbing' : 'z-20 pointer-events-none'}`}
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        scale: isTop ? 1 : 0.92,
        top: isTop ? 0 : 20,
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: -150, right: 150 }}
      dragElastic={0.9}
      onDragEnd={isTop ? handleDragEnd : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="bg-white rounded-3xl shadow-xl p-8 relative">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-5 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-xl" />
        
        <div className="absolute top-6 right-6">
          <Quote className="w-5 h-5 text-[#FF1493]/30" />
        </div>

        <div className="pt-6">
          <img
            src={review.avatar}
            alt={review.name}
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-[#FF1493]/20"
          />
          <p className="text-[#101010]/80 text-base text-center leading-relaxed mb-4">
            "{review.quote}"
          </p>
          <div className="text-center">
            <h4 className="font-semibold text-lg text-[#101010]">{review.name}</h4>
            <p className="text-base text-[#FF1493]">{review.title}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ReviewsSection() {
  const [cards, setCards] = useState(reviews)
  const [key, setKey] = useState(0)

  const handleSwipe = () => {
    setCards((prev) => {
      const newCards = [...prev]
      const swiped = newCards.shift()
      newCards.push(swiped)
      return newCards
    })
    setKey(prev => prev + 1)
  }

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-[#FF1493] mb-2">Reviews</p>
          <h2 className="text-3xl font-bold text-[#101010]">What Our Industry Leaders Say</h2>
        </div>

        <div className="relative h-[480px] flex justify-center" key={key}>
          {cards.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              isTop={cards.indexOf(review) === 0}
              onSwipe={handleSwipe}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-[#101010]/60">Swipe left or right to see more</p>
        </div>
      </div>
    </section>
  )
}