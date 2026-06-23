"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Send, MapPin, Phone, Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const linkedInUrl = "https://www.linkedin.com/in/michelle-fernandez-t?utm_source=share_via&utm_content=profile&utm_medium=member_android";
  const githubUrl = "https://github.com/Evhelz";

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Could not send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-12 text-center max-w-2xl mx-auto">
        <Badge className="mb-4">Get in Touch</Badge>
        <h1 className="text-3xl md:text-4xl font-headline font-bold mb-4">
          Let's build something <span className="text-primary">together</span>.
        </h1>
        <p className="text-muted-foreground text-base">
          Have a question or want to collaborate on a project? I'm always open to discussing new opportunities.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl">
            <h3 className="text-lg font-headline font-bold mb-6">Contact Information</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Email Me</div>
                  <div className="font-bold text-sm break-all">fernandezmichellet@gmail.com</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Location</div>
                  <div className="font-bold text-sm">Philippines</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Phone</div>
                  <div className="font-bold text-sm">+63-967-338-0154</div>
                </div>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t">
              <h4 className="text-xs font-bold mb-4 text-muted-foreground uppercase tracking-widest">Follow My Journey</h4>
              <div className="flex gap-3">
                <Link href={githubUrl} target="_blank" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Github className="w-4 h-4" /></Link>
                <Link href={linkedInUrl} target="_blank" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Linkedin className="w-4 h-4" /></Link>
                {/* Twitter – you can leave or remove */}
                <Link href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Mail className="w-4 h-4" /></Link>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} className="rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Project Inquiry" {...field} className="rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me more about your project..."
                          className="min-h-[130px] rounded-2xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full py-5 rounded-2xl text-base font-bold transition-all shadow-lg shadow-primary/20"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      Sending… <Loader2 className="ml-2 w-5 h-5 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}