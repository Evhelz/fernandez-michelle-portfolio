"use client";

import Image from "next/image";
import { Badge } from "@/components/atoms/Badge";
import { ArrowRight, Code2, FileText, Globe, Rocket, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

// Floating icons around the chibi image
const floatingIcons = [
  { src: "/images/icon/REACT.png", alt: "React", top: "8%", left: "-6%", size: 38, depth: 0.06, delay: "0s", duration: "6s" },
  { src: "/images/icon/FIREBASE.png", alt: "Figma", top: "8%", right: "-6%", size: 38, depth: 0.05, delay: "0.8s", duration: "7s" },
  { src: "/images/icon/TYPESCRIPT.png", alt: "TypeScript", bottom: "12%", left: "-4%", size: 36, depth: 0.07, delay: "1.2s", duration: "5.5s" },
  { src: "/images/icon/NODEJS.png", alt: "Node.js", bottom: "12%", right: "-4%", size: 40, depth: 0.04, delay: "0.4s", duration: "6.5s" },
  { src: "/images/icon/TAILWIND.png", alt: "Tailwind", top: "50%", right: "-8%", size: 40, depth: 0.06, delay: "1.6s", duration: "7.5s" },
  { src: "/images/icon/GITHUB.png", alt: "GitHub", top: "50%", left: "-8%", size: 36, depth: 0.05, delay: "2s", duration: "6s" },
];

const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express",
    "MongoDB",
    "Firebase",
    "Tailwind CSS",
    "Figma",
    "Git",
    "GitHub",
    "Vercel",
    "PHP",
    "Java"
  ];

export default function AboutPage() {
  const profileImage = "/images/chibi.png";
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) / rect.width,
      y: (e.clientY - rect.top - rect.height / 2) / rect.height,
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="container mx-auto px-4 py-10">
      <style jsx>{`
        @keyframes float-a {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes float-b {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-12px) rotate(-2deg); }
        }
        @keyframes float-c {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-6px) rotate(1deg); }
          66%       { transform: translateY(-4px) rotate(-1deg); }
        }
        .float-a { animation: float-a var(--dur, 6s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
        .float-b { animation: float-b var(--dur, 7s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
        .float-c { animation: float-c var(--dur, 5.5s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
        .icon-glass {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2);
          transition: transform 0.15s ease, box-shadow 0.2s ease;
        }
        .icon-glass:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.25);
          transform: scale(1.12) !important;
        }
        .dark .icon-glass {
          background: rgba(15,15,25,0.55);
          border: 1px solid rgba(255,255,255,0.09);
        }
      `}</style>

      <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
        {/* Image container with floating icons */}
        <div ref={containerRef} className="relative">
          {/* Background shape */}
          <div className="absolute inset-0 bg-primary/10 rounded-[3rem] -rotate-3 scale-105 -z-10"></div>

          {/* Profile image */}
          <div className="relative aspect-square rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl dark:border-gray-800 z-10">
            <Image
              src={profileImage}
              alt="Michelle T. Fernandez"
              fill
              className="object-cover"
              data-ai-hint="professional portrait"
            />
          </div>

          {/* Floating tech icons */}
          {floatingIcons.map((icon, i) => {
            const floatClass = i % 3 === 0 ? "float-a" : i % 3 === 1 ? "float-b" : "float-c";
            const px = mousePos.x * icon.depth * 50;
            const py = mousePos.y * icon.depth * 50;

            const posStyles: React.CSSProperties = {
              position: "absolute",
              ["--delay" as string]: icon.delay,
              ["--dur" as string]: icon.duration,
              transform: `translate(${px}px, ${py}px)`,
              transition: "transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94)",
              zIndex: 20,
            };
            if (icon.top) posStyles.top = icon.top;
            if (icon.left) posStyles.left = icon.left;
            if (icon.right) posStyles.right = icon.right;
            if (icon.bottom) posStyles.bottom = icon.bottom;

            return (
              <div key={icon.alt} style={posStyles} className={floatClass}>
                <div
                  className="icon-glass rounded-2xl flex items-center justify-center p-2.5"
                  style={{ width: icon.size + 16, height: icon.size + 16 }}
                  title={icon.alt}
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={icon.size}
                    height={icon.size}
                    className="object-contain drop-shadow-md"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Text content */}
        <div>
          <Badge className="mb-4">About Me</Badge>
          <h1 className="text-3xl md:text-4xl font-headline font-bold mb-6 leading-tight">
            I'm <span className="text-primary italic">Michelle</span>, a software developer passionate about building for the modern web.
          </h1>
          <p className="text-base text-muted-foreground mb-4 leading-relaxed">
            I specialize in frontend and backend development, with a focus on creating high-performance, accessible, and user-friendly web applications. I am passionate about the intersection of technology and user experience, and I am always looking for new ways to improve the digital world.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Globe className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm">UI/UX</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm">Frontend Dev</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm">Backend</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <User className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm">Page Creation</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="/resume/portfolio-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all"
            >
              <FileText className="w-5 h-5" /> View My Resume
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/25"
            >
              Let's Collaborate <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <section className="bg-muted/50 rounded-[3rem] p-8 md:p-12 mb-16">
        <h2 className="text-2xl font-headline font-bold mb-8 text-center">Skills & Technologies</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {technologies.map((tech) => (
            <div key={tech} className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-border px-4 py-2 rounded-lg">
              <span className="font-bold text-sm">{tech}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/50 rounded-[3rem] p-8 md:p-12">
        <h2 className="text-2xl font-headline font-bold mb-8 text-center">Certificates</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-headline font-bold">Certificate Name 1</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Issuing Organization
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-headline font-bold">Certificate Name 2</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Issuing Organization
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-headline font-bold">Certificate Name 3</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Issuing Organization
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
