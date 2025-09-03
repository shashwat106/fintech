import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface NewsItem { title: string; link: string; pubDate?: string; description?: string }

export default function NewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/news");
        const data = await r.json();
        setItems(Array.isArray(data.items) ? data.items : []);
      } catch (e) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="container py-12">
      <h1 className="text-3xl font-bold mb-4">Economics News</h1>
      {loading && <p className="text-sm text-muted-foreground">Loading...</p>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((n, i) => (
          <a key={i} href={n.link} target="_blank" rel="noreferrer">
            <Card className="rounded-xl hover:shadow-md transition-shadow h-full">
              <CardContent className="p-5">
                <div className="text-sm text-muted-foreground">{n.pubDate ? new Date(n.pubDate).toLocaleString() : ""}</div>
                <h3 className="mt-1 font-semibold leading-snug">{n.title}</h3>
                {n.description && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{n.description}</p>
                )}
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
      {!loading && items.length === 0 && (
        <p className="text-sm text-muted-foreground">No news available right now.</p>
      )}
    </section>
  );
}
