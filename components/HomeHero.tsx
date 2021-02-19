export function HomeHero() {
  return (
    <div
      style={{
        top: '-20vh',
        // transform: `translateX(17.5vw) translateY(-5vh)`,
      }}
      className="fixed bottom-0 left-0 right-0 z-30 overflow-hidden"
    >
      <img
        className="object-cover object-right-bottom w-full h-full"
        src="/hero.svg"
      />
    </div>
  );
}
