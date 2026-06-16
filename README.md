# الصراط المستقيم — منصة إسلامية شاملة

> منصة إسلامية متكاملة للقرآن الكريم والسنة النبوية والعلوم الإسلامية

## المشروع

مشروع Next.js 14 كامل (Full Stack) يشمل:
- ✅ القرآن الكريم (114 سورة + عرض الآيات والتفسير)
- ✅ الأحاديث النبوية (6 كتب — البخاري ومسلم والسنن)
- ✅ الأذكار والأدعية (حصن المسلم كاملاً + عداد تسبيح)
- ✅ قصص الأنبياء (25 نبي كاملاً)
- ✅ أسماء الله الحسنى (99 اسماً مع الشرح)
- ✅ مواقيت الصلاة
- ✅ المساعد الإسلامي الذكي "الرشيد" (Claude AI)
- ✅ البحث الشامل
- ✅ لوحة تحكم Admin Dashboard
- ✅ نظام مستخدمين كامل (Auth)
- ✅ Dark/Light Mode
- ✅ تصميم RTL عربي كامل

---

## متطلبات التشغيل

- Node.js 18+
- PostgreSQL 14+
- مفتاح Anthropic API (للمساعد الذكي)

---

## خطوات التثبيت

### 1. تثبيت الحزم
```bash
npm install
```

### 2. إعداد متغيرات البيئة
انسخ الملف وعدّل القيم:
```bash
cp .env.example .env
```

ثم عدّل `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/alsarat_db"
NEXTAUTH_SECRET="اكتب-مفتاحاً-عشوائياً-طويلاً-هنا"
NEXTAUTH_URL="http://localhost:3000"
ANTHROPIC_API_KEY="sk-ant-..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. إنشاء قاعدة البيانات
```bash
# إنشاء الجداول
npm run db:push

# أو باستخدام migration
npm run db:migrate

# تهيئة البيانات الأولية
npm run db:seed
```

### 4. تشغيل المشروع
```bash
npm run dev
```

افتح المتصفح على: http://localhost:3000

---

## بيانات الدخول الافتراضية

| البريد الإلكتروني | كلمة المرور | الصلاحيات |
|-------------------|-------------|-----------|
| admin@alsarat.com | admin123456 | Super Admin |

---

## بنية المشروع

```
alsarat-almustaqeem/
├── app/
│   ├── (main)/              # الصفحات العامة
│   │   ├── page.tsx         # الصفحة الرئيسية
│   │   ├── quran/           # القرآن الكريم
│   │   ├── hadith/          # الأحاديث النبوية
│   │   ├── adhkar/          # الأذكار والأدعية
│   │   ├── prophets/        # قصص الأنبياء
│   │   ├── asma-allah/      # أسماء الله الحسنى
│   │   ├── prayer-times/    # مواقيت الصلاة
│   │   ├── search/          # البحث الشامل
│   │   ├── ai/              # المساعد الذكي
│   │   └── profile/         # الملف الشخصي
│   ├── admin/               # لوحة التحكم
│   ├── auth/                # تسجيل الدخول والتسجيل
│   └── api/                 # API Routes
│       ├── ai/chat/         # المساعد الذكي API
│       └── auth/            # NextAuth + التسجيل
├── components/
│   ├── layout/              # Navbar + Footer
│   └── providers/           # Theme + Session
├── lib/
│   ├── prisma.ts            # Prisma Client
│   └── auth.ts              # NextAuth Config
├── prisma/
│   ├── schema.prisma        # Database Schema
│   └── seed.ts              # Initial Data
├── types/index.ts           # TypeScript Types
└── utils/index.ts           # Helper Functions
```

---

## الصفحات المتاحة

| الصفحة | المسار |
|--------|--------|
| الرئيسية | / |
| القرآن الكريم | /quran |
| سورة محددة | /quran/[id] |
| الأحاديث | /hadith |
| الأذكار | /adhkar |
| قصص الأنبياء | /prophets |
| أسماء الله | /asma-allah |
| مواقيت الصلاة | /prayer-times |
| البحث | /search |
| المساعد الذكي | /ai |
| تسجيل الدخول | /auth/login |
| إنشاء حساب | /auth/register |
| لوحة التحكم | /admin |

---

## النشر على Vercel

```bash
# تثبيت Vercel CLI
npm i -g vercel

# النشر
vercel --prod
```

أضف متغيرات البيئة في لوحة تحكم Vercel.

---

## إضافة المحتوى

### تحميل القرآن كاملاً
يمكنك تحميل بيانات القرآن من Quran.com API وإضافتها للسيد:

```bash
# مثال: جلب سورة الفاتحة
curl https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=1
```

### تحميل الأحاديث
استخدم HadithAPI.com للحصول على الأحاديث كاملة.

---

## التقنيات المستخدمة

| التقنية | الاستخدام |
|---------|-----------|
| Next.js 14 | Framework رئيسي |
| TypeScript | Type Safety |
| Tailwind CSS | التصميم |
| PostgreSQL | قاعدة البيانات |
| Prisma ORM | Database ORM |
| NextAuth.js | Authentication |
| Anthropic Claude | AI Assistant |
| Framer Motion | Animations |
| Zod | Validation |
| Sonner | Notifications |
