import { connectToDatabase } from "@/app/lib/mongoDB";
import Article from "@/app/models/article.schema";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDatabase();

    const articles = await Article.find().sort({ createdAt: -1 }).lean();

    const result = articles.map(({ _id, title, slug, meta }) => ({
      id: _id.toString(),
      title,
      slug,
      description: meta?.description || "",
    }));

    return NextResponse.json(result); // returns an array of all articles
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
