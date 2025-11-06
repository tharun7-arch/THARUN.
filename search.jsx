import React, { useState } from 'react';
import api from '../services/api';

export default function Search(){
  const [q, setQ] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  async function doSearch(e){
    e?.preventDefault();
    setLoading(true);
    try {
      const r = await api.get('/api/search', { params: { q }});
      setResults(r.data);
    } catch(err){
      setResults({ error: err.message });
    } finally { setLoading(false); }
  }

  return (
    <div>
      <h2>Search Medicines</h2>
      <form onSubmit={doSearch}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="e.g. Paracetamol" style={{width:400, marginRight:8}}/>
        <button disabled={!q || loading}>Search</button>
      </form>

      <div style={{marginTop:16}}>
        {loading && <div>Loading…</div>}
        {results && <pre>{JSON.stringify(results, null, 2)}</pre>}
      </div>
    </div>
  );
}