/* ============================================================
   STINSON SERVICES — SHARED JAVASCRIPT UTILITIES
   All tools can import this for common functions.
   Last updated: April 2026
   ============================================================ */

'use strict';

/* ── CONSTANTS ── */
const STINSON = {
  TARGET_ANNUAL:  1500000,
  TARGET_LABEL:   '$1.5M',
  FISCAL_START:   'April 2026',
  FISCAL_END:     'March 2027',

  REPS: {
    HS: { name: 'Heidi Stinson',  color: '#2a5fa8' },
    JV: { name: 'Jeff Vacanti',   color: '#1a7a4a' },
    JA: { name: 'Jim Anderson',   color: '#8a5a00' },
    RS: { name: 'Ryan Stinson',   color: '#8a2040' },
  },

  SLII: {
    d1: { label: 'D1', desc: 'Enthusiastic beginner', style: 'S1 Directing',  color: '#8a4e00', bg: '#fdf0e0', border: '#c97a00' },
    d2: { label: 'D2', desc: 'Disillusioned learner', style: 'S2 Coaching',   color: '#8a1a1a', bg: '#fce8e8', border: '#c0302e' },
    d3: { label: 'D3', desc: 'Capable but cautious',  style: 'S3 Supporting', color: '#1a4a8a', bg: '#e8eef7', border: '#4a7abf' },
    d4: { label: 'D4', desc: 'Self-reliant achiever', style: 'S4 Delegating', color: '#1a6640', bg: '#e6f2ec', border: '#2a8050' },
  }
};

/* ── MONEY ── */
function parseMoney(str) {
  if (!str) return 0;
  return parseFloat(String(str).replace(/[$,\s]/g, '')) || 0;
}

function formatMoney(val, compact = false) {
  const n = parseFloat(val) || 0;
  if (compact) {
    if (n >= 1000000) return '$' + (n / 1000000).toFixed(2) + 'M';
    if (n >= 1000)    return '$' + (n / 1000).toFixed(0) + 'K';
    return '$' + n.toFixed(0);
  }
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function pipelinePct(val) {
  return Math.min(Math.round((parseMoney(val) / STINSON.TARGET_ANNUAL) * 100), 999);
}

function progBarColor(pct) {
  if (pct >= 100) return '#1a6640';
  if (pct >= 50)  return '#1a4a8a';
  return '#c97a00';
}

/* ── DATE ── */
function formatDateLong(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

function weekLabel() {
  const d = new Date();
  const start = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d - start) / 86400000 + start.getDay() + 1) / 7);
  return 'Week ' + week + ', ' + d.getFullYear();
}

/* ── DOM HELPERS ── */
function el(id) { return document.getElementById(id); }

function val(id) {
  const e = el(id);
  return e ? e.value.trim() : '';
}

function setVal(id, v) {
  const e = el(id);
  if (e) e.value = v;
}

function show(id) { const e = el(id); if (e) e.style.display = 'block'; }
function hide(id) { const e = el(id); if (e) e.style.display = 'none'; }

/* ── CLIPBOARD ── */
async function copyToClipboard(text, btn, successLabel = '✓ Copied!') {
  try {
    await navigator.clipboard.writeText(text);
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = successLabel;
      btn.style.background = '#1a6640';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
      }, 2500);
    }
    return true;
  } catch (e) {
    return false;
  }
}

/* ── BREADCRUMB BUILDER ── */
function buildBreadcrumb(containerId, crumbs) {
  const nav = el(containerId);
  if (!nav) return;
  nav.innerHTML = crumbs.map((c, i) => {
    if (i < crumbs.length - 1) {
      return `<a href="${c.href}">${c.label}</a><span class="sep"> / </span>`;
    }
    return `<span>${c.label}</span>`;
  }).join('');
}

/* ── EXPORT: make available globally ── */
window.STINSON       = STINSON;
window.parseMoney    = parseMoney;
window.formatMoney   = formatMoney;
window.pipelinePct   = pipelinePct;
window.progBarColor  = progBarColor;
window.formatDateLong = formatDateLong;
window.todayISO      = todayISO;
window.weekLabel     = weekLabel;
window.el            = el;
window.val           = val;
window.setVal        = setVal;
window.show          = show;
window.hide          = hide;
window.copyToClipboard = copyToClipboard;
window.buildBreadcrumb = buildBreadcrumb;
