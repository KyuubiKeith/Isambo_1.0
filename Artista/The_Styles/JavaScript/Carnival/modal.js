window.CORONAFES = window.CORONAFES || {};

//youtube API GLOBAL
(function () {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})()

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytplayer', {
    height: '540',
    width: '960',
    videoId: '_lBwR7k3FR0',
    playerVars: {
      rel: 0, // 再生終了後に関連動画を表示するかどうか設定
      autoplay: 0, // 自動再生するかどうか設定
      showinfo:0,
      controls:0
    },
    events: {
      //  'onReady': onPlayerReady,
      //    'onStateChange': onPlayerStateChange
    }
  });
}

//modal コンストラクタ
CORONAFES.Modal = function(){
  this.init();
}

CORONAFES.Modal.prototype = {
  init:function(){
    this.modal();
  },
  modal:function(){
    var current_scrollY;

    $('.artists_wrap li .animeHvr').on("click", function() {
        current_scrollY = $(window).scrollTop();
        $('#artists').css({
            height: '100vh',
            overflow: 'hidden'
        });

        var selector = $(this).parent('span').attr('data-modal');
        $('.modal_wrap').css({
          "display":"block"
        })
        setTimeout(function(){
          $('.modal_wrap').addClass('open');
          $(".modal_cnts").fadeIn('normal');
          $(selector).addClass('current');
          $('#artists').addClass("modal_on");
        },0)
    });

    function stopVideo() {
      if (player && player.B){
        player.stopVideo();
      }

    }

    $('.p-outline_film .btn_outline_film').mouseover(function(e) {
      $(this).parent('.p-outline_film').addClass('is-hover');
    }).mouseout(function(e) {
      $(this).parent('.p-outline_film').removeClass('is-hover');
    });

    $('.p-outline_film .btn_outline_film').on( 'touchstart', function(){
      $( this ).parent('.p-outline_film').addClass('is-touch');
    }).on( 'touchend', function(){
      $( this ).parent('.p-outline_film').removeClass('is-touch');
    });

    $('.p-outline_film .btn_outline_film').on("click", function() {
        current_scrollY = $(window).scrollTop();
        $('#outline').css({
            height: '100vh',
            overflow: 'hidden'
        });

        var selector = $(this).attr('data-modal');
        
        $('.modal_wrap').css({
          "display":"block"
        })
        setTimeout(function(){
          $('.modal_wrap').addClass('open');
          $(".modal_cnts").fadeIn('normal');
          $(selector).addClass('current');
        },0)

        //Youtube API
        setTimeout(function(){
          player.playVideo();
        },400)
    });

    function modal_close() {
      //Youtube API
      stopVideo();

      $('.modal_wrap').removeClass('open');
      setTimeout(function(){
        $(".modal_cnts").fadeOut('normal');
        $(".modal_cnts").removeClass('current');
         $('.modal_wrap').css({
          "display":"none"
         })
      },550);
      $('body#artists,body#outline').attr({ style: ' transition: none;' });
      $('html, body').prop({ scrollTop: current_scrollY });
      $('#artists').removeClass("modal_on");
    }
    $(".btn_close, .ovrly").on("click", function() {
        modal_close();
    })
  }
}

//document ready
$(function(){
  //インスタンス
  CORONAFES.modal = new CORONAFES.Modal();
});