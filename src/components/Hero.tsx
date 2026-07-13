"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, MapPin, Zap } from "lucide-react";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Ambient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/8 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-violet/10 rounded-full blur-[100px] animate-pulse-glow" />

      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono text-accent border border-border-accent rounded-sm bg-accent/5">
              <Zap size={12} />
              AVAILABLE FOR OPPORTUNITIES
            </span>
            <span className="flex items-center gap-1 text-xs text-muted font-mono">
              <MapPin size={12} />
              {profile.location}
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-syne)] text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight mb-6">
            <span className="block text-foreground">Prachhi</span>
            <span className="block text-gradient">Jain</span>
          </h1>

          <p className="max-w-2xl text-lg sm:text-xl text-muted leading-relaxed mb-4 font-light">
            {profile.title}
            <span className="text-accent/80"> · </span>
            {profile.tagline}
          </p>

          <p className="max-w-xl text-sm text-muted/70 font-mono mb-12">
            Bridging solar IoT infrastructure, national portal integrations,
            and human-centered design.
          </p>

          <div className="flex flex-wrap gap-4 mb-20">
            <a
              href="#journey"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-background font-semibold text-sm rounded-sm hover:bg-accent-dim transition-all duration-300"
            >
              Explore My Journey
              <ArrowDown
                size={16}
                className="group-hover:translate-y-0.5 transition-transform"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-border text-foreground font-medium text-sm rounded-sm hover:border-accent/40 hover:text-accent transition-all duration-300"
            >
              Get in Touch
            </a>
            <a
              href="/Prachhi-Jain-Profile.pdf"
              download
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-border-accent text-accent font-medium text-sm rounded-sm hover:bg-accent/8 transition-all duration-300"
            >
              <Download size={16} />
              Download Profile
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {profile.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                className="glass rounded-sm p-5 accent-border pl-6"
              >
                <div className="font-[family-name:var(--font-syne)] text-3xl font-bold text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted font-mono uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 glow-line" />
    </section>
  );
}
