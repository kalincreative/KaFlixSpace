import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-neutral-900 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Elevate Your Next Offsite?
          </h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-10">
            Join top industry leaders who trust KaFlix Space for their most important meetings and corporate events.
          </p>
          <Link
            to="/booking"
            className="inline-block bg-pink-500 hover:bg-pink-400 text-white px-8 py-4 rounded-full text-lg font-medium transition-all hover:scale-105"
          >
            Book Your Space Now
          </Link>
        </div>
      </div>
    </section>
  )
}