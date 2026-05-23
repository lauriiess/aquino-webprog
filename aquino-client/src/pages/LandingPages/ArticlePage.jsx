import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button.jsx';

const getApiUrl = () => {
  try {
    const meta = Function('return import.meta')();
    return meta?.env?.VITE_API_URL || 'http://localhost:8000/api';
  } catch {
    return 'http://localhost:8000/api';
  }
};

function ArticlePage() {
  const { name } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all articles
        const { data } = await axios.get(
          `${getApiUrl()}/articles`
        );

        const articles = data.articles || [];

        // Find article by slug/name
        const foundArticle = articles.find(
          (article) =>
            article.slug === name ||
            article.name === name
        );

        setArticle(foundArticle || null);
      } catch (err) {
        console.error('Error fetching article:', err);

        setError(
          err.response?.data?.message ||
            err.message ||
            'Failed to fetch article'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [name]);

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-zinc-50 px-4 py-16">
        <p className="text-zinc-600">Loading article...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-zinc-50 px-4 py-16">
        <div className="max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-zinc-900">
            Failed to Load Article
          </h1>

          <p className="mt-4 text-zinc-600">
            {error}
          </p>

          <div className="mt-6">
            <Button to="/articles">
              Back to Articles
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Article Not Found
  if (!article) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-zinc-900">
              Article not found
            </h1>

            <Button to="/articles" className="mt-6">
              Back to Articles
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header */}
      <section className="bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4">
            <Button to="/articles">
              Back to Articles
            </Button>
          </div>

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            {article.category || 'Article'}
          </p>

          <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Article Image */}
          <div className="mb-8 overflow-hidden rounded-[1.25rem] border-2 border-zinc-900">
            <img
              src={article.image}
              alt={article.title}
              className="aspect-video w-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-sm max-w-none space-y-4 text-zinc-700">
            {(article.content || article.paragraphs || []).map(
              (paragraph, index) => (
                <p
                  key={index}
                  className="whitespace-pre-wrap text-base leading-7 text-zinc-700"
                >
                  {paragraph}
                </p>
              )
            )}
          </div>

          {/* Footer Button */}
          <div className="mt-8 pt-6">
            <Button to="/articles">
              Back to Articles
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;