'use client'

import { useState } from 'react'
import Link from 'next/link'

const SAMPLE_QUESTIONS = [
  { id: 1, title: 'كيف أحافظ على صلاة الفجر يومياً؟', body: 'أعاني من صعوبة الاستيقاظ لصلاة الفجر، ما النصائح الشرعية والعملية؟', category: 'الصلاة', views: 1240, answers: 5, isAnswered: true, author: 'أبو محمد' },
  { id: 2, title: 'ما الفرق بين التوبة والاستغفار؟', body: 'هل التوبة والاستغفار شيء واحد أم بينهما فرق؟', category: 'العقيدة', views: 890, answers: 3, isAnswered: true, author: 'أم عبدالله' },
  { id: 3, title: 'هل يجوز العمل في البنوك الإسلامية؟', body: 'أعمل في أحد البنوك الإسلامية، فهل عملي حلال؟', category: 'المعاملات', views: 2100, answers: 4, isAnswered: true, author: 'فاروق' },
  { id: 4, title: 'كيف أدعو غير المسلمين للإسلام بحكمة؟', body: 'أريد أن أدعو زملائي في العمل للإسلام لكنني لا أعرف كيف أبدأ؟', category: 'الدعوة', views: 670, answers: 7, isAnswered: true, author: 'سارة' },
  { id: 5, title: 'ما حكم التبرع بالدم؟', body: 'هل يجوز التبرع بالدم للمرضى؟', category: 'الطب', views: 1890, answers: 2, isAnswered: true, author: 'عمر' },
  { id: 6, title: 'كيف أختار اسماً إسلامياً لمولودي؟', body: 'سيُولد طفلي قريباً وأريد أن أختار اسماً ذا معنى إسلامي جميل', category: 'الأسرة', views: 340, answers: 0, isAnswered: false, author: 'خالد' },
]

const CATEGORIES = ['الكل', 'العقيدة', 'الصلاة', 'الزكاة', 'الصيام', 'المعاملات', 'الأسرة', 'الدعوة', 'الطب', 'المعاصر']

export default function QuestionsPage() {
  const [filter, setFilter] = useState('الكل')
  const [sort, setSort] = useState<'latest' | 'views' | 'answers'>('latest')
  const [showForm, setShowForm] = useState(false)
  const [newQ, setNewQ] = useState({ title: '', body: '', category: 'العقيدة' })

  const filtered = SAMPLE_QUESTIONS
    .filter(q => filter === 'الكل' || q.category === filter)
    .sort((a, b) => sort === 'views' ? b.views - a.views : sort === 'answers' ? b.answers - a.answers : b.id - a.id)

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      <div className="bg-hero-gradient py-16 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-arabic text-white text-5xl font-bold mb-4">الأسئلة والأجوبة</h1>
          <p className="text-gray-300 mb-6">اطرح سؤالك واحصل على إجابة من العلم الشرعي</p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-gold px-8 py-3 text-base"
          >
            ✏️ اطرح سؤالاً جديداً
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* New question form */}
        {showForm && (
          <div className="card-islamic p-8 mb-8">
            <h2 className="font-arabic text-xl font-bold text-islamic-green dark:text-gold-300 mb-6">سؤال جديد</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">عنوان السؤال</label>
                <input
                  value={newQ.title}
                  onChange={e => setNewQ(p => ({ ...p, title: e.target.value }))}
                  placeholder="اكتب سؤالك بإيجاز..."
                  className="search-input"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">التفاصيل</label>
                <textarea
                  value={newQ.body}
                  onChange={e => setNewQ(p => ({ ...p, body: e.target.value }))}
                  placeholder="اشرح سؤالك بالتفصيل..."
                  rows={4}
                  className="search-input resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">التصنيف</label>
                <select
                  value={newQ.category}
                  onChange={e => setNewQ(p => ({ ...p, category: e.target.value }))}
                  className="search-input"
                >
                  {CATEGORIES.filter(c => c !== 'الكل').map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex gap-3">
                <button className="btn-gold px-6 py-2 text-sm">إرسال السؤال</button>
                <button onClick={() => setShowForm(false)} className="btn-outline-gold px-6 py-2 text-sm">إلغاء</button>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${filter === cat ? 'bg-gold-400 text-islamic-navy font-bold' : 'bg-white dark:bg-gray-900 border border-gold-200 dark:border-gold-800/50 text-gray-600 dark:text-gray-300 hover:border-gold-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex gap-2 mb-6 text-sm">
          <span className="text-gray-400 self-center">ترتيب:</span>
          {[{ key: 'latest', label: 'الأحدث' }, { key: 'views', label: 'الأكثر مشاهدة' }, { key: 'answers', label: 'الأكثر إجابات' }].map(s => (
            <button
              key={s.key}
              onClick={() => setSort(s.key as any)}
              className={`px-3 py-1 rounded-lg transition-all ${sort === s.key ? 'bg-gold-400/20 text-gold-600 dark:text-gold-400 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Questions list */}
        <div className="space-y-4">
          {filtered.map(q => (
            <Link key={q.id} href={`/questions/${q.id}`} className="card-islamic p-6 block group hover:border-gold-400">
              <div className="flex items-start gap-4">
                <div className="text-center min-w-[60px]">
                  <div className={`text-2xl font-bold ${q.isAnswered ? 'text-green-500' : 'text-gray-300'}`}>{q.answers}</div>
                  <div className="text-xs text-gray-400">إجابة</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-xs bg-gold-100 dark:bg-gold-900/20 text-gold-700 dark:text-gold-400 px-2 py-0.5 rounded-full mt-0.5">{q.category}</span>
                    {q.isAnswered && <span className="text-xs text-green-600 dark:text-green-400 mt-0.5">✓ تمت الإجابة</span>}
                  </div>
                  <h3 className="font-arabic text-lg font-bold text-gray-900 dark:text-white group-hover:text-gold-500 dark:group-hover:text-gold-300 mb-2 transition-colors leading-normal">
                    {q.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{q.body}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <span>👤 {q.author}</span>
                    <span>👁 {q.views.toLocaleString('ar-SA')}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
