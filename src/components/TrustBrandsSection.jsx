import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const clientLogos = [
  '/logo/1.png',
  '/logo/2.png',
  '/logo/3.png',
  '/logo/4.png',
  '/logo/5.png',
  '/logo/6.png',
  '/logo/7.png',
  '/logo/8.png',
  '/logo/9.png',
  '/logo/10.png',
  '/logo/11.png',
  '/logo/12.png',
  '/logo/13.png',
  '/logo/14.png',
  '/logo/15.png',
]

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

export default function TrustBrandsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const constraintsRef = useRef(null)

  const handleDragEnd = (info) => {
    const threshold = 80
    if (info.offset.x > threshold) {
      setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
    } else if (info.offset.x < -threshold) {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }
  }

  return (
    <section className="py-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <p className="text-3xl font-bold text-[#101010]">Trusted by Industry Leaders</p>
      </div>

      <div className="relative w-full overflow-hidden mb-16">
        <motion.div
          className="flex gap-20 w-max"
          animate={{
            x: ["0%", "-50%"]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear"
            }
          }}
        >
          {[...clientLogos, ...clientLogos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-16 w-32 flex items-center justify-center"
            >
              <img
                src={logo}
                alt={`Client ${index + 1}`}
                className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative h-[440px] max-w-lg mx-auto" ref={constraintsRef}>
        {reviews.map((review, index) => {
          const isTop = index === currentIndex
          const offset = index - currentIndex
          
          return (
            <motion.div
              key={review.id}
              className={`absolute left-1/2 -translate-x-1/2 w-full max-w-lg ${isTop ? 'z-30 cursor-grab active:cursor-grabbing' : 'z-20 pointer-events-none'}`}
              style={{
                scale: isTop ? 1 : 0.92,
                top: isTop ? 0 : 20,
                opacity: offset < 0 || offset >= reviews.length ? 0 : 1,
              }}
              drag={isTop ? 'x' : false}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.9}
              onDragEnd={(e, info) => handleDragEnd(info)}
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
        })}
      </div>

      <div className="flex justify-center gap-2 -mt-6">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-[#FF1493]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  )
}