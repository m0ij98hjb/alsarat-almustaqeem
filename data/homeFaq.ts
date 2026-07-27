export interface HomeFaqItem {
  id: string
  questionAr: string
  questionEn: string
  answerAr: string
  answerEn: string
}

export const homeFaq: HomeFaqItem[] = [
  {
    id: 'what-is-islam',
    questionAr: 'ما هو الإسلام؟',
    questionEn: 'What is Islam?',
    answerAr:
      'الإسلام دين التوحيد، معناه الاستسلام لله رب العالمين وحده، أُنزل على النبي محمد ﷺ خاتماً للرسالات السماوية. يقوم على خمسة أركان: الشهادتان، والصلاة، والزكاة، والصيام، والحج لمن استطاع، ويدعو إلى العدل والرحمة وحسن الخلق مع كل الناس.',
    answerEn:
      'Islam is the religion of submission to the One God (Allah), revealed through Prophet Muhammad ﷺ as the final message. It rests on five pillars — the declaration of faith, prayer, charity, fasting, and pilgrimage for those able — and calls to justice, mercy, and good character toward all people.',
  },
  {
    id: 'who-is-allah',
    questionAr: 'من هو الله؟',
    questionEn: 'Who is Allah?',
    answerAr:
      'الله هو الاسم العربي للخالق الواحد الأحد، لا شريك له ولا ولد، خالق كل شيء ورازقه ومدبره. له تسعة وتسعون اسماً حسنى تصف كماله ورحمته وعلمه وقدرته، وهو أقرب إلى الإنسان من حبل الوريد.',
    answerEn:
      'Allah is the Arabic name of the One True God — the Creator, Sustainer, and Sovereign of everything, without partner or offspring. He has 99 Most Beautiful Names describing His mercy, knowledge, and power, and He is described in the Quran as closer to a person than their jugular vein.',
  },
  {
    id: 'why-muslims-pray',
    questionAr: 'لماذا يصلي المسلمون؟',
    questionEn: 'Why do Muslims pray?',
    answerAr:
      'الصلاة هي الركن الثاني من أركان الإسلام، يؤديها المسلم خمس مرات يومياً للتواصل مع الله وشكره وطلب العون منه، وهي تذكير متكرر بالغاية من الحياة وتطهير للقلب من الغفلة على مدار اليوم.',
    answerEn:
      'Prayer (Salah) is the second pillar of Islam, performed five times a day to stay connected with Allah, express gratitude, and seek His help. It is a recurring reminder of life\'s purpose and a way to keep the heart mindful throughout the day.',
  },
  {
    id: 'what-is-ramadan',
    questionAr: 'ما هو رمضان؟',
    questionEn: 'What is Ramadan?',
    answerAr:
      'رمضان هو الشهر التاسع في التقويم الهجري، وفيه يصوم المسلمون من الفجر إلى غروب الشمس امتناعاً عن الطعام والشراب، وهو شهر تزكية للنفس وإكثار من العبادة والصدقة، وفيه أُنزل القرآن الكريم أول مرة.',
    answerEn:
      'Ramadan is the ninth month of the Islamic lunar calendar, during which Muslims fast from dawn until sunset. It is a month of spiritual growth, increased worship and charity, and it marks when the Quran was first revealed.',
  },
  {
    id: 'what-is-hajj',
    questionAr: 'ما هو الحج؟',
    questionEn: 'What is Hajj?',
    answerAr:
      'الحج هو الركن الخامس من أركان الإسلام، رحلة سنوية إلى مكة المكرمة واجبة مرة واحدة في العمر على القادر مالياً وبدنياً، تؤدى في شهر ذي الحجة، ويجتمع فيها المسلمون من كل أنحاء العالم في عبادة واحدة.',
    answerEn:
      'Hajj is the fifth pillar of Islam — an annual pilgrimage to Makkah, obligatory once in a lifetime for those who are physically and financially able. Performed in the month of Dhul-Hijjah, it brings Muslims from around the world together in a single act of worship.',
  },
  {
    id: 'jesus-in-islam',
    questionAr: 'من هو عيسى عليه السلام في الإسلام؟',
    questionEn: 'Who is Jesus (Isa) in Islam?',
    answerAr:
      'عيسى عليه السلام نبي ورسول كريم من أولي العزم من الرسل، وُلد بمعجزة من أمه مريم العذراء دون أب، وأيّده الله بمعجزات عظيمة. يؤمن المسلمون بنبوته ولا يعتقدون بألوهيته أو أنه ابن الله، ويؤمنون أنه سيعود قبل قيام الساعة.',
    answerEn:
      'Isa (Jesus), peace be upon him, is one of the greatest prophets in Islam, born miraculously to the Virgin Mary (Maryam) without a father, and supported by God with great miracles. Muslims believe in his prophethood but not his divinity, and believe he will return before the Day of Judgment.',
  },
]
