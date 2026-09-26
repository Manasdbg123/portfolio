import React from "react";
import { FiArrowUpRight, FiAward, FiTrendingUp } from "react-icons/fi";
import { SiCodeforces, SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { FaTrophy, FaCode } from "react-icons/fa";
import { codingProfiles } from "../data/profile";
import photo from "../images/profile.jpg";
import SectionHeader from "./SectionHeader";
import TiltCard from "./TiltCard";
import RatingRing from "./RatingRing";
import RatingChart from "./RatingChart";
import useCodeforces, { rankColor, titleCase } from "../hooks/useCodeforces";
import useCountUp from "../hooks/useCountUp";

const PLATFORM_ICONS = { Codeforces: SiCodeforces, LeetCode: SiLeetcode, GeeksforGeeks: SiGeeksforgeeks };

function Stat({ label, value, color }) {
  return (
    <div className="cp-stat">
      <span className="cp-stat-value" style={color ? { color } : undefined}>{value}</span>
      <span className="cp-stat-label">{label}</span>
    </div>
  );
}

function ProfileCard({ icon: Icon, platform, handle, link, rating, title, color, progress, image, stats, highlights, children, delay }) {
  const [countRef, shown] = useCountUp(rating);
  return (
    <TiltCard className="card cp-card" reveal delay={delay} max={5} style={{ "--cp": color }}>
      <div className="cp-top">
        <span className="cp-platform"><Icon aria-hidden="true" /> {platform}</span>
        <span className="cp-handle">@{handle}</span>
      </div>

      <div className="cp-hero">
        <RatingRing progress={progress} color={color} image={image} alt={`${platform} profile of ${handle}`}>
          <span className="cp-ring-badge" style={{ background: color }}><FiAward /> {title}</span>
        </RatingRing>
        <div className="cp-rating" ref={countRef}>
          <span className="cp-rating-value" style={{ color }}>{shown}</span>
          <span className="cp-rating-label">{platform === "Codeforces" ? "Max rating" : "Contest rating"}</span>
        </div>
      </div>

      <div className="cp-stats">
        {stats.map((s) => <Stat key={s.label} {...s} />)}
      </div>

      <ul className="cp-highlights">
        {highlights.map((h) => (
          <li key={h}><FaTrophy aria-hidden="true" /> {h}</li>
        ))}
      </ul>

      {children}

      <a className="btn btn-ghost cp-link" href={link} target="_blank" rel="noreferrer">
        View {platform} profile <FiArrowUpRight />
      </a>
    </TiltCard>
  );
}

export default function CodingProfiles() {
  const { codeforces: cf, leetcode: lc, totalSolved, platforms, ringScale } = codingProfiles;
  const live = useCodeforces(cf.handle);

  // Prefer live numbers, but never show a peak lower than the résumé's.
  const cfMax = Math.max(live?.maxRating || 0, cf.maxRating);
  const cfMaxRank = live && live.maxRating >= cf.maxRating ? titleCase(live.maxRank) : cf.maxRank;
  const cfColor = live ? rankColor(cfMaxRank) : cf.color;
  const cfProgress = cfMax / ringScale;

  const cfStats = [
    { label: "Peak title", value: cfMaxRank, color: cfColor },
    live?.rating ? { label: "Current rating", value: live.rating, color: rankColor(live.rank) } : { label: "Best global rank", value: "#57" },
    live?.history?.length ? { label: "Rated contests", value: live.history.length } : { label: "Next title", value: cf.nextTitle },
  ];
  const lcStats = [
    { label: "Badge", value: lc.badge, color: lc.color },
    { label: "Best global rank", value: "#11" },
    { label: "Percentile", value: "Top 5%" },
  ];

  return (
    <section id="coding" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Coding profiles"
          title="Competitive programming"
          intro={`Contest ratings and ranks on Codeforces and LeetCode, and ${totalSolved} problems solved across four platforms.`}
        />

        <div className="cp-grid">
          <ProfileCard
            icon={SiCodeforces}
            platform="Codeforces"
            handle={cf.handle}
            link={cf.link}
            rating={cfMax}
            title={cfMaxRank}
            color={cfColor}
            progress={cfProgress}
            image={live?.avatar || photo}
            stats={cfStats}
            highlights={cf.highlights}
            delay={0}
          >
            {live?.history?.length > 1 && <RatingChart history={live.history} color={cfColor} />}
          </ProfileCard>

          <ProfileCard
            icon={SiLeetcode}
            platform="LeetCode"
            handle={lc.handle}
            link={lc.link}
            rating={lc.rating}
            title={lc.badge}
            color={lc.color}
            progress={lc.rating / ringScale}
            image={photo}
            stats={lcStats}
            highlights={lc.highlights}
            delay={100}
          />
        </div>

        <TiltCard className="card cp-total" reveal max={3}>
          <span className="cp-total-icon"><FiTrendingUp aria-hidden="true" /></span>
          <div className="cp-total-text">
            <span className="cp-total-value gradient-text">{totalSolved}</span>
            <span className="cp-total-label">problems solved</span>
          </div>
          <ul className="cp-total-platforms">
            {platforms.map((p) => {
              const Icon = PLATFORM_ICONS[p] || FaCode;
              return <li key={p}><Icon aria-hidden="true" /> {p}</li>;
            })}
          </ul>
        </TiltCard>
      </div>
    </section>
  );
}
