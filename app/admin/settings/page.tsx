import { prisma } from '@/lib/prisma'

async function getSettings() {
  try {
    const settings = await prisma.siteSettings.findMany()
    return Object.fromEntries(settings.map(s => [s.key, s.value]))
  } catch { return {} }
}

export default async function AdminSettingsPage() {
  const settings = await getSettings()

  const fields = [
    { key: 'site_name',        label: 'اسم الموقع',      value: settings['site_name'] || 'الصراط المستقيم' },
    { key: 'site_description', label: 'وصف الموقع',      value: settings['site_description'] || '' },
    { key: 'daily_ayah',       label: 'آية اليوم',        value: settings['daily_ayah'] || '' },
    { key: 'contact_email',    label: 'البريد للتواصل',   value: settings['contact_email'] || '' },
    { key: 'facebook_url',     label: 'رابط فيسبوك',     value: settings['facebook_url'] || '' },
    { key: 'twitter_url',      label: 'رابط تويتر',      value: settings['twitter_url'] || '' },
  ]

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="font-arabic text-2xl font-bold text-gray-800 dark:text-white">إعدادات الموقع</h2>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 space-y-5">
        {fields.map(field => (
          <div key={field.key}>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">{field.label}</label>
            {field.key === 'site_description' ? (
              <textarea
                defaultValue={field.value}
                rows={3}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-400 resize-none text-right"
              />
            ) : (
              <input
                defaultValue={field.value}
                type="text"
                dir={field.key.includes('url') || field.key === 'contact_email' ? 'ltr' : 'rtl'}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-400"
              />
            )}
          </div>
        ))}
        <button className="btn-gold px-8 py-2.5 text-sm">حفظ الإعدادات</button>
      </div>

      {/* Environment info */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="font-arabic text-lg font-bold text-gray-800 dark:text-white mb-4">معلومات النظام</h3>
        <div className="space-y-2 text-sm">
          {[
            { label: 'Node.js', value: process.version },
            { label: 'البيئة', value: process.env.NODE_ENV || 'development' },
            { label: 'قاعدة البيانات', value: process.env.DATABASE_URL ? 'متصلة ✓' : 'غير مهيأة ✗' },
            { label: 'Anthropic API', value: process.env.ANTHROPIC_API_KEY ? 'مهيأ ✓' : 'غير مهيأ ✗' },
          ].map(item => (
            <div key={item.label} className="flex justify-between py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
              <span className="text-gray-500">{item.label}</span>
              <span className="text-gray-700 dark:text-gray-300 font-mono text-xs">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
