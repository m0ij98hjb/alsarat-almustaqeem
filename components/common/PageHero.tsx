import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

type PageHeroProps = {
  title: string
  subtitle: string
  icon?: string
  actionHref?: string
  actionLabel?: string
}

export function PageHero({ title, subtitle, icon = '✦', actionHref, actionLabel }: PageHeroProps) {
  return (
    <section className="bg-hero-gradient py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 pattern-overlay opacity-20" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold-400/40 bg-white/10 text-gold-300 text-2xl mb-6">
          {icon}
        </div>
        <h1 className="font-arabic text-white text-4xl sm:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-gold-300 text-lg sm:text-xl max-w-3xl mx-auto">{subtitle}</p>
        {actionHref && actionLabel ? (
          <div className="mt-8">
            <Link href={actionHref} className="btn-outline-gold inline-flex items-center gap-2">
              {actionLabel}
              <ArrowLeft size={16} />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
