(() => {
  const storageKey = "offlinewiki.settings";
  const recentKey = "offlinewiki.recent";
  const favoritesKey = "offlinewiki.favorites";

  const defaults = {
    baseUrl: "AUTO",
    zimSlug: "wikipedia_de_all_maxi_2025-09",
    openInNewTab: true,
    theme: "dark",
    buttonStyle: "default",
    accent: "#00d4ff",
    language: "de",
    languageSlugs: {
      de: "wikipedia_de_all_maxi_2025-09",
      en: "wikipedia_en_all_maxi_2025-08"
    }
  };

  const credits = {
    username: "leminkozey",
    version: "v2.0.0",
    repoUrl: "https://github.com/leminkozey/OfflineWiki",
    repoLabel: "bleib up to date"
  };

  const state = { ...defaults };
  let recent = [];
  let favorites = [];
  const knownLanguages = ["de", "en"];

  const inferBaseUrl = () => {
    const loc = window.location;
    if (loc.port === "8080") return loc.origin;
    return `${loc.protocol}//${loc.hostname}:8080`;
  };

  const normalizeBaseUrl = (value) => {
    if (!value || value === "AUTO") return inferBaseUrl();
    return value.replace(/\/$/, "");
  };

  const inferLanguageFromSlug = (slug) => {
    if (!slug) return defaults.language;
    if (slug.startsWith("wikipedia_en_")) return "en";
    if (slug.startsWith("wikipedia_de_")) return "de";
    return defaults.language;
  };

  const load = () => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) Object.assign(state, JSON.parse(raw));
    } catch (err) {
      console.warn("Settings load failed", err);
    }

    try {
      const rawRecent = localStorage.getItem(recentKey);
      recent = rawRecent ? JSON.parse(rawRecent) : [];
    } catch (err) {
      recent = [];
    }

    try {
      const rawFav = localStorage.getItem(favoritesKey);
      favorites = rawFav ? JSON.parse(rawFav) : [];
    } catch (err) {
      favorites = [];
    }

    if (!state.language || !knownLanguages.includes(state.language)) {
      state.language = inferLanguageFromSlug(state.zimSlug);
    }

    if (!state.languageSlugs) {
      state.languageSlugs = { ...defaults.languageSlugs };
    } else {
      state.languageSlugs = { ...defaults.languageSlugs, ...state.languageSlugs };
    }
  };

  const save = () => {
    localStorage.setItem(storageKey, JSON.stringify(state));
    localStorage.setItem(recentKey, JSON.stringify(recent));
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
  };

  const buildUrls = () => {
    const base = normalizeBaseUrl(state.baseUrl);
    const slug = state.zimSlug.replace(/^\//, "");
    return {
      base,
      home: `${base}/${slug}/`,
      search: `${base}/search`
    };
  };

  const updateLinks = () => {
    const urls = buildUrls();
    const tileHome = document.getElementById("tileHome");
    if (tileHome) {
      tileHome.href = urls.home;
      tileHome.target = state.openInNewTab ? "_blank" : "_self";
    }
  };

  const updateAccentPickerUI = (accent) => {
    const picker = document.getElementById("accentPicker");
    if (!picker) return;
    picker.querySelectorAll(".accent-option").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.color === accent);
    });
  };

  const updateInputs = () => {
    updateAccentPickerUI(state.accent);
    updateThemeToggleUI(state.theme);
    updateOpenTabToggleUI(state.openInNewTab);
    updateButtonStyleToggleUI(state.buttonStyle);
  };

  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 212, b: 255 };
  };

  const applyAppearance = () => {
    const effectiveTheme = state.theme === "system" ? getSystemTheme() : state.theme;
    document.body.setAttribute("data-theme", effectiveTheme);
    if (state.buttonStyle === "simple") {
      document.body.setAttribute("data-button-style", "simple");
    } else {
      document.body.removeAttribute("data-button-style");
    }
    // Set on both root and body to override CSS specificity
    const rgb = hexToRgb(state.accent);
    const accentVars = {
      "--accent": state.accent,
      "--accent-strong": state.accent,
      "--accent-glow": `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`,
      "--accent-subtle": `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08)`,
      "--border-glow": `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`
    };
    for (const [key, value] of Object.entries(accentVars)) {
      document.documentElement.style.setProperty(key, value);
      document.body.style.setProperty(key, value);
    }
  };

  const applyLanguage = () => {
    document.documentElement.lang = state.language === "en" ? "en" : "de";
  };

  const updateThemeSwitcherUI = (theme) => {
    const switcher = document.getElementById("themeSwitcher");
    if (!switcher) return;

    const options = ["dark", "system", "light"];
    const position = options.indexOf(theme);
    switcher.setAttribute("data-position", position >= 0 ? position : 0);

    switcher.querySelectorAll(".theme-option").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.value === theme);
    });
  };

  // Legacy function for compatibility
  const updateThemeToggleUI = (theme) => {
    updateThemeSwitcherUI(theme);
  };

  const updateOpenTabToggleUI = (openInNewTab) => {
    const group = document.getElementById("openTabToggleGroup");
    if (!group) return;
    group.querySelectorAll(".toggle-option").forEach((btn) => {
      btn.classList.toggle("active", String(openInNewTab) === btn.dataset.value);
    });
  };

  const updateButtonStyleToggleUI = (style) => {
    const group = document.getElementById("buttonStyleToggleGroup");
    if (!group) return;
    group.querySelectorAll(".toggle-option").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.value === style);
    });
  };

  let saveToastTimeout = null;
  const showSaveToast = (message = "Gespeichert") => {
    let toast = document.querySelector(".save-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "save-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("visible");

    if (saveToastTimeout) clearTimeout(saveToastTimeout);
    saveToastTimeout = setTimeout(() => {
      toast.classList.remove("visible");
    }, 1500);
  };

  const applyCredits = () => {
    const profileUrl = `https://github.com/${credits.username}`;
    const avatar = document.getElementById("creditsAvatar");
    const name = document.getElementById("creditsName");
    const repo = document.getElementById("creditsRepo");
    const version = document.getElementById("creditsVersion");
    const footerLink = document.getElementById("creditsLink");

    if (avatar) avatar.src = `${profileUrl}.png`;
    if (name) {
      name.textContent = credits.username;
      name.href = profileUrl;
    }
    if (repo) {
      repo.href = credits.repoUrl;
      repo.textContent = credits.repoLabel;
    }
    if (version) version.textContent = credits.version;
    if (footerLink) footerLink.href = profileUrl;
  };

  const updateLanguageButton = () => {
    const btn = document.getElementById("langSwitchBtn");
    if (!btn) return;
    const label = state.language === "en" ? "English" : "Deutsch";
    btn.setAttribute("aria-label", `Sprache wechseln (aktuell ${label})`);
    btn.querySelectorAll(".flag").forEach((flag) => {
      flag.classList.toggle("active", flag.dataset.lang === state.language);
    });
  };

  const updateStatus = (ok, detail) => {
    const chip = document.getElementById("statusChip");
    const serverDot = document.getElementById("serverStatusDot");
    const serverText = document.getElementById("serverStatusText");

    if (chip) {
      chip.textContent = ok ? "Status: Online" : "Status: Offline";
    }

    if (serverDot && serverText) {
      serverDot.classList.toggle("ok", ok);
      serverText.textContent = detail;
    }
  };

  const checkServer = async () => {
    const { base } = buildUrls();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    try {
      const res = await fetch(`${base}/`, { method: "GET", signal: controller.signal });
      clearTimeout(timeout);
      if (res.ok) {
        updateStatus(true, `Server erreichbar: ${base}`);
      } else {
        updateStatus(false, `Server antwortet (${res.status}).`);
      }
    } catch (err) {
      clearTimeout(timeout);
      updateStatus(false, "Server nicht erreichbar.");
    }
  };

  const recordRecent = (query) => {
    if (!query) return;
    recent = recent.filter((item) => item.query !== query);
    recent.unshift({ query, ts: Date.now() });
    recent = recent.slice(0, 5);
    save();
    renderRecent();
  };

  const renderRecent = () => {
    const list = document.getElementById("recentList");
    if (!list) return;
    if (!recent.length) {
      list.innerHTML = '<div class="empty">Noch keine Suchen.</div>';
      return;
    }
    const { search } = buildUrls();
    list.innerHTML = recent
      .map((item) => {
        const url = `${search}?pattern=${encodeURIComponent(item.query)}`;
        return `
          <div class="list-item">
            <div>
              <strong>${item.query}</strong>
              <div class="small-note">${new Date(item.ts).toLocaleString()}</div>
            </div>
            <a class="btn secondary" href="${url}" target="${state.openInNewTab ? "_blank" : "_self"}">Öffnen</a>
          </div>
        `;
      })
      .join("");
  };

  const renderFavorites = () => {
    const list = document.getElementById("favoritesList");
    if (!list) return;
    if (!favorites.length) {
      list.innerHTML = '<div class="empty">Noch keine Favoriten.</div>';
      return;
    }
    const { search } = buildUrls();
    list.innerHTML = favorites
      .map((fav, idx) => {
        const url = `${search}?pattern=${encodeURIComponent(fav.query)}`;
        return `
          <div class="list-item">
            <div>
              <strong>${fav.label}</strong>
              <div class="small-note">${fav.query}</div>
            </div>
            <div class="list-actions">
              <a class="btn secondary" href="${url}" target="${state.openInNewTab ? "_blank" : "_self"}">Öffnen</a>
              <button class="btn danger" data-remove="${idx}">Löschen</button>
            </div>
          </div>
        `;
      })
      .join("");

    list.querySelectorAll('[data-remove]').forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.remove);
        favorites.splice(idx, 1);
        save();
        renderFavorites();
      });
    });
  };

  const openSearch = (query) => {
    if (!query || !query.trim()) return;
    const { search } = buildUrls();
    const q = encodeURIComponent(query.trim());
    const url = `${search}?pattern=${q}`;
    const target = state.openInNewTab ? "_blank" : "_self";
    const win = window.open(url, target);
    if (!win) window.location.href = url;
    recordRecent(query.trim());
  };

  const initSettingsOverlay = () => {
    const settingsBtn = document.getElementById("settingsBtn");
    const settingsOverlay = document.getElementById("settingsOverlay");
    const settingsClose = document.getElementById("settingsClose");
    const tabs = document.querySelectorAll(".settings-tab");
    const panels = document.querySelectorAll(".settings-panel");

    const open = () => settingsOverlay.classList.add("active");
    const close = () => settingsOverlay.classList.remove("active");

    settingsBtn.addEventListener("click", open);
    settingsClose.addEventListener("click", close);
    settingsOverlay.addEventListener("click", (event) => {
      if (event.target === settingsOverlay) close();
    });

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        panels.forEach((p) => p.classList.remove("active"));
        tab.classList.add("active");
        const panel = document.getElementById(`panel-${tab.dataset.tab}`);
        if (panel) panel.classList.add("active");
      });
    });
  };

  const init = () => {
    load();
    applyAppearance();
    applyLanguage();
    applyCredits();
    updateLinks();
    updateInputs();
    updateLanguageButton();
    renderRecent();
    renderFavorites();
    checkServer();
    setInterval(checkServer, 20000);

    initSettingsOverlay();

    const langSwitchBtn = document.getElementById("langSwitchBtn");
    if (langSwitchBtn) {
      langSwitchBtn.addEventListener("click", () => {
        state.language = state.language === "de" ? "en" : "de";
        const nextSlug = state.languageSlugs[state.language] || defaults.languageSlugs[state.language];
        if (nextSlug) state.zimSlug = nextSlug;
        save();
        applyLanguage();
        updateLanguageButton();
        updateInputs();
        updateLinks();
        checkServer();
      });
    }

    const randomizeFavoritePlaceholders = () => {
      const examples = [
        { label: "KI", query: "Künstliche Intelligenz" },
        { label: "LLM", query: "Großes Sprachmodell" },
        { label: "Netzwerk", query: "Netzwerkprotokoll" },
        { label: "Linux", query: "Linux" },
        { label: "Geschichte", query: "Geschichte" },
        { label: "Fußball", query: "Fußball" },
        { label: "Raumfahrt", query: "Raumfahrt" }
      ];
      const pick = examples[Math.floor(Math.random() * examples.length)];
      const labelInput = document.getElementById("favoriteLabel");
      const queryInput = document.getElementById("favoriteQuery");
      if (labelInput && queryInput) {
        labelInput.placeholder = `Titel (z.B. ${pick.label})`;
        queryInput.placeholder = `Suchbegriff (z.B. ${pick.query})`;
      }
    };

    randomizeFavoritePlaceholders();

    // Theme Switcher with animation
    const themeSwitcher = document.getElementById("themeSwitcher");
    if (themeSwitcher) {
      themeSwitcher.querySelectorAll(".theme-option").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.theme = btn.dataset.value;
          applyAppearance();
          updateThemeSwitcherUI(state.theme);
          save();
          showSaveToast();
        });
      });
      // Initialize position
      updateThemeSwitcherUI(state.theme);
    }

    // Listen for system theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (state.theme === "system") {
        applyAppearance();
      }
    });

    document.getElementById("openTabToggleGroup").querySelectorAll(".toggle-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.openInNewTab = btn.dataset.value === "true";
        updateOpenTabToggleUI(state.openInNewTab);
        save();
        showSaveToast();
      });
    });

    document.getElementById("buttonStyleToggleGroup").querySelectorAll(".toggle-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.buttonStyle = btn.dataset.value;
        applyAppearance();
        updateButtonStyleToggleUI(state.buttonStyle);
        save();
        showSaveToast();
      });
    });

    // Accent color picker
    document.getElementById("accentPicker").querySelectorAll(".accent-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.accent = btn.dataset.color;
        applyAppearance();
        updateAccentPickerUI(state.accent);
        save();
        showSaveToast();
      });
    });

    document.getElementById("showServerCommands").addEventListener("click", () => {
      const serverPanel = document.getElementById("serverPanel");
      serverPanel.hidden = !serverPanel.hidden;
    });

    const copy = async (btn, text) => {
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = "Kopiert";
        setTimeout(() => (btn.textContent = "Kopieren"), 1200);
      } catch (err) {
        btn.textContent = "Fehler";
        setTimeout(() => (btn.textContent = "Kopieren"), 1200);
      }
    };

    document.getElementById("copyRestart").addEventListener("click", (e) => {
      copy(e.currentTarget, "cd /Volumes/MK/kiwix && docker compose restart");
    });

    document.getElementById("copyDown").addEventListener("click", (e) => {
      copy(e.currentTarget, "cd /Volumes/MK/kiwix && docker compose down");
    });

    document.getElementById("resetBtn").addEventListener("click", () => {
      Object.assign(state, defaults);
      save();
      applyAppearance();
      applyLanguage();
      updateLanguageButton();
      updateInputs();
      updateThemeSwitcherUI(state.theme);
      updateLinks();
      checkServer();
      showSaveToast("Zurückgesetzt");
    });

    document.getElementById("searchInput").addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        openSearch(event.target.value.trim());
      }
    });

    document.getElementById("tileRecent").addEventListener("click", () => {
      const panel = document.getElementById("recentPanel");
      panel.hidden = !panel.hidden;
    });

    document.getElementById("tileFavorites").addEventListener("click", () => {
      const panel = document.getElementById("favoritesPanel");
      panel.hidden = !panel.hidden;
      randomizeFavoritePlaceholders();
    });

    document.getElementById("addFavorite").addEventListener("click", () => {
      const label = document.getElementById("favoriteLabel").value.trim();
      const query = document.getElementById("favoriteQuery").value.trim();
      if (!query) return;
      favorites.push({ label: label || query, query });
      document.getElementById("favoriteLabel").value = "";
      document.getElementById("favoriteQuery").value = "";
      save();
      renderFavorites();
    });

  };

  init();
})();
