export type EntrySummary = {
  entry: any;
  history: any;
  picks: any;
  bootstrap: any;
  meta: { entry_id: number; event: number | null; generated_at: string; source: string };
  errors?: Array<{ part: string; status: number; message: string }>;
};

const BASE =
  process.env.NEXT_PUBLIC_FPL_PROXY_BASE ||
  "https://bold-art-c89e.donavan-chetty.workers.dev";

export async function getEntrySummary(entryId: string): Promise<EntrySummary> {
  const res = await fetch(`${BASE}/api/entry/${entryId}/summary`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Proxy error ${res.status}`);
  return res.json();
}

