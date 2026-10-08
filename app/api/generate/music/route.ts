import { NextResponse } from "next/server";
import {
  OpenSourceMusicEngineAdapter,
  type MusicGenerationRequest,
} from "@/lib/ai/music-engine";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const title =
      typeof body?.title === "string" ? body.title.trim() : "";

    const lyrics =
      typeof body?.lyrics === "string" ? body.lyrics.trim() : "";

    const language =
      typeof body?.language === "string" ? body.language : "Telugu";

    const genre =
      typeof body?.genre === "string" ? body.genre : "Melody";

    const vocal =
      typeof body?.vocal === "string" ? body.vocal : "Auto";

    const bpm =
      typeof body?.bpm === "number" ? body.bpm : undefined;

    const key =
      typeof body?.key === "string" && body.key !== "Auto"
        ? body.key
        : undefined;

    const instrumental =
      body?.instrumental === true;

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          error: "Song title is required.",
        },
        { status: 400 }
      );
    }

    if (!instrumental && !lyrics) {
      return NextResponse.json(
        {
          success: false,
          error: "Lyrics are required unless Instrumental Only is enabled.",
        },
        { status: 400 }
      );
    }

    const generationRequest: MusicGenerationRequest = {
      title,
      lyrics,
      language,
      genre,
      vocal,
      bpm,
      key,
    };

    const engine = new OpenSourceMusicEngineAdapter();

    const result = await engine.generate(generationRequest);

    return NextResponse.json(
      {
        success: true,
        message: "Song generation started.",
        job: result,
      },
      { status: 202 }
    );
  } catch (error) {
    console.error("Music generation error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Music generation failed.";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 503 }
    );
  }
}
