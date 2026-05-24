"use client";

import { useState } from "react";

import { useShoppingStore } from "@/lib/store";

type ChatPanelProps = {
  quickPrompts: string[];
};

export function ChatPanel({ quickPrompts }: ChatPanelProps) {
  const [input, setInput] = useState("");
  const messages = useShoppingStore((state) => state.messages);
  const sendMessage = useShoppingStore((state) => state.sendMessage);

  const submit = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return;
    }

    sendMessage(trimmed);
    setInput("");
  };

  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-lg text-[var(--primary)]">
          AI
        </div>
        <div className="flex-1">
          <p className="text-sm text-zinc-500">对话入口</p>
          <h2 className="text-lg font-semibold text-zinc-900">直接提问，系统会为你生成答案</h2>
          <p className="mt-1 text-sm leading-6 text-zinc-600">
            你可以输入家庭采购需求、预算、适用人群或补货场景，系统会生成对应建议。
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3 rounded-3xl bg-zinc-50 p-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[88%] rounded-2xl px-3 py-2.5 text-sm leading-6 ${
              message.role === "assistant"
                ? "bg-white text-zinc-700"
                : "ml-auto bg-[var(--foreground)] text-white"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              submit(input);
            }
          }}
          placeholder="例如：帮三口之家补一周日用品"
          className="flex-1 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)]"
        />
        <button
          onClick={() => submit(input)}
          className="rounded-2xl bg-[var(--foreground)] px-4 py-3 text-sm font-medium text-white"
        >
          发送提问
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button className="rounded-2xl bg-[var(--primary-soft)] px-4 py-3 text-sm font-medium text-[var(--primary)]">
          语音输入
        </button>
        <button className="rounded-2xl bg-[var(--primary-soft)] px-4 py-3 text-sm font-medium text-[var(--primary)]">
          拍照提问
        </button>
      </div>


      <div className="mt-4 grid gap-2">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => submit(prompt)}
            className="rounded-2xl border border-[var(--line)] bg-zinc-50 px-3 py-3 text-left text-sm text-zinc-700 transition hover:bg-white"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
