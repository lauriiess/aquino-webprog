import Button from '../components/Button';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Hero Section */}
      <section className=" px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Handcrafted Florals
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Blossom & Vine: Nature’s Art, Curated for You
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              From seasonal bouquets to bespoke event styling, we bring the garden to your doorstep with elegance and sustainable sourcing.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">
                Shop the Collection
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-pink-200 bg-[#F7D4BC] p-6">
            <img 
              src="https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com//content/d5/ca/9600252644399075979acf20df7e/how-to-arrange-flowers-like-a-pro-hero.jpg" 
              alt="Flower arrangement"
              className="min-h-65 w-full rounded-[1.25rem] bg-zinc-200 object-cover" 
            />
          </div>
        </div>
      </section>

      {/* KPI Section */}
      <section className=" bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Our Impact
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Grown with Love
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl  bg-[#F7D4BC] p-5">
            <p className="text-2xl font-bold text-zinc-900">12</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Organic
            </p>
          </div>

          <div className="rounded-3xl bg-[#F7D4BC] p-5">
            <p className="text-2xl font-bold text-zinc-900">08</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Local Farms
            </p>
          </div>

          <div className="rounded-3xl bg-[#F7D4BC] p-5">
            <p className="text-2xl font-bold text-zinc-900">24</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Deliveries
            </p>
          </div>

          <div className="rounded-3xl bg-[#F7D4BC] p-5">
            <p className="text-2xl font-bold text-zinc-900">04</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Floral Workshops
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className=" bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Services
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Featured Collection
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl bg-[#F7D4BC] p-4">
            <img 
              src="https://i.pinimg.com/736x/55/72/19/5572195c7ce3f507aa083aa06d50c325.jpg" 
              alt="Seasonal Bouquets"
              className="aspect-4/3 w-full rounded-[1.25rem] bg-zinc-200 object-cover" 
            />
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Seasonal Bouquets
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Carefully selected blooms that celebrate the unique beauty of the current season.
            </p>
            <Button className="mt-4" variant="primary">
              View Selection
            </Button>
          </article>

          <article className="rounded-3xl bg-[#F7D4BC] p-4">
            <img 
              src="https://i.etsystatic.com/30793077/r/il/04a2e3/6572266277/il_570xN.6572266277_4efc.jpg" 
              alt="Wedding Florals"
              className="aspect-4/3 w-full rounded-[1.25rem] bg-zinc-200 object-cover" 
            />
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Wedding Florals
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Transforming your special day into a floral wonderland with bespoke styling.
            </p>
            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>

          <article className="rounded-3xl bg-[#F7D4BC] p-4">
            <img 
              src="https://www.marthastewart.com/thmb/wF6p3r7ipQJBWbPyi8gaT-yewZA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/grocery-store-flowers-to-florist-worthy-bouquet-0123-2000-e0c234439ff24c7da57e5775d84329b2.jpg" 
              alt="Flower Care"
              className="aspect-4/3 w-full rounded-[1.25rem] bg-zinc-200 object-cover" 
            />
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Flower Care
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
                Expert tips and products to keep your blooms fresh and vibrant for longer.
            </p>
            <Button className="mt-4" variant="primary">
              View More
            </Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;