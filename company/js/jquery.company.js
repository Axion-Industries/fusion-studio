var ww = $(window).innerWidth();
var wh = $(window).innerHeight();
var sct = $(window).scrollTop();
var agent = window.navigator.userAgent.toLowerCase();



// loading
$(window).on('load', function(){
    $('body,html').animate({scrollTop:0}, 50);
    setTimeout(function(){
        $('.loading2').addClass('is-active');
        setTimeout(function(){
            $('.loadingWrap').fadeOut(500);
            backgroundSwiper();

            // 最初のコンテンツに.is-activeを付ける
            $('.js-oneDep, .js-depselect').removeClass('is-active');
            $(".depLinkLists__item:first-child a , .depLists__item:first-child").addClass('is-active');
        },800);
    },500);
});

function backgroundSwiper() {
    // スライド総数の取得
    var itemLen = $(".subBgimgLists--pc li").length;
    var itemNum = String(itemLen);
    $(".bgSlideNum__full").text(itemNum);

    // 初期タイトルの取得
    var firstTitle = $(".subBgimgLists--pc li:first-child").find(".subBgimgLists__title").text();
    $(".companyFv__text").text(firstTitle);

    // bgSwiper
    var pcbgSwiper = new Swiper ('.js-subBgimg-pc', {
        autoHeight: false,
        slidesPerView: 1,
        autoplay: {
            delay: 3000,
        },
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
    });

    // bgSwiper：event
    pcbgSwiper.on('slideChange', function () {

        // スライド番号の取得
        var acNum = this.activeIndex + 1;
        var indexNum = String(acNum);
        $(".bgSlideNum__now").text(indexNum);

        // タイトルの取得
        setTimeout(function(){
            var acTitle = $(".subBgimgLists li.swiper-slide-active").find(".subBgimgLists__title").text();
            $(".companyFv__text").text(acTitle);
        },250);

    });

    // bgSwiper - SP
    var spbgSwiper = new Swiper ('.js-subBgimg-sp', {
        autoHeight: false,
        slidesPerView: 1,
        autoplay: {
            delay: 3000,
        },
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
    });
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
                $('.js-companyBottom-anchor').click();
                onTopSw = false;
            }else if(delta > 0 && onTopSw){
                onTopSw = false;
                $('.js-companyFv').removeClass('is-transitionNone');
                $('.js-companyFv, .js-companyBottom').removeClass('is-fvNone');

                setTimeout(function(){
                    $('html,body').stop(true,false).animate({scrollTop:0}, 800, 'easeOutQuint',function(){
                        onTopSw = true;
                    });
                },160);
            }
        }
    },{passive: false});

});

$(function() {

    /**
     * ボタンをクリックしたら下のコンテンツまで自動スクロール
     */
    $('.js-companyBottom-anchor').on('click', function(){
        var speed = 800;
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top + 1;

        $('.js-companyBottom').addClass('is-fvNone');
        $('body,html').stop(true,false).animate({scrollTop:position}, speed, 'easeInOutQuint',function(){
            onTopSw = true;
        });
    });


    /**
     * 部署紹介
     */

    // Scroll magic
    // var controller = new ScrollMagic.Controller();

    // var depItem = ($(".js-depNavLink").length) + 1; // 部署個数の取得（+SENDAI）
    // var depPer = 50;
    // // エージェント判定：ipadの時depPerの数値を増やす（スクロール量の調整）
    // if ((agent.indexOf('ipad') > -1 || agent.indexOf('macintosh') > -1 && 'ontouchend' in document)){
    //     depPer = 120;
    // }

    // var depStop = (depItem * depPer) + '%';

    // // scene
    // var scene = new ScrollMagic.Scene({
    //                 triggerElement: ".scrollTarget", // ターゲット
    //                 triggerHook: "onLeave", //動作の開始位置：onLeave = 0
    //                 duration: depStop // シーンの長さ・距離を設定
    //             })
    // .setPin(".scrollTarget") // 指定位置で固定表示
    // .addTo(controller); // Controllerに追加

    // // スクロールイベント
    // var itemList = $(".js-depNavLink, .js-oneDep");

    // var bpoint = new Array();

    // $(window).on('load resize scroll', function(){
    //     for(i = 0;i < depItem;i++){
    //         bpoint[i] = i/depItem;
    //     }
        
    //     var progress = scene.progress();
    //     if(progress > bpoint[bpoint.length - 1]){ // for sendai
    //         itemList.removeClass('is-active');
    //         $('.depLinkLists').addClass('is-off');
    //         $(".is-tokyo a").removeClass('is-active');
    //         $(".is-sendai a, .department7").addClass('is-active');
    //     }else{
    //         for(var i = depItem;1 <= i;i--){
    //             if(progress <= bpoint[i] && progress > bpoint[i-1]){
    //                 $('.depLinkLists').removeClass('is-off');
    //                 itemList.removeClass('is-active');
    //                 $(".department"+ i +", .is-tokyo a").addClass('is-active');
    //                 $(".is-sendai a, .department7").removeClass('is-active');
    //             }
    //         }
    //     }
    // });

    // クリックイベント
    // $('.js-depselect').on('click',function(){
    //     var todata = $(this).data('scrnum');
    //     var onescr = $(window).innerHeight() * (depPer/100);

    //     var stt = $(".companyBottom").offset().top;
    //     var toscr = stt + (bpoint[todata]*(onescr*depItem)) + 1;
    //     if ((agent.indexOf('ipad') > -1 || agent.indexOf('macintosh') > -1 && 'ontouchend' in document)){
    //         toscr = stt + (bpoint[todata]*(onescr*depItem)) + 500;
    //     }
    //     $("body,html").animate({scrollTop:toscr+ 'px'},100);
    // });

    $('.js-depselect').on('click', function(){
        var scrnumData = $(this).data('scrnum');
        var studioData = $(this).data('studio');

        $(".studio-num"+ studioData +" .js-depNavLink").removeClass('is-active');
        $(".studio-num"+ studioData +" .js-studio-detail").removeClass('is-active');

        $(".studio-num"+ studioData +" .NavLink" + scrnumData).addClass('is-active');
        $(".studio-num"+ studioData +" .studioDetail-" + scrnumData).addClass('is-active');
    
        });

    // sp:スタジオナビゲーション
    $(".spCompanyStudio__head li:first-child a").addClass('is-active'); // 初期アクティブ
    var navLink = $(".spCompanyStudio__head li a");
    var contentsArr = new Array();

    // 各コンテンツの高さと位置
    function targetContents() {
        var itemH = ($(".spDepartmentLists li").innerHeight()) * 2;

        for (var i = 0; i < navLink.length; i++) {
            var targetContents = navLink.eq(i).attr('href'); // 要素IDを取得
            var targetContentsTop = $(targetContents).offset().top - itemH; 
            var targetContentsBottom = targetContentsTop + $(targetContents).outerHeight(true) - 1;
            contentsArr[i] = [targetContentsTop, targetContentsBottom] // 配列に格納
        };
    }

    // 現在地をチェック
    function currentCheck() {
        var scr = $(window).scrollTop();
        for (var i = 0; i < contentsArr.length; i++) {
            // 現在のスクロール位置が、配列に格納した開始位置と終了位置の間にあるものを調べる
            if(contentsArr[i][0] <= scr && contentsArr[i][1] >= scr) {
                navLink.removeClass('is-active');
                navLink.eq(i).addClass('is-active');
                i == contentsArr.length;
            }
        };
    }

    var brpoint = 0;
    /**
     * 共通イベント
     */
    // リサイズ スクロール
    function resizescrollHandle() {

        // 共通変数
        ww = $(window).innerWidth();
        wh = $(window).innerHeight();
        sct = $(window).scrollTop();

        // tokyo,sendai箇所の処理(sp)
        var tsWrapOT = $('.spCompanyStudio__headWrap').offset().top;
        var tsH = $('.spCompanyStudio__head__in').innerHeight();
        var tsPosH = (wh - tsH) / 2;
        var tsPos = tsWrapOT - tsPosH;

        if(sct > tsPos) {
            $(".spCompanyStudio__head__in").addClass('is-active');
        } else {
            $(".spCompanyStudio__head__in").removeClass('is-active');
        }

        var tsWrapH = $('.spCompanyStudio__headWrap').innerHeight();
        var fixPosH = tsWrapH - tsH;
        var fixPosOT = tsWrapOT + fixPosH;
        var fixPos = fixPosOT - tsPosH;

        if(sct > fixPos) {
            $(".spCompanyStudio__head__in").addClass('is-end');
        } else {
            $(".spCompanyStudio__head__in").removeClass('is-end');
        }

        /**
         * 横幅1024px以上 - PC
         */
        if(ww > 1024) {
            // ファーストビューのスクロール処理（戻る時）
            var contOT = $('.js-companyBottom').offset().top; //下部コンテンツのオフセット

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
                $('.js-companyBottom').addClass('is-fvNone');
            } else{
               $('.js-companyBottom').removeClass('is-fvNone');
            }
            brpoint = sct;
            if(sct > contOT){
                brpoint = contOT;
            }
        }

    }


 // リサイズ
    var heightListsArr = new Array();
    var heightImgArr = new Array();
    var linkListsHeight = $('.depLinkLists').innerHeight(); // 部署リンクエリア高さ
    resizeHandle();
    function resizeHandle() {

        // 共通変数
        ww = $(window).innerWidth();
        wh = $(window).innerHeight();


        /**
         * 各アイテムのMAX値を取得
         */

        // ul.depListsの高さを求める
        setTimeout(function(){
            $('.depListsWrap').each(function(i) {
                $(this).find('.depLists__item .depLists__imgWrap img').each(function(idx){
                    heightImgArr[idx] = $(this).height();
                });
                var maxImgH = Math.max.apply(null,heightImgArr);

                // 部署テキスト（一番高さが大きいテキストエリア）
                $(this).find('.depLists__item .depLists__left').each(function(idx){
                    heightListsArr[idx] = $(this).height();
                });
                var maxH = Math.max.apply(null,heightListsArr);
               
                var leftHeight = linkListsHeight + maxH;

                var AcLinkListHeight = $('.depLinkLists.is-active').innerHeight(); // 部署リンクエリア高さ

                if(maxImgH > maxH){
                    $(this).find('.depLists').css({'height':maxImgH + 'px'});
                 } else {
                    $(this).find('.depLists').css({'height':maxH + 'px'});
                 }

                if(leftHeight > maxImgH) {
                    $(this).find('.depLinkLists').addClass('is-active');
                    $(this).find('.depLists__left').addClass('is-mgauto');
                } else {
                    $(this).find('.depLinkLists').removeClass('is-active');
                }

                if($('.depLinkLists').hasClass("is-active")){
                    $(this).find('.is-depLinkCheck').css('padding-top', AcLinkListHeight);
                }else {
                    $(this).find('.is-depLinkCheck').css('padding-top', linkListsHeight);
                }
            });
        },10);


        /**
         * SP表示の際、背景ビジュアルをFVの高さに揃える
         * 少し取得を遅らせて正確な値を取得
         */
        setTimeout(function(){
            var fvH = $('.js-fvHeight-sp').innerHeight();
            var $bg = $('.subBgimgListsWrap');

            if(ww < 1025) {
                $bg.css({'height':fvH + 'px'});
            }
        },200);
    }

    /**
     * function trigger
     */
    $(window).on('load resize', function() {
        targetContents();
        resizeHandle();
    });
    $(window).on('load resize scroll', function() {
        currentCheck();
        resizescrollHandle();
    });

});