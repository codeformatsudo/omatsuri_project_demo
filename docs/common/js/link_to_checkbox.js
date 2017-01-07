$(function () {
 $(document).on('click', '.mapcheckbox', function () {

  var i, j;
  var input;
  var inputs = $('article > div > input');
  var inputsLen = inputs.length;

  //マップメニューのチェックをはずし、すべてのタブを閉じる
  for (i = 0; i < inputsLen; i++) {
   input = inputs[i];
   var accordionChecked = input.parentNode.parentNode.parentNode.firstChild;
   if (input.checked) {
    input.checked = false;
    accordionChecked.checked = false;
   }
  }

  // リンク内のテキストとチェックボックスを特定するセレクタをひも付けている。
  // チェックボックスの順番やリンク内のテキストを変更した場合は下記のハッシュも調整すること。
  var maps = {
   "中央ステージ": "#leaflet-control-accordion-layers-0 > article > div:nth-child(1) > input",
   "チャリティライブ": "#leaflet-control-accordion-layers-0 > article > div:nth-child(2) > input",
   "駅前ひろば": "#leaflet-control-accordion-layers-0 > article > div:nth-child(3) > input",
   "テント村": "#leaflet-control-accordion-layers-0 > article > div:nth-child(4) > input",
   "わくわくマーケット": "#leaflet-control-accordion-layers-0 > article > div:nth-child(5) > input",
   "献血": "#leaflet-control-accordion-layers-0 > article > div:nth-child(6) > input",
   "中央パレード": "#leaflet-control-accordion-layers-1 > article > div:nth-child(1) > input",
   "五香パレード": "#leaflet-control-accordion-layers-1 > article > div:nth-child(3) > input",
   "全さくら通りパレード": "#leaflet-control-accordion-layers-1 > article > div:nth-child(2) > input"
  };
  $(maps[this.innerText]).trigger("click");

  //マップに移動
  var mapPosition = $('#map').offset().top - 60;
  $('html, body').animate({
   scrollTop: mapPosition
  }, {
   queue: false
  });

  //チェックの入ったマップメニューのタブを開く
  for (j = 0; j < inputsLen; j++) {
   input = inputs[j];
   var accordion = input.parentNode.parentNode.parentNode.firstChild;
   if (input.checked) {
    accordion.checked = true;
   }
  }
 });
});
