import 'tailwindcss/tailwind.css';
import './assets/scss/common.scss';
// 模块联邦引入的外部模块
const HomeLog = await import('home/log');

HomeLog.Log('home-app');

console.log('[Webpack5-Module-Federation] Layout App Start!');
