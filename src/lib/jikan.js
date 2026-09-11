const BASE_URL = "https://api.jikan.moe/v4"

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Jikan enforces a strict rate limit (~3 req/sec, 60/min) and returns 429
// when exceeded. It also proxies MyAnimeList, which can return 5xx (e.g. 504)
// during upstream hiccups. We retry a few times with exponential backoff so
// transient failures recover automatically before surfacing an error.
async function request(path, { retries = 4 } = {}) {
  let attempt = 0
  let lastError

  while (attempt <= retries) {
    try {
      const res = await fetch(`${BASE_URL}${path}`)

      if ((res.status === 429 || res.status >= 500) && attempt < retries) {
        await sleep(800 * (attempt + 1))
        attempt += 1
        continue
      }

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }

      return res.json()
    } catch (err) {
      lastError = err
      if (attempt === retries) break
      await sleep(600 * (attempt + 1))
      attempt += 1
    }
  }

  throw lastError || new Error("Request failed")
}

export function getTopAnime({ limit = 12 } = {}) {
  return request(`/top/anime?limit=${limit}`)
}

export function getGenres() {
  return request(`/genres/anime`)
}

export function searchAnime({ q = "", genres = "", page = 1, orderBy = "popularity", sort = "asc", limit = 20 } = {}) {
  const params = new URLSearchParams()
  if (q) params.set("q", q)
  if (genres) params.set("genres", genres)
  params.set("page", String(page))
  params.set("order_by", orderBy)
  params.set("sort", sort)
  params.set("limit", String(limit))
  params.set("sfw", "true")
  return request(`/anime?${params.toString()}`)
}

export function getAnimeById(id) {
  return request(`/anime/${id}/full`)
}
