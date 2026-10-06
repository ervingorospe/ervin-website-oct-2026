// Theme store. The <html data-theme> attribute is the source of truth; it is set before first paint by the
// inline script in app/layout.tsx and kept in sync here. The default is always light; dark is used only after
// the visitor picks it with the toggle (saved in localStorage under the key below).

export type Theme = "light" | "dark";
export const THEME_KEY = "portfolio_theme";

/** Runs in <head> before paint so there's no flash of the wrong theme. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');if(t!=='light'&&t!=='dark'){t='light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})();`;

const listeners = new Set<() => void>();

export function subscribeTheme(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
  listeners.forEach((l) => l());
}
