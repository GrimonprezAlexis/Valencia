"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TripMap from "@/components/TripMap";
import { Gallery, Photo } from "@/components/Photo";
import { TRIP, DAYS, BUDGET, BOOKINGS, HOTELS } from "@/lib/data";

/* ————— utilitaires ————— */

const TZ = "+01:00"; // Valence = Lausanne en novembre (CET)

function stopDate(day, stop) {
  const [h, m] = stop.time.split(":");
  return new Date(`${day.date}T${h.padStart(2, "0")}:${m}:00${TZ}`);
}

const mapsPlace = (s) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.name} Valencia`)}${s.placeId ? `&query_place_id=${s.placeId}` : ""}`;
const mapsGo = (s, mode = "walking") =>
  `https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}${s.placeId ? `&destination_place_id=${s.placeId}` : ""}&travelmode=${mode}`;
const mapsEmbed = (s) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(`${s.name}, ${s.address || ""}, Valencia`)}&z=16&output=embed`;
const uberTo = (s) =>
  `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=${s.lat}&dropoff[longitude]=${s.lng}&dropoff[nickname]=${encodeURIComponent(s.name)}`;
const dayRoute = (day) => {
  const pts = day.stops.filter((s) => s.lat);
  if (pts.length < 2) return null;
  const ll = (p) => `${p.lat},${p.lng}`;
  const w = pts.slice(1, -1).map(ll).join("|");
  return `https://www.google.com/maps/dir/?api=1&origin=${ll(pts[0])}&destination=${ll(pts[pts.length - 1])}${w ? `&waypoints=${encodeURIComponent(w)}` : ""}&travelmode=walking`;
};

const MODE = {
  walk: { icon: "🚶‍♀️", label: "À pied" },
  taxi: { icon: "🚕", label: "Taxi / Uber" },
  metro: { icon: "🚇", label: "Métro" },
  hotel: { icon: "🛏️", label: "Pause hôtel" },
};

function store(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
function save(key, v) {
  try {
    localStorage.setItem(key, JSON.stringify(v));
  } catch {}
}

// numérotation des lieux (hors étapes « info »)
const NUMBERED = DAYS.map((d) => {
  let n = 0;
  return { ...d, stops: d.stops.map((s) => (s.lat ? { ...s, n: ++n } : s)) };
});
const ALL_STOPS = NUMBERED.flatMap((d) => d.stops.filter((s) => s.lat).map((s) => ({ ...s, day: d })));

function useNow(ms = 30000) {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), ms);
    return () => clearInterval(t);
  }, [ms]);
  return now;
}

/* ————— écran ————— */

export default function Home() {
  const [tab, setTab] = useState("programme");
  const [dayId, setDayId] = useState("ven");
  const [sheet, setSheet] = useState(null); // stop id
  const [confetti, setConfetti] = useState(0);
  const now = useNow();

  // jour par défaut = aujourd'hui si pendant le séjour
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const d = DAYS.find((x) => x.date === today);
    setDayId(d ? d.id : store("va-day", "ven"));
  }, []);

  const pickDay = (id) => {
    setDayId(id);
    save("va-day", id);
    const d = DAYS.find((x) => x.id === id);
    if (d?.birthday) setConfetti((c) => c + 1);
  };

  const openStop = useCallback((id) => setSheet(id), []);
  const sheetStop = sheet ? ALL_STOPS.find((s) => s.id === sheet) : null;

  useEffect(() => {
    document.body.style.overflow = sheetStop ? "hidden" : "";
  }, [sheetStop]);

  return (
    <div className="app">
      {tab === "programme" && (
        <>
          <Hero now={now} onGo={() => document.getElementById("days")?.scrollIntoView({ behavior: "smooth" })} />
          <NowCard now={now} onOpen={openStop} onDay={pickDay} />
          <Programme dayId={dayId} onDay={pickDay} onOpen={openStop} />
        </>
      )}
      {tab === "carte" && <MapView onOpen={openStop} />}
      {tab === "budget" && <BudgetView />}
      {tab === "resa" && <ResaView />}

      <BottomNav tab={tab} setTab={(t) => { setTab(t); window.scrollTo({ top: 0 }); }} />
      <Sheet stop={sheetStop} onClose={() => setSheet(null)} />
      {confetti > 0 && <Confetti key={confetti} />}
    </div>
  );
}

/* ————— Hero ————— */

function Hero({ now, onGo }) {
  const diff = now ? new Date(TRIP.start) - now : null;
  const days = diff != null ? Math.ceil(diff / 86400000) : null;
  return (
    <header className="hero">
      <div className="hero-img">
        <Photo srcs={[TRIP.hero]} alt="Rooftop à Valence au coucher du soleil" priority sizes="(max-width: 640px) 100vw, 640px" />
      </div>
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="eyebrow rise" style={{ "--d": "80ms" }}>6 → 9 novembre 2026</p>
        <h1 className="rise" style={{ "--d": "160ms" }}>
          Malvine<br /><em>à Valence</em>
        </h1>
        <p className="hero-sub rise" style={{ "--d": "240ms" }}>Un week-end d'anniversaire entre soleil, rooftops et paella.</p>
        <div className="hero-row rise" style={{ "--d": "320ms" }}>
          {days != null && days > 0 && (
            <span className="pill glass">
              <b>J-{days}</b> avant le départ
            </span>
          )}
          <span className="pill glass">☀️ 21–24 °C</span>
        </div>
        <button className="hero-cta rise" style={{ "--d": "400ms" }} onClick={onGo}>
          Voir le programme <span aria-hidden>↓</span>
        </button>
      </div>
    </header>
  );
}

/* ————— Maintenant / prochain ————— */

function NowCard({ now, onOpen, onDay }) {
  if (!now) return null;
  const start = new Date(TRIP.start);
  const end = new Date(`2026-11-09T12:00:00${TZ}`);
  if (now < start || now > end) {
    return (
      <section className="now-card flights rise" style={{ "--d": "100ms" }}>
        {TRIP.flights.map((f) => (
          <div className="flight" key={f.label}>
            <span className="flight-label">{f.label} · {f.date}</span>
            <div className="flight-line">
              <b>{f.dep}</b>
              <span className="flight-code">{f.from}</span>
              <span className="flight-track"><i>✈</i></span>
              <span className="flight-code">{f.to}</span>
              <b>{f.arr}</b>
            </div>
          </div>
        ))}
      </section>
    );
  }
  // pendant le séjour
  const timeline = NUMBERED.flatMap((d) => d.stops.map((s) => ({ s, d, at: stopDate(d, s) })));
  let cur = null;
  let next = null;
  timeline.forEach((t) => {
    if (t.at <= now) cur = t;
    else if (!next) next = t;
  });
  const t = next || cur;
  if (!t) return null;
  const mins = next ? Math.round((next.at - now) / 60000) : 0;
  return (
    <section className="now-card live rise" onClick={() => { onDay(t.d.id); if (t.s.lat) onOpen(t.s.id); }}>
      <span className="live-dot" />
      <div>
        <span className="eyebrow">{cur && next ? `Ensuite · dans ${mins >= 60 ? `${Math.floor(mins / 60)} h ${mins % 60}` : `${mins} min`}` : "Maintenant"}</span>
        <h3>{t.s.name}</h3>
        <p>{t.s.time} · {t.s.kind || t.s.desc}</p>
      </div>
      <span className="chev">›</span>
    </section>
  );
}

/* ————— Programme ————— */

function Programme({ dayId, onDay, onOpen }) {
  const day = NUMBERED.find((d) => d.id === dayId) || NUMBERED[0];
  const groups = useMemo(() => [{ color: day.color, stops: day.stops, route: true }], [day]);
  const route = dayRoute(day);
  return (
    <section className="programme" id="days">
      <DayPicker dayId={day.id} onDay={onDay} />
      <div className="day" key={day.id} style={{ "--day": day.color }}>
        {day.birthday && (
          <div className="bday rise">
            <span className="bday-cake">🎂</span>
            <div>
              <b>Joyeux anniversaire Malvine</b>
              <span>Aujourd'hui, c'est ta journée ✨</span>
            </div>
          </div>
        )}
        <div className="day-head rise">
          <p className="eyebrow">{day.label}</p>
          <h2>{day.title}</h2>
          <p className="muted">{day.mood}</p>
        </div>

        {day.stops.some((s) => s.lat) && (
          <div className="day-map rise" style={{ "--d": "80ms" }}>
            <TripMap groups={groups} onSelect={onOpen} height={230} />
            {route && (
              <a className="map-fab" href={route} target="_blank" rel="noopener">
                Itinéraire du jour ↗
              </a>
            )}
          </div>
        )}

        <ol className="timeline">
          {day.stops.map((s, i) => (
            <StopItem key={s.id} s={s} i={i} onOpen={onOpen} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function DayPicker({ dayId, onDay }) {
  const refs = useRef({});
  const [ind, setInd] = useState({ x: 0, w: 0 });
  useEffect(() => {
    const el = refs.current[dayId];
    if (el) {
      setInd({ x: el.offsetLeft, w: el.offsetWidth });
      el.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    }
  }, [dayId]);
  return (
    <nav className="daypicker" role="tablist">
      <div className="daypicker-track">
        <span className="daypicker-ind" style={{ transform: `translateX(${ind.x}px)`, width: ind.w }} />
        {DAYS.map((d) => (
          <button
            key={d.id}
            ref={(n) => (refs.current[d.id] = n)}
            role="tab"
            aria-selected={d.id === dayId}
            className={`daybtn ${d.id === dayId ? "on" : ""}`}
            onClick={() => onDay(d.id)}
          >
            <span>{d.short}{d.birthday ? " 🎂" : ""}</span>
            <small>{d.title}</small>
          </button>
        ))}
      </div>
    </nav>
  );
}

function Leg({ leg }) {
  if (!leg) return null;
  const m = MODE[leg.mode] || MODE.walk;
  return (
    <div className={`leg leg-${leg.mode}`}>
      <span className="leg-icon">{m.icon}</span>
      <span>{leg.text}</span>
    </div>
  );
}

function useReveal() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) return setSeen(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

function StopItem({ s, i, onOpen }) {
  const [ref, seen] = useReveal();
  if (!s.lat) {
    return (
      <li ref={ref} className={`stop info reveal ${seen ? "in" : ""}`}>
        <span className="stop-dot small" />
        <div className="info-card">
          <span className="time">{s.time}</span>
          <h3>{s.name}</h3>
          <p>{s.desc}</p>
        </div>
        <Leg leg={s.next} />
      </li>
    );
  }
  return (
    <li ref={ref} className={`stop reveal ${seen ? "in" : ""}`} style={{ "--i": i }}>
      <span className="stop-dot">{s.n}</span>
      <Leg leg={s.before} />
      <article className="card" onClick={() => onOpen(s.id)}>
        <div className="card-media">
          <Gallery photos={s.photos} alt={s.name} sizes="(max-width: 640px) 90vw, 560px" />
          <span className="card-time">{s.time}</span>
          {s.rating && <span className="card-rating">★ {s.rating.toFixed(1)}</span>}
        </div>
        <div className="card-body">
          <p className="kind">{s.kind}</p>
          <h3>{s.name}</h3>
          <p className="desc">{s.desc}</p>
          {s.tip && <p className="tip">{s.tip}</p>}
          <div className="card-foot">
            <span className="price">{s.price}</span>
            {s.book && <span className="badge">À réserver</span>}
            <span className="more">Détails ›</span>
          </div>
        </div>
      </article>
      <Leg leg={s.next} />
    </li>
  );
}

/* ————— Fiche lieu (bottom sheet) ————— */

function Sheet({ stop, onClose }) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(null);
  const drag = useRef({ y0: 0, dy: 0 });
  const panel = useRef(null);

  useEffect(() => {
    if (stop) {
      setShown(stop);
      requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
    } else {
      setOpen(false);
      const t = setTimeout(() => setShown(null), 380);
      return () => clearTimeout(t);
    }
  }, [stop]);

  if (!shown) return null;
  const s = shown;

  const onStart = (e) => {
    drag.current = { y0: e.touches[0].clientY, dy: 0 };
  };
  const onMove = (e) => {
    const dy = Math.max(0, e.touches[0].clientY - drag.current.y0);
    drag.current.dy = dy;
    if (panel.current && panel.current.scrollTop <= 0) panel.current.style.transform = `translateY(${dy}px)`;
  };
  const onEnd = () => {
    if (panel.current) panel.current.style.transform = "";
    if (drag.current.dy > 110) onClose();
  };

  return (
    <div className={`sheet-root ${open ? "open" : ""}`} role="dialog" aria-modal="true" aria-label={s.name}>
      <div className="sheet-backdrop" onClick={onClose} />
      <div className="sheet" ref={panel} onTouchStart={onStart} onTouchMove={onMove} onTouchEnd={onEnd}>
        <div className="sheet-grab" />
        <button className="sheet-close" onClick={onClose} aria-label="Fermer">×</button>
        <div className="sheet-media">
          <Gallery photos={s.photos} alt={s.name} sizes="(max-width: 640px) 100vw, 640px" priority />
        </div>
        <div className="sheet-body">
          <p className="kind" style={{ color: s.day?.color }}>
            {s.day?.label} · {s.time}
          </p>
          <h2>{s.name}</h2>
          <div className="sheet-meta">
            {s.rating && <span className="chip">★ {s.rating.toFixed(1)} Google</span>}
            {s.price && <span className="chip">{s.price}</span>}
            {s.book && <span className="chip rose">À réserver</span>}
          </div>
          <p className="sheet-desc">{s.desc}</p>
          {s.tip && <p className="tip">{s.tip}</p>}
          {s.address && <p className="addr">📍 {s.address}</p>}

          <div className="actions">
            <a className="btn primary" href={mapsGo(s)} target="_blank" rel="noopener">
              <span>🧭</span> Y aller
            </a>
            <a className="btn" href={uberTo(s)} target="_blank" rel="noopener">
              <span>🚕</span> Uber
            </a>
            {s.book && (
              <a className="btn" href={s.book} target="_blank" rel="noopener">
                <span>📅</span> Réserver
              </a>
            )}
            {s.phone && (
              <a className="btn" href={`tel:${s.phone}`}>
                <span>📞</span> Appeler
              </a>
            )}
          </div>

          <div className="gmap">
            <iframe
              title={`Google Maps · ${s.name}`}
              src={mapsEmbed(s)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <a className="link" href={mapsPlace(s)} target="_blank" rel="noopener">
            Ouvrir dans Google Maps (avis, horaires, photos) ↗
          </a>
        </div>
      </div>
    </div>
  );
}

/* ————— Carte globale ————— */

function MapView({ onOpen }) {
  const [filter, setFilter] = useState("all");
  const groups = useMemo(
    () =>
      NUMBERED.filter((d) => filter === "all" || d.id === filter).map((d) => ({
        color: d.color,
        stops: d.stops,
        route: filter !== "all",
      })),
    [filter]
  );
  const list = ALL_STOPS.filter((s) => filter === "all" || s.day.id === filter);
  return (
    <section className="page mapview">
      <div className="page-head rise">
        <p className="eyebrow">La carte</p>
        <h2>Tous les lieux</h2>
      </div>
      <div className="chips rise" style={{ "--d": "60ms" }}>
        <button className={`fchip ${filter === "all" ? "on" : ""}`} onClick={() => setFilter("all")}>Tout</button>
        {NUMBERED.filter((d) => d.stops.some((s) => s.lat)).map((d) => (
          <button
            key={d.id}
            className={`fchip ${filter === d.id ? "on" : ""}`}
            style={{ "--c": d.color }}
            onClick={() => setFilter(d.id)}
          >
            <i style={{ background: d.color }} /> {d.short}
          </button>
        ))}
      </div>
      <div className="bigmap rise" style={{ "--d": "120ms" }}>
        <TripMap groups={groups} onSelect={onOpen} height="58vh" />
      </div>
      <ul className="mini-list">
        {list.map((s, i) => (
          <li key={s.id} className="mini rise" style={{ "--d": `${120 + i * 30}ms` }} onClick={() => onOpen(s.id)}>
            <span className="mini-n" style={{ background: s.day.color }}>{s.n}</span>
            <div className="mini-img">
              <Photo srcs={s.photos} alt={s.name} sizes="64px" />
            </div>
            <div className="mini-txt">
              <b>{s.name}</b>
              <span>{s.day.short} · {s.time}</span>
            </div>
            <span className="chev">›</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ————— Budget ————— */

function BudgetView() {
  const maxV = Math.max(...BUDGET.items.map((i) => i.max));
  const [go, setGo] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGo(true), 120);
    return () => clearTimeout(t);
  }, []);
  const sumMin = BUDGET.items.reduce((a, b) => a + b.min, 0);
  const sumMax = BUDGET.items.reduce((a, b) => a + b.max, 0);
  return (
    <section className="page">
      <div className="page-head rise">
        <p className="eyebrow">Budget</p>
        <h2>Par personne, sur place</h2>
      </div>
      <div className="total-card rise" style={{ "--d": "60ms" }}>
        <span>Total estimé</span>
        <strong>≈ {Math.round(sumMin / 10) * 10}–{Math.round(sumMax / 10) * 10} €</strong>
        <small>{BUDGET.note}</small>
      </div>
      <ul className="bars">
        {BUDGET.items.map((it, i) => (
          <li key={it.label} className="bar rise" style={{ "--d": `${120 + i * 70}ms` }}>
            <div className="bar-top">
              <b>{it.label}</b>
              <span>{it.min === it.max ? `${it.min} €` : `${it.min}–${it.max} €`}</span>
            </div>
            <div className="bar-track">
              <i style={{ width: go ? `${(it.max / maxV) * 100}%` : 0, transitionDelay: `${i * 90}ms` }} />
            </div>
            <small>{it.detail}</small>
          </li>
        ))}
      </ul>
      <div className="note-card rise" style={{ "--d": "420ms" }}>
        <b>Vol</b> easyJet GVA ⇄ VLC ≈ 97 CHF / pers. · <b>Hôtel</b> ≈ 150–180 € / pers. (3 nuits)
      </div>
    </section>
  );
}

/* ————— Réservations ————— */

function ResaView() {
  const [done, setDone] = useState({});
  useEffect(() => setDone(store("va-book", {})), []);
  const toggle = (id) => {
    const n = { ...done, [id]: !done[id] };
    setDone(n);
    save("va-book", n);
  };
  const count = BOOKINGS.filter((b) => done[b.id]).length;
  const pct = count / BOOKINGS.length;
  const R = 34;
  const C = 2 * Math.PI * R;
  return (
    <section className="page">
      <div className="page-head rise">
        <p className="eyebrow">Réservations</p>
        <h2>À ne pas oublier</h2>
      </div>
      <div className="progress rise" style={{ "--d": "60ms" }}>
        <svg viewBox="0 0 80 80" width="80" height="80">
          <circle cx="40" cy="40" r={R} className="ring-bg" />
          <circle
            cx="40"
            cy="40"
            r={R}
            className="ring"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - pct)}
            transform="rotate(-90 40 40)"
          />
        </svg>
        <div>
          <strong>{count}/{BOOKINGS.length}</strong>
          <span>{count === BOOKINGS.length ? "Tout est réservé 🎉" : "réservations faites"}</span>
        </div>
      </div>
      <ul className="checks">
        {BOOKINGS.map((b, i) => (
          <li key={b.id} className={`check rise ${done[b.id] ? "done" : ""}`} style={{ "--d": `${100 + i * 40}ms` }}>
            <button className="box" onClick={() => toggle(b.id)} aria-pressed={!!done[b.id]} aria-label={b.label}>
              <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </button>
            <div className="check-txt" onClick={() => toggle(b.id)}>
              <b>{b.label}</b>
              {b.detail && <span>{b.detail}</span>}
            </div>
            {b.url && <a className="mini-btn" href={b.url} target="_blank" rel="noopener">Réserver</a>}
            {b.tel && <a className="mini-btn" href={`tel:${b.tel}`}>Appeler</a>}
          </li>
        ))}
      </ul>

      <div className="page-head" style={{ marginTop: 34 }}>
        <p className="eyebrow">Hôtel</p>
        <h2>Les deux options</h2>
      </div>
      <div className="hotels">
        {HOTELS.map((h, i) => (
          <article key={h.id} className="hotel rise" style={{ "--d": `${i * 80}ms` }}>
            <div className="hotel-media">
              <Gallery photos={h.photos} alt={h.name} sizes="(max-width: 640px) 90vw, 300px" />
            </div>
            <div className="hotel-body">
              <p className="kind">{h.area}</p>
              <h3>{h.name}</h3>
              <p className="price">{h.price}</p>
              <ul>{h.perks.map((p) => <li key={p}>{p}</li>)}</ul>
              <a className="btn primary full" href={h.url} target="_blank" rel="noopener">Voir sur Booking ↗</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ————— Navigation basse ————— */

const TABS = [
  { id: "programme", label: "Programme", icon: (<path d="M7 3v3M17 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" />) },
  { id: "carte", label: "Carte", icon: (<path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />) },
  { id: "budget", label: "Budget", icon: (<path d="M4 7h16v12H4zM4 7l2-3h12l2 3M15 13h2" />) },
  { id: "resa", label: "Résa", icon: (<path d="M5 12.5l4.5 4.5L19 7.5" />) },
];

function BottomNav({ tab, setTab }) {
  const idx = TABS.findIndex((t) => t.id === tab);
  return (
    <nav className="bottomnav" aria-label="Navigation">
      <span className="bn-ind" style={{ transform: `translateX(${idx * 100}%)` }} />
      {TABS.map((t) => (
        <button key={t.id} className={`bn ${tab === t.id ? "on" : ""}`} onClick={() => setTab(t.id)}>
          <svg viewBox="0 0 24 24" aria-hidden>{t.icon}</svg>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

/* ————— Confettis anniversaire ————— */

function Confetti() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setOn(false), 3200);
    return () => clearTimeout(t);
  }, []);
  const bits = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        dur: 2 + Math.random() * 1.2,
        rot: Math.random() * 360,
        color: ["#c8507a", "#f7c9a8", "#b4874f", "#e2738c", "#fff1e8"][i % 5],
        w: 6 + Math.random() * 6,
      })),
    []
  );
  if (!on) return null;
  return (
    <div className="confetti" aria-hidden>
      {bits.map((b, i) => (
        <i
          key={i}
          style={{
            left: `${b.left}%`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.dur}s`,
            background: b.color,
            width: b.w,
            height: b.w * 0.45,
            "--r": `${b.rot}deg`,
          }}
        />
      ))}
    </div>
  );
}
