"use client"

import * as React from "react"

//Use this hook to determine if the component has been hydrated (mounted) on the client side
//Example usage: const hydrated = useHydrated(); if (!hydrated) return null;
export default function useHydrated() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
