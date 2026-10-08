export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">LOKANADH MUSIC AI</h1>

        <p className="mt-2 text-gray-400">
          Your Voice. Your Lyrics. Your Music. Your AI Studio.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-gray-400">Plan</p>
            <p className="mt-2 text-2xl font-semibold">FREE</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-gray-400">Credits</p>
            <p className="mt-2 text-2xl font-semibold">3</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-gray-400">Songs</p>
            <p className="mt-2 text-2xl font-semibold">0</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Create your first song</h2>

          <p className="mt-2 text-gray-400">
            Turn your lyrics and musical ideas into a song.
          </p>

          <a
            href="/create"
            className="mt-5 inline-block rounded-xl bg-white px-5 py-3 font-semibold text-black"
          >
            Create Song
          </a>
        </div>
      </div>
    </main>
  );
}
