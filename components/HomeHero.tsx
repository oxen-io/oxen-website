export function HomeHero() {
  return (
    <img
      style={{
        transform: ``,
        // Make image expand into sidebar direction
        direction: 'rtl',
        minWidth: '100%',
      }}
      className="absolute bottom-0 left-0 object-cover h-full transform"
      src="/hero.svg"
      alt="Hero Landing Page, depicting the integration of privacy and technology"
    />
  );
}
