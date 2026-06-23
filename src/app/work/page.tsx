"use client";

import { useState, useEffect, useMemo } from "react";
import { getProjects, getCategories } from "@/lib/data-service";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { Badge } from "@/components/atoms/Badge";
import {
  Search,
  LayoutGrid,
  Sparkles,
  X,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "@/types";

export default function WorkPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [techFilter, setTechFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);

  const [categories, setCategories] = useState<string[]>(["All"]);

  const allTechStacks = useMemo(() => {
    const stacks = projects.flatMap(p => p.techStack);
    return ["All", ...Array.from(new Set(stacks))].sort();
  }, [projects]);

  useEffect(() => {
    async function loadData() {
      const [proj, cats] = await Promise.all([
        getProjects(),
        getCategories(),
      ]);
      setProjects(proj);
      setCategories(["All", ...cats]);
    }
    loadData();
  }, []);

  // ─── Filtering logic (unchanged) ──────────────────────
  const filteredProjects = projects.filter(p => {
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    const matchesTech = techFilter === "All" || p.techStack.includes(techFilter);
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesTech && matchesSearch;
  });

  const clearFilters = () => {
    setCategoryFilter("All");
    setTechFilter("All");
    setSearchQuery("");
  };

  const hasActiveFilters = categoryFilter !== "All" || techFilter !== "All" || searchQuery !== "";

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <header className="mb-20 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-bold mb-6 border border-primary/10">
          <Sparkles className="w-4 h-4" />
          <span>My Technical Portfolio</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-headline font-bold mb-8 leading-tight">
          Showcasing <span className="text-primary italic">My</span> Work.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Explore my technical journey through specialized audits, frontend architectures, and collaborative projects. Use the filters below to navigate by technology or project type.
        </p>
      </header>

      {/* Control Bar */}
      <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-md py-4 border-y border-border mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search + Tabs */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects, or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
              />
            </div>

            <Tabs value="projects" className="shrink-0">
              <TabsList className="bg-muted p-1 rounded-xl h-auto">
                <TabsTrigger
                  value="projects"
                  className="rounded-lg px-4 py-2 font-bold text-xs flex items-center gap-2
                             text-muted-foreground
                             data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800
                             data-[state=active]:text-primary
                             data-[state=active]:shadow-sm"
                >
                  <LayoutGrid className="w-4 h-4" /> Projects
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="p-2 text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1 text-xs font-bold shrink-0"
              >
                <X className="w-4 h-4" /> Clear
              </button>
            )}
          </div>

          {/* Filter Dropdowns (only when Projects tab active) */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px] h-10 rounded-xl border border-border bg-white dark:bg-gray-800 text-foreground text-xs font-bold uppercase tracking-wider">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  sideOffset={4}
                  className="z-50 bg-white dark:bg-gray-800 border border-border text-foreground"
                >
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat}
                      value={cat}
                      className="text-xs font-bold uppercase text-foreground focus:bg-primary/10 focus:text-foreground data-[state=checked]:bg-primary/10 data-[state=checked]:text-foreground"
                    >
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={techFilter} onValueChange={setTechFilter}>
                <SelectTrigger className="w-[200px] h-10 rounded-xl border border-border bg-white dark:bg-gray-800 text-foreground text-xs font-bold uppercase tracking-wider">
                  <SelectValue placeholder="Tech Stack" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  sideOffset={4}
                  className="z-50 bg-white dark:bg-gray-800 border border-border text-foreground"
                >
                  {allTechStacks.map((tech) => (
                    <SelectItem
                      key={tech}
                      value={tech}
                      className="text-xs font-bold uppercase text-foreground focus:bg-primary/10 focus:text-foreground data-[state=checked]:bg-primary/10 data-[state=checked]:text-foreground"
                    >
                      {tech}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project) => {
              const coverImage =
                project.gallery && project.gallery.length > 0
                  ? project.gallery[0]
                  : project.imageUrl;

              return (
                <div key={project.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <ProjectCard
                    project={{
                      ...project,
                      imageUrl: coverImage,
                    }}
                  />
                </div>
              );
            })}
            {filteredProjects.length === 0 && (
              <div className="col-span-full text-center py-32 bg-muted/20 rounded-[3rem] border-2 border-dashed border-border">
                <p className="text-muted-foreground font-medium">No technical projects match your current filters.</p>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}
