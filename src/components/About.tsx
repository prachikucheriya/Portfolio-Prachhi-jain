"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-mono text-accent uppercase tracking-[0.3em] mb-4 block">
            01 — About
          </span>
          <h2 className="font-[family-name:var(--font-syne)] text-4xl sm:text-5xl font-bold mb-12 tracking-tight">
            Where enterprise meets
            <br />
            <span className="text-gradient">field-level precision</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {profile.about.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-muted leading-relaxed text-base sm:text-lg">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass rounded-sm p-8 space-y-6"
          >
            <h3 className="font-[family-name:var(--font-syne)] text-lg font-semibold text-foreground">
              Core Domains
            </h3>
            <div className="space-y-4">
              {[
                {
                  label: "IoT Operations",
                  desc: "RMS monitoring, connectivity troubleshooting, portal sync",
                  pct: 90,
                },
                {
                  label: "Design & UX",
                  desc: "Wireframes, prototypes, responsive web interfaces",
                  pct: 75,
                },
                {
                  label: "Education",
                  desc: "Computer science instruction, curriculum development",
                  pct: 85,
                },
              ].map((domain) => (
                <div key={domain.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-foreground font-medium">
                      {domain.label}
                    </span>
                    <span className="text-accent font-mono text-xs">
                      {domain.pct}%
                    </span>
                  </div>
                  <div className="h-1 bg-surface-elevated rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${domain.pct}%` } : {}}
                      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-accent to-violet rounded-full"
                    />
                  </div>
                  <p className="text-xs text-muted mt-1">{domain.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
