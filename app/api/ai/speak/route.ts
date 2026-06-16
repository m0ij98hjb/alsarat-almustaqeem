import { NextRequest, NextResponse } from 'next/server'

// Male Arabic neural voices via Microsoft Edge TTS (no API key required)
const VOICE = 'ar-SA-HamedNeural' // Saudi Arabic — male, clear, natural

function truncateAtSentence(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text
  const cut = text.substring(0, maxLen)
  const lastBreak = Math.max(
    cut.lastIndexOf('.\n'),
    cut.lastIndexOf('،'),
    cut.lastIndexOf('.'),
    cut.lastIndexOf('\n'),
  )
  return lastBreak > maxLen * 0.6 ? cut.substring(0, lastBreak + 1) : cut
}

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('text')?.trim() ?? ''
  if (!raw) return NextResponse.json({ error: 'text required' }, { status: 400 })

  // Clean markdown symbols and emojis
  const text = truncateAtSentence(
    raw
      .replace(/[\u{1F300}-\u{1FFFF}]/gu, '')
      .replace(/[📖📜📿🕌✨🌟🤲🌙]/g, '')
      .replace(/\*\*/g, '')
      .replace(/#+\s/g, '')
      .replace(/\n+/g, ' ')
      .trim(),
    800,
  )

  if (!text) return NextResponse.json({ error: 'empty text' }, { status: 400 })

  try {
    // Dynamic import — msedge-tts uses Node.js WebSocket, must stay server-side
    const { MsEdgeTTS, OUTPUT_FORMAT } = await import('msedge-tts')

    const tts = new MsEdgeTTS()
    await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3)

    const chunks: Buffer[] = []
    const { audioStream } = tts.toStream(text)

    for await (const chunk of audioStream) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk as Uint8Array))
    }

    const audio = Buffer.concat(chunks)

    return new NextResponse(audio, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
        'Content-Length': String(audio.length),
      },
    })
  } catch (err) {
    console.error('Edge TTS error:', err)
    return NextResponse.json({ error: 'tts_unavailable' }, { status: 503 })
  }
}
