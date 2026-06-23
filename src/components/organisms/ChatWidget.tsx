'use client';

import { useState, useRef, useEffect } from 'react';
import { chatWithMishAI } from '@/ai/flows/chat-flow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, Sparkles, Bot, User } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'model';
  content: string;
};

/* ── Typewriter hook for chat bubbles ── */
function useTypewriter(text: string, speed = 18, enabled = true) {
  const [displayed, setDisplayed] = useState(enabled ? '' : text);
  const [done, setDone] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text);
      setDone(true);
      return;
    }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, enabled]);

  return { displayed, done };
}

/* ── Single AI message bubble ── */
function ModelBubble({ content, animate }: { content: string; animate: boolean }) {
  const { displayed, done } = useTypewriter(content, 18, animate);
  return (
    <div className="p-4 rounded-3xl shadow-sm text-sm leading-7 whitespace-pre-wrap break-words bg-white dark:bg-gray-900 text-foreground rounded-tl-none border border-border">
      {displayed}
      {!done && (
        <span className="inline-block w-[2px] h-[1em] bg-primary ml-[1px] align-middle animate-pulse" />
      )}
    </div>
  );
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content:
        "Hi! I'm Aoi, Michelle's assistant. I can tell you about her projects, internship experience, technical skills, and development journey. What would you like to know?",
    },
  ]);

  const [animateIndex, setAnimateIndex] = useState<number>(0);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* -------------------------------------------------------------------------- */
  /* ROTATING INTRO TEXT                                                         */
  /* shows to the LEFT of the chat button                                        */
  /* disappears after 2 full cycles (all texts shown twice)                      */
  /* -------------------------------------------------------------------------- */

  const introTexts = [
    "Hi! I'm Aoi 👋",
    "Ask about projects? 🚀",
    "Need help exploring? 🔍",
    "Ask about skills? 💻",
    "Explore journey ✨",
  ];

  const CYCLES = 2;
  const totalShows = introTexts.length * CYCLES; // 10 shows total

  const [currentText, setCurrentText] = useState(0);
  const [visible, setVisible] = useState(true);
  const [pillShown, setPillShown] = useState(true);
  const showCountRef = useRef(0); // how many times we've shown a text

  useEffect(() => {
    if (isOpen || !pillShown) return;

    const interval = setInterval(() => {
      // fade out current text
      setVisible(false);

      setTimeout(() => {
        showCountRef.current += 1;

        // if we've shown all texts for 2 cycles, hide the pill entirely
        if (showCountRef.current >= totalShows) {
          setPillShown(false);
          return;
        }

        setCurrentText((prev) => (prev + 1) % introTexts.length);
        setVisible(true);
      }, 400);
    }, 2800);

    return () => clearInterval(interval);
  }, [isOpen, pillShown]);

  /* -------------------------------------------------------------------------- */
  /* AUTO SCROLL                                                                 */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  /* -------------------------------------------------------------------------- */
  /* SEND MESSAGE                                                                */
  /* -------------------------------------------------------------------------- */

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map((message) => ({
        role: message.role,
        content: [{ text: message.content }],
      }));

      const response = await chatWithMishAI({ history, message: userMessage });

      setMessages((prev) => {
        const next = [...prev, { role: 'model' as const, content: response }];
        const modelMsgs = next.filter((m) => m.role === 'model');
        setAnimateIndex(modelMsgs.length - 1);
        return next;
      });
    } catch (error) {
      setMessages((prev) => {
        const next = [
          ...prev,
          {
            role: 'model' as const,
            content:
              "Sorry, I'm experiencing a technical issue right now. Please try again in a moment.",
          },
        ];
        const modelMsgs = next.filter((m) => m.role === 'model');
        setAnimateIndex(modelMsgs.length - 1);
        return next;
      });
    } finally {
      setIsLoading(false);
    }
  };

  let modelCounter = -1;

  return (
    <div className="fixed bottom-8 right-8 z-[100]">

      {/* ---------------------------------------------------------------- */}
      {/* CHAT WINDOW                                                       */}
      {/* ---------------------------------------------------------------- */}

      {isOpen && (
        <div className="w-[320px] sm:w-[380px] h-[550px] mb-6 flex flex-col overflow-hidden rounded-[2.5rem] border border-primary/20 shadow-2xl glass-card animate-in slide-in-from-bottom-8 duration-500">

          {/* HEADER */}
          <div className="bg-primary text-white p-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-primary bg-green-500 animate-pulse" />
              </div>
              <div>
                <h3 className="font-headline text-xl font-bold leading-none mb-1">
                  Aoi Chatbot
                </h3>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-primary-foreground/70" />
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary-foreground/70">
                    Michelle's Assistant
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl hover:bg-white/20 transition-all active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MESSAGES */}
          <div className="flex-grow overflow-hidden bg-muted/20">
            <ScrollArea className="h-full p-6" ref={scrollRef}>
              <div className="space-y-6">
                {messages.map((message, index) => {
                  if (message.role === 'model') modelCounter++;
                  const thisModelIndex = modelCounter;

                  return (
                    <div
                      key={index}
                      className={cn(
                        'flex gap-3 max-w-[90%]',
                        message.role === 'user'
                          ? 'ml-auto flex-row-reverse'
                          : 'flex-row'
                      )}
                    >
                      <div
                        className={cn(
                          'shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                          message.role === 'user'
                            ? 'bg-primary text-white'
                            : 'bg-white dark:bg-gray-800 border'
                        )}
                      >
                        {message.role === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>

                      {message.role === 'user' ? (
                        <div className="p-4 rounded-3xl shadow-sm text-sm leading-7 whitespace-pre-wrap break-words bg-primary text-white rounded-tr-none">
                          {message.content}
                        </div>
                      ) : (
                        <ModelBubble
                          content={message.content}
                          animate={thisModelIndex === animateIndex}
                        />
                      )}
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex gap-3 max-w-[90%]">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white dark:bg-gray-900 border border-border p-4 rounded-3xl rounded-tl-none flex items-center gap-3">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                        Thinking
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* FOOTER */}
          <div className="p-4 bg-white dark:bg-gray-900 border-t shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-3"
            >
              <div className="relative flex-grow">
                <Input
                  placeholder="Ask about Michelle..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="h-12 rounded-2xl border-none bg-muted/50 pl-4 pr-10 focus-visible:ring-1 focus-visible:ring-primary/30"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Sparkles className="w-4 h-4 text-primary/30" />
                </div>
              </div>
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="w-12 h-12 rounded-2xl shadow-xl shadow-primary/25 transition-transform active:scale-95"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* BOTTOM ROW — pill to the LEFT, button to the RIGHT               */}
      {/* ---------------------------------------------------------------- */}

      <div className="flex items-center gap-3 justify-end">

        {/* INTRO PILL — left of button, hidden when chat open or cycles done */}
        {!isOpen && pillShown && (
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0px) scale(1)' : 'translateX(8px) scale(0.95)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
            }}
          >
            <div className="bg-white dark:bg-gray-900 border border-border shadow-xl rounded-full px-4 py-2.5 flex items-center gap-2 whitespace-nowrap">
              {/* little pulsing dot */}
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
              <p className="text-sm font-medium">
                {introTexts[currentText]}
              </p>
              {/* small arrow pointing right toward the button */}
              <span className="text-muted-foreground text-xs">›</span>
            </div>
          </div>
        )}

        {/* CHAT BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-14 h-14 rounded-[1.75rem] flex items-center justify-center relative group shadow-2xl transition-all duration-500 shrink-0',
            isOpen
              ? 'bg-white text-primary border border-primary/20 rotate-90'
              : 'bg-primary text-white hover:scale-110 active:scale-90'
          )}
        >
          {isOpen ? (
            <X className="w-8 h-8 relative z-10" />
          ) : (
            <div className="relative z-10">
              <Bot className="w-8 h-8" />
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-white/50 animate-pulse" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}