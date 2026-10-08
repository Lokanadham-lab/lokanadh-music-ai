export type MusicGenerationRequest = {
  title: string;
  lyrics: string;
  language: string;
  genre: string;
  vocal: string;

  bpm?: number;
  key?: string;
  scale?: string;

  emotion?: string;
  energy?: number;
  duration?: number;

  singerSkill?: number;
  melodyLock?: number;
  referenceStrength?: number;

  pronunciation?: boolean;
  instrumental?: boolean;

  referenceFileName?: string | null;
};

export type MusicGenerationResult = {
  jobId: string;
  status:
    | "queued"
    | "processing"
    | "completed"
    | "failed";

  audioUrl?: string;
  message?: string;
};

export interface MusicEngine {
  generate(
    request: MusicGenerationRequest
  ): Promise<MusicGenerationResult>;
}

/**
 * Remote AI Music Engine Adapter
 *
 * Next.js / Vercel server
 *        ↓
 * Remote GPU Music Engine
 *        ↓
 * ACE-Step / compatible model
 *
 * The actual GPU engine URL is supplied through:
 *
 * MUSIC_ENGINE_URL
 * MUSIC_ENGINE_API_KEY
 */

export class OpenSourceMusicEngineAdapter
  implements MusicEngine
{
  private readonly engineUrl: string;
  private readonly apiKey: string | undefined;

  constructor() {
    this.engineUrl =
      process.env.MUSIC_ENGINE_URL?.trim() || "";

    this.apiKey =
      process.env.MUSIC_ENGINE_API_KEY?.trim() || undefined;
  }

  async generate(
    request: MusicGenerationRequest
  ): Promise<MusicGenerationResult> {
    if (!this.engineUrl) {
      throw new Error(
        "AI music engine is not configured. Set MUSIC_ENGINE_URL in the server environment."
      );
    }

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 120000);

    try {
      const response = await fetch(
        `${this.engineUrl.replace(/\/$/, "")}/generate`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            ...(this.apiKey
              ? {
                  Authorization: `Bearer ${this.apiKey}`,
                }
              : {}),
          },

          body: JSON.stringify({
            title: request.title,
            lyrics: request.lyrics,

            language: request.language,
            genre: request.genre,
            vocal: request.vocal,

            bpm: request.bpm,
            key: request.key,
            scale: request.scale,

            emotion: request.emotion,
            energy: request.energy,
            duration: request.duration,

            singerSkill: request.singerSkill,

            melodyLock: request.melodyLock,
            referenceStrength:
              request.referenceStrength,

            pronunciation:
              request.pronunciation,

            instrumental:
              request.instrumental,

            referenceFileName:
              request.referenceFileName ?? null,
          }),

          signal: controller.signal,
        }
      );

      const contentType =
        response.headers.get("content-type") || "";

      let data: any;

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        data = {
          message: text,
        };
      }

      if (!response.ok) {
        const errorMessage =
          typeof data?.error === "string"
            ? data.error
            : typeof data?.message === "string"
              ? data.message
              : `AI engine request failed with status ${response.status}.`;

        throw new Error(errorMessage);
      }

      if (!data?.jobId) {
        throw new Error(
          "AI engine returned an invalid response: jobId is missing."
        );
      }

      return {
        jobId: String(data.jobId),

        status:
          data.status === "completed"
            ? "completed"
            : data.status === "processing"
              ? "processing"
              : data.status === "failed"
                ? "failed"
                : "queued",

        ...(data.audioUrl
          ? {
              audioUrl: String(data.audioUrl),
            }
          : {}),

        ...(data.message
          ? {
              message: String(data.message),
            }
          : {}),
      };
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        throw new Error(
          "AI music engine request timed out."
        );
      }

      if (
        error instanceof Error &&
        error.name === "AbortError"
      ) {
        throw new Error(
          "AI music engine request timed out."
        );
      }

      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }
}
