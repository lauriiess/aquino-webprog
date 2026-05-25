import { Link } from 'react-router-dom';
import Button from './Button';

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article
          key={article.slug || article.name}
          className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-sm"
        >
          <img
            src={article.image}
            alt={article.title}
            className="h-56 w-full object-cover"
          />

          <div className="p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              {article.category ||
                `Article ${String(index + 1).padStart(2, '0')}`}
            </p>

            <h3 className="mt-3 text-xl font-bold leading-tight text-zinc-900">
              {article.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-zinc-600">
              {article.preview ||
                article.content?.[0]?.substring(0, 100) + '...' ||
                'No preview available'}
            </p>

            <Link
              to={`/articles/${
                article.slug || article.name
              }`}
            >
              <Button
                className="mt-5"
                variant="primary"
              >
                Read More
              </Button>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;