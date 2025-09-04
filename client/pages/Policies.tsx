import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, AlertCircle, Info } from "lucide-react";

interface PolicyCategory {
  id: string;
  title: string;
  description: string;
  policyCount: number;
}

interface Policy {
  name: string;
  description: string;
  impact: string;
  currentStatus: string;
}

interface PolicyDetail {
  id: string;
  title: string;
  description: string;
  policies: Policy[];
}

export default function PoliciesPage() {
  const [categories, setCategories] = useState<PolicyCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PolicyDetail | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/policies/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
    setLoading(false);
  };

  const fetchCategoryDetails = async (categoryId: string) => {
    try {
      const response = await fetch(`/api/policies/categories/${categoryId}`);
      const data = await response.json();
      setSelectedCategory(data);
    } catch (error) {
      console.error('Failed to fetch category details:', error);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`/api/policies/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Failed to search policies:', error);
    }
  };

  const getPolicyTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'monetary-policy':
        return <TrendingUp className="h-5 w-5 text-blue-600" />;
      case 'fiscal-policy':
        return <AlertCircle className="h-5 w-5 text-green-600" />;
      case 'trade-policy':
        return <Info className="h-5 w-5 text-purple-600" />;
      default:
        return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <section className="container py-12">
        <h1 className="text-3xl font-bold mb-4">US Economic Policies</h1>
        <p className="text-sm text-muted-foreground">Loading policies...</p>
      </section>
    );
  }

  return (
    <section className="container py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">US Economic Policy Explainer</h1>
          <p className="text-muted-foreground mb-6">
            Understand how government policies affect your personal finances and the broader economy.
          </p>
          
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search policies, topics, or impacts..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
              }}
            />
          </div>
        </div>

        {searchQuery && searchResults.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Search Results</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {searchResults.map((result: any, i) => (
                <Card key={i} className="rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => fetchCategoryDetails(result.categoryId)}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {getPolicyTypeIcon(result.categoryId)}
                      <Badge variant="secondary">{result.categoryTitle}</Badge>
                    </div>
                    <h3 className="font-semibold">{result.match}</h3>
                    {result.policy && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {result.policy.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!selectedCategory ? (
          <div>
            <h2 className="text-xl font-semibold mb-6">Policy Categories</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Card key={category.id} 
                      className="rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => fetchCategoryDetails(category.id)}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      {getPolicyTypeIcon(category.id)}
                      <h3 className="font-semibold">{category.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{category.policyCount} policies</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <button 
                onClick={() => setSelectedCategory(null)}
                className="text-primary hover:underline mb-4">
                ← Back to Categories
              </button>
              <div className="flex items-center gap-3 mb-4">
                {getPolicyTypeIcon(selectedCategory.id)}
                <h2 className="text-2xl font-bold">{selectedCategory.title}</h2>
              </div>
              <p className="text-muted-foreground">{selectedCategory.description}</p>
            </div>
            
            <div className="space-y-6">
              {selectedCategory.policies.map((policy, i) => (
                <Card key={i} className="rounded-xl">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">{policy.name}</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">WHAT IT IS</h4>
                        <p className="text-sm">{policy.description}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">IMPACT ON YOU</h4>
                        <p className="text-sm">{policy.impact}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">CURRENT STATUS</h4>
                        <p className="text-sm">{policy.currentStatus}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}