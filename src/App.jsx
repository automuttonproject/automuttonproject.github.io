import { useState, useEffect } from "react";
import {
  img_hero_eli, img_hero_lema, img_eli_lema,
  img_aori, img_koori, img_tanza,
} from "./images";

/* ─────────────────────────────────────────
   HERO SLIDES  (2 横長イラスト + ユニット絵)
───────────────────────────────────────── */
const HERO_SLIDES = [img_hero_eli, img_hero_lema, img_eli_lema];

/* ─────────────────────────────────────────
   CREATOR DATA
───────────────────────────────────────── */
const MEMBERS = [
  {
    id: "automutton",
    name: "automutton",
    nameStyle: { fontFamily: "'Orbitron', monospace", fontWeight: 900, letterSpacing: "0.08em", fontSize: "clamp(28px,4vw,52px)" },
    type: "Main Unit",
    status: "active",
    desc: "ゲーム実況・同時視聴\nドール・音楽",
    slides: [img_eli_lema, img_hero_eli, img_hero_lema],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@automutton-elilema-1927" },
      { label: "X / Twitter", url: "https://twitter.com/automutton42" },
    ],
    members: [
      { role: "Eli", name: "エリ", color: "#9e1b1d", url: "https://twitter.com/eli503503", handle: "@eli503503" },
      { role: "Lema", name: "レマ", color: "#1a3f78", url: "https://twitter.com/lema404404", handle: "@lema404404" },
    ],
  },
  {
    id: "tbd",
    name: "準備中",
    type: "",
    status: "coming",
    desc: "",
    slides: [],
    links: [],
  },
];

const SUBMEMBERS = [
  {
    id: "tanza",
    name: "瀬ノ月タンザ",
    nameStyle: { fontFamily: "'Cinzel', serif", fontSize: "clamp(22px,3vw,38px)", fontWeight: 400, letterSpacing: "0.04em" },
    type: "Vtuber",
    status: "active",
    desc: "ゲーム実況・雑談",
    slides: [img_tanza],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@-senodukitanza-8274" },
      { label: "X / Twitter", url: "https://twitter.com/Senoduki_Tanza" },
    ],
  },
  {
    id: "koori",
    name: "夏季こおり",
    nameStyle: { fontFamily: "'Quicksand', sans-serif", fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 300, letterSpacing: "-0.02em" },
    type: "Vtuber",
    status: "active",
    desc: "ゲーム実況・雑談",
    slides: [img_koori],
    links: [
      { label: "NicoNico", url: "https://www.nicovideo.jp/user/138406804/live_programs" },
      { label: "X / Twitter", url: "https://twitter.com/summer_ice_0206" },
      { label: "Lit.link", url: "https://lit.link/kakicori" },
    ],
  },
];

const SUPPORT = [
  {
    id: "neko",
    name: "ねこウサギ",
    nameStyle: { fontFamily: "'Noto Serif JP', serif", fontSize: "clamp(22px,3vw,36px)", fontWeight: 300, letterSpacing: "0.08em" },
    type: "Illustrator / Video",
    status: "active",
    desc: "イラスト・動画作成\nautomutton 配信待機画面",
    slides: [],
    links: [],
  },
  {
    id: "tana",
    name: "棚にしヲ",
    nameStyle: { fontFamily: "'Space Mono', monospace", fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 400, letterSpacing: "-0.03em" },
    type: "Video Edit / Cocofolia",
    status: "active",
    desc: "動画編集・ ココフォリア部屋作成\n一部動画 / Short動画",
    slides: [],
    links: [{ label: "Coconala", url: "https://coconala.com/users/4883055" }],
  },
];

/* ─────────────────────────────────────────
   HERO SLIDESHOW
───────────────────────────────────────── */
function HeroSlider() {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(null);

  useEffect(() => {
    const t = setInterval(() => {
      setCur(c => {
        setPrev(c);
        return (c + 1) % HERO_SLIDES.length;
      });
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const goTo = (i) => { setPrev(cur); setCur(i); };

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "100svh" }}>
      {HERO_SLIDES.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[1600ms] ease-in-out"
          style={{ opacity: i === cur ? 1 : 0, zIndex: i === cur ? 2 : (i === prev ? 1 : 0) }}
        >
          <img src={src} alt="" className="w-full h-full object-cover object-center" style={{ filter: "brightness(0.72)" }} />
        </div>
      ))}

      {/* soft gradient — top & bottom */}
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.72) 100%)" }} />

      {/* logo overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-12 pb-12 flex items-end justify-between">
        <div>
          <p style={{ fontFamily: "'Josefin Sans'", fontWeight: 200, fontSize: 10, letterSpacing: "0.55em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", marginBottom: 10 }}>
            Virtual Creator Community
          </p>
          <h1 style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200, fontSize: "clamp(32px,5vw,56px)", letterSpacing: "0.16em", color: "#fff", lineHeight: 1.1 }}>
            機械羊製造所
          </h1>
        </div>
        {/* dots */}
        <div className="flex gap-2 items-center pb-1">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                border: "none",
                height: 1,
                background: i === cur ? "#fff" : "rgba(255,255,255,0.3)",
                width: i === cur ? 36 : 18,
                transition: "all 0.35s",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   NAV
───────────────────────────────────────── */
function Nav({ scrolled }) {
  const allCreators = [...MEMBERS, ...SUBMEMBERS, ...SUPPORT].filter(c => c.status !== "coming");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{ background: scrolled ? "rgba(255,255,255,0.96)" : "transparent", backdropFilter: scrolled ? "blur(10px)" : "none", borderBottom: scrolled ? "1px solid #e8e8e8" : "none" }}>
      <div className="flex items-center justify-between px-10 h-12">
        <span style={{ fontFamily: "'Noto Serif JP'", fontWeight: 300, fontSize: 11, letterSpacing: "0.18em", color: scrolled ? "#111" : "#fff" }}>
          機械羊製造所
        </span>
        <div className="flex gap-0 overflow-x-auto scrollbar-none">
          {allCreators.map(c => (
            <a key={c.id} href={"#" + c.id}
              style={{ fontFamily: "'Josefin Sans'", fontWeight: 300, fontSize: 8, letterSpacing: "0.32em", textTransform: "uppercase", textDecoration: "none", color: scrolled ? "#888" : "rgba(255,255,255,0.55)", padding: "0 12px", height: 48, display: "flex", alignItems: "center", borderBottom: "1.5px solid transparent", transition: "all 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={e => { e.currentTarget.style.color = scrolled ? "#111" : "#fff"; e.currentTarget.style.borderBottomColor = scrolled ? "#111" : "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.color = scrolled ? "#888" : "rgba(255,255,255,0.55)"; e.currentTarget.style.borderBottomColor = "transparent"; }}
              onClick={e => { e.preventDefault(); document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth" }); }}
            >
              {c.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────
   MINI SLIDER
───────────────────────────────────────── */
function MiniSlider({ slides }) {
  const [cur, setCur] = useState(0);
  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => setCur(c => (c + 1) % slides.length), 3600);
    return () => clearInterval(t);
  }, [slides.length]);

  if (!slides.length) return (
    <div style={{ width: "100%", height: "100%", minHeight: 440, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="0.8">
        <rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
      </svg>
    </div>
  );

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 440, overflow: "hidden", background: "#111" }}>
      {slides.map((src, i) => (
        <div key={i} style={{ position: "absolute", inset: 0, opacity: i === cur ? 1 : 0, transition: "opacity 0.9s ease" }}>
          <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
        </div>
      ))}
      {slides.length > 1 && (
        <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5, zIndex: 5 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCur(i)}
              style={{ height: 1, border: "none", cursor: "pointer", padding: 0, transition: "all 0.25s", background: i === cur ? "#fff" : "rgba(255,255,255,0.35)", width: i === cur ? 28 : 14 }} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   CATEGORY BAND  — soft, not all-black
───────────────────────────────────────── */
function Band({ en, jp }) {
  return (
    <div style={{ background: "#f7f7f7", borderTop: "1px solid #e8e8e8", borderBottom: "1px solid #e8e8e8", padding: "14px 56px", display: "flex", alignItems: "baseline", gap: 20 }}>
      <span style={{ fontFamily: "'Josefin Sans'", fontWeight: 600, fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: "#333" }}>{en}</span>
      <span style={{ fontFamily: "'Noto Serif JP'", fontWeight: 300, fontSize: 11, letterSpacing: "0.15em", color: "#999" }}>{jp}</span>
    </div>
  );
}

/* ─────────────────────────────────────────
   LINK ROW
───────────────────────────────────────── */
function LinkRow({ links }) {
  if (!links?.length) return null;
  return (
    <div style={{ borderTop: "1px solid #ebebeb", paddingTop: 18, marginTop: 20, display: "flex", flexDirection: "column", gap: 0 }}>
      {links.map(l => (
        <a key={l.label} href={l.url} target="_blank" rel="noreferrer"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #f0f0f0", fontFamily: "'Josefin Sans'", fontWeight: 300, fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "#555", textDecoration: "none", transition: "opacity 0.18s" }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.45"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          {l.label}
          <span style={{ color: "#ccc", marginLeft: 8 }}>↗</span>
        </a>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   CREATOR CARD — soft rounded, less black
───────────────────────────────────────── */
function CreatorCard({ creator, flip = false }) {
  /* coming soon slot */
  if (creator.status === "coming") {
    return (
      <section id={creator.id} style={{ borderBottom: "1px solid #ebebeb", minHeight: 160, display: "flex", alignItems: "center", justifyContent: "center", background: "repeating-linear-gradient(-45deg, transparent, transparent 14px, #fafafa 14px, #fafafa 15px)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Josefin Sans'", fontSize: 8, letterSpacing: "0.6em", textTransform: "uppercase", color: "#ccc", marginBottom: 8 }}>New Member — Preparing</div>
          <div style={{ fontFamily: "'Noto Serif JP'", fontSize: 24, fontWeight: 200, letterSpacing: "0.2em", color: "#ccc" }}>準備中</div>
        </div>
      </section>
    );
  }

  const imgPane = (
    <div style={{ position: "relative", overflow: "hidden", flex: "0 0 50%" }}>
      <MiniSlider slides={creator.slides} />
    </div>
  );

  const infoPane = (
    <div style={{ flex: "0 0 50%", padding: "44px 52px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#fff", minHeight: 480 }}>
      <div>
        {/* meta row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontFamily: "'Josefin Sans'", fontWeight: 300, fontSize: 8, letterSpacing: "0.45em", textTransform: "uppercase", color: "#aaa" }}>{creator.type}</span>
          <span style={{ fontFamily: "'Josefin Sans'", fontWeight: 300, fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: creator.status === "preparing" ? "#ccc" : "#aaa", borderBottom: "1px solid #e0e0e0", paddingBottom: 2 }}>
            {creator.status === "preparing" ? "Preparing" : "Active"}
          </span>
        </div>

        {/* name — per-creator font */}
        <div style={{ borderBottom: "1px solid #efefef", paddingBottom: 20, marginBottom: 20 }}>
          <div style={{ color: "#111", lineHeight: 1.15, ...creator.nameStyle }}>{creator.name}</div>
        </div>

        {/* desc */}
        {creator.desc && (
          <p style={{ fontFamily: "'Noto Serif JP'", fontWeight: 300, fontSize: 12, letterSpacing: "0.1em", lineHeight: 2.1, color: "#888", whiteSpace: "pre-line" }}>{creator.desc}</p>
        )}

        {/* unit members */}
        {creator.members && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 24, paddingTop: 20, borderTop: "1px solid #efefef" }}>
            {creator.members.map(m => (
              <div key={m.role}>
                <div style={{ fontFamily: "'Josefin Sans'", fontWeight: 600, fontSize: 7, letterSpacing: "0.5em", textTransform: "uppercase", color: m.color, marginBottom: 6 }}>{m.role}</div>
                <div style={{ fontFamily: "'Noto Serif JP'", fontWeight: 300, fontSize: 18, letterSpacing: "0.1em", color: "#111", marginBottom: 8 }}>{m.name}</div>
                <a href={m.url} target="_blank" rel="noreferrer"
                  style={{ fontFamily: "'Josefin Sans'", fontWeight: 300, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#888", textDecoration: "none", borderBottom: "1px solid #e0e0e0", paddingBottom: 1, display: "inline-flex", alignItems: "center", gap: 4 }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.5"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  {m.handle} <span>↗</span>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
      <LinkRow links={creator.links} />
    </div>
  );

  return (
    <section id={creator.id} style={{ display: "flex", flexDirection: flip ? "row-reverse" : "row", borderBottom: "1px solid #ebebeb" }}>
      {imgPane}
      {infoPane}
    </section>
  );
}

/* ─────────────────────────────────────────
   FOOTER — lighter treatment
───────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "#111", padding: "80px 56px 56px", color: "#555" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginBottom: 56 }}>
        <div>
          <div style={{ fontFamily: "'Noto Serif JP'", fontWeight: 200, fontSize: 20, letterSpacing: "0.15em", color: "#777", marginBottom: 6 }}>機械羊製造所</div>
          <div style={{ fontFamily: "'Josefin Sans'", fontWeight: 200, fontSize: 8, letterSpacing: "0.55em", textTransform: "uppercase", color: "#333", marginBottom: 28 }}>Virtual Creator Community</div>
          <p style={{ fontFamily: "'Noto Serif JP'", fontWeight: 300, fontSize: 11, letterSpacing: "0.1em", lineHeight: 2.2, color: "#3a3a3a" }}>
            Virtualクリエイターコミュニティ。<br />
            ゲーム実況・音楽・ドール・<br />
            イラスト・動画制作など多様なクリエイターが所属。
          </p>
        </div>
        <div>
          {[
            { heading: "Contact", items: [{ t: "X / Twitter", v: "@automutton_pjt", u: "https://x.com/automutton_pjt" }, { t: "Email", v: "automuttonproject@gmail.com", u: "mailto:automuttonproject@gmail.com" }] },
            { heading: "Links", items: [{ t: "YouTube", v: "automutton — Eli & Lema", u: "https://www.youtube.com/@automutton-elilema-1927" }, { t: "Lit.link", v: "lit.link/automuttonproject", u: "https://lit.link/automuttonproject" }] },
          ].map(section => (
            <div key={section.heading} style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: "'Josefin Sans'", fontWeight: 400, fontSize: 8, letterSpacing: "0.5em", textTransform: "uppercase", color: "#333", borderBottom: "1px solid #1e1e1e", paddingBottom: 8, marginBottom: 14 }}>{section.heading}</div>
              {section.items.map(c => (
                <div key={c.t} style={{ marginBottom: 10 }}>
                  <div style={{ fontFamily: "'Josefin Sans'", fontSize: 7, letterSpacing: "0.5em", textTransform: "uppercase", color: "#2a2a2a", marginBottom: 2 }}>{c.t}</div>
                  <a href={c.u} target="_blank" rel="noreferrer"
                    style={{ fontFamily: "'Josefin Sans'", fontSize: 10, letterSpacing: "0.12em", color: "#555", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#ddd"}
                    onMouseLeave={e => e.currentTarget.style.color = "#555"}
                  >{c.v}</a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 24, fontFamily: "'Josefin Sans'", fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: "#2a2a2a" }}>
        © 機械羊製造所 — All Rights Reserved
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────
   APP
───────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Nav scrolled={scrolled} />
      <HeroSlider />

      <Band en="Member" jp="エリが企画・プロデュース" />
      {MEMBERS.map((c, i) => <CreatorCard key={c.id} creator={c} flip={i % 2 === 1} />)}

      <Band en="Sub Member" jp="エリがモデリング等一部担当" />
      {SUBMEMBERS.map((c, i) => <CreatorCard key={c.id} creator={c} flip={i % 2 === 1} />)}

      <Band en="Support" jp="イラスト・動画編集等を委託" />
      {SUPPORT.map((c, i) => <CreatorCard key={c.id} creator={c} flip={i % 2 === 1} />)}

      <Footer />
    </div>
  );
}
