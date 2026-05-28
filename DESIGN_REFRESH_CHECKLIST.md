# Portfolio Design Refresh Checklist

To'liq redesign qilmasdan, mavjud loyihani professional darajaga olib chiqish uchun checklist.

## 1) Quick Wins (1-2 kun)

- [x] `Title` komponentida asosiy sarlavhalarni semantik taglarga o'tkazish (`h1/h2/h3`).
- [x] Interaktiv `div` elementlarni `button` yoki `a` bilan almashtirish.
- [x] `:focus-visible` uchun aniq va ko'rinadigan outline uslubini qaytarish.
- [x] Kontent xatolarini tuzatish (imlo, email, matn aniqligi).
- [x] Social/link elementlarida `aria-label` va accessibility matnlarini birxillashtirish.

## 2) Security va Contact Flow (0.5-1 kun)

- [x] Telegram bot tokenini frontenddan olib tashlash.
- [x] Xabar yuborishni Next.js API route (backend) orqali qilish.
- [x] Environment variablelarni server-side ishlatish (`.env.local`).
- [x] Contact form uchun xatolik/success holatlarini UX jihatdan yaxshilash.

## 3) Styling Structure (2-3 kun)

- [x] `globals.scss`ni bo'lish: `tokens`, `base`, `utilities`, `components`, `sections`.
- [x] Keraksiz `!important`lardan bosqichma-bosqich voz kechish.
- [x] Utility classlarni kamaytirib, komponentga yaqin style berish (`Title` → `Title.module.scss`).
- [x] Spacing va typography uchun yagona scale qabul qilish.
- [x] Rang tokenlarini semantik nomlash (`--color-text-primary`, `--color-surface`, va h.k.).

## 4) Responsive va Accessibility QA (1 kun)

- [x] Mobile (360px), Tablet (768px), Desktop (1440px) breakpoint test (`_responsive.scss` padding/max-width).
- [x] Fixed width/height klasslarini qayta ko'rib chiqish (`w-319`, `w-h-60` kabi).
- [x] Klaviatura bilan to'liq navigatsiya test qilish (Tab, Enter, Space, Esc).
- [x] Heading hierarchy tekshirish (`h1` faqat 1 ta, keyin tartibli `h2/h3`).
- [x] Contrast tekshiruvi (matn/fon o'qilishi WCAGga yaqin bo'lishi).

## 5) Visual Polish (ixtiyoriy, 1-2 kun)

- [x] Card hover/transitionlarni yengillashtirish (ortiqcha animatsiyani kamaytirish).
- [x] Bo'limlar oralig'ini bir xil ritmga keltirish.
- [x] Hero va CTAlarni aniqroq value proposition bilan yangilash.
- [x] Loyiha kartalarida preview/actionlarni bir xil patternga o'tkazish.

## 6) Yakuniy Tekshiruv

- [ ] `npm run dev` bilan qo'lda smoke test (brauzerda Home / Projects / Resume / Contact).
- [ ] `npm run lint` — ESLint hali sozlanmagan (`next lint` interaktiv setup so‘raydi).
- [x] `npm run build` — muvaffaqiyatli compile (sitemap uchun `SITE_URL` kerak).
- [ ] Lighthouse (Performance, Accessibility, Best Practices) natijalarini solishtirish.

---

## Tavsiya etilgan tartib (eng to'g'ri yo'l)

1. Quick Wins  
2. Security/Contact  
3. Styling Structure  
4. Responsive + Accessibility QA  
5. Visual Polish  

Natija: to'liq redesignsiz ham sayt ko'rinishi, sifati va maintainability sezilarli oshadi.

