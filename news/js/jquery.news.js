var ww = $(window).innerWidth();
var sct = $(window).scrollTop();

// loading
$(window).on('load', function(){
    $('body,html').animate({scrollTop:0}, 50);
    setTimeout(function(){
        $('.loading2').addClass('is-active');
        setTimeout(function(){
            $('.loadingWrap').fadeOut(500);
        },800);
    },500);
});

$(function(){

    // accordion
    $('.js-filterAcdBtn').on('click', function(){
        $(this).next().slideToggle();
        $(this).toggleClass('is-active');

        $('.newsArchiveListsWrap, .footer').toggleClass('is-accordion');
    });

    // youtube iframe
    var $newsArchiveIframe = $('.newsOneArchive__textWrap iframe[src*="youtube"]');
    if($newsArchiveIframe.length >= 1) {
        $newsArchiveIframe.wrap('<span class="ytifWrap"></span>');
    }


    /**
     * 一覧ページのスクロール処理
     */
    if($('.newsArchiveArea').length >= 1) {
        $(window).on('load scroll resize', function(){
            ww = $(window).innerWidth();
            sct = $(window).scrollTop();

            var topSpace = 190;
            if(ww < 1025) {
                topSpace = 72;
            }

            var newsAreaOT = $('.newsArchiveArea').offset().top - topSpace;

            if(sct > newsAreaOT) {
                $('.filterWrap').addClass('is-active');
            } else {
                $('.filterWrap').removeClass('is-active');
            }
        });
    }

});