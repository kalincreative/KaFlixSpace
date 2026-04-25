import { Link } from 'react-router-dom'
import { Users, Clock, Check, ArrowRight, Wifi, Tv, Coffee, Mic, Monitor } from 'lucide-react'
import { motion } from 'framer-motion'
import { rooms } from '../lib/data'

const amenityIcons = {
  'WiFi': <Wifi className="w-3 h-3" />,
  'Projector': <Tv className="w-3 h-3" />,
  'Coffee Machine': <Coffee className="w-3 h-3" />,
  'Microphones': <Mic className="w-3 h-3" />,
  'Smart Board': <Monitor className="w-3 h-3" />,
}

export default function RoomsSection() {
  return (
    <section className="py-16 px-4 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#101010] mb-6">Our Spaces</h2>
          <p className="text-[#101010]/60 max-w-2xl mx-auto text-lg">
            Discover fully equipped training rooms and executive boardrooms tailored to inspire focus, collaboration, and breakthrough moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room, idx) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-medium text-[#101010]">
                  ${room.pricePerHour}/hr
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#101010] mb-2">{room.name}</h3>
                <p className="text-sm text-[#101010]/60 mb-4 line-clamp-2">{room.description}</p>

                <div className="flex items-center gap-4 text-sm text-[#101010]/60 mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>24/7</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 3).map(amenity => (
                    <span
                      key={amenity}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-[#F5F5F5] rounded-md text-xs text-[#101010]/60"
                    >
                      {amenityIcons[amenity] || <Check className="w-3 h-3" />}
                      {amenity}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/booking/${room.id}`}
                  className="inline-flex items-center justify-center w-full gap-2 py-2.5 bg-[#FF1493] hover:bg-[#D9117F] text-white rounded-xl font-medium transition-colors"
                >
                  Book Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}