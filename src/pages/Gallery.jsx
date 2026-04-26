const images = [
  { src: '/Spaces/Grand Seminar Hall.png', name: 'Grand Seminar Hall' },
  { src: '/Spaces/Tech Innovation Lab.png', name: 'Tech Innovation Lab' },
  { src: '/Spaces/Executive Boardroom.png', name: 'Executive Boardroom' },
  { src: '/Gallery/gallery1.png', name: 'Event Space 1' },
  { src: '/Spaces/Creative Workshop.png', name: 'Creative Workshop' },
  { src: '/Spaces/Pitching Theatre.png', name: 'Pitching Theatre' },
  { src: '/Spaces/Podcast & Media Studio.png', name: 'Podcast & Media Studio' },
  { src: '/Spaces/Agile Sprint Room.png', name: 'Agile Sprint Room' },
  { src: '/Gallery/gallery2.png', name: 'Gallery 2' },
  { src: '/Gallery/gallery3.png', name: 'Event Space 3' },
  { src: '/Spaces/Strategy War Room.png', name: 'Strategy War Room' },
  { src: '/Spaces/Focus Pod.png', name: 'Focus Pod' },
  { src: '/Spaces/Zen Huddle Space.png', name: 'Zen Huddle Space' },
  { src: '/Gallery/gallery4.png', name: 'Gallery 4' },
  { src: '/advantage.png', name: 'The KaFlix Advantage' },
  { src: '/Gallery/gallery5.png', name: 'Event Space 5' },
]

const gridSpans = [
  'col-span-4 aspect-[19/6]',
  'col-span-2',
  'col-span-2',
  'col-span-4 aspect-[19/6]',
  'col-span-3 aspect-[19/6]',
  'col-span-3 aspect-[19/6]',
  'col-span-2',
  'col-span-2',
  'col-span-2',
  'col-span-4 aspect-[19/6]',
  'col-span-2',
  'col-span-2',
  'col-span-4 aspect-[19/6]',
  'col-span-2',
  'col-span-2',
  'col-span-2',
]

export default function Gallery() {
  return (
<div className="min-h-screen pt-20 bg-neutral-50">
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Gallery</h1>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            A Glimpse Into Our Space
          </p>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-6 gap-4 bg-neutral-50">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`relative overflow-hidden group cursor-pointer rounded-2xl ${gridSpans[idx]}`}
              >
                <img
                  src={img.src}
                  alt={img.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-neutral-900 font-serif text-lg">{img.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}