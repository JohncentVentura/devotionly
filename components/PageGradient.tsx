export function BottomGradient() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-25 bg-linear-to-t from-background to-transparent pointer-events-none" />
  );
}

export function TopGradient() {
  return (
    <div className="absolute top-0 left-0 w-full h-25 bg-linear-to-b from-background to-transparent pointer-events-none" />
  );
}
