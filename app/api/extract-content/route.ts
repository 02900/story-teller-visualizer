import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: Request) {
  try {
    const { url, elementId } = await request.json();

    const response = await fetch(url);
    const html = await response.text();
    
    const $ = cheerio.load(html);
    let content = $(`#${elementId}`).html() || '';
    
    // Replace <br> tags with newlines
    content = content.replace(/<br\s*\/?>/gi, '\n');
    
    // Replace closing paragraph tags with double newlines
    content = content.replace(/<\/p>/gi, '\n\n');
    
    // Clean the HTML content while preserving line breaks
    const cleanContent = content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      // Convert multiple consecutive newlines to a maximum of two
      .replace(/\n{3,}/g, '\n\n')
      // Trim whitespace while preserving internal line breaks
      .split('\n')
      .map(line => line.trim())
      .join('\n')
      .trim();

    return NextResponse.json({ content: cleanContent });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to extract content' },
      { status: 500 }
    );
  }
}
