import Image from 'next/image'
import Link from 'next/link'
import scholars from '@/data/scholars.json'

type Scholar = {
  id: number
  name: string
  image: string
  about: string
  specialty: string
  country: string
  website: string
  contact: string
}

export function ScholarsPageContent() {
  const data = scholars as Scholar[]

  return (
    <div className="min-h-screen bg-islamic-cream">
      <section className="bg-hero-gradient py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold-400/40 bg-white/10 text-gold-300 text-3xl mb-6">
            👳
          </div>
          <h1 className="font-arabic text-white text-4xl sm:text-5xl font-bold mb-4">العلماء والدعاة</h1>
          <p className="text-gold-200 text-lg max-w-3xl mx-auto">
            مقدمة عن أهمية سؤال أهل العلم والتوجيه من ذوي الخبرة في شتى المجالات الإسلامية.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {data.map((scholar) => (
            <article key={scholar.id} className="card-islamic overflow-hidden">
              <div className="relative h-56 w-full">
                <Image
                  src={scholar.image}
                  alt={`صورة ${scholar.name}، ${scholar.specialty}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h2 className="font-arabic text-2xl font-bold text-islamic-green mb-2">{scholar.name}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">{scholar.about}</p>
                <div className="space-y-2 text-sm text-gray-600 mb-5">
                  <p><span className="font-bold text-gold-600">التخصص:</span> {scholar.specialty}</p>
                  <p><span className="font-bold text-gold-600">الدولة:</span> {scholar.country}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href={scholar.website} target="_blank" rel="noreferrer" className="btn-gold text-sm px-4 py-2">
                    زيارة الموقع
                  </Link>
                  {scholar.contact ? (
                    <Link href={scholar.contact} target="_blank" rel="noreferrer" className="btn-outline-gold text-sm px-4 py-2">
                      التواصل
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
