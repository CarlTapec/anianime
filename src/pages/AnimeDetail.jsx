import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Star, Tv, Calendar, Clock, Award } from "lucide-react"
import { getAnimeById } from "../lib/jikan.js"
import Loading from "../components/Loading.jsx"
import ErrorMessage from "../components/ErrorMessage.jsx"

export default function AnimeDetail() {
  const { id } = useParams()
  const [anime, setAnime] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  function load() {
    setLoading(true)
    setError(false)
    getAnimeById(id)
      .then((data) => setAnime(data.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
    window.scrollTo(0, 0)
  }, [id])

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Loading label="Loading details..." />
      </div>
    )
  }

  if (error || !anime) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <ErrorMessage onRetry={load} />
      </div>
    )
  }

  const image = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url

  const stats = [
    { icon: Star, label: "Score", value: anime.score ? anime.score.toFixed(2) : "N/A" },
    { icon: Tv, label: "Episodes", value: anime.episodes || "?" },
    { icon: Award, label: "Rank", value: anime.rank ? `#${anime.rank}` : "N/A" },
    { icon: Calendar, label: "Year", value: anime.year || anime.aired?.prop?.from?.year || "N/A" },
    { icon: Clock, label: "Status", value: anime.status || "N/A" },
  ]

  return (
    <div className="relative">
      {/* Backdrop */}
      <div className="absolute inset-x-0 top-0 -z-10 h-72 overflow-hidden">
        {image && <img src={image || "/placeholder.svg"} alt="" className="h-full w-full object-cover opacity-20 blur-xl" />}
        <div className="absolute inset-0 bg-gradient-to-b from-base/60 to-base" />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Browse
        </Link>

        <div className="mt-6 grid gap-8 md:grid-cols-[280px_1fr]">
          {/* Poster */}
          <div className="mx-auto w-full max-w-[280px]">
            <div className="overflow-hidden rounded-2xl border border-border-soft bg-surface shadow-2xl shadow-black/40">
              <img src={image || "/placeholder.svg"} alt={anime.title} className="aspect-[3/4] w-full object-cover" />
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
              {anime.title}
            </h1>
            {anime.title_english && anime.title_english !== anime.title && (
              <p className="mt-1 text-base text-slate-400">{anime.title_english}</p>
            )}

            {/* Genres */}
            {anime.genres?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {anime.genres.map((g) => (
                  <span
                    key={g.mal_id}
                    className="rounded-full border border-border-soft bg-surface px-3 py-1 text-xs font-medium text-slate-200"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-border-soft bg-surface p-3 text-center">
                  <s.icon className="mx-auto h-4 w-4 text-brand" />
                  <p className="mt-1.5 text-sm font-semibold text-white">{s.value}</p>
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Synopsis */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-white">Synopsis</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {anime.synopsis || "No synopsis available for this title."}
              </p>
            </div>

            {anime.trailer?.url && (
              <a
                href={anime.trailer.url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
              >
                Watch Trailer
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
