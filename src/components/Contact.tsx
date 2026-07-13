"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Send } from "lucide-react";

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
import { profile } from "@/data/profile";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-accent uppercase tracking-[0.3em] mb-4 block">
            05 — Contact
          </span>
          <h2 className="font-[family-name:var(--font-syne)] text-4xl sm:text-5xl font-bold tracking-tight">
            Let&apos;s <span className="text-gradient">connect</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-muted leading-relaxed text-lg">
              Open to roles in IoT operations, solar infrastructure, UI/UX
              design, and technology consulting. Reach out via email or
              LinkedIn.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-4 glass rounded-sm p-5 hover:border-accent/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted font-mono uppercase tracking-wider">
                    Email
                  </p>
                  <p className="text-sm text-foreground group-hover:text-accent transition-colors">
                    {profile.email}
                  </p>
                </div>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass rounded-sm p-5 hover:border-accent/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors text-accent">
                  <LinkedInIcon size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted font-mono uppercase tracking-wider">
                    LinkedIn
                  </p>
                  <p className="text-sm text-foreground group-hover:text-accent transition-colors">
                    prachhi-jain
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 glass rounded-sm p-5">
                <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center">
                  <MapPin size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted font-mono uppercase tracking-wider">
                    Location
                  </p>
                  <p className="text-sm text-foreground">{profile.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass rounded-sm p-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const data = new FormData(form);
              const name = data.get("name");
              const message = data.get("message");
              window.location.href = `mailto:${profile.email}?subject=Portfolio Inquiry from ${name}&body=${message}`;
            }}
          >
            <div>
              <label
                htmlFor="name"
                className="text-xs font-mono text-muted uppercase tracking-wider block mb-2"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full bg-surface border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent/50 transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-xs font-mono text-muted uppercase tracking-wider block mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-surface border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent/50 transition-colors"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="text-xs font-mono text-muted uppercase tracking-wider block mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full bg-surface border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                placeholder="Tell me about the opportunity..."
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-background font-semibold text-sm rounded-sm hover:bg-accent-dim transition-all duration-300"
            >
              <Send size={16} />
              Send Message
            </button>
          </motion.form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted font-mono">
          <p>© {new Date().getFullYear()} Prachhi Jain. All rights reserved.</p>
          <p className="text-accent/60">Built with Next.js</p>
        </div>
      </div>
    </section>
  );
}
