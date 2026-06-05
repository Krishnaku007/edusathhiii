"use client";

import Link from "next/link";
import { ArrowRight, Bot, ChartNoAxesCombined, Languages, Mic, WifiOff } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Bot,
    title: "AI Tutor for Classes 1-12",
    desc: "Ask questions in natural language and get age-appropriate explanations with examples.",
  },
  {
    icon: Languages,
    title: "Multilingual Learning",
    desc: "English, Hindi, Bhojpuri, and Maithili support with saved language preferences.",
  },
  {
    icon: Mic,
    title: "Voice-First Classroom",
    desc: "Speech to text and text to speech workflows designed for young learners.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Teacher Analytics",
    desc: "Track mastery, weak topics, and learning trends through visual dashboards.",
  },
  {
    icon: WifiOff,
    title: "Offline-Ready PWA",
    desc: "Install on low-cost devices and sync progress once internet is available.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-14 pt-8 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border bg-surface p-8 card-shadow sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-5"
        >
          <p className="inline-flex rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand">
            EduSaathi for Bharat Classrooms
          </p>
          <h1 className="max-w-3xl text-balance text-4xl font-black leading-tight text-foreground sm:text-5xl">
            AI-Powered Learning Assistant for Rural and Low-Resource Schools
          </h1>
          <p className="max-w-2xl text-base text-muted sm:text-lg">
            Personalized tutoring, voice-first interaction, multilingual guidance, adaptive quizzes, and offline learning in one platform.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand/90"
              href="/login"
            >
              Start Learning
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              className="inline-flex items-center rounded-xl border border-border bg-surface-2 px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-surface"
              href="/teacher/dashboard"
            >
              View Teacher Dashboard
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }, idx) => (
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.06 }}
            key={title}
            className="rounded-2xl border bg-surface p-5 card-shadow"
          >
            <div className="mb-3 inline-flex rounded-xl bg-brand/10 p-2 text-brand">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-foreground">{title}</h2>
            <p className="mt-2 text-sm text-muted">{desc}</p>
          </motion.article>
        ))}
      </section>

      <section className="mt-10 rounded-3xl border bg-surface-2 p-6 sm:p-8">
        <h3 className="text-xl font-extrabold">Built for three roles</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Link className="rounded-xl border bg-surface p-4 font-semibold" href="/student/dashboard">
            Student Workspace
          </Link>
          <Link className="rounded-xl border bg-surface p-4 font-semibold" href="/teacher/dashboard">
            Teacher Analytics
          </Link>
          <Link className="rounded-xl border bg-surface p-4 font-semibold" href="/admin/dashboard">
            Admin Console
          </Link>
        </div>
      </section>
    </main>
  );
}
