import Button from '../../components/Button';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Hero Section */}
      <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl bg-[#F8C8DC] p-6">
            <img 
              src="https://d2nnykqiaju69u.cloudfront.net/photos/2023%20flower%20farms%20Philippines.jpg" 
              alt="Flower Farms"
              className="min-h-72 w-full rounded-[1.25rem] object-cover"
            />
          </div>
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Our Story
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Bringing nature's finest blooms straight to your doorstep.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Since our founding, we've been dedicated to the art of floral design. We believe 
              every bouquet tells a story, crafted with passion and the freshest seasonal 
              flowers from local sustainable farms.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Shop Bouquets
              </Button>
              <Button to="/floral-care">Floral Care Tips</Button>
            </div>
          </div>
        </div>
      </section>

      <section className=" bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-zinc-500">
            Shop Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Rooted in Excellence</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-[#F8C8DC] p-5">
            <p className="text-2xl font-bold text-zinc-900">12</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Years in Bloom
            </p>
          </div>
          <div className="rounded-3xl bg-[#F8C8DC] p-5">
            <p className="text-2xl font-bold text-zinc-900">50k+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Bouquets Delivered
            </p>
          </div>
          <div className="rounded-3xl bg-[#F8C8DC] p-5">
            <p className="text-2xl font-bold text-zinc-900">100%</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Freshness Guarantee
            </p>
          </div>
          <div className="rounded-3xl bg-[#F8C8DC] p-5">
            <p className="text-2xl font-bold text-zinc-900">24</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Local Growers
            </p>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Our Services
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Crafting Moments</h2>
            <div className="mt-6 space-y-4">
              <article className="rounded-3xl bg-[#F8C8DC] p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Custom Arrangements</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Work with our lead florists to create a unique piece that perfectly captures 
                  the emotion of your special occasion.
                </p>
              </article>
              <article className="rounded-3xl bg-[#F8C8DC] p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Wedding Florals</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  From bridal bouquets to venue installations, we bring your dream wedding 
                  vision to life with stunning floral displays.
                </p>
              </article>
              <article className="rounded-3xl bg-[#F8C8DC] p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Subscription Box</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Keep your home or office vibrant with our weekly or monthly seasonal flower 
                  subscription services.
                </p>
              </article>
            </div>
          </div>
          <div className="rounded-3xl bg-[#F8C8DC] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Seasonal Gallery
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <img 
                src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=400" 
                alt="Spring Roses"
                className="aspect-square rounded-[1.25rem] object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400" 
                alt="Tulips"
                className="aspect-square rounded-[1.25rem] object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1596199050105-6d5d32222916?auto=format&fit=crop&q=80&w=400" 
                alt="Sunflowers"
                className="aspect-square rounded-[1.25rem] object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=400" 
                alt="Wildflowers"
                className="aspect-square rounded-[1.25rem] object-cover"
              />
            </div>
            <Button to="/view" className="mt-5 w-full">View Full Gallery</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;