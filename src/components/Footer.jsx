import { Link } from 'react-router-dom'
import { Linkedin, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-100 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 mb-4">
              <span className="text-[#FF1493]">KaFlix</span> Space
            </h3>
            <p className="text-neutral-500 text-sm">
              Premium spaces for premium ideas. Inspiring corporate excellence.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-4">Spaces</h4>
            <ul className="flex flex-col gap-2 text-sm text-neutral-500">
              <li><Link to="/booking" className="hover:text-[#FF1493]">Grand Seminar Hall</Link></li>
              <li><Link to="/booking" className="hover:text-[#FF1493]">Executive Boardroom</Link></li>
              <li><Link to="/booking" className="hover:text-[#FF1493]">Creative Workshop</Link></li>
              <li><Link to="/booking" className="hover:text-[#FF1493]">Focus Pod</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-4">Company</h4>
            <ul className="flex flex-col gap-2 text-sm text-neutral-500">
              <li><a href="#" className="hover:text-[#FF1493]">About Us</a></li>
              <li><a href="#" className="hover:text-[#FF1493]">Careers</a></li>
              <li><a href="#" className="hover:text-[#FF1493]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#FF1493]">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-4">Contact</h4>
            <ul className="flex flex-col gap-2 text-sm text-neutral-500">
              <li>hello@kaflixspace.com</li>
              <li>+60 3 1234 5678</li>
              <li>Kuala Lumpur, Malaysia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
          <p>© 2026 KaFlix Space. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#FF1493]"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="hover:text-[#FF1493]"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-[#FF1493]"><Instagram className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}