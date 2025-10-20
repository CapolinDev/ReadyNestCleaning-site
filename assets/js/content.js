(function () {
  const page = (window.__PAGE__ || "").toLowerCase();
  const byId = (id) => document.getElementById(id);
  const setText = (id, text) => { const el = byId(id); if (el) el.textContent = text || ""; };
  const setAttr = (id, attr, val) => { const el = byId(id); if (el) el.setAttribute(attr, val); };

  const render = {
    home(data) {
      if (data.seo) {
        setText("seo-title", data.seo.title);
        setAttr("seo-description", "content", data.seo.description);
      }
      setText("hero-heading", data.hero?.heading);
      setText("hero-subheading", data.hero?.subheading);
      const cta = byId("hero-cta");
      if (cta) { cta.textContent = data.hero?.ctaText || ""; cta.href = data.hero?.ctaLink || "#"; }

      const fl = byId("features-list");
      if (fl && Array.isArray(data.features)) {
        fl.innerHTML = data.features.map(f => `<li><h3>${f.title}</h3><p>${f.text}</p></li>`).join("");
      }

      const tl = byId("testimonials-list");
      if (tl && Array.isArray(data.testimonials)) {
        tl.innerHTML = data.testimonials.map(t => `<li><blockquote>“${t.quote}”</blockquote><p>— ${t.name}</p></li>`).join("");
      }
    },

    services(data) {
      if (data.seo) {
        setText("seo-title", data.seo.title);
        setAttr("seo-description", "content", data.seo.description);
      }
      setText("services-intro", data.intro);
      const grid = byId("services-grid");
      if (grid && Array.isArray(data.services)) {
        grid.innerHTML = data.services.map(s => `
          <article class="card">
            <h3>${s.name}</h3>
            <p>${s.summary}</p>
            <p><strong>${s.priceRange}</strong></p>
            ${s.bullets?.length ? `<ul>${s.bullets.map(b => `<li>${b}</li>`).join("")}</ul>` : ""}
          </article>
        `).join("");
      }
      const cta = byId("services-cta");
      if (cta) { cta.textContent = data.cta?.text || ""; cta.href = data.cta?.link || "#"; }
    },

    contact(data) {
      if (data.seo) {
        setText("seo-title", data.seo.title);
        setAttr("seo-description", "content", data.seo.description);
      }
      setText("contact-intro", data.intro);
      setText("contact-address", data.address);
      const phone = byId("contact-phone");
      if (phone) { phone.textContent = data.phone; phone.href = `tel:${data.phone.replace(/[^+\d]/g,"")}`; }
      const email = byId("contact-email");
      if (email) { email.textContent = data.email; email.href = `mailto:${data.email}`; }
      const hours = byId("contact-hours");
      if (hours && Array.isArray(data.businessHours)) {
        hours.innerHTML = data.businessHours.map(h => `<li>${h}</li>`).join("");
      }
    }
  };

  async function boot() {
    try {
      const res = await fetch(`/content/${page}.json`, { cache: "no-cache" });
      if (!res.ok) throw new Error(`Failed to load ${page}.json`);
      const data = await res.json();
      render[page]?.(data);
    } catch (e) {
      console.error(e);
    } finally {
      const y = document.getElementById("year"); if (y) y.textContent = String(new Date().getFullYear());
    }
  }

  if (page) boot();
})();
