var sw = window.innerWidth - $(window).width();
var ww = $(window).innerWidth();
var wh = $(window).innerHeight();
var sct = $(window).scrollTop();
var hs = location.hash;
var agent = window.navigator.userAgent.toLowerCase();

var moSrc = $(window).scrollTop();
var fx = window.innerHeight;


// loading
$(window).on('load', function(){
	setTimeout(function(){
		$('.loading2').addClass('is-active');
		setTimeout(function(){
			$('.loadingWrap').fadeOut(500);
		},800);
	},500);
});

$(function(){

	// エージェント判定：ipadの時は左のタイトルリストを表示しない
	if ((agent.indexOf('ipad') > -1 || agent.indexOf('macintosh') > -1 && 'ontouchend' in document)){
		$('.yWorks__titleListsWrap').css({'opacity':0});
	}


	// 各作品サムネイルホバー時の動作
	$(".yWorksLists > li a").hover(

		// マウスカーソルが重なった時の処理
		function() {
			// 背景のフェード
			$(".subBgimgListsWrap").addClass('is-fade');

			// 背景画像
			var bgURL = $(this).data('visual'); // urlを取得
			$(".subBgimg").attr('style','background-image:url(' + bgURL + ')');

			// 左ナビゲーションのアクティブ処理
			var itemSlug = $(this).data('slug');
			var $titleItemClass = $(".yWorks__titleLists li.l-" + itemSlug);
			$titleItemClass.addClass('is-active');
			$titleItemClass.find('.yWorks__titleLists--num span').fadeOut(500);
			$titleItemClass.find('.yWorks__titleLists--date').slideDown(500);
		},
		
		// マウスカーソルが離れた時の処理
		function() {
			$(".subBgimgListsWrap").removeClass('is-fade'); // 背景のフェード

			// 左ナビゲーションのアクティブ処理
			var $titleItem = $(".yWorks__titleLists li");
			$titleItem.removeClass('is-active');
			$titleItem.find('.yWorks__titleLists--num span').fadeIn(500);
			$titleItem.find('.yWorks__titleLists--date').hide();
		}
	);

	// 作品タイトルのナンバー出力
	$(".yWorks__headLists > li").each(function() {
		var headItem = $(this).find("li")
		var headItemLen = headItem.length;

		headItem.each(function(i){

			// ナンバーの出力：10番目以降の分岐
			if(9 >= headItemLen) {
				$(this).find('.yWorks__titleLists--num span').text('0' + headItemLen);
			} else {
				$(this).find('.yWorks__titleLists--num span').text(headItemLen);
			}

			headItemLen = headItemLen - 1;
		});

	});


	/*-----------------------------------------------
	 * Works detail
	-------------------------------------------------*/

	//詳細情報取得
	var nextslug,prevslug;
	function getDetail(element){
		let indexCurrent = items.findIndex(({
			slug
		}) => slug === element);
		let arrayLength = items.length;
		let indexBefore = indexCurrent - 1;
		let indexAfter = indexCurrent + 1;

		let item3 = new Array(undefined,undefined,undefined);
		if(indexBefore >= 0){
			item3[0] = items[indexBefore];
		}else{
			item3[0] = items[arrayLength-1];
		}
		item3[1] = items[indexCurrent];
		if(indexAfter < arrayLength){
			item3[2] = items[indexAfter];
		}else{
			item3[2] = items[0];
		}
		console.log(item3);
		//title
		$(".worksDetail__title__in").html('');
		$(".worksDetail__title__in").html(item3[1]['title']);

		//date
		$(".worksDetail__date__in").text('');
		var datetext = '';
		if(item3[1]['distribution']){datetext = datetext + item3[1]['distribution'] + ' / ';}
		if(item3[1]['release_date'] == '2038'){
			datetext = datetext + 'COMING SOON';
		}else{
			datetext = datetext + item3[1]['release_date'];
		}
		if(item3[1]['end_date']){
			datetext = datetext + ' - ' +item3[1]['end_date'];
		}
		$(".worksDetail__date__in").text(datetext);

		//visual
		$(".worksDetail__vslists,.worksDetail__vsNavLists").html('');
		$.each(item3[1]['kv'],function(i,v){
			$(".worksDetail__vslists").append('<li class="swiper-slide"><img src="'+v['thumb']+'" alt=""></li>');
			$(".worksDetail__vsNavLists").append('<li><a href="javascript:;"><span>'+v['name']+'</span></a></li>');
		});

		//staff
		$(".wsi--staff .worksDetail__scLists__nameLists").html('');
		if(item3[1]['staff']){
			$(".wsi--staff").show();
			$.each(item3[1]['staff'],function(i,v){
				var vname = '';
				if(v['position']){vname = v['position']+'：';}
				if(v['name']){vname = vname + v['name'];}
				$(".wsi--staff .worksDetail__scLists__nameLists").append('<li>'+vname+'</li>');
			});
		}else{
			$(".wsi--staff").hide();
		}
		//cast
		$(".wsi--cast .worksDetail__scLists__nameLists").html('');
		if(item3[1]['cast']){
			$(".wsi--cast").show();
			$.each(item3[1]['cast'],function(i,v){
				var vcast = '';
				if(v['position']){vcast = v['position']+'：';}
				if(v['name']){vcast = vcast + v['name'];}
				$(".wsi--cast .worksDetail__scLists__nameLists").append('<li>'+vcast+'</li>');
			});
		}else{
			$(".wsi--cast").hide();
		}
		//movie
		$(".worksDetail__movieLists").html('');
		if(item3[1]['yt']){
			$(".worksDetail__movieWrap").show();
			$.each(item3[1]['yt'],function(i,v){
				$(".worksDetail__movieLists").append('<li class="swiper-slide"><a href="javascript:;" class="js-cur-link2" data-ytid="'+v['ytid']+'"><div class="worksDetail__movieLists__thumb"></div></a></li>')
			})
		}else{
			$(".worksDetail__movieWrap").hide();
		}
		//website
		$(".ows a").attr('href','');
		if(item3[1]['url']){
			$(".ows").show();
			$(".ows a").attr('href',item3[1]['url']);
		}else{
			$(".ows").hide();
		}
		//twitter
		$(".owt a").attr('href','');
		if(item3[1]['twitter']){
			$(".owt").show();
			$(".owt a").attr('href','https://twitter.com/'+item3[1]['twitter']);
		}else{
			$(".owt").hide();
		}
		//copyright
		$(".worksDetail__copyRight").text('');
		if(item3[1]['copyright']){
			$(".worksDetail__copyRight").show();
			$(".worksDetail__copyRight").text(item3[1]['copyright']);
		}else{
			$(".worksDetail__copyRight").hide();
		}
		//next
		//$(".worksDetail__nextVsWrap .worksDetail__outVs").css({'background-image':''});
		$(".worksDetail__nextVsWrap .worksDetail__outVsWrap img").attr('src','');
		if(typeof item3[2]['kv']['kv_1']['thumb'] != undefined){
			//$(".worksDetail__nextVsWrap .worksDetail__outVs").css({'background-image':'url('+item3[2]['kv']['kv_1']['thumb']+')'});
			$(".worksDetail__nextVsWrap .worksDetail__outVsWrap img").attr('src',item3[2]['kv']['kv_1']['thumb']);
		}
		nextslug = item3[2]['slug'];
		//prev
		//$(".worksDetail__prevVsWrap .worksDetail__outVs").css({'background-image':''});
		$(".worksDetail__prevVsWrap .worksDetail__outVsWrap img").attr('src','');
		if(typeof item3[0]['kv']['kv_1']['thumb'] != undefined){
			//$(".worksDetail__prevVsWrap .worksDetail__outVs").css({'background-image':'url('+item3[0]['kv']['kv_1']['thumb']+')'});
			$(".worksDetail__prevVsWrap .worksDetail__outVsWrap img").attr('src',item3[0]['kv']['kv_1']['thumb']);
		}
		prevslug = item3[0]['slug'];
		//$(".oneModal").fadeIn(500);
	}

	// Swiper：動画リスト
	var ytSwiper = new Swiper ('.worksDetail__movieListsWrap', {
		autoHeight: false,
		slidesPerView: "auto",
		spaceBetween: 0,
		speed: 1000,
		breakpoints: {
			1024: {
				slidesPerView: 3,
				spaceBetween: 10,
			},
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	// Swiper：ビジュアル
	var vsSwiper = new Swiper ('.worksDetail__vslistsWrap', {
		autoHeight: false,
		slidesPerView: "auto",
		spaceBetween: 0,
		speed: 1000,
	});
	vsSwiper.on('slideChange', function () {
		var i = vsSwiper.activeIndex;
		$(".worksDetail__vsNavLists li a").removeClass('is-active');
		$(".vs-" + i).find('a').addClass('is-active');
	});

	// 詳細表示後の各処理
	function detailTrigger() {

		// youtube：サムネイル取得
		$(".worksDetail__movieLists li").each(function(){
			var ytID = $(this).find('a').data('ytid');
			var elem = $(this).find('.worksDetail__movieLists__thumb');
			elem.css({"background-image":"url(https://i.ytimg.com/vi/"+ ytID +"/hqdefault.jpg)"});
		});

		// youtube：動画再生
		$(".worksDetail__movieLists li a").on('click', function() {
			var ytID = $(this).data("ytid");
			var ytURL = 'https://www.youtube.com/embed/'+ytID+'?autoplay=1&rel=0';

			$(".worksDeitalYoutubeWrap").fadeIn(500);
			setTimeout(function(){
				$(".worksDeitalYoutube__iframe").attr("src",ytURL);
			},100);
		});

		// カーソル
		$(".js-cur-link2").on({
			"mouseenter": function() {
				$(".cursor").addClass('on-link2');
			},
			"mouseleave": function() {
				$(".cursor").removeClass('on-link2');
			}
		});

		// ビジュアルナビゲーションのクリックイベント
		$(".worksDetail__vsNavLists li a").on('click', function(){
			$(".worksDetail__vsNavLists li a").removeClass('is-active');
			var vsNumClass = $(this).parents('li').attr('class');
			var vsNum = vsNumClass.slice(3); // "vs-"を削除
			vsSwiper.slideTo(vsNum);
		});

		// オフィシャルリンクの処理
		var ofItem = $(".worksDetail__linkLists li").length;
		if(ofItem <= 1) {
			$(".worksDetail__linkLists").removeClass('is-active');
		} else {
			$(".worksDetail__linkLists").addClass('is-active');
		}

		// キービジュアルナビの連番クラス付与（swiper連動用）
		var i = 0;
		$(".worksDetail__vsNavLists li").each(function() {
			$(this).addClass('vs-'+ (i++));
		});

		// 初期アクティブ
		$(".worksDetail__vsNavLists li:first-child a").addClass('is-active');

		// 表示アニメーション
		setTimeout(function(){
			$('.worksDetail').addClass('is-active');
			setTimeout(function(){
				$(".aniType-worksCont").addClass('is-active');
			},300);
		},300);

	}


	// モーダル表示処理
	function worksDetailModalOpen() {
		// is-active処理
		$('.worksDetailModalWrap, .worksDetailModalbg, .js-worksModalPagination').addClass('is-active');

		$('#fullWrap').addClass('is-fixed').css({'margin-right':sw+'px','overflow':'hidden'}); // 全体のスクロールを止める
		$('.header__nav').css({'margin-right':sw+'px'}); // スクロールバー幅を調整 
		$(".worksDetail__scLists__mScrollWrap").mCustomScrollbar(); // mCustomScrollbar
		$(".worksDetailModal").scrollTop(0); // スクロールトップ

	}

	// 作品サムネイルのクリックイベント
	$(".js-worksDetailOpen").on('click',function(){
		moSrc = $(window).scrollTop();
		fx = window.innerHeight;
		document.documentElement.style.setProperty('--fx', `${fx}px`);

		worksDetailModalOpen();
		let element = $(this).data('slug'); // エレメント取得
		history.pushState('','','./');
		history.replaceState('','','#'+element);
		getDetail(element); // Detail取得
		detailTrigger(); // その他処理
		setTimeout(function(){
			ytSwiper.update();
			vsSwiper.update();
			ytSwiper.slideTo(0, 0, false);
			vsSwiper.slideTo(0, 0, false);
			visualControl(); // キービジュアルの処理
			window.addEventListener('popstate', function(e) {
				history.replaceState('','','./');
				worksDetailModalClose();
			});
		},10);

	});

	// ハッシュ有
	if(hs) {
		worksDetailModalOpen();

		var hsslug = hs.slice(1);
		getDetail(hsslug); // Detail取得
		detailTrigger(); // その他処理
		setTimeout(function(){
			ytSwiper.update();
			vsSwiper.update();
			ytSwiper.slideTo(0, 0, false);
			vsSwiper.slideTo(0, 0, false);
			visualControl(); // キービジュアルの処理
		},10);
	}


	/**
	 * Close処理
	 */
	function worksDetailModalClose() {
		if(hs){
			location.href = '../';
		}else{
			history.replaceState('','','./');
			$('.worksDetail, .js-worksModalPagination').removeClass('is-active'); // 中身を非表示（アニメーション）0.4s

			setTimeout(function(){
				$('.worksDetailModalWrap, .worksDetailModalbg, .aniType-worksCont').removeClass('is-active');
				$("body,html").animate({scrollTop:moSrc},10);
				$('#fullWrap').removeClass('is-fixed').css({'margin-right':'','overflow':''}); // 全体のスクロール非表示
				$('.header__nav').css({'margin-right':''}); // スクロールバー幅を調整
			},400);
		}
	}

	// closeクリックイベント
	$('.js-workseDetailModalClose').on('click', function(){
		worksDetailModalClose();
	});

	// エリア外close
	$('.worksDetailModal__inner').on('click touchend', function(e) {
		if (!$(e.target).closest('.worksDetail__inner, .worksDetail__nextVsWrap, .worksDetail__prevVsWrap, .worksDetail__copyRightWrap').length) {
			worksDetailModalClose();
		}
	});


	/**
	 * 動画Close処理
	 */
	function worksDetailYoutubeClose() {
		$(".worksDeitalYoutubeWrap").fadeOut(500);
		setTimeout(function(){
			$(".worksDeitalYoutube__iframe").attr('src','');
		},500);
	}
	$(".js-w-youtubeClose").on('click', function(){
		worksDetailYoutubeClose();
	});

	// エリア外close
	$('.worksDeitalYoutube').on('click touchend', function(e) {
		if (!$(e.target).closest('.worksDeitalYoutube__iframeWrap').length) {
			worksDetailYoutubeClose();
		}
	});


	/**
	 * DETAIL前後のナビゲーションイベント
	 */
	// モーダル中身を隠す
	function worksModalTop() {
		$(".worksDetailModal").animate({scrollTop:0}, 800, 'easeInOutQuint');
		$('.worksDetail, .aniType-worksCont').removeClass('is-active');
	}

	// prev
	$('.js-w-prev').on('click',function(){
		worksModalTop();

		setTimeout(function() {
			getDetail(prevslug);
			detailTrigger(); // その他処理
			setTimeout(function(){
				ytSwiper.update();
				vsSwiper.update();
				ytSwiper.slideTo(0, 0, false);
				vsSwiper.slideTo(0, 0, false);
				visualControl(); // キービジュアルの処理
			},10);
		},400);
	});

	// next
	$('.js-w-next').on('click',function(){
		worksModalTop();

		setTimeout(function() {
			getDetail(nextslug);
			detailTrigger(); // その他処理
			setTimeout(function(){
				ytSwiper.update();
				vsSwiper.update();
				ytSwiper.slideTo(0, 0, false);
				vsSwiper.slideTo(0, 0, false);
				visualControl(); // キービジュアルの処理
			},10);
		},400);
	});

	// 該当作品キービジュアルのサイズを取得し、各パーツにcssを当てる
	function visualControl() {
		var visualW = $(".worksDetail__vsWrap").width();
		var visualH = $(".worksDetail__vsWrap").height();
		var visualD = visualW / 3;

		$(".worksDetail__nextVsWrap, .worksDetail__prevVsWrap").css({
			'width': visualD + 'px',
		});

		$('.worksDetail__outVsWrap').css({
			'width': visualW + 'px',
		});

	}

	// 矢印ホバー時の処理
	$(".js-worksDetail__vslink").hover(
		// マウスカーソルが重なった時の処理
		function() {
			$(this).next('.worksDetail__outVsWrap').addClass('is-active');
		},
		// マウスカーソルが離れた時の処理
		function() {
			$(this).next('.worksDetail__outVsWrap').removeClass('is-active');
		}
	);

	
	/**
	 * 年代ナビゲーションクリック処理
	 */
	$(".wanchor").on('click', function(){
		ww = $(window).innerWidth();
		wh = $(window).innerHeight();

		var speed = 800;
		var href = $(this).attr("href");

		var targetItem = $(href).find('.yWorksLists > li:first-child'); // #hrefセクション内リストの一番最初のアイテム
		var targetItemHeight = targetItem.innerHeight();
		var sh = (wh - targetItemHeight) / 2;

		var target = $(href == "#" || href == "" ? 'html' : href);
		var position;

		if(ww < 1025 && !(href == '#w-coming')) {
			position = target.offset().top - sh;
		} else if (ww < 1025 && href == '#w-coming') {
			position = 0;
		} else {
			position = target.offset().top - 300;
		}

		$('body,html').animate({scrollTop:position}, speed, 'easeInOutQuint');
		return false;
	});

	// mCustomScrollbar
	$(".yWorks__titleListsWrap").mCustomScrollbar();

	// 作品リストの最初に必ず「is-on」クラスを付ける
	$('.yWorks:first-of-type .yWorksLists > li:first-child').addClass('is-on');

	// スケールチェンジ（SP)
	$('.js-worksScaleBtn').on('click', function(){
		$(this).toggleClass('is-active');
		$('.yWorksWrap, .footer, .yWorks__head__in').css({'opacity':0});

		wh = $(window).innerHeight();
		var speed = 800;
		var yItemID;

		if($('.yWorksLists > li.is-on')[0]) {

			yItemID = '#' + $('.yWorksLists > li.is-on').attr('id');

			setTimeout(function(){
				$('.yWorksWrap').toggleClass('is-scale');
				setTimeout(function(){

					var yListItemOT = $(yItemID).offset().top;
					var yListItemHeight = $(yItemID).innerHeight();
					var sh = (wh - yListItemHeight) / 2;
					var yListItemPos = yListItemOT - sh;

					if(sct == 0) {
						$('body,html').animate({scrollTop:0}, speed, 'easeInOutQuint');
					} else {
						$('body,html').animate({scrollTop:yListItemPos}, speed, 'easeInOutQuint');
					}

					// 再読み込み
					targetContents();
					currentCheck();

					setTimeout(function(){
						$('.yWorksWrap, .footer, .yWorks__head__in').css({'opacity':1});
					}, speed);

				}, 100);
			}, 400);

		} else {

			yItemID = $('.yWorks__headLists > li.is-active .yWorks__title__nav__btn.is-prev a').attr('href');

			setTimeout(function(){
				$('.yWorksWrap').toggleClass('is-scale');
				setTimeout(function(){

					var yListItemOT = $(yItemID).find('.yWorksLists > li:first-child').offset().top;
					var yListItemHeight = $(yItemID).find('.yWorksLists > li:first-child').innerHeight();
					var sh = (wh - yListItemHeight) / 2;
					var yListItemPos = yListItemOT - sh;

					if(sct == 0) {
						$('body,html').animate({scrollTop:0}, speed, 'easeInOutQuint');
					} else {
						$('body,html').animate({scrollTop:yListItemPos}, speed, 'easeInOutQuint');
					}

					// 再読み込み
					targetContents();
					currentCheck();

					setTimeout(function(){
						$('.yWorksWrap, .footer, .yWorks__head__in').css({'opacity':1});
					}, speed);

				}, 100);
			}, 400);

		}

	});


	/**
	 * 共通イベント
	 */
	// リサイズ スクロール
	function resizescrollHandle() {

		// 共通変数
		sct = $(window).scrollTop();
		ww = $(window).innerWidth();
		wh = $(window).innerHeight();

		var hh = $(".header").innerHeight();
		var yearItemHeight = $('.yWorks__head__in').innerHeight();
		var whhSpace = wh - hh;
		var yearSpace = (whhSpace - yearItemHeight) / 2;

		// スクロール最終地の処理
		var footOT = $(".footer").offset().top;
		var finishPos = footOT - wh;

		if(sct > finishPos) {
			$(".yWorks__head").addClass('is-off');
		} else {
			$(".yWorks__head").removeClass('is-off');
		}

		if(ww < 1025) {
			finishPos = footOT - wh + yearSpace;
		}

		if(sct > finishPos) {
			$(".yWorks__head__in").addClass('is-end');
		} else {
			$(".yWorks__head__in").removeClass('is-end');
		}

		// 各worksアイテム位置(sp)
		$(".yWorksLists > li").each(function() {
			var itemOT = $(this).offset().top;
			var worksItem = $('.yWorksLists li').eq(0).innerHeight();
			var acPos = itemOT - (wh / 2);

			if(sct > acPos && sct < acPos + worksItem ){
				$(this).addClass('is-on');
			} else {
				$(this).removeClass('is-on');
			}
		});

	}

	/**
	 * function trigger
	 */
	$(window).on('load resize', function() {
		visualControl();
	});
	$(window).on('load resize scroll', function() {
		resizescrollHandle();
	});

});

// リサイズ
function resizeHandle() {

	// 共通変数
	ww = $(window).innerWidth();
	wh = $(window).innerHeight();

	// タイトルリストの高さ取得（pc）
	var titleH = $(".yWorks__title").outerHeight(true);
	var titileT = 300; // top:300px;の箇所
	var titleListH = wh - (titleH + titileT);
	$(".yWorks__titleListsWrap").css({'height': titleListH + 'px'});

	//　タイトルラップの高さ取得（pc）
	var listItemH = $('.yWorks__headLists > li').innerHeight();
	$(".yWorks__head__in").css({'height': listItemH + 'px'});

}
$(window).on('load resize', resizeHandle);


/*-----------------------------------------------
 * 年代ナビゲーションの処理
-------------------------------------------------*/
$(".wYearsNavLists li:first-child a, .yWorks__headLists > li:first-child").addClass('is-active'); // 初期アクティブ
var navLink = $(".wYearsNavLists li a");
var headerH = ($(".header").innerHeight()) + 10; // ヘッダーの高さ取得
var contentsArr = new Array();

// 各コンテンツの高さと位置
function targetContents() {
	ww = $(window).innerWidth();

	for (var i = 0; i < navLink.length; i++) {
		var targetContents = navLink.eq(i).attr('href'); // 要素IDを取得
		var whh = wh / 2;
		var targetContentsTop = $(targetContents).offset().top - whh;
		var targetContentsH = ($(targetContents).innerHeight()) / 4;

		var targetContentsBottom = targetContentsTop + $(targetContents).outerHeight(true) - 1;
		contentsArr[i] = [targetContentsTop, targetContentsBottom] // 配列に格納
	};
}
$(window).on('load resize', targetContents);

// 現在地をチェック
function currentCheck() {
	sct = $(window).scrollTop();
	wh = $(window).innerHeight();
	var hh = $(".header").innerHeight();

	for (var i = 0; i < contentsArr.length; i++) {
		// 現在のスクロール位置が、配列に格納した開始位置と終了位置の間にあるものを調べる
		if(contentsArr[i][0] <= sct && contentsArr[i][1] >= sct) {
			navLink.removeClass('is-active');
			$(".yWorks__headLists > li").removeClass('is-active');
			navLink.eq(i).addClass('is-active');
			$(".yWorks__headLists > li").eq(i).addClass('is-active');
			i == contentsArr.length;
		}
	};
}
$(window).on('load resize scroll', currentCheck);