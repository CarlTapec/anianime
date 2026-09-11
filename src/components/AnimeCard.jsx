import { Link } from "react-router-dom"
import { Star, Tv } from "lucide-react"

export default function AnimeCard({ anime }) {
  const image = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url
  const score = anime.score
  const episodes = anime.episodes

  return (
    <Link
      to={`/anime/${anime.mal_id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border-soft bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-xl hover:shadow-brand/20"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-2">
        {image ? (
          <img
            src={image || "/placeholder.svg"}
            alt={anime.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-500">No image</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

        {typeof score === "number" && (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-amber-300 backdrop-blur">
            <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
            {score.toFixed(1)}
          </span>
        )}

        {anime.type && (
          <span className="absolute left-2 top-2 rounded-full bg-brand/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            {anime.type}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-brand">
          {anime.title}
        </h3>
        <div className="mt-auto flex items-center gap-1 pt-1 text-xs text-slate-400">
          <Tv className="h-3.5 w-3.5" />
          <span>{episodes ? `${episodes} eps` : "Unknown eps"}</span>
        </div>
      </div>
    </Link>
  )
}
