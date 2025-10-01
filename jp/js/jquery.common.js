var sct = $(window).scrollTop();
var ww = $(window).innerWidth();
var wh = $(window).innerHeight();
var agent = window.navigator.userAgent.toLowerCase();

// スクロールを禁止にする関数
function disableScroll(event) {
	event.preventDefault();
}

$(function(){
	
	// var pageBottom;
	// $(window).on('load resize', function(){
	//     wh = $(window).innerHeight();
	//     var docHeight = $(document).innerHeight();
	//     pageBottom = docHeight - wh;
	// });

	$('.pagetop-anchor').on('click', function(){
		var headerH = $(".header").innerHeight();
		var speed = 800;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;

		$('.js-companyBottom, .js-topContWrap').removeClass('is-fvNone');
		$('body,html').animate({scrollTop:position}, speed, 'easeInOutQuint');
		return false;
	});

	// 普通のアンカー
	$('.anchor').on('click', function(){
		var headerH = $(".header").innerHeight();
		var speed = 800;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top - headerH - 10;
		if($(this).hasClass('js-anchor-plus')) {
			position = target.offset().top - headerH;
		}
		$('body,html').animate({scrollTop:position}, speed, 'easeInOutQuint');
		return false;
	});


	/**
	 * Menu
	 */
	// clickイベント
	$(".js-menuBtn").on('click', function(){
		$(this).toggleClass('is-active');

		// Open
		if($(this).hasClass('is-active')){
			document.addEventListener('touchmove', disableScroll, { passive: false }); //スクロール禁止
			$('html, body').css({'overflow':'hidden'});
			$(".header").addClass('is-active');
			navbgRandom();

		// Close
		} else {
			navClose();
		}
	});

	// close処理
	function navClose() {
		document.removeEventListener('touchmove', disableScroll, { passive: false });　//スクロール禁止解除
		$('html, body').css({'overflow':''});
		$(".header, .js-menuBtn").removeClass('is-active');
		setTimeout(function(){
			$(".header__imgLists li").removeClass('is-active');
		},500);
	}

	// 背景ランダム
	function navbgRandom() {
		var $itemNav = $('.header__imgLists li');
		var itemNavbgs = new Array();
		$itemNav.each(function (i,v){
			var itemNavbg = $(this).attr('class');
			itemNavbgs[i] = itemNavbg;
		});
		var randBg = itemNavbgs[Math.floor(Math.random() * itemNavbgs.length)];
		var $randBg = $('.' + randBg);
		$randBg.addClass('is-active');
	}

	// SP：ナビゲーションクリックでメニュー閉じる
	ww = $(window).innerWidth();
	if(ww < 1025) {
		$('.nav__lists li a').on('click', function() {
			navClose();
		});
	}


	/**
	 * Modal
	 */
	var modalIF = $(".js-youtubeIframe"); // iframe

	// Common
	$(".js-modalOpen").on('click', function() {
		document.addEventListener('touchmove', disableScroll, { passive: false }); //スクロール禁止
		$('html, body').css({'overflow':'hidden'});

		var modalID = $(this).data("modal");
		$("#" + modalID).fadeIn(500);
		$(".modalBox").fadeIn(500);
	});

	// Youtube
	$(".js-youtubePlay").on('click', function(){
		var ytID = $(this).data("ytid");
		var ytURL = 'https://www.youtube.com/embed/'+ytID+'?autoplay=1&rel=0';
		setTimeout(function(){
			$(".js-youtubeIframe").attr("src",ytURL);
		},100);
	});

	// Close
	$(".js-modalClose").on('click', function() {
		$(".modalBox, .oneModal").fadeOut(500);
		setTimeout(function(){
			modalIF.attr('src','');
		},500);
		
		document.removeEventListener('touchmove', disableScroll, { passive: false });　//スクロール禁止解除
		$('html, body').css({'overflow':'auto'});
	});


	/**
	 * ブレイクポイント:1024pxでリロード
	 */
	var pcD = '_pc.';
	var spD = '_sp.';
	var bp = 1024;
	var loadP = (bp < ww) ? pcD : spD;
	var viewP;

	$(window).on("resize", function(){
		ww = $(window).innerWidth();
		viewP = (bp < ww) ? pcD : spD;
		if (loadP != viewP) {
			setTimeout("window.location.reload()", 1);
		}
	});


	/**
	 * カーソル
	 */
	var cursor = $(".cursor");
	var cWidth = 16;
	var mouseX = 0;
	var mouseY = 0;

	$(document).on('mousemove', function(e) {
		mouseX = e.clientX;
		mouseY = e.clientY;
		cursor.css({
			left: mouseX - (cWidth / 2),
			top: mouseY - (cWidth / 2)
		})
	});

	// iframe上の時
	$("iframe").on({
		"mouseenter": function() {
			cursor.addClass('on-iframe');
		},
		"mouseleave": function() {
			cursor.removeClass('on-iframe');
		}
	});

	$(".js-cur-link1").on({
		"mouseenter": function() {
			cursor.addClass('on-link1');
		},
		"mouseleave": function() {
			cursor.removeClass('on-link1');
		}
	});

	// $(".js-cur-link2, .swiper-pagination-bullet, .timelineLists__text a").on({
	//     "mouseenter": function() {
	//         cursor.addClass('on-link2');
	//     },
	//     "mouseleave": function() {
	//         cursor.removeClass('on-link2');
	//     }
	// });
	$(document).on({
		"mouseenter": function() {
			cursor.addClass('on-link2');
		},
		"mouseleave": function() {
			cursor.removeClass('on-link2'); }
		},
	'.js-cur-link2, .swiper-pagination-bullet, .timelineLists__text a, .newsOneArchive__textWrap a');

	// works用
	$(".js-cur-witem").on({
		"mouseenter": function() {
			cursor.addClass('on-witem');
		},
		"mouseleave": function() {
			cursor.removeClass('on-witem');
		}
	});

	// 外部リンク用
	$(".js-cur-litem").on({
		"mouseenter": function() {
			cursor.addClass('on-litem');
		},
		"mouseleave": function() {
			cursor.removeClass('on-litem');
		}
	});

	$(".js-cur-newsPrev").on({
		"mouseenter": function() {
			cursor.addClass('on-newsPrev');
		},
		"mouseleave": function() {
			cursor.removeClass('on-newsPrev');
		}
	});

	$(".js-cur-newsNext").on({
		"mouseenter": function() {
			cursor.addClass('on-newsNext');
		},
		"mouseleave": function() {
			cursor.removeClass('on-newsNext');
		}
	});

	// circle svgのトリガー
	var ytcurTimer;
	$(".js-cur-mitem").on({
		"mouseenter": function() {
			ytcurTimer = setTimeout(function(){
				cursor.addClass('on-mitem');
			},1000);
		},
		"mouseleave": function() {
			cursor.removeClass('on-mitem');
			clearTimeout(ytcurTimer);
		}
	});

	// エージェント判定：ipadの時はポインタを表示しない
	if ((agent.indexOf('ipad') > -1 || agent.indexOf('macintosh') > -1 && 'ontouchend' in document)){
		cursor.hide();
	}

});


/**
 * 共通イベント
 */
// リサイズ スクロール
function resizescrollHandleCommon() {
	sct = $(window).scrollTop();
	ww = $(window).innerWidth();
	wh = $(window).innerHeight();

	// footerエリア表示の際のheader処理
	var footOT = $('.js-footerOt').offset().top;
	var footPos = footOT - wh;

	if(sct == 0) {
		$(".header").removeClass('in-footer');
	} else if(sct > footPos) {
		$(".header").addClass('in-footer');
	} else {
		$(".header").removeClass('in-footer');
	}

	// スクロールアニメーション：フェードアウト
	// $(".aniFadeOut").each(function(){
	//     var contHeight = $(this).innerHeight();
	//     var headerH = $(".header").innerHeight();
	//     var contPos = $(this).offset().top;
	//     contPos = contPos + contHeight - headerH;

	//     if(sct > contPos) {
	//         $(this).addClass('is-fade');
	//     } else {
	//         $(this).removeClass('is-fade');
	//     }
	// });

}
// trigger
$(window).on('load resize scroll', function() {
	resizescrollHandleCommon();
});

// スクロールアニメーション
function scrAnimation() {
	$(".aniType-title, .aniType-scrollCont").each(function(){
		var itempos = $(this).offset().top;
		if (sct > itempos - wh){
			$(this).addClass('is-active');
		} else {
			$(this).removeClass('is-active');
		}
	});
}
$(window).on('resize scroll',scrAnimation);
$(window).on('load', function() {
	setTimeout(function(){
		scrAnimation();
	},1500);
});
// window.onpageshow = function(event) {
// 	if (event.persisted) {
// 		 window.location.reload();
// 	}
// };
// window.addEventListener('pageshow',()=>{
// 	if(window.performance.navigation.type==2) location.reload();
// });