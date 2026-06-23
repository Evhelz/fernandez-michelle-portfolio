
import { Github, Linkedin, Mail, Twitter, Code2 } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const linkedInUrl = "https://www.linkedin.com/in/michelle-fernandez-t?utm_source=share_via&utm_content=profile&utm_medium=member_android";
  const githubUrl = "https://github.com/Evhelz";

  return (
    <footer className="bg-[#0a0c10] text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 bg-primary rounded-lg">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-headline font-bold text-xl tracking-tight text-white">
                Dev<span className="text-primary">Logfolio</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Michelle T. Fernandez documenting my internship journey, projects and learnings.
            </p>
            <div className="flex gap-4">
              <Link href={githubUrl} target="_blank" className="text-gray-400 hover:text-primary transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </Link>
              <Link href={linkedInUrl} target="_blank" className="text-gray-400 hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="mailto:fernandezmichellet@gmail.com" className="text-gray-400 hover:text-primary transition-colors" aria-label="Email">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-headline font-bold text-lg mb-6">Navigation</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/work" className="hover:text-primary transition-colors">Work</Link></li>
              <li><Link href="/logs" className="hover:text-primary transition-colors">Logs</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-bold text-lg mb-6">Resources</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="/work" className="hover:text-primary transition-colors">Projects</Link></li>
              <li><Link href="/logs" className="hover:text-primary transition-colors">Activity Logs</Link></li>
              <li><Link href="/#timeline" className="hover:text-primary transition-colors">Timeline</Link></li>
              <li><Link href="/#stack" className="hover:text-primary transition-colors">Tech Stack</Link></li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="font-headline font-bold text-lg mb-4">Let's Connect</h3>
            <p className="text-gray-400 text-sm mb-6">Want to work together or have a question? Feel free to reach out to Michelle!</p>
            <Link 
              href="/contact"
              className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
            >
              Contact Me
              <Code2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </Link>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Michelle T. Fernandez. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
