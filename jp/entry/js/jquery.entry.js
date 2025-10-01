$(function(){

	//部署リスト初期化
	$("#js-departmentitem").html('');
	$.each(dp,function(i,v){
		$("#js-departmentitem").append('<li class="selectLists__item"><a href="javascript:;" class="js-selectItem" data-dp="'+v.term_id+'">'+v.name+'</a></li>');
	});
	$("#js-ocWrap").hide();
	var dpID = Number($("input[name=department_id]").val());
	if($("#js-job input").val()&&$("#js-job input").val()!='　'){
		$("#js-ocWrap").show();
		if(oc[dpID]){
			$.each(oc[dpID],function(i,v){
				$("#js-jobitem").append('<li class="selectLists__item"><a href="javascript:;" class="js-selectItem">'+v+'</a></li>')
			})
			$("#js-ocWrap").slideDown();
		}else{
			$("#js-ocWrap").slideUp();
			$("#js-job input").val('　');
		}
	}else{
		if(dpID){
			if(oc[dpID]){
				$.each(oc[dpID],function(i,v){
					$("#js-jobitem").append('<li class="selectLists__item"><a href="javascript:;" class="js-selectItem">'+v+'</a></li>')
				})
				$("#js-ocWrap").slideDown();
			}else{
				$("#js-ocWrap").slideUp();
				$("#js-job input").val('　');
			}
		}
	}

	//勤務地初期化
	$("#js-workingarea").html('');
	$.each(wa,function(i,v){
		$("#js-workingarea").append('<li class="selectLists__item"><a href="javascript:;" class="js-selectItem">'+v+'</a></li>');
	});

	$("#js-entrywork").html('');
	if(!$("#js-entryworkHidden input").val()){
		$("#js-entryworkHidden input").val(ew[0]);
		$("#js-entryworkHidden input").prop('checked');
		$("#js-schoolWrap").show();
	}
	if(!$('.mw_wp_form_confirm')[0]){
		$.each(ew,function(i,v){
			if($("#js-entryworkHidden input").val() == v){
				$("#js-entrywork").append('<span class="mwform-radio-field horizontal-item"><label><input type="radio" name="entry-work-r" value="'+v+'" checked /><span class="mwform-radio-field-text">'+v+'</span></label></span>');
			}else{
				$("#js-entrywork").append('<span class="mwform-radio-field horizontal-item"><label><input type="radio" name="entry-work-r" value="'+v+'" /><span class="mwform-radio-field-text">'+v+'</span></label></span>');
			}
		});
	}else{
		$("#js-entryworkHidden").show();
	}

	$("#js-schoolWrap").hide();
	if($("#js-schoolWrap input").val()&&$("#js-schoolWrap input").val()!='　'){
		$("#js-schoolWrap").show();
	}else if($("#js-entryworkWrap input:checked").val()=='新卒採用'){
		$("#js-schoolWrap").show();
	}else{
		$("#js-schoolWrap input").val('　');
	}

	/**
	 * select（input)
	 */
	/* セレクトボックスを表示 */
	$('.js-select').on('click', function(){
		$(this).find('.selectListsWrap').fadeToggle(300);
	});

	/* アイテムクリック */
	$(document).on('click','.js-selectItem', function(){
		var $this = $(this);
		var selectedText = $this.text();
		var $parentsSelect = $this.parents('.js-select');

		$parentsSelect.find('input[type="text"]').val(selectedText); //inputを変える
		$parentsSelect.find('.js-selectItem').removeClass('is-active'); //子要素item全体にアクティブを消す
		$this.addClass('is-active');
	});

	/* エリア外クローズ処理 */
	$('#fullWrap').on('click touchend', function(e) {
		if (!$(e.target).closest($('.js-select')).length) {
			$('.selectListsWrap').fadeOut(300);
		}
	});


	/**
	 * radio
	 */
	/* 最初のアイテムにcheckedを付ける */
	$('.formParts__flex.is-radio .mwform-radio-field:first-of-type input[type="radio"]').attr('checked');


	/**
	 * file
	 */
	/* ファイルを選択した処理 */
	$('.js-fileup input[type="file"]').on('change', function() {
		var file = $(this).prop('files')[0];
		$(this).parent('.formParts__fileWrap').find('.js-upload-filename').text(file.name);
		$(this).parent('.formParts__fileWrap').find('.js-fileupLabel').addClass('is-active');
		$(this).parent('.formParts__fileWrap').find('.upload-fileclear').addClass('is-active');
		$(this).parent('.formParts__fileWrap').find('.mw-wp-form_file a').fadeOut(300);
	});

	/* ファイル削除ボタン処理 */
	$('.js-upload-fileclear').on('click', function(){
		$(this).parents('.formParts__fileWrap').find('input[type="file"]').val('');
		$(this).parents('.formParts__fileWrap').find('input[type="hidden"]').val('');
		$(this).parents('.formParts__fileWrap').find('.js-upload-filename').text('ファイルを選択');
		$(this).parents('.formParts__fileWrap').find('.js-fileupLabel').removeClass('is-active');
		$(this).removeClass('is-active');
	});


	/**
	 * URL inputを増やす
	 */
	var $inputUrlItem = $('.js-inputUrl');
	var inputUrlLen = $inputUrlItem.length;
	var inputUrlFullNum = $inputUrlItem.length;
	var inputUrlFullNumAdd = inputUrlLen + 2;

	/* valの有無で表示・非表示 */
	$inputUrlItem.each(function(){
		var inputedUrl = $(this).find('input[type="url"]').val();

		if(inputedUrl){
			$(this).show();
		} else {
			$('.formParts__inputWrap.is-url:first-child').show();
			$(this).hide();
		}
	});

	/* クリックイベント */
	$('.js-inputaddBtn').on('click', function(){
		var mInput = inputUrlLen--;
		var targetInput = inputUrlFullNumAdd - mInput;

		if(targetInput <= inputUrlFullNum) {
			$('#work' + targetInput).fadeIn(500);

			if(targetInput == inputUrlFullNum) {
				$('.js-inputaddBtn').fadeOut(500); //input総数とtargetInputが同数だったらトリガーボタンを消す
			}
		}
	});


	/**
	 * 同意ボタン
	 */
	/* ページ読み込み時のボタン制御処理 */
	if ($('input[id="agree-1"]:checked').val()) {
		// $('[name="submitConfirm"]').prop("disabled", false);
		$('[name="submitConfirm"]').addClass('is-active');
	} else {
		// $('[name="submitConfirm"]').prop("disabled", true);
		$('[name="submitConfirm"]').removeClass('is-active');
	}

	/* 同意のチェックボックスをクリックした際のボタン制御処理 */
	$('[id="agree-1"]').on('click', function() {
		if ($('input[id="agree-1"]:checked').val()) {
			// $('[name="submitConfirm"]').prop("disabled", false);
			$('[name="submitConfirm"]').addClass('is-active');
		} else {
			// $('[name="submitConfirm"]').prop("disabled", true);
			$('[name="submitConfirm"]').removeClass('is-active');
		}
	});


	/**
	 * ひらがな→カタカナ
	 */
	$(".hira_change").blur(function () {
		hiraChange($(this));
	});

	hiraChange = function (ele) {
		var val = ele.val();
		var hira = val.replace(/[ぁ-ん]/g, function (s) {
			return String.fromCharCode(s.charCodeAt(0) + 0x60)
		});

		if (val.match(/[ぁ-ん]/g)) {
			ele.val(hira)
		}
	};


	/**
	 * Enterでsubmitしない
	 */
	$("input").on("keydown", function(e) {
		if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
			return false;
		} else {
			return true;
		}
	});


	/**
	 * ファイルアップロード文言変更
	 */
	if($('.mw-wp-form_file a')[0]) {
		$('.mw-wp-form_file a').html('ファイルアップロード済み');
	}

});

//部署選択時処理
$(document).on('click',"#js-departmentitem a",function(){
	if($(this).text()!=$("#js-department input").val()){
		var dpID = Number($(this).attr('data-dp'));
		$("input[name=department_id]").val(dpID);
		if(oc[dpID]){
			$("#js-job input").val('');
			$("#js-jobitem").html('');
			$.each(oc[dpID],function(i,v){
				$("#js-jobitem").append('<li class="selectLists__item"><a href="javascript:;" class="js-selectItem">'+v+'</a></li>')
			})
			$("#js-ocWrap").slideDown();
		}else{
			$("#js-ocWrap").slideUp();
			$("#js-job input").val('　');
		}
	}
});
$(document).on('click',"#js-entrywork input",function(){
	var ewval = $(this).val();
	$("#js-entryworkHidden input").val(ewval);
	if($(this).val() === '新卒採用'){
		if(!$("#js-schoolWrap input").val()||$("#js-schoolWrap input").val()=='　'){
			$("#js-schoolWrap input").val('');
		}
		$("#js-schoolWrap").slideDown(500);
	}else{
		$("#js-schoolWrap").slideUp(500);
		$("#js-schoolWrap input").val('　');
	}
});