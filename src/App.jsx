import { useState, useEffect, useRef } from "react";
import {
  img_automutton,
  img_hero_eli, img_hero_lema, img_hero_bathtub,
  img_aori, img_koori, img_tanza,
  img_bg, img_kekraku, img_gainenjoshikai,
  img_kuroYagi,
  img_lamb00, img_lamb01, img_lamb02, img_lamb03,
  img_aiVtuber,
} from "./images";

const HERO_SLIDES = [img_hero_eli, img_hero_lema, img_hero_bathtub];

/* ─── DATA ─── */
const MEMBERS = [
  {
    id: "automutton",
    name: "automutton",           // lowercase
    displayName: "automutton",
    nameStyle: { fontFamily: "'Orbitron', monospace", fontWeight: 900, letterSpacing: "0.06em", fontSize: "clamp(22px,3.2vw,48px)" },
    type: "Main Unit", status: "active",
    desc: "ゲーム実況・同時視聴\nドール・音楽",
    image: img_automutton, imgPos: "center top",
    alwaysStack: false, containImg: false,
    siteUrl: "https://automutton42.github.io", // カード/名前クリックでHP遷移
    links: [
      { label: "YouTube",     url: "https://www.youtube.com/@automutton-elilema-1927" },
      { label: "X / Twitter", url: "https://twitter.com/automutton42" },
    ],
    members: [
      { role: "Eli",  name: "エリ",  color: "#9e1b1d", url: "https://twitter.com/eli503503",  handle: "@eli503503" },
      { role: "Lema", name: "レマ", color: "#1a3f78", url: "https://twitter.com/lema404404", handle: "@lema404404" },
    ],
  },
  {
    id: "aori",
    name: "あおりちゃん",
    nameStyle: { fontFamily: "'Noto Serif JP', serif", fontWeight: 200, fontSize: "clamp(20px,2.8vw,38px)", letterSpacing: "0.14em" },
    type: "Vtuber", status: "preparing",
    desc: "歌・朗読",
    image: img_aori, imgPos: "center top",
    alwaysStack: false, containImg: false,
    links: [
      { label: "YouTube",     url: "https://www.youtube.com/@aorichan-verycute" },
      { label: "NicoNico",    url: "https://www.nicovideo.jp/user/141494151" },
      { label: "X / Twitter", url: "https://twitter.com/aorichaaaaaaaan" },
    ],
  },
  {
    id: "kuroYagi",
    name: "黑山羊禁猟区",
    nameStyle: { fontFamily: "'Hina Mincho', serif", fontSize: "clamp(20px,2.8vw,38px)", fontWeight: 400, letterSpacing: "0.12em" },
    type: "VIRTUAL SINGER UNIT", status: "preparing",
    desc: "歌（雑談・ゲーム）",
    image: img_kuroYagi, imgPos: "center top",
    alwaysStack: false, containImg: false,
    detailPage: "the-black-goat-sanctuary",
    links: [
      { label: "WISHLIST",    url: "https://gi-pt.com/main/wishlist/fan-view/3a2355e8-a657-a12d-7b0c-7b8662ab4599" },
      { label: "YouTube",     url: "https://www.youtube.com/@the-black-goat-sanctuary" },
      { label: "X / Twitter", url: "https://twitter.com/t_b_g_sanctuary" },
      { label: "BOOTH",       url: "https://t-b-goat-s.booth.pm" },
    ],
  },
];

const SUBMEMBERS = [
  {
    id: "tanza",
    name: "瀬ノ月タンザ",
    nameStyle: { fontFamily: "'Cinzel', serif", fontSize: "clamp(18px,2.6vw,36px)", fontWeight: 400, letterSpacing: "0.04em" },
    type: "Vtuber", status: "active",
    desc: "ゲーム実況・雑談",
    image: img_tanza, imgPos: "center top",
    alwaysStack: false, containImg: true,
    links: [
      { label: "YouTube",     url: "https://www.youtube.com/@-senodukitanza-8274" },
      { label: "X / Twitter", url: "https://twitter.com/Senoduki_Tanza" },
    ],
  },
  {
    id: "koori",
    name: "夏季こおり",
    nameStyle: { fontFamily: "'Quicksand', sans-serif", fontSize: "clamp(22px,3vw,42px)", fontWeight: 300, letterSpacing: "-0.02em" },
    type: "Vtuber", status: "active",
    desc: "ゲーム実況・雑談",
    image: img_koori, imgPos: "center top",
    alwaysStack: false, containImg: true,
    links: [
      { label: "YouTube",     url: "https://www.youtube.com/channel/UC32l5XRg1Q5sxMb13hr2mUg" },
      { label: "NicoNico",    url: "https://www.nicovideo.jp/user/138406804/live_programs" },
      { label: "X / Twitter", url: "https://twitter.com/summer_ice_0206" },
      { label: "Lit.link",    url: "https://lit.link/kakicori" },
    ],
  },
];

const AI_VTUBERS = [
  {
    id: "ai-vtuber",
    name: "機械羊開発室",
    nameStyle: { fontFamily: "'Noto Serif JP', serif", fontWeight: 200, fontSize: "clamp(20px,2.8vw,38px)", letterSpacing: "0.14em" },
    type: "AI Vtuber",
    status: "active",
    desc: "AIVtuber企画",
    image: img_aiVtuber, imgPos: "center",
    alwaysStack: false, containImg: false,
    links: [
      { label: "YouTube",     url: "https://www.youtube.com/channel/UCPf9Z4jT1ZkifdZBvq1Mn3A/" },
      { label: "X / Twitter", url: "https://x.com/LAMB00_MSDL" },
    ],
  },
];

const SUPPORT = [
  {
    id: "neko",
    name: "ねこウサギ",
    nameStyle: { fontFamily: "'Noto Serif JP', serif", fontSize: "clamp(18px,2.4vw,34px)", fontWeight: 300, letterSpacing: "0.08em" },
    type: "Illustrator / Video", status: "active",
    desc: "イラスト・動画作成\nautomutton 配信待機画面",
    image: null, imgPos: "center",
    alwaysStack: false, containImg: false,
    links: [
      { label: "SUZURI",      url: "https://suzuri.jp/nekousagi_ridria" },
      { label: "X / Twitter", url: "https://x.com/sagyo_nekousagi" },
    ],
  },
  {
    id: "tana",
    name: "棚にしヲ",
    nameStyle: { fontFamily: "'Space Mono', monospace", fontSize: "clamp(16px,2.2vw,30px)", fontWeight: 400, letterSpacing: "-0.03em" },
    type: "Video Edit / Cocofolia", status: "active",
    desc: "動画編集・ ココフォリア部屋作成\n一部動画 / Short動画",
    image: null, imgPos: "center",
    alwaysStack: false, containImg: false,
    links: [{ label: "Coconala", url: "https://coconala.com/users/4883055" }],
  },
];

const COLLABS = [
  {
    id: "kekraku",
    title: "欠落宴",
    tag: "#欠落宴",
    tagUrl: "https://twitter.com/search?q=%23%E6%AC%A0%E8%90%BD%E5%AE%B4&f=live",
    members: [{ name: "エリ（automutton）", creatorId: "automutton" }, { name: "瀬ノ月タンザ", creatorId: "tanza" }],
    freq: "毎月不定期開催",
    desc: "エリ×タンザのコラボ配信。毎月不定期開催。",
    image: img_kekraku,
    playlistUrl: "https://youtube.com/playlist?list=PL-YrS5XAg_cS5bGdSngQrNx6ANZOzrPOe&si=SDjNx8qgx3DDf_up",
  },
  {
    id: "gainenjoshikai",
    title: "概念女子会",
    tag: "#概念女子会",
    tagUrl: "https://twitter.com/search?q=%23%E6%A6%82%E5%BF%B5%E5%A5%B3%E5%AD%90%E4%BC%9A&f=live",
    members: [{ name: "エリ（automutton）", creatorId: "automutton" }, { name: "あおりちゃん", creatorId: "aori" }],
    freq: "ラジオ企画",
    status: "hiatus",
    desc: "エリ×あおりちゃんのラジオ企画。",
    image: img_gainenjoshikai,
    links: [
      { label: "X / Twitter",  url: "https://x.com/gainenjoshikai" },
      { label: "YouTube",      url: "https://www.youtube.com/@gainenjoshikai" },
      { label: "Podcast",      url: "https://creators.spotify.com/pod/profile/gainenjoshikai/" },
      { label: "Lit.link",     url: "https://lit.link/gainenjoshikai" },
    ],
  },
];

const ALL_CREATORS = [...MEMBERS, ...SUBMEMBERS, ...SUPPORT, ...AI_VTUBERS];

const VROID_ITEMS = [
  { id: "code-lamb-01", name: "CODE: LAMB -01", image: img_lamb01, url: "https://automutton.booth.pm/items/8135794" },
  { id: "code-lamb-02", name: "CODE: LAMB -02", image: img_lamb02, url: "https://automutton.booth.pm/items/8140335" },
  { id: "code-lamb-03", name: "CODE: LAMB -03", image: img_lamb03, url: "https://automutton.booth.pm/items/8146514" },
];

const VROID_FREE = [
  { id: "code-lamb-00", name: "CODE: LAMB -00", image: img_lamb00, url: "https://automutton42.fanbox.cc/posts/11756022" },
];

/* ─── PAGES ─── */
const PAGES = ["creator", "collab"];

/* ════════════════════════════════════
   SHARED COMPONENTS
════════════════════════════════════ */

function GlobalBg() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: -1, backgroundImage: `url(${img_bg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }} />
  );
}

function HeroSlider({ onNavClick }) {
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: "relative", width: "100%", height: "100svh", overflow: "hidden", background: "#111" }}>
      {HERO_SLIDES.map((src, i) => (
        <div key={i} style={{ position: "absolute", inset: 0, opacity: i === cur ? 1 : 0, transition: "opacity 1.6s ease", zIndex: i === cur ? 2 : 1 }}>
          <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", filter: "brightness(0.68)" }} />
        </div>
      ))}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,0.2) 0%,transparent 35%,transparent 50%,rgba(0,0,0,0.82) 100%)", zIndex: 5, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, padding: "0 clamp(24px,5vw,56px) clamp(32px,5vw,52px)", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 200, fontSize: 9, letterSpacing: "0.5em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 10 }}>Virtual Creator Community</p>
          <h1 style={{ fontFamily: "'Noto Serif JP',serif", fontWeight: 200, fontSize: "clamp(28px,5vw,54px)", letterSpacing: "0.16em", color: "#fff", lineHeight: 1.1 }}>機械羊製造所</h1>
          {/* page switcher on hero */}
          <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
            <button onClick={() => onNavClick("creator")}
              style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: 2 }}>
              Creator
            </button>
            <button onClick={() => onNavClick("collab")}
              style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: 2 }}>
              Collab
            </button>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, paddingBottom: 4 }}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCur(i)}
              style={{ border: "none", padding: 0, cursor: "pointer", height: 1, background: i === cur ? "#fff" : "rgba(255,255,255,0.3)", width: i === cur ? 32 : 14, transition: "all 0.35s" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── NAV ─── */
function Nav({ scrolled, page, onPageChange }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const visible = ALL_CREATORS.filter(c => c.status !== "coming");

  useEffect(() => {
    const fn = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const textColor = scrolled ? "#222" : "#fff";
  const linkColor = scrolled ? "#888" : "rgba(255,255,255,0.6)";
  const bg = scrolled ? "rgba(255,255,255,0.95)" : "transparent";

  const tabStyle = (active) => ({
    fontFamily: "'Josefin Sans',sans-serif", fontWeight: active ? 600 : 300,
    fontSize: 8, letterSpacing: "0.35em", textTransform: "uppercase",
    background: "none", border: "none", cursor: "pointer",
    color: active ? textColor : linkColor,
    borderBottom: `1.5px solid ${active ? textColor : "transparent"}`,
    padding: "0 12px", height: 48, display: "flex", alignItems: "center",
    transition: "all 0.2s",
  });

  return (
    <nav ref={menuRef} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, transition: "background 0.4s, box-shadow 0.4s", background: bg, backdropFilter: scrolled ? "blur(10px)" : "none", boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.08)" : "none" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(16px,4vw,40px)", height: 48 }}>
        <span style={{ fontFamily: "'Noto Serif JP',serif", fontWeight: 300, fontSize: 11, letterSpacing: "0.15em", color: textColor, flexShrink: 0, marginRight: 8 }}>機械羊製造所</span>

        {/* page tabs */}
        <div style={{ display: "flex", gap: 0, marginRight: 8 }}>
          <button style={tabStyle(page === "creator")} onClick={() => onPageChange("creator")}>Creator</button>
          <button style={tabStyle(page === "collab")}  onClick={() => onPageChange("collab")}>Collab</button>
        </div>

        {/* desktop links */}
        <div style={{ display: "flex", gap: 0, overflow: "hidden", flex: 1 }} className="nav-desktop">
          {page === "creator" && visible.map(c => (
            <a key={c.id} href={"#" + c.id}
              onClick={e => { e.preventDefault(); document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth" }); }}
              style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 300, fontSize: 8, letterSpacing: "0.25em", textDecoration: "none", color: linkColor, padding: "0 9px", height: 48, display: "flex", alignItems: "center", borderBottom: "1.5px solid transparent", transition: "all 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={e => { e.currentTarget.style.color = textColor; e.currentTarget.style.borderBottomColor = textColor; }}
              onMouseLeave={e => { e.currentTarget.style.color = linkColor; e.currentTarget.style.borderBottomColor = "transparent"; }}
            >{c.name}</a>
          ))}
          {page === "collab" && COLLABS.map(c => (
            <a key={c.id} href={"#collab-" + c.id}
              onClick={e => { e.preventDefault(); document.getElementById("collab-" + c.id)?.scrollIntoView({ behavior: "smooth" }); }}
              style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 300, fontSize: 8, letterSpacing: "0.2em", textDecoration: "none", color: linkColor, padding: "0 9px", height: 48, display: "flex", alignItems: "center", borderBottom: "1.5px solid transparent", transition: "all 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={e => { e.currentTarget.style.color = textColor; e.currentTarget.style.borderBottomColor = textColor; }}
              onMouseLeave={e => { e.currentTarget.style.color = linkColor; e.currentTarget.style.borderBottomColor = "transparent"; }}
            >{c.title}</a>
          ))}
        </div>

        {/* hamburger */}
        <button className="nav-hamburger" onClick={() => setOpen(o => !o)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 4px", display: "flex", flexDirection: "column", gap: 5, alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {[0,1,2].map(i => (
            <span key={i} style={{ display: "block", width: 22, height: 1.5, background: textColor, transition: "all 0.3s",
              transform: open && i===0 ? "rotate(45deg) translate(4.5px,4.5px)" : open && i===2 ? "rotate(-45deg) translate(4.5px,-4.5px)" : "none",
              opacity: open && i===1 ? 0 : 1 }} />
          ))}
        </button>
      </div>

      {/* dropdown */}
      <div style={{ position: "absolute", top: 48, left: 0, right: 0, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", overflow: "hidden", maxHeight: open ? 600 : 0, transition: "max-height 0.4s ease" }} className="nav-dropdown">
        <div style={{ borderBottom: "1px solid #f0f0f0", padding: "10px 24px 8px" }}>
          <button onClick={() => { onPageChange("creator"); setOpen(false); }} style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: "0.4em", background: "none", border: "none", cursor: "pointer", color: page==="creator" ? "#111" : "#999", fontWeight: page==="creator" ? 600 : 300, marginRight: 20 }}>Creator</button>
          <button onClick={() => { onPageChange("collab"); setOpen(false); }} style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: "0.4em", background: "none", border: "none", cursor: "pointer", color: page==="collab" ? "#111" : "#999", fontWeight: page==="collab" ? 600 : 300 }}>Collab</button>
        </div>
        {page === "creator" && visible.map((c, i) => (
          <a key={c.id} href={"#" + c.id}
            onClick={e => { e.preventDefault(); setOpen(false); setTimeout(() => document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth" }), 50); }}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 24px", fontFamily: "'Josefin Sans',sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: "0.28em", textDecoration: "none", color: "#444", borderBottom: i < visible.length-1 ? "1px solid #f0f0f0" : "none", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#f8f8f8"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >{c.name} <span style={{ color: "#ccc" }}>→</span></a>
        ))}
        {page === "collab" && COLLABS.map((c, i) => (
          <a key={c.id} href={"#collab-" + c.id}
            onClick={e => { e.preventDefault(); setOpen(false); setTimeout(() => document.getElementById("collab-" + c.id)?.scrollIntoView({ behavior: "smooth" }), 50); }}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 24px", fontFamily: "'Josefin Sans',sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: "0.2em", textDecoration: "none", color: "#444", borderBottom: i < COLLABS.length-1 ? "1px solid #f0f0f0" : "none", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#f8f8f8"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >{c.title} <span style={{ color: "#ccc" }}>→</span></a>
        ))}
      </div>
    </nav>
  );
}

/* ─── BAND ─── */
function Band({ en, jp }) {
  return (
    <div style={{ background: "rgba(18,18,18,0.78)", backdropFilter: "blur(6px)", borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(0,0,0,0.25)", padding: "14px clamp(20px,5vw,56px)", display: "flex", alignItems: "baseline", gap: 18 }}>
      <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 600, fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: "#e0e0e0" }}>{en}</span>
      <span style={{ fontFamily: "'Noto Serif JP',serif", fontWeight: 300, fontSize: 11, letterSpacing: "0.14em", color: "#777" }}>{jp}</span>
    </div>
  );
}

function Spacer() {
  return (
    <div style={{ height: "clamp(40px,6vw,80px)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <div style={{ position: "absolute", left: "8%", right: "8%", top: "50%", height: 1, background: "rgba(255,255,255,0.15)" }} />
    </div>
  );
}

/* ─── INFO PANEL ─── */
function InfoPanel({ creator, stacked }) {
  return (
    <div style={{ flex: stacked ? "none" : "0 0 50%", width: stacked ? "100%" : undefined, padding: "clamp(24px,4vw,44px) clamp(20px,4vw,52px)", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "rgba(255,255,255,0.93)", backdropFilter: "blur(4px)", minHeight: stacked ? 0 : "clamp(300px,40vw,520px)" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 300, fontSize: 8, letterSpacing: "0.4em", textTransform: "uppercase", color: "#aaa" }}>{creator.type}</span>
          <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 300, fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: creator.status === "preparing" ? "#ccc" : "#aaa", borderBottom: "1px solid #e8e8e8", paddingBottom: 2 }}>
            {creator.status === "preparing" ? "Preparing" : "Active"}
          </span>
        </div>
        {/* name — clickable if siteUrl */}
        <div style={{ borderBottom: "1px solid #efefef", paddingBottom: 18, marginBottom: 18 }}>
          {creator.siteUrl
            ? <a href={creator.siteUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "none", display: "inline-flex", alignItems: "baseline", gap: 8 }}>
                <div style={{ color: "#111", lineHeight: 1.2, ...creator.nameStyle }}>{creator.name}</div>
                <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, color: "#bbb", letterSpacing: "0.2em" }}>↗</span>
              </a>
            : <div style={{ color: "#111", lineHeight: 1.2, ...creator.nameStyle }}>{creator.name}</div>
          }
          {creator.siteUrl && (
            <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: "#bbb", marginTop: 6 }}>Official Site</div>
          )}
          {creator.detailPage && (
            <a href={"./the-black-goat-sanctuary.html"} target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8, fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", textDecoration: "none", borderBottom: "1px solid #e0e0e0", paddingBottom: 1 }}>
              詳細ページ <span>↗</span>
            </a>
          )}
        </div>
        {creator.desc && (
          <p style={{ fontFamily: "'Noto Serif JP',serif", fontWeight: 300, fontSize: 12, letterSpacing: "0.08em", lineHeight: 2.1, color: "#555", whiteSpace: "pre-line" }}>{creator.desc}</p>
        )}
        {creator.members && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px clamp(12px,2vw,20px)", marginTop: 20, paddingTop: 18, borderTop: "1px solid #f2f2f2" }}>
            {creator.members.map(m => (
              <div key={m.role}>
                <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 600, fontSize: 7, letterSpacing: "0.5em", textTransform: "uppercase", color: m.color, marginBottom: 5 }}>{m.role}</div>
                <div style={{ fontFamily: "'Noto Serif JP',serif", fontWeight: 300, fontSize: "clamp(14px,1.8vw,18px)", letterSpacing: "0.1em", color: "#222", marginBottom: 7 }}>{m.name}</div>
                <a href={m.url} target="_blank" rel="noreferrer"
                  style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", textDecoration: "none", borderBottom: "1px solid #e0e0e0", paddingBottom: 1, display: "inline-flex", alignItems: "center", gap: 3 }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.5"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >{m.handle} <span>↗</span></a>
              </div>
            ))}
          </div>
        )}
      </div>
      {creator.links && creator.links.length > 0 && (
        <div style={{ borderTop: "1px solid #ececec", paddingTop: 14, marginTop: 18 }}>
          {creator.links.map(l => (
            <a key={l.label} href={l.url} target="_blank" rel="noreferrer"
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f4f4f4", fontFamily: "'Josefin Sans',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#555", textDecoration: "none", transition: "opacity 0.18s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.4"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >{l.label} <span style={{ color: "#bbb", fontSize: 11 }}>↗</span></a>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── IMAGE PANEL ─── */
function ImagePanel({ creator, stacked }) {
  return (
    <div style={{ flex: stacked ? "none" : "0 0 50%", width: stacked ? "100%" : undefined, position: "relative", overflow: "hidden", minHeight: stacked ? "clamp(260px,60vw,420px)" : "clamp(300px,40vw,520px)", background: creator.containImg ? "#f8f8f8" : "#ddd" }}>
      {creator.image
        ? <img src={creator.image} alt={creator.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: creator.containImg ? "contain" : "cover", objectPosition: creator.imgPos || "center top", display: "block" }} />
        : <div style={{ position: "absolute", inset: 0, background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="0.8"><rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
          </div>
      }
    </div>
  );
}

/* ─── CREATOR CARD ─── */
function CreatorCard({ creator, flip = false }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 680);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 680);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  if (creator.status === "coming") {
    return (
      <section id={creator.id} style={{ minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.78)", backdropFilter: "blur(4px)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <div style={{ textAlign: "center", padding: "28px 20px" }}>
          <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", color: "#777", marginBottom: 10 }}>New Member — Preparing</div>
          <div style={{ fontFamily: "'Noto Serif JP',serif", fontSize: 22, fontWeight: 200, letterSpacing: "0.2em", color: "#444" }}>準備中</div>
        </div>
      </section>
    );
  }

  const stacked = creator.alwaysStack || isMobile;

  if (stacked) {
    return (
      <section id={creator.id} style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <ImagePanel creator={creator} stacked />
        <InfoPanel creator={creator} stacked />
      </section>
    );
  }

  return (
    <section id={creator.id} style={{ display: "flex", flexDirection: flip ? "row-reverse" : "row", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
      <ImagePanel creator={creator} stacked={false} />
      <InfoPanel creator={creator} stacked={false} />
    </section>
  );
}

/* ─── COPY TAG BADGE ─── */
function CopyTag({ tag }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(tag).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      style={{ position: "absolute", top: 16, left: 16, background: copied ? "rgba(60,60,60,0.85)" : "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", color: "#fff", fontFamily: "'Noto Serif JP',serif", fontWeight: 300, fontSize: 12, letterSpacing: "0.08em", padding: "6px 14px", border: "none", cursor: "pointer", transition: "background 0.2s", display: "flex", alignItems: "center", gap: 7 }}
      onMouseEnter={e => { if (!copied) e.currentTarget.style.background = "rgba(0,0,0,0.82)"; }}
      onMouseLeave={e => { if (!copied) e.currentTarget.style.background = "rgba(0,0,0,0.6)"; }}
    >
      {tag}
      <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: copied ? "#aef" : "rgba(255,255,255,0.5)", transition: "color 0.2s" }}>
        {copied ? "Copied!" : "Copy"}
      </span>
    </button>
  );
}

/* ─── SHOP ─── */
function ShopCard({ item, fanbox = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={item.url} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ flex: "0 0 clamp(120px,18vw,200px)", aspectRatio: "1/1", position: "relative", overflow: "hidden", display: "block", background: "#e8e8e8", textDecoration: "none" }}
    >
      {item.image
        ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        : <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="0.8"><rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
          </div>
      }
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.38)", display: "flex", alignItems: "center", justifyContent: "center", opacity: hovered ? 1 : 0, transition: "opacity 0.25s" }}>
        <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "#fff" }}>{fanbox ? "FANBOX ↗" : "BOOTH ↗"}</span>
      </div>
    </a>
  );
}

function ShopSection() {
  return (
    <div>
      <Band en="Shop" jp="販売VRoidシリーズ" />
      <div style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)", padding: "clamp(20px,3vw,40px) clamp(20px,5vw,56px)" }}>
        <div style={{ display: "flex", gap: "clamp(8px,1.5vw,20px)", flexWrap: "wrap" }}>
          {VROID_ITEMS.map(item => <ShopCard key={item.id} item={item} />)}
        </div>
        <div style={{ marginTop: "clamp(20px,3vw,36px)", paddingTop: "clamp(16px,2.5vw,28px)", borderTop: "1px solid #ececec" }}>
          <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 300, fontSize: 8, letterSpacing: "0.5em", textTransform: "uppercase", color: "#aaa", marginBottom: "clamp(12px,2vw,20px)" }}>
            FANBOX 支援者特典
          </div>
          <div style={{ display: "flex", gap: "clamp(8px,1.5vw,20px)", flexWrap: "wrap" }}>
            {VROID_FREE.map(item => <ShopCard key={item.id} item={item} fanbox />)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   COLLAB PAGE
════════════════════════════════════ */
function CollabCard({ collab, flip = false, onCreatorNav }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 680);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 680);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const stacked = isMobile;

  const imgPane = (
    <div style={{ flex: stacked ? "none" : "0 0 45%", width: stacked ? "100%" : undefined, position: "relative", overflow: "hidden", minHeight: stacked ? "clamp(260px,70vw,500px)" : "clamp(380px,45vw,600px)", background: "#222" }}>
      <img src={collab.image} alt={collab.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", filter: collab.status === "hiatus" ? "grayscale(0.5) brightness(0.7)" : "none" }} />
      {/* hiatus overlay */}
      {collab.status === "hiatus" && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(80,80,80,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 600, fontSize: "clamp(11px,2vw,15px)", letterSpacing: "0.5em", textTransform: "uppercase", color: "#fff", background: "rgba(0,0,0,0.55)", padding: "8px 20px", marginBottom: 8 }}>休止中</div>
            <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>On Hiatus</div>
          </div>
        </div>
      )}
      {/* tag copy badge */}
      <CopyTag tag={collab.tag} />
    </div>
  );

  const infoPane = (
    <div style={{ flex: stacked ? "none" : "0 0 55%", width: stacked ? "100%" : undefined, padding: "clamp(28px,4vw,56px) clamp(24px,4vw,60px)", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "rgba(255,255,255,0.93)", backdropFilter: "blur(4px)", minHeight: stacked ? 0 : "clamp(380px,45vw,600px)" }}>
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20 }}>
          <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 300, fontSize: 8, letterSpacing: "0.45em", textTransform: "uppercase", color: "#aaa" }}>Collab</span>
          <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 300, fontSize: 8, letterSpacing: "0.3em", color: "#ccc" }}>{collab.freq}</span>
          {collab.status === "hiatus" && (
            <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", borderBottom: "1px solid #ddd", paddingBottom: 1 }}>休止中</span>
          )}
        </div>
        {/* title */}
        <div style={{ borderBottom: "1px solid #efefef", paddingBottom: 20, marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Noto Serif JP',serif", fontWeight: 300, fontSize: "clamp(28px,4vw,52px)", letterSpacing: "0.1em", color: "#111", lineHeight: 1.2 }}>{collab.title}</h2>
        </div>
        <p style={{ fontFamily: "'Noto Serif JP',serif", fontWeight: 300, fontSize: 13, letterSpacing: "0.08em", lineHeight: 2.1, color: "#555", marginBottom: 20 }}>{collab.desc}<br /><span style={{ fontSize: 11, color: "#aaa" }}>X で <a href={collab.tagUrl} target="_blank" rel="noreferrer" style={{ color: "#aaa" }}>{collab.tag}</a> を検索</span></p>
        {/* members */}
        <div style={{ borderTop: "1px solid #f2f2f2", paddingTop: 16, marginBottom: 0 }}>
          <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 600, fontSize: 7, letterSpacing: "0.5em", textTransform: "uppercase", color: "#bbb", marginBottom: 10 }}>Members</div>
          {collab.members.map(m => (
            <button
              key={m}
              onClick={() => {
                onCreatorNav(m.creatorId);
              }}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "none", border: "none", cursor: "pointer", fontFamily: "'Noto Serif JP',serif", fontWeight: 300, fontSize: 13, letterSpacing: "0.08em", color: "#333", padding: "6px 0", borderBottom: "1px solid #f8f8f8", textAlign: "left", transition: "opacity 0.18s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.5"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              {m.name}
              <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: "#ccc" }}>→ Creator</span>
            </button>
          ))}
        </div>
      </div>
      {/* links */}
      <div style={{ borderTop: "1px solid #ececec", paddingTop: 14, marginTop: 24 }}>
        {collab.playlistUrl && (
          <a href={collab.playlistUrl} target="_blank" rel="noreferrer"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #f4f4f4", fontFamily: "'Josefin Sans',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#555", textDecoration: "none", transition: "opacity 0.18s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.4"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >配信アーカイブ playlist <span style={{ color: "#bbb", fontSize: 11 }}>↗</span></a>
        )}
        {collab.links && collab.links.map(l => (
          <a key={l.label} href={l.url} target="_blank" rel="noreferrer"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #f4f4f4", fontFamily: "'Josefin Sans',sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#555", textDecoration: "none", transition: "opacity 0.18s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.4"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >{l.label} <span style={{ color: "#bbb", fontSize: 11 }}>↗</span></a>
        ))}
      </div>
    </div>
  );

  return (
    <section id={"collab-" + collab.id} style={{ display: "flex", flexDirection: stacked ? "column" : (flip ? "row-reverse" : "row"), borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
      {imgPane}
      {infoPane}
    </section>
  );
}

function CollabPage({ onCreatorNav }) {
  return (
    <div style={{ marginTop: "clamp(32px,5vw,56px)" }}>
      <Band en="Collab" jp="定期コラボ企画" />
      {COLLABS.map((c, i) => <CollabCard key={c.id} collab={c} flip={i % 2 === 1} onCreatorNav={onCreatorNav} />)}
      <div style={{ height: "clamp(40px,6vw,64px)" }} />
    </div>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ background: "rgba(12,12,12,0.93)", backdropFilter: "blur(8px)", padding: "clamp(40px,6vw,72px) clamp(20px,5vw,56px) clamp(32px,4vw,52px)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "clamp(28px,4vw,56px)", marginBottom: 40 }}>
        <div>
          <div style={{ fontFamily: "'Noto Serif JP',serif", fontWeight: 200, fontSize: 18, letterSpacing: "0.15em", color: "#777", marginBottom: 6 }}>機械羊製造所</div>
          <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontWeight: 200, fontSize: 8, letterSpacing: "0.55em", textTransform: "uppercase", color: "#333", marginBottom: 24 }}>Virtual Creator Community</div>
          <p style={{ fontFamily: "'Noto Serif JP',serif", fontWeight: 300, fontSize: 11, letterSpacing: "0.08em", lineHeight: 2.3, color: "#4a4a4a" }}>
            Virtualクリエイターコミュニティ。<br />
            ゲーム実況・音楽・ドール・<br />
            イラスト・動画制作など。
          </p>
        </div>
        <div>
          {[
            { h: "Contact", items: [
              { t: "X / Twitter", v: "@automutton_pjt",            u: "https://x.com/automutton_pjt" },
              { t: "Email",       v: "automuttonproject@gmail.com", u: "mailto:automuttonproject@gmail.com" },
            ]},
            { h: "Links", items: [
              { t: "YouTube",  v: "automutton — Eli & Lema",   u: "https://www.youtube.com/@automutton-elilema-1927" },
              { t: "Lit.link", v: "lit.link/automuttonproject", u: "https://lit.link/automuttonproject" },
            ]},
          ].map(s => (
            <div key={s.h} style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: "0.5em", textTransform: "uppercase", color: "#3a3a3a", borderBottom: "1px solid #1e1e1e", paddingBottom: 8, marginBottom: 12 }}>{s.h}</div>
              {s.items.map(c => (
                <div key={c.t} style={{ marginBottom: 10 }}>
                  <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 7, letterSpacing: "0.5em", textTransform: "uppercase", color: "#2e2e2e", marginBottom: 2 }}>{c.t}</div>
                  <a href={c.u} target="_blank" rel="noreferrer"
                    style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 10, letterSpacing: "0.12em", color: "#666", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#ccc"}
                    onMouseLeave={e => e.currentTarget.style.color = "#666"}
                  >{c.v}</a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: "1px solid #1e1e1e", paddingTop: 20, fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: "#333" }}>
        © 機械羊製造所 — All Rights Reserved
      </div>
    </footer>
  );
}

/* ─── APP ─── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [page, setPage] = useState("creator");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > window.innerHeight * 0.72);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handlePageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ background: "transparent", minHeight: "100vh" }}>
      <GlobalBg />
      <Nav scrolled={scrolled} page={page} onPageChange={handlePageChange} />
      <HeroSlider onNavClick={handlePageChange} />

      {page === "creator" && (
        <>
          <div style={{ marginTop: "clamp(32px,5vw,56px)" }}>
            <Band en="Member" jp="エリが企画・プロデュース" />
            {MEMBERS.map((c, i) => <CreatorCard key={c.id} creator={c} flip={i % 2 === 1} />)}
          </div>
          <Spacer />
          <div>
            <Band en="Sub Member" jp="エリがモデリング等一部担当" />
            {SUBMEMBERS.map((c, i) => <CreatorCard key={c.id} creator={c} flip={i % 2 === 1} />)}
          </div>
          <Spacer />
          <div>
            <Band en="Support" jp="イラスト・動画編集等を委託" />
            {SUPPORT.map((c, i) => <CreatorCard key={c.id} creator={c} flip={i % 2 === 1} />)}
          </div>
          <Spacer />
          <div>
            <Band en="AI Vtuber" jp="AIVtuber企画" />
            {AI_VTUBERS.map((c, i) => <CreatorCard key={c.id} creator={c} flip={i % 2 === 1} />)}
          </div>
          <Spacer />
          <ShopSection />
          <div style={{ height: "clamp(40px,6vw,64px)" }} />
        </>
      )}

      {page === "collab" && <CollabPage onCreatorNav={(id) => { handlePageChange("creator"); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 400); }} />}

      <Footer />
    </div>
  );
}
