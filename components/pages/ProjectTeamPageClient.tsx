"use client";

import { PageHero } from "@/components/PageHero";
import { images } from "@/data/images";

const projectMembers = [
  { name: "Mehmet Gorkem Hanilci", studentId: "241601" },
  { name: "Eray Yikilmaz", studentId: "241605" },
  { name: "Tolga Hergin", studentId: "241614" },
  { name: "Hakan Ercaner", studentId: "241633" },
];

export function ProjectTeamPageClient() {
  return (
    <>
      <PageHero
        title="Website Credits"
        intro="The team behind the Skopje Routes website."
        image={images.mapTexture}
      />
      <section className="bg-[var(--warm-white)] section-pad">
        <div className="container-shell max-w-4xl">
          <div className="motion-reveal motion-reveal--soft border-y border-[var(--line)] py-8">
            <h2 className="font-display text-4xl leading-tight text-[var(--ink)] md:text-5xl">Website team</h2>
          </div>

          <div className="motion-list border-b border-[var(--line)]">
            {projectMembers.map((member, index) => (
              <article
                key={member.studentId}
                className="motion-reveal motion-reveal--line grid gap-4 border-t border-[var(--line)] py-6 sm:grid-cols-[72px_1fr_160px] sm:items-center"
              >
                <span className="font-display text-3xl text-[var(--gold)]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-3xl leading-tight text-[var(--ink)]">{member.name}</h3>
                <p className="fine-label text-[var(--forest)] sm:text-right">{member.studentId}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
