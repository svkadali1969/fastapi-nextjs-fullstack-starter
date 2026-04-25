import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "The Verita — Independent AI Research & Education",
  description: "Independent AI research and education. Advancing AI-literate workforces through independent research and future-ready education.",
};

export default function HomePage() {
  return <HomeContent />;
}
