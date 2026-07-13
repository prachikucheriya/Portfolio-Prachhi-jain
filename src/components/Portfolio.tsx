"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, FolderOpen, Lock } from "lucide-react";

const projects = [
  {
    title: "Solar Dashboard UI",
    category: "Design System",
    status: "Live",
    description:
      "A monitoring interface concept for rooftop solar RMS data visualization.",
    url: "https://solar-dashboard-ui.vercel.app/",
  },
  {
    title: "DISCOM Integration Toolkit",
    category: "IoT / Integration",
    status: "Live",
    description:
      "Documentation and workflow templates for portal synchronization processes.",
    url: "https://github.com/prachikucheriya/DISCOM-Integration-Toolkit",
  },
  {
    title: "Design Portfolio",
    category: "UI/UX",
    status: "Live",
    description:
      "Curated collection of web design work for Dwarkamai foundation and construction.",
    url: "https://dwarkamai-foundation.netlify.app/",
  },
  {
    title: "Petrol Pump Staff Management",
    category: "Web App",
    status: "Live",
    description:
      "FuelStaff dashboard for petrol pump staff scheduling, attendance, and day-to-day operations.",
    url: "https://prachikucheriya-petrolpal-dash.petrolpump.workers.dev/",
  },
  {
    title: "PM Surya Ghar Portal Guide",
    category: "IoT / Documentation",
    status: "Coming Soon",
    description:
      "Step-by-step field guide for national portal sync, DISCOM workflows, and RMS troubleshooting.",
    url: null,
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="portfolio" className="relative py-32 px-6 bg-surface/50">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-accent uppercase tracking-[0.3em] mb-4 block">
            04 — Portfolio
          </span>
          <h2 className="font-[family-name:var(--font-syne)] text-4xl sm:text-5xl font-bold tracking-tight">
            Selected <span className="text-gradient">work</span>
          </h2>
          <p className="text-muted mt-4 max-w-xl">
            Live projects across solar IoT, UI/UX, and operations tooling — plus
            new work on the way.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="group glass rounded-sm p-6 flex flex-col h-full hover:border-accent/25 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full transition-all group-hover:bg-accent/10" />

              <div className="flex items-center justify-between mb-4">
                <FolderOpen
                  size={20}
                  className="text-accent/60 group-hover:text-accent transition-colors"
                />
                <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-muted border border-border px-2 py-0.5 rounded-sm">
                  {!project.url && <Lock size={10} />}
                  {project.status}
                </span>
              </div>

              <span className="text-xs font-mono text-violet mb-2">
                {project.category}
              </span>
              <h3 className="font-[family-name:var(--font-syne)] text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed flex-grow">
                {project.description}
              </p>

              <div className="mt-6 pt-4 border-t border-border">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-dim transition-colors"
                  >
                    <ExternalLink size={12} />
                    View Project
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted/50 cursor-not-allowed">
                    <ExternalLink size={12} />
                    View Project
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
