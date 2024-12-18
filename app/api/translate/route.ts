import { NextResponse } from "next/server";

const GOOGLE_TRANSLATE_API =
  "https://translate.googleapis.com/translate_a/single";

export async function POST(request: Request) {
  try {
    const { text, targetLang } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const url = `${GOOGLE_TRANSLATE_API}?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
      text
    )}`;
    const response = await fetch(url);
    const data = await response.json();

    // Google Translate API returns data in segments
    // We need to concatenate all segments to get the complete translation
    const translatedText = data[0]
      .map((segment: any) => segment[0])
      .join("")
      .trim();

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Failed to translate text" },
      { status: 500 }
    );
  }
}
