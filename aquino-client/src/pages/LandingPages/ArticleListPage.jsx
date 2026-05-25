import { useEffect, useState } from 'react';
import axios from 'axios';

import Button from '../../components/Button.jsx';
import ArticleList from '../../components/ArticleList.jsx';

const getApiUrl = () => {
  try {
    const meta = Function('return import.meta')();

    return (
      meta?.env?.VITE_API_URL ||
      'http://localhost:8000/api'
    );
  } catch {
    return 'http://localhost:8000/api';
  }
};

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Only show enabled articles
  const visibleArticles = articles.filter(
    (article) =>
      (article.status || 'enabled') === 'enabled'
  );

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `${getApiUrl()}/articles`
        );

        setArticles(data.articles || []);
      } catch (error) {
        console.error(
          'Error fetching articles:',
          error
        );

        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="flex w-full flex-col bg-zinc-50 text-zinc-900">
      {/* Hero Section */}
      <section className="border-b border-zinc-200 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Floral Insights
          </p>

          <h1 className="max-w-5xl text-4xl font-bold leading-[0.95] text-zinc-900 sm:text-5xl lg:text-7xl">
            Learn the art of floral care and design
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-600 sm:text-lg">
            Explore our collection of expert guides,
            from keeping your blooms fresh to
            understanding the hidden meanings behind
            your favorite flowers.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/" variant="primary">
              Back Home
            </Button>

            <Button to="/about">
              View About
            </Button>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="border-t border-zinc-200 bg-[#F8C8DC] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Journal
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Latest from the garden
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-zinc-700">
                Loading articles...
              </p>
            </div>
          ) : visibleArticles.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-zinc-700">
                No articles available
              </p>
            </div>
          ) : (
            <ArticleList articles={visibleArticles} />
          )}
        </div>
      </section>

      {/* Insight Section */}
      <section className="border-t border-zinc-200 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Insight
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Better floral design starts with better care and thoughtful arrangement.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-zinc-600">
              A beautiful floral arrangement is not only about appearance.
              It is also about freshness, balance, color, and how each bloom
              supports the overall design from start to finish.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-3 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1400&q=80"
              alt="Fresh flowers arrangement"
              className="h-[280px] w-full rounded-[1.5rem] object-cover sm:h-[360px] lg:h-[420px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticleListPage;