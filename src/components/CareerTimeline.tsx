"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin } from "lucide-react";
import { profile } from "@/data/profile";

export default function CareerTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="journey" className="relative py-32 px-6 bg-surface/50">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-accent uppercase tracking-[0.3em] mb-4 block">
            02 — Career Journey
          </span>
          <h2 className="font-[family-name:var(--font-syne)] text-4xl sm:text-5xl font-bold tracking-tight">
            A path through
            <span className="text-gradient"> three worlds</span>
          </h2>
          <p className="text-muted mt-4 max-w-xl">
            From the classroom to the design studio to the solar grid — each
            chapter built the foundation for the next.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[19px] sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-accent via-violet to-transparent" />

          <div className="space-y-12">
            {profile.experience.map((job, i) => (
              <motion.div
                key={`${job.company}-${job.period}`}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex flex-col sm:flex-row gap-6 sm:gap-0 ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                <div className="hidden sm:block sm:w-1/2" />

                <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 z-10">
                  <div className="w-10 h-10 rounded-sm bg-surface border border-border-accent flex items-center justify-center">
                    <Briefcase size={16} className="text-accent" />
                  </div>
                </div>

                <div
                  className={`sm:w-1/2 pl-14 sm:pl-0 ${
                    i % 2 === 0
                      ? "sm:pr-12 sm:text-right"
                      : "sm:pl-12 sm:text-left"
                  }`}
                >
                  <div className="glass rounded-sm p-6 hover:border-accent/20 transition-colors duration-300 group">
                    <div
                      className={`flex items-center gap-2 text-xs font-mono text-accent mb-2 ${
                        i % 2 === 0 ? "sm:justify-end" : ""
                      }`}
                    >
                      <span>{job.period}</span>
                      <span className="text-muted">·</span>
                      <span className="text-muted">{job.duration}</span>
                    </div>
                    <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                      {job.role}
                    </h3>
                    <p className="text-sm text-muted mb-1">{job.company}</p>
                    <p
                      className={`flex items-center gap-1 text-xs text-muted/60 mb-4 ${
                        i % 2 === 0 ? "sm:justify-end" : ""
                      }`}
                    >
                      <MapPin size={11} className="shrink-0" />
                      {job.location}
                    </p>
                    <ul
                      className={`space-y-1.5 ${
                        i % 2 === 0 ? "sm:text-right" : ""
                      }`}
                    >
                      {job.highlights.slice(0, 3).map((h) => (
                        <li
                          key={h}
                          className="text-xs text-muted/80 leading-relaxed"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
