"use client";

import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import { Markdown } from "./markdown";

export default function Chat() {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
  });

  return (
    <div>
      <ul>
        {messages.map((m, index) => (
          <li key={index}>
            <div className={m.role}>{m.role === "user" ? "User:" : "AI:"}</div>
            <ReactMarkdown
              components={{
                pre: ({ node, ...props }) => (
                  <div className="w-full p-2 my-2 overflow-auto bg-black rounded-lg bg-black/10">
                    <pre {...props} />
                  </div>
                ),
                code: ({ node, ...props }) => (
                  <code className="p-1 rounded-lg bg-black/10" {...props} />
                ),
              }}
              className="overflow-hidden text-sm leading-7"
            >
              {m.content || ""}
            </ReactMarkdown>
            {/* <Markdown>{m.content}</Markdown> */}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label>
          <input value={input} onChange={handleInputChange} />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
