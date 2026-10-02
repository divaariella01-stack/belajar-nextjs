"use client";
import { CloudSun, HelpCircle, ShieldAlert, Users } from "lucide-react";
import Link from "next/link";
import { ArrowRight, Code2, Palette, Sparkles, Users2 } from "lucide-react";

import { cn } from "../lib/utils";
import { buttonVariants } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const features = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Fast, scalable web applications built with modern tooling and clean architecture.",
  },
  {
    icon: Palette,
    title: "UI Development",
    description:
      "Clean, responsive interfaces that feel intuitive on every screen size.",
  },
  {
    icon: Users2,
    title: "Consulting",
    description:
      "Practical guidance to help you plan and ship your next digital project.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#F8F9FA] text-[#111827]">
        <div className="absolute inset-0 bg-grid bg-radial-fade opacity-30" />
        
        {/* Glow Blobs sesuai PRD: Primary Green, Magenta Accent, & Warning Orange */}
        <div className="absolute top-1/2 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#159038]/15 blur-[120px]" />
        <div className="animate-blob absolute top-24 left-10 -z-10 h-64 w-64 rounded-full bg-[#F97316]/15 blur-[100px]" />
        <div className="animate-blob absolute top-40 right-10 -z-10 h-64 w-64 rounded-full bg-[#E6008A]/15 blur-[100px] [animation-delay:4s]" />

        <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
          <div className="animate-fade-up mx-auto max-w-3xl text-center">
            
            {/* Secondary Accent Badge (Empowering Pink / Magenta #E6008A) */}
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#E6008A]/20 bg-[#E6008A]/10 px-4 py-1.5 text-sm font-medium text-[#E6008A]">
              <Sparkles className="size-3.5 text-[#E6008A]" />
              Welcome to PARAS
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-bold tracking-tight text-[#111827] md:text-6xl">
              Build something meaningful with technology.
            </h1>

            <p className="mt-6 text-lg leading-8 text-[#111827]/70">
              We help individuals and businesses build modern, simple, and
              useful digital experiences.
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {/* Primary CTA (Eco Emerald Green #159038 & Hover Forest Green #0F6B2A) */}
              <Link
                href="/services"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full bg-[#159038] px-6 text-white shadow-lg shadow-[#159038]/25 hover:bg-[#0F6B2A]"
                )}
              >
                Explore Services
                <ArrowRight className="size-4" />
              </Link>

              {/* Secondary Outline CTA */}
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full border-[#111827]/20 px-6 text-[#111827] hover:bg-[#111827]/5"
                )}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#111827] md:text-3xl">
            What we do
          </h2>
          <p className="mt-3 text-[#111827]/70">
            A small set of things we focus on, done well.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="group border border-[#111827]/10 bg-white transition-all hover:-translate-y-1 hover:border-[#159038]/40 hover:shadow-xl hover:shadow-[#159038]/10"
            >
              <CardHeader>
                {/* Icon Container with Primary Green accents */}
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-[#159038]/10 text-[#159038] transition-colors group-hover:bg-[#159038] group-hover:text-white">
                  <Icon className="size-5" />
                </div>
                <CardTitle className="text-base text-[#111827]">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#111827]/70">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-[#159038]/20 bg-[#159038]/5 px-8 py-14 text-center">
          <div className="bg-grid bg-radial-fade absolute inset-0 opacity-40" />

          <div className="relative">
            <h2 className="text-2xl font-bold tracking-tight text-[#111827] md:text-3xl">
              Have a project in mind?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#111827]/70">
              Let&apos;s talk about what you&apos;re building and how we can
              help.
            </p>

            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 rounded-full bg-[#159038] px-6 text-white shadow-md hover:bg-[#0F6B2A]"
              )}
            >
              Get in touch
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}