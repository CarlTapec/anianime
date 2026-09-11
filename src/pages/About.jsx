import { BookOpen, Code2, Users, Database } from "lucide-react"

const members = ["Group Member 1", "Group Member 2", "Group Member 3", "Group Member 4"]

const stack = ["React (functional components + hooks)", "Tailwind CSS", "Vite", "React Router", "Jikan REST API (Fetch/AJAX)"]

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface px-4 py-1.5 text-xs font-medium text-slate-300">
          <BookOpen className="h-3.5 w-3.5 text-brand" />
          About This Project
        </span>
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">AniStream</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          AniStream is a responsive anime browsing application that lets you explore, search, and filter anime
          titles in real time. All data is fetched live from the free, keyless Jikan API — an unofficial REST
          wrapper around MyAnimeList — using the browser Fetch API without any full-page reloads.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-border-soft bg-surface p-6">
          <Code2 className="h-6 w-6 text-brand" />
          <h2 className="mt-3 text-lg font-semibold text-white">Course</h2>
          <p className="mt-1 text-sm text-slate-400">INTECH 3112</p>
          <p className="mt-3 text-sm text-slate-300">
            This project demonstrates client-side data fetching, reusable React components, props and state
            management, event handling, and a fully responsive Tailwind CSS interface.
          </p>
        </div>

        <div className="rounded-2xl border border-border-soft bg-surface p-6">
          <Database className="h-6 w-6 text-accent" />
          <h2 className="mt-3 text-lg font-semibold text-white">Tech Stack</h2>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
            {stack.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-border-soft bg-surface p-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-brand" />
          <h2 className="text-lg font-semibold text-white">Group Members</h2>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {members.map((m) => (
            <div
              key={m}
              className="flex items-center gap-3 rounded-xl border border-border-soft bg-surface-2 px-4 py-3"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/20 text-sm font-semibold text-brand">
                {m.split(" ").map((w) => w[0]).join("")}
              </span>
              <span className="text-sm text-slate-200">{m}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-500">Replace the placeholders above with your team&apos;s names.</p>
      </div>
    </div>
  )
}
