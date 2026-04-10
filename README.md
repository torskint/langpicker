# LangPicker.js

> A professional, zero-dependency language selector library. Drop it in, configure with one line.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Size](https://img.shields.io/badge/gzip-~5.6kb-orange)
![Languages](https://img.shields.io/badge/languages-50-purple)

## CDN

```html
<!-- jsDelivr (recommended) -->
<script src="https://cdn.jsdelivr.net/gh/torskint/langpicker@main/langpicker.min.js"></script>

<!-- Full version -->
<script src="https://cdn.jsdelivr.net/gh/torskint/langpicker@main/langpicker.js"></script>
```

## Quick Start

```html
<div id="lang-picker"></div>
<script src="https://cdn.jsdelivr.net/gh/torskint/langpicker@main/langpicker.min.js"></script>
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

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `current` | `string` | `'en'` | Active language ISO code |
| `langs` | `string[]` \| `null` | `null` | Language subset (null = all 50) |
| `theme` | `string` | `'light'` | `'light'` \| `'dark'` \| `'minimal'` |
| `size` | `string` | `'md'` | `'sm'` \| `'md'` \| `'lg'` |
| `display` | `string` | `'native'` | `'native'` \| `'full'` \| `'icon'` \| `'code'` |
| `search` | `boolean` | `true` | Show search input |
| `align` | `string` | `'left'` | `'left'` \| `'right'` |
| `position` | `string` | `'auto'` | `'auto'` \| `'top'` \| `'bottom'` |
| `showDirection` | `boolean` | `false` | Show LTR/RTL badge |
| `customLangs` | `object` | `{}` | Extend the registry |
| `onChange` | `function` | `null` | Callback on language change |
| `accentColor` | `string` | `null` | Override accent color |

## Public API

```js
const picker = new LangPicker('#picker', options);

picker.open();            // Open the dropdown
picker.close();           // Close the dropdown
picker.toggle();          // Toggle open/close
picker.setLang('fr');     // Programmatically set language
picker.getLang();         // Returns { code, meta }
picker.destroy();         // Remove the picker
```

## DOM Event

```js
document.querySelector('#picker').addEventListener('langchange', (e) => {
  console.log(e.detail.code);  // 'fr'
  console.log(e.detail.meta);  // { name: 'French', native: 'Français', flag: '🇫🇷', dir: 'ltr' }
  console.log(e.detail.prev);  // previous code
});
```

## CSS Custom Properties

```css
.lp-wrap {
  --lp-accent-color:   #2563eb;
  --lp-bg-color:       #ffffff;
  --lp-border-color:   #e2e8f0;
  --lp-color:          #1a1a2e;
  --lp-hover-color:    #f0f4ff;
  --lp-border-radius:  10px;
  --lp-font:           system-ui;
  --lp-font-size:      14px;
  --lp-anim-speed:     200ms;
}
```

## Laravel / Blade Integration

```blade
{{-- In your layout --}}
<div id="lang-picker"></div>

<script>
new LangPicker('#lang-picker', {
  current: '{{ app()->getLocale() }}',
  langs:   {!! json_encode($availableLocales) !!},
  onChange: ({ code }) => {
    window.location.href =
      '{{ routeSetLocale("__CODE__") }}'.replace('__CODE__', code);
  }
});
</script>
```

## Supported Languages (50)

Afrikaans, Albanian, Arabic (RTL), Armenian, Azerbaijani, Belarusian, Bengali, Bosnian, Bulgarian, Catalan, Chinese, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, Georgian, German, Greek, Gujarati, Hebrew (RTL), Hindi, Hungarian, Indonesian, Italian, Japanese, Kannada, Kazakh, Korean, Latvian, Lithuanian, Macedonian, Malay, Maltese, Norwegian, Persian (RTL), Polish, Portuguese, Romanian, Russian, Slovak, Slovenian, Spanish, Swedish, Thai, Turkish, Ukrainian, Urdu (RTL), Uzbek, Vietnamese

## License

MIT © torskint
