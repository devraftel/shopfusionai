"use client";

import { useState, useEffect } from "react";
import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import { MessageCircle, Bot } from "lucide-react";

import { cn } from "@/lib/utils";
import { Markdown } from "@/components/ui/markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function DialogChat() {
  const [mounted, setMounted] = useState(false);

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bottom-6 absolute right-4 z-50">
      <Sheet>
        <SheetTrigger>
          <MessageCircle className="fill-indigo-950 text-indigo-950 w-12 h-12 hover:scale-110 transition-all duration-300 cursor-pointer hover:animate-out" />
        </SheetTrigger>
        <SheetContent className=" flex flex-col p-0  justify-between">
          {/* Chat Bot Headers */}
          <SheetHeader className="bg-slate-900  px-6 py-4">
            <div className="text-white flex items-start ">
              <Bot className="w-6 h-6 mr-2 flex-shrink-0" size={24} />
              <div>
                <SheetTitle>
                  <h2 className="text-sm text-white">
                    Your AI Shopping Assistant
                  </h2>
                </SheetTitle>
                <SheetDescription>
                  <p className="text-muted-foreground text-xs leading-4 tracking-tighter">
                    Ask me anything about our products. I can choose the best
                    one for you.
                  </p>
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          {/* Chat Form and response */}
          <div className="bg-slate-100/60 stretch px-3 py-2 flex flex-col max-w-md">
            {/* Chat Response & History */}
            <div
              className="whitespace-pre-wrap overflow-y-auto max-h-[700px] my-6"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#4B5563 #111827",
              }}
            >
              <ul className="flex flex-col space-y-1.5">
                {messages.map((m, index) => (
                  <li
                    key={index}
                    className={cn(
                      "flex items-center ",
                      m.role === "user"
                        ? "justify-start flex-row-reverse gap-x-2"
                        : "justify-start gap-x-2"
                    )}
                  >
                    <div className={cn()}>
                      {m.role === "user" ? (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gray-300 w-8 h-8">
                            U
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar className="w-8 h-8">
                          <Bot className="w-8 h-8 mr-2 flex-shrink-0 " />

                          <AvatarFallback className="bg-gray-600 text-white w-6 h-6">
                            AI
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    {/* <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="w-full p-2 my-2 overflow-auto bg-black rounded-lg bg-black/10">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="p-1 rounded-lg bg-black/10"
                          {...props}
                        />
                      ),
                    }}
                    className={cn(
                      "overflow-hidden text-sm leading-7",
                      m.role === "user"
                        ? "text-gray-800 bg-gray-400/30 rounded-lg px-2 py-1"
                        : "text-white bg-slate-900 rounded-lg px-2 py-1"
                    )}
                  >
                    {m.content || ""}
                  </ReactMarkdown> */}
                    <Markdown role={m.role === "user" ? "user" : "ai"}>
                      {m.content || ""}
                    </Markdown>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chat Input Form */}
            <form
              onSubmit={handleSubmit}
              className="flex my-4 items-center fixed- max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
            >
              <Input
                className="h-8 rounded-md flex-grow px-2 py-1 mr-1"
                value={input}
                onChange={handleInputChange}
              />
              <Button size={"sm"} variant={"default"} type="submit">
                Send
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
