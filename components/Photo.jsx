"use client";

import Image from "next/image";
import { useRef, useState } from "react";

// Image distante optimisée par Vercel, avec repli automatique sur la photo suivante
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

// Galerie swipe (scroll-snap) avec points
export function Gallery({ photos = [], alt, sizes = "100vw", priority = false, className = "" }) {
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const [broken, setBroken] = useState({});
  const list = photos.filter((p) => !broken[p]);
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    setIdx(Math.round(el.scrollLeft / el.clientWidth));
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
              onError={() => setBroken((b) => ({ ...b, [p]: true }))}
            />
          </div>
        ))}
      </div>
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
