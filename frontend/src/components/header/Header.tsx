type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <header className="h-14 border-b border-slate-800/60 flex items-center px-4 bg-slate-900/80 backdrop-blur-sm">
      <h1 className="text-xl font-semibold text-slate-100 mx-auto font-serif">{title}</h1>
    </header>
  );
}