import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Aperture, Feather } from "lucide-react";

export default function ScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const firstScale = useTransform(scrollYProgress, [0, 0.48, 1], [1, 1.12, 1.18]);
  const firstY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-5%"]);
  const firstOpacity = useTransform(scrollYProgress, [0.38, 0.58], [1, 0]);
  const firstCopyY = useTransform(scrollYProgress, [0, 0.42], [0, -90]);
  const secondClip = useTransform(
    scrollYProgress,
    [0.34, 0.66],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );
  const secondScale = useTransform(scrollYProgress, [0.34, 1], [1.18, 1.02]);
  const secondCopyOpacity = useTransform(scrollYProgress, [0.55, 0.72], [0, 1]);
  const secondCopyY = useTransform(scrollYProgress, [0.55, 0.78], [80, 0]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (reduceMotion) {
    return (
      <section id="design" ref={sectionRef} aria-label="Design and camera story">
        <div className="story-static story-static-light">
          <img src="/images/showcase-back.png" alt="Premium smartphone seen from the back" loading="lazy" decoding="async" />
          <div className="story-static-copy">
            <span className="section-kicker"><Feather size={15} /> Design</span>
            <h2>Made to be<br />held onto.</h2>
            <p>Precision-crafted aluminum. A beautifully balanced silhouette. A finish that feels considered from every angle.</p>
          </div>
        </div>
        <div className="story-static story-static-dark">
          <img src="/images/night-camera.jpg" alt="A natural low-light portrait at blue hour" />
          <div className="story-static-copy">
            <span className="section-kicker"><Aperture size={15} /> Camera</span>
            <h2>Own the<br />after hours.</h2>
            <p>Keep the atmosphere and the detail, even when the light decides to leave.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="design" ref={sectionRef} className="story-scroll" aria-label="A scroll-driven design and camera story">
      <div className="story-sticky">
        <motion.div className="story-scene story-scene-design" style={{ opacity: firstOpacity }}>
          <motion.img
            src="/images/showcase-back.png"
alt="Premium smartphone seen from the back"
            className="story-design-image"
            loading="lazy"
            decoding="async"
            style={{ scale: firstScale, y: firstY }}
          />
          <div className="story-design-wash" />
          <motion.div className="story-copy story-copy-design" style={{ y: firstCopyY }}>
            <span className="section-kicker"><Feather size={15} /> Design that feels different</span>
            <h2>Made to be<br />held onto.</h2>
            <p>Precision-crafted aluminum. A beautifully balanced silhouette. Understated finishes that look even better in your hand.</p>
            <span className="story-material-note"><i /> Heat-forged aluminum · Ceramic Shield 2</span>
          </motion.div>
        </motion.div>

        <motion.div className="story-scene story-scene-camera" style={{ clipPath: secondClip }}>
          <motion.img
            src="/images/night-camera.jpg"
            alt="A detailed, natural low-light portrait at blue hour"
            className="story-camera-image"
            loading="lazy"
            decoding="async"
            style={{ scale: secondScale }}
          />
          <div className="story-camera-wash" />
          <motion.div
            className="story-copy story-copy-camera"
            style={{ opacity: secondCopyOpacity, y: secondCopyY }}
          >
            <span className="section-kicker"><Aperture size={15} /> The 48MP Pro Fusion camera</span>
            <h2>Own the<br />after hours.</h2>
            <p>Keep the atmosphere. Hold onto the detail. Low-light processing brings out the feeling without washing out the night.</p>
            <span className="story-camera-meta">48MP <i /> Night mode <i /> 4K Dolby Vision</span>
          </motion.div>
        </motion.div>

        <div className="story-progress" aria-hidden="true">
          <div className="story-progress-labels"><span>Design</span><span>Camera</span></div>
          <div className="story-progress-track"><motion.i style={{ scaleX: progressScale }} /></div>
        </div>
        <motion.div className="story-scroll-hint" style={{ opacity: firstOpacity }} aria-hidden="true">
          <ArrowDown size={15} /> Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}
