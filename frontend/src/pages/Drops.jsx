import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { drops as dropsApi } from "../lib/api";
import { ArrowUpRight } from "lucide-react";

const Drops = () => {
  const [drops, setDrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrops = async () => {
      try {
        const res = await dropsApi.getAll();
        setDrops(res.data);
      } catch (err) {
        console.error("Failed to fetch drops", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDrops();
  }, []);

  if (loading) return <div className="pt-28 px-6 md:px-12 font-mono-t text-xs uppercase tracking-widest text-[#A3A3A3]">Synchronizing Seasonal Data...</div>;
  return (
    <div className="pt-28 pb-24 px-6 md:px-12" data-testid="drops-page">
      <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">// Seasons</p>
      <h1 className="font-display text-6xl md:text-[10vw] leading-[0.9] uppercase mt-2">Drops</h1>

      <div className="mt-16 space-y-1">
        {drops.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group grid grid-cols-1 md:grid-cols-12 gap-6 border-t border-[#262626] py-8"
          >
            <div className="md:col-span-2 font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">{d.date}</div>
            <div className="md:col-span-3 font-display text-3xl uppercase">{d.code}</div>
            <div className="md:col-span-3 font-display text-3xl uppercase text-[#FF0000]">{d.title}</div>
            <div className="md:col-span-3 text-sm text-[#A3A3A3]">{d.summary}</div>
            <Link to="/shop" className="md:col-span-1 inline-flex items-center justify-end gap-2 font-mono-t text-xs uppercase tracking-[0.22em] hover:text-[#FF0000]">
              Shop <ArrowUpRight size={14} />
            </Link>
            <div className="md:col-span-12 aspect-[16/6] mt-4 overflow-hidden">
              <img src={d.cover} className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Drops;
