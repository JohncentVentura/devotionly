// Stack uses React Suspense, which will render this page while user data is being fetched.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/loading

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="animate-pulse text-muted-foreground text-lg sm:text-2xl lg:text-4xl font-bold">
        Loading…
      </h1>
    </div>
  );
}
