import { Play } from "lucide-react"

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border-soft bg-surface/50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:px-6 md:flex-row lg:px-8">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-accent">
            <Play className="h-4 w-4 fill-white text-white" />
          </span>
          <span className="text-sm font-bold text-white">
            Ani<span className="text-brand">Stream</span>
          </span>
        </div>
        <p className="text-center text-xs text-slate-400">
          Data provided by the{" "}
          <a
            href="https://jikan.moe"
            target="_blank"
            rel="noreferrer"
            className="text-brand hover:underline"
          >
            Jikan API
          </a>{" "}
          (MyAnimeList). Built for INTECH 3112.
        </p>
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} AniStream</p>
      </div>
    </footer>
  )
}
