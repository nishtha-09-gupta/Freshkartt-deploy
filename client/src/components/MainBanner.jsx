import React from 'react'
import { ArrowRight, Clock3, Leaf, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const MainBanner = () => (
  <section className="hero-panel" aria-labelledby="hero-title">
    <div className="hero-copy">
      <div className="hero-eyebrow"><span className="hero-live-dot" /> THE GOOD STUFF, DELIVERED</div>
      <h1 id="hero-title">A little more <span>fresh</span> in your every day.</h1>
      <p>Farm-picked produce, pantry staples, and all your favourites — brought to your door with care.</p>
      <div className="hero-actions">
        <Link to="/products" className="hero-primary">Start shopping <ArrowRight size={17} /></Link>
        <Link to="/offer" className="hero-secondary">Explore today’s deals</Link>
      </div>
      <div className="hero-proof"><div className="proof-avatars"><i>F</i><i>K</i><i>+</i></div><span><strong>Good food, good mood.</strong><br/>Your neighbourhood grocery, online.</span></div>
    </div>
    <div className="hero-art" aria-hidden="true">
      <div className="hero-art-glow" />
      <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
      <div className="produce-card produce-card-main">
        <div className="produce-topline"><span><Leaf size={14} /> FARM FRESH</span><span className="produce-rating">★ 4.9</span></div>
        <div className="produce-bowl"><span className="produce-fruit fruit-tomato" /><span className="produce-fruit fruit-orange" /><span className="produce-fruit fruit-leaf" /><span className="produce-fruit fruit-pear" /><span className="produce-fruit fruit-lemon" /></div>
        <div className="produce-caption"><strong>Picked for you</strong><span>Freshness you can taste</span></div>
      </div>
      <div className="hero-float-tag tag-delivery"><span className="tag-icon"><Clock3 size={16} /></span><span><b>At your door</b><small>Fresh & fast</small></span></div>
      <div className="hero-float-tag tag-organic"><Sparkles size={15} /><span>Goodness, daily</span></div>
      <span className="hero-spark spark-a">✳</span><span className="hero-spark spark-b">✦</span>
    </div>
    <div className="hero-bottom-note"><span>01</span><span className="hero-note-line" /> A fresher kind of everyday</div>
  </section>
)

export default MainBanner
