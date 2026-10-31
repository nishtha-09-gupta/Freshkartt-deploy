import React from 'react'
import { BadgeIndianRupee, HeartHandshake, Leaf, Truck } from 'lucide-react'

const features = [
  {
    icon: <Truck size={21} strokeWidth={1.8} aria-hidden="true" />,
    title: 'Fastest Delivery',
    description: 'Groceries delivered in under 30 minutes.',
  },
  {
    icon: <Leaf size={21} strokeWidth={1.8} aria-hidden="true" />,
    title: 'Freshness Guaranteed',
    description: 'Fresh produce straight from the source.',
  },
  {
    icon: <BadgeIndianRupee size={21} strokeWidth={1.8} aria-hidden="true" />,
    title: 'Affordable Prices',
    description: 'Quality groceries at unbeatable prices.',
  },
  {
    icon: <HeartHandshake size={21} strokeWidth={1.8} aria-hidden="true" />,
    title: 'Trusted by Thousands',
    description: 'Loved by 10,000+ happy customers.',
  },
]

const BottomBanner = () => {
  return (
    <section className="relative isolate mt-24 overflow-hidden rounded-3xl bg-[#09725C] px-6 py-10 sm:px-10 md:px-14 md:py-12">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full border-[38px] border-white/[0.06] md:right-[-20px] md:top-[-130px] md:h-[390px] md:w-[390px] md:border-[52px]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-8 max-w-xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#FCD34D]">The FreshKart promise</p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Why We Are the Best?</h2>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon, title, description }) => (
            <div key={title} className="flex items-start gap-3 border-t border-white/20 pt-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#FCD34D]">
                {icon}
              </span>
              <div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-1 text-sm leading-5 text-white/75">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BottomBanner
