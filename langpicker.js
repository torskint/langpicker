/**
 * LangPicker.js v1.1.1
 * A professional, zero-dependency language selector library
 * Supports up to 50+ languages | MIT License
 *
 * Usage:
 *   const picker = new LangPicker('#my-container', options);
 *
 * Or auto-init via HTML:
 *   <div data-langpicker data-current="fr" data-langs="fr,en,es"></div>
 *
 * langs option accepts objects: [{ iso, name, flag }]
 * where flag can be a URL string (SVG/PNG) or an emoji
 */

(function (global, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    global.LangPicker = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {

  /* ─────────────────────────────────────────────
     BUILT-IN LANGUAGE REGISTRY (50 languages)
     flag field = emoji fallback (overridable via langs option)
  ───────────────────────────────────────────── */
  const LANG_REGISTRY = {
    af: { name: 'Afrikaans',    native: 'Afrikaans',    flag: '🇿🇦', dir: 'ltr' },
    sq: { name: 'Albanian',     native: 'Shqip',        flag: '🇦🇱', dir: 'ltr' },
    ar: { name: 'Arabic',       native: 'العربية',      flag: '🇸🇦', dir: 'rtl' },
    hy: { name: 'Armenian',     native: 'Հայերեն',      flag: '🇦🇲', dir: 'ltr' },
    az: { name: 'Azerbaijani',  native: 'Azərbaycan',   flag: '🇦🇿', dir: 'ltr' },
    be: { name: 'Belarusian',   native: 'Беларуская',   flag: '🇧🇾', dir: 'ltr' },
    bn: { name: 'Bengali',      native: 'বাংলা',        flag: '🇧🇩', dir: 'ltr' },
    bs: { name: 'Bosnian',      native: 'Bosanski',     flag: '🇧🇦', dir: 'ltr' },
    bg: { name: 'Bulgarian',    native: 'Български',    flag: '🇧🇬', dir: 'ltr' },
    ca: { name: 'Catalan',      native: 'Català',       flag: '🏳️',  dir: 'ltr' },
    zh: { name: 'Chinese',      native: '中文',          flag: '🇨🇳', dir: 'ltr' },
    hr: { name: 'Croatian',     native: 'Hrvatski',     flag: '🇭🇷', dir: 'ltr' },
    cs: { name: 'Czech',        native: 'Čeština',      flag: '🇨🇿', dir: 'ltr' },
    da: { name: 'Danish',       native: 'Dansk',        flag: '🇩🇰', dir: 'ltr' },
    nl: { name: 'Dutch',        native: 'Nederlands',   flag: '🇳🇱', dir: 'ltr' },
    en: { name: 'English',      native: 'English',      flag: '🇬🇧', dir: 'ltr' },
    et: { name: 'Estonian',     native: 'Eesti',        flag: '🇪🇪', dir: 'ltr' },
    fi: { name: 'Finnish',      native: 'Suomi',        flag: '🇫🇮', dir: 'ltr' },
    fr: { name: 'French',       native: 'Français',     flag: '🇫🇷', dir: 'ltr' },
    ka: { name: 'Georgian',     native: 'ქართული',      flag: '🇬🇪', dir: 'ltr' },
    de: { name: 'German',       native: 'Deutsch',      flag: '🇩🇪', dir: 'ltr' },
    el: { name: 'Greek',        native: 'Ελληνικά',     flag: '🇬🇷', dir: 'ltr' },
    gu: { name: 'Gujarati',     native: 'ગુજરાતી',      flag: '🇮🇳', dir: 'ltr' },
    he: { name: 'Hebrew',       native: 'עברית',        flag: '🇮🇱', dir: 'rtl' },
    hi: { name: 'Hindi',        native: 'हिन्दी',       flag: '🇮🇳', dir: 'ltr' },
    hu: { name: 'Hungarian',    native: 'Magyar',       flag: '🇭🇺', dir: 'ltr' },
    id: { name: 'Indonesian',   native: 'Indonesia',    flag: '🇮🇩', dir: 'ltr' },
    it: { name: 'Italian',      native: 'Italiano',     flag: '🇮🇹', dir: 'ltr' },
    ja: { name: 'Japanese',     native: '日本語',        flag: '🇯🇵', dir: 'ltr' },
    kn: { name: 'Kannada',      native: 'ಕನ್ನಡ',        flag: '🇮🇳', dir: 'ltr' },
    kk: { name: 'Kazakh',       native: 'Қазақ',        flag: '🇰🇿', dir: 'ltr' },
    ko: { name: 'Korean',       native: '한국어',        flag: '🇰🇷', dir: 'ltr' },
    lv: { name: 'Latvian',      native: 'Latviešu',     flag: '🇱🇻', dir: 'ltr' },
    lt: { name: 'Lithuanian',   native: 'Lietuvių',     flag: '🇱🇹', dir: 'ltr' },
    mk: { name: 'Macedonian',   native: 'Македонски',   flag: '🇲🇰', dir: 'ltr' },
    ms: { name: 'Malay',        native: 'Melayu',       flag: '🇲🇾', dir: 'ltr' },
    mt: { name: 'Maltese',      native: 'Malti',        flag: '🇲🇹', dir: 'ltr' },
    no: { name: 'Norwegian',    native: 'Norsk',        flag: '🇳🇴', dir: 'ltr' },
    fa: { name: 'Persian',      native: 'فارسی',        flag: '🇮🇷', dir: 'rtl' },
    pl: { name: 'Polish',       native: 'Polski',       flag: '🇵🇱', dir: 'ltr' },
    pt: { name: 'Portuguese',   native: 'Português',    flag: '🇵🇹', dir: 'ltr' },
    ro: { name: 'Romanian',     native: 'Română',       flag: '🇷🇴', dir: 'ltr' },
    ru: { name: 'Russian',      native: 'Русский',      flag: '🇷🇺', dir: 'ltr' },
    sk: { name: 'Slovak',       native: 'Slovenčina',   flag: '🇸🇰', dir: 'ltr' },
    sl: { name: 'Slovenian',    native: 'Slovenščina',  flag: '🇸🇮', dir: 'ltr' },
    es: { name: 'Spanish',      native: 'Español',      flag: '🇪🇸', dir: 'ltr' },
    sv: { name: 'Swedish',      native: 'Svenska',      flag: '🇸🇪', dir: 'ltr' },
    th: { name: 'Thai',         native: 'ภาษาไทย',      flag: '🇹🇭', dir: 'ltr' },
    tr: { name: 'Turkish',      native: 'Türkçe',       flag: '🇹🇷', dir: 'ltr' },
    uk: { name: 'Ukrainian',    native: 'Українська',   flag: '🇺🇦', dir: 'ltr' },
    ur: { name: 'Urdu',         native: 'اردو',         flag: '🇵🇰', dir: 'rtl' },
    uz: { name: 'Uzbek',        native: "O'zbek",       flag: '🇺🇿', dir: 'ltr' },
    vi: { name: 'Vietnamese',   native: 'Tiếng Việt',   flag: '🇻🇳', dir: 'ltr' },
  };

  /* ─────────────────────────────────────────────
     STYLES
  ───────────────────────────────────────────── */
  const STYLES = `
    .lp-wrap * { box-sizing: border-box; margin: 0; padding: 0; }

    .lp-wrap {
      position: relative;
      display: inline-block;
      font-family: var(--lp-font, system-ui, -apple-system, sans-serif);
      font-size: var(--lp-font-size, 14px);
      color: var(--lp-color, #1a1a2e);
      --lp-accent: var(--lp-accent-color, #2563eb);
      --lp-radius: var(--lp-border-radius, 10px);
      --lp-bg: var(--lp-bg-color, #ffffff);
      --lp-border: var(--lp-border-color, #e2e8f0);
      --lp-shadow: 0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
      --lp-item-hover: var(--lp-hover-color, #f0f4ff);
      --lp-speed: var(--lp-anim-speed, 200ms);
    }

    /* ── TRIGGER BUTTON ── */
    .lp-trigger {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      background: var(--lp-bg);
      border: 1.5px solid var(--lp-border);
      border-radius: var(--lp-radius);
      cursor: pointer;
      white-space: nowrap;
      transition: border-color var(--lp-speed), box-shadow var(--lp-speed), background var(--lp-speed);
      user-select: none;
      -webkit-user-select: none;
      outline: none;
    }
    .lp-trigger:hover,
    .lp-wrap[data-open] .lp-trigger {
      border-color: var(--lp-accent);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--lp-accent) 15%, transparent);
    }
    .lp-trigger:focus-visible {
      border-color: var(--lp-accent);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--lp-accent) 20%, transparent);
    }

    /* ── FLAG — emoji OR img ── */
    .lp-flag {
      font-size: 18px;
      line-height: 1;
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }
    .lp-flag img {
      width: 22px;
      height: 22px;
      object-fit: cover;
      border-radius: 50%;
      display: block;
    }

    .lp-label { font-weight: 500; letter-spacing: -0.01em; }
    .lp-iso {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      opacity: 0.45;
    }
    .lp-caret {
      margin-left: 4px;
      width: 14px;
      height: 14px;
      opacity: 0.4;
      transition: transform var(--lp-speed), opacity var(--lp-speed);
      flex-shrink: 0;
    }
    .lp-wrap[data-open] .lp-caret {
      transform: rotate(180deg);
      opacity: 0.7;
    }

    /* ── DROPDOWN PANEL ── */
    .lp-panel {
      position: absolute;
      z-index: 9999;
      top: calc(100% + 8px);
      left: 0;
      min-width: 240px;
      max-width: 320px;
      background: var(--lp-bg);
      border: 1.5px solid var(--lp-border);
      border-radius: var(--lp-radius);
      box-shadow: var(--lp-shadow);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      opacity: 0;
      transform: translateY(-6px) scale(0.98);
      pointer-events: none;
      transition:
        opacity var(--lp-speed) ease,
        transform var(--lp-speed) ease;
    }
    .lp-wrap[data-open] .lp-panel {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }
    .lp-panel[data-position="top"] {
      top: auto;
      bottom: calc(100% + 8px);
      transform: translateY(6px) scale(0.98);
    }
    .lp-wrap[data-open] .lp-panel[data-position="top"] {
      transform: translateY(0) scale(1);
    }
    .lp-panel[data-align="right"] {
      left: auto;
      right: 0;
    }

    /* ── SEARCH ── */
    .lp-search-wrap {
      padding: 10px 10px 8px;
      border-bottom: 1px solid var(--lp-border);
      background: var(--lp-bg);
      position: relative;
      z-index: 1;
    }
    .lp-search {
      width: 100%;
      padding: 7px 10px 7px 32px;
      border: 1.5px solid var(--lp-border);
      border-radius: 7px;
      font-size: 13px;
      outline: none;
      background: var(--lp-bg);
      color: var(--lp-color);
      transition: border-color var(--lp-speed);
    }
    .lp-search:focus { border-color: var(--lp-accent); }
    .lp-search-icon {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      opacity: 0.35;
      width: 14px;
      height: 14px;
    }

    /* ── LIST ── */
    .lp-list {
      overflow-y: auto;
      max-height: 260px;
      padding: 6px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      scrollbar-width: thin;
      scrollbar-color: var(--lp-border) transparent;
    }
    .lp-list::-webkit-scrollbar { width: 5px; }
    .lp-list::-webkit-scrollbar-track { background: transparent; }
    .lp-list::-webkit-scrollbar-thumb { background: var(--lp-border); border-radius: 99px; }

    /* ── ITEM ── */
    .lp-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 7px;
      cursor: pointer;
      transition: background var(--lp-speed);
      outline: none;
      border: none;
      background: transparent;
      color: var(--lp-color);
      font-family: inherit;
      font-size: inherit;
      text-align: left;
      width: 100%;
    }
    .lp-item:hover,
    .lp-item:focus-visible { background: var(--lp-item-hover); }
    .lp-item[data-active] {
      background: color-mix(in srgb, var(--lp-accent) 10%, transparent);
      color: var(--lp-accent);
    }

    /* ── ITEM FLAG — emoji OR img ── */
    .lp-item-flag {
      font-size: 20px;
      line-height: 1;
      width: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .lp-item-flag img {
      width: 26px;
      height: 26px;
      object-fit: cover;
      border-radius: 50%;
      display: block;
    }

    .lp-item-text { display: flex; flex-direction: column; line-height: 1.3; gap: 1px; flex: 1; min-width: 0; }
    .lp-item-native { font-weight: 600; font-size: 13.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .lp-item-en { font-size: 11.5px; opacity: 0.5; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .lp-item-check {
      margin-left: auto;
      flex-shrink: 0;
      opacity: 0;
      color: var(--lp-accent);
      width: 15px;
      height: 15px;
    }
    .lp-item[data-active] .lp-item-check { opacity: 1; }
    .lp-item-dir {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      opacity: 0.3;
      padding: 1px 4px;
      border: 1px solid currentColor;
      border-radius: 3px;
      flex-shrink: 0;
    }
    .lp-item-dir.rtl { opacity: 0.5; color: #e55; }

    /* ── EMPTY STATE ── */
    .lp-empty {
      padding: 20px;
      text-align: center;
      opacity: 0.4;
      font-size: 13px;
    }

    /* ── FOOTER ── */
    .lp-footer {
      padding: 6px 12px;
      border-top: 1px solid var(--lp-border);
      font-size: 11px;
      opacity: 0.35;
      text-align: right;
      letter-spacing: 0.03em;
    }

    /* ── THEME: DARK ── */
    .lp-wrap[data-theme="dark"] {
      --lp-bg-color: #1a1f2e;
      --lp-border-color: #2d3450;
      --lp-color: #e8ecf7;
      --lp-hover-color: #252c42;
    }

    /* ── THEME: MINIMAL ── */
    .lp-wrap[data-theme="minimal"] .lp-trigger {
      border-color: transparent;
      background: transparent;
      padding-left: 6px;
      padding-right: 6px;
    }
    .lp-wrap[data-theme="minimal"] .lp-trigger:hover {
      background: var(--lp-item-hover);
    }

    /* ── SIZES ── */
    .lp-wrap[data-size="sm"] { font-size: 12px; }
    .lp-wrap[data-size="sm"] .lp-trigger { padding: 6px 10px; }
    .lp-wrap[data-size="lg"] { font-size: 15px; }
    .lp-wrap[data-size="lg"] .lp-trigger { padding: 10px 18px; }

    /* ── DISPLAY MODES ── */
    .lp-wrap[data-display="icon"] .lp-label,
    .lp-wrap[data-display="icon"] .lp-iso { display: none; }
    .lp-wrap[data-display="code"] .lp-flag { display: none; }
    .lp-wrap[data-display="code"] .lp-label { display: none; }
    .lp-wrap[data-display="full"] .lp-iso { display: none; }
  `;

  /* ─────────────────────────────────────────────
     SVGs
  ───────────────────────────────────────────── */
  const SVG_CARET = `<svg class="lp-caret" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const SVG_CHECK = `<svg class="lp-item-check" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const SVG_SEARCH = `<svg class="lp-search-icon" viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" stroke-width="1.5"/><path d="M10 10l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;

  /* ─────────────────────────────────────────────
     HELPERS
  ───────────────────────────────────────────── */
  let _styleInjected = false;
  function injectStyles() {
    if (_styleInjected) return;
    const el = document.createElement('style');
    el.id = 'langpicker-styles';
    el.textContent = STYLES;
    document.head.appendChild(el);
    _styleInjected = true;
  }

  function resolveTarget(target) {
    if (!target) return null;
    if (typeof target === 'string') return document.querySelector(target);
    if (target instanceof HTMLElement) return target;
    return null;
  }

  /**
   * Render a flag — supports emoji string or URL (http/https//)
   * Returns an HTML string for use inside innerHTML
   */
  function renderFlag(flag, cssClass, altText) {
    if (!flag) return `<span class="${cssClass}" aria-hidden="true"></span>`;
    const isUrl = /^(https?:)?\/\//.test(flag) || flag.startsWith('/') || flag.includes('.');
    if (isUrl) {
      return `<span class="${cssClass}" aria-hidden="true"><img src="${flag}" alt="${altText || ''}" loading="lazy"></span>`;
    }
    return `<span class="${cssClass}" aria-hidden="true">${flag}</span>`;
  }

  /**
   * Normalize a lang entry from user input.
   * Accepts any of:
   *   - ISO string: 'fr'  → looks up registry
   *   - Object { iso, name, flag } → merges with registry fallback
   *   - Object { code, name, flag } → same
   */
  function normalizeLangEntry(entry, registry) {
    // Plain ISO string
    if (typeof entry === 'string') {
      const meta = registry[entry];
      if (!meta) { console.warn('[LangPicker] Unknown lang code: ' + entry); return null; }
      return { code: entry, ...meta };
    }

    // Object with iso or code
    const iso = (entry.iso || entry.code || '').toLowerCase();
    if (!iso) { console.warn('[LangPicker] Lang entry missing iso/code:', entry); return null; }

    const registryMeta = registry[iso] || {};

    return {
      code:   iso,
      name:   entry.name   || registryMeta.name   || iso.toUpperCase(),
      native: entry.native || registryMeta.native  || entry.name || iso.toUpperCase(),
      flag:   entry.flag   || registryMeta.flag    || '',
      dir:    entry.dir    || registryMeta.dir     || 'ltr',
    };
  }

  /* ─────────────────────────────────────────────
     DEFAULTS
  ───────────────────────────────────────────── */
  const DEFAULTS = {
    current: 'en',
    langs: null,          // null = all built-in | string[] of ISO | object[] { iso, name, flag }
    display: 'native',   // 'native' | 'full' | 'icon' | 'code'
    theme: 'light',      // 'light' | 'dark' | 'minimal'
    size: 'md',          // 'sm' | 'md' | 'lg'
    search: true,
    showDirection: false,
    showFooter: false,
    position: 'auto',    // 'auto' | 'top' | 'bottom'
    align: 'left',       // 'left' | 'right'
    onChange: null,
    accentColor: null,
    customLangs: {},     // extend registry: { xx: { name, native, flag, dir } }
  };

  /* ─────────────────────────────────────────────
     CLASS
  ───────────────────────────────────────────── */
  class LangPicker {
    constructor(target, options = {}) {
      this._opt = Object.assign({}, DEFAULTS, options);
      this._target = resolveTarget(target);
      if (!this._target) throw new Error('[LangPicker] Target element not found: ' + target);

      // Merge custom langs into registry
      this._registry = Object.assign({}, LANG_REGISTRY, this._opt.customLangs);

      // Build active lang list — supports string[], object[], or null
      if (this._opt.langs) {
        this._langs = this._opt.langs
          .map(entry => normalizeLangEntry(entry, this._registry))
          .filter(Boolean);
      } else {
        this._langs = Object.entries(this._registry)
          .map(([code, meta]) => ({ code, ...meta }));
        this._langs.sort((a, b) => a.name.localeCompare(b.name));
      }

      this._current = (this._opt.current || '').toLowerCase();
      this._open = false;
      this._query = '';

      injectStyles();
      this._render();
      this._bind();
    }

    /* ── RENDER ─────────────────────── */
    _render() {
      const o = this._opt;
      this._target.innerHTML = '';

      const wrap = document.createElement('div');
      wrap.className = 'lp-wrap';
      wrap.setAttribute('data-theme', o.theme === 'dark' ? 'dark' : o.theme === 'minimal' ? 'minimal' : '');
      wrap.setAttribute('data-size', o.size !== 'md' ? o.size : '');
      wrap.setAttribute('data-display',
        o.display === 'icon' ? 'icon' :
        o.display === 'code' ? 'code' :
        o.display === 'full' ? 'full' : ''
      );
      this._wrap = wrap;

      // Trigger
      const trigger = document.createElement('button');
      trigger.className = 'lp-trigger';
      trigger.setAttribute('aria-haspopup', 'listbox');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('type', 'button');
      this._trigger = trigger;
      this._updateTrigger();
      wrap.appendChild(trigger);

      // Panel
      const panel = document.createElement('div');
      panel.className = 'lp-panel';
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-label', 'Select language');
      if (o.align === 'right') panel.setAttribute('data-align', 'right');
      this._panel = panel;

      if (o.search) {
        const sw = document.createElement('div');
        sw.className = 'lp-search-wrap';
        sw.innerHTML = SVG_SEARCH;
        const si = document.createElement('input');
        si.className = 'lp-search';
        si.type = 'text';
        si.placeholder = 'Search language…';
        si.setAttribute('aria-label', 'Search language');
        si.autocomplete = 'off';
        si.spellcheck = false;
        this._searchInput = si;
        sw.appendChild(si);
        panel.appendChild(sw);
      }

      const list = document.createElement('div');
      list.className = 'lp-list';
      list.setAttribute('role', 'listbox');
      this._list = list;
      panel.appendChild(list);

      if (o.showFooter) {
        const ft = document.createElement('div');
        ft.className = 'lp-footer';
        ft.textContent = this._langs.length + ' languages';
        panel.appendChild(ft);
      }

      wrap.appendChild(panel);
      this._target.appendChild(wrap);
      this._renderItems();
    }

    _currentMeta() {
      // First look in dynamic langs list (may have custom flag)
      const fromList = this._langs.find(l => l.code === this._current);
      if (fromList) return fromList;
      // Fallback to registry
      const reg = this._registry[this._current];
      if (reg) return { code: this._current, ...reg };
      return null;
    }

    _updateTrigger() {
      const meta = this._currentMeta();
      if (!meta) return;
      this._trigger.innerHTML = `
        ${renderFlag(meta.flag, 'lp-flag', meta.name)}
        <span class="lp-label">${meta.native}</span>
        <span class="lp-iso">${this._current.toUpperCase()}</span>
        ${SVG_CARET}
      `;
      this._trigger.setAttribute('aria-label', 'Current language: ' + meta.name + '. Click to change.');
    }

    _renderItems(filter = '') {
      this._list.innerHTML = '';
      const q = filter.toLowerCase().trim();
      const filtered = q
        ? this._langs.filter(l =>
            l.name.toLowerCase().includes(q) ||
            l.native.toLowerCase().includes(q) ||
            l.code.toLowerCase().includes(q)
          )
        : this._langs;

      if (!filtered.length) {
        const empty = document.createElement('div');
        empty.className = 'lp-empty';
        empty.textContent = 'No language found';
        this._list.appendChild(empty);
        return;
      }

      filtered.forEach(lang => {
        const btn = document.createElement('button');
        btn.className = 'lp-item';
        btn.setAttribute('role', 'option');
        btn.setAttribute('type', 'button');
        btn.setAttribute('data-code', lang.code);
        btn.setAttribute('aria-selected', lang.code === this._current ? 'true' : 'false');
        if (lang.code === this._current) btn.setAttribute('data-active', '');

        const dirBadge = this._opt.showDirection
          ? `<span class="lp-item-dir ${lang.dir}">${lang.dir.toUpperCase()}</span>`
          : '';

        btn.innerHTML = `
          ${renderFlag(lang.flag, 'lp-item-flag', lang.name)}
          <span class="lp-item-text">
            <span class="lp-item-native">${lang.native}</span>
            <span class="lp-item-en">${lang.name}</span>
          </span>
          ${dirBadge}
          ${SVG_CHECK}
        `;

        btn.addEventListener('click', () => this._select(lang.code));
        this._list.appendChild(btn);
      });

      const active = this._list.querySelector('[data-active]');
      if (active) setTimeout(() => active.scrollIntoView({ block: 'nearest' }), 0);
    }

    /* ── INTERACTIONS ─────────────────── */
    _bind() {
      this._trigger.addEventListener('click', () => this.toggle());

      if (this._searchInput) {
        this._searchInput.addEventListener('input', e => {
          this._query = e.target.value;
          this._renderItems(this._query);
        });
        this._searchInput.addEventListener('keydown', e => {
          if (e.key === 'Escape') this.close();
        });
      }

      document.addEventListener('click', e => {
        if (this._open && !this._wrap.contains(e.target)) this.close();
      });

      this._wrap.addEventListener('keydown', e => {
        if (!this._open) return;
        if (e.key === 'Escape') { this.close(); this._trigger.focus(); }
        if (e.key === 'Tab') this.close();
      });

      window.addEventListener('scroll', () => { if (this._open) this._updatePosition(); }, { passive: true });
      window.addEventListener('resize', () => { if (this._open) this._updatePosition(); }, { passive: true });
    }

    _updatePosition() {
      if (this._opt.position !== 'auto') {
        this._panel.setAttribute('data-position', this._opt.position);
        return;
      }
      const rect = this._wrap.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      this._panel.setAttribute('data-position',
        spaceBelow < 300 && spaceAbove > spaceBelow ? 'top' : 'bottom'
      );
    }

    _select(code) {
      const prev = this._current;
      this._current = code;
      this._updateTrigger();
      this._renderItems(this._query);
      this.close();

      if (typeof this._opt.onChange === 'function') {
        const meta = this._currentMeta();
        this._opt.onChange({ code, meta, prev });
      }

      this._target.dispatchEvent(new CustomEvent('langchange', {
        bubbles: true,
        detail: { code, meta: this._currentMeta(), prev }
      }));
    }

    /* ── PUBLIC API ──────────────────── */
    open() {
      if (this._open) return;
      this._open = true;
      this._wrap.setAttribute('data-open', '');
      this._trigger.setAttribute('aria-expanded', 'true');
      this._updatePosition();
      if (this._searchInput) {
        this._query = '';
        this._searchInput.value = '';
        this._renderItems();
        setTimeout(() => this._searchInput.focus(), 50);
      }
    }

    close() {
      if (!this._open) return;
      this._open = false;
      this._wrap.removeAttribute('data-open');
      this._trigger.setAttribute('aria-expanded', 'false');
    }

    toggle() { this._open ? this.close() : this.open(); }

    setLang(code) {
      const c = (code || '').toLowerCase();
      const exists = this._langs.find(l => l.code === c) || this._registry[c];
      if (exists) {
        this._current = c;
        this._updateTrigger();
        this._renderItems(this._query);
      }
    }

    getLang() {
      return { code: this._current, meta: this._currentMeta() };
    }

    destroy() { this._target.innerHTML = ''; }

    /* ── STATIC: auto-init ─────────────── */
    static autoInit() {
      document.querySelectorAll('[data-langpicker]').forEach(el => {
        const langs = el.dataset.langs ? el.dataset.langs.split(',').map(s => s.trim()) : null;
        new LangPicker(el, {
          current:  el.dataset.current || 'en',
          langs,
          theme:    el.dataset.theme   || 'light',
          display:  el.dataset.display || 'native',
          size:     el.dataset.size    || 'md',
          search:   el.dataset.search  !== 'false',
        });
      });
    }

    static get registry() { return LANG_REGISTRY; }
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', LangPicker.autoInit);
    } else {
      setTimeout(LangPicker.autoInit, 0);
    }
  }

  return LangPicker;
});
