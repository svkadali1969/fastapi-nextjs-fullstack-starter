import type { Metadata } from "next";
import ChatPage from "./ChatPage";

export const metadata: Metadata = {
  title: "Chat Verita — The Verita Research Agent",
  description: "Ask The Verita's AI research agent about our work, programs, and how we can help your organization navigate the AI era.",
};

export default function Chat() {
  return <ChatPage />;
}