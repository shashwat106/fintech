import { StockExplorer } from "@/components/finance/StockExplorer";

export default function StocksPage() {
  return (
    <section className="container py-12">
      <h1 className="text-3xl font-bold mb-4">Stock Explorer</h1>
      <StockExplorer />
    </section>
  );
}
