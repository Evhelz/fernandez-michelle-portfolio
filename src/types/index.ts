
export type Category = 'SEO Audit' | 'Frontend' | 'Research' | 'Technical Writing' | 'DevOps';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  techStack: string[];
  completionDate: string;
  category: Category;
  imageUrl: string;
  gallery?: string[];
  featured?: boolean;
  relatedLogs?: string[]; // Array of log slugs
}

export interface ActivityLog {
  title: string;
  slug: string;
  date: string;
  summary: string;
  content: string;
  tags: string[];
  author?: string;
  company?: string;
  featured?: boolean;
  gallery?: string[];
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: 'milestone' | 'learning' | 'release';
}
