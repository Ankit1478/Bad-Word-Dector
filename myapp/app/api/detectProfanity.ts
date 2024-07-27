import { NextRequest, NextResponse } from 'next/server';
import { detectProfanity } from '../../utils/profanityDetector';

export async function POST(req: NextRequest) {
    const { text, language } = await req.json();

    if (!text || !language) {
        return NextResponse.json({ error: 'Text and language are required' }, { status: 400 });
    }

    const hasProfanity = detectProfanity(text, language);
    return NextResponse.json({ hasProfanity });
}