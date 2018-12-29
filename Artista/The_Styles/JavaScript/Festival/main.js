"use strict";
// JavaScript Document

window.$window = $(window);
window.$breakPoint = 768;

window.CORONAFES = window.CORONAFES || {};

//コンストラクタ
CORONAFES.Main = function() {
    this.init()
};

CORONAFES.Main.prototype = {
    init: function() {
        this.safari();
        this.bodySwitch();
        this.auth();
        this.loading();
        this.loadingPage();
        this.mainImagePararax();
        this.menu();
        this.headscroll();
        this.MobileCheck();
        this.scrollHelper();
        this.grid();
        this.hover();
        this.android();
        this.slider();
        this.parallax();
        this.accordion();
        this.youtube();
        this.parallax_logo();
        this.sp_pllx();
        // this.spotifyScroll();
        // this.safari();
    },
    safari: function() {
        if (window.navigator.userAgent.indexOf("Chrome") != -1) {
            this.safariFlag = false;
            $('#top header').css('overflow', 'hidden');
        } else {
            if (window.navigator.userAgent.indexOf("Safari") != -1) {
                this.safariFlag = true;
            } else {
                this.safariFlag = false;
                $('#top header').css('overflow', 'hidden');
            }
        }
    },
    bodySwitch: function() {

        function bodySwitch() {
            var $body = $('body');
            var windowWidth = parseInt($window.width());
            if (windowWidth >= $breakPoint) {
                $body.removeClass("sp").addClass("pc");
            } else if (windowWidth < $breakPoint) {
                $body.removeClass("pc").addClass("sp");
            }
        }

        //window load
        bodySwitch();

        //window resize
        $window.resize(function() {
            bodySwitch();
        });
    },
    hover: function() {
        var hoverFlag = false;

        function action() {
            if (!hoverFlag) {
                if ($('body').hasClass('sp')) {
                    var $target = $('.p-cttlink li,a,.btn_close,.faq_wrap li,.trgger-wrap');
                    $target.on('touchstart', function() {
                        $(this).addClass('is-touch');
                    }).on('touchend', function() {
                        $(this).removeClass('is-touch');
                    });
                    return hoverFlag = true;
                }
            }
        }

        action();

        $(window).on('resize', function() {
            action();
        });

        $('.animeHvr').mouseover(function(e) {
            $(this).parent('span').parent('li').addClass('is-hover');
        }).mouseout(function(e) {
            $(this).parent('span').parent('li').removeClass('is-hover');
        });

        $('.animeHvr').on('touchstart', function(e) {
            $(this).parent('span').parent('li').addClass('is-touch');
        }).on('touchend', function(e) {
            $(this).parent('span').parent('li').removeClass('is-touch');
        });

    },
    menu: function() {
        /****/
        /**
         * menu
         */
        var touchPos = function touchPos(event) {
            var x, y;
            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;
            return { x: x, y: y };
        };
        var isMenuMobile = function isMenuMobile() {
            return window.matchMedia('(max-width: 959px)').matches;
        };

        var smv = {},
            emv = {},
            navi_pos = 0,
            mv = 0;
        var movediff = 0,
            move = 0,
            scrtop,
            scrollpos = 0;
        $(".l-menu-cnt").on("touchstart", function(e) {
            navi_pos = $(".l-menu-cnt").offset().top;
            smv = touchPos(event);
            move = 0;
        });
        $(".l-menu").on("touchmove", function(e) {
            e.preventDefault();
            return false;
        });
        $(".l-menu-cnt").on("touchmove", function(e) {
            e.preventDefault();
            emv = touchPos(event);
            var cntHeight = $(".l-menu-cnt").outerHeight();
            mv = emv.y - smv.y;
            if (0 < movediff) {
                scrtop = $(window).scrollTop();
                move = navi_pos - mv * -1;
                if (-movediff > mv) {
                    mv = -movediff;
                }

                //上限
                if (scrtop < move) {
                    return;
                }
                //下限
                if (scrtop - (cntHeight - $(window).outerHeight()) > move) {
                    return;
                }
                $(".l-menu-cnt").offset({ top: move });
            }
            return false;
        });
        $(".l-menu-cnt").on("touchend", function(e) {});

        var naviHeight = $(".l-menu-cnt").height();
        var wh, naviHeight;
        var menuInit = function menuInit() {
            naviHeight = $(".l-menu-cnt").outerHeight();
            if (!isMenuMobile()) {
                $(".l-menu").css({ "opacity": "1" });
                $(".l-menu-cnt").removeClass('mobile');
            } else {
                $(".l-menu").css({ "opacity": "1" });
                $(".l-menu-cnt").addClass('mobile');
                $(".l-menu-cnt").offset({ top: $(window).scrollTop() });

                if (window.orientation === 0) {
                    wh = window.innerHeight;
                    naviHeight = naviHeight < wh ? wh : naviHeight;
                    movediff = naviHeight - wh;
                } else {
                    wh = window.innerHeight;
                    naviHeight = naviHeight < wh ? wh : naviHeight;
                    movediff = naviHeight - wh;
                }
                wh = window.innerHeight;
                naviHeight = naviHeight < wh ? wh : naviHeight;
                movediff = naviHeight - wh;
            }
        };
        $(window).on("orientationchange resize", function() {
            menuInit();
        });

        $(".global-submenu .menu-list li a").on('click', function() {
            $('.menu-trigger').removeClass('active');
        });

        $('#triggerMenu').on('click', function() {
            var $this = $(this).find('.menu-trigger');
            var forPc = function forPc() {
                if ($this.hasClass('active')) {
                    $this.stop().removeClass('active');
                    $('body').stop().delay(300).queue(function() {
                        $(this).removeClass('menu_on');
                    });
                    $(".global-submenu").stop().animate({
                        top: "-200%"
                    }, 300);
                    $('.global-submenu .menu-list').stop().fadeOut(200);
                    // $(".l-menu").stop().animate({ "top": "-102%" }, 300);
                } else {
                    $this.stop().addClass('active');
                    $("body").stop().addClass("menu_on");
                    $(".global-submenu").stop().delay(100).animate({
                        top: "100%"
                    }, 300);
                    $('.global-submenu .menu-list').delay(500).fadeIn(100);
                    // $(".l-menu").stop().animate({ "top": "0%" }, 300);
                }
            };
            var forSp = function forSp() {
                if ($this.hasClass('active')) {
                    $this.stop().removeClass('active');
                    $("body").stop().removeClass('menu_on');
                    $(".l-menu").stop().animate({ "height": "0vh" }, 450, function() {
                        $(".l-menu").css({ "opacity": "0" });
                    });
                } else {
                    menuInit();
                    $this.stop().addClass('active');
                    $("body").stop().addClass('menu_on');
                    $(".l-menu").css({ "opacity": "1" });
                    $(".l-menu").stop().animate({ "height": "101vh" }, 450, function() {});
                }
            };

            if (isMenuMobile()) {
                forSp();
            } else {
                forPc();
            }
        });

        $('.global-submenu').find('a').on('click', function() {
            var href = $(this).attr("href");
            var pageCurrent = location.href;
            var dataParent = $(this).find('span').attr("data-parent");

            if (!dataParent == "") {
                //SP
                if (isMenuMobile()) {

                    //ページ内スクロールの場合
                    if (pageCurrent.match(dataParent)) {
                        $('.menu-trigger').removeClass('active');
                        $("body").stop().removeClass('menu_on');
                        $(".l-menu").stop().animate({ "height": "0vh" }, 450, function() {
                            $(".l-menu").css({ "opacity": "0" });
                        });
                        //ページ遷移の場合
                    } else {
                        location.href = href;
                    }

                    //PC
                } else {

                    //ページ内スクロール・遷移共通
                    $('.menu-trigger').removeClass('active');
                    $("body").stop().removeClass('menu_on');
                    $(".global-submenu").stop().animate({ "top": "-100%" }, 400);
                    $(".l-menu").stop().animate({ "top": "-102%" }, 400, function() {});

                    //ページ遷移の場合
                    if (!pageCurrent.match(dataParent)) {
                        location.href = href;
                    }

                }
                return false;

            } else {
                return;
            }

        })
    },
    headscroll: function() {

        var menuH = $('header').height();
        var pos = 0;
        $(window).scroll(function() {
            var currentPos = $(this).scrollTop();
            if (currentPos > pos) {
                if ($(window).scrollTop() >= 200) {
                    $('header').css('top', '-' + menuH + 'px');
                    $('#top header').stop().addClass('adscrl');
                }
            } else {
                $('header').css('top', 0 + 'px');
            }

            if ($(window).scrollTop() < menuH) {
                $('#top header').stop().removeClass('adscrl');
            }

            pos = currentPos;
        });
    },
    loading: function() {
        var that = this;
        //コンストラクタ
        function Loading(e) {
            this.init(e);
        }
        Loading.prototype = {
            init: function($el) {
                this.$el = $el;
                this.len = this.$el.length;
                this.eventHandler();
            },
            eventHandler: function() {
                //window load 対象セレクタがある場合発火
                if (this.len) {
                    this.view();
                } else {
                    return false;
                }
            },
            view: function() {
                var self = this;
                var st = new Date() * 1,
                    dft = 0,
                    minWait = 1200; ////Minimum wait time

                this.$el.show();

                dft = minWait - (new Date() * 1 - st);
                dft = 0 > dft ? 0 : dft;
                setTimeout(function() {
                    self.$el.find('img').addClass("is-hidden");
                    setTimeout(function() {
                        $('html,body').animate({
                            scrollTop: 0
                        }, 10)
                        self.$el.add(document.getElementById('container')).add($('#secAuthAge')).addClass('is-end');
                        setTimeout(function() {
                            self.$el.remove();
                            that.inview();
                            $(document.getElementById('wrap')).add($('header')).css({
                                "overflow": "visible"
                            });
                            $(window).trigger('click');
                            $(window).trigger('scroll');
                        }, 850)
                    }, 500);
                }, dft)
            }
        }

        var loading = new Loading($('.js-loading'));
    },
    loadingPage: function() {
        var that = this;

        function LoadingPage(e) {
            this.init(e);
        }

        LoadingPage.prototype = {
            init: function($el) {
                this.$el = $el;
                this.len = $el.length;

                this.eventHandler();
            },
            eventHandler: function() {
                if (this.len) {
                    this.view();
                } else {
                    return false;
                }
            },
            view: function() {
                var self = this;

                this.$el.show();
                var st = new Date() * 1,
                    dft = 0,
                    minWait = 1000; //Minimum wait time
                dft = minWait - (new Date() * 1 - st);
                dft = 0 > dft ? 0 : dft;

                setTimeout(function() {
                    self.$el.find('img').addClass('is-hidden');
                    setTimeout(function() {
                        if (location.hash == "") {
                            $('html,body').animate({
                                scrollTop: 0
                            }, 10)
                        } else {
                            var hash = location.hash;
                            if ($(hash).length) {
                                $('html,body').scrollTop($(hash).offset().top - $('header').innerHeight() + 3);
                            }
                        }
                        self.$el.fadeOut(600, function() {
                            $(this).remove();
                            that.inview();
                            setTimeout(function() {
                                //inview 発火
                                $(window).trigger('click');
                                $(window).trigger('scroll');
                            }, 10);
                        })
                    }, 500)

                }, dft);
            }
        }
        var loadingPage = new LoadingPage($('.js-loading_page'));
    },
    mainImagePararax: function() {
        var EP, sTop, tpOP, tpSC;
        $(window).on('scroll resize onMaximize onMinimize', function() {
            if ($("body").hasClass("pc")) {
                EP = $('.js-main-image').innerHeight();
                sTop = $(window).scrollTop();
                var $target = $('.js-main-image');
                if ((EP - sTop * 1.8) / EP >= 0.4) {
                    tpOP = (EP - sTop * 1.8) / EP;
                } else {
                    tpOP = 0.1;
                }
                if ((EP - sTop / 3) / EP > 0) {
                    tpSC = (EP - sTop / 3) / EP;
                } else {
                    tpSC = 0;
                }
                $target.css({
                    'background-position': 'center ' + (1 - tpSC) * 400 + 'px'
                });
            } else {
                var $target = $('.js-main-image');
                $target.css({
                    'background-position': 'center center'
                });
            }
        });
    },
    auth: function() {
        var authCheck = function authCheck() {
            //追加
            var src = '<div id="secAuthAge" class="l-sec l-sec_authAge">' + '<div class="l-inner l-inner_authAge">' + '<p class="theme-trade m-text m-text_01">ARE YOU OVER 20 YEARS OLD ?</p>' + '<p class="m-text m-text_02">あなたは20歳以上ですか？</p>' + '<div class="l-wrap l-wrap_authAge">' + '<ul class="l-grid l-grid_02">' + '<li class="l-grid-item l-grid-item_02  l-grid-item_02_01">' + '<a id="authAgeYes" class="m-btn m-btn_01 theme-trade" href="#" data-answer="はい"><span>YES</span></a>' + '</li>' + '<li class="l-grid-item l-grid-item_02  l-grid-item_02_02">' + '<a id="authAgeNo" class="m-btn m-btn_01 theme-trade" href="#" data-answer="いいえ"><span>NO</span></a>' + '</li>' + '</ul>' + '<p id="caution"><span class="theme-trade">PLEASE COME AGAIN WHEN YOU BECOME 20 YEARS OLD.</span><br>20歳以上の方を対象としています。</p>' + '</div>' + '</div>' + '</div>';
            //セレクタ
            var $container = $(document.getElementById('container'));

            var ls = localStorage;
            var flag = ls.getItem('authFlag') || "";

            function addElm() {
                $('body').addClass('is-open');
                $container.append(src);
                $(src).ready(function() {
                    setTimeout(function() {
                        $('body').css('overflow', 'hidden');
                    }, 0);
                    var $this = $(this);
                    //はい
                    $this.find($(document.getElementById('authAgeYes'))).on('click', function() {
                        $(document.getElementById('secAuthAge')).addClass('is-finished');
                        setTimeout(function() {
                            $('body').css('overflow', 'visible');
                            $(document.getElementById('secAuthAge')).remove();
                            ls.setItem('authFlag', true);
                        }, 750)

                        return false;
                    });
                    //いいえ
                    $this.find($(document.getElementById('authAgeNo'))).on('click', function() {
                        $(document.getElementById('caution')).css({
                            'opacity': 1,
                            'height': 'auto'
                        });
                        return false;
                    });
                });
            };
            if (!flag) {
                addElm();
            }
        };
        if ($('body').hasClass('topPage')) {
            authCheck();
        }
    },
    MobileCheck: function() {
        var isMobile = function isMobile() {
            return window.matchMedia('(max-width: 767px)').matches;
        };
        this.userDevice = isMobile();
    },
    scrollHelper: function() {
        var smoothscrollanim = function smoothscrollanim(offset, speed) {
            $('html,body').animate({ scrollTop: offset }, speed);
        };
        var smoothscroll = function smoothscroll(settings) {
            var settings = $.extend({
                speed: 350,
                offset: 0,
                selector: 'a[href*="#"]'
            }, settings);
            $(settings.selector).each(function(i, e) {
                var $this = $(e);
                var hash = e.hash;
                if (hash.match(/\#[a-zA-Z0-9_\-]+/)) {
                    $this.on('click', function() {
                        if ($(hash).length) {
                            var HashOffset = $(hash).offset().top;
                            var offset = HashOffset - settings.offset;
                            if (typeof settings.offset === "function") {
                                offset = HashOffset - settings.offset();
                            }
                            smoothscrollanim(offset, settings.speed);
                        }
                        return false;
                    });
                }
            });
        };

        var opt = {
            offset: function offset() {
                var offset = 65;
                if (window.matchMedia('(max-width:765px)').matches) {
                    offset = 65;
                }
                return offset;
            }
        };
        smoothscroll(opt);
    },
    grid: function() {
        /* tile
        ---------------------- */

        //window load
        $('.tile li').tile();

        //window resize
        $(window).on('resize', function() {
            $('.tile li').tile();
        });
    },
    android: function() {
        if (/Android/.test(window.navigator.userAgent)) {
            $('body').addClass('android');
        }
    },
    inview: function() {
        /* inview
        ---------------------- */
        $(".js-inv-cttlink , .js-inv-outline_photo").each(function() {
            $(this).addClass('inview');
            $(this).data('offset', 150);
        });

        $(".js-inv-up , .js-inv-op , .m-btn_more").each(function() {
            $(this).addClass('inview');
            $(this).data('offset', 150);
        });

        $('.inview').on('inview', function(event, isInView, topOrBottomOrBoth) {
            if (isInView) {
                $(this).off('inview');
                $(this).addClass('motion');
            }
        });
    },
    slider: function() {
        var slider = $('.swiper-container');
        var len = slider.length;

        if (len) {
            $('.swiper-container').each(function(index) {
                var idx = index + 1;
                var $this = $(this).addClass('slide-container-' + idx);
                var $pagination = $this.parent('.l-cell').find('.swiper-pagination').addClass('pagination-' + idx);

                if ($this.hasClass("top-page-slider")) {
                    var swiper = new Swiper($this, {
                        slidesPerView: 3,
                        swipeHandler: '.sp .swiper-slide',
                        breakpoints: {
                            767: {
                                slidesPerView: 1.5,
                                speed: 400,
                                spaceBetween: 0
                            }
                        }
                    });
                } else if ($this.hasClass("outline-silder")) {
                    var swiper = new Swiper($this, {
                        speed: 400,
                        centeredSlides: true,
                        slidesPerView: 1.2,
                        initialSlide: 0,
                        loop: true,
                        loopAdditionalSlides: 1
                    });
                } else if ($this.hasClass('top-artist-slider')) {
                    var swiper = new Swiper($this, {
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        speed: 800,
                        centeredSlides: true,
                        initialSlide: 0,
                        loop: true,
                        loopAdditionalSlides: 1,
                        onTouchStart: function() {
                            compAnim();
                        }
                    });
                } else {
                    var swiper = new Swiper($this, {
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        pagination: $pagination,
                        paginationClickable: true,
                        speed: 400,
                        loop: true,
                        spaceBetween: 0
                    });
                }
            });
        }

        function compAnim() {
            var d = new $.Deferred;
            TweenMax.set('.artist_slide figure figcaption h5', { x: -80, opacity: '0' });
            TweenMax.set('.artist_slide figure figcaption .wave', { x: -50, opacity: '0' });
            TweenMax.set('.artist_slide figure figcaption .sub-tit', { x: -40, opacity: '0' });

            TweenMax.to('.artist_slide figure figcaption h5', 1.4, {
                x: 0,
                opacity: '1',
                delay: .4,
                onComplete: function() {
                    d.resolve();
                }
            });
            TweenMax.to('.artist_slide figure figcaption .wave', 1.4, {
                x: 0,
                opacity: '1',
                delay: .5,
                onComplete: function() {
                    d.resolve();
                }
            });
            TweenMax.to('.artist_slide figure figcaption .sub-tit', 1.4, {
                x: 0,
                opacity: '1',
                delay: .8,
                onComplete: function() {
                    d.resolve();
                }
            });
            return d.promise();
        };
    },

    parallax: function() {
        $('.scene').parallax({
            invertX: true,
            invertY: true,
            limitX: true,
            limitY: true,
            scalarX: 10,
            scalarY: 10,
            frictionX: 0.1,
            frictionY: 0.1
        });
    },
    parallax_logo: function() {
        $('.main_logo').parallax({
            invertX: true,
            invertY: true,
            limitX: true,
            limitY: true,
            scalarX: 15,
            scalarY: 15,
            frictionX: 0.05,
            frictionY: 0.05
        });
    },
    sp_pllx: function() {
        'use strict';

        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; };
        }();

        function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        var anim = function anim(target, value) {
            TweenMax.to(target, .8, {
                y: value
            });
        };

        var scrollPosition = function() {
            function scrollPosition(targets, callbackIn) {
                _classCallCheck(this, scrollPosition);

                this.targets = [].concat(_toConsumableArray(document.querySelectorAll(targets)));
                this.windowH = window.innerHeight;
                this.scrollY = 0;
                this.offsetTop = [];
                this.height = [];
                this.show = [];
                this.value = [];
                this.offset = 20;
                this.callbackIn = typeof callbackIn === 'function' ? callbackIn : function() {};
                this.getItem();
                this.init();
                return this;
            }

            _createClass(scrollPosition, [{
                key: 'init',
                value: function init() {
                    var _this = this;

                    window.addEventListener('scroll', function() {
                        _this.scrollY = window.pageYOffset;
                        _this.check();
                    });
                    this.check();
                }
            }, {
                key: 'getItem',
                value: function getItem() {
                    var _this2 = this;

                    this.targets.forEach(function(el, i) {
                        var rect = el.getBoundingClientRect();
                        _this2.offsetTop[i] = rect.top;
                        _this2.height[i] = el.offsetHeight;
                    });
                }
            }, {
                key: 'check',
                value: function check() {
                    var _this3 = this;

                    this.targets.forEach(function(el, i) {
                        _this3.show[i] = _this3.scrollY + _this3.windowH > _this3.offsetTop[i] + _this3.offset && _this3.scrollY < _this3.offsetTop[i] - _this3.offset + _this3.height[i];
                        _this3.value[i] = _this3.scrollY + _this3.windowH - _this3.offsetTop[i] - _this3.offset;
                        if (_this3.show[i]) {
                            el.classList.add('is-show');
                            _this3.callbackIn.call(_this3, el, i);
                        } else {
                            el.classList.remove('is-show');
                        }
                    });
                }
            }]);
            return scrollPosition;
        }();

        var box = new scrollPosition('.sp .boxpllx', function(el, i) {
            var amount = 30;
            var value = this.value[i] / this.windowH * amount * -1;
            if (this.show[i]) {
                anim(el.querySelector('.sp .innerpllx'), value);
            }
        });
    },
    accordion: function() {
        var $trigger = $('.triger');

        function aco() {
            $trigger.on('click', function() {
                var $this = $(this);
                var $target = $this.next('li');
                if ($this.hasClass('is-active')) {
                    $this.removeClass('is-active');
                    $target.animate({ height: 0, 'margin': '0' }, 300, 'easieEaseInOutQuart');
                } else {
                    $this.addClass('is-active');
                    var h = $target.find('ul').innerHeight();
                    $target.animate({ height: h + 1, }, 300, 'easieEaseInOutQuart');
                }
            });
        };
        aco();
    },
    youtube: function() {
        // var $this = $('.yt');
        // var date_movie = $this.find('iframe').attr('data-movie');
        // $('.yt_wrap').each(function(index) {
        //     $('.yt_wrap').on('click', function() {
        //         $this.find('iframe').attr('src', date_movie);
        //         $('.yt span').css('display', 'none');
        //     });
        // });
        $('.yt_in').click(function() {
            var video = '<iframe src="' + $(this).attr('data-video') + '" frameborder="0" width="480" height="270"></iframe>';
            $(this).replaceWith(video);
        });
    },
    // タブ切り替え
    // bus_sche: function() {
    //     $('.sch_tab li').on('click',function() {
    //         var index = $('.sch_tab li').index(this);
    //         $('.sch_tab li').removeClass('active');
    //         $(this).addClass('active');
    //     });
    // }

    // spotifyScroll: function() {
    //     var menuH = $('.spotify').height();
    //     var pos = 0;
    //     $(window).scroll(function() {
    //         var currentPos = $(this).scrollTop();
    //         if (currentPos > pos) {
    //             if ($(window).scrollTop() >= 200) {
    //                 $('.spotify').css('bottom', '-' + menuH + 'px');
    //             }
    //         } else {
    //             $('.spotify').css('bottom', 0 + 'px');
    //         }
    //         pos = currentPos;
    //     });
    // },
}

$(function() {
    $(window).on('load', function() {
        CORONAFES.main = new CORONAFES.Main();
    });
});

$(document).click(function(event) {
    var $this = $('.triger');
    var $target = $this.next('li');
    if ($('.accordion').length > 0) {
        if (!$(event.target).closest('.triger, .accordion').length) {
            $this.removeClass('is-active');
            $target.animate({ height: 0, 'margin': '0' }, 300, 'easieEaseInOutQuart');
        }
    }
});