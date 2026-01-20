"use client"

import * as React from "react"

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches
    }
    return false
  })

  React.useEffect(() => {
    const media = window.matchMedia(query)

    const listener = () => setMatches(media.matches)
    listener()

    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}
