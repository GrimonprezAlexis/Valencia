"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export function Photo({ srcs = [], alt, sizes = "100vw", priority = false, className = "" }) {
  const [i, setI] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const src = srcs[i];
  if (!src) return <div className={`photo-fallback ${className}`} aria-hidden />;
  return (
    <Image
      key={src}
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`photo ${loaded ? "is-loaded" : ""} ${className}`}
      onLoad={() => setLoaded(true)}
      onError={() => {
        setLoaded(false);
        setI((n) => n + 1);
      }}
    />
  );
}

// Galerie : swipe gauche/droite (scroll-snap natif) + flèches optionnelles
export function Gallery({ photos = [], alt, sizes = "100vw", priority = false, arrows = false, className = "" }) {
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const [broken, setBroken] = useState({});
  const list = photos.filter((p) => !broken[p]);

  const onScroll = () => {
    const el = ref.current;
    if (el) setIdx(Math.round(el.scrollLeft / el.clientWidth));
  };
  const go = (dir, e) => {
    e.stopPropagation();
    const el = ref.current;
    if (!el) return;
    const n = Math.max(0, Math.min(list.length - 1, idx + dir));
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
  };

  if (!list.length) return <div className={`gallery ${className}`}><div className="photo-fallback" /></div>;
  return (
    <div className={`gallery ${className}`}>
      <div className="gallery-track" ref={ref} onScroll={onScroll}>
        {list.map((p, n) => (
          <div className="gallery-slide" key={p}>
            <Image
              src={p}
              alt={`${alt} · photo ${n + 1}`}
              fill
              sizes={sizes}
              priority={priority && n === 0}
              className="photo is-loaded"
              draggable={false}
              onError={() => setBroken((b) => ({ ...b, [p]: true }))}
            />
          </div>
        ))}
      </div>
      {arrows && list.length > 1 && (
        <>
          <button className="g-arrow left" onClick={(e) => go(-1, e)} disabled={idx === 0} aria-label="Photo précédente">‹</button>
          <button className="g-arrow right" onClick={(e) => go(1, e)} disabled={idx >= list.length - 1} aria-label="Photo suivante">›</button>
        </>
      )}
      {list.length > 1 && (
        <div className="gallery-dots" aria-hidden>
          {list.map((p, n) => (
            <span key={p} className={n === idx ? "on" : ""} />
          ))}
        </div>
      )}
    </div>
  );
}
