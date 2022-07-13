import Application from './application/Application.js';
window.app = new Application({
    dom: document.getElementById('warp'),
});
window.app.start();

window.addEventListener('resize', () => {
    window.app.resize();
});
