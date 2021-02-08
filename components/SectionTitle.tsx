interface Props {
  children: string;
}

export function SectionTitle(props: Props) {
  const { children } = props;

  return (
    <div className="flex justify-center font-sans text-xl text-primary mb-3">
      {children}
      <div className="absolute w-10 h-1 mt-8 rounded-full bg-secondary"></div>
    </div>
  );
}
