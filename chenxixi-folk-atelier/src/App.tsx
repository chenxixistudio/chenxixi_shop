import { useMemo, useState } from "react";
import type { FormEvent } from "react";

type Locale = "zh" | "en";
type Category = "all" | "textile" | "clay" | "fiber";

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const products = [
  {
    id: 1,
    category: "textile" as const,
    zh: "靛蓝手绣小包",
    en: "Indigo Embroidered Pouch",
    zhMeta: "手织棉布 · 手工刺绣",
    enMeta: "Handwoven cotton · Hand embroidery",
    price: 42,
    image: "images/product-indigo-pouch.png",
    position: "center",
    badgeZh: "新品",
    badgeEn: "New",
  },
  {
    id: 2,
    category: "clay" as const,
    zh: "陶土守护兽 · 一对",
    en: "Terracotta Guardians · Pair",
    zhMeta: "手捏陶土 · 手绘纹样",
    enMeta: "Hand-shaped clay · Hand painted",
    price: 58,
    image: "images/product-clay-figurines.png",
    position: "center",
    badgeZh: "限量",
    badgeEn: "Limited",
  },
  {
    id: 3,
    category: "textile" as const,
    zh: "草木染靛蓝披巾",
    en: "Botanical Indigo Throw",
    zhMeta: "天然染色 · 手织棉麻",
    enMeta: "Natural dye · Handwoven cotton linen",
    price: 96,
    image: "images/hero-folk-atelier.png",
    position: "72% center",
    badgeZh: "手作孤品",
    badgeEn: "One of a kind",
  },
  {
    id: 4,
    category: "fiber" as const,
    zh: "山野草编收纳篮",
    en: "Wild Grass Storage Basket",
    zhMeta: "天然草纤维 · 手工编织",
    enMeta: "Natural grass · Hand braided",
    price: 64,
    image: "images/hero-folk-atelier.png",
    position: "94% center",
    badgeZh: "小批量",
    badgeEn: "Small batch",
  },
];

const ui = {
  zh: {
    announcement: "欧盟地区订单满 €120 免运费 · 14 天安心退换",
    shop: "选购",
    story: "我们的故事",
    journal: "手作志",
    bag: "购物袋",
    switchLabel: "Switch to English",
    eyebrow: "珍藏来自土地的民间手艺",
    heroTitleA: "慢慢做，",
    heroTitleB: "长久相伴。",
    heroIntro: "从中国乡土与日常生活中挑选小批量手工器物，让有温度的传统手艺走进欧洲的家。",
    heroCta: "浏览手作系列",
    heroSecondary: "认识手艺人",
    heroCaption: "有温度的手艺，也有适合当代生活的轻盈。",
    handmade: "手工制作",
    rooted: "源于乡土",
    editions: "小批量呈现",
    collectionEyebrow: "本月精选 · AUGUST EDIT",
    collectionTitle: "把故事带回家",
    collectionText: "每一件作品都保留了手工的痕迹：不完全相同，正是它们珍贵的地方。",
    filters: { all: "全部", textile: "织物", clay: "陶土", fiber: "草木编织" },
    add: "加入购物袋",
    added: "已加入",
    viewAll: "查看全部手作",
    storyEyebrow: "OUR APPROACH · 我们的方式",
    storyTitle: "不只收藏物件，\n也收藏人与土地的联系。",
    storyP1: "我们拜访小型工作室与独立手艺人，寻找依然在日常中使用、也能与现代生活相处的民俗器物。",
    storyP2: "从一块布的染色，到一只陶兽的表情，我们记录制作者、材料和来处，让购买成为对手艺更长久的支持。",
    storyLink: "读我们的寻访故事",
    storyQuote: "手作不是复制过去，\n而是让记忆继续生长。",
    note: "每件作品都由手工完成，细微的色差、纹理与尺寸变化并非瑕疵，而是它独一无二的证明。",
    journalEyebrow: "JOURNAL · 手作志",
    journalTitle: "从手艺，看见更辽阔的生活",
    articleOne: "一抹靛蓝，从植物到织物",
    articleTwo: "泥土里的守护兽：民间造物的想象力",
    read: "阅读",
    newsletterTitle: "偶尔来信，分享新到手作与寻访故事。",
    newsletterText: "安静地来，不会太频繁。订阅即可获得首次订单 10% 优惠。",
    email: "你的邮箱",
    subscribe: "订阅",
    thankYou: "谢谢你，下一封手作来信见。",
    cartTitle: "你的购物袋",
    empty: "购物袋还是空的。去挑一件能陪伴很久的手作吧。",
    subtotal: "小计",
    shipping: "运费将在结账时计算",
    checkout: "前往结账",
    checkoutNote: "付款功能将在接入你的欧洲收款账户后启用。",
    remove: "移除",
    close: "关闭购物袋",
    footerLine: "来自中国的民俗手作，为欧洲的当代生活而选。",
    shippingFooter: "配送与退换",
    care: "材质与养护",
    contact: "联系我们",
    privacy: "隐私政策",
    rights: "© 2026 XIXI FOLK ATELIER",
  },
  en: {
    announcement: "Free EU delivery over €120 · 14-day returns",
    shop: "Shop",
    story: "Our story",
    journal: "Journal",
    bag: "Bag",
    switchLabel: "切换至中文",
    eyebrow: "Folk craft, thoughtfully collected",
    heroTitleA: "Made slowly.",
    heroTitleB: "Kept closely.",
    heroIntro: "Small-batch objects shaped by hand, tradition and everyday ritual — selected in China, shared with homes across Europe.",
    heroCta: "Explore the collection",
    heroSecondary: "Meet the makers",
    heroCaption: "Craft with a human touch, made light enough for modern life.",
    handmade: "Handmade",
    rooted: "Rooted in place",
    editions: "Small editions",
    collectionEyebrow: "THE AUGUST EDIT",
    collectionTitle: "Bring a story home",
    collectionText: "Every piece holds the trace of its maker. No two are exactly alike — and that is precisely the point.",
    filters: { all: "All", textile: "Textiles", clay: "Clay", fiber: "Natural fibre" },
    add: "Add to bag",
    added: "Added",
    viewAll: "View all craft",
    storyEyebrow: "OUR APPROACH",
    storyTitle: "We collect more than objects.\nWe collect connections.",
    storyP1: "We visit small workshops and independent makers to find folk objects that still belong in daily life — and feel at home in contemporary spaces.",
    storyP2: "From the dye in a piece of cloth to the expression on a clay guardian, we document the maker, material and place so every purchase supports craft for longer.",
    storyLink: "Read our sourcing story",
    storyQuote: "Craft does not copy the past.\nIt lets memory keep growing.",
    note: "Each piece is completed by hand. Subtle variations in colour, texture and size are not flaws, but proof that it is uniquely yours.",
    journalEyebrow: "THE JOURNAL",
    journalTitle: "A wider world, seen through craft",
    articleOne: "A trace of indigo: from plant to cloth",
    articleTwo: "Guardians in clay: the imagination of folk objects",
    read: "Read",
    newsletterTitle: "Occasional notes on new pieces and the people behind them.",
    newsletterText: "Quietly delivered, never too often. Subscribe for 10% off your first order.",
    email: "Your email address",
    subscribe: "Subscribe",
    thankYou: "Thank you — see you in the next field note.",
    cartTitle: "Your bag",
    empty: "Your bag is still empty. Choose something made to stay awhile.",
    subtotal: "Subtotal",
    shipping: "Shipping calculated at checkout",
    checkout: "Continue to checkout",
    checkoutNote: "Payments will be enabled when your European merchant account is connected.",
    remove: "Remove",
    close: "Close bag",
    footerLine: "Chinese folk craft, selected for contemporary European homes.",
    shippingFooter: "Delivery & returns",
    care: "Materials & care",
    contact: "Contact",
    privacy: "Privacy",
    rights: "© 2026 XIXI FOLK ATELIER",
  },
} as const;

export default function Home() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [filter, setFilter] = useState<Category>("all");
  const [cart, setCart] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState(false);
  const t = ui[locale];

  const visibleProducts = useMemo(
    () => products.filter((product) => filter === "all" || product.category === filter),
    [filter],
  );
  const cartProducts = cart.map((id) => products.find((product) => product.id === id)!);
  const subtotal = cartProducts.reduce((sum, product) => sum + product.price, 0);

  const addToCart = (id: number) => {
    setCart((items) => [...items, id]);
    setCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart((items) => items.filter((_, itemIndex) => itemIndex !== index));
  };

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <main>
      <div className="announcement">{t.announcement}</div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="XIXI Folk Atelier home">
          <span className="brand-mark">囍</span>
          <span>
            <strong>XIXI</strong>
            <small>FOLK ATELIER</small>
          </span>
        </a>

        <nav aria-label={locale === "zh" ? "主导航" : "Main navigation"}>
          <a href="#collection">{t.shop}</a>
          <a href="#story">{t.story}</a>
          <a href="#journal">{t.journal}</a>
        </nav>

        <div className="header-actions">
          <button
            className="language-switch"
            onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
            aria-label={t.switchLabel}
          >
            {locale === "zh" ? "EN" : "中文"}
          </button>
          <button
            className="bag-button"
            type="button"
            onClick={() => setCartOpen(true)}
            aria-expanded={cartOpen}
          >
            {t.bag} · {cart.length}
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <img className="hero-image" src={assetUrl("images/hero-folk-atelier.png")} alt="" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>
            <span>{t.heroTitleA}</span>
            <span>{t.heroTitleB}</span>
          </h1>
          <p className="hero-intro">{t.heroIntro}</p>
          <div className="hero-actions">
            <a className="primary-cta" href="#collection">
              {t.heroCta} <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#story">
              {t.heroSecondary} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <p className="hero-caption">{t.heroCaption}</p>
      </section>

      <section className="values" aria-label="Our values">
        <span><i />{t.handmade}</span>
        <span><i />{t.rooted}</span>
        <span><i />{t.editions}</span>
      </section>

      <section className="collection section-pad" id="collection">
        <div className="section-heading collection-heading">
          <div>
            <p className="section-eyebrow">{t.collectionEyebrow}</p>
            <h2>{t.collectionTitle}</h2>
          </div>
          <p>{t.collectionText}</p>
        </div>

        <div className="filter-row" role="group" aria-label="Product filters">
          {(Object.keys(t.filters) as Category[]).map((category) => (
            <button
              key={category}
              className={filter === category ? "active" : ""}
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
            >
              {t.filters[category]}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image-wrap">
                <img
                  src={assetUrl(product.image)}
                  alt={locale === "zh" ? product.zh : product.en}
                  style={{ objectPosition: product.position }}
                />
                <span className="product-badge">
                  {locale === "zh" ? product.badgeZh : product.badgeEn}
                </span>
                <button onClick={() => addToCart(product.id)}>
                  <span>{t.add}</span><span aria-hidden="true">＋</span>
                </button>
              </div>
              <div className="product-info">
                <div>
                  <h3>{locale === "zh" ? product.zh : product.en}</h3>
                  <p>{locale === "zh" ? product.zhMeta : product.enMeta}</p>
                </div>
                <strong>€{product.price}</strong>
              </div>
            </article>
          ))}
        </div>

        <a className="outline-link" href="#collection">
          {t.viewAll} <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="story section-pad" id="story">
        <div className="story-copy">
          <p className="section-eyebrow">{t.storyEyebrow}</p>
          <h2>
            {t.storyTitle.split("\n").map((line) => <span key={line}>{line}</span>)}
          </h2>
          <div className="story-text">
            <p>{t.storyP1}</p>
            <p>{t.storyP2}</p>
          </div>
          <a className="text-link story-link" href="#journal">{t.storyLink} <span>→</span></a>
        </div>
        <div className="story-visual">
          <img src={assetUrl("images/product-clay-figurines.png")} alt={locale === "zh" ? "一对手工陶土民俗动物摆件" : "A pair of hand-shaped terracotta folk animals"} />
          <blockquote>{t.storyQuote.split("\n").map((line) => <span key={line}>{line}</span>)}</blockquote>
        </div>
      </section>

      <aside className="craft-note">
        <span className="craft-note-mark">手</span>
        <p>{t.note}</p>
      </aside>

      <section className="journal section-pad" id="journal">
        <div className="section-heading journal-heading">
          <div>
            <p className="section-eyebrow">{t.journalEyebrow}</p>
            <h2>{t.journalTitle}</h2>
          </div>
        </div>
        <div className="journal-grid">
          <article className="journal-card journal-one">
            <img src={assetUrl("images/hero-folk-atelier.png")} alt="" />
            <div><span>01</span><h3>{t.articleOne}</h3><a href="#journal">{t.read} ↗</a></div>
          </article>
          <article className="journal-card journal-two">
            <img src={assetUrl("images/product-clay-figurines.png")} alt="" />
            <div><span>02</span><h3>{t.articleTwo}</h3><a href="#journal">{t.read} ↗</a></div>
          </article>
        </div>
      </section>

      <section className="newsletter">
        <span className="newsletter-stamp">囍</span>
        <div>
          <h2>{t.newsletterTitle}</h2>
          <p>{t.newsletterText}</p>
        </div>
        {subscribed ? (
          <p className="subscribe-success" role="status">{t.thankYou}</p>
        ) : (
          <form onSubmit={submitNewsletter}>
            <label className="sr-only" htmlFor="email">{t.email}</label>
            <input id="email" type="email" required placeholder={t.email} />
            <button type="submit">{t.subscribe} <span>→</span></button>
          </form>
        )}
      </section>

      <footer>
        <div className="footer-brand">
          <span className="brand-mark">囍</span>
          <div><strong>XIXI FOLK ATELIER</strong><p>{t.footerLine}</p></div>
        </div>
        <div className="footer-links">
          <a href="#top">{t.shippingFooter}</a>
          <a href="#story">{t.care}</a>
          <a href="#top">{t.contact}</a>
          <a href="#top">{t.privacy}</a>
        </div>
        <p className="copyright">{t.rights}</p>
      </footer>

      <div className={`cart-overlay ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`} aria-hidden={!cartOpen} aria-label={t.cartTitle}>
        <div className="cart-header">
          <h2>{t.cartTitle} <span>({cart.length})</span></h2>
          <button onClick={() => setCartOpen(false)} aria-label={t.close}>×</button>
        </div>
        <div className="cart-body">
          {cartProducts.length === 0 ? (
            <p className="empty-cart">{t.empty}</p>
          ) : cartProducts.map((product, index) => (
            <div className="cart-item" key={`${product.id}-${index}`}>
              <img src={assetUrl(product.image)} alt="" />
              <div>
                <h3>{locale === "zh" ? product.zh : product.en}</h3>
                <p>€{product.price}</p>
                <button onClick={() => removeFromCart(index)}>{t.remove}</button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div><span>{t.subtotal}</span><strong>€{subtotal}</strong></div>
          <p>{t.shipping}</p>
          <button className="checkout-button" disabled={cart.length === 0} onClick={() => setCheckoutMessage(true)}>{t.checkout} →</button>
          {checkoutMessage && <p className="checkout-note" role="status">{t.checkoutNote}</p>}
        </div>
      </aside>
    </main>
  );
}
