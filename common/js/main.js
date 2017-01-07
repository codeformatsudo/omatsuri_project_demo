(function () {
 "use strict";


 //headerの縮小
 // スクロールして何ピクセルでアニメーションさせるか
 var px_change = 300;
 // スクロールのイベントハンドラを登録
 window.addEventListener('scroll', function (e) {
  // 変化するポイントまでスクロールしたらクラスを追加
  if ($(window).scrollTop() > px_change) {
   $("header").addClass("smaller");
   // 変化するポイント以前であればクラスを削除
  } else if ($("header").hasClass("smaller")) {
   $("header").removeClass("smaller");
  }
 });

 //アクセス
 csvToArray('common/data/access.csv', function (data) {
  //場所
  var accessArea = document.querySelector('.home_place');
  var dataLen = data.length;
  var i = 1; //1行目を除く
  var j = 1; //1行目を除く
  //場所
  var placeArea = document.createElement('div');
  placeArea.classList.add('home_access_palce');
  accessArea.appendChild(placeArea);
  for (i; i < dataLen; i++) {
   var divPlace = document.createElement('div');
   divPlace.innerHTML = data[i][0];
   placeArea.appendChild(divPlace);
  }
  //交通
  if (data[j][1]) {
   var homeArea = document.querySelector('.home');
   var accessSection = document.createElement('section');
   accessSection.classList.add('.home_access');
   homeArea.appendChild(accessSection);

   var h1 = document.createElement('h1');
   h1.classList.add('sectionTitle');
   accessSection.appendChild(h1);

   var span = document.createElement('span');
   span.innerHTML = 'アクセス';
   h1.appendChild(span);

   var trafficArea = document.createElement('ul');
   accessSection.appendChild(trafficArea);
   for (j; j < dataLen; j++) {
    var divTraffic = document.createElement('li');
    divTraffic.innerHTML = data[j][1];
    trafficArea.appendChild(divTraffic);
   }
  }
 });
 //注意
 csvToArray('common/data/caution.csv', function (data) {
   var dataLen = data.length;
   if (dataLen - 1 > 0) {
    var cautionArea = document.createElement('section');
    document.querySelector('.home').appendChild(cautionArea);
    var h1Area = document.createElement('h1');
    var span = document.createElement('span');
    span.innerHTML = "ご注意";
    h1Area.appendChild(span);
    h1Area.classList.add('home-caution', 'sectionTitle');
    cautionArea.appendChild(h1Area);
    var cautionUl = document.createElement('ul');
    cautionArea.appendChild(cautionUl);
    var i = 1;
    for (i; i < dataLen; i++) {
     var cautionLi = document.createElement('li');
     cautionLi.innerHTML = data[i];
     cautionUl.appendChild(cautionLi);
    }
   }
  })
  //イベントお知らせ
 csvToArray('common/data/eventinfo.csv', function (data) {
  var dataLen = data.length;
  var eventInfoArea = document.querySelector('.event_info');
  if (data[1][0]) {
   for (var i = 1; i < dataLen; i++) {
    for (var j = 0; j < data[i].length; j++) {
     var div = document.createElement('div');
     if (j > 0) {
      div.classList.add('event_day');
     }
     div.innerHTML = data[i][j];
     eventInfoArea.appendChild(div);
    }
   }
  }
 });
 //イベントスケジュール
 //イベントセクションにevent-scheduleを作る
 var eventArea = document.querySelector('.event');
 var eventSection = document.createElement('section');
 eventSection.classList.add('event_schedule');
 eventArea.appendChild(eventSection);
 //タブを作る
 var eventUl = document.createElement('ul');
 eventUl.classList.add('nav', 'nav-tabs');
 eventSection.appendChild(eventUl);
 var tabParentDiv = document.createElement('div');
 tabParentDiv.classList.add('tab-content');
 eventSection.appendChild(tabParentDiv);
 //イベントデータを読み込む
 /*
  for (var k = 1; k < 3; k++) {
   var eventUrl = 'common/data/event-' + k + '.csv';
  }
   var _k = 0;
   */

 csvToArray('common/data/event-1.csv', function (data) {
  if (data) {
   var k = 1;
   createEventTable(data, k);
  }
 });


 csvToArray('common/data/event-2.csv', function (data) {
  if (data) {
   var k = 2;
   createEventTable(data, k);
  }
 });


 function createEventTable(data, k) {
  var _k = k;
  var tabNum = '#tab' + _k;
  var tabId = 'tab' + _k;
  var tableId = 'event-table' + _k;
  //タブのデータを入れる
  var h1A = document.createElement('a');
  h1A.setAttribute('data-toggle', 'tab');
  h1A.setAttribute('href', tabNum);
  var aText = document.createTextNode(data[0][0]);
  var li = document.createElement('li');
  if (_k == 1) {
   li.classList.add('active', 'tab1');
  } else if (_k == 2) {
   li.classList.add('tab2');
  } else {
   li.classList.add('tab3');
  }
  h1A.appendChild(aText);
  li.appendChild(h1A);
  eventUl.appendChild(li);
  var tabDiv = document.createElement('div');
  tabDiv.id = tabId;
  tabDiv.classList.add('tab-pane', 'fade');
  if (_k == 1) {
   tabDiv.classList.add('in', 'active');
  }
  tabParentDiv.appendChild(tabDiv);
  //テーブルを作る
  var table = document.createElement('table');
  table.id = tableId;
  tabDiv.appendChild(table);
  //1行目
  var trTitle = document.createElement('tr');
  var thTime = document.createElement('th');
  thTime.innerHTML = '時間';
  thTime.classList.add('st-head-row');
  table.appendChild(trTitle);
  trTitle.appendChild(thTime);
  //1行目2列以降をまわす
  (function () {
   for (var j = 1; j < data[0].length; j++) {
    var th = document.createElement('th');
    th.innerHTML = data[0][j];
    trTitle.appendChild(th);
   }
  }());
  //2行目以降をまわす
  for (var i = 1; i < data.length; i++) {
   var _i, tr;

   //  var dataILen = data[i].length;
   if (data[i][0]) {
    tr = document.createElement('tr');
    table.appendChild(tr);
   }
   //列をまわす
   for (var j = 0; j < data[i].length; j++) {
    var m = 0;
    //時間が入っていたらtdを作り、クラスをつける
    if (data[i][0]) {
     var eventClass = 'event' + _k + i + j;
     var className = '.' + eventClass;
     _i = i;
     var td = document.createElement('td');
     td.classList.add(eventClass);
     td.innerHTML = data[i][j];
     tr.appendChild(td);

     //時間が入っていなくてデータがURLじゃなかったらdivを作り、上のtdに追加
    } else if (!data[i][0] && data[i][j] && data[i][j].indexOf('http')) {
     var targetI;
     var div = document.createElement('div');
     div.innerHTML = data[i][j];

     if (i - _i == 1) {
      targetI = i - 1; //1行上
     } else {
      var num = i - _i;
      targetI = i - num;
     }
     var targetClass = '.event' + _k + targetI + j;
     //  var className = '.' + targetClass;
     //      var memberClass = 'member-' + targetClass;
     //     div.classList.add(memberClass);
     var parentTd = document.querySelector(targetClass);
     parentTd.appendChild(div);

     //データがURLだったらaを作る
    } else if (!data[i][0] && data[i][j].match(/http/)) {
     var targetTdI;
     var a = document.createElement('a');
     a.href = data[i][j];
     a.setAttribute('target', '_blank');
     if (i - _i == 2) {
      targetTdI = i - 2; //1行上
     } else {
      var _num = i - _i;
      targetTdI = i - _num;
     }
     //   var targetTdI = i - 2;
     var targetElClass = '.event' + _k + targetTdI + j;
     var targetTd = document.querySelector(targetElClass)
     var targetEl = targetTd.lastChild;
     a.appendChild(targetEl);
     targetTd.appendChild(a);
    }
   }
  }
 }
 //主催・後援・協力・協賛
 csvToArray('common/data/sponsors.csv', function (data) {
  var i = 0;
  var dataLen = data.length;
  var sponsors = document.querySelector('.sponsors');
  //主催
  createSection(data[1][0], 'sponsors_organizer', '主催', sponsors);
  //連絡先
  var contact = sponsors.children[0];
  createDiv(data[1][1], contact);
  //後援
  createSection(data[1][2], 'sponsors_support', '後援', sponsors);
  //協力
  createSection(data[1][3], 'sponsors_cooperation', '協力', sponsors);
  //協賛
  createSection(data[1][4], 'sponsors_sponsorship', '協賛', sponsors);

  //フッター
  var footer = document.querySelector('footer');
  createDiv(data[1][0], footer);
 });

 //イベントの日時
 csvToArray('common/data/date.csv', function (data) {
  var dataLen = data.length;
  var i = 1; //1行目を除く
  var dateArea = document.querySelector('.home_date');
  var div = document.createElement('div');
  div.classList.add('home_eventInfo');
  dateArea.appendChild(div);
  for (i; i < dataLen; i++) {

   var ul = document.createElement('ul');
   div.appendChild(ul);

   var j = 0;
   var dataILen = data[i].length;
   for (j; j < dataILen; j++) {
    var li = document.createElement('li');
    li.innerHTML = data[i][j];
    if (j === 0) {
     li.classList.add('home_eventDay');
    } else {
     li.classList.add('home_eventTime');
    }
    ul.appendChild(li);
   }
  }
  /*
  for (i; i < dataLen; i++) {
   var divRow = document.createElement('div');
   divRow.classList.add('row');
   dateArea.appendChild(divRow);
   //日にち
   var divDay = document.createElement('div');
   divDay.innerHTML = data[i][0];
   divDay.classList.add('home_eventDay', 'col-md-3');
   divRow.appendChild(divDay);
   //時間
   var j = 1;
   var dataILen = data[i].length;
   for (j; j < dataILen; j++) {
    var divTime = document.createElement('div');
    divTime.innerHTML = data[i][j];
    divTime.classList.add('home_eventTime', 'col-md-3');
    divRow.appendChild(divTime);
   }
  }
  */
 });
 // 基本色、サイトタイトル、サイトの説明、メイン画像を設定
 csvToArray('common/data/info.csv', function (data) {
  //bodyに色のクラスを設定
  var colorData = data[1][0];
  switch (colorData) {
  case '赤':
   document.querySelector('body').classList.add('is_red');
   break;
  case 'ピンク':
   document.querySelector('body').classList.add('is_pink');
   break;
  case '黒':
   document.querySelector('body').classList.add('is_black');
   break;
  }

  // タイトル
  var title = document.querySelector('.header_siteTitle');

  title.innerHTML = data[1][1];
  // headのタイトル
  var headTitle = document.createElement('meta');
  headTitle.setAttribute('title', title);
  document.getElementsByTagName('head')[0].appendChild(headTitle);
  // headのdescription
  var descriptionData = data[1][2];
  var description = document.createElement('meta');
  description.setAttribute('description', descriptionData);
  document.getElementsByTagName('head')[0].appendChild(description);
  // メイン画像
  if (data[1][2]) {
   var mainImg = document.createElement('img');
   var imgSrc = data[1][3];
   mainImg.src = imgSrc;
   mainImg.className = "mainImg_img";
   document.querySelector('.mainImg').appendChild(mainImg);
  }
  //雨天時の注意
  if (data[1][4]) {
   var caution = document.createElement('div');
   caution.innerHTML = data[1][4];
   caution.classList.add('home_eventTime_caution');
   document.querySelector('.home_date').appendChild(caution);
  }
 });

 //関数　CSVを配列に
 function csvToArray(filename, cb) {
  $.get(filename, function (csvdata, status) {
   var ret = [];
   if (status == 'success') {
    csvdata = csvdata.replace(/\r/gm, "");
    var line = csvdata.split("\n");

    var i = 0;
    for (var i in line) {
     //空行はスルーする。
     if (line[i].length == 0) continue;
     var row = line[i].split(",");
     ret.push(row);
    }
   }
   cb(ret);
  });
 }
 //関数　セクションとh1とdivを作る
 function createSection(data, className, contentName, parent) {
  if (data) {
   var area = document.createElement('section');
   area.classList.add(className);
   var h1 = document.createElement('h1');
   var span = document.createElement('span');
   span.innerHTML = contentName;
   h1.classList.add('sectionTitle');
   var dataDiv = document.createElement('div');
   dataDiv.innerHTML = data;
   parent.appendChild(area);
   area.appendChild(h1);
   h1.appendChild(span);
   area.appendChild(dataDiv);
  }
 }
 //関数　divを作る
 function createDiv(data, parent) {
  if (data) {
   var div = document.createElement('div');
   div.innerHTML = data;
   parent.appendChild(div);
  }
 }

}());
