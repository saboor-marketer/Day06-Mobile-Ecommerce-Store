import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
  CreditCard,
  Info,
  ShieldCheck,
  Truck,
  X,
} from "lucide-react";
import { models, type IPhoneModel } from "../data";
import PhoneVisual from "./PhoneVisual";

type PaymentView = "full" | "monthly";
type SavedConfig = {
  modelId: string;
  storageIndex: number;
  colorIndex: number;
  tradeDevice: string;
  condition: string;
};

const tradeDevices = [
  { id: "none", label: "No trade-in", value: 0 },
  { id: "15-pro-max", label: "iPhone 15 Pro Max", value: 440 },
  { id: "15-pro", label: "iPhone 15 Pro", value: 400 },
  { id: "14-pro", label: "iPhone 14 Pro", value: 330 },
  { id: "13", label: "iPhone 13", value: 230 },
  { id: "12", label: "iPhone 12", value: 160 },
  { id: "android", label: "Recent Android flagship", value: 210 },
  { id: "other", label: "Another smartphone", value: 75 },
];

const conditions = [
  { id: "excellent", label: "Excellent — minimal signs of wear", multiplier: 1 },
  { id: "good", label: "Good — normal cosmetic wear", multiplier: 0.8 },
  { id: "fair", label: "Fair — visible wear, fully functional", multiplier: 0.55 },
];

const money = (value: number) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format(value);

const monthly = (value: number) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(value / 24);

export default function Shop() {
  const [payment, setPayment] = useState<PaymentView>("full");
  const [selected, setSelected] = useState<IPhoneModel | null>(null);
  const [storageIndex, setStorageIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [tradeDevice, setTradeDevice] = useState("none");
  const [condition, setCondition] = useState("excellent");
  const [justSaved, setJustSaved] = useState(false);
  const [savedConfig, setSavedConfig] = useState<SavedConfig | null>(null);
  const [toast, setToast] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("iphone-configuration");
      if (stored) {
        const parsed = JSON.parse(stored) as SavedConfig;
        if (models.some((model) => model.id === parsed.modelId)) setSavedConfig(parsed);
      }
    } catch {
      // A damaged or unavailable local entry should never block shopping.
    }
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!selected) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    }, 60);

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], select:not([disabled]), input:not([disabled]), [tabindex="0"]',
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      previousFocus?.focus();
    };
  }, [selected]);

  const openConfig = (model: IPhoneModel, config?: SavedConfig) => {
    const savedStorage = config && Number.isInteger(config.storageIndex) ? config.storageIndex : 0;
    const savedColor = config && Number.isInteger(config.colorIndex) ? config.colorIndex : 0;
    setSelected(model);
    setStorageIndex(Math.max(0, Math.min(savedStorage, model.storage.length - 1)));
    setColorIndex(Math.max(0, Math.min(savedColor, model.finishes.length - 1)));
    setTradeDevice(config?.tradeDevice ?? "none");
    setCondition(config?.condition ?? "excellent");
    setJustSaved(false);
  };

  const resumeSaved = () => {
    if (!savedConfig) return;
    const model = models.find((item) => item.id === savedConfig.modelId);
    if (model) openConfig(model, savedConfig);
  };

  const forgetSaved = () => {
    try {
      window.localStorage.removeItem("iphone-configuration");
    } catch {
      // Removing UI state still gives predictable behavior if storage is blocked.
    }
    setSavedConfig(null);
    setToast("Saved setup removed from this browser.");
  };

  const total = selected ? selected.price + selected.storage[storageIndex].add : 0;
  const selectedTrade = tradeDevices.find((device) => device.id === tradeDevice) ?? tradeDevices[0];
  const selectedCondition = conditions.find((item) => item.id === condition) ?? conditions[0];
  const tradeCredit = Math.round(selectedTrade.value * selectedCondition.multiplier);

  const saveConfiguration = () => {
    if (!selected) return;
    const config: SavedConfig = {
      modelId: selected.id,
      storageIndex,
      colorIndex,
      tradeDevice,
      condition,
    };
    try {
      window.localStorage.setItem("iphone-configuration", JSON.stringify(config));
      setSavedConfig(config);
      setJustSaved(true);
      setToast(`${selected.name} setup saved on this device.`);
    } catch {
      setToast("Your browser blocked local saving. You can still continue to Apple.com.");
    }
  };

  return (
    <section id="shop" className="shop-section section-pad">
      <div className="page-shell">
        <div className="shop-heading-row">
          <div className="section-heading shop-heading">
            <span className="section-kicker">Find your iPhone</span>
            <h2>Different for a reason.<br />One feels like you.</h2>
            <p>Compare the things that matter, then make it yours. Every model includes the familiar iPhone experience and privacy built in.</p>
          </div>
          <div className="payment-control" role="group" aria-label="Show prices as full price or monthly payments">
            {(["full", "monthly"] as PaymentView[]).map((option) => (
              <button
                key={option}
                type="button"
                className={payment === option ? "active" : ""}
                aria-pressed={payment === option}
                onClick={() => setPayment(option)}
              >
                {payment === option && <motion.span layoutId="payment-pill" className="payment-active" />}
                <span>{option === "full" ? "Pay in full" : "Pay monthly"}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {savedConfig && (
            <motion.div
              className="saved-setup-bar"
              initial={{ opacity: 0, y: -12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -12, height: 0 }}
            >
              <span><Bookmark size={16} /> You have a setup saved in this browser.</span>
              <div>
                <button type="button" onClick={resumeSaved}>Resume setup <ArrowRight size={15} /></button>
                <button type="button" className="saved-remove" onClick={forgetSaved} aria-label="Remove saved setup"><X size={15} /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="model-grid">
          {models.map((model, index) => (
            <motion.article
              className="model-card"
              key={model.id}
              initial={reduceMotion ? false : { opacity: 0, y: 48 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="model-card-topline">
                <span>{model.badge}</span>
                <span>{model.storage[0].label}</span>
              </div>
              <div className="model-phone-stage" style={{ background: `radial-gradient(circle at 50% 55%, ${model.accent}66, transparent 64%)` }}>
                <PhoneVisual color={model.finishes[0].hex} />
                <div className="model-color-dots" aria-label={`Available in ${model.finishes.map((finish) => finish.name).join(", ")}`}>
                  {model.finishes.map((finish) => <i key={finish.name} style={{ background: finish.hex }} title={finish.name} />)}
                </div>
              </div>
              <div className="model-card-copy">
                <h3>{model.name}</h3>
                <p className="model-tagline">{model.tagline}</p>
                <p className="model-description">{model.description}</p>
                <ul>
                  {model.highlights.map((highlight) => <li key={highlight}><Check size={14} />{highlight}</li>)}
                </ul>
                <div className="model-price" aria-live="polite">
                  <span>From</span>
                  <strong>{payment === "full" ? money(model.price) : `${monthly(model.price)}/mo.`}</strong>
                  <small>{payment === "full" ? "before trade-in" : "for 24 mo. before trade-in"}</small>
                </div>
                <button type="button" className="button button-dark model-button" onClick={() => openConfig(model)}>
                  Make it yours <ArrowRight size={17} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="shop-assurances">
          <span><Truck size={18} /> Delivery options confirmed at checkout</span>
          <span><CreditCard size={18} /> Financing subject to eligibility</span>
          <span><ShieldCheck size={18} /> Secure purchase on Apple.com</span>
        </div>
        <p className="pricing-footnote">Monthly pricing divides the full retail price by 24 for simple comparison and excludes taxes and fees. Actual financing terms may differ. Battery and capability claims vary by configuration and use.</p>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="config-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelected(null);
            }}
          >
            <motion.div
              ref={dialogRef}
              className="config-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="config-title"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 50, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 35, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <button className="config-close" type="button" onClick={() => setSelected(null)} aria-label="Close configurator"><X size={20} /></button>
              <div className="config-visual" style={{ background: `linear-gradient(150deg, ${selected.accent}55, #e9e7e1 60%, #d8d5cf)` }}>
                <span className="config-visual-label">Your iPhone</span>
                <div className="config-phones" aria-hidden="true">
                  <PhoneVisual color={selected.finishes[colorIndex].hex} />
                  <PhoneVisual color={selected.finishes[colorIndex].hex} front />
                </div>
                <div className="config-visual-caption">
                  <strong>{selected.finishes[colorIndex].name}</strong>
                  <span>{selected.storage[storageIndex].label}</span>
                </div>
              </div>

              <div className="config-content">
                <div className="config-content-inner">
                  <span className="section-kicker">Configure your own</span>
                  <h2 id="config-title">{selected.name}</h2>
                  <p className="config-tagline">{selected.tagline}</p>

                  <fieldset className="config-group">
                    <legend>Finish <span>{selected.finishes[colorIndex].name}</span></legend>
                    <div className="finish-options">
                      {selected.finishes.map((finish, index) => (
                        <button
                          type="button"
                          key={finish.name}
                          className={colorIndex === index ? "selected" : ""}
                          aria-label={finish.name}
                          aria-pressed={colorIndex === index}
                          onClick={() => setColorIndex(index)}
                        >
                          <i style={{ background: finish.hex }} />
                          {colorIndex === index && <Check size={13} />}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="config-group">
                    <legend>Storage <span>How much room do you need?</span></legend>
                    <div className="storage-options">
                      {selected.storage.map((option, index) => (
                        <button
                          type="button"
                          key={option.label}
                          className={storageIndex === index ? "selected" : ""}
                          aria-pressed={storageIndex === index}
                          onClick={() => setStorageIndex(index)}
                        >
                          <strong>{option.label}</strong>
                          <span>{option.add ? `+${money(option.add)}` : "Included"}</span>
                          {storageIndex === index && <Check size={15} />}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="config-group trade-group" id="trade-in">
                    <label htmlFor="trade-device">Trade-in planner <span>Optional estimate</span></label>
                    <div className="select-wrap">
                      <select id="trade-device" value={tradeDevice} onChange={(event) => setTradeDevice(event.target.value)}>
                        {tradeDevices.map((device) => <option value={device.id} key={device.id}>{device.label}</option>)}
                      </select>
                      <ChevronDown size={16} aria-hidden="true" />
                    </div>
                    <AnimatePresence initial={false}>
                      {tradeDevice !== "none" && (
                        <motion.div
                          className="trade-details"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <div className="select-wrap">
                            <label className="sr-only" htmlFor="trade-condition">Device condition</label>
                            <select id="trade-condition" value={condition} onChange={(event) => setCondition(event.target.value)}>
                              {conditions.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}
                            </select>
                            <ChevronDown size={16} aria-hidden="true" />
                          </div>
                          <div className="trade-estimate">
                            <span>Planning estimate</span>
                            <strong>−{money(tradeCredit)}</strong>
                          </div>
                          <p><Info size={14} /> Not an official valuation. Apple confirms credit after inspection.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="config-summary">
                  <div className="config-total">
                    <div>
                      <span>{tradeCredit ? "Estimated total after trade-in" : "Your configuration"}</span>
                      <strong>{money(Math.max(0, total - tradeCredit))}</strong>
                      <small>or {monthly(Math.max(0, total - tradeCredit))}/mo. for 24 mo.</small>
                    </div>
                    {tradeCredit > 0 && <span className="config-before">{money(total)}</span>}
                  </div>
                  <button type="button" className={`button save-button ${justSaved ? "saved" : ""}`} onClick={saveConfiguration}>
                    {justSaved ? <Check size={17} /> : <Bookmark size={17} />}
                    {justSaved ? "Saved on this device" : "Save this setup"}
                  </button>
                  <a className="button button-dark config-buy" href="https://www.apple.com/shop/buy-iphone" target="_blank" rel="noreferrer">
                    Continue on Apple.com <ArrowUpRight size={17} />
                  </a>
                  <p>No payment is taken here. Final price, trade-in value, financing, and availability are confirmed on Apple.com.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            role="status"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
          >
            <Check size={16} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
