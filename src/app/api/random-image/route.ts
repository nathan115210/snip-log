import { NextResponse } from "next/server";

export async function GET() {
  const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
  //const url = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}`;
  const url = `https://api.unsplash.com/photos/random?query=nature&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch Unsplash image");

    const data = await res.json();

    // Modify the image URL to have a fixed width & height
    const imageUrl = `${data.urls.raw}&w=600&h=400&fit=crop`;
    return NextResponse.json({ imageUrl });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Unsplash API error:", error.message);
    } else {
      console.error("Unsplash API error:", error);
    }
    console.log("Using fallback image");

    // Fallback to Lorem Picsum
    const fallbackImageUrl = `https://picsum.photos/600/400?random=${Math.random()}`;
    return NextResponse.json({ imageUrl: fallbackImageUrl });
  }
}