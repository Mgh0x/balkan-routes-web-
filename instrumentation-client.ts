const extensionAttributePattern = /^__processed_[\w-]+__$/;
const extensionAttributes = new Set([
  "bis_register",
  "cz-shortcut-listen",
  "data-gr-ext-installed",
  "data-new-gr-c-s-check-loaded",
]);

function cleanExtensionHydrationAttributes() {
  if (!document.body) {
    return;
  }

  for (const attribute of Array.from(document.body.attributes)) {
    if (extensionAttributes.has(attribute.name) || extensionAttributePattern.test(attribute.name)) {
      document.body.removeAttribute(attribute.name);
    }
  }
}

cleanExtensionHydrationAttributes();

const extensionAttributeObserver = new MutationObserver(cleanExtensionHydrationAttributes);

extensionAttributeObserver.observe(document.documentElement, {
  attributes: true,
  childList: true,
  subtree: true,
});

window.addEventListener(
  "load",
  () => {
    window.setTimeout(() => extensionAttributeObserver.disconnect(), 3000);
  },
  { once: true },
);
