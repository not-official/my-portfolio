export default function SectionHeader({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div className="mb-8 border-b border-[var(--line)] pb-5 transition-colors duration-300 md:mb-10">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)] transition-colors duration-300 md:text-xs md:tracking-[0.28em]">
        {label}
      </p>

      <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)] transition-colors duration-300 md:text-6xl">
        {title}
      </h2>
    </div>
  );
}