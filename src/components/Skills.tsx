"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-accent uppercase tracking-[0.3em] mb-4 block">
            03 — Skills & Education
          </span>
          <h2 className="font-[family-name:var(--font-syne)] text-4xl sm:text-5xl font-bold tracking-tight">
            Tools of the <span className="text-gradient">trade</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-[family-name:var(--font-syne)] text-lg font-semibold mb-6 text-foreground">
              Technical & Professional Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {profile.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.04 }}
                  className="px-4 py-2 text-sm glass rounded-sm text-muted hover:text-accent hover:border-accent/30 transition-all duration-300 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-[family-name:var(--font-syne)] text-lg font-semibold mb-6 text-foreground">
              Education
            </h3>
            <div className="space-y-4">
              {profile.education.map((edu, i) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="glass rounded-sm p-5 accent-border pl-7 hover:border-accent/20 transition-colors"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-muted mt-1">{edu.school}</p>
                    </div>
                    <span className="text-xs font-mono text-accent shrink-0">
                      {edu.period}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
