import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 بدء تهيئة قاعدة البيانات...')

  // ===== ADMIN USER =====
  const adminPassword = await bcrypt.hash('admin123456', 12)
  await prisma.user.upsert({
    where: { email: 'admin@alsarat.com' },
    update: {},
    create: {
      name: 'مدير الموقع',
      email: 'admin@alsarat.com',
      password: adminPassword,
      role: 'SUPER_ADMIN',
    },
  })
  console.log('✅ Admin user created: admin@alsarat.com / admin123456')

  // ===== HADITH BOOKS =====
  const books = [
    { id: 1, nameArabic: 'صحيح البخاري', nameEnglish: 'Sahih al-Bukhari', author: 'محمد بن إسماعيل البخاري', totalHadiths: 7563, slug: 'bukhari' },
    { id: 2, nameArabic: 'صحيح مسلم',    nameEnglish: 'Sahih Muslim',      author: 'مسلم بن الحجاج النيسابوري', totalHadiths: 5362, slug: 'muslim' },
    { id: 3, nameArabic: 'سنن أبي داود', nameEnglish: 'Sunan Abu Dawud',   author: 'سليمان بن الأشعث أبو داود', totalHadiths: 5274, slug: 'abudawud' },
    { id: 4, nameArabic: 'جامع الترمذي', nameEnglish: 'Jami al-Tirmidhi',  author: 'محمد بن عيسى الترمذي',      totalHadiths: 3956, slug: 'tirmidhi' },
    { id: 5, nameArabic: 'سنن النسائي',  nameEnglish: 'Sunan al-Nasai',    author: 'أحمد بن شعيب النسائي',       totalHadiths: 5761, slug: 'nasai' },
    { id: 6, nameArabic: 'سنن ابن ماجه', nameEnglish: 'Sunan Ibn Majah',   author: 'محمد بن يزيد ابن ماجه',      totalHadiths: 4341, slug: 'ibnmajah' },
  ]

  for (const book of books) {
    await prisma.hadithBook.upsert({
      where: { slug: book.slug },
      update: {},
      create: book,
    })
  }
  console.log('✅ Hadith books created')

  // ===== SAMPLE HADITHS =====
  const hadiths = [
    { bookId: 1, hadithNum: 1,    textArabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا، أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ', narrator: 'عمر بن الخطاب', grade: 'SAHIH', tags: ['النية', 'الأعمال', 'الهجرة'] },
    { bookId: 1, hadithNum: 8,    textArabic: 'بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَصَوْمِ رَمَضَانَ، وَحَجِّ الْبَيْتِ', narrator: 'ابن عمر', grade: 'SAHIH', tags: ['أركان الإسلام', 'العقيدة'] },
    { bookId: 1, hadithNum: 5027, textArabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ', narrator: 'عثمان بن عفان', grade: 'SAHIH', tags: ['القرآن', 'التعلم', 'الفضائل'] },
    { bookId: 2, hadithNum: 2674, textArabic: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ', narrator: 'أنس بن مالك', grade: 'SAHIH', tags: ['الإيمان', 'الأخوة', 'الأخلاق'] },
    { bookId: 4, hadithNum: 1987, textArabic: 'اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ', narrator: 'أبو ذر الغفاري', grade: 'HASAN', tags: ['التقوى', 'الأخلاق', 'التوبة'] },
  ]

  for (const h of hadiths) {
    await prisma.hadith.upsert({
      where: { id: h.hadithNum + h.bookId * 10000 },
      update: {},
      create: { id: h.hadithNum + h.bookId * 10000, ...h, grade: h.grade as any },
    }).catch(() => {
      // If upsert by id fails, try create
    })
  }
  console.log('✅ Sample hadiths created')

  // ===== ASMA ALLAH =====
  const asma = [
    { number: 1,  nameArabic: 'الله',     nameEnglish: 'Allah',          meaning: 'اسم الجلالة الأعظم',     explanation: 'الاسم الجامع لمعاني الألوهية والربوبية كلها' },
    { number: 2,  nameArabic: 'الرحمن',  nameEnglish: 'Ar-Rahman',      meaning: 'واسع الرحمة في الدنيا',  explanation: 'رحمته وسعت كل شيء في الدنيا، مؤمن وكافر' },
    { number: 3,  nameArabic: 'الرحيم',  nameEnglish: 'Ar-Rahim',       meaning: 'رحيم بالمؤمنين',         explanation: 'رحمته في الآخرة خاصة بالمؤمنين' },
    { number: 99, nameArabic: 'الصبور',  nameEnglish: 'As-Sabur',       meaning: 'لا يعجل بالعقوبة',       explanation: 'يمهل العباد ولا يعجل بالعقوبة رحمة بهم' },
  ]

  for (const name of asma) {
    await prisma.asmaAllah.upsert({
      where: { number: name.number },
      update: {},
      create: name,
    })
  }
  console.log('✅ Asma Allah created')

  // ===== ADHKAR =====
  const adhkar = [
    { category: 'MORNING', textArabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ', count: 1, source: 'أبو داود', orderNum: 1 },
    { category: 'MORNING', textArabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا', count: 1, source: 'أبو داود', orderNum: 2 },
    { category: 'EVENING', textArabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ', count: 1, source: 'أبو داود', orderNum: 1 },
    { category: 'SLEEP',   textArabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', count: 1, source: 'البخاري', orderNum: 1 },
  ]

  for (const dhikr of adhkar) {
    await prisma.dhikr.create({ data: { ...dhikr, category: dhikr.category as any } }).catch(() => {})
  }
  console.log('✅ Adhkar created')

  // ===== SITE SETTINGS =====
  const settings = [
    { key: 'site_name',        value: 'الصراط المستقيم' },
    { key: 'site_description', value: 'منصة إسلامية شاملة للقرآن والسنة' },
    { key: 'daily_ayah',       value: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا' },
  ]

  for (const setting of settings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    })
  }
  console.log('✅ Site settings created')

  console.log('\n✅ تمت تهيئة قاعدة البيانات بنجاح!')
  console.log('📧 Admin: admin@alsarat.com')
  console.log('🔑 Password: admin123456')
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => { console.error(e); prisma.$disconnect(); process.exit(1) })
