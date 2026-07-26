export type VideoCategory = 'aqeedah' | 'fiqh' | 'seerah' | 'dawah' | 'tazkiyah'

export interface FeaturedVideo {
  id: string
  title: string
  sheikhName: string
  channelId: string
  channelName: string
  category: VideoCategory
  language: 'ar' | 'en'
}

// Every entry below was verified directly against the scholar's own
// official YouTube channel (matching author_url via YouTube's oEmbed API)
// before being added — never a fan page or reposted copy.
export const featuredVideos: FeaturedVideo[] = [
  {
    id: 'Q1JLQN0_8SU',
    title: 'درس الحرم | مختصر صحيح البخاري: كتاب الهبة وفضلها والتحريض عليها',
    sheikhName: 'الشيخ سعد الشثري',
    channelId: 'UCxSmY7MCVENdNUmsedKOtcQ',
    channelName: 'القناة الرسمية لمعالي الشيخ سعد الشثري',
    category: 'fiqh',
    language: 'ar',
  },
  {
    id: 'lVTQ2Bsn9ME',
    title: 'Reliable Website to Learn Your Islam From',
    sheikhName: 'Assim Al Hakeem',
    channelId: 'UCWsdcrre0WbCWML_PnuzoAg',
    channelName: 'assimalhakeem',
    category: 'dawah',
    language: 'en',
  },
  {
    id: '8dIOrWFM4zI',
    title: 'Misconceptions about Islam - Part 1',
    sheikhName: 'Dr. Zakir Naik',
    channelId: 'UC3YmP7nqf514I1zh1eVbzrA',
    channelName: 'Dr Zakir Naik',
    category: 'dawah',
    language: 'en',
  },
  {
    id: 'CfB1UJuxTF4',
    title: 'Why Does Allah Abrogate Verses? | Memorize Surah al-Baqarah, Page 16/48',
    sheikhName: 'Omar Suleiman',
    channelId: 'UCtm8rtofLSnaIBi3noB0INg',
    channelName: 'Omar Suleiman Personal',
    category: 'tazkiyah',
    language: 'en',
  },
  {
    id: 'fYSZNhGIR6E',
    title: 'From Darkness to Light',
    sheikhName: 'Dr. Bilal Philips',
    channelId: 'UCk1-R7Mmzd7iikof378dcuA',
    channelName: 'Bilal Philips',
    category: 'dawah',
    language: 'en',
  },
  // TODO: add new video here
]
