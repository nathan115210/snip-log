import { NextResponse } from "next/server";

export async function GET() {
  //const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

  // Generate a random image URL (600x400 size)
  const imageUrl = `https://picsum.photos/600/400?random=${Math.random()}`;

  return NextResponse.json({ imageUrl });
}
