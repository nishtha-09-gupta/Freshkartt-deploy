import React from 'react'
import { ArrowRight, BadgeCheck, Leaf, PackageCheck, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'

const icons = [PackageCheck, Leaf, Wallet, BadgeCheck]
const features = [
  { title: 'Fast, careful delivery', description: 'Groceries delivered in under 30 minutes.' },
  { title: 'Freshness guaranteed', description: 'Fresh produce straight from the source.' },
  { title: 'Everyday fair prices', description: 'Quality groceries at prices that feel good.' },
  { title: 'A store you can trust', description: 'Loved by thousands of happy customers.' },
]

const BottomBanner = () => (
  <section className="promise-panel" aria-labelledby="promise-title">
    <div className="promise-intro">
      <span className="section-kicker">THE FRESHKART PROMISE</span>
      <h2 id="promise-title">Small details.<br/><em>Better groceries.</em></h2>
      <p>From the first pick to your doorstep, we make everyday shopping feel a little more thoughtful.</p>
      <Link to="/products" className="promise-link">Shop the good stuff <ArrowRight size={16} /></Link>
      <span className="promise-stamp" aria-hidden="true">F<br/>K</span>
    </div>
    <div className="promise-features">
      {features.map((feature, index) => {
        const Icon = icons[index] || Leaf
        return <article className="promise-feature" key={feature.title}>
          <span className="promise-icon"><Icon size={20} strokeWidth={1.8} /></span>
          <div><h3>{feature.title}</h3><p>{feature.description}</p></div>
          <span className="promise-index">0{index + 1}</span>
        </article>
      })}
    </div>
  </section>
)

export default BottomBanner
