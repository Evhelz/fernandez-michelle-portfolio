import { getLogBySlug, getActivityLogs } from "@/lib/data-service";
import { Badge } from "@/components/atoms/Badge";
import { notFound } from "next/navigation";
import {
  Calendar,
  ArrowLeft,
  Building,
  Image as ImageIcon,
  Clock,
  Share2,
  Bookmark,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

// ─── Helpers ──────────────────────────────────────────────

function isImageUrl(url: string) {
  return /\.(jpeg|jpg|gif|png|webp|avif|svg)(\?.*)?$/i.test(url);
}

function isCanvaUrl(url: string): boolean {
  return url.startsWith("https://www.canva.com/design/");
}

function getCanvaEmbedUrl(shareUrl: string): string {
  const base = shareUrl.split("?")[0];
  return `${base}?embed`;
}

function parseTechnologies(content: string): string[] {
  const techSection = content.split("## Technologies Used")[1];
  if (!techSection) return [];
  const cleaned = techSection.replace(/^\s*\n\s*-\s*/, "").trim();
  return cleaned.split(",").map((t) => t.trim()).filter(Boolean);
}

// ──────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const logs = await getActivityLogs();
  return logs.map((log) => ({ slug: log.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const log = await getLogBySlug(slug);
  return {
    title: log ? `${log.title} | Michelle T. Fernandez` : "Log Not Found",
    description: log?.summary || "Weekly internship activity log.",
  };
}

export default async function LogEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const log = await getLogBySlug(slug);

  if (!log) notFound();

  const galleryItems = log.gallery || [];
  const imageItems = galleryItems.filter(isImageUrl);
  const canvaItems = galleryItems.filter(isCanvaUrl);

  const contentParts = log.content.split("## Technologies Used");
  const mainContent = contentParts[0];
  const technologies = parseTechnologies(log.content);

  return (
    <article className="relative min-h-screen">
      <div className="container mx-auto px-6 py-14 max-w-3xl">

        {/* ─── Back navigation ─────────────────────────── */}
        <Link
          href="/logs"
          className="group mb-16 flex w-fit items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border group-hover:bg-muted transition-all duration-300 group-hover:-translate-x-0.5">
            <ArrowLeft className="h-3.5 w-3.5" />
          </span>
          <span className="text-xs font-semibold tracking-widest uppercase">
            Back to journal
          </span>
        </Link>

        {/* ─── Header ──────────────────────────────────── */}
        <header className="mb-14">

          {/* Meta strip */}
          <div className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {new Date(log.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>

            {log.company && (
              <>
                <span className="text-muted-foreground select-none">·</span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Building className="h-3 w-3" />
                  {log.company}
                </span>
              </>
            )}

            <span className="text-muted-foreground select-none">·</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <Clock className="h-3 w-3" />
              5 min read
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-7 text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-foreground">
            {log.title}
          </h1>

          {/* Tags */}
          {log.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {log.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-full border border-border bg-muted px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground cursor-default hover:border-primary hover:text-primary transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* ─── Summary ─────────────────────────────────── */}
        <div className="mb-14 relative pl-5">
          <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-primary" />
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-2.5">
            Summary
          </p>
          <p className="text-lg leading-[1.75] text-foreground font-normal">
            {log.summary}
          </p>
        </div>

        {/* ─── Divider ─────────────────────────────────── */}
        <div className="mb-14 h-px bg-border" />

        {/* ─── Main Content ─────────────────────────────── */}
        <div className="mb-14 space-y-6">
          {mainContent.split("\n\n").map((para, i) => {

            if (para.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="!mt-12 mb-3 text-xl font-bold tracking-tight text-foreground"
                >
                  {para.replace("## ", "")}
                </h2>
              );
            }

            if (para.startsWith("- ")) {
              const items = para.split("\n").filter((l) => l.startsWith("- "));
              return (
                <ul key={i} className="space-y-2">
                  {items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-4 rounded-xl border border-border bg-muted/40 px-4 py-3.5 hover:bg-muted transition-colors duration-200"
                    >
                      <span className="mt-0.5 shrink-0 text-[10px] font-bold tabular-nums text-primary select-none w-5 text-right">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] leading-relaxed text-foreground">
                        {item.replace("- ", "")}
                      </span>
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p
                key={i}
                className="text-base leading-[1.85] text-foreground"
              >
                {para}
              </p>
            );
          })}
        </div>

        {/* ─── Technologies Used ────────────────────────── */}
        {technologies.length > 0 && (
          <section className="mb-14">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              Technologies Used
            </p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-border bg-muted px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground cursor-default hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ─── Gallery ─────────────────────────────────── */}
        {galleryItems.length > 0 && (
          <section className="mb-14">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  Gallery
                </p>
              </div>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                {galleryItems.length} {galleryItems.length === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {imageItems.map((imgUrl, index) => (
                <div
                  key={`img-${index}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted"
                >
                  <Image
                    src={imgUrl}
                    alt={`${log.title} image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    loading="lazy"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl" />
                </div>
              ))}

              {canvaItems.map((url, index) => {
                const embedUrl = getCanvaEmbedUrl(url);
                return (
                  <div
                    key={`canva-${index}`}
                    className="group relative aspect-video overflow-hidden rounded-2xl border border-border bg-muted"
                  >
                    <iframe
                      src={embedUrl}
                      className="w-full h-full"
                      allowFullScreen
                      loading="lazy"
                      title={`Module ${index + 1}`}
                    />
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 bg-black/30 transition-all duration-300"
                    >
                      <ExternalLink className="h-5 w-5 text-white" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                        Open Module {index + 1}
                      </span>
                    </a>
                    <span className="absolute top-3 left-3 rounded-full bg-black/60 text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-wider">
                      Module {index + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
