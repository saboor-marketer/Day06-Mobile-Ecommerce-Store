import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Aperture,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BatteryCharging,
  Check,
  Cpu,
  LockKeyhole,
  Menu,
  Plus,
  Quote,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import ScrollStory from "./components/ScrollStory";
import Shop from "./components/Shop";
import PhoneVisual from "./components/PhoneVisual";
import { benefits, faqs, socialQuotes, testimonials } from "./data";

const navItems = [
  { label: "Design", href: "#design" },
  { label: "Features", href: "#features" },
  { label: "Your life", href: "#benefits" },
  { label: "Stories", href: "#stories" },
  { label: "Compare", href: "#shop" },
];

const zoomLevels = [
  { label: "0.5×", scale: 1 },
  { label: "1×", scale: 1.35 },
  { label: "2×", scale: 1.75 },
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 48, filter: "blur(8px)" }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="announcement" href="#shop">
        <span>A better day starts here.</span>
        <span>Build your iPhone <ArrowRight size={13} /></span>
      </a>
      <div className="nav-wrap">
        <nav className="navbar page-shell" aria-label="Main navigation">
          <a href="#top" className="brand" aria-label="iPhone home" onClick={() => setMenuOpen(false)}>
            <span className="brand-orb" aria-hidden="true" />
            <span>iPhone</span>
          </a>
          <div className="desktop-nav">
            {navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
          </div>
          <a href="#shop" className="nav-cta">Find your iPhone <ArrowUpRight size={15} /></a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, y: -18, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, y: -12, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="page-shell">
              {navItems.map((item, index) => (
                <motion.a
                  href={item.href}
                  key={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + index * 0.04 }}
                >
                  <span>0{index + 1}</span>{item.label}<ArrowRight size={18} />
                </motion.a>
              ))}
              <a href="#shop" className="button button-light mobile-menu-cta" onClick={() => setMenuOpen(false)}>Find your iPhone <ArrowRight size={17} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.24]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={heroRef} className="hero">
      <motion.div className="hero-media-wrap" style={reduceMotion ? undefined : { scale: imageScale, y: imageY }}>
        <img className="hero-media" src="/images/hero-iphone.png" alt="iPhone with an iridescent display floating in soft studio light" fetchPriority="high" />
      </motion.div>
      <div className="hero-vignette" />
      <div className="hero-ambient hero-ambient-one" aria-hidden="true" />
      <div className="hero-ambient hero-ambient-two" aria-hidden="true" />

      <motion.div className="hero-inner page-shell" style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}>
        <div className="hero-copy">
          <motion.div
            className="hero-eyebrow"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <Sparkles size={14} /> Introducing iPhone 17 Pro
          </motion.div>
          <h1 className="hero-title" aria-label="Your day, only better.">
            {["Your day,", "only better."].map((line, index) => (
              <span className="hero-line" key={line}>
                <motion.span
                  initial={reduceMotion ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.22 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="hero-description"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            Beautifully capable. Effortlessly personal. From the first hello to the last photo of the night, iPhone fits the life you’re actually living.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.68 }}
          >
            <a className="button button-light" href="#shop">Find your iPhone <ArrowRight size={17} /></a>
            <a className="text-link text-link-light" href="#design">See what’s new <ArrowDown size={16} /></a>
          </motion.div>
          <motion.div
            className="hero-price"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <span>iPhone 17 Pro</span>
            <span>From $1,099</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="hero-float-card"
        initial={reduceMotion ? false : { opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <span className="hero-float-icon"><Aperture size={18} /></span>
        <div><strong>Every moment. More detail.</strong><span>48MP Pro Fusion camera system</span></div>
      </motion.div>
      <a href="#community" className="hero-scroll" aria-label="Scroll to customer stories">
        <span>Discover</span><i><ArrowDown size={15} /></i>
      </a>
    </section>
  );
}

function SocialProof() {
  return (
    <section id="community" className="social-proof section-pad-sm">
      <div className="page-shell">
        <Reveal className="social-proof-heading">
          <span className="section-kicker">From the iPhone community</span>
          <h2>Better is something you feel.</h2>
          <p>Not just on a spec sheet. In the small moments that make up your day.</p>
        </Reveal>
        <div className="social-quote-grid">
          {socialQuotes.map((item, index) => (
            <motion.blockquote
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Quote size={22} strokeWidth={1.5} />
              <p>“{item.quote}”</p>
              <footer><span>{item.name.charAt(0)}</span><div><strong>{item.name}</strong><small>{item.detail}</small></div></footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const [zoom, setZoom] = useState(1);
  const reduceMotion = useReducedMotion();

  return (
    <section id="features" className="features-section section-pad">
      <div className="page-shell">
        <Reveal className="section-heading features-heading">
          <span className="section-kicker">Why iPhone</span>
          <h2>Powerful where it counts.<br />Effortless where it matters.</h2>
          <p>Thoughtful hardware and intuitive software, working together to make everything feel a little more natural.</p>
        </Reveal>

        <div className="feature-grid">
          <motion.article
            className="feature-card feature-camera"
            initial={reduceMotion ? false : { opacity: 0, y: 55 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src="/images/night-camera.jpg"
              alt="A richly detailed portrait in low evening light"
              loading="lazy"
              decoding="async"
              animate={{ scale: reduceMotion ? 1 : zoomLevels[zoom].scale }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="feature-image-shade" />
            <div className="feature-card-top"><span><Aperture size={17} /> Pro camera system</span><span>48MP</span></div>
            <div className="feature-camera-copy">
              <h3>Every shade<br />of the moment.</h3>
              <p>A versatile Pro Fusion camera system brings more light, texture, and possibility to every frame.</p>
              <div className="zoom-control" role="group" aria-label="Preview camera zoom">
                {zoomLevels.map((level, index) => (
                  <button type="button" key={level.label} className={zoom === index ? "active" : ""} aria-pressed={zoom === index} onClick={() => setZoom(index)}>{level.label}</button>
                ))}
              </div>
            </div>
          </motion.article>

          <motion.article
            className="feature-card feature-performance"
            initial={reduceMotion ? false : { opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <div className="feature-icon"><Cpu size={19} /></div>
            <div className="chip-visual" aria-hidden="true"><i /><span>A19<small>Pro</small></span><i /></div>
            <div><h3>Fast feels calm.</h3><p>A19 Pro powers graphics-intensive games, creative work, and on-device intelligence without breaking your flow.</p></div>
          </motion.article>

          <motion.article
            className="feature-card feature-battery"
            initial={reduceMotion ? false : { opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.14 }}
          >
            <div className="feature-icon"><BatteryCharging size={19} /></div>
            <div className="battery-visual" aria-hidden="true"><div><strong>33</strong><span>hours</span></div></div>
            <div><h3>Outlast your plans.</h3><p>Up to 33 hours of video playback on iPhone 17 Pro. More living, less looking for an outlet.</p></div>
          </motion.article>

          <motion.article className="feature-card feature-privacy" initial={reduceMotion ? false : { opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
            <div className="feature-icon"><LockKeyhole size={19} /></div>
            <h3>Your life stays yours.</h3>
            <p>Privacy is built into the hardware, software, and everyday choices—not hidden in a settings menu.</p>
            <div className="privacy-list" aria-hidden="true"><span>Photos <i>Only what you choose</i><Check size={14} /></span><span>Precise location <i>Ask first</i><Check size={14} /></span></div>
          </motion.article>

          <motion.article className="feature-card feature-display" initial={reduceMotion ? false : { opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: 0.08 }}>
            <div className="display-orbit" aria-hidden="true"><i /><i /><span>120<small>Hz</small></span></div>
            <div className="feature-icon"><Sun size={19} /></div>
            <h3>Brilliant in every light.</h3>
            <p>ProMotion makes every scroll feel fluid, while higher outdoor brightness keeps everything clear under the sun.</p>
          </motion.article>

          <motion.article className="feature-card feature-durability" initial={reduceMotion ? false : { opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: 0.16 }}>
            <div className="feature-icon"><ShieldCheck size={19} /></div>
            <div className="durability-lines" aria-hidden="true"><i /><i /><i /></div>
            <h3>Ready for real life.</h3>
            <p>Ceramic Shield 2 and a strong, refined enclosure help protect the device that holds so much of your world.</p>
            <span className="feature-caption">Beautifully tough. Down to the details.</span>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const [active, setActive] = useState(0);
  const current = benefits[active];

  const handleKeys = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(event.key)) return;
    event.preventDefault();
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const next = (index + (forward ? 1 : -1) + benefits.length) % benefits.length;
    setActive(next);
    window.requestAnimationFrame(() => document.getElementById(`benefit-tab-${next}`)?.focus());
  };

  return (
    <section id="benefits" className="benefits-section section-pad">
      <div className="page-shell">
        <Reveal className="section-heading benefits-heading">
          <span className="section-kicker">Made for your life</span>
          <h2>More than a phone.<br />A little more freedom.</h2>
          <p>Whatever today looks like, iPhone gives you the tools to meet it on your own terms.</p>
        </Reveal>
        <div className="benefit-tabs" role="tablist" aria-label="Ways iPhone fits your life">
          {benefits.map((benefit, index) => (
            <button
              type="button"
              role="tab"
              id={`benefit-tab-${index}`}
              aria-selected={active === index}
              aria-controls="benefit-panel"
              tabIndex={active === index ? 0 : -1}
              className={active === index ? "active" : ""}
              onClick={() => setActive(index)}
              onKeyDown={(event) => handleKeys(event, index)}
              key={benefit.id}
            >
              <span>0{index + 1}</span>{benefit.nav}<ArrowRight size={17} />
            </button>
          ))}
        </div>
        <div id="benefit-panel" className="benefit-panel" role="tabpanel" aria-labelledby={`benefit-tab-${active}`}>
          <AnimatePresence mode="wait">
            <motion.div
              className="benefit-copy"
              key={current.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-kicker">{current.eyebrow}</span>
              <h3>{current.title}</h3>
              <p>{current.body}</p>
              <ul>{current.points.map((point) => <li key={point}><Check size={16} />{point}</li>)}</ul>
              <a href="#shop" className="text-link">Find the one for you <ArrowRight size={16} /></a>
            </motion.div>
          </AnimatePresence>
          <div className="benefit-media">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={current.id}
                src={current.image}
                alt={current.alt}
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, scale: 1.08, clipPath: "inset(0 0 0 18%)" }}
                animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0 0%)" }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
            <span className="benefit-media-label"><i /> iPhone, in your element.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 1]);
  const story = testimonials[index];
  const paginate = (step: number) => setIndex(([current]) => [(current + step + testimonials.length) % testimonials.length, step]);
  const goTo = (next: number) => setIndex(([current]) => [next, next > current ? 1 : -1]);

  return (
    <section id="stories" className="stories-section section-pad">
      <div className="page-shell">
        <Reveal className="stories-heading-row">
          <div className="section-heading">
            <span className="section-kicker">In their own words</span>
            <h2>Good days.<br />Great stories.</h2>
          </div>
          <p>Different routines, different ambitions, one familiar feeling: technology that simply fits.</p>
        </Reveal>
        <Reveal>
          <div className="story-carousel" style={{ background: `linear-gradient(135deg, ${story.color}45, #f8f7f3 58%, ${story.color}70)` }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={story.name}
                aria-live="polite"
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 70 : -70 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -45 : 45 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="story-quote-wrap">
                  <Quote size={34} strokeWidth={1.25} />
                  <blockquote>“{story.quote}”</blockquote>
                  <figcaption><strong>{story.name}</strong><span>{story.meta}</span></figcaption>
                </div>
                <div className="story-person-visual" aria-hidden="true">
                  <span>{story.name.charAt(0)}</span>
                  <i>{story.tag}</i>
                </div>
              </motion.figure>
            </AnimatePresence>
            <div className="story-controls">
              <div className="story-dots" role="group" aria-label="Choose a customer story">
                {testimonials.map((item, dotIndex) => <button type="button" key={item.name} className={index === dotIndex ? "active" : ""} aria-label={`Show story from ${item.name}`} aria-pressed={index === dotIndex} onClick={() => goTo(dotIndex)} />)}
              </div>
              <div className="story-arrows">
                <span>{String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span>
                <button type="button" onClick={() => paginate(-1)} aria-label="Previous story"><ArrowLeft size={19} /></button>
                <button type="button" onClick={() => paginate(1)} aria-label="Next story"><ArrowRight size={19} /></button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="faq-section section-pad">
      <div className="page-shell faq-layout">
        <Reveal className="faq-heading">
          <span className="section-kicker">Good to know</span>
          <h2>Questions,<br />meet answers.</h2>
          <p>Everything you need to choose with confidence. Still wondering? Apple Support can help with the details.</p>
          <a href="https://support.apple.com/iphone" target="_blank" rel="noreferrer" className="text-link">Visit iPhone Support <ArrowUpRight size={16} /></a>
        </Reveal>
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <motion.div className={`faq-item ${isOpen ? "open" : ""}`} key={faq.question} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.55, delay: index * 0.05 }}>
                <h3>
                  <button type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(isOpen ? null : index)}>
                    <span><small>0{index + 1}</small>{faq.question}</span><motion.i animate={{ rotate: isOpen ? 45 : 0 }}><Plus size={20} /></motion.i>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`faq-answer-${index}`} className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="closing-section" aria-labelledby="closing-title">
      <div className="page-shell">
        <Reveal className="closing-card">
          <div className="closing-glow closing-glow-one" aria-hidden="true" />
          <div className="closing-glow closing-glow-two" aria-hidden="true" />
          <div className="closing-copy">
            <span className="section-kicker">Your next chapter looks good</span>
            <h2 id="closing-title">Ready for a better<br />everyday?</h2>
            <p>Take your time. Find your finish. Make it feel like yours.</p>
            <div className="closing-actions">
              <a className="button button-light" href="#shop">Find your iPhone <ArrowRight size={17} /></a>
              <a className="text-link text-link-light" href="https://www.apple.com/retail/" target="_blank" rel="noreferrer">Visit an Apple Store <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="closing-phones" aria-hidden="true">
            <PhoneVisual color="#b96b45" />
            <PhoneVisual color="#343a44" front />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#top" className="brand"><span className="brand-orb" aria-hidden="true" /><span>iPhone</span></a>
            <p>Designed to bring out<br />the best in your everyday.</p>
          </div>
          <div className="footer-links">
            <div><h3>Explore</h3><a href="#design">Design</a><a href="#features">Features</a><a href="#benefits">Made for your life</a><a href="#shop">Compare models</a></div>
            <div><h3>Support</h3><a href="https://support.apple.com/iphone" target="_blank" rel="noreferrer">iPhone Support</a><a href="https://support.apple.com/en-us/118670" target="_blank" rel="noreferrer">Move from Android</a><a href="https://support.apple.com/guide/iphone/welcome/ios" target="_blank" rel="noreferrer">User Guide</a><a href="https://www.apple.com/retail/" target="_blank" rel="noreferrer">Find a Store</a></div>
            <div><h3>Our values</h3><a href="https://www.apple.com/privacy/" target="_blank" rel="noreferrer">Privacy</a><a href="https://www.apple.com/accessibility/" target="_blank" rel="noreferrer">Accessibility</a><a href="https://www.apple.com/environment/" target="_blank" rel="noreferrer">Environment</a><a href="#faq">FAQs</a></div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} iPhone experience. Product imagery is illustrative. Purchases, financing, and availability are fulfilled through Apple.com.</p>
          <a href="#top" className="back-to-top">Back to top <ArrowUp size={15} /></a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <SocialProof />
        <Features />
        <ScrollStory />
        <Benefits />
        <Testimonials />
        <Shop />
        <FAQ />
        <ClosingCTA />
      </main>
      <Footer />
    </MotionConfig>
  );
}
