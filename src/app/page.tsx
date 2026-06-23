'use client';

import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/data-service";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { Badge } from "@/components/atoms/Badge";
import {
  ArrowRight,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  Code2,
  Sparkles,
} from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { Project } from "@/types";

const floatingIcons = [
  { src: "/images/icon/REACT.png",      alt: "React",       top: "8%",   left: "2%",   size: 52, depth: 0.06, delay: "0s",   duration: "6s"  },
  { src: "/images/icon/PHP.png",        alt: "Next.js",     top: "5%",   left: "28%",  size: 44, depth: 0.04, delay: "0.8s", duration: "7s"  },
  { src: "/images/icon/TYPESCRIPT.png", alt: "TypeScript",  top: "14%",  right: "4%",  size: 48, depth: 0.07, delay: "1.2s", duration: "5.5s"},
  { src: "/images/icon/TAILWIND.png",   alt: "Tailwind",    top: "42%",  left: "0%",   size: 46, depth: 0.05, delay: "0.4s", duration: "6.5s"},
  { src: "/images/icon/NODEJS.png",     alt: "Node.js",     top: "40%",  right: "2%",  size: 50, depth: 0.06, delay: "1.6s", duration: "7.5s"},
  { src: "/images/icon/GITHUB.png",     alt: "GitHub",      bottom: "18%", left: "4%", size: 44, depth: 0.04, delay: "2s",   duration: "6s"  },
  { src: "/images/icon/FIREBASE.png",   alt: "Firebase",    bottom: "22%", right: "0%",size: 48, depth: 0.07, delay: "0.6s", duration: "8s"  },
  { src: "/images/icon/MONGODB.png",    alt: "MongoDB",     bottom: "4%",  left: "30%",size: 42, depth: 0.05, delay: "1.8s", duration: "5s"  },
];

const marqueeTechStack = [
  { name: "GitHub", icon: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" },
  { name: "Vercel", icon: "M12 2L2 19.5h20L12 2z" },
  { name: "React", icon: "M14.6 15.2l.1.2-.1.2c-1.6 1-3.4 1.5-5.2 1.5-2.9 0-5.3-1.3-6.8-3.4l-.2-.3.2-.3c1.5-2.1 3.9-3.4 6.8-3.4 1.8 0 3.6.5 5.2 1.5l.1.2-.1.2c.7 1.2 1 2.6 1 4.1s-.3 2.9-1 4.1zM12 4.5c-2.9 0-5.3 1.3-6.8 3.4l-.2.3.2.3C6.7 10.6 9.1 12 12 12c1.8 0 3.6-.5 5.2-1.5l.1-.2-.1-.2c.7-1.2 1-2.6 1-4.1s-.3-2.9-1-4.1l-.1-.2.1-.2C15.6 5 13.8 4.5 12 4.5zm0 .5c1.8 0 3.4.5 4.9 1.4-1.5.9-3.1 1.4-4.9 1.4-1.8 0-3.4-.5-4.9-1.4C8.6 5.5 10.2 5 12 5zm0 7c-1.8 0-3.4.5-4.9 1.4 1.5.9 3.1 1.4 4.9 1.4 1.8 0 3.4-.5 4.9-1.4-1.5-.9-3.1-1.4-4.9-1.4z" },
  { name: "Next.js", icon: "M12 2L2 22h20L12 2z" },
  { name: "Tailwind CSS", icon: "M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" },
  { name: "Figma", icon: "M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5zM12 2h3.5a3.5 3.5 0 110 7H12V2zm-6.5 10A3.5 3.5 0 018.5 9H12v7H8.5A3.5 3.5 0 015.5 12zm9.5 3.5A3.5 3.5 0 1118.5 9H15v7zM8.5 16H12v3.5a3.5 3.5 0 11-7 0c0-1.93 1.57-3.5 3.5-3.5z" },
  { name: "MongoDB", icon: "M12 2c-1.9 0-3.6.9-4.7 2.3L7 4.7C5.2 6.6 4 9.2 4 12s1.2 5.4 3 7.3l.3.4C8.4 21.1 10.1 22 12 22s3.6-.9 4.7-2.3l.3-.4c1.8-1.9 3-4.5 3-7.3s-1.2-5.4-3-7.3l-.3-.4C15.6 2.9 13.9 2 12 2zm0 3c1.3 0 2.5.5 3.4 1.4l.3.3c1.5 1.6 2.3 3.7 2.3 5.3s-.8 3.7-2.3 5.3l-.3.3c-.9.9-2.1 1.4-3.4 1.4s-2.5-.5-3.4-1.4l-.3-.3C6.8 15.7 6 13.6 6 12s.8-3.7 2.3-5.3l.3-.3C9.5 5.5 10.7 5 12 5zm-1.7 3.3l-2 2.3 2 2.3v-1.3h3.4v-2h-3.4v-1.3zm3.4 4.4v1.3h-3.4v2h3.4v1.3l2-2.3-2-2.3z" }
];

const marqueeItems = [...marqueeTechStack, ...marqueeTechStack];

export default function Home() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) / rect.width,
      y: (e.clientY - rect.top - rect.height / 2) / rect.height,
    });
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  useEffect(() => {
    async function loadData() {
      const projects = await getProjects();
      setAllProjects(projects);
    }
    loadData();

    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove as EventListener);
      hero.addEventListener("mouseenter", handleMouseEnter);
      hero.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hero) {
        hero.removeEventListener("mousemove", handleMouseMove as EventListener);
        hero.removeEventListener("mouseenter", handleMouseEnter);
        hero.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [handleMouseMove]);

  const linkedInUrl = "https://www.linkedin.com/in/michelle-fernandez-t?utm_source=share_via&utm_content=profile&utm_medium=member_android";
  const githubUrl = "https://github.com/Evhelz";

  return (
    <div className="flex flex-col gap-10 pb-12 overflow-hidden bg-background relative">
      {/* Background graphics */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(128,128,128,0.07)_1px,transparent_1px)] bg-[length:24px_24px]" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px]" />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float-a {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes float-b {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-16px) rotate(-3deg); }
        }
        @keyframes float-c {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-10px) rotate(2deg); }
          66%       { transform: translateY(-6px) rotate(-2deg); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50%       { opacity: 0.65; transform: scale(1.05); }
        }
        @keyframes ring-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes ring-spin-reverse {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .float-a { animation: float-a var(--dur, 6s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
        .float-b { animation: float-b var(--dur, 7s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
        .float-c { animation: float-c var(--dur, 5.5s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
        .glow-pulse { animation: glow-pulse 4s ease-in-out infinite; }
        .ring-spin  { animation: ring-spin 20s linear infinite; }
        .ring-spin-r { animation: ring-spin-reverse 28s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: hsl(var(--primary) / 0.2); border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: hsl(var(--primary) / 0.5); }
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
        .hero-card-glass {
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow: 0 16px 48px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.18);
        }
        .dark .icon-glass {
          background: rgba(15,15,25,0.55);
          border: 1px solid rgba(255,255,255,0.09);
        }
        .dark .hero-card-glass {
          background: rgba(10,10,20,0.60);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .custom-cursor {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          background: transparent;
          border: 2px solid hsl(var(--primary));
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s, background 0.2s;
        }
        .custom-cursor.hover {
          width: 48px;
          height: 48px;
          background: rgba(var(--primary), 0.1);
        }

        /* ── MOBILE HERO FIX ── */
        @media (max-width: 1023px) {
          .hero-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 2rem !important;
          }
          .hero-text-col {
            order: 1;
            width: 100%;
          }
          .hero-image-col {
            order: 2;
            width: 100%;
            height: 320px !important;
            min-height: unset !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            overflow: visible !important;
            position: relative !important;
          }
        }
      `}</style>

      {isHovering && (
        <div
          className={`custom-cursor ${isHovering ? 'hover' : ''}`}
          style={{ left: cursorPos.x, top: cursorPos.y }}
        />
      )}

      {/* ─── HERO SECTION ─── */}
      <section ref={heroRef} className="relative pt-10 pb-4 overflow-visible flex items-start lg:items-center lg:min-h-[75vh] z-10">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="glow-pulse absolute top-[10%] left-[55%] w-[460px] h-[460px] rounded-full bg-primary/20 blur-[120px]" />
          <div className="glow-pulse absolute top-[30%] left-[60%] w-[300px] h-[300px] rounded-full bg-primary/15 blur-[90px]" style={{ animationDelay: "2s" }} />
          <div className="glow-pulse absolute bottom-[10%] left-[45%] w-[220px] h-[220px] rounded-full bg-primary/10 blur-[80px]" style={{ animationDelay: "1s" }} />
        </div>

        <div className="hero-grid container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-10 items-center relative w-full">
          {/* Text column */}
          <div className="hero-text-col animate-slide-up relative z-10">
            <div className="flex items-center gap-2 mb-5 bg-primary/10 text-primary px-4 py-1.5 rounded-full w-fit border border-primary/20 font-bold text-xs uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Software Developer
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold mb-5 leading-[1.1]">
              Passionate <span className="text-primary italic">Software</span> Developer.
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-7 max-w-xl leading-relaxed">
              I’m Michelle T. Fernandez, a software developer specializing in frontend technologies. I build accessible, high-performance web applications and have a strong interest in SEO and web architecture.
            </p>
            <div className="flex flex-wrap gap-4 mb-7">
              <Link href="#projects" className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center gap-2 group shadow-lg shadow-primary/25 text-sm">
                Explore My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="flex gap-5 items-center text-muted-foreground">
              <Link href={githubUrl} target="_blank" className="hover:text-primary transition-colors"><Github className="w-5 h-5" /></Link>
              <Link href={linkedInUrl} target="_blank" className="hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></Link>
              <Link href="mailto:fernandezmichellet@gmail.com" className="hover:text-primary transition-colors"><Mail className="w-5 h-5" /></Link>
            </div>
          </div>

          {/* Image column */}
          <div className="hero-image-col relative animate-fade-in delay-200 flex items-center justify-center lg:h-[520px]">
            <div className="hidden lg:block absolute top-1/2 left-1/2 w-[460px] h-[460px] rounded-full border border-primary/10 ring-spin pointer-events-none" />
            <div className="hidden lg:block absolute top-1/2 left-1/2 w-[360px] h-[360px] rounded-full border border-dashed border-primary/8 ring-spin-r pointer-events-none" />

            {/* Glow blob — hidden on mobile to avoid unblurred circle artifact */}
            <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] bg-primary/25 rounded-full blur-[70px] pointer-events-none" />

            <div
              className="relative w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px] lg:w-[300px] lg:h-[300px] z-10 rounded-full overflow-hidden"
              style={{
                border: "3px solid rgba(255,255,255,0.18)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.10), inset 0 2px 0 rgba(255,255,255,0.25)",
              }}
            >
              <div className="absolute inset-0 z-10 rounded-full bg-gradient-to-t from-black/20 via-transparent to-white/5 pointer-events-none" />
              <Image src="/images/chibi.png" alt="Michelle T. Fernandez" fill className="object-cover object-top" priority />
            </div>

            {floatingIcons.map((icon, i) => {
              const floatClass = i % 3 === 0 ? "float-a" : i % 3 === 1 ? "float-b" : "float-c";
              const px = mousePos.x * icon.depth * 120;
              const py = mousePos.y * icon.depth * 120;
              const posStyles: React.CSSProperties = {
                position: "absolute",
                ["--delay" as string]: icon.delay,
                ["--dur" as string]: icon.duration,
                transform: `translate(${px}px, ${py}px)`,
                transition: "transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94)",
                zIndex: 20,
              };
              if (icon.top)    posStyles.top = icon.top;
              if (icon.left)   posStyles.left = icon.left;
              if (icon.right)  posStyles.right = icon.right;
              if (icon.bottom) posStyles.bottom = icon.bottom;
              return (
                <div key={icon.alt} style={posStyles} className={floatClass}>
                  <div className="icon-glass rounded-2xl flex items-center justify-center p-2.5 cursor-default" style={{ width: icon.size + 20, height: icon.size + 20 }} title={icon.alt}>
                    <Image src={icon.src} alt={icon.alt} width={icon.size} height={icon.size} className="object-contain drop-shadow-md" />
                  </div>
                </div>
              );
            })}

            <div className="absolute hidden lg:block z-30 float-c" style={{ top: "5%", right: "2%", ["--delay" as string]: "1.5s", ["--dur" as string]: "5.8s", transform: `translate(${mousePos.x * 14}px, ${mousePos.y * 10}px)`, transition: "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)" }}>
              <div className="hero-card-glass rounded-[1.5rem] px-4 py-3 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <div className="text-xs font-bold text-foreground">10+ Technologies</div>
                  <div className="text-[10px] text-muted-foreground">in active use</div>
                </div>
              </div>
            </div>

            <div className="absolute hidden md:block z-30 float-b" style={{ bottom: "6%", right: "-8%", ["--delay" as string]: "1s", ["--dur" as string]: "7s", transform: `translate(${mousePos.x * 22}px, ${mousePos.y * 16}px)`, transition: "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)" }}>
              <div className="hero-card-glass rounded-[1.5rem] p-4 min-w-[160px]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Latest Project</div>
                    <div className="text-sm font-bold text-foreground mt-0.5">FlowState Launch</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK MARQUEE */}
      <section className="py-8 border-y border-gray-100 dark:border-gray-800 bg-white/40 dark:bg-black/40 backdrop-blur-sm overflow-hidden z-10">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center mb-5">Technologies I work with</p>
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white/80 dark:from-black/80 to-transparent"></div>
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white/80 dark:from-black/80 to-transparent"></div>
          <div className="marquee-track flex" style={{ animation: "marquee 25s linear infinite" }}>
            {marqueeItems.map((brand, i) => (
              <div key={i} className="flex items-center gap-2.5 mx-10 flex-shrink-0">
                <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d={brand.icon} />
                </svg>
                <span className="text-gray-400 dark:text-gray-500 font-semibold text-sm whitespace-nowrap">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Projects Gallery ─── */}
      <section id="projects" className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-5">
          <div className="max-w-xl">
            <Badge className="mb-3">Portfolio</Badge>
            <h2 className="text-3xl md:text-4xl font-headline font-bold leading-tight">
              My <span className="text-primary italic">Projects</span>
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
             A selection of my work, including frontend development, SEO audits, and collaborative projects.
            </p>
          </div>
          <Link href="/work" className="px-6 py-2.5 bg-muted hover:bg-primary hover:text-white rounded-xl font-bold transition-all flex items-center gap-2 text-sm">
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project) => (
            <Link href={`/work/${project.slug}`} key={project.id} className="animate-in fade-in slide-in-from-bottom-12 duration-1000 group relative overflow-hidden rounded-3xl block">
              <ProjectCard project={project} />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/60 via-black/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center pointer-events-none">
                <span className="text-white font-bold text-sm">View details →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
