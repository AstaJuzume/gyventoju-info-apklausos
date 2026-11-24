(() => {
  const button = document.getElementById('installAppBtn');
  if (!button) return;
  const standalone = window.matchMedia('(display-mode: standalone)');
  let promptEvent = null;
  const update = () => {
    button.hidden = !promptEvent || standalone.matches || window.navigator.standalone === true;
  };
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    promptEvent = event;
    update();
  });
  button.addEventListener('click', async () => {
    if (!promptEvent) return;
    const event = promptEvent;
    promptEvent = null;
    update();
    try {
      await event.prompt();
      await event.userChoice;
    } catch {
      // Installation remains available through the browser's own menu.
    }
  });
  window.addEventListener('appinstalled', () => {
    promptEvent = null;
    update();
  });
  standalone.addEventListener?.('change', update);
  update();
})();
