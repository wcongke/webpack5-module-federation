export function Log(nodeId: string) {
  if (!nodeId) return;

  global.console.log('[Webpack5-Module-Federation] Log Components Start!');

  const container = document.getElementById(nodeId);
  container.innerHTML = 'Home Log Component';
}
