import Link from "next/link";

type GateHeaderProps = {
  isComplete: boolean;
};

export default function GateHeader({ isComplete }: GateHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4">
      <Link
        href="/"
        className="group relative font-mono text-[10px] font-semibold uppercase leading-[1.9] tracking-[0.24em] text-[var(--ink)] transition-colors duration-300 sm:text-[11px] sm:tracking-[0.28em] md:text-[12px] md:leading-[2.05] md:tracking-[0.32em]"
      >
        <span className="block">Aman CK</span>
        <span className="block text-[var(--muted)]">Portfolio Gate</span>
        <span className="block text-[var(--muted)]">3 × 3 Puzzle</span>

        <span className="absolute -bottom-2 left-0 h-px w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
      </Link>

      <div className="flex shrink-0 flex-col items-end text-right">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)] transition-colors duration-300 sm:text-[11px] sm:tracking-[0.28em] md:text-[12px] md:tracking-[0.36em]">
          {isComplete ? "Open" : "Locked"}
        </span>

        {!isComplete && (
          <Link
            href="/portfolio"
            className="mt-2 max-w-[130px] font-mono text-[9px] font-semibold uppercase leading-4 tracking-[0.14em] text-[var(--muted-strong)] underline underline-offset-4 transition-colors duration-300 hover:text-[var(--accent)] sm:max-w-none sm:text-[10px] sm:tracking-[0.18em]"
          >
            Give up & skip?
          </Link>
        )}
      </div>
    </header>
  );
}