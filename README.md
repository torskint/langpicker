# LangPicker.js

> A professional, zero-dependency language selector library. Drop it in, configure with one line.

![Version](https://img.shields.io/badge/version-1.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Size](https://img.shields.io/badge/gzip-~6.3kb-orange)
![Languages](https://img.shields.io/badge/languages-50-purple)

## CDN

```html
<!-- Minified (recommended) -->
<script src="https://cdn.jsdelivr.net/gh/torskint/langpicker@1.2.0/langpicker.min.js"></script>

<!-- Full version -->
<script src="https://cdn.jsdelivr.net/gh/torskint/langpicker@1.2.0/langpicker.js"></script>
```

## Quick Start

```html
<div id="lang-picker"></div>
<script src="https://cdn.jsdelivr.net/gh/torskint/langpicker@1.2.0/langpicker.min.js"></script>
<script>
new LangPicker('#lang-picker', {
  current: 'fr',
  onChange: ({ code, meta }) => {
    console.log('Selected:', code, meta.native);
  }
});
</script>
```

## HTML Auto-init (no JS needed)

```html
<div
  data-langpicker
  data-current="fr"
  data-langs="fr,en,es,de,pt"
  data-theme="dark"
  data-size="md"
></div>
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `current` | `string` | `'en'` | Active language ISO code |
| `langs` | `string[]` \| `object[]` \| `null` | `null` | Language list (null = all 50). See [langs format](#langs-format). |
| `theme` | `string` | `'light'` | `'light'` \| `'dark'` \| `'minimal'` |
| `size` | `string` | `'md'` | `'sm'` \| `'md'` \| `'lg'` |
| `display` | `string` | `'native'` | `'native'` \| `'full'` \| `'icon'` \| `'code'` |
| `search` | `boolean` | `true` | Show search input |
| `align` | `string` | `'left'` | `'left'` \| `'right'` — dropdown alignment |
| `position` | `string` | `'auto'` | `'auto'` \| `'top'` \| `'bottom'` |
| `showDirection` | `boolean` | `false` | Show LTR/RTL badge on each item |
| `showFooter` | `boolean` | `false` | Show language count in footer |
| `colors` | `object` | `{}` | Color overrides. See [colors](#colors). |
| `customLangs` | `object` | `{}` | Extend the built-in registry |
| `onChange` | `function` | `null` | Callback on language change |

---

## langs format

The `langs` option accepts three formats:

**1. String array** — ISO codes, resolved against the built-in registry:
```js
langs: ['fr', 'en', 'es', 'de', 'pt']
```

**2. Object array** — your own data with custom flags (URL or emoji):
```js
langs: [
  { iso: 'fr', name: 'Français', flag: '/assets/flags/fr.svg' },
  { iso: 'en', name: 'English',  flag: '/assets/flags/en.svg' },
  { iso: 'ar', name: 'العربية',  flag: '/assets/flags/ar.svg' },
]
```

The `flag` field accepts:
- A URL: `https://...`, `//...`, `/path/to/flag.svg`
- An emoji: `'🇫🇷'`
- Omitted: falls back to the built-in registry emoji

Flag images are displayed as **circles** (`border-radius: 50%`).

**3. null** — loads all 50 built-in languages (default).

---

## colors

Customize every color token via JavaScript — no CSS override needed:

```js
new LangPicker('#picker', {
  colors: {
    accent:     '#e11d48',  // focus ring, active item, checkmark
    background: '#0f172a',  // panel + trigger background
    border:     '#334155',  // borders
    text:       '#f1f5f9',  // primary text
    textMuted:  '#94a3b8',  // secondary text (english name)
    hover:      '#1e293b',  // item hover background
    radius:     '8px',      // border-radius (use '99px' for pill style)
  }
});
```

All keys are optional. Works alongside all themes. Each key maps to a CSS variable:

| Key | CSS Variable | Description |
|-----|-------------|-------------|
| `accent` | `--lp-accent-color` | Focus ring, active state, checkmark |
| `background` | `--lp-bg-color` | Panel and trigger background |
| `border` | `--lp-border-color` | All borders |
| `text` | `--lp-color` | Primary text color |
| `textMuted` | `--lp-muted-color` | Secondary text (english lang name) |
| `hover` | `--lp-hover-color` | Item hover background |
| `radius` | `--lp-border-radius` | Border radius for panel and trigger |

You can also override these directly via CSS if you prefer:

```css
.lp-wrap {
  --lp-accent-color:   #e11d48;
  --lp-bg-color:       #0f172a;
  --lp-border-color:   #334155;
  --lp-color:          #f1f5f9;
  --lp-hover-color:    #1e293b;
  --lp-border-radius:  8px;
  --lp-font:           'DM Sans', sans-serif;
  --lp-font-size:      14px;
  --lp-anim-speed:     200ms;
}
```

---

## Public API

```js
const picker = new LangPicker('#picker', options);

picker.open();            // Open the dropdown
picker.close();           // Close the dropdown
picker.toggle();          // Toggle open/close
picker.setLang('fr');     // Programmatically set language
picker.getLang();         // Returns { code, meta }
picker.destroy();         // Remove the picker from DOM
```

---

## DOM Event

```js
document.querySelector('#picker').addEventListener('langchange', (e) => {
  console.log(e.detail.code);  // 'fr'
  console.log(e.detail.meta);  // { name: 'French', native: 'Français', flag: '...', dir: 'ltr' }
  console.log(e.detail.prev);  // previous ISO code
});
```

---

## Laravel / Blade Integration

```blade
{{-- resources/views/partials/lang-picker.blade.php --}}
<div id="lang-picker"></div>

<script>
new LangPicker('#lang-picker', {
  current: '{{ app()->getLocale() }}',

  langs: {!! json_encode(
    $languages->map(fn($l) => [
      'iso'  => $l->iso,
      'name' => $l->name,
      'flag' => asset_img('flags/' . $l->iso . '.svg'),
    ])->values()
  ) !!},

  onChange: ({ code }) => {
    window.location.href =
      '{{ routeSetLocale('__CODE__') }}'.replace('__CODE__', code);
  }
});
</script>
```

```blade
{{-- In your layout --}}
@include('partials.lang-picker')
```

---

## Extending the registry

Add custom languages not in the built-in list:

```js
new LangPicker('#picker', {
  customLangs: {
    yo: { name: 'Yoruba', native: 'Yorùbá', flag: '🇳🇬', dir: 'ltr' },
    fon: { name: 'Fon', native: 'Fɔngbè', flag: '/flags/bj.svg', dir: 'ltr' },
  },
  langs: ['fr', 'en', 'yo', 'fon'],
});
```

---

## Supported Languages (50)

Afrikaans, Albanian, Arabic (RTL), Armenian, Azerbaijani, Belarusian, Bengali, Bosnian, Bulgarian, Catalan, Chinese, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, Georgian, German, Greek, Gujarati, Hebrew (RTL), Hindi, Hungarian, Indonesian, Italian, Japanese, Kannada, Kazakh, Korean, Latvian, Lithuanian, Macedonian, Malay, Maltese, Norwegian, Persian (RTL), Polish, Portuguese, Romanian, Russian, Slovak, Slovenian, Spanish, Swedish, Thai, Turkish, Ukrainian, Urdu (RTL), Uzbek, Vietnamese

---

## Changelog

### v1.2.0
- New `colors` option to configure all color tokens from JavaScript

### v1.1.1
- Flag images are now displayed as circles (`border-radius: 50%`)

### v1.1.0
- `langs` now accepts object array `[{ iso, name, flag }]`
- `flag` supports URL strings (SVG, PNG) in addition to emoji

### v1.0.0
- Initial release — 50 languages, 3 themes, live search, ARIA accessible

---

## License

MIT © [torskint](https://github.com/torskint)
