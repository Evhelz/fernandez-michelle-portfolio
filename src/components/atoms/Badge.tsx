
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'primary', className }: BadgeProps) {
  const variants = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/10 text-secondary border-secondary/20",
    outline: "bg-transparent text-muted-foreground border-border",
  };

  return (
    <span className={cn(
      "px-2 py-1 text-xs font-medium border rounded-full whitespace-nowrap",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
