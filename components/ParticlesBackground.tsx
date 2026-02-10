"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation"; // Next.js 13+ hook

declare global {
  interface Window {
    particlesJS: (id: string, config: unknown) => void;
    pJSDom: Array<{ pJS: { fn: { vendors: { destroypJS: () => void }; particlesRefresh: () => void }; particles: { color: { value: string } } } }>;
  }
}

export default function ParticlesBackground() {
  const initialized = useRef(false);
  const pathname = usePathname(); // Track page changes

  useEffect(() => {
    const getCSSVar = (name: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    const initParticles = () => {
      if (!window.particlesJS) return;

      const primaryColor = getCSSVar("--primary");

      const config = {
        particles: {
          number: { value: 200, density: { enable: true, value_area: 800 } },
          color: { value: primaryColor },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true },
          size: { value: 6, random: true },
          line_linked: { enable: false },
          move: { enable: true, speed: 6, direction: "bottom", out_mode: "out" },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "bubble" },
            onclick: { enable: true, mode: "repulse" },
            resize: true,
          },
          modes: { bubble: { distance: 400, size: 4, duration: 0.3, opacity: 1, speed: 3 } },
        },
        retina_detect: true,
      };

      // If already initialized, destroy first
      if (initialized.current && window.pJSDom?.[0]) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
        initialized.current = false;
      }

      window.particlesJS("particles-js", config);
      initialized.current = true;
    };

    // Wait until script is loaded
    if (typeof window.particlesJS === "function") {
      initParticles();
    } else {
      window.addEventListener("particlesjs-loaded", initParticles);
    }

    // Update color on dark/light toggle
    const observer = new MutationObserver(() => {
      if (window.pJSDom?.[0]) {
        const color = getCSSVar("--primary");
        window.pJSDom[0].pJS.particles.color.value = color;
        window.pJSDom[0].pJS.fn.particlesRefresh();
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Re-run on pathname change (page navigation)
    initParticles();

    return () => {
      window.removeEventListener("particlesjs-loaded", initParticles);
      observer.disconnect();
    };
  }, [pathname]); // re-run when the route changes

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
        strategy="afterInteractive"
        onLoad={() => window.dispatchEvent(new Event("particlesjs-loaded"))}
      />
      <div id="particles-js" className="absolute inset-0 pointer-events-none" />
    </>
  );
}
