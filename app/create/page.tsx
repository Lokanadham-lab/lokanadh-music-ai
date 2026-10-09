
"use client";

import { useState, type FormEvent } from "react";

type Mode = "Simple" | "Advanced";

export default function CreatePage() {
  const [mode, setMode] = useState<Mode>("Simple");

  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");

  const [language, setLanguage] = useState("Telugu");
  const [genre, setGenre] = useState("Melody");
  const [vocal, setVocal] = useState("Auto");
  const [emotion, setEmotion] = useState("Emotional");

  const [energy, setEnergy] = useState(60);
  const [bpm, setBpm] = useState(90);
  const [key, setKey] = useState("Auto");
  const [scale, setScale] = useState("Auto");

  const [duration, setDuration] = useState("Auto");
  const [singerSkill, setSingerSkill] = useState(70);
  const [melodyLock, setMelodyLock] = useState(false);
  const [referenceStrength, setReferenceStrength] = useState(70);
  const [pronunciation, setPronunciation] = useState(true);
  const [instrumental, setInstrumental] = useState(false);

  const [referenceFile, setReferenceFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fieldClass =
    "w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-violet-500";

  const sectionClass =
    "rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-7";

  async function handleGenerate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!title.trim()) {
      setError("Please enter a song title.");
      return;
    }

    if (!instrumental && !lyrics.trim()) {
      setError("Please enter lyrics, or enable Instrumental Only.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/generate/music", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          lyrics: lyrics.trim(),
          language,
          genre,
          vocal,
          mode,
          emotion,
          energy,
          bpm,
          key,
          scale,
          duration,
          singerSkill,
          melodyLock,
          referenceStrength,
          pronunciation,
          instrumental,
          referenceFileName: referenceFile?.name || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "Generation request failed."
        );
      }

      setMessage(
        data?.message ||
          "Your generation request was submitted."
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <p className="text-sm font-medium text-violet-400">
            LOKANADH MUSIC AI
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Create Your Song
          </h1>

          <p className="mt-3 text-gray-400">
            Your Voice. Your Lyrics. Your Music. Your AI Studio.
          </p>
        </header>

        <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-2">
          <div className="grid grid-cols-2 gap-2">
            {(["Simple", "Advanced"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                  mode === item
                    ? "bg-white text-black"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item} Mode
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleGenerate} className="space-y-6">
          <section className={sectionClass}>
            <h2 className="text-xl font-semibold">Song Details</h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter your song title and original lyrics.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="song-title"
                  className="mb-2 block text-sm text-gray-300"
                >
                  Song Title
                </label>

                <input
                  id="song-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter song title"
                  maxLength={160}
                  className={fieldClass}
                />
              </div>

              <div>
                <label
                  htmlFor="song-lyrics"
                  className="mb-2 block text-sm text-gray-300"
                >
                  Lyrics
                </label>

                <textarea
                  id="song-lyrics"
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value)}
                  placeholder="Write or paste your lyrics here..."
                  rows={10}
                  disabled={instrumental}
                  className={`${fieldClass} resize-y disabled:opacity-50`}
                />

                <div className="mt-2 flex justify-between gap-3 text-xs text-gray-500">
                  <span>
                    {instrumental
                      ? "Lyrics are disabled in instrumental mode."
                      : "Use original lyrics or lyrics you have permission to use."}
                  </span>
                  <span>{lyrics.length} characters</span>
                </div>
              </div>
            </div>
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-semibold">Music Style</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div>
                <label htmlFor="language" className="mb-2 block text-sm text-gray-300">
                  Language
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={fieldClass}
                >
                  {["Telugu", "Hindi", "Tamil", "Kannada", "Malayalam", "English"].map((v) => (
                    <option key={v} value={v} className="bg-black">{v}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="genre" className="mb-2 block text-sm text-gray-300">
                  Genre
                </label>
                <select
                  id="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className={fieldClass}
                >
                  {[
                    "Melody", "Folk", "Devotional", "Cinematic",
                    "Pop", "Rock", "Rap", "Hip-Hop", "EDM",
                    "Classical", "Acoustic", "Lo-Fi", "Fusion",
                  ].map((v) => (
                    <option key={v} value={v} className="bg-black">{v}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="vocal" className="mb-2 block text-sm text-gray-300">
                  Vocal
                </label>
                <select
                  id="vocal"
                  value={vocal}
                  onChange={(e) => setVocal(e.target.value)}
                  className={fieldClass}
                >
                  {["Auto", "Male", "Female", "Youthful", "Duet", "Group", "Choir"].map((v) => (
                    <option key={v} value={v} className="bg-black">{v}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="emotion" className="mb-2 block text-sm text-gray-300">
                Emotion
              </label>
              <select
                id="emotion"
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                className={fieldClass}
              >
                {[
                  "Emotional", "Happy", "Romantic", "Sad",
                  "Devotional", "Energetic", "Peaceful",
                  "Epic", "Dramatic", "Hopeful",
                ].map((v) => (
                  <option key={v} value={v} className="bg-black">{v}</option>
                ))}
              </select>
            </div>
          </section>

          {mode === "Advanced" && (
            <>
              <section className={sectionClass}>
                <h2 className="text-xl font-semibold">
                  Advanced Music Controls
                </h2>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="mb-2 flex justify-between">
                      <label htmlFor="energy">Energy</label>
                      <span className="text-violet-400">{energy}%</span>
                    </div>
                    <input
                      id="energy"
                      type="range"
                      min="0"
                      max="100"
                      value={energy}
                      onChange={(e) => setEnergy(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between">
                      <label htmlFor="singer-skill">Singer Skill</label>
                      <span className="text-violet-400">{singerSkill}%</span>
                    </div>
                    <input
                      id="singer-skill"
                      type="range"
                      min="0"
                      max="100"
                      value={singerSkill}
                      onChange={(e) => setSingerSkill(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="bpm" className="mb-2 block text-sm text-gray-300">
                      BPM
                    </label>
                    <input
                      id="bpm"
                      type="number"
                      min="40"
                      max="220"
                      value={bpm}
                      onChange={(e) => setBpm(Number(e.target.value))}
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="duration" className="mb-2 block text-sm text-gray-300">
                      Duration
                    </label>
                    <select
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className={fieldClass}
                    >
                      {[
                        "Auto", "2 Minutes", "3 Minutes", "4 Minutes",
                        "5 Minutes", "6 Minutes", "8 Minutes",
                      ].map((v) => (
                        <option key={v} value={v} className="bg-black">{v}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="music-key" className="mb-2 block text-sm text-gray-300">
                      Key
                    </label>
                    <select
                      id="music-key"
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      className={fieldClass}
                    >
                      {["Auto", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].map((v) => (
                        <option key={v} value={v} className="bg-black">{v}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="scale" className="mb-2 block text-sm text-gray-300">
                      Scale
                    </label>
                    <select
                      id="scale"
                      value={scale}
                      onChange={(e) => setScale(e.target.value)}
                      className={fieldClass}
                    >
                      {["Auto", "Major", "Minor", "Harmonic Minor", "Melodic Minor", "Pentatonic"].map((v) => (
                        <option key={v} value={v} className="bg-black">{v}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              <section className={sectionClass}>
                <h2 className="text-xl font-semibold">
                  Reference & Melody Control
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Choose a reference audio file and melody preferences.
                </p>

                <div className="mt-6">
                  <label htmlFor="reference-audio" className="mb-2 block text-sm text-gray-300">
                    Reference Audio
                  </label>
                  <input
                    id="reference-audio"
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setReferenceFile(e.target.files?.[0] || null)}
                    className="w-full rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-4 text-sm text-gray-300"
                  />
                  {referenceFile && (
                    <p className="mt-2 break-all text-xs text-violet-400">
                      Selected: {referenceFile.name}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    File selection is available; actual audio upload and analysis
                    require backend integration.
                  </p>
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex justify-between">
                    <label htmlFor="reference-strength">Reference Strength</label>
                    <span className="text-violet-400">{referenceStrength}%</span>
                  </div>
                  <input
                    id="reference-strength"
                    type="range"
                    min="0"
                    max="100"
                    value={referenceStrength}
                    onChange={(e) => setReferenceStrength(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <label className="mt-6 flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="font-medium">Melody Lock</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Request stronger preservation of reference melody
                      when supported by the connected AI engine.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={melodyLock}
                    onChange={(e) => setMelodyLock(e.target.checked)}
                    className="h-5 w-5 accent-violet-500"
                  />
                </label>
              </section>
            </>
          )}

          <section className={sectionClass}>
            <h2 className="text-xl font-semibold">Song Options</h2>

            <div className="mt-5 space-y-4">
              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="font-medium">Telugu Pronunciation Assist</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Request pronunciation support when the selected engine
                    and language pipeline support it.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={pronunciation}
                  onChange={(e) => setPronunciation(e.target.checked)}
                  className="h-5 w-5 accent-violet-500"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="font-medium">Instrumental Only</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Request music without vocals.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={instrumental}
                  onChange={(e) => setInstrumental(e.target.checked)}
                  className="h-5 w-5 accent-violet-500"
                />
              </label>
            </div>
          </section>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          {message && (
            <div
              role="status"
              className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-300"
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-violet-600 px-5 py-4 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Submitting Request..." : "Generate Song"}
          </button>

          <p className="text-center text-xs text-gray-500">
            Real song generation requires a configured and running AI music engine.
          </p>
        </form>
      </div>
    </main>
  );
}
ite outline-none"
              >
                <option className="bg-black">Emotional</option>
                <option className="bg-black">Happy</option>
                <option className="bg-black">Romantic</option>
                <option className="bg-black">Sad</option>
                <option className="bg-black">Devotional</option>
                <option className="bg-black">Energetic</option>
                <option className="bg-black">Peaceful</option>
                <option className="bg-black">Epic</option>
                <option className="bg-black">Dramatic</option>
                <option className="bg-black">Hopeful</option>
              </select>
            </div>
          </section>

          {/* Advanced */}
          {mode === "Advanced" && (
            <>
              <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-7">
                <h2 className="text-xl font-semibold">
                  Advanced Music Controls
                </h2>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="mb-2 flex justify-between">
                      <label className="text-sm text-gray-300">
                        Energy
                      </label>
                      <span className="text-sm text-violet-400">
                        {energy}%
                      </span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={energy}
                      onChange={(e) => setEnergy(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between">
                      <label className="text-sm text-gray-300">
                        Singer Skill
                      </label>
                      <span className="text-sm text-violet-400">
                        {singerSkill}%
                      </span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={singerSkill}
                      onChange={(e) =>
                        setSingerSkill(Number(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      BPM
                    </label>

                    <input
                      type="number"
                      min="40"
                      max="220"
                      value={bpm}
                      onChange={(e) => setBpm(Number(e.target.value))}
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Duration
                    </label>

                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none"
                    >
                      <option className="bg-black">Auto</option>
                      <option className="bg-black">2 Minutes</option>
                      <option className="bg-black">3 Minutes</option>
                      <option className="bg-black">4 Minutes</option>
                      <option className="bg-black">5 Minutes</option>
                      <option className="bg-black">6 Minutes</option>
                      <option className="bg-black">8 Minutes</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Key
                    </label>

                    <select
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none"
                    >
                      <option className="bg-black">Auto</option>
                      <option className="bg-black">C</option>
                      <option className="bg-black">C#</option>
                      <option className="bg-black">D</option>
                      <option className="bg-black">D#</option>
                      <option className="bg-black">E</option>
                      <option className="bg-black">F</option>
                      <option className="bg-black">F#</option>
                      <option className="bg-black">G</option>
                      <option className="bg-black">G#</option>
                      <option className="bg-black">A</option>
                      <option className="bg-black">A#</option>
                      <option className="bg-black">B</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Scale
                    </label>

                    <select
                      value={scale}
                      onChange={(e) => setScale(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none"
                    >
                      <option className="bg-black">Auto</option>
                      <option className="bg-black">Major</option>
                      <option className="bg-black">Minor</option>
                      <option className="bg-black">Harmonic Minor</option>
                      <option className="bg-black">Melodic Minor</option>
                      <option className="bg-black">Pentatonic</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Reference */}
              <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-7">
                <h2 className="text-xl font-semibold">
                  Reference & Melody Control
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add an audio reference when you want the AI pipeline to
                  analyse musical characteristics.
                </p>

                <div className="mt-6">
                  <label className="mb-2 block text-sm text-gray-300">
                    Reference Audio
                  </label>

                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) =>
                      setReferenceFile(e.target.files?.[0] || null)
                    }
                    className="w-full rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-4 text-sm text-gray-300"
                  />

                  {referenceFile && (
                    <p className="mt-2 text-xs text-violet-400">
                      Selected: {referenceFile.name}
                    </p>
                  )}
                </div>

                <div className="mt-6 space-y-6">
                  <div>
                    <div className="mb-2 flex justify-between">
                      <label className="text-sm text-gray-300">
                        Reference Strength
                      </label>

                      <span className="text-sm text-violet-400">
                        {referenceStrength}%
                      </span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={referenceStrength}
                      onChange={(e) =>
                        setReferenceStrength(Number(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>

                  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                    <div>
                      <p className="font-medium">Melody Lock</p>
                      <p className="mt-1 text-xs text-gray-500">
                        Request stronger preservation of reference melodic
                        characteristics when supported by the AI engine.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={melodyLock}
                      onChange={(e) => setMelodyLock(e.target.checked)}
                      className="h-5 w-5"
                    />
                  </label>
                </div>
              </section>
            </>
          )}

          {/* Extra options */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-7">
            <h2 className="text-xl font-semibold">Song Options</h2>

            <div className="mt-5 space-y-4">
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="font-medium">Telugu Pronunciation Assist</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Helps preserve intended pronunciation when supported by
                    the selected language and engine.
                  </p>
                </div>

                <input
                  type="checkbox"
        
