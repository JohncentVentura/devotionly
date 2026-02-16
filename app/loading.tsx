// Stack uses React Suspense, which will render this page while user data is being fetched.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/loading

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      {/* Spinning circle */}
      <div className="w-12 h-12 md:w-24 md:h-24 border-4 border-t-primary border-gray-200 rounded-full animate-spin"/>
      <p className="text-muted-foreground text-lg sm:text-2xl lg:text-4xl font-bold">
        Loading…
      </p>
    </div>
  );
}
