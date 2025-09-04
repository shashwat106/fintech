import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface NewsItem { title: string; link: string; pubDate?: string; description?: string }

export default function NewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

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
          <Card key={i} className="rounded-xl hover:shadow-md transition-shadow h-full cursor-pointer" onClick={() => setSelectedArticle(n)}>
            <CardContent className="p-5">
              <div className="text-sm text-muted-foreground">{n.pubDate ? new Date(n.pubDate).toLocaleString() : ""}</div>
              <h3 className="mt-1 font-semibold leading-snug hover:text-primary transition-colors">{n.title}</h3>
              {n.description && (
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{n.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {!loading && items.length === 0 && (
        <p className="text-sm text-muted-foreground">No news available right now.</p>
      )}
      
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedArticle(null)}>
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="text-sm text-muted-foreground">{selectedArticle.pubDate ? new Date(selectedArticle.pubDate).toLocaleString() : ""}</div>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="text-gray-500 hover:text-gray-700 text-xl font-semibold"
                >
                  ×
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-4">{selectedArticle.title}</h2>
              {selectedArticle.description && (
                <p className="text-muted-foreground mb-4">{selectedArticle.description}</p>
              )}
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground mb-2">Full article available at source:</p>
                <a 
                  href={selectedArticle.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-primary hover:underline text-sm break-all"
                >
                  {selectedArticle.link}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
