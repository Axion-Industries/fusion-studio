// Youtube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 共通変数
var sw = window.innerWidth - $(window).width();
var ww = $(window).innerWidth();
var wh = $(window).innerHeight();
var sct = $(window).scrollTop();
var hs = location.hash;

var moSrc = $(window).scrollTop();
var fx = window.innerHeight;


// スクロールを禁止にする関数
function disableScroll(event) {
	event.preventDefault();
}


// ファーストビューのスクロール処理
var onTop = false;
var onBack = false;
var onTopSw = true;
var onBackSw = true;
var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
$(function(){
	document.addEventListener(mousewheelevent,function(e){
		if(onTop){
			e.preventDefault();
			var delta = e.deltaY ? -(e.deltaY) : e.wheelDelta ? e.wheelDelta : -(e.detail);
			if (delta < 0 && onTopSw){
				$('.top__scroll a').click();
				onTopSw = false;
			}else if(delta > 0 && onTopSw){
				onTopSw = false;
				$('.topContWrap').removeClass('is-fvNone');
				// $('#top').removeClass('is-transitionNone');
				// $('#top, .topContWrap').removeClass('is-fvNone');
				// $('.aniType-title').removeClass('is-active');
				setTimeout(function(){
					$('html,body').stop(true,false).animate({scrollTop:0}, 800, 'easeOutQuint',function(){
						onTopSw = true;
					});
				},160)
			}
		}
	},{passive: false});

});

// hash
$(window).on('load', function(){
	ww = $(window).innerWidth();

	setTimeout(function(){
		$('.loading2').addClass('is-active');
		setTimeout(function(){
			$('.loadingWrap').fadeOut(500);
		},800);
	},500);

	if(hs && $(hs)[0]) {
		$('.topContWrap').addClass('is-fvNone');
		$('body,html').animate({scrollTop:0}, 10, function(){
			var position = $(hs).offset().top + 128;
			// SP
			if(ww < 1025) {
				position = $(hs).offset().top;
			}

			$('body,html').stop(true,false).animate({scrollTop:position}, 800, 'easeInOutQuint',function(){
				onTopSw = true;
				// $('#top').addClass('is-fvNone');
			});
		});
	} else {
		$('body,html').animate({scrollTop:0}, 10);
	}
});

$(function(){

	// Smooth scroll
	$(".nav-anchor").on('click', function(){

		ww = $(window).innerWidth();

		var speed = 800;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top + 128;

		// SP
		if(ww < 1025) {
			position = target.offset().top;

			$(".js-menuBtn").removeClass('is-active');
			document.removeEventListener('touchmove', disableScroll, { passive: false });　//スクロール禁止解除
			$('html, body').css({'overflow':'auto'});
			$(".header").removeClass('is-active');
			setTimeout(function(){
				$(".header__imgLists li").removeClass('is-active');
			},500);
		}

		$('.topContWrap').addClass('is-fvNone');
		$('body,html').stop(true,false).animate({scrollTop:position}, speed, 'easeInOutQuint',function(){
			onTopSw = true;
			// $('#top').addClass('is-transitionNone');
			// $('#top').addClass('is-fvNone');
		});
		return false;
	});

	$('.under-anchor').on('click', function(){
		var speed = 800;
		var href = $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top + 1;

		$('.topContWrap').addClass('is-fvNone');
		$('body,html').stop(true,false).animate({scrollTop:position}, speed, 'easeInOutQuint',function(){
			onTopSw = true;

			// $('#top').addClass('is-transitionNone');
			// $('#top').addClass('is-fvNone');
			// $('body,html').animate({scrollTop:1}, 0);
		});
		return false;
	});


	/*-----------------------------------------------
	 * Youtube
	-------------------------------------------------*/
	var ytID;

	function youtubeDetailGetData(ytID) {
		$.ajax({
			url:"./ytchannel",
			type:"POST",
			dataType:"json",
			timespan:1000
		}).done(function(data) {
			let ytCurrent = data.items.findIndex((items) => items.id.videoId === ytID);
			let ytLength = data.items.length;
			let ytBefore = ytCurrent - 1;
			let ytAfter = ytCurrent + 1;
			if(ytBefore < 0){
				ytBefore = null;
			}
			if(ytAfter >= ytLength) {
				ytAfter = null;
			}

			//NEXT,PREV BTN
			if(ytAfter!==null){
				$(".js-ytNext").css({'opacity':1,'pointer-events':'auto'}).attr('data-yt',data.items[ytAfter]['id']['videoId']);
			}else{
				$(".js-ytNext").css({'opacity':0.35,'pointer-events':'none'});
			}
			if(ytBefore!==null){
				$(".js-ytPrev").css({'opacity':1,'pointer-events':'auto'}).attr('data-yt',data.items[ytBefore]['id']['videoId']);
			}else{
				$(".js-ytPrev").css({'opacity':0.35,'pointer-events':'none'});
			}
			$(".youtubeDetailLists__title span").text(data.items[ytCurrent]['snippet']['title']);
			$(".youtubeDetail__mScrollWrap p").html(data.items[ytCurrent]['snippet']['description']);

			// youtube imageの取得
			var ytimgURL = 'https://img.youtube.com/vi/'+ytID+'/maxresdefault.jpg';
			$('.pcYtLists__thumb').css({'background-image':'url('+ytimgURL+')'});

			// 中身を表示（アニメーション）0.4s
			$('.youtubeDetail').addClass('is-active');

			// アニメーショントリガー
			$(".aniType-ytDetailWrap").addClass('is-active');
		}).fail(function() {
		});
	}

	// youtube詳細のクリックイベント
	$('.js-youtubeDetailOpen').on('click', function(){
		moSrc = $(window).scrollTop();
		fx = window.innerHeight;
		document.documentElement.style.setProperty('--fx', `${fx}px`);

		$('.js-youtubeModalPagination, .youtubeDetailModalWrap, .youtubeDetailModalbg').addClass('is-active'); // is-activeが付くコンテンツ
		$('#fullWrap').addClass('is-fixed').css({'margin-right':sw+'px','overflow':'hidden'}); // 全体のスクロールを止める
		$('.header__nav').css({'margin-right':sw+'px'}); // スクロールバー幅を調整
		$(".youtubeDetail__mScrollWrap").mCustomScrollbar(); // mCustomScrollbar

		ytID = $(this).data('yt');
		history.pushState('','','./');
		history.replaceState('','','#'+ytID);
		window.addEventListener('popstate', function(e) {
			// if(location.hash){
			// 	ytID = location.hash.slice(1);
			// 	$('.header__nav').css({'margin-right':''}); // スクロールバー幅を調整
			// 	$(".aniType-ytDetailWrap").removeClass('is-active'); //中身アニメーション
			// 	$('.js-pcytplayBtn').removeClass('is-active'); //再生ボタン
			// 	$('.js-player2Wrap').html('<div id="player2"></div>'); //youtube
			// 	$(".youtubeDetailLists__title span").text('');
			// 	$(".youtubeDetail__mScrollWrap p").html('');
			// 	$(".js-ytNext,.js-ytPrev").attr('data-yt','');
			// 	youtubeDetailGetData(ytID);
			// }else{
				history.replaceState('','','./');
				youtubeDetailModalClose();
			// }
		});
		youtubeDetailGetData(ytID);
	});

	$(".js-ytPrev,.js-ytNext").on('click',function(){
		ytID = $(this).attr('data-yt');
		$('.header__nav').css({'margin-right':''}); // スクロールバー幅を調整
		$(".aniType-ytDetailWrap").removeClass('is-active'); //中身アニメーション
		$('.js-pcytplayBtn').removeClass('is-active'); //再生ボタン
		$('.js-player2Wrap').html('<div id="player2"></div>'); //youtube
		$(".youtubeDetailLists__title span").text('');
		$(".youtubeDetail__mScrollWrap p").html('');
		$(".js-ytNext,.js-ytPrev").attr('data-yt','');
		history.pushState('','','./');
		history.replaceState('','','#'+ytID);
		youtubeDetailGetData(ytID);
	});

	// Close処理
	function youtubeDetailModalClose() {
		history.replaceState('','','./');
		$('.youtubeDetail').removeClass('is-active'); // 中身を非表示（アニメーション）0.4s
		$('.js-youtubeModalPagination').removeClass('is-active'); //クローズボタン非表示

		setTimeout(function(){
			$('.youtubeDetailModalbg').removeClass('is-active');　// 背景アニメーション
			$('.youtubeDetailModalWrap').removeClass('is-active'); // モーダル非表示
			$("body,html").animate({scrollTop:moSrc},10);
			$('#fullWrap').removeClass('is-fixed').css({'margin-right':'','overflow':''}); // 全体のスクロール非表示
			$('.header__nav').css({'margin-right':''}); // スクロールバー幅を調整
			$(".aniType-ytDetailWrap").removeClass('is-active'); //中身アニメーション
			$('.js-pcytplayBtn').removeClass('is-active'); //再生ボタン
			$('.js-player2Wrap').html('<div id="player2"></div>'); //youtube iframe初期に戻す

			// ajaxで拾ったものを消す
			$(".youtubeDetailLists__title span").text('');
			$(".youtubeDetail__mScrollWrap p").html('');
		},400);

	}

	// closeクリックイベント
	$('.js-youtubeDetailModalClose').on('click', function(){
		youtubeDetailModalClose();
	});

	// エリア外close
	$('.youtubeDetailModal__inner').on('click touchend', function(e) {
        if (!$(e.target).closest('.youtubeDetail__inner').length) {
            youtubeDetailModalClose();
        }
    });

	// youtube iframe再生
	$('.js-pcytplayBtn').on('click', function(){
		ytPlayer = new YT.Player('player2', {
			height: '100%',
			width: '100%',
			playerVars: {
				autoplay: 1,//オートプレイ
				rel: 0,//関連動画表示オフ
				playsinline: 1
			},
			videoId:ytID,
		});
		$(this).addClass('is-active');
	});


	/**
	 * Swiper
	 */
	// NEW LINEUP(NEW WORKS)
	var newlineupSwiper = new Swiper(".newlineupListsWrap", {
		slidesPerView: 3,
		spaceBetween: 8,
		breakpoints: {
			1024: {
				slidesPerView: 4,
				spaceBetween: 30,
			},
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	// 最後から2番目が見切れた時に最後のスライドまでスライドする
	var newLineupLen = newlineupSwiper.slides.length;
	var newLineupView = newlineupSwiper.params.slidesPerView;
	var newLineupNum = newLineupLen - newLineupView - 2;

	var newLineupActive = 0;
	newlineupSwiper.on('slideChange', function () {
	   newLineupActive = newlineupSwiper.previousIndex;
	});

	$(".newlineupListsWrap .swiper-button-next").on('click',function(){
		if(newLineupNum == newLineupActive) {
			newlineupSwiper.slideTo(newLineupNum + 2);
		}
	})




	// Youtube:PC
	var ytSwiper = new Swiper ('.ytCarouselWrap', {
		loop: false,
		direction: 'horizontal',
		autoHeight: false,
		slidesPerView: 1,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			renderBullet: function (index, className) {
			  return '<span class="' + className + '"></span>';
			},
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	// Youtube:PC - slideChange：swiper外
	const ytSwiperPrev = document.getElementsByClassName('js-swiperNav--ytPrev');
	const ytSwiperNext = document.getElementsByClassName('js-swiperNav--ytNext');
	$('.js-swiperNav--ytPrev').addClass('is-disabled');

	for (let i = 0; i < ytSwiperPrev.length; i++) {
		ytSwiperPrev[i].addEventListener('click', (e) => {
			const parent = e.target.parentNode;
			const prev = parent.getElementsByClassName('swiper-button-prev')[0];
			prev.click();

			$('.js-swiperNav--ytPrev,.js-swiperNav--ytNext').removeClass('is-disabled');
			if($('.ytCarousel__swiper-buttonWrap .swiper-button-prev').hasClass('swiper-button-disabled')) {
				$('.js-swiperNav--ytPrev').addClass('is-disabled');
			}
		});
	}
 
	for (let i = 0; i < ytSwiperNext.length; i++) {
		ytSwiperNext[i].addEventListener('click', (e) => {
			const parent = e.target.parentNode;
			const next = parent.getElementsByClassName('swiper-button-next')[0];
			next.click();

			$('.js-swiperNav--ytPrev,.js-swiperNav--ytNext').removeClass('is-disabled');
			if($('.ytCarousel__swiper-buttonWrap .swiper-button-next').hasClass('swiper-button-disabled')) {
				$('.js-swiperNav--ytNext').addClass('is-disabled');
			}
		});
	}

	// Youtube:sp
	var spYtSwiper = new Swiper ('.spYtCarouselWrap', {
		slidesPerView: 1.16,
		spaceBetween: 24,
		centeredSlides: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	// timeline:sp
	if(ww < 1025) {
		var timelineSwiper = new Swiper(".timelineListsWrap", {
			slidesPerView: 1.17,
			centeredSlides: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}


	/**
	 * NEWLINEUP（NEW WORKS）
	 * 背景動画とswiper navの連動処理
	 */
	// 動画サムネイルの連番
	$(".newlineupLists li").each(function(i){
		$(this).find("a").attr('id','ytnum' + (i));
	});

	// 動画の切り替え(ホバー)
	// var ytTimer;
	// $(".newlineupLists li a").hover(
	//     function() {
	//         var bgytNumID = $(this).attr('id');
	//         var bgytNum = Number(bgytNumID.slice(5));
	//         ytTimer = setTimeout(function(){
	//             playThis(bgytNum);
	//         },2000);
	//     },
	//     function() {
	//         clearTimeout(ytTimer);
	//     }
	// );

	// list左右エリアの処理 - swiper
	$(".newlineupListsWrap .swiper-button-prev").hover(
		// マウスカーソルが重なった時の処理
		function() {
			$(".newlineupLists__fullWrap").addClass('is-contLeft');
		},
		function() {
			$(".newlineupLists__fullWrap").removeClass('is-contLeft');
		}
	);
	$(".newlineupListsWrap .swiper-button-next").hover(
		// マウスカーソルが重なった時の処理
		function() {
			$(".newlineupLists__fullWrap").addClass('is-contRight');
		},
		function() {
			$(".newlineupLists__fullWrap").removeClass('is-contRight');
		}
	);

	
	/**
	 * 共通イベント
	 */
	// リサイズ
	function resizeHandle() {

		// 共通変数
		ww = $(window).innerWidth();

		// 背景動画のリサイズ
		var ytWW = $(".youtubeBg").innerWidth();
		var ytWH = $(".youtubeBg").innerHeight();
		var ss = 0.5625; /* 16:9 */
		var sr = ytWH / ytWW;
		var rh = ytWH / ss;
		var rw = ytWW / ss;
		
		if(sr > ss){
			$(".ytIframe").css({
				'height':'100%',
				'width': rh + 'px',
				'margin-top':'0',
				'margin-left':-rh / 2 + 'px',
				'left': '50%',
				'top': '0'
			});
		} else {
			$(".ytIframe").css({
				'width':'100%',
				'height': rw + 'px',
				'margin-top':-rw / 2 + 'px',
				'margin-left':'0',
				'top': '50%',
				'left': '0'
			});
		}

		/**
		 * 横幅1025px以下
		 * sp
		 */
		if(ww < 1025) {

			// SP：swiper
			var lineupSwiper = new Swiper(".top__newlineup--listsWrap", {
				loop: false,
				direction: 'horizontal',
				autoHeight: false,
				slidesPerView: 3,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});
		}

	}

	var brpoint = 0;
	// リサイズ スクロール
	function resizescrollHandle() {

		// 共通変数
		ww = $(window).innerWidth();
		wh = $(window).innerHeight();
		sct = $(window).scrollTop();
		/**
		 * youtubeエリア外にスクロールした時にclose
		 * youtube詳細が表示されている時に発火
		 */
		// var ytOT = $(".js-youtubeConts").offset().top;
		// var ytH = $(".js-youtubeConts").innerHeight();
		// var ytTopPos =  ytOT - (ytH / 4);
		// var ytBottomPos = ytOT + (ytH / 1.5);
		// if($('.youtubeDetail__in').hasClass('is-active')){
		// 	if(!(sct > ytTopPos && sct < ytBottomPos)) {
		// 		$(".js-youtubeClose").click();
		// 	}
		// }

		// newlineupエリアのスクロール処理
		var newlineupOT = $('.newlineup__in').offset().top;
		if(sct > newlineupOT - wh) {
			$('.newlineup__in').addClass('is-right');
		} else {
			$('.newlineup__in').removeClass('is-right');
		}

		// fixLinkListとnav__listsの処理
		var footOT = $(".footer").offset().top;
		var footPos = footOT - wh;

		if(sct === 0){
			$('.js-fixLinkLists, .js-nav__inner').removeClass('is-active');
		} else if (sct > newlineupOT - wh) {
			$('.js-fixLinkLists, .js-nav__inner').addClass('is-active');
			if(sct > footPos) {
				$('.js-fixLinkLists').removeClass('is-active');
				$('.js-nav__inner').addClass('is-active');
			} else {
				$('.js-fixLinkLists, .js-nav__inner').addClass('is-active');
			}
		} else {
			$('.js-fixLinkLists, .js-nav__inner').removeClass('is-active');
		}

		/**
		 * 横幅1024px以上 - PC
		 */
		if(ww > 1024) {
			// ファーストビューのスクロール処理（戻る時）
			var contOT = $('.js-topContWrap').offset().top;
			if(sct == 0){
				onTop = true;
				onBack = false;
			}else if(sct > 0 && sct < contOT){
				onTop = true;
				onBack = true;
			}else if(sct == contOT){
				onTop = false;
				onBack = true;
			}else{
				onTop = false;
				onBack = false;
			}

			// 下部コンテンツにスクロールが到達した際、class付与
			if(sct < 0){
				sct = 0;
			}
			if(sct > brpoint) {
				$('.topContWrap').addClass('is-fvNone');
			} else{
			   $('.topContWrap').removeClass('is-fvNone');
			}
			brpoint = sct;
			if(sct > contOT){
				brpoint = contOT;
			}
		}
	}

	/**
	 * function trigger
	 */
	$(window).on('load resize', function() {
		resizeHandle();
	});
	$(window).on('load resize scroll', function() {
		resizescrollHandle();
	});

});


/*-----------------------------------------------
 * 背景youtube再生
-------------------------------------------------*/
var player,ytTime,ytMiTime;
var yn = 0;
var ynl = ytList.length;
var ynow = 0;

function onYouTubeIframeAPIReady() {

	var w = '100%';
	var h = '100%';
 
	player = new YT.Player('player', {
		width: w,
		height: h,
		videoId: ytList[0],
		events: {
			'onReady': onPlayerReady,
			'onStateChange':onStateChange,
		},
		playerVars: {
			playsinline: 1,
			rel:0,
			autoplay:1,
			controls:0,
			disablekb:1,
			fs:0,
			iv_load_policy:3,
			showinfo:0,
			modestbranding:1,
		}
	});

}
function onPlayerReady(event) {
	event.target.mute();
	event.target.playVideo();
	$('#lg').attr('src',lgList[0]);
	$('#en').text(enList[0]);
	$('#sd').html(sdList[0]);
	$('#ds').text(dsList[0]);
	$('#st').text(stList[0]);
	$('#ln').attr('href',lnList[0]);
	yn = 1;
}

//任意の動画スタート
function playThis(_ytNum) {
	if(ytList[_ytNum] == ''){
		_ytNum = _ytNum + 1;
		if(_ytNum >= ynl){
			_ytNum = 0;
		}
	}
	yn = _ytNum;
	ynow = yn;
	player.clearVideo();
	player.loadVideoById(ytList[_ytNum],0,"large");

	$('#lg').attr('src',lgList[_ytNum]);
	$('#en').text(enList[_ytNum]);
	$('#sd').html(sdList[_ytNum]);
	$('#ds').text(dsList[_ytNum]);
	$('#st').text(stList[_ytNum]);
	$('#ln').attr('href',lnList[_ytNum]);
	
	player.playVideo();
	yn = yn + 1;
	if(yn >= ynl){
		yn = 0;
	}
}
//ENDで自動的に次の動画へ
function onStateChange(event){
	if(event.data == YT.PlayerState.ENDED){
		playThis(yn);
	}
	if(event.data == YT.PlayerState.PLAYING) {
		$(".bg__seekinner").attr('style','');
		ytTime = event.target.getDuration();
		ytMiTime = ytTime *1000;
		$(".bg__seekinner").stop(true,false).animate({'width':'100%'},ytMiTime,'linear');

		//console.log({'今流れている動画':ynow,'次の動画':yn});
		//$(".top__newlineup--lists li a").removeClass('active');
		$(".newlineupLists li a").removeClass('active');
		$('#ytnum' + ynow).addClass('active');
	}
}


/*-----------------------------------------------
 * Goods
-------------------------------------------------*/
let $goodsImgSwiper;
let $goodsOffCont;
function getGoodsSingle(_workid,_workName,_goodsid,_time){
	$.ajax({
		type: "GET",
		url: "./getgoods/",
		dataType : "json",
		data:{
			'goodsid':_goodsid,
			'workid':_workid,
		}
	})
	.done(function(data){
		// 詳細コンテンツの表示動作
		$(".js-goodsDetailTitle span").html(data.goods.name);
		$(".js-goodsDetailCategory").text(data.goods.category);
		$(".js-goodsDetailWorks").text(_workName);
		$(".js-goodsDetailText").html(data.goods.text);
		if(data.goods.link){
			$(".js-goodsShopLinkWrap").show();
			$(".js-goodsShopLink").attr('href',data.goods.link);
		}else{
			$(".js-goodsShopLinkWrap").hide();
		}
		$(".js-goodsDetailImgs").html('');
		if(data.goods.imgs){
			$.each(data.goods.imgs,function(i,v){
				$(".js-goodsDetailImgs").append('<li class="goodsImgLists__item swiper-slide"><img src="'+v+'" alt="'+data.goods.name+'"></li>');
			});
		}
		if(_goodsid == data.goods.next){
			$(".js-goodsPrev,.js-goodsNext").hide();
		}else{
			$(".js-goodsPrev,.js-goodsNext").show();
			$(".js-goodsPrev").attr({
				'data-goodsid':data.goods.prev,
				'data-goodsworkname':_workName,
				'data-goodsworkid':_workid
			});
			$(".js-goodsNext").attr({
				'data-goodsid':data.goods.next,
				'data-goodsworkname':_workName,
				'data-goodsworkid':_workid
			});
		}

		// image swiper
		$goodsImgSwiper = new Swiper ('.js-goodsImgSwiper', {
			loop: true,
			autoHeight: false,
			slidesPerView: 'auto',
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			}
		});
		if(data.goods.imgs.length <= 1){
			$goodsImgSwiper.destroy();
		}

		// is-activeが付くコンテンツ（アニメーション）
		$('.goodsDetailModalWrap, .goodsDetailModalbg, .aniType-goodsDetailWrap, .goodsDetail').addClass('is-active');
		setTimeout(function() {
			$('.js-goodsModalPagination').addClass('is-active');
		},500);
		$('#fullWrap').addClass('is-fixed').css({'margin-right':sw+'px','overflow':'hidden'}); // 全体のスクロールを止める
		$('.header__nav').css({'margin-right':sw+'px'}); // スクロールバー幅を調整 

	})
	.fail(function(XMLHttpRequest, textStatus, errorThrown){
		alert('通信に失敗しました。しばらくたってからお試しください。');
	});
}


$(function(){

	// グッズアイテムクリックイベント
	$(".js-goodsDetailOpen").on('click', function(){
		moSrc = $(window).scrollTop();
		// 商品画像に点滅アニメーション
		var $goodsItemImg = $(this).find('.goodsLists__img');
		$goodsItemImg.addClass('is-active');



		fx = window.innerHeight;
		document.documentElement.style.setProperty('--fx', `${fx}px`);

		$(".goodsDetail__mScrollWrap").mCustomScrollbar(); //mCustomScrollbar

		// data取得
		var goodsItemID = $(this).data('goodsid');
		var goodsWorkName = $(this).data('goodsworkname');
		var goodsWorkID = $(this).data('goodsworkid');

		//設定したカラーを取得
		var goodsColor = $(this).data('goodscolor');
		$('.goodsDetailModalbg, .js-goodsModalPagination').css({'background-color':goodsColor}); //全体背景とスマホのページャー背景
		$('.goodsDetail__right, .goodsDetail__link').css({'color':goodsColor}); //詳細テキスト
		history.pushState('','','./');
		history.replaceState('','','#'+goodsItemID);
		//GOODSSINGLE取得関数
		getGoodsSingle(goodsWorkID,goodsWorkName,goodsItemID,0);
		window.addEventListener('popstate', function(e) {
			history.replaceState('','','./');
			goodsDetailModalClose();
		});
		return false;
	});

	// Prev, Next
	$('.js-goodsPrev,.js-goodsNext').on('click',function(){
		$goodsImgSwiper.destroy();
		var nowWorkID = $(this).attr('data-goodsworkid');
		var nowWorkName = $(this).attr('data-goodsworkname');
		var toItemID = $(this).attr('data-goodsid');
		$(".aniType-goodsDetailWrap").removeClass('is-active');

		//GOODSSINGLE取得関数
		getGoodsSingle(nowWorkID,nowWorkName,toItemID,0);
		return false;
	});


	/**
	 * Close処理
	 */
	function goodsDetailModalClose(){
		history.replaceState('','','./');
		$goodsImgSwiper.destroy();
		$('.goodsLists__img, .goodsDetail, .js-goodsModalPagination').removeClass('is-active');

		setTimeout(function(){
			$(".aniType-goodsDetailWrap, .goodsDetailModalWrap, .goodsDetailModalbg").removeClass('is-active');
			$("body,html").animate({scrollTop:moSrc},10);
			$('#fullWrap').removeClass('is-fixed').css({'margin-right':'','overflow':''}); // 全体のスクロール非表示
			$('.header__nav').css({'margin-right':''}); // スクロールバー幅を調整
		},400);
	}

	// goodsDetail close
	$(".js-goodsDetailModalClose").on('click', function(){
		goodsDetailModalClose();
	});

	// goodsDetail close（エリア外）
	$('.goodsDetailModal__inner').on('click touchend', function(e) {
        if (!$(e.target).closest('.goodsDetail__inner').length) {
            goodsDetailModalClose();
        }
    });


	/**
	 * 商品詳細：矢印ホバー処理
	 */
	var $goodsDetailFlex = $(".goodsDetail__flex");
	// prev
	$(".goodsDetail__nav.w-prev a").hover(
		// マウスカーソルが重なった時の処理
		function() {
			$goodsDetailFlex.addClass('is-contRight');
		},
		function() {
			$goodsDetailFlex.removeClass('is-contRight');
		}
	);

	// next
	$(".goodsDetail__nav.w-next a").hover(
		// マウスカーソルが重なった時の処理
		function() {
			$goodsDetailFlex.addClass('is-contLeft');
		},
		function() {
			$goodsDetailFlex.removeClass('is-contLeft');
		}
	);

});

$(window).on('load',function(){
	fx = window.innerHeight;
	var $youtubeDetailFlex = $(".youtubeDetail__flex");
	// prev
	$(".youtubeDetail__nav.w-prev a").hover(
		// マウスカーソルが重なった時の処理
		function() {
			$youtubeDetailFlex.addClass('is-contRight');
		},
		function() {
			$youtubeDetailFlex.removeClass('is-contRight');
		}
	);

	// next
	$(".youtubeDetail__nav.w-next a").hover(
		// マウスカーソルが重なった時の処理
		function() {
			$youtubeDetailFlex.addClass('is-contLeft');
		},
		function() {
			$youtubeDetailFlex.removeClass('is-contLeft');
		}
	);
});
$(window).on('resize',function(){
	fx = window.innerHeight;
	document.documentElement.style.setProperty('--fx', `${fx}px`);
});


window.onpageshow = function(event) {
	if (event.persisted) {
		player.mute();
		player.playVideo();
		$('#lg').attr('src',lgList[0]);
		$('#en').text(enList[0]);
		$('#sd').html(sdList[0]);
		$('#ds').text(dsList[0]);
		$('#st').text(stList[0]);
		$('#ln').attr('href',lnList[0]);
		yn = 1;
	}
};
// window.addEventListener('pageshow',()=>{
// 	if(window.performance.navigation.type==2) {
// 		alert("##");
// 		player.target.mute();
// 		player.target.playVideo();
// 		$('#lg').attr('src',lgList[0]);
// 		$('#en').text(enList[0]);
// 		$('#sd').html(sdList[0]);
// 		$('#ds').text(dsList[0]);
// 		$('#st').text(stList[0]);
// 		$('#ln').attr('href',lnList[0]);
// 		yn = 1;
// 	}
// 	// onYouTubeIframeAPIReady();
// });