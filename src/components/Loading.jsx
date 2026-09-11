export default function Loading({ label = "Loading anime..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-border-soft border-t-brand" />
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  )
}

export function CardSkeletonGrid({ count = 12 }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-border-soft bg-surface">
          <div className="aspect-[3/4] animate-pulse bg-surface-2" />
          <div className="space-y-2 p-3">
            <div className="h-3 w-3/4 animate-pulse rounded bg-surface-2" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-surface-2" />
          </div>
        </div>
      ))}
    </div>
  )
}
