export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = size === "sm" ? "w-8 h-8" : size === "lg" ? "w-14 h-14" : "w-10 h-10";
  return (
    <div className={`${dims} rounded-lg bg-spectrum-dark flex items-center justify-center relative overflow-hidden`}>
      {/* House silhouette + WiFi arcs */}
      <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
        {/* House */}
        <path d="M20 8L6 20h4v12h8v-8h4v8h8V20h4L20 8z" fill="white" />
        {/* WiFi arcs */}
        <path d="M20 14a12 12 0 0 1 8.5 3.5" stroke="#F6A623" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M20 14a8 8 0 0 1 6 2.5" stroke="#F6A623" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M20 14a4 4 0 0 1 3.5 1.5" stroke="#F6A623" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}
