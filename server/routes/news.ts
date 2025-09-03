import type { RequestHandler } from "express";

// Minimal RSS item type
interface NewsItem {
  title: string;
  link: string;
  pubDate?: string;
  description?: string;
}

function stripTags(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

function parseRss(xml: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRegex = /<item[\s\S]*?<\/item>/g;
  const titleRegex = /<title>([\s\S]*?)<\/title>/i;
  const linkRegex = /<link>([\s\S]*?)<\/link>/i;
  const pubDateRegex = /<pubDate>([\s\S]*?)<\/pubDate>/i;
  const descRegex = /<description>([\s\S]*?)<\/description>/i;
  const matches = xml.match(itemRegex) || [];
  for (const block of matches.slice(0, 15)) {
    const title = titleRegex.exec(block)?.[1] ?? "Untitled";
    const link = linkRegex.exec(block)?.[1] ?? "";
    const pubDate = pubDateRegex.exec(block)?.[1];
    const description = descRegex.exec(block)?.[1];
    items.push({ title: stripTags(title), link: stripTags(link), pubDate: pubDate?.trim(), description: description ? stripTags(description) : undefined });
  }
  return items;
}

export const handleNews: RequestHandler = async (_req, res) => {
  try {
    const sources = [
      "https://www.reddit.com/r/Economics/.rss",
      "https://www.ft.com/economy?format=rss",
    ];
    let feed: string | null = null;
    for (const url of sources) {
      try {
        const r = await fetch(url, { headers: { "user-agent": "FinSightBot/1.0" } });
        if (r.ok) {
          feed = await r.text();
          break;
        }
      } catch {
        // try next
      }
    }
    if (!feed) return res.json({ items: [] });
    const items = parseRss(feed);
    res.json({ items });
  } catch (e) {
    res.status(500).json({ error: "Failed to load news" });
  }
};
