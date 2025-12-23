el.innerHTML = items.slice(0,5).map(n => `
  <div class="news-card">
    <div class="meta">
      <span class="tag ${tagClass(String(n.tag||""))}">${esc(n.tag || "更新")}</span>
      <span>${esc(formatDate(n.date))}</span>
    </div>
    <strong>${esc(n.title || "")}</strong>
    ${n.url ? `<a href="${esc(n.url)}">詳細を見る →</a>` : ""}
  </div>
`).join("");
