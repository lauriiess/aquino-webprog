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
    <div className="flex w-full flex-col gap-6">
      {/* Hero Section */}
      <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Floral Insights
        </p>

        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Learn the art of floral care and design
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Explore our collection of expert guides,
          from keeping your blooms fresh to
          understanding the hidden meanings behind
          your favorite flowers.
        </p>

        <div className="mt-6">
          <Button to="/">
            Back Home
          </Button>
        </div>
      </section>

      {/* Articles Section */}
      <section className="bg-[#F8C8DC] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Journal
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
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
      </section>
    </div>
  );
};

export default ArticleListPage;