import { useState } from 'react'
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen pt-20 bg-neutral-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
        <div className="relative bg-cover bg-center p-12 flex flex-col justify-center" style={{ backgroundImage: 'url(/advantage.png)' }}>
          <div className="absolute inset-0 bg-white/95 backdrop-blur-md" />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-4">Get in Touch</h1>
            <p className="text-neutral-600 max-w-2xl mx-auto text-lg mb-12">
              Have questions about our spaces? We'd love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <p className="text-neutral-500 text-sm">Address</p>
                  <p className="text-neutral-900 font-medium">Kuala Lumpur, Malaysia</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <p className="text-neutral-500 text-sm">Phone</p>
                  <p className="text-neutral-900 font-medium">+60 12 345 6789</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <p className="text-neutral-500 text-sm">Email</p>
                  <p className="text-neutral-900 font-medium">hello@kaflixspace.my</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127482.35520846554!2d101.6169485!3d3.1385059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc362abd08e7d3%3A0x232e17121d3dd30!2sKuala%20Lumpur%2C%20Federal%20Territory%20of%20Kuala%20Lumpur!5e0!3m2!1sen!2smy!4v1714090000000!5m2!1sen!2smy" 
                width="100%" 
                height="300" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl shadow-inner"
              />
            </div>
          </div>
        </div>

        <div className="p-12 flex items-center justify-center bg-neutral-50">
          <div className="w-full max-w-md">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">Message Sent!</h2>
                <p className="text-neutral-600">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-bold text-neutral-900 mb-6">Send us a Message</h2>
                
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF1493]/50"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Work Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF1493]/50"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF1493]/50"
                    required
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF1493]/50 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#FF1493] text-white rounded-lg hover:opacity-90 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}