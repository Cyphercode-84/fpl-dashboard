export default function Home() {
  return (
    <main>
      <header style={{background:"#38003c", color:"#fff", padding:"16px"}}>
        <div style={{maxWidth:960, margin:"0 auto", display:"flex", justifyContent:"space-between"}}>
          <div style={{fontWeight:700}}>FPL Dashboard</div>
          <a href="/dashboard" style={{opacity:0.9}}>Go to Dashboard →</a>
        </div>
      </header>

      <section style={{maxWidth:960, margin:"0 auto", padding:"24px 16px"}}>
        <h1 style={{fontSize:24, fontWeight:700}}>Connected to your Worker</h1>
        <p style={{marginTop:8, opacity:0.8}}>
          This dashboard loads data from your Cloudflare Worker summary endpoint.
        </p>

        <a
          href="/dashboard"
          style={{
            display:"inline-block",
            marginTop:16,
            background:"#e90052",
            color:"#fff",
            padding:"10px 14px",
            borderRadius:12,
            fontWeight:600
          }}
        >
          Open Dashboard
        </a>
      </section>
    </main>
  );
}

