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

// Galerie : swipe gauche/droite au doigt (sans ouvrir la fiche) + flèches
export function Gallery({ photos = [], alt, sizes = "100vw", priority = false, arrows = false, className = "" }) {
  const [idx, setIdx] = useState(0);
  const [dx, setDx] = useState(0);
  const [broken, setBroken] = useState({});
  const t = useRef({ x: 0, y: 0, dir: null, swiped: false });
  const list = photos.filter((p) => !broken[p]);
  const n = list.length;
  const cur = Math.min(idx, Math.max(0, n - 1));

  const go = (d) => setIdx((i) => Math.max(0, Math.min(n - 1, i + d)));
  const onStart = (e) => {
    t.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, dir: null, swiped: false };
  };
  const onMove = (e) => {
    const c = t.current;
    const mx = e.touches[0].clientX - c.x;
    const my = e.touches[0].clientY - c.y;
    if (!c.dir && (Math.abs(mx) > 8 || Math.abs(my) > 8)) c.dir = Math.abs(mx) > Math.abs(my) ? "x" : "y";
    if (c.dir === "x") {
      e.stopPropagation();
      // résistance aux extrémités
      const edge = (cur === 0 && mx > 0) || (cur === n - 1 && mx < 0);
      setDx(edge ? mx * 0.3 : mx);
    }
  };
  const onEnd = (e) => {
    const c = t.current;
    if (c.dir === "x") {
      e.stopPropagation();
      c.swiped = true;
      setTimeout(() => {
        c.swiped = false;
      }, 350);
      if (dx < -35) go(1);
      else if (dx > 35) go(-1);
    }
    setDx(0);
  };
  // un swipe ne doit pas ouvrir la fiche
  const onClickCapture = (e) => {
    if (t.current.swiped) {
      e.stopPropagation();
      e.preventDefault();
      t.current.swiped = false;
    }
  };
  const arrow = (d) => (e) => {
    e.stopPropagation();
    go(d);
  };

  if (!n) return <div className={`gallery ${className}`}><div className="photo-fallback" /></div>;
  return (
    <div
      className={`gallery ${className}`}
      onTouchStart={onStart}
      onTouchMove={onMove}
      onTouchEnd={onEnd}
      onClickCapture={onClickCapture}
    >
      <div
        className={`gallery-track ${dx ? "dragging" : ""}`}
        style={{ transform: `translateX(calc(${-cur * 100}% + ${dx}px))` }}
      >
        {list.map((p, k) => (
          <div className="gallery-slide" key={p}>
            <Image
              src={p}
              alt={`${alt} · photo ${k + 1}`}
              fill
              sizes={sizes}
              priority={priority && k === 0}
              className="photo is-loaded"
              draggable={false}
              onError={() => setBroken((b) => ({ ...b, [p]: true }))}
            />
          </div>
        ))}
      </div>
      {n > 1 && (
        <>
          <button className={`g-arrow left ${arrows ? "" : "sm"}`} onClick={arrow(-1)} disabled={cur === 0} aria-label="Photo précédente">‹</button>
          <button className={`g-arrow right ${arrows ? "" : "sm"}`} onClick={arrow(1)} disabled={cur >= n - 1} aria-label="Photo suivante">›</button>
        </>
      )}
      {n > 1 && (
        <div className="gallery-dots" aria-hidden>
          {list.map((p, k) => (
            <span key={p} className={k === cur ? "on" : ""} />
          ))}
        </div>
      )}
    </div>
  );
}
