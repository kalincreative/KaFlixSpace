const STORAGE_KEY = 'kaflix_bookings'

export const rooms = [
  {
    id: 'grand-seminar-hall',
    name: 'Grand Seminar Hall',
    description: 'Spacious hall for up to 200 attendees with state-of-the-art audiovisual equipment and advanced acoustics.',
    capacity: 200,
    amenities: ['Projector', 'Sound System', 'Microphones', 'Stage', 'Air Conditioning', 'WiFi'],
    pricePerHour: 150,
    image: 'https://images.unsplash.com/photo-1517457373953-b7b1e2e3e8fd?w=800&q=80',
    size: 'large'
  },
  {
    id: 'tech-lab',
    name: 'Tech Lab',
    description: 'Modern lab with individual workstations, high-speed internet, and tech support for intensive coding workshops.',
    capacity: 40,
    amenities: ['Workstations', 'High-Speed WiFi', 'Charging Ports', 'Smart Board', 'Air Conditioning'],
    pricePerHour: 80,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    size: 'medium'
  },
  {
    id: 'brainstorming-room',
    name: 'Brainstorming Room',
    description: 'Intimate space designed for collaborative sessions with writable walls, comfortable seating, and creative tools.',
    capacity: 15,
    amenities: ['Whiteboard Walls', 'Video Conference', 'Smart TV', 'Coffee Machine', 'Air Conditioning'],
    pricePerHour: 50,
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&q=80',
    size: 'small'
  },
  {
    id: 'boardroom',
    name: 'Executive Boardroom',
    description: 'Premium meeting space with executive seating, video conferencing, and premium furnishings.',
    capacity: 20,
    amenities: ['Video Conferencing', 'Large Display', 'Premium Seating', 'Catering Option', 'Soundproofing'],
    pricePerHour: 100,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    size: 'medium'
  }
]

export const getBookings = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export const saveBooking = (booking) => {
  const bookings = getBookings()
  const newBooking = {
    ...booking,
    id: crypto.randomUUID(),
    status: 'pending',
    createdAt: new Date().toISOString()
  }
  bookings.push(newBooking)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
  return newBooking
}

export const updateBookingStatus = (id, status) => {
  const bookings = getBookings()
  const idx = bookings.findIndex(b => b.id === id)
  if (idx !== -1) {
    bookings[idx].status = status
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
    return bookings[idx]
  }
  return null
}

export const deleteBooking = (id) => {
  const bookings = getBookings()
  const filtered = bookings.filter(b => b.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}