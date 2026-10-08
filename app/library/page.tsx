export default function LibraryPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">Your Music Library</h1>

        <p className="mt-2 text-gray-400">
          Your generated songs, projects and saved music will appear here.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <h2 className="text-xl font-semibold">No songs yet</h2>
          <p className="mt-2 text-sm text-gray-400">
            Create your first song and it will appear in your library.
          </p>
        </div>
      </div>
    </main>
  );
}
