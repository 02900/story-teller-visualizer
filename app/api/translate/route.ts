import { NextResponse } from 'next/server';

const MYMEMORY_TRANSLATE_API = 'https://api.mymemory.translated.net/get';

export async function POST(request: Request) {
  try {
    const { text, targetLang } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const url = `${MYMEMORY_TRANSLATE_API}?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.responseStatus !== 200) {
      throw new Error(data.responseDetails || 'Translation failed');
    }

    return NextResponse.json({
      translatedText: data.responseData.translatedText,
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Failed to translate text' },
      { status: 500 }
    );
  }
}
