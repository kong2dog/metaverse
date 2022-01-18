import apm3d from './index';

window.app = new apm3d.Application({
    dom: document.getElementById('warp'),
    scene: new apm3d.EarthScene()
});
window.app.start();

window.addEventListener('resize', () => {
    window.app.resize();
});
