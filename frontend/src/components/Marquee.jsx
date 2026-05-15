import React from "react";

const Marquee = ({ items = [], speed = "" }) => {
  const arr = [...items, ...items, ...items];
  return (
    <div className="tape overflow-hidden bg-black py-4">
      <div className={`marquee-track ${speed}`}>
        {arr.map((t, i) => (
          <span
            key={i}
            className="px-8 font-display text-2xl md:text-3xl uppercase tracking-[0.18em] text-white"
          >
            {t}
            <span className="mx-8 inline-block h-2 w-2 rounded-full bg-[#FF0000] align-middle" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
