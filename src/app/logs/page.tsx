import Link from "next/link";
import { getActivityLogs } from "@/lib/data-service";
import { Badge } from "@/components/atoms/Badge";
import { Calendar, ChevronRight, BookOpen, Sparkles } from "lucide-react";

export const metadata = {
  title: 'Activity Logs | DevLogfolio',
  description: 'Weekly technical logs and learning journals.',
};

export default async function LogsPage() {
  const logs = await getActivityLogs();

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Contextual Header */}
      <header className="mb-12 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-bold mb-6 border border-primary/10">
          <Sparkles className="w-4 h-4" />
          <span>Technical Journal & Learning Milestones</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-headline font-bold mb-6 leading-tight">
          Documenting <span className="text-primary italic">Growth</span> Week by Week.
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          The following logs represent a transparent look into my technical journey. From architectural planning to deep performance audits, these entries capture the iterative process of building modern software.
        </p>
      </header>

      <div className="grid gap-6 max-w-5xl mx-auto">
        {logs.map((log) => (
          <Link
            key={log.slug}
            href={`/logs/${log.slug}`}
            className="group block bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-6 md:p-8 hover:border-primary/30 transition-all hover:shadow-2xl shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-all"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="flex-grow">
                <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                  <div className="p-2 bg-primary/10 rounded-xl text-primary">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">{new Date(log.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
                
                <h2 className="text-2xl font-headline font-bold mb-3 group-hover:text-primary transition-colors">
                  {log.title}
                </h2>
                
                <p className="text-muted-foreground text-base mb-4 max-w-3xl leading-relaxed">
                  {log.summary}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {log.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="px-4 py-1 font-bold text-[10px] uppercase tracking-widest">{tag}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-muted group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Stats Context Footer */}
      <section className="mt-20 p-8 bg-muted/30 rounded-[3rem] border border-border text-center">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-3xl font-headline font-bold text-primary mb-2">14</div>
            <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Weeks Logged</div>
          </div>
          <div>
            <div className="text-3xl font-headline font-bold text-primary mb-2">45+</div>
            <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Key Learnings</div>
          </div>
          <div>
            <div className="text-3xl font-headline font-bold text-primary mb-2">100%</div>
            <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Documented</div>
          </div>
        </div>
      </section>
    </div>
  );
}