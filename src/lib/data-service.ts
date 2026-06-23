// lib/data-service.ts
import { Project, ActivityLog, TimelineEvent } from '@/types';
import { PlaceHolderImages } from './placeholder-images';

/**
 * Technical service for fetching data-driven content.
 * Uses dynamic imports to avoid Turbopack HMR errors with JSON files.
 */

export async function getProjects(): Promise<Project[]> {
  const module = await import('@/data/projects.json');
  const projectsData: Project[] = module.default;

  return projectsData.map(project => {
    const placeholder = PlaceHolderImages.find(img => img.id === project.imageUrl);
    const resolvedImageUrl = placeholder ? placeholder.imageUrl : project.imageUrl;

    const resolvedGallery = project.gallery?.map(imgId => {
      const phi = PlaceHolderImages.find(p => p.id === imgId);
      return phi ? phi.imageUrl : imgId;
    });

    return {
      ...project,
      imageUrl: resolvedImageUrl,
      gallery: resolvedGallery
    };
  });
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find(p => p.slug === slug);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter(p => p.featured);
}

export async function getCategories(): Promise<string[]> {
  const projects = await getProjects();
  return Array.from(new Set(projects.map(p => p.category)));
}

export async function getActivityLogs(): Promise<ActivityLog[]> {
  const module = await import('@/data/logs.json');
  const logsData: ActivityLog[] = module.default;

  return logsData.map(log => ({
    ...log,
    gallery: log.gallery?.map(imgId =>
      PlaceHolderImages.find(phi => phi.id === imgId)?.imageUrl || imgId
    )
  }));
}

export async function getLogBySlug(slug: string): Promise<ActivityLog | undefined> {
  const logs = await getActivityLogs();
  return logs.find(l => l.slug === slug);
}

export function getTimelineEvents(): TimelineEvent[] {
  return [
    { date: "Week 1", title: "Setup & Research", description: "Project setup, tech stack research and planning.", type: "milestone" },
    { date: "Week 4", title: "SyncSnap UI", description: "Enhancing user interface components for SyncSnap.", type: "learning" },
    { date: "Week 7", title: "Automotive SEO", description: "Regional SEO audits and webpage templates.", type: "release" },
    { date: "Week 8", title: "FlowState Start", description: "Initiating FlowState with MongoDB and Auth.", type: "milestone" },
    { date: "Week 11", title: "Real-time Sync", description: "Socket.IO integration for real-time messaging.", type: "learning" },
    { date: "Week 13", title: "AI Analytics", description: "Gemini AI integration for predictive analytics.", type: "release" }
  ];
}