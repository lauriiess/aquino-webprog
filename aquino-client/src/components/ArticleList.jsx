import { Link } from 'react-router-dom';
import Button from './Button';

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article) => (
        <article key={article.name} className="rounded-3xl bg-zinc-100 p-4">
          <img 
            src={article.image} 
            alt={article.title}
            className="aspect-4/3 w-full rounded-[1.25rem] object-cover"
          />
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
            {article.category || "Article"}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-900">{article.title}</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            {article.content[0].substring(0, 100)}...
          </p>
          <Link to={`/articles/${article.name}`}>
            <Button className="mt-4" variant="primary">
              Read More
            </Button>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;