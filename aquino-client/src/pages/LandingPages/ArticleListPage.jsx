import Button from '../../components/Button.jsx';
import ArticleList from '../../components/ArticleList.jsx';
import articles from '../../data/article-content.js';

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 ">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Floral Insights
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Learn the art of floral care and design
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Explore our collection of expert guides, from keeping your blooms fresh to 
          understanding the hidden meanings behind your favorite flowers.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="bg-[#F8C8DC] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Journal
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Latest from the garden
          </h2>
        </div>

        <ArticleList articles={articles} />
      </section>
    </div>
  );
};

export default ArticleListPage;