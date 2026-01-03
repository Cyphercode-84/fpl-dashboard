"use client";

import { useState } from "react";
import { getEntrySummary, type EntrySummary } from "@/lib/fpl";

export default function DashboardPage() {
  const [entryId, setEntryId] = useState("7144473");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<EntrySummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onLoad() {
    setLoading(true);
    setError(null);
    try {
      const s = await getEntrySummary(entryId.trim());
      setData(s);
      if (s.errors?.length) {
        setError("Partial: " + s.errors.map(e => `${e.part}(${e.status})`).join(", "));
      }
    } catch (e: any) {
      setData(null);
      setError(e?.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  const rank = typeof data?.entry?.summary_overall_rank === "number"
    ? data!.entry.summary_overall_rank.toLocaleString()
    : "—";

  const points = typeof data?.entry?.summary_overall_points === "number"
    ? data!.entry.summary_overall_points.toLocaleString()
    : "—";

  const gw = typeof data?.entry?.summary_event_points === "number"
    ? String(data!.entry.summary_event_points)
    : "—";

  return (
    <main>
      <header style={{background:"#38003c", color:"#fff", padding:"16px"}}>
        <div style={{maxWidth:960, margin:"0 auto", display:"flex", justifyContent:"space-between", gap:12}}>
          <div>
            <div style={{fontSize:12, opacity:0.8}}>Fantasy Premier League</div>
            <div style={{fontSize:18, fontWeight:700}}>Dashboard</div>
          </div>

          <div style={{display:"flex", gap:8, alignItems:"center"}}>
            <input
              value={entryId}
              onChange={(e) => setEntryId(e.target.value)}
              placeholder="Entry ID"
              inputMode="numeric"
              style={{
                width:150,
                padding:"10px 12px",
                borderRadius:12,
                border:"1px solid rgba(255,255,255,0.25)",
                background:"rgba(255,255,255,0.08)",
                color:"#fff",
                outline:"none"
              }}
            />
            <button
              onClick={onLoad}
              disabled={loading}
              style={{
                padding:"10px 14px",
                borderRadius:12,
                border:"none",
                background:"#e90052",
                color:"#fff",
                fontWeight:700,
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? "Loading..." : "Load"}
            </button>
          </div>
        </div>
      </header>

      <section style={{maxWidth:960, margin:"0 auto", padding:"24px 16px"}}>
        {error && (
          <div style={{padding:12, borderRadius:12, background:"rgba(0,0,0,0.05)"}}>
            {error}
          </div>
        )}

        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:12, marginTop:12}}>
          <Card label="Overall Rank" value={rank} />
          <Card label="Overall Points" value={points} />
          <Card label="GW Points" value={gw} />
          <Card label="Current GW" value={data?.meta?.event ? String(data.meta.event) : "—"} />
        </div>

        <div style={{marginTop:16, padding:16, borderRadius:16, border:"1px solid rgba(0,0,0,0.1)"}}>
          <div style={{fontSize:12, opacity:0.7}}>Generated</div>
          <div style={{fontWeight:700, marginTop:4}}>
            {data?.meta?.generated_at ? new Date(data.meta.generated_at).toLocaleString() : "—"}
          </div>
        </div>
      </section>
    </main>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div style={{padding:16, borderRadius:16, border:"1px solid rgba(0,0,0,0.1)"}}>
      <div style={{fontSize:12, opacity:0.7}}>{label}</div>
      <div style={{fontSize:22, fontWeight:800, marginTop:6}}>{value}</div>
    </div>
  );
}

