(function () {
	"use strict";

	/*-----smaoothScrollの設定-----*/
	smoothScroll.init({
		speed: 800,
		updateURL: false,
		easing: 'easeOutQuad'
	});

	/*-----twitterButton設定-----*/
	function leftButton() {
		var windowH = window.innerHeight || document.documentElement.clientHeight;

		var twitterButton = document.querySelector('.twitter-button');

		twitterButton.style.top = windowH - 90 + 'px';
	}
	$(window).on('load resize orientationchange', function () {
		leftButton();
	});
	/*-----mmenu設定-----*/
	$("#leftSlidebar").mmenu({
		slidingSubmenus: false,
		offCanvas: {
			position: 'left',
			zposition: 'front'
		}
	});

	/*--twitterウィジェット--*/
	/*
		$.ajax({
			url: 'data/info.txt',
			timeout: 1000,
			success: function (data) {
				console.log(data)
				if (data.length === 0) {
					$('.twitter-button').css({
						'display': 'none'
					})
				} else {

					$('.mm-panels').html = data;
				}
			},
			error: function () {
				alert("「お知らせ」の取得に失敗しました");
			}
		});

	*/

	/*-----注意案内の作成-----*/
	//注意文の読み込み
	/*
	$.ajax({
		url: 'data/info.txt',
		timeout: 1000,
		success: function (data) {
			console.log(data)
			if (data.length === 0) {
				$('.fixInfo').css({
					'display': 'none'
				})
			} else {
				$('.fixInfo').append(data);
				fixInfo();
			}
		},
		error: function () {
			alert("「お知らせ」の取得に失敗しました");
		}
	});

	$(window).on('load resize orientationchange', function () {
		fixInfo();
	});

	$(window).on('scroll', function () {
		scrollInfo();
	});

	var firstH = 300;
	var fixH = 140;
	var fixContent = document.querySelector('.fixInfo');
	var windowH = window.innerHeight || document.documentElement.clientHeight;
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	fixContent.style.height = firstH + 'px';
	fixContent.style.top = windowH - firstH + 'px';
	document.querySelector('body').style.paddingBottom = fixH - 70 + 'px';

	function fixInfo() {
		$('.fixInfo').animate({
			height: fixH,
			top: windowH + scrollTop + 70 - fixH + 'px'
		}, 3000, 'easeInQuart');
	}

	function scrollInfo() {
		fixContent.style.top = windowH + scrollTop + 70 - fixH + 'px';
	}
/*
	/*-----headerの縮小-----*/
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

	/*-----基本設定-----*/
	//イベントの日時
	csvToArray('data/date.csv', function (data) {
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
	});

	// 基本色、サイトタイトル、サイトの説明、メイン画像を設定
	csvToArray('data/info.csv', function (data) {
		//bodyに色のクラスを設定 _theme.scssで設定
		var colorData = data[1][0];
		switch (colorData) {
			case '赤':
				document.querySelector('body').classList.add('is_red');
				break;
			case 'ピンク':
				document.querySelector('body').classList.add('is_pinkGreen');
				break;
			case 'ピンク2':
				document.querySelector('body').classList.add('is_pinkPink');
				break;
			case '黒':
				document.querySelector('body').classList.add('is_black');
				break;
			case '黄色':
				document.querySelector('body').classList.add('is_yellow');
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

			mainImg.src = data[1][3];
			mainImg.className = "mainImg_img";
			document.querySelector('.mainImg').appendChild(mainImg);

			var image = new Image();
			image.src = data[1][3];

			image.onload = function () {
				var width = image.width;
				var height = image.height;
				var windowW = window.innerWidth || document.documentElement.clientWidth;
				if (width < height && windowW > 768) {
					var imgClass = document.querySelector('.mainImg_img');
					imgClass.style.width = '60%';
					imgClass.style.marginLeft = '20%';
				}
			};
		}

		//雨天時の注意
		if (data[1][4]) {
			var caution = document.createElement('div');
			caution.innerHTML = data[1][4];
			caution.classList.add('home_eventTime_caution');
			document.querySelector('.home_date').appendChild(caution);
		}
	});

	/*-----イベントスケジュールの作成-----*/
	//アクセス
	csvToArray('data/access.csv', function (data) {
		//場所
		var accessArea = document.querySelector('.home_place');
		var dataLen = data.length;
		var i = 1; //1行目を除く
		var j = 1; //1列目を除く
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
	csvToArray('data/caution.csv', function (data) {
		var dataLen = data.length;
		if (dataLen - 1 > 0) {
			var cautionArea = document.createElement('section');
			document.querySelector('.home').appendChild(cautionArea);
			var h1Area = document.createElement('h1');
			var span = document.createElement('span');
			span.innerHTML = "ご注意";
			h1Area.appendChild(span);
			h1Area.classList.add('home-caution');
			h1Area.classList.add('sectionTitle');
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
	//イベントのお知らせ
	csvToArray('data/event-info.csv', function (data) {
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
	eventUl.classList.add('nav');
	eventUl.classList.add('nav-tabs');
	eventSection.appendChild(eventUl);
	var tabParentDiv = document.createElement('div');
	tabParentDiv.classList.add('tab-content');
	eventSection.appendChild(tabParentDiv);
	//イベントデータを読み込む

	csvToArray('data/event-1.csv', function (data) {
		var k = 1;
		if (data[0][0]) {
			createEventTable(data, k);
			createSmallerTable(k);
		}
	});

	csvToArray('data/event-2.csv', function (data) {
		var k = 2;
		if (data[0][0]) {
			createEventTable(data, k);
			createSmallerTable(k);
		}
	});

	//主催・後援・協力・協賛
	csvToArray('data/sponsors.csv', function (data) {
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

	//セクションとh1とdivを作る
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
	//divを作る
	function createDiv(data, parent) {
		if (data) {
			var div = document.createElement('div');
			div.innerHTML = data;
			parent.appendChild(div);
		}
	}
	//イベントスケジュールのテーブルを作る
	function createEventTable(data, k) {
		//タブを作る
		var tabNum = '#tab' + k;
		var tabId = 'tab' + k;
		var tableId = 'event-table' + k;

		//タブのデータを入れる
		var h1A = document.createElement('a');
		h1A.setAttribute('data-toggle', 'tab');
		h1A.setAttribute('href', tabNum);
		var aText = document.createTextNode(data[0][0]);
		var li = document.createElement('li');
		if (k == 1) {
			li.classList.add('active');
			li.classList.add('tab1');
		} else if (k == 2) {
			li.classList.add('tab2');
		}
		h1A.appendChild(aText);
		li.appendChild(h1A);
		eventUl.appendChild(li);
		var tabDiv = document.createElement('div');
		tabDiv.id = tabId;
		tabDiv.classList.add('tab-pane');
		tabDiv.classList.add('fade');
		if (k == 1) {
			tabDiv.classList.add('in');
			tabDiv.classList.add('active');
		}
		tabParentDiv.appendChild(tabDiv);

		//テーブルを作る
		var table = document.createElement('table');
		table.id = tableId;
		table.classList.add('table-large');
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

				//時間が入っていたらtdを作り、クラスをつける
				if (data[i][0]) {
					var eventClass = 'event' + k + i + j;
					var className = '.' + eventClass;
					_i = i;
					var td = document.createElement('td');
					if (data[i][j] == data[i][0]) {
						td.classList.add('eventTime');
					} else {
						td.classList.add(eventClass);
					}
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
					var targetClass = '.event' + k + targetI + j;
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
					var targetElClass = '.event' + k + targetTdI + j;
					var targetTd = document.querySelector(targetElClass);
					var targetEl = targetTd.lastChild;
					a.appendChild(targetEl);
					targetTd.appendChild(a);
				}
			}
		}
	}

	//レスポンシブ用のテーブルを作る
	function createSmallerTable(k) {
		//テーブルを取得
		var tableId = '#event-table' + k;
		var tableObj = document.querySelector(tableId);

		//追加するタブを取得
		var tabId = '#tab' + k;
		var tabArea = document.querySelector(tabId);

		//tableを作成
		var sTable = document.createElement('table');
		sTable.classList.add('table-small');
		tabArea.appendChild(sTable);

		//取得したテーブルのセルを回す
		var rowsLen = tableObj.rows.length;
		var cellsLen = tableObj.rows[0].cells.length;
		for (var i = 1; i < rowsLen; i++) {
			for (var j = 0; j < cellsLen; j++) {
				if (tableObj.rows[i].cells[j].innerHTML) {
					//trを作成
					var tr = document.createElement('tr');
					sTable.appendChild(tr);

					if (tableObj.rows[i].cells[j] == tableObj.rows[i].cells[0]) {
						var th = document.createElement('th');
						th.innerHTML = tableObj.rows[i].cells[0].innerHTML;
						th.setAttribute('colspan', '2');
						th.classList.add('eventTime');
						tr.appendChild(th);
					} else {
						//thを作成
						var _th = document.createElement('th');
						_th.innerHTML = tableObj.rows[0].cells[j].innerHTML;
						tr.appendChild(_th);

						//tdを作成
						var td = document.createElement('td');
						td.innerHTML = tableObj.rows[i].cells[j].innerHTML;
						if (tableObj.rows[i].cells[j] == tableObj.rows[i].cells[0]) {
							td.classList.add('eventTime');
						}
						tr.appendChild(td);
					}
				}
			}
		}
	}
}());

//CSVを配列にする
function csvToArray(filename, cb) {
	$.get(filename, function (csvdata, status) {
		var ret = [];
		if (status == 'success') {
			csvdata = csvdata.replace(/\r/gm, "");
			var line = csvdata.split("\n");

			var i = 0;
			for (i in line) {
				//空行はスルーする。
				if (line[i].length === 0) {
					continue;
				}
				var row = line[i].split(",");
				ret.push(row);
			}
		}
		cb(ret);
	});
}
