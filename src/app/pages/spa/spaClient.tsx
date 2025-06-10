import { initClient } from "rwsdk/client";

initClient({});

// We will overwrite client side navigation.

// Navigation handler function type
type NavigationHandler = (url: string, state?: any) => void;

let navigationHandler: NavigationHandler | null = null;

// Initialize navigation interception
function initNavigation(onNavigate: NavigationHandler) {
  navigationHandler = onNavigate;

  // Intercept all link clicks
  document.addEventListener("click", handleLinkClick);

  // Handle browser back/forward buttons
  window.addEventListener("popstate", handlePopState);
}

function handleLinkClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const link = target.closest("a");

  if (!link || !navigationHandler) return;

  const href = link.getAttribute("href");

  // Skip if no href, external link, or has download attribute
  if (
    !href ||
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    link.hasAttribute("download") ||
    link.getAttribute("target") === "_blank"
  ) {
    return;
  }

  // Skip if modifier keys are pressed (allow opening in new tab)
  if (event.ctrlKey || event.metaKey || event.shiftKey) {
    return;
  }

  // Prevent default navigation
  event.preventDefault();

  // Handle the navigation manually
  navigateTo(href);
}

function handlePopState(event: PopStateEvent) {
  if (!navigationHandler) return;

  // Handle browser back/forward button
  const url =
    window.location.pathname + window.location.search + window.location.hash;
  navigationHandler(url, event.state);
}

function navigateTo(url: string, state?: any) {
  // Update browser URL without page reload
  window.history.pushState(state, "", url);

  // Call the navigation handler
  if (navigationHandler) {
    navigationHandler(url, state);
  }
}

function replaceTo(url: string, state?: any) {
  // Replace current URL without adding to history
  window.history.replaceState(state, "", url);

  // Call the navigation handler
  if (navigationHandler) {
    navigationHandler(url, state);
  }
}

// Initialize with your navigation handler
initNavigation(async (url, state) => {
  console.log("Navigating to:", url, "with state:", state);

  // @ts-expect-error
  await globalThis.__rsc_callServer();
});
