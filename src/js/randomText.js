var $ = window.$;

var a = ['attraktiven', 'beliebten', 'bescheidenen', 'coolen', 'epischen', 'erfahrenen', 'fröhlichen', 'guten',
  'gnädigen', 'humorvollen', 'kaputten', 'klaustrophobischen', 'liebevollen', 'multidimensionalen', 'prämierten',
  'tollen', 'verdorbenen', 'vergnügten', 'verschrobenen', 'zauberhaften'];
var b = ['Designer', 'Freunde', 'Gorillas', 'Helden', 'Jungs', 'Kids', 'Kellerkinder', 'Knacker', 'Kollegen',
  'Krieger', 'Männer', 'Nerds', 'Ninjas', 'Opas', 'Roboter', 'Tiere', 'Typen', 'Programmierer', 'Zauberer', 'Zebras'];

var $random, $randomClick;

function onClick() {
  $random.innerHTML = a[Math.floor(Math.random() * a.length)] + ' ' + b[Math.floor(Math.random() * b.length)];
}

function init() {
  $random = $('#campudus-random')[0];
  $randomClick = $('#campudus-random-click')[0];

  $randomClick.addEventListener('click', onClick);
  $randomClick.addEventListener('mouseenter', onClick);
  onClick();
}

function destroy() {
  $randomClick.removeEventListener('click', onClick);
  $randomClick.removeEventListener('mouseenter', onClick);
}

module.exports = {
  init : init,
  destroy : destroy
};
