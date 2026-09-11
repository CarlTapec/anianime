import { useEffect, useState } from "react"
import { SearchX } from "lucide-react"
import { searchAnime, getGenres } from "../lib/jikan.js"
import AnimeCard from "../components/AnimeCard.jsx"
import SearchBar from "../components/SearchBar.jsx"
import GenreFilter from "../components/GenreFilter.jsx"
import { CardSkeletonGrid } from "../components/Loading.jsx"
import ErrorMessage from "../components/ErrorMessage.jsx"

export default function Browse() {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [genre, setGenre] = useState("")
  const [genres, setGenres] = useState([])

  const [anime, setAnime] = useState([])
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)

  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  // Load genres once
  useEffect(() => {
    getGenres()
      .then((data) => setGenres(data.data || []))
      .catch(() => setGenres([]))
  }, [])

  // Debounce the search input so we don't hammer the API on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 500)
    return () => clearTimeout(t)
  }, [query])

  // Reset to page 1 whenever the search term or genre changes
  useEffect(() => {
    setPage(1)
  }, [debouncedQuery, genre])

  // Fetch anime whenever filters or page change
  useEffect(() => {
    let cancelled = false
    const isFirstPage = page === 1

    if (isFirstPage) {
      setLoading(true)
    } else {
      setLoadingMore(true)
    }
    setError(false)

    searchAnime({
      q: debouncedQuery,
      genres: genre,
      page,
      orderBy: debouncedQuery ? "score" : "popularity",
      sort: debouncedQuery ? "desc" : "asc",
      limit: 20,
    })
      .then((data) => {
        if (cancelled) return
        const results = data.data || []
        setAnime((prev) => (isFirstPage ? results : [...prev, ...results]))
        setHasNextPage(Boolean(data.pagination?.has_next_page))
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
      .finally(() => {
        if (cancelled) return
        setLoading(false)
        setLoadingMore(false)
      })

    return () => {
      cancelled = true
    }
  }, [debouncedQuery, genre, page, reloadKey])

  const showEmpty = !loading && !error && anime.length === 0

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Browse Anime</h1>
        <p className="mt-1 text-sm text-slate-400">Search the catalog and filter by genre.</p>
      </div>

      {/* Controls */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <GenreFilter genres={genres} value={genre} onChange={setGenre} />
      </div>

      {/* Results */}
      {loading ? (
        <CardSkeletonGrid count={20} />
      ) : error ? (
        <ErrorMessage onRetry={() => setReloadKey((k) => k + 1)} />
      ) : showEmpty ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border-soft bg-surface px-6 py-20 text-center">
          <SearchX className="h-10 w-10 text-slate-500" />
          <h3 className="text-lg font-semibold text-white">No results found</h3>
          <p className="max-w-sm text-sm text-slate-400">
            We couldn&apos;t find any anime matching your search. Try a different title or genre.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {anime.map((item, i) => (
              <AnimeCard key={`${item.mal_id}-${i}`} anime={item} />
            ))}
          </div>

          {hasNextPage && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                disabled={loadingMore}
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingMore ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
