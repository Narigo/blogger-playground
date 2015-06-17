var $ = window.$;
$(function () {
  var $random = $('#campudus-random');
  var $randomClick = $('#campudus-random-click');
  var a = ['attraktiven', 'beliebten', 'bescheidenen', 'coolen', 'epischen', 'erfahrenen', 'fröhlichen', 'guten',
    'gnädigen', 'humorvollen', 'kaputten', 'klaustrophobischen', 'liebevollen', 'multidimensionalen', 'prämierten',
    'tollen', 'verdorbenen', 'vergnügten', 'verschrobenen', 'zauberhaften'];
  var b = ['Designer', 'Freunde', 'Gorillas', 'Helden', 'Jungs', 'Kids', 'Kellerkinder', 'Knacker', 'Kollegen',
    'Krieger', 'Männer', 'Nerds', 'Ninjas', 'Opas', 'Roboter', 'Tiere', 'Typen', 'Programmierer', 'Zauberer', 'Zebras'];

  $randomClick.click(function (e) {
    $random.text(a[Math.floor(Math.random() * a.length)] + ' ' + b[Math.floor(Math.random() * b.length)]);
  });
  $randomClick.mouseenter(function (e) {
    $randomClick.click();
  });

  $randomClick.click();

  console.log('hello', $randomClick, $random);
});
