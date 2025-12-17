// common.js

function esc(s){
  return String(s ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#39;");
}

// 2026-01-10T15:00:00.000Z → 2026-01-10
function formatDate(d){
  if(!d) return "";
  const dt = new Date(d);
  if (isNaN(dt)) return String(d);
  return dt.toISOString().slice(0,10);
}

function tagClass(tag){
  if(tag === "募集中") return "open";
  if(tag === "終了") return "closed";
  return "";
}

// ===== JSONP API =====
// ★あなたのApps Script WebアプリURL（/execまで）に置き換え
const API_BASE = "YOUR_SCRIPT_URL";

function jsonp(type){
  return new Promise((resolve, reject) => {
    const cb = "cb_" + Math.random().toString(16).slice(2);
    window[cb] = (data) => {
      delete window[cb];
      script.remove();
      resolve(data);
    };
    const script = document.createElement("script");
    script.src = `${API_BASE}?type=${encodeURIComponent(type)}&callback=${cb}`;
    script.onerror = () => reject(new Error("JSONP load failed"));
    document.body.appendChild(script);
  });
}

async function fetchItems(type){
  const data = await jsonp(type);
  if(!data.ok) throw new Error(data.error || "API error");
  return data.items || [];
}