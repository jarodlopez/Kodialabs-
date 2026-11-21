import { S, ORDER, WHEN, ADD, PT, RUSH, EARLY, wa, LEAD_URL } from "./data.js";

const newOrder = () => {
  const c = "ABCDEFGHJKMNPQRSTUVWXYZ23456789", r = new Uint8Array(4);
  crypto.getRandomValues(r);
  const t = new Date(), p = (n) => String(n).padStart(2, "0");
  return "KL-" + String(t.getFullYear()).slice(2) + p(t.getMonth() + 1) + p(t.getDate()) + "-" + [...r].map((v) => c[v % c.length]).join("");
};

export function result(Q) {
  const s = S[Q.seg], a = Q.a;
  const i = a.sc < 3 ? a.sc : PT[Q.seg][a.pain];
  const x = s.pk[i];
  let ad = ADD[Q.seg][a.pain];
  if (ad && i > ad[2]) ad = null;
  let adj = 0, al = "";
  if (a.when === 0) {
    adj = Math.max(RUSH.min, Math.round(x.p * RUSH.pct)); al = "Prioridad de agenda (menos de 2 semanas)";
    // La urgencia nunca debe dejar el total igual o por encima del paquete siguiente
    const nx = s.pk[i + 1];
    if (nx) adj = Math.max(0, Math.min(adj, nx.p - 1 - x.p - (ad ? ad[1] : 0)));
    if (!adj) al = "";
  }
  if (a.when === 2 && x.p >= EARLY.minPrice) { adj = -Math.round(x.p * EARLY.pct); al = "Descuento por reservar con anticipación"; }
  const tot = x.p + (ad ? ad[1] : 0) + adj;
  return { s, a, i, x, ad, adj, al, tot, seg: Q.seg };
}

export function pdf(J, R) {
  const d = new J({ unit: "mm", format: "a4" }), W = 210, s = R.s, x = R.x, a = R.a, pv = R.i ? s.pk[R.i - 1] : null;
  let y = 0;
  const G = [125, 125, 128], K = [20, 20, 20], T = [40, 40, 40], L = [199, 253, 28];
  const star = (cx, cy, r) => { const k = r * 0.2, p = [[cx, cy - r], [cx + k, cy - k], [cx + r, cy], [cx + k, cy + k], [cx, cy + r], [cx - k, cy + k], [cx - r, cy], [cx - k, cy - k]]; d.setFillColor(L[0], L[1], L[2]); d.lines(p.slice(1).map((q, n) => [q[0] - p[n][0], q[1] - p[n][1]]), p[0][0], p[0][1], [1, 1], "F", true); };
  const ens = (h) => { if (y + h > 276) { d.addPage(); y = 20; } };
  const tx = (t, X, sz, col, b, o) => { d.setFont("helvetica", b ? "bold" : "normal"); d.setFontSize(sz); d.setTextColor(col[0], col[1], col[2]); d.text(t, X, y, o || {}); };
  const f = (t) => new Date(t).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });
  const pair = (l1, v1, l2, v2) => { tx(l1, 15, 8, G, 1); tx(l2, 110, 8, G, 1); y += 6; tx(v1, 15, 11, K, 0); tx(v2, 110, 11, K, 0); };
  d.setFillColor(5, 5, 5); d.rect(0, 0, W, 38, "F");
  y = 23; tx("kodialabs", 15, 22, [255, 255, 255], 1); star(15 + d.getTextWidth("kodialabs") + 3, 15.5, 2.6);
  y = 16; tx("COTIZACIÓN", W - 15, 10, [200, 190, 184], 0, { align: "right" });
  y = 24; tx(R.ord, W - 15, 14, L, 1, { align: "right" });
  y = 52; pair("SERVICIO", s.label, "PARA", s.uso[a.uso]);
  y += 11; pair("TAMAÑO", s.sc[a.sc], "PLAZO", WHEN[a.when]);
  y += 11; pair("FECHA", f(R.ts), "VÁLIDA HASTA", f(R.ts + 7 * 864e5));
  y += 12; d.setDrawColor(L[0], L[1], L[2]); d.setLineWidth(0.9); d.line(15, y, W - 15, y);
  y += 7; tx("CONCEPTO", 15, 8, G, 1); tx("IMPORTE", W - 15, 8, G, 1, { align: "right" });
  const rows = [[s.label + " · Paquete " + x.n + " (" + x.u + ")", x.p]];
  if (R.ad) rows.push([R.ad[0], R.ad[1]]);
  if (R.adj) rows.push([R.al, R.adj]);
  rows.forEach((r) => { y += 8; ens(8); tx(r[0], 15, 11, K, 0); tx((r[1] < 0 ? "–" : "") + "$" + Math.abs(r[1]), W - 15, 11, K, 0, { align: "right" }); });
  y += 5; d.setDrawColor(210, 205, 200); d.setLineWidth(0.2); d.line(15, y, W - 15, y);
  y += 9; d.setFillColor(L[0], L[1], L[2]); d.roundedRect(W - 15 - 44, y - 8.5, 44, 12.5, 3, 3, "F"); tx("TOTAL", 15, 12, K, 1); tx("$" + R.tot, W - 15 - 4, 18, K, 1, { align: "right" });
  y += 14; ens(14); tx("QUÉ INCLUYE", 15, 8, G, 1);
  const inc = [];
  if (pv) inc.push("Todo lo del paquete " + pv.n + ", y además:");
  (x.items || x.extra).forEach((t) => inc.push("• " + t));
  if (R.ad) inc.push("• Extra: " + R.ad[0]);
  inc.forEach((t) => { y += 6.5; ens(7); tx(t, 15, 11, T, 0); });
  y += 12; ens(26); tx("LO QUE NOS CONTASTE", 15, 8, G, 1);
  y += 6; tx(s.pain[a.pain][0], 15, 11, K, 1);
  d.splitTextToSize("Cómo lo resolvemos: " + s.pain[a.pain][1], 180).forEach((l) => { y += 6; ens(7); tx(l, 15, 11, T, 0); });
  y += 14; ens(36); d.setFillColor(244, 244, 242); d.roundedRect(15, y - 5, W - 30, 33, 2, 2, "F");
  y += 2; tx("Condiciones", 20, 10, K, 1);
  y += 6; tx("Cotización válida por 7 días. La fecha se reserva con un anticipo del 50%.", 20, 9.5, [70, 70, 70], 0);
  y += 5.5; tx("Pago en dólares o en córdobas al tipo de cambio oficial del BCN del día.", 20, 9.5, [70, 70, 70], 0);
  y += 5.5; tx("No incluye viáticos fuera de Managua.", 20, 9.5, [70, 70, 70], 0);
  y += 5.5; tx("Para confirmar, comparte tu número de orden por WhatsApp.", 20, 9.5, [70, 70, 70], 0);
  d.setPage(d.getNumberOfPages()); y = 285;
  tx("kodialabs · hola@kodialabs.com · @kodialabs", W / 2, 9, G, 0, { align: "center" });
  return d.output("blob");
}

export function initQuiz(el) {
  const pre = el.dataset.seg || "";
  const Q = { seg: pre, a: {}, i: 0, ord: "", ts: 0, sent: "" };
  const steps = () => (pre ? ["uso", "pain", "sc", "when"] : ["seg", "uso", "pain", "sc", "when"]);

  function view() {
    const st = steps();
    if (Q.i >= st.length) return resultView();
    const c = st[Q.i], s = S[Q.seg];
    let t, o;
    if (c === "seg") { t = "¿Qué necesitas?"; o = ORDER.map((k) => S[k].label); }
    if (c === "uso") { t = "¿Para qué usarás esto?"; o = s.uso; }
    if (c === "pain") { t = "¿Qué es lo que más te preocupa?"; o = s.pain.map((p) => p[0]); }
    if (c === "sc") { t = "¿Qué tan grande es lo que necesitas?"; o = s.sc; }
    if (c === "when") { t = "¿Para cuándo lo necesitas?"; o = WHEN; }
    return `<button class="linkbtn" data-back>← Atrás</button><div class="prog"><i style="width:${Math.round(((Q.i + 1) / st.length) * 100)}%"></i></div><span class="note">Pregunta ${Q.i + 1} de ${st.length}</span><h2>${t}</h2><div class="opts">${o.map((x, j) => `<button class="opt" data-j="${j}">${x}</button>`).join("")}</div>`;
  }

  function resultView() {
    if (!Q.ord) { Q.ord = newOrder(); Q.ts = Date.now(); }
    const R = result(Q); R.ord = Q.ord; R.ts = Q.ts; Q.R = R;
    const { s, a, x, ad, adj, al, tot, i } = R;
    const m = `Hola kodialabs, quiero cotizar ${s.label.toLowerCase()}. Uso: ${s.uso[a.uso]}. Mi mayor preocupación: ${s.pain[a.pain][0]}. Tamaño: ${s.sc[a.sc]}. Lo necesito: ${WHEN[a.when].toLowerCase()}. Oferta: ${x.n}${ad ? " + " + ad[0] : ""} = $${tot}. Cotización N.º ${Q.ord}.`;
    if (LEAD_URL && Q.sent !== Q.ord) {
      Q.sent = Q.ord;
      try { navigator.sendBeacon(LEAD_URL, JSON.stringify({ orden: Q.ord, servicio: s.label, uso: s.uso[a.uso], preocupacion: s.pain[a.pain][0], tamano: s.sc[a.sc], plazo: WHEN[a.when], paquete: x.n, extra: ad ? ad[0] : "", total: tot })); } catch (e) {}
    }
    const bd = `<div class="bd"><div><span>Paquete ${x.n}</span><span>$${x.p}</span></div>${ad ? `<div><span>${ad[0]}</span><span>+$${ad[1]}</span></div>` : ""}${adj ? `<div><span>${al}</span><span>${adj > 0 ? "+" : "–"}$${Math.abs(adj)}</span></div>` : ""}<div class="tot"><span>Total</span><span>$${tot}</span></div></div>`;
    const li = (x.items || x.extra).map((t) => `<li${x.extra ? ' class="new"' : ""}>${t}</li>`).join("");
    return `<button class="linkbtn" data-back>← Cambiar respuestas</button><h2 style="margin-top:18px">Tu oferta</h2><p class="lead" style="margin-top:16px">${a.sc === 3 ? "Como aún no tenías claro el tamaño, la armamos según lo que más te preocupa." : "Armada según lo que nos contaste."}</p><div class="res"><article class="card feat"><h3>${x.n}</h3><div class="price">$${tot}<small>total · ${x.u}</small></div>${bd}<p class="sub">${i ? "Todo lo de " + s.pk[i - 1].n.toLowerCase() + ", y además:" : "Incluye:"}</p><ul>${li}</ul><a class="btn" href="${wa(m)}">Pedir esta oferta</a><button class="btn line" style="width:100%;margin-top:12px;cursor:pointer" data-dl>Descargar cotización en PDF</button><p class="sm" id="dlmsg" role="status">Cotización N.º ${Q.ord} · válida por 7 días. Sin compromiso.</p></article><p class="why"><b style="font-weight:500">Para lo que te preocupa:</b> ${s.pain[a.pain][1]}</p><div class="cta-row"><a class="btn line" href="/${Q.seg}">Ver todos los paquetes</a></div></div>`;
  }

  const draw = () => { el.innerHTML = view(); window.scrollTo(0, 0); };

  async function download() {
    const m = document.getElementById("dlmsg"), R = Q.R;
    try {
      m.textContent = "Generando PDF…";
      const { jsPDF } = await import("jspdf");
      const u = URL.createObjectURL(pdf(jsPDF, R));
      const link = document.createElement("a");
      link.href = u; link.download = "Cotizacion-" + R.ord + ".pdf";
      document.body.appendChild(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(u), 5000);
      m.textContent = "Listo. Guarda tu número de orden: " + R.ord;
    } catch (e) {
      m.textContent = "No pudimos generar el PDF. Pide la oferta por WhatsApp y te la enviamos.";
    }
  }

  el.addEventListener("click", (e) => {
    const b = e.target.closest("[data-j]");
    if (b) {
      const c = steps()[Q.i], j = +b.dataset.j;
      if (c === "seg") Q.seg = ORDER[j]; else Q.a[c] = j;
      Q.i++; Q.ord = ""; draw(); return;
    }
    if (e.target.closest("[data-back]")) {
      if (Q.i > 0) { Q.i--; Q.ord = ""; draw(); } else location.href = pre ? "/" + pre : "/";
      return;
    }
    if (e.target.closest("[data-dl]")) download();
  });
  draw();
}
