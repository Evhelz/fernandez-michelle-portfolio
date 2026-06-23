import { getProjectBySlug, getProjects, getActivityLogs } from "@/lib/data-service";
import { Badge } from "@/components/atoms/Badge";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, ArrowRight, BookOpen, Terminal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { LogCard } from "@/components/molecules/LogCard";

export async function generateStaticParams() {
  const projects = await getProjects();                // ← await added
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);        // ← await added

  return {
    title: project ? `${project.title} | Technical Case Study` : 'Project Not Found',
    description: project?.description || 'Details of technical internship project.',
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);        // ← await added

  if (!project) {
    notFound();
  }

  const allLogs = await getActivityLogs();
  const relatedLogs = allLogs.filter(log => project.relatedLogs?.includes(log.slug));

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      {/* Back link */}
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to archive
      </Link>

      {/* HEADER + COVER */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start mb-14">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant="secondary" className="px-4 py-1.5 rounded-xl text-primary font-bold bg-primary/10 border-primary/20 text-xs uppercase tracking-widest">
              {project.category}
            </Badge>
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-widest">
              <Calendar className="w-4 h-4" />
              <span>{project.completionDate.split('-')[0]}</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6 leading-[1.1]">
            {project.title}
          </h1>
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-primary rounded-full"></div>
            <p className="text-lg text-muted-foreground leading-relaxed font-headline italic pl-4">
              {project.description}
            </p>
          </div>
        </div>

        {project.imageUrl && (
          <div className="relative group w-full lg:w-[300px] xl:w-[360px] shrink-0">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-[6px] border-white dark:border-gray-800 shadow-xl transition-transform duration-500 group-hover:scale-[1.02] bg-muted">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        )}
      </section>

      {/* PROJECT OVERVIEW */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-1.5 bg-primary text-white rounded-lg shadow-md">
            <Terminal className="w-4 h-4" />
          </div>
          <h2 className="text-2xl font-headline font-bold">Project Overview</h2>
        </div>
        <div className="text-foreground/80 leading-relaxed text-base bg-muted/30 p-6 rounded-2xl border border-border">
          {project.fullDescription || project.description}
        </div>
      </section>

      {/* TECH STACK */}
      <section className="mb-14">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-4">
          Engineering Stack
        </h2>
        <div className="flex flex-wrap gap-3">
          {project.techStack.map(tech => (
            <div key={tech} className="px-4 py-2 bg-white dark:bg-gray-900 rounded-xl text-sm font-semibold border border-border shadow-sm hover:border-primary/40 transition-all hover:-translate-y-0.5">
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* SECONDARY GALLERY */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="mb-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {project.gallery.map((imgUrl, index) => (
              <div key={index} className="group relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white dark:border-gray-800 shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg bg-muted">
                  <Image
                    src={imgUrl}
                    alt={`${project.title} gallery ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RELATED LOGS */}
      {relatedLogs.length > 0 && (
        <section className="border-t border-muted pt-12 pb-8 mt-14">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <div className="flex items-center gap-2 text-primary mb-3">
                <BookOpen className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-[0.3em]">Documentation</span>
              </div>
              <h2 className="text-3xl font-headline font-bold">Weekly Build Logs</h2>
              <p className="text-muted-foreground mt-2 text-base">Detailed documentation tracing the lifecycle of this project.</p>
            </div>
            <Link href="/logs" className="px-6 py-2 bg-muted hover:bg-primary hover:text-white rounded-xl font-bold transition-all flex items-center gap-2 text-sm shadow-sm">
              View Journal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedLogs.map((log) => (
              <LogCard key={log.slug} log={log} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}