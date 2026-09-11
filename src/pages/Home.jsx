import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Sparkles, TrendingUp, Search, Filter } from "lucide-react"
import { getTopAnime } from "../lib/jikan.js"
import AnimeCard from "../components/AnimeCard.jsx"
import { CardSkeletonGrid } from "../components/Loading.jsx"
import ErrorMessage from "../components/ErrorMessage.jsx"

export default function Home() {
  const [top, setTop] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  function load() {
    setLoading(true)
    setError(false)
    getTopAnime({ limit: 10 })
      .then((data) => setTop(data.data || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border-soft">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
          <div className="absolute -right-24 top-12 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface px-4 py-1.5 text-xs font-medium text-slate-300">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              Powered by the Jikan / MyAnimeList API
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover your next
              <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent"> favorite anime</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-slate-300 sm:text-lg">
              Browse thousands of titles, search by name, and filter by genre — all in one clean, fast, and
              responsive experience.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/browse"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-strong sm:w-auto"
              >
                <Search className="h-4 w-4" />
                Browse Anime
              </Link>
              <Link
                to="/about"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border-soft bg-surface px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-surface-2 sm:w-auto"
              >
                About the Project
              </Link>
            </div>
          </div>

          {/* Feature chips */}
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: TrendingUp, title: "Top Ranked", desc: "See the highest-rated anime of all time." },
              { icon: Search, title: "Live Search", desc: "Find any title instantly as you type." },
              { icon: Filter, title: "Genre Filters", desc: "Narrow results across dozens of genres." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-border-soft bg-surface p-5 text-left">
                <f.icon className="h-6 w-6 text-brand" />
                <h3 className="mt-3 text-sm font-semibold text-white">{f.title}</h3>
                <p className="mt-1 text-xs text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending / Top preview */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-brand" />
            <h2 className="text-xl font-bold text-white sm:text-2xl">Top Anime Right Now</h2>
          </div>
          <Link to="/browse" className="text-sm font-medium text-brand hover:underline">
            View all
          </Link>
        </div>

        {loading ? (
          <CardSkeletonGrid count={10} />
        ) : error ? (
          <ErrorMessage onRetry={load} />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {top.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
