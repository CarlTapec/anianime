import { AlertTriangle, RotateCcw } from "lucide-react"

export default function ErrorMessage({
  message = "Unable to retrieve the data. Please try again.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border-soft bg-surface px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15 text-red-400">
        <AlertTriangle className="h-7 w-7" />
      </span>
      <div>
        <h3 className="text-lg font-semibold text-white">Something went wrong</h3>
        <p className="mt-1 max-w-sm text-sm text-slate-400">{message}</p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
        >
          <RotateCcw className="h-4 w-4" />
          Try again
        </button>
      )}
    </div>
  )
}
