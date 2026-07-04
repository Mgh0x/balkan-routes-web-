export function SectionTitle({
  title,
  subtitle,
  align = "left",
  inverse = false,
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  inverse?: boolean;
}) {
  return (
    <div className={align === "center" ? "motion-reveal motion-reveal--soft mx-auto max-w-3xl text-center" : "motion-reveal motion-reveal--soft max-w-3xl"}>
      <h2 className={`font-display text-4xl leading-[1.02] text-balance md:text-5xl lg:text-6xl ${inverse ? "text-white" : "text-[var(--ink)]"}`}>
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-5 max-w-2xl text-base leading-8 ${align === "center" ? "mx-auto" : ""} ${inverse ? "text-white/66" : "text-[var(--muted)]"}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}
