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

        const { data } = await axios.get(
          `${getApiUrl()}/articles`
        );

        const articles = data.articles || [];

        console.log('Fetched articles:', articles);
        console.log('Looking for article:', name);

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

        setArticle(null);
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
        <p className="text-zinc-600">
          Loading article...
        </p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-zinc-50 px-4 py-16">
        <div className="w-full max-w-2xl rounded-[1.5rem] border border-zinc-200 bg-white p-10 text-center shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            API Error
          </p>

          <h1 className="mt-4 text-4xl font-bold text-zinc-900 sm:text-5xl">
            Failed to Load Article
          </h1>

          <p className="mt-4 text-base leading-7 text-zinc-600">
            {error}
          </p>

          <p className="mt-4 text-sm text-zinc-500">
            Make sure the server is running at{' '}
            {getApiUrl()}
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Button to="/articles">
              Browse Articles
            </Button>

            <Button to="/">
              Back Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Article Not Found
  if (!article) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-zinc-50 px-4 py-16">
        <div className="w-full max-w-2xl rounded-[1.5rem] border border-zinc-200 bg-white p-10 text-center shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Article Error
          </p>

          <h1 className="mt-4 text-4xl font-bold text-zinc-900 sm:text-5xl">
            Article Not Found
          </h1>

          <p className="mt-4 text-base leading-7 text-zinc-600">
            The article you are trying to access
            does not exist or may have been removed.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Button to="/articles">
              Browse Articles
            </Button>

            <Button to="/">
              Back Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 bg-zinc-50">
      {/* Header */}
      <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4">
            <Button to="/articles">
              ← Back to Articles
            </Button>
          </div>

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            {article.category || 'Article'}
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>

          {article.preview && (
            <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600">
              {article.preview}
            </p>
          )}
        </div>
      </section>

      {/* Article Image */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[1.5rem] border-2 border-zinc-900 bg-white shadow-sm">
            <img
              src={article.image}
              alt={article.title}
              className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px]"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-6">
            {(article.content ||
              article.paragraphs ||
              []
            ).map((paragraph, index) => (
              <p
                key={index}
                className="whitespace-pre-wrap text-base leading-8 text-zinc-700"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer Button */}
          <div className="mt-10 border-t border-zinc-200 pt-6">
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