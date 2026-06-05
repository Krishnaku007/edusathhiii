"use client";

import { useState } from "react";
import { ChatMessage, SupportedLanguage } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { VoiceControls } from "@/components/features/voice/voice-controls";

export function ChatWindow({ language }: { language: SupportedLanguage }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (messageText = input) => {
    if (!messageText.trim()) {
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: messageText,
      language,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: messageText, language }),
    });

    const data = (await res.json()) as { answer: string };

    const botMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: data.answer,
      language,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Learning Assistant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-[420px] space-y-3 overflow-y-auto rounded-xl border bg-surface-2 p-3">
          {messages.length === 0 ? (
            <p className="text-sm text-muted">Try asking: What is photosynthesis?</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  msg.role === "user" ? "ml-auto bg-brand text-white" : "bg-white"
                }`}
              >
                {msg.content}
              </div>
            ))
          )}
        </div>

        <Textarea
          placeholder="Type your question..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => sendMessage()} disabled={loading}>
            {loading ? "Thinking..." : "Ask AI"}
          </Button>
          <VoiceControls onTranscript={sendMessage} textToRead={messages.at(-1)?.content} />
        </div>
      </CardContent>
    </Card>
  );
}
