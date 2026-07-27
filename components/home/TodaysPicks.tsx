import Link from 'next/link'
import { featuredVideos } from '@/data/featuredVideos'
import { SCHOLARS } from '@/data/scholars'
import { dailyIndex } from './dailyPick'

export function TodaysPicks({ locale }: { locale: string }) {
  const video = featuredVideos[dailyIndex(featuredVideos.length)]
  const scholarsPool = SCHOLARS.filter((s) => s.category !== 'organization' && s.website)
  const scholar = scholarsPool[dailyIndex(scholarsPool.length)]

  return (
    <section className="py-20 bg-islamic-cream dark:bg-islamic-navy">
      <div className="max-w-5xl mx-auto px-4 grid gap-6 md:grid-cols-2">
        <div className="card-islamic overflow-hidden">
          <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
            <img
              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
              alt={video.title}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
          </a>
          <div className="p-5">
            <span className="text-xs bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 px-2.5 py-0.5 rounded-full font-medium">
              {locale === 'ar' ? 'فيديو اليوم المختار' : "Today's Featured Video"}
            </span>
            <h3 className="font-arabic text-islamic-navy dark:text-white font-bold mt-2 leading-snug">{video.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{video.sheikhName}</p>
          </div>
        </div>

        <a
          href={scholar.website}
          target="_blank"
          rel="noopener noreferrer"
          className="card-islamic p-6 flex flex-col justify-center text-center"
        >
          <span className="text-xs bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 px-2.5 py-0.5 rounded-full font-medium mx-auto mb-3">
            {locale === 'ar' ? 'عالم اليوم المختار' : "Today's Featured Scholar"}
          </span>
          <div className="text-4xl mb-3">👳</div>
          <h3 className="font-arabic text-xl font-bold text-islamic-green dark:text-gold-300">{scholar.nameAr}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">{scholar.specialty}</p>
        </a>
      </div>
    </section>
  )
}
