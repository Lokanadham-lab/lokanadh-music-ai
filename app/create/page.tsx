"use client";

import { useState } from "react";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [language, setLanguage] = useState("Telugu");
  const [genre, setGenre] = useState("Melody");
  const [vocal, setVocal] = useState("Auto");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleGenerate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/generate/music", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          lyrics,
          language,
          genre,
          vocal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Generation failed");
      }

      setMessage("Generation request submitted successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Create Your Song</h1>

        <p className="mt-2 text-gray-400">
          Your Voice. Your Lyrics. Your Music. Your AI Studio.
        </p>

        <form
          onSubmit={handleGenerate}
          className="mt-8 space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Song Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter song title"
              required
              className="w-full rounded-xl bg-white/10 px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Lyrics
            </label>
            <textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="Write or paste your lyrics..."
              required
              rows={10}
              className="w-full rounded-xl bg-white/10 px-4 py-3 text-white outline-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-xl bg-white/10 px-4 py-3 text-white outline-none"
            >
              <option className="bg-black">Telugu</option>
              <option className="bg-black">Hindi</option>
              <option className="bg-black">Tamil</option>
              <option className="bg-black">Kannada</option>
              <option className="bg-black">Malayalam</option>
              <option className="bg-black">English</option>
            </select>

            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="rounded-xl bg-white/10 px-4 py-3 text-white outline-none"
            >
              <option className="bg-black">Melody</option>
              <option className="bg-black">Folk</option>
              <option className="bg-black">Devotional</option>
              <option className="bg-black">Cinematic</option>
              <option className="bg-black">Pop</option>
              <option className="bg-black">Rock</option>
              <option className="bg-black">Rap</option>
              <option className="bg-black">EDM</option>
            </select>

            <select
              value={vocal}
              onChange={(e) => setVocal(e.target.value)}
              className="rounded-xl bg-white/10 px-4 py-3 text-white outline-none"
            >
              <option className="bg-black">Auto</option>
              <option className="bg-black">Male</option>
              <option className="bg-black">Female</option>
              <option className="bg-black">Duet</option>
              <option className="bg-black">Group</option>
              <option className="bg-black">Choir</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-black disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Generate Song"}
          </button>

          {message && (
            <p className="rounded-xl bg-white/10 p-4 text-sm text-gray-300">
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
          }
