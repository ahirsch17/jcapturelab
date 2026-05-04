type Props = {
  children: React.ReactNode;
  className?: string;
};

export function ContentPanel({ children, className = "" }: Props) {
  return (
    <div
      className={`rounded-2xl border border-black/[0.08] bg-white/[0.9] px-5 py-10 shadow-[0_8px_40px_rgb(0,0,0,0.07)] backdrop-blur-[10px] sm:px-8 sm:py-12 ${className}`}
    >
      {children}
    </div>
  );
}
