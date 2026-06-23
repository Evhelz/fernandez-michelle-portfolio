
"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { Badge } from "@/components/atoms/Badge";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className="group h-full block">
      <div className="relative bg-white dark:bg-gray-900 border border-border rounded-[3rem] overflow-hidden hover:shadow-[0_32px_64px_-16px_rgba(var(--primary-rgb),0.15)] transition-all duration-700 flex flex-col h-full hover:border-primary/40 p-5">
        
        {/* Card Header Media */}
        <div className="relative h-72 w-full overflow-hidden rounded-[2.5rem] mb-10 bg-muted">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out"
            priority={project.featured}
            data-ai-hint="project showcase"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="absolute top-6 left-6 flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-white/95 dark:bg-gray-900/90 backdrop-blur-md border-transparent shadow-lg px-5 py-2 rounded-2xl text-primary font-bold text-[10px] uppercase tracking-[0.15em]">
              {project.category}
            </Badge>
          </div>

          <div className="absolute bottom-6 right-6 w-12 h-12 bg-white/90 dark:bg-gray-900/90 rounded-2xl flex items-center justify-center translate-y-20 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
             <ArrowUpRight className="w-6 h-6 text-primary" />
          </div>
        </div>
        
        {/* Card Content */}
        <div className="px-4 pb-8 flex flex-col flex-grow">
          <h3 className="text-3xl font-headline font-bold mb-5 group-hover:text-primary transition-colors leading-tight">
            {project.title}
          </h3>
          
          <p className="text-muted-foreground text-base mb-10 leading-relaxed line-clamp-3">
            {project.description}
          </p>
          
          <div className="mt-auto flex items-center justify-between pt-6 border-t border-muted">
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 2).map(tech => (
                <span key={tech} className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
               Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
