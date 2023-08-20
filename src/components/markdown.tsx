import React, { FC, memo } from "react";
import ReactMarkdown from "react-markdown";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import { cn } from "@/lib/utils";

interface MarkdownProps extends ReactMarkdownOptions {
  role?: "user" | "ai";
}

const Markdown: FC<MarkdownProps> = memo(({ role, children, ...props }) => (
  <ReactMarkdown
    components={{
      pre: ({ node, ...innerProps }) => (
        <div className="w-full p-2 my-2 overflow-auto bg-black rounded-lg bg-black/10">
          <pre {...innerProps} />
        </div>
      ),
      code: ({ node, ...innerProps }) => (
        <code className="p-1 rounded-lg bg-black/10" {...innerProps} />
      ),
    }}
    className={cn(
      "overflow-hidden text-sm leading-7",
      role === "user"
        ? "text-gray-800 bg-gray-400/30 rounded-lg px-2 py-1"
        : "text-white bg-slate-900 rounded-lg px-2 py-1"
    )}
    {...props}
  >
    {children || ""}
  </ReactMarkdown>
));

export { Markdown };
