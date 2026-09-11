import { ChevronDown } from "lucide-react"

export default function GenreFilter({ genres, value, onChange }) {
  return (
    <div className="relative w-full sm:w-56">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-border-soft bg-surface py-2.5 pl-4 pr-10 text-sm text-white outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/30"
        aria-label="Filter by genre"
      >
        <option value="">All genres</option>
        {genres.map((g) => (
          <option key={g.mal_id} value={g.mal_id}>
            {g.name}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  )
}
