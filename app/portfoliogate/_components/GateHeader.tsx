import Link from "next/link";

type GateHeaderProps = {
  isComplete: boolean;
};

export default function GateHeader({ isComplete }: GateHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4">
      <Link
        href="/"
        className="group relative font-mono text-[10px] font-semibold uppercase leading-[1.9] tracking-[0.24em] sm:text-[11px] sm:tracking-[0.28em] md:text-[12px] md:leading-[2.05] md:tracking-[0.32em]"
      >
        <span className="block">Aman CK</span>
        <span className="block text-[#6f6f6f]">Portfolio Gate</span>
        <span className="block text-[#6f6f6f]">3 × 3 Puzzle</span>
        <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#2563eb] transition-all duration-300 group-hover:w-full" />
      </Link>

      <div className="flex shrink-0 flex-col items-end text-right">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6f6f6f] sm:text-[11px] sm:tracking-[0.28em] md:text-[12px] md:tracking-[0.36em]">
          {isComplete ? "Open" : "Locked"}
        </span>

        {!isComplete && (
          <Link
            href="/portfolio"
            className="mt-2 max-w-[130px] font-mono text-[9px] font-semibold uppercase leading-4 tracking-[0.14em] text-[#9a9a9a] underline underline-offset-4 transition hover:text-[#2563eb] sm:max-w-none sm:text-[10px] sm:tracking-[0.18em]"
          >
            Give up & skip?
          </Link>
        )}
      </div>
    </header>
  );
}