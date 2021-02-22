export function HomeHero() {
  return (
    <div
      style={
        {
          // transform: `translateX(17.5vw) translateY(-5vh)`,
        }
      }
      className="relative w-full h-full"
    >
      <img
        style={{
          transform: ``,
          // Make image expand into sidebar direction
          direction: 'rtl',
          minWidth: '100%',
        }}
        className="absolute bottom-0 left-0 object-cover h-full transform"
        src="/hero.svg"
      />
    </div>
  );
}
