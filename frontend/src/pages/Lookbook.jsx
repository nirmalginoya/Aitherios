import React from "react";
import { motion } from "framer-motion";
import { LOOKBOOK_IMGS, HERO_IMG } from "../lib/mockData";

const Lookbook = () => {
  return (
    <div className="pt-28" data-testid="lookbook-page">
      <header className="px-6 md:px-12 pb-12">
        <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">// Editorial</p>
        <h1 className="font-display text-6xl md:text-[12vw] leading-[0.86] uppercase mt-2">
          <span className="glitch" data-text="Lookbook">Lookbook</span>
        </h1>
        <p className="mt-6 max-w-xl text-[#A3A3A3]">
          Photographed across Brooklyn, Berlin and Tokyo. A study of the streetwear silhouette under low light.
        </p>
      </header>

      <div className="space-y-1 px-1">
        {[
          { img: HERO_IMG, title: "I / Nightshift", text: "Shot on the L line, 03:14 EST." },
          { img: LOOKBOOK_IMGS[0], title: "II / The Hallway", text: "Brutalist forms — concrete, steel, fabric." },
          { img: LOOKBOOK_IMGS[1], title: "III / Sidewalk", text: "Streetwear in motion. Tokyo, summer." },
          { img: LOOKBOOK_IMGS[2], title: "IV / White Room", text: "Studio portraits. No retouching." },
        ].map((s, i) => (
          <motion.section
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9 }}
            className={`grid grid-cols-1 md:grid-cols-12 gap-1 ${i % 2 ? "md:[direction:rtl]" : ""}`}
          >
            <div className="md:col-span-8 [direction:ltr] aspect-[16/9] md:aspect-[4/3] overflow-hidden">
              <img src={s.img} alt={s.title} className="h-full w-full object-cover" />
            </div>
            <div className="md:col-span-4 [direction:ltr] flex flex-col justify-end bg-[#0E0E0E] p-8 md:p-12">
              <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">Chapter</p>
              <h2 className="font-display text-5xl md:text-6xl uppercase mt-2">{s.title}</h2>
              <p className="text-[#A3A3A3] mt-4">{s.text}</p>
            </div>
          </motion.section>
        ))}
      </div>

      <section className="px-6 md:px-12 py-24 text-center">
        <p className="font-mono-t text-[11px] uppercase tracking-[0.25em] text-[#A3A3A3]">// Credits</p>
        <h3 className="font-display text-4xl uppercase mt-2">
          Photography by Studio Vex.<br/>Direction by Aitherios.
        </h3>
      </section>
    </div>
  );
};

export default Lookbook;
