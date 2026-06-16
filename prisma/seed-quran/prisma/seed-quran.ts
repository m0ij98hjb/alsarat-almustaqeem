import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const SURAHS_META = [
  [1,'الفاتحة','Al-Fatihah','Al-Faatiha','Meccan',7,5,1,1,2,1],
  [2,'البقرة','Al-Baqarah','Al-Baqara','Medinan',286,87,2,1,40,42],
  [3,'آل عمران','Ali \'Imran','Aal-i-Imraan','Medinan',200,89,3,2,20,32],
  [4,'النساء','An-Nisa','An-Nisaa','Medinan',176,92,4,4,24,29],
  [5,'المائدة','Al-Ma\'idah','Al-Maaida','Medinan',120,112,5,6,16,20],
  [6,'الأنعام','Al-An\'am','Al-An\'aam','Meccan',165,55,6,7,20,36],
  [7,'الأعراف','Al-A\'raf','Al-A\'raaf','Meccan',206,39,7,8,24,49],
  [8,'الأنفال','Al-Anfal','Al-Anfaal','Medinan',75,88,9,9,10,10],
  [9,'التوبة','At-Tawbah','At-Tawba','Medinan',129,113,10,10,16,27],
  [10,'يونس','Yunus','Yunus','Meccan',109,51,11,11,11,18],
  [11,'هود','Hud','Hud','Meccan',123,52,12,11,10,23],
  [12,'يوسف','Yusuf','Yusuf','Meccan',111,53,13,12,12,20],
  [13,'الرعد','Ar-Ra\'d','Ar-Ra\'d','Medinan',43,96,14,13,6,6],
  [14,'إبراهيم','Ibrahim','Ibrahim','Meccan',52,72,15,13,7,7],
  [15,'الحجر','Al-Hijr','Al-Hijr','Meccan',99,54,16,14,6,16],
  [16,'النحل','An-Nahl','An-Nahl','Meccan',128,70,17,14,16,22],
  [17,'الإسراء','Al-Isra','Al-Israa','Meccan',111,50,18,15,12,21],
  [18,'الكهف','Al-Kahf','Al-Kahf','Meccan',110,69,19,15,12,16],
  [19,'مريم','Maryam','Maryam','Meccan',98,44,20,16,6,16],
  [20,'طه','Ta-Ha','Taa-Haa','Meccan',135,45,21,16,8,20],
  [21,'الأنبياء','Al-Anbya','Al-Anbiyaa','Meccan',112,73,22,17,7,17],
  [22,'الحج','Al-Hajj','Al-Hajj','Medinan',78,103,23,17,10,12],
  [23,'المؤمنون','Al-Mu\'minun','Al-Muminoon','Meccan',118,74,24,18,6,18],
  [24,'النور','An-Nur','An-Noor','Medinan',64,102,25,18,9,9],
  [25,'الفرقان','Al-Furqan','Al-Furqaan','Meccan',77,42,26,18,6,12],
  [26,'الشعراء','Ash-Shu\'ara','Ash-Shu\'araa','Meccan',227,47,27,19,11,47],
  [27,'النمل','An-Naml','An-Naml','Meccan',93,48,28,19,7,15],
  [28,'القصص','Al-Qasas','Al-Qasas','Meccan',88,49,29,20,9,14],
  [29,'العنكبوت','Al-\'Ankabut','Al-\'Ankaboot','Meccan',69,85,30,20,7,7],
  [30,'الروم','Ar-Rum','Ar-Room','Meccan',60,84,31,21,6,6],
  [31,'لقمان','Luqman','Luqman','Meccan',34,57,32,21,4,4],
  [32,'السجدة','As-Sajdah','As-Sajda','Meccan',30,75,33,21,3,4],
  [33,'الأحزاب','Al-Ahzab','Al-Ahzaab','Medinan',73,90,34,21,9,9],
  [34,'سبأ','Saba\'','Saba','Meccan',54,58,35,22,6,6],
  [35,'فاطر','Fatir','Faatir','Meccan',45,43,36,22,5,5],
  [36,'يس','Ya-Sin','Yaseen','Meccan',83,41,37,22,5,8],
  [37,'الصافات','As-Saffat','As-Saaffaat','Meccan',182,56,38,23,5,23],
  [38,'ص','Sad','Saad','Meccan',88,38,39,23,5,9],
  [39,'الزمر','Az-Zumar','Az-Zumar','Meccan',75,59,40,23,8,8],
  [40,'غافر','Ghafir','Ghaafir','Meccan',85,60,41,24,9,9],
  [41,'فصلت','Fussilat','Fussilat','Meccan',54,61,42,24,6,6],
  [42,'الشورى','Ash-Shuraa','Ash-Shoora','Meccan',53,62,43,25,5,5],
  [43,'الزخرف','Az-Zukhruf','Az-Zukhruf','Meccan',89,63,44,25,7,7],
  [44,'الدخان','Ad-Dukhan','Ad-Dukhaan','Meccan',59,64,45,25,3,6],
  [45,'الجاثية','Al-Jathiyah','Al-Jaathiya','Meccan',37,65,46,25,4,4],
  [46,'الأحقاف','Al-Ahqaf','Al-Ahqaaf','Meccan',35,66,47,26,4,4],
  [47,'محمد','Muhammad','Muhammad','Medinan',38,95,48,26,4,4],
  [48,'الفتح','Al-Fath','Al-Fath','Medinan',29,111,49,26,4,4],
  [49,'الحجرات','Al-Hujurat','Al-Hujuraat','Medinan',18,106,50,26,2,2],
  [50,'ق','Qaf','Qaaf','Meccan',45,34,51,26,3,3],
  [51,'الذاريات','Adh-Dhariyat','Adh-Dhaariyat','Meccan',60,67,52,26,3,3],
  [52,'الطور','At-Tur','At-Toor','Meccan',49,76,53,27,2,2],
  [53,'النجم','An-Najm','An-Najm','Meccan',62,23,54,27,3,3],
  [54,'القمر','Al-Qamar','Al-Qamar','Meccan',55,37,55,27,3,3],
  [55,'الرحمن','Ar-Rahman','Ar-Rahmaan','Medinan',78,97,56,27,3,3],
  [56,'الواقعة','Al-Waqi\'ah','Al-Waqi\'a','Meccan',96,46,57,27,3,3],
  [57,'الحديد','Al-Hadid','Al-Hadid','Medinan',29,94,58,27,4,4],
  [58,'المجادلة','Al-Mujadila','Al-Mujaadila','Medinan',22,105,59,28,3,3],
  [59,'الحشر','Al-Hashr','Al-Hashr','Medinan',24,101,60,28,3,3],
  [60,'الممتحنة','Al-Mumtahanah','Al-Mumtahana','Medinan',13,91,61,28,2,2],
  [61,'الصف','As-Saf','As-Saff','Medinan',14,109,62,28,2,2],
  [62,'الجمعة','Al-Jumu\'ah','Al-Jumu\'a','Medinan',11,110,63,28,2,2],
  [63,'المنافقون','Al-Munafiqun','Al-Munaafiqoon','Medinan',11,104,64,28,2,2],
  [64,'التغابن','At-Taghabun','At-Taghaabun','Medinan',18,108,65,28,2,2],
  [65,'الطلاق','At-Talaq','At-Talaaq','Medinan',12,99,66,28,2,2],
  [66,'التحريم','At-Tahrim','At-Tahrim','Medinan',12,107,67,28,2,2],
  [67,'الملك','Al-Mulk','Al-Mulk','Meccan',30,77,68,29,2,2],
  [68,'القلم','Al-Qalam','Al-Qalam','Meccan',52,2,69,29,2,2],
  [69,'الحاقة','Al-Haqqah','Al-Haaqqa','Meccan',52,78,70,29,2,2],
  [70,'المعارج','Al-Ma\'arij','Al-Ma\'aarij','Meccan',44,79,71,29,2,2],
  [71,'نوح','Nuh','Nooh','Meccan',28,71,72,29,2,2],
  [72,'الجن','Al-Jinn','Al-Jinn','Meccan',28,40,73,29,2,2],
  [73,'المزمل','Al-Muzzammil','Al-Muzzammil','Meccan',20,3,74,29,2,2],
  [74,'المدثر','Al-Muddaththir','Al-Muddaththir','Meccan',56,4,75,29,2,2],
  [75,'القيامة','Al-Qiyamah','Al-Qiyaama','Meccan',40,31,76,29,2,2],
  [76,'الإنسان','Al-Insan','Al-Insaan','Medinan',31,98,77,29,2,2],
  [77,'المرسلات','Al-Mursalat','Al-Mursalaat','Meccan',50,33,78,29,2,2],
  [78,'النبأ','An-Naba\'','An-Naba','Meccan',40,80,79,30,2,2],
  [79,'النازعات','An-Nazi\'at','An-Naazi\'aat','Meccan',46,81,80,30,2,2],
  [80,'عبس','Abasa','Abasa','Meccan',42,24,81,30,1,1],
  [81,'التكوير','At-Takwir','At-Takwir','Meccan',29,7,82,30,1,1],
  [82,'الانفطار','Al-Infitar','Al-Infitaar','Meccan',19,82,83,30,1,1],
  [83,'المطففين','Al-Mutaffifin','Al-Mutaffifeen','Meccan',36,86,84,30,1,1],
  [84,'الانشقاق','Al-Inshiqaq','Al-Inshiqaaq','Meccan',25,83,85,30,1,1],
  [85,'البروج','Al-Buruj','Al-Burooj','Meccan',22,27,86,30,1,1],
  [86,'الطارق','At-Tariq','At-Taariq','Meccan',17,36,87,30,1,1],
  [87,'الأعلى','Al-A\'la','Al-A\'laa','Meccan',19,8,88,30,1,1],
  [88,'الغاشية','Al-Ghashiyah','Al-Ghaashiya','Meccan',26,68,89,30,1,1],
  [89,'الفجر','Al-Fajr','Al-Fajr','Meccan',30,10,90,30,1,1],
  [90,'البلد','Al-Balad','Al-Balad','Meccan',20,35,91,30,1,1],
  [91,'الشمس','Ash-Shams','Ash-Shams','Meccan',15,26,92,30,1,1],
  [92,'الليل','Al-Layl','Al-Layl','Meccan',21,9,93,30,1,1],
  [93,'الضحى','Ad-Duha','Ad-Dhuhaa','Meccan',11,11,94,30,1,1],
  [94,'الشرح','Ash-Sharh','Ash-Sharh','Meccan',8,12,95,30,1,1],
  [95,'التين','At-Tin','At-Tin','Meccan',8,28,96,30,1,1],
  [96,'العلق','Al-\'Alaq','Al-\'Alaq','Meccan',19,1,97,30,1,1],
  [97,'القدر','Al-Qadr','Al-Qadr','Meccan',5,25,98,30,1,1],
  [98,'البينة','Al-Bayyinah','Al-Bayyina','Medinan',8,100,99,30,1,1],
  [99,'الزلزلة','Az-Zalzalah','Az-Zalzala','Medinan',8,93,100,30,1,1],
  [100,'العاديات','Al-\'Adiyat','Al-\'Aadiyaat','Meccan',11,14,101,30,1,1],
  [101,'القارعة','Al-Qari\'ah','Al-Qaari\'a','Meccan',11,30,102,30,1,1],
  [102,'التكاثر','At-Takathur','At-Takaathur','Meccan',8,16,103,30,1,1],
  [103,'العصر','Al-\'Asr','Al-\'Asr','Meccan',3,13,104,30,1,1],
  [104,'الهمزة','Al-Humazah','Al-Humaza','Meccan',9,32,105,30,1,1],
  [105,'الفيل','Al-Fil','Al-Feel','Meccan',5,19,106,30,1,1],
  [106,'قريش','Quraysh','Quraysh','Meccan',4,29,107,30,1,1],
  [107,'الماعون','Al-Ma\'un','Al-Maa\'oon','Meccan',7,17,108,30,1,1],
  [108,'الكوثر','Al-Kawthar','Al-Kawthar','Meccan',3,15,109,30,1,1],
  [109,'الكافرون','Al-Kafirun','Al-Kaafiroon','Meccan',6,18,110,30,1,1],
  [110,'النصر','An-Nasr','An-Nasr','Medinan',3,114,111,30,1,1],
  [111,'المسد','Al-Masad','Al-Masad','Meccan',5,6,112,30,1,1],
  [112,'الإخلاص','Al-Ikhlas','Al-Ikhlaas','Meccan',4,22,113,30,1,1],
  [113,'الفلق','Al-Falaq','Al-Falaq','Meccan',5,20,114,30,1,1],
  [114,'الناس','An-Nas','An-Naas','Meccan',6,21,115,30,1,1],
]

async function fetchWithRetry(url: string, retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return await res.json()
    } catch (e) {
      if (i === retries - 1) throw e
      await new Promise(r => setTimeout(r, 2000 * (i + 1)))
    }
  }
}

async function main() {
  console.log('📖 بدء تحميل القرآن الكريم كاملاً...\n')

  // 1. Seed all surahs metadata
  console.log('📚 إضافة بيانات السور...')
  for (const s of SURAHS_META) {
    await prisma.surah.upsert({
      where: { id: s[0] as number },
      update: {},
      create: {
        id: s[0] as number,
        nameArabic: s[1] as string,
        nameEnglish: s[2] as string,
        namePronunciation: s[3] as string,
        revelation: s[4] as string,
        ayahCount: s[5] as number,
        orderRevealed: s[6] as number,
        page: s[7] as number,
        juz: s[8] as number,
        ruku: s[9] as number,
      },
    })
  }
  console.log('✅ تمت إضافة 114 سورة\n')

  // 2. Fetch ayahs from Quran.com API
  console.log('⬇️  جلب الآيات من Quran.com API...')
  let totalAyahs = 0
  let globalAyahNum = 0

  for (const surah of SURAHS_META) {
    const surahId = surah[0] as number
    const ayahCount = surah[5] as number

    process.stdout.write(`  سورة ${surahId}: ${surah[1]}... `)

    try {
      const data = await fetchWithRetry(
        `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}`
      )

      const verses = data.verses || []

      for (let i = 0; i < verses.length; i++) {
        globalAyahNum++
        const verse = verses[i]
        const ayahNum = i + 1

        await prisma.ayah.upsert({
          where: { surahId_numberInSurah: { surahId, numberInSurah: ayahNum } },
          update: { textUthmani: verse.text_uthmani, textSimple: verse.text_uthmani },
          create: {
            surahId,
            numberInSurah: ayahNum,
            numberInQuran: globalAyahNum,
            textArabic: verse.text_uthmani,
            textSimple: verse.text_uthmani,
            textUthmani: verse.text_uthmani,
            page: Math.ceil(globalAyahNum / 15),
            juz: Math.ceil(globalAyahNum / 213),
            hizb: Math.ceil(globalAyahNum / 60),
            ruku: 1,
            manzil: Math.ceil(globalAyahNum / 890),
          },
        })
      }

      totalAyahs += verses.length
      console.log(`✅ (${verses.length} آية)`)

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 300))

    } catch (err: any) {
      console.log(`⚠️  خطأ: ${err.message}`)
    }
  }

  console.log(`\n✅ تم تحميل ${totalAyahs} آية من أصل 6236`)
  console.log('\n🎉 اكتمل تحميل القرآن الكريم!')
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => { console.error(e); prisma.$disconnect(); process.exit(1) })
