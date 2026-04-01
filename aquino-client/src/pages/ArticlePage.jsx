import Button from '../components/Button';

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="  px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
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

      <section className=" bg-[#F7D4BC] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Journal
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Latest from the garden
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl bg-zinc-100 p-4">
            <img 
              src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=600" 
              alt="Hydrangeas"
              className="aspect-4/3 w-full rounded-[1.25rem] object-cover"
            />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Care Guide
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Longevity secrets
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Simple steps to double the lifespan of your fresh cut flower arrangements.
            </p>
            <Button className="mt-4" variant="primary">Read More</Button>
          </article>

          <article className="rounded-3xl bg-zinc-100 p-4">
            <img 
              src="https://bouqs.com/blog/wp-content/uploads/2023/06/Untitled-design-1-1080x608.jpg" 
              alt="Floral Design"
              className="aspect-4/3 w-full rounded-[1.25rem] object-cover"
            />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Design
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Color theory in blooms
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              How to pick complementary colors for a balanced and striking bouquet.
            </p>
            <Button className="mt-4" variant="primary">Read More</Button>
          </article>

          <article className="rounded-3xl bg-zinc-100 p-4">
            <img 
              src="https://bouqs.com/blog/wp-content/uploads/2022/03/shutterstock_260182148-min.jpg" 
              alt="Spring Flowers"
              className="aspect-4/3 w-full rounded-[1.25rem] object-cover"
            />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Seasonal
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Spring's best arrivals
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A look at the rarest and most beautiful bulbs blooming this season.
            </p>
            <Button className="mt-4" variant="primary">Read More</Button>
          </article>

          <article className="rounded-3xl bg-zinc-100 p-4">
            <img 
              src="https://gilmour.com/wp-content/uploads/2019/06/Planting-Spring-Flowers.jpg" 
              alt="Sustainable farming"
              className="aspect-4/3 w-full rounded-[1.25rem] object-cover"
            />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Environment
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Sourcing sustainably
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Why we partner with local organic farms to reduce our carbon footprint.
            </p>
            <Button className="mt-4" variant="primary">Read More</Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;