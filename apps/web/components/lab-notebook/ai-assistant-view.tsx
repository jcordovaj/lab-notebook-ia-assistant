"use client"

import { useState } from "react"
import { Bot, Send, Sparkles, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hello! I'm your Lab Notebook AI Assistant. I can help you analyze experiments, find patterns, suggest improvements, and answer questions about your research. How can I help you today?",
    timestamp: "Just now",
  },
]

const suggestedPrompts = [
  { icon: Sparkles, text: "Summarize this experiment" },
  { icon: Sparkles, text: "Find similar experiments" },
  { icon: Sparkles, text: "Suggest improvements" },
  { icon: Sparkles, text: "Analyze recent results" },
]

export function AIAssistantView() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: "Just now",
    }

    const assistantMessage: Message = {
      id: messages.length + 2,
      role: "assistant",
      content:
        "I've received your request: \"" +
        input +
        "\". In a fully integrated system, I would analyze your experiments and provide insights based on your data. For now, I can help you brainstorm experimental approaches, discuss methodologies, or answer general research questions.",
      timestamp: "Just now",
    }

    setMessages((currentMessages) => [...currentMessages, userMessage, assistantMessage])
    setInput("")
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="mb-4">
        <h1 className="flex items-center gap-2 text-2xl font-semibold text-foreground">
          <Bot className="h-6 w-6 text-primary" />
          AI Assistant
        </h1>
        <p className="text-muted-foreground">Get AI-powered insights about your experiments</p>
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden border-border/50 shadow-sm">
        <CardContent className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex gap-3", message.role === "user" && "flex-row-reverse")}>
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  message.role === "assistant"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3",
                  message.role === "assistant"
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-primary text-primary-foreground"
                )}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <span className="mt-1 block text-xs opacity-70">{message.timestamp}</span>
              </div>
            </div>
          ))}
        </CardContent>

        {messages.length === 1 && (
          <div className="px-4 pb-2">
            <p className="mb-2 text-xs text-muted-foreground">Suggested prompts:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <Button
                  key={prompt.text}
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 text-xs hover:border-primary/30 hover:bg-accent"
                  onClick={() => setInput(prompt.text)}
                >
                  <prompt.icon className="h-3 w-3 text-primary" />
                  {prompt.text}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-border p-4">
          <form
            onSubmit={(event) => {
              event.preventDefault()
              handleSend()
            }}
            className="flex gap-2"
          >
            <Input
              placeholder="Ask about your experiments..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="flex-1 border-0 bg-secondary"
              aria-label="Ask the AI assistant"
            />
            <Button type="submit" size="icon" disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
