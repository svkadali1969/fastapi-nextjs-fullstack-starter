import type { Metadata } from "next";
import HomeContent from "./HomeContent";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "The Verita — Independent AI Research & Education",
  description: "Independent AI research and education. Advancing AI-literate workforces through independent research and future-ready education.",
  verification: {
    google: "-Wj8apcU5c0URwdDpLn4kM_-UZ4Aj9GTFyLWlWY_rgI",
  },
};

export default async function HomePage() {
  const { data: tickerItems } = await supabase
    .from('ticker_items')
    .select('text')
    .eq('active', true)
    .order('display_order');

  return <HomeContent tickerItems={tickerItems?.map(t => t.text) ?? []} />;
}