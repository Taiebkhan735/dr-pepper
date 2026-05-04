import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { injectLayout, bindChrome } from './layout.js'
import { products, getProductBySlug } from './data/products.js'

gsap.registerPlugin(ScrollTrigger)

const page = document.body.dataset.page || 'home'

function initReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function initAbHero() {
  const root = document.getElementById('ab-hero-root')
  if (!root) return
  const key = 'ab_hero_bucket'
  let bucket = localStorage.getItem(key)
  if (!bucket || (bucket !== 'A' && bucket !== 'B')) {
    bucket = Math.random() < 0.5 ? 'A' : 'B'
    localStorage.setItem(key, bucket)
  }
  const a = document.getElementById('hero-variant-a')
  const b = document.getElementById('hero-variant-b')
  if (bucket === 'A') {
    a?.classList.remove('hidden')
    b?.classList.add('hidden')
  } else {
    b?.classList.remove('hidden')
    a?.classList.add('hidden')
  }
  root.setAttribute('data-ab-bucket', bucket)
}

function initHomeAnimations() {
  if (initReducedMotion()) return
  const hero = document.querySelector('[data-hero-lines]')
  if (hero) {
    const lines = hero.querySelectorAll('.hero-line')
    gsap.fromTo(
      lines,
      { y: 48, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
    )
  }
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      }
    )
  })
}

function initFlavorQuiz() {
  const root = document.getElementById('flavor-quiz')
  if (!root) return
  const steps = [
    {
      q: 'Pick your midnight fuel:',
      options: [
        { t: 'Competitive gaming', tags: ['zero', 'original'] },
        { t: 'Studio session / mixtape', tags: ['cherry', 'cream-soda'] },
        { t: 'Movie marathon', tags: ['strawberry', 'cream-soda'] },
        { t: 'City run / gym', tags: ['zero', 'cherry'] },
      ],
    },
    {
      q: 'Your flavor north star:',
      options: [
        { t: 'Mystery & depth', tags: ['original', 'zero'] },
        { t: 'Fruit-forward fun', tags: ['cherry', 'strawberry'] },
        { t: 'Dessert vibes', tags: ['cream-soda', 'strawberry'] },
        { t: 'Keep it lean', tags: ['zero'] },
      ],
    },
    {
      q: 'Finish the sentence: “Surprise me…”',
      options: [
        { t: '…but make it classic', tags: ['original'] },
        { t: '…with zero sugar', tags: ['zero'] },
        { t: '…with a cherry on top', tags: ['cherry'] },
        { t: '…with a limited drop', tags: ['strawberry', 'cream-soda'] },
      ],
    },
  ]
  let step = 0
  const scores = {}
  products.forEach((p) => {
    scores[p.id] = 0
  })

  const qEl = root.querySelector('[data-quiz-q]')
  const optsEl = root.querySelector('[data-quiz-options]')
  const resultEl = root.querySelector('[data-quiz-result]')
  const restart = root.querySelector('[data-quiz-restart]')

  function topProduct() {
    let max = 0
    let id = 'original'
    Object.entries(scores).forEach(([k, v]) => {
      if (v > max) {
        max = v
        id = k
      }
    })
    return products.find((p) => p.id === id) || products[0]
  }

  function renderStep() {
    if (step >= steps.length) {
      const p = topProduct()
      resultEl?.classList.remove('hidden')
      qEl?.parentElement?.classList.add('hidden')
      const title = resultEl?.querySelector('[data-result-name]')
      const link = resultEl?.querySelector('[data-result-link]')
      if (title) title.textContent = p.name
      if (link) {
        link.href = `${import.meta.env.BASE_URL || '/'}product-detail.html?sku=${encodeURIComponent(p.slug)}`
      }
      return
    }
    const s = steps[step]
    if (qEl) qEl.textContent = s.q
    if (optsEl) {
      optsEl.innerHTML = ''
      s.options.forEach((o) => {
        const btn = document.createElement('button')
        btn.type = 'button'
        btn.className =
          'rounded-xl border border-brand-burgundy/20 bg-white px-4 py-3 text-left text-sm font-medium text-brand-ink transition hover:border-brand-metallic hover:shadow-md dark:border-white/10 dark:bg-brand-burgundy-deep/50 dark:text-brand-cream'
        btn.textContent = o.t
        btn.addEventListener('click', () => {
          o.tags.forEach((id) => {
            scores[id] = (scores[id] || 0) + 1
          })
          step += 1
          renderStep()
        })
        optsEl.appendChild(btn)
      })
    }
  }

  restart?.addEventListener('click', () => {
    step = 0
    Object.keys(scores).forEach((k) => {
      scores[k] = 0
    })
    resultEl?.classList.add('hidden')
    qEl?.parentElement?.classList.remove('hidden')
    renderStep()
  })

  renderStep()
}

function initSpinWheel() {
  const wheel = document.getElementById('perks-wheel')
  const spinBtn = document.getElementById('spin-wheel-btn')
  const prizeEl = document.getElementById('wheel-prize')
  if (!wheel || !spinBtn) return

  const prizes = ['10% off merch (demo)', 'Wallpaper pack', 'Badge: Flavor Hunter', 'Try Zero Sugar next', 'Secret playlist unlock']
  let spinning = false

  spinBtn.addEventListener('click', () => {
    if (spinning) return
    spinning = true
    const turns = 4 + Math.random() * 2
    const deg = turns * 360 + Math.floor(Math.random() * 360)
    gsap.set(wheel, { transformOrigin: '50% 50%' })
    if (initReducedMotion()) {
      gsap.set(wheel, { rotation: deg })
    } else {
      gsap.to(wheel, { rotation: deg, duration: 3.2, ease: 'power3.out' })
    }
    window.setTimeout(() => {
      const pick = prizes[Math.floor(Math.random() * prizes.length)]
      if (prizeEl) prizeEl.textContent = pick
      spinning = false
    }, initReducedMotion() ? 0 : 3200)
  })
}

function initEmailForm(formId) {
  const form = document.getElementById(formId)
  if (!form) return
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const fd = new FormData(form)
    const email = fd.get('email')
    const status = form.querySelector('[data-form-status]')
    if (status) {
      status.textContent = `You're in — we saved ${String(email).slice(0, 3)}••• (demo).`
      status.classList.remove('hidden')
    }
    form.reset()
  })
}

function initProductCardsHover() {
  document.querySelectorAll('[data-product-card]').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      if (initReducedMotion()) return
      gsap.to(card, { y: -6, duration: 0.25, ease: 'power2.out' })
    })
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.25, ease: 'power2.out' })
    })
  })
}

function hydrateProductDetail() {
  if (page !== 'product-detail') return
  const params = new URLSearchParams(window.location.search)
  const sku = params.get('sku') || 'original'
  const p = getProductBySlug(sku)
  const titles = document.querySelectorAll('[data-pd-title]')
  const tags = document.querySelectorAll('[data-pd-tagline]')
  const desc = document.querySelector('[data-pd-desc]')
  const cal = document.querySelector('[data-pd-cal]')
  const sug = document.querySelector('[data-pd-sugar]')
  const caf = document.querySelector('[data-pd-caf]')
  const badge = document.querySelector('[data-pd-limited]')
  const notes = document.querySelector('[data-pd-notes]')
  titles.forEach((el) => {
    el.textContent = p.name
  })
  tags.forEach((el) => {
    el.textContent = p.tagline
  })
  if (desc) desc.textContent = p.description
  if (cal) cal.textContent = String(p.calories)
  if (sug) sug.textContent = p.sugar
  if (caf) caf.textContent = p.caffeine
  if (badge) {
    badge.classList.toggle('hidden', !p.limited)
  }
  if (notes) {
    notes.innerHTML = ''
    p.notes.forEach((n) => {
      const li = document.createElement('li')
      li.className = 'flex items-center gap-2'
      li.innerHTML = `<span class="h-1.5 w-1.5 rounded-full bg-brand-metallic" aria-hidden="true"></span>${n}`
      notes.appendChild(li)
    })
  }
  document.title = `${p.name} | Dr Pepper Concept`
  const og = document.querySelector('meta[property="og:title"]')
  if (og) og.setAttribute('content', `${p.name} | Dr Pepper Concept`)
}

function initStoreLocator() {
  if (page !== 'store') return
  const list = document.getElementById('store-results')
  const status = document.getElementById('store-status')
  const btn = document.getElementById('store-near-me')
  const stores = [
    { name: 'Metro Market — Downtown', city: 'Austin, TX', lat: 30.27, lon: -97.74 },
    { name: 'QuickStop Express', city: 'Los Angeles, CA', lat: 34.05, lon: -118.24 },
    { name: 'Night Owl Convenience', city: 'Chicago, IL', lat: 41.88, lon: -87.63 },
    { name: 'Circle Hub Mart', city: 'London, UK', lat: 51.51, lon: -0.13 },
    { name: 'Harbor 24/7', city: 'Tokyo, JP', lat: 35.68, lon: 139.76 },
  ]

  function distKm(a, b) {
    const R = 6371
    const dLat = ((b.lat - a.lat) * Math.PI) / 180
    const dLon = ((b.lon - a.lon) * Math.PI) / 180
    const lat1 = (a.lat * Math.PI) / 180
    const lat2 = (b.lat * Math.PI) / 180
    const x =
      Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2)
    const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
    return R * c
  }

  function render(user) {
    if (!list) return
    list.innerHTML = ''
    const ranked = user
      ? [...stores].sort((s1, s2) => distKm(user, s1) - distKm(user, s2))
      : stores
    ranked.forEach((s, i) => {
      const km = user ? distKm(user, s).toFixed(1) : null
      const li = document.createElement('li')
      li.className = 'card-elevated'
      li.innerHTML = `
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p class="font-semibold text-brand-ink dark:text-brand-cream">${s.name}</p>
            <p class="text-sm text-brand-muted">${s.city}</p>
          </div>
          <div class="text-right">
            ${km ? `<p class="text-sm font-medium text-brand-burgundy dark:text-brand-metallic-light">${km} km</p>` : ''}
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.name + ' ' + s.city)}" target="_blank" rel="noopener noreferrer" class="text-sm text-brand-crimson underline-offset-2 hover:underline">Directions</a>
          </div>
        </div>`
      list.appendChild(li)
    })
    if (status) {
      status.textContent = user ? 'Sorted by distance from you.' : 'Showing featured retailers (enable location for sorting).'
    }
  }

  render(null)

  btn?.addEventListener('click', () => {
    if (!navigator.geolocation) {
      if (status) status.textContent = 'Geolocation not available in this browser.'
      return
    }
    if (status) status.textContent = 'Locating…'
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        render({ lat: pos.coords.latitude, lon: pos.coords.longitude })
      },
      () => {
        if (status) status.textContent = 'Location denied — showing default list.'
        render(null)
      },
      { enableHighAccuracy: false, timeout: 8000 }
    )
  })
}

function initProductsList() {
  if (page !== 'products') return
  const grid = document.getElementById('product-grid')
  if (!grid) return
  grid.innerHTML = ''
  const baseUrl = import.meta.env.BASE_URL || '/'
  products.forEach((p) => {
    const article = document.createElement('article')
    article.className =
      'card-elevated group relative overflow-hidden transition hover:shadow-glow'
    article.setAttribute('data-product-card', '')
    article.innerHTML = `
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition group-hover:opacity-80 ${p.color}" aria-hidden="true"></div>
      <div class="relative flex min-h-[220px] flex-col justify-between gap-6">
        <div>
          ${p.limited ? '<span class="inline-block rounded-full bg-brand-metallic px-2 py-0.5 text-xs font-bold uppercase text-brand-ink">Limited</span>' : ''}
          <h2 class="mt-2 font-display text-2xl uppercase text-brand-ink dark:text-brand-cream">${p.name}</h2>
          <p class="mt-2 text-sm text-brand-muted">${p.short}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <a href="${baseUrl}product-detail.html?sku=${encodeURIComponent(p.slug)}" class="btn-primary text-xs">View flavor</a>
          <a href="${baseUrl}store-locator.html" class="btn-secondary text-xs">Find near you</a>
        </div>
      </div>`
    grid.appendChild(article)
  })
}

function initSocialFeed() {
  const grid = document.getElementById('social-feed')
  if (!grid) return
  const items = [
    { user: '@nightshift', text: 'Zero sugar + OT dub. pairing unbeatable.', tag: 'Gaming' },
    { user: '@vinylandfizz', text: 'Cherry on the chorus — don’t @ me.', tag: 'Music' },
    { user: '@snackradar', text: 'Drive-thru secured. Limited drop hunting begins.', tag: 'Culture' },
  ]
  items.forEach((it) => {
    const card = document.createElement('article')
    card.className = 'card-elevated'
    card.innerHTML = `
      <p class="text-xs font-semibold uppercase tracking-wider text-brand-metallic">${it.tag}</p>
      <p class="mt-2 text-sm text-brand-ink dark:text-brand-cream">${it.text}</p>
      <p class="mt-3 text-xs text-brand-muted">${it.user} · demo highlight</p>`
    grid.appendChild(card)
  })
}

const layoutMap = {
  home: 'home',
  products: 'products',
  'product-detail': 'products',
  about: 'about',
  campaigns: 'campaigns',
  store: 'store',
  blog: 'blog',
  contact: 'contact',
  newsletter: 'newsletter',
}

injectLayout(layoutMap[page] || 'home')
bindChrome()
initAbHero()
hydrateProductDetail()
initStoreLocator()
initProductsList()
initSocialFeed()
initEmailForm('newsletter-form')
initEmailForm('home-email-form')
initFlavorQuiz()
initSpinWheel()
initProductCardsHover()

if (page === 'home') {
  initHomeAnimations()
}
