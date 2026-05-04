const base = import.meta.env.BASE_URL || '/'

const nav = (active) => {
  const items = [
    { id: 'home', href: `${base}index.html`, label: 'Home' },
    { id: 'products', href: `${base}products.html`, label: 'Products' },
    { id: 'about', href: `${base}about.html`, label: 'Our Story' },
    { id: 'campaigns', href: `${base}campaigns.html`, label: 'Campaigns' },
    { id: 'store', href: `${base}store-locator.html`, label: 'Find a Store' },
    { id: 'blog', href: `${base}blog.html`, label: 'The Hub' },
    { id: 'newsletter', href: `${base}newsletter.html`, label: 'Perks' },
    { id: 'contact', href: `${base}contact.html`, label: 'Support' },
  ]
  return `
<header class="sticky top-0 z-50 border-b border-black/5 bg-brand-cream/90 backdrop-blur-md dark:border-white/10 dark:bg-brand-ink/90" role="banner">
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-brand-ink">Skip to main content</a>
  <div class="container-narrow flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
    <a href="${base}index.html" class="group flex items-center gap-2" aria-label="Dr Pepper home">
      <span class="font-display text-2xl tracking-tight text-brand-burgundy transition group-hover:text-brand-crimson dark:text-brand-cream sm:text-3xl">DR PEPPER</span>
    </a>
    <nav class="hidden items-center gap-1 lg:flex" aria-label="Primary">
      ${items
        .map(
          (i) => `
        <a href="${i.href}" class="rounded-lg px-3 py-2 text-sm font-medium transition ${
          active === i.id
            ? 'bg-brand-burgundy/10 text-brand-burgundy dark:bg-white/10 dark:text-brand-cream'
            : 'text-brand-muted hover:bg-black/5 hover:text-brand-burgundy dark:hover:bg-white/5 dark:hover:text-brand-cream'
        }">${i.label}</a>`
        )
        .join('')}
    </nav>
    <div class="flex items-center gap-2">
      <button type="button" id="theme-toggle" class="btn-ghost rounded-full p-2" aria-pressed="false" aria-label="Toggle dark mode">
        <span class="dark:hidden" aria-hidden="true">🌙</span>
        <span class="hidden dark:inline" aria-hidden="true">☀️</span>
      </button>
      <a href="${base}newsletter.html" class="btn-primary hidden text-xs sm:inline-flex sm:px-5 sm:py-2.5">Get Perks</a>
      <button type="button" id="nav-open" class="btn-ghost rounded-lg p-2 lg:hidden" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
  </div>
  <div id="mobile-nav" class="hidden border-t border-black/5 bg-brand-cream dark:border-white/10 dark:bg-brand-ink lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
    <div class="container-narrow flex flex-col gap-1 py-4">
      ${items
        .map(
          (i) => `
      <a href="${i.href}" class="rounded-lg px-3 py-3 text-base font-medium ${
        active === i.id
          ? 'bg-brand-burgundy/10 text-brand-burgundy dark:bg-white/10 dark:text-brand-cream'
          : 'text-brand-ink dark:text-brand-cream'
      }">${i.label}</a>`
        )
        .join('')}
      <a href="${base}newsletter.html" class="btn-primary mt-2 w-full">Get Perks</a>
    </div>
  </div>
</header>`
}

const footer = () => `
<footer class="mt-20 border-t border-black/5 bg-brand-burgundy-deep text-brand-cream dark:border-white/10" role="contentinfo">
  <div class="container-narrow grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-4">
    <div>
      <p class="font-display text-3xl tracking-tight">DR PEPPER</p>
      <p class="mt-3 text-sm text-white/70">Concept experience — educational demo only. Not affiliated with Keurig Dr Pepper or trademark holders.</p>
    </div>
    <div>
      <p class="font-semibold uppercase tracking-wider text-brand-metallic">Explore</p>
      <ul class="mt-4 space-y-2 text-sm">
        <li><a href="${base}products.html" class="text-white/80 hover:text-white">Flavors</a></li>
        <li><a href="${base}campaigns.html" class="text-white/80 hover:text-white">Campaigns</a></li>
        <li><a href="${base}blog.html" class="text-white/80 hover:text-white">The Hub</a></li>
        <li><a href="${base}store-locator.html" class="text-white/80 hover:text-white">Store locator</a></li>
      </ul>
    </div>
    <div>
      <p class="font-semibold uppercase tracking-wider text-brand-metallic">Support</p>
      <ul class="mt-4 space-y-2 text-sm">
        <li><a href="${base}contact.html" class="text-white/80 hover:text-white">Contact</a></li>
        <li><a href="${base}newsletter.html" class="text-white/80 hover:text-white">Newsletter</a></li>
      </ul>
    </div>
    <div>
      <p class="font-semibold uppercase tracking-wider text-brand-metallic">Social</p>
      <ul class="mt-4 flex flex-wrap gap-3 text-sm">
        <li><a href="#" class="rounded-lg bg-white/10 px-3 py-2 hover:bg-white/20" aria-label="Instagram (demo)">Instagram</a></li>
        <li><a href="#" class="rounded-lg bg-white/10 px-3 py-2 hover:bg-white/20" aria-label="TikTok (demo)">TikTok</a></li>
        <li><a href="#" class="rounded-lg bg-white/10 px-3 py-2 hover:bg-white/20" aria-label="X (demo)">X</a></li>
      </ul>
    </div>
  </div>
  <div class="border-t border-white/10 py-6 text-center text-xs text-white/50">
    © ${new Date().getFullYear()} Concept build. Drink responsibly.
  </div>
</footer>`

export function injectLayout(activePage) {
  const headerEl = document.getElementById('site-header')
  const footerEl = document.getElementById('site-footer')
  if (headerEl) headerEl.innerHTML = nav(activePage)
  if (footerEl) footerEl.innerHTML = footer()
}

export function bindChrome() {
  const root = document.documentElement
  const stored = localStorage.getItem('theme')
  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.classList.add('dark')
  }

  const btn = document.getElementById('theme-toggle')
  const sync = () => {
    const dark = root.classList.contains('dark')
    btn?.setAttribute('aria-pressed', String(dark))
  }
  sync()
  btn?.addEventListener('click', () => {
    root.classList.toggle('dark')
    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light')
    sync()
  })

  const openBtn = document.getElementById('nav-open')
  const panel = document.getElementById('mobile-nav')
  openBtn?.addEventListener('click', () => {
    const open = panel?.classList.toggle('hidden') === false
    openBtn.setAttribute('aria-expanded', String(open))
  })

  document.querySelectorAll('#mobile-nav a').forEach((a) => {
    a.addEventListener('click', () => {
      panel?.classList.add('hidden')
      openBtn?.setAttribute('aria-expanded', 'false')
    })
  })
}
