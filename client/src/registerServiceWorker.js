import { Workbox } from 'workbox-window';

let result = null;

if ('serviceWorker' in navigator) {
  result = new Workbox(`${process.env.BASE_URL}service-worker.js`);

  result.addEventListener('controlling', () => {
    window.location.reload();
  });

  result.register();
} else {
  result = null;
}
const wb = result;
export default wb;
