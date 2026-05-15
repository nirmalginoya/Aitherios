import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { products as productApi, drops as dropsApi } from "../lib/api";
import { HERO_IMG, LOOKBOOK_IMGS } from "../lib/mockData";
import Marquee from "../components/Marquee";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [drops, setDrops] = useState([]);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const [prodRes, dropsRes] = await Promise.all([
          productApi.getAll(),
          dropsApi.getAll()
        ]);
        setProducts(prodRes.data);
        setDrops(dropsRes.data);
      } catch (err) {
        console.error("Failed to fetch home data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const featured = products.slice(0, 4);
  const archive = products.slice(4, 8);

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section ref={heroRef} className="relative h-[100vh] w-full overflow-hidden">
        <motion.div style={{ y: yImg }} className="absolute inset-0">
          <img src={HERO_IMG} alt="Aitherios hero" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
        </motion.div>

        <motion.div style={{ y: yTitle, opacity }} className="relative z-10 flex h-full flex-col justify-end px-6 md:px-12 pb-20">
          <p className="font-mono-t text-[11px] uppercase tracking-[0.3em] text-[#A3A3A3]">
            Drop 04 / Nightshift / 2025
          </p>
          <h1 className="mt-4 font-display text-[18vw] md:text-[14vw] leading-[0.86] uppercase tracking-tight">
            <span className="glitch" data-text="Aitherios">Aitherios</span>
          </h1>
          <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <p className="max-w-md text-sm text-white/80">
              Streetwear engineered for the after-hours. Heavyweight builds, raw silhouettes, blood-red accents.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/shop" className="btn-primary solid" data-testid="hero-shop">
                Shop the Drop <ArrowRight size={14} />
              </Link>
              <Link to="/lookbook" className="btn-primary" data-testid="hero-lookbook">
                Lookbook
              </Link>
            </div>
          </div>
        </motion.div>

        {/* corner labels */}
        <div className="absolute top-24 right-6 md:right-12 z-10 hidden md:block">
          <div className="border border-white/20 bg-black/40 backdrop-blur px-3 py-2 font-mono-t text-[10px] uppercase tracking-[0.25em]">
            EST. 2024 / Brooklyn — Tokyo
          </div>
        </div>
      </section>

      <Marquee items={["Aitherios", "Drop 04 — Nightshift", "Heavyweight 480gsm", "Limited Edition", "Free Shipping > $200"]} />

      {/* FEATURED */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="flex items-end justify-between gap-8 mb-12">
          <div>
            <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">// 001 — Featured</p>
            <h2 className="mt-3 font-display text-5xl md:text-7xl uppercase leading-[0.9]">
              The <span className="text-[#FF0000]">Drop</span>.
            </h2>
          </div>
          <Link to="/shop" className="hidden md:inline-flex link-underline font-mono-t text-xs uppercase tracking-[0.22em]" data-testid="featured-viewall">
            View All Products <ArrowUpRight size={14} className="ml-2" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Editorial */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-1 px-1">
        <div className="md:col-span-7 relative aspect-[4/5] md:aspect-auto md:h-[80vh] overflow-hidden">
          <img src={LOOKBOOK_IMGS[0]} className="h-full w-full object-cover" alt="" />
        </div>
        <div className="md:col-span-5 bg-[#0E0E0E] p-8 md:p-16 flex flex-col justify-between">
          <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">// 002 — Manifesto</p>
          <div className="my-12">
            <h3 className="font-display text-4xl md:text-6xl uppercase leading-[0.95]">
              Built for those<br/>who move<br/>after dark.
            </h3>
            <p className="mt-8 text-[#A3A3A3] max-w-md">
              Aitherios is a research-led streetwear label producing limited-run garments at heavyweight gauges. Every piece is patterned in-house, sampled three times, and produced in micro-batches of under 400.
            </p>
          </div>
          <Link to="/lookbook" className="btn-primary self-start" data-testid="manifesto-cta">
            Read the Story <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Drops grid */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="flex items-end justify-between gap-8 mb-12">
          <div>
            <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">// 003 — Archive</p>
            <h2 className="mt-3 font-display text-5xl md:text-7xl uppercase leading-[0.9]">Past Drops</h2>
          </div>
          <Link to="/drops" className="link-underline font-mono-t text-xs uppercase tracking-[0.22em] hidden md:inline-flex" data-testid="drops-viewall">
            All Drops <ArrowUpRight size={14} className="ml-2" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {drops.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative overflow-hidden border border-[#262626]"
            >
              <img src={d.cover} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-mono-t text-[10px] uppercase tracking-[0.25em] text-[#A3A3A3]">{d.date}</p>
                <h4 className="font-display text-3xl md:text-4xl uppercase mt-1">{d.code} / {d.title}</h4>
                <p className="text-xs text-white/70 mt-2">{d.pieces} pieces</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Archive products */}
      <section className="px-6 md:px-12 pb-24 md:pb-32">
        <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3] mb-6">// 004 — From the archive</p>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
          {archive.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      <Marquee items={["Heavyweight Cotton", "Made in Limited Runs", "Worldwide Shipping", "Aitherios © 2025"]} speed="fast" />
    </div>
  );
};

export default Home;
