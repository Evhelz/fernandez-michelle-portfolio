
"use client";

import Link from "next/link";
import { ActivityLog } from "@/types";
import { Badge } from "@/components/atoms/Badge";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";

interface LogCardProps {
  log: ActivityLog;
}

export function LogCard({ log }: LogCardProps) {
  return (
    <Link 
      href={`/logs/${log.slug}`}
      className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-[2rem] hover:border-primary/20 hover:shadow-xl transition-all flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="p-2 bg-primary/10 rounded-xl text-primary">
          <BookOpen className="w-5 h-5" />
        </div>
        <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
          <Calendar className="w-3 h-3" />
          {new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>
      
      <h3 className="text-xl font-headline font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
        {log.title}
      </h3>
      
      <p className="text-muted-foreground text-sm mb-6 line-clamp-2 leading-relaxed">
        {log.summary}
      </p>
      
      <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {log.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="outline" className="text-[10px] px-2 py-0">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="text-primary group-hover:translate-x-1 transition-transform">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
