import {
  FaGlobe,
  FaRobot,
  FaEye,
  FaDesktop,
  FaShieldAlt,
  FaBolt,
} from "react-icons/fa";
import { CiMicrophoneOn } from "react-icons/ci";
import { MdEmail } from "react-icons/md";

const features = [
  {
    icon: <FaGlobe size={32} color="#667eea" />,
    title: "Secure Document Storage",
    desc: "Safely store your PDFs and access them on the go, anytime and from any device.",
  },
  {
    icon: <FaRobot size={32} color="#667eea" />,
    title: "AI Document Intelligence",
    desc: "Let smart AI technology read and comprehend your files, simplifying your search for information.",
  },
  {
    icon: <FaEye size={32} color="#667eea" />,
    title: "Quick Content Insights",
    desc: "Skip the clutter—instantly pull key points and summaries from lengthy documents.",
  },
  {
    icon: <FaDesktop size={32} color="#667eea" />,
    title: "Access Anywhere",
    desc: "Open your files and chat history effortlessly across devices, browsers, and locations.",
  },
  {
    icon: <CiMicrophoneOn size={32} color="#667eea" />,
    title: "Voice Feature",
    desc: "Tired of typing, no issue, start speaking and let the AI do the rest.",
  },
  {
    icon: <MdEmail size={32} color="#667eea" />,
    title: "Email Services",
    desc: "Send The Chat Summary Directly To Your Email.",
  },
];


export default function FeatureCards() {
  return (
    <section style={{ background: "#f6f8fc", padding: "48px 0" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h2 style={{ fontSize: 36, fontWeight: 700 }}>Powerful Features</h2>
        <p style={{ color: "#666", fontSize: 18, marginTop: 8 }}>
          Everything you need to interact with your documents intelligently
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 32,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {features.map((f, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              padding: 32,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 16,
              minHeight: 200,
            }}
          >
            <div>{f.icon}</div>
            <h3 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>
              {f.title}
            </h3>
            <p style={{ color: "#666", margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
