import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const MainBanner = () => {
  return (
    <section
      className="relative isolate overflow-hidden rounded-3xl px-6 py-12 sm:px-10 md:min-h-[390px] md:px-14 md:py-14"
      style={{ backgroundImage: 'radial-gradient(ellipse at 86% 46%, rgba(13, 165, 133, 0.14), transparent 34%), linear-gradient(115deg, #effaf5 0%, #e3f5eb 56%, #d3eee3 100%)' }}
    >
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center md:mx-0 md:max-w-[58%] md:items-start md:text-left">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#09725C]/15 bg-white/75 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#09725C]">
          <span className="h-2 w-2 rounded-full bg-[#0DA585]" /> Fresh picks, delivered
        </span>
        <h1 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-tight text-[#123b31] sm:text-5xl lg:text-[3.5rem]">
          Freshness Served At Your Doorstep
        </h1>
        <p className="mt-4 max-w-md text-sm leading-6 text-[#47665d] sm:text-base">
          Everyday groceries, carefully picked and brought straight to you.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
          <Link to="/products" className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-white transition hover:bg-primary-light">
            Shop now <ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/products" className="inline-flex items-center gap-2 rounded-lg border border-[#09725C]/20 bg-white/65 px-6 py-3 font-medium text-[#09725C] transition hover:bg-white">
            Explore deals <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>

    </section>
  )
}

export default MainBanner
