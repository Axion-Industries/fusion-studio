var ww = $(window).innerWidth();

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


	// 詳細のアコーディオン処理
	$('.js-recAcBtn').on('click', function() {
		$(this).next().slideToggle();
		$(this).find(".recTypeLists__icon").toggleClass('is-active');

		var titleH = $(this).innerHeight();
		var headerH = $(".header").innerHeight();
		var space = titleH + headerH; //タイトルとヘッダーの高さを取得して足す

		var targetPos = $(this).offset().top - space;
		$('body,html').animate({scrollTop:targetPos}, 800, 'easeInOutQuint');
	});


	// INTERVIEW
	ww = $(window).innerWidth();
	if(ww < 1024) {
		$(".recOneInterview__titleWrap").on('click', function() {
			$(this).next().slideToggle();
			$(this).find(".recTypeLists__icon").toggleClass('is-active');
		});
	}

	// アコーディオン内テキストを<span></span>で囲む
	// $('.js-actext').contents().each(function(index, node) {
	// 	if (node.nodeType === 3) {
	// 		// TEXT_NODE.
	// 		$(node).replaceWith($('<span class="aniFadeOut"></span>').text(node.nodeValue));
	// 	} else if (node.nodeName.toLowerCase() === 'br') {
	// 		node.remove();
	// 	}
	// });
});