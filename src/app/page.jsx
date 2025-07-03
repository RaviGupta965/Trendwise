'use client'

import { useEffect, useState } from "react";
import RefreshFeedButton from "./components/RefreshFeed_button";
import ArticleList from "@/app/components/ArticleList";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/article", { cache: "no-store" });
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <main className="px-4 py-20 mx-auto min-h-screen bg-[#0a192f]">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#0ef] tracking-tight">
        🔥 Trending Articles
      </h1>
      <div className="flex justify-center mb-6">
        <RefreshFeedButton onClick={fetchArticles} />
      </div>
      {loading ? (
        <p className="text-white text-center">Loading articles...</p>
      ) : (
        <ArticleList articles={articles} />
      )}
    </main>
  );
}