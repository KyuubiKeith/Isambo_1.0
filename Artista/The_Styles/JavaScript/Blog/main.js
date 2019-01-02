window.CORONA = window.CORONA || {};
CORONA.Common = function() {
    this.init()
};

CORONA.Common.prototype = {
    init: function() {
        var a = this;
        this.PAGE_KIND = "";
        this.DEVICE = "";
        this.UA = "";
        this.FIRST_CB_FLAG = false;
        this.MY_SWIPER = "";
        this.MY_SWIPER2 = "";
        this.MY_SWIPER3 = "";
        this.SWIPER_FLAG = 0;
        this.SWIPER_FLAG2 = 0;
        this.SWIPER_FLAG3 = 0;
        this.BUBBLE_FLAG = false;
        this.BUBBLE_FLAG2 = 0;
        this.$htmlBody = $("html,body");
        this.$body = $("body");
        this.setLine();
        this.metaTW();
        this.deviceSwicth();
        this.ua();
        this.pageKind();
        this.menu();
        this.topPickupHeight();
        this.heightMix();
        this.checkbox();
        this.modalExtra();
        this.ctsStart();
        this.ctsVh();
        this.ctsMenu();
        this.ctsSmscrl();
        this.ctsMenusc();
        // this.ctsTop();

        switch (this.PAGE_KIND) {
            case "page-top-page":
                this.topBnr();
                this.topBnrSp();
                break;
            case "page-corona-session":
                this.snsLogFBC();
                this.setTracking01();
                break;
            case "page-corona-winter":
                this.snsLogFBC();
                this.setTracking01();
                // this.winterAnchor();
                // this.winterNavFixed();
                break;
            case "page-corona-escape-campaign":
                this.snsLogFBC();
                this.setTracking01();
                break;
            case "page-summer-journey":
                this.snsLogFBC();
                this.setTracking01();
                break
        }
        this.mainVisualAnm();
        this.ageCheck();
        this.smoothSCR();
        setTimeout(function() {
            a.$htmlBody.animate({
                scrollTop: 0
            }, 50, function() {
                if (!a.FIRST_CB_FLAG) {
                    a.bubble();
                    a.setPjax();
                    setTimeout(function() {
                        a.openingStart02(a.openingEnd02, a.init01)
                    }, 300);
                    a.FIRST_CB_FLAG = true
                }
            })
        }, 10);
        $(window).on("resize onMaximize onMinimize scroll", function() {
            a.topPickupHeight()
        })
    },
    ua: function() {
        var b = this;
        var a = navigator.userAgent;
        if (a.match(/MSIE/) || a.match(/Trident/) || a.match(/Edge/)) {
            this.UA = "ie";
            this.$body.addClass("ie")
        }
        if (a.indexOf("iPad") > -1) {
            this.UA = "ipad";
            setTimeout(function() {
                b.$body.addClass("ipad");
                $(".ac-container").css("position", "absolute")
            }, 500)
        }
        if (a.indexOf("firefox") > -1) {
            this.UA = "firefox";
            b.$body.addClass("firefox")
        }
    },
    deviceSwicth: function() {
        var b = this;
        var d = $(window);
        var c = 769;

        function a() {
            var e = parseInt(d.width());
            if (e > c) {
                b.DEVICE = "PC";
                b.$body.removeClass("sp").addClass("pc")
            } else {
                if (e < c) {
                    b.DEVICE = "SP";
                    b.$body.removeClass("pc").addClass("sp")
                }
            }
        }
        a();
        d.resize(function() {
            a()
        })
    },
    checkbox: function() {
        var a = $(".js-checkbox01");
        a.on("click", function() {
            $(this).add(".js-checkbox-control01").toggleClass("is-active");
            return false
        })
    },
    pageKind: function() {
        var a = $(document.getElementById("contents"));
        var b = a.attr("data-page-name");
        if (this.DEVICE == "PC") {
            this.$body.removeAttr("class").addClass("pc").addClass(b)
        } else {
            this.$body.removeAttr("class").addClass("sp").addClass(b)
        }
        this.PAGE_KIND = b
    },
    topicsOpen: function() {
        var a = $(".js-topics");
        a.addClass("is-open")
    },
    topPickupHeight: function() {
        var b = $(".js-elemHeight01");
        if (b.length) {
            var f = "";
            var c = "";
            var a = b.length;
            var d = 0;
            var e = 0;
            for (; a > d; d++) {
                f = b.eq(d - 1).find(".picktxt-wrap");
                c = f.innerHeight() + 40;
                if (c > e) {
                    e = c
                }
            }
            b.innerHeight(e)
        }
    },
    noScroll: function() {
        var a = "onwheel" in document ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";
        $(document).on(a, function(b) {
            b.preventDefault()
        });
        $(document).on("touchmove.noScroll", function(b) {
            b.preventDefault()
        })
    },
    returnScroll: function() {
        var a = "onwheel" in document ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";
        $(document).off(a);
        $(document).off(".noScroll")
    },
    openingStart: function(b) {
        var a = this;
        this.BUBBLE_FLAG2 = 0;
        setTimeout(function() {
            a.bubble()
        }, 10);
        setTimeout(function() {
            var c = $(document.getElementById("bg-wrap"));
            c.css({
                "z-index": "999999999",
                display: "block"
            });
            setTimeout(function() {
                c.addClass("load-start");
                if (b) {
                    a.openingEnd();
                    a.$htmlBody.scrollTop(0)
                }
            }, 150)
        }, 50)
    },
    openingEnd: function(b) {
        var a = this;
        var c = $(document.getElementById("bg-wrap"));
        setTimeout(function() {
            c.removeClass("load-start");
            setTimeout(function() {
                $("#contents").css({
                    transform: "translate(0)"
                })
            }, 500);
            setTimeout(function() {
                $("#contents").css({
                    transform: "initial"
                })
            }, 600);
            setTimeout(function() {
                c.css({
                    "z-index": "-1",
                    display: "none"
                });
                a.topicsOpen();
                a.openAnmRemove();
                if (b) {
                    a.initAnmEnd()
                }
            }, 1650)
        }, 350)
    },
    openingStart02: function(b, c) {
        var a = this;
        var d = $(document.getElementById("bg-wrap"));
        d.css({
            "z-index": "999999999",
            display: "block"
        }).stop().addClass("load-start02");
        setTimeout(function() {
            $("#contents,nav").css({
                opacity: 1
            });
            setTimeout(function() {
                a.$htmlBody.scrollTop(0);
                if (b) {
                    $(".age_logo").css("opacity", 1);
                    a.openingEnd02(c);
                    if (localStorage.getItem("ageVerified") == "true") {
                        a.mainSlider();
                        a.mainSlider02();
                        a.mainSlider03()
                    }
                }
            }, 2100)
        }, 400)
    },
    openingEnd02: function(b) {
        var a = this;
        var c = $(document.getElementById("bg-wrap"));
        c.removeClass("load-start02");
        setTimeout(function() {
            $("#contents").css({
                transform: "translateY(0)"
            })
        }, 500);
        setTimeout(function() {
            $("#contents").css({
                transform: "initial"
            })
        }, 600);
        setTimeout(function() {
            c.css({
                "z-index": "-1",
                display: "none"
            });
            if (localStorage.getItem("ageVerified") == "true") {
                a.topicsOpen()
            }
            a.openAnmRemove();
            if (b) {
                a.init01()
            }
        }, 1650)
    },
    mainSlider: function() {
        var a = this;
        if ($("#contents").hasClass("top-contents")) {
            this.SWIPER_FLAG = 1
        }
        this.MY_SWIPER = new Swiper(".top-contents .swiper-container", {
            setWrapperSize: true,
            slidesPerView: 1,
            loop: true,
            speed: 1000,
            pagination: ".pagination-main-slider",
            paginationClickable: true,
            effect: "fade",
            fade: {
                crossFade: true
            },
            direction: "horizontal",
            loopAdditionalSlides: 0,
            onSlideChangeStart: function() {
                if (a.UA == "ie") {} else {
                    $(".swiper-slide-active").find("img").add(".swiper-slide-duplicate-active").css({
                        transition: "all 0s",
                        transform: "translateY(-50%) rotate3d(0,1.5,0.2,-40deg)",
                        opacity: 0
                    });
                    $(".swiper-slide").not(".swiper-slide-active").find("img").css({
                        transition: "all .4s ease-in-out",
                        transform: "translateY(-50%) rotate3d(0,1.5,0.2,-40deg)",
                        opacity: 0
                    })
                }
            },
            onTransitionEnd: function() {
                if (a.UA == "ie") {} else {
                    $(".swiper-slide-active").add(".swiper-slide-duplicate-active").find("img").css({
                        transition: "all .4s ease-in-out",
                        "margin-top": "0px",
                        transform: "translateY(-50%) rotate3d(0,0,0,0deg)",
                        opacity: 1
                    })
                }
            },
            autoplay: 4500
        })
    },
    mainSlider02: function() {
        if ($("#contents").hasClass("schedule-contents-top")) {
            this.SWIPER_FLAG2 = 1
        }
        this.MY_SWIPER2 = new Swiper(".schedule-contents-top .swiper-container", {
            slidesPerView: 1,
            setWrapperSize: true,
            direction: "horizontal",
            loop: true,
            speed: 2500,
            pagination: ".pagination-main-slider",
            paginationClickable: true,
            effect: "fade",
            loopAdditionalSlides: 0,
            onSlideChangeStart: function() {
                $(".swiper-slide-active").find("img").add(".swiper-slide-duplicate-active").css({
                    transition: "all 0s",
                    transform: "translateY(-50%) rotate3d(0,1.5,0.2,-40deg)",
                    opacity: 0
                });
                $(".swiper-slide").not(".swiper-slide-active").find("img").css({
                    transition: "all .5s ease-in-out",
                    transform: "translateY(-50%) rotate3d(0,1.5,0.2,-40deg)",
                    opacity: 0
                })
            },
            onTransitionEnd: function() {
                $(".swiper-slide-active").add(".swiper-slide-duplicate-active").find("img").css({
                    transition: "all .5s ease-in-out",
                    "margin-top": "0px",
                    transform: "translateY(-50%) rotate3d(0,0,0,0deg)",
                    opacity: 1
                })
            },
            fade: {
                crossFade: true
            },
            autoplay: 3000
        })
    },
    mainSlider03: function() {
        if ($("#contetns").hasClass("thisisliving-top-contents")) {
            this.SWIPER_FLAG3 = 1
        }
        if ($(".thisisliving-top-contents .swiper-container").find(".swiper-slide").length > 1) {
            this.MY_SWIPER3 = new Swiper(".thisisliving-top-contents .swiper-container", {
                slidesPerView: 1,
                setWrapperSize: true,
                direction: "horizontal",
                loop: true,
                speed: 2500,
                effect: "fade",
                fade: {
                    crossFade: true
                },
                pagination: ".til-slider-pagination",
                paginationClickable: true,
                autoplay: 3000
            })
        } else {
            $(".l-wrap_mvSliderBtns_tit").remove()
        }
    },
    setInview: function() {
        $(".inview-wrap").on("inview", function(b, a) {
            $(this).find(".inview").delay(200).addClass("isFadeIn")
        })
    },
    menu: function() {
        var b = this;
        var a = $(document.getElementById("menuTrigger"));
        var c = a.find(".menu-trigger");
        a.on("click", function() {
            if (c.hasClass("active")) {
                b.menuClose($(this))
            } else {
                b.menuOpen($(this))
            }
        });
        $(window).keyup(function(d) {
            if (d.keyCode == 77) {
                if (c.hasClass("active")) {
                    b.menuClose(a)
                } else {
                    b.menuOpen(a)
                }
            }
            if (d.keyCode == 27) {
                b.menuClose(a)
            }
        })
    },
    menuOpen: function(d) {
        var b = d;
        var c = b.find(".menu-trigger");
        var a = $(document.getElementById("gNav"));
        c.addClass("active");
        a.addClass("is-open");
        b.stop().css({
            transform: "translateX(-260px)"
        })
    },
    menuClose: function(d) {
        var b = $(document.getElementById("menuTrigger"));
        var c = b.find(".menu-trigger");
        var a = $(document.getElementById("gNav"));
        c.removeClass("active");
        a.removeClass("is-open");
        b.stop().css({
            transform: "translateX(0px)"
        })
    },
    smoothSCR: function() {
        var a = this;
        if (this.PAGE_KIND == "page-top-page") {
            $(".js-about-scroll").addClass("scroll")
        } else {
            $(".js-about-scroll").removeClass("scroll");
            $(".js-about-scroll").off("click")
        }
        $(".scroll").off("click");
        setTimeout(function() {
            $(".scroll").on("click", function() {
                a.SCRAction($(this));
                return false
            })
        }, 10)
    },
    SCRAction: function(g) {
        var c = this;
        var f = g;
        var d = "";
        if (this.DEVICE = "PC") {
            d = 400
        } else {
            d = 200
        }
        var b = f.attr("data-href");
        if (b == "#top" || b == "/#top") {
            b = "#top"
        }
        var e = $(b == "#" || b == "" ? "html" : b);
        var a = "";
        if (b == "#top") {
            a = 0
        } else {
            a = e.offset().top
        }
        this.noScroll();
        if (b == "#section05") {
            d = 650;
            this.menuClose();
            setTimeout(function() {
                c.$htmlBody.animate({
                    scrollTop: a
                }, d, "easieEaseOutQuad");
                setTimeout(function() {
                    c.returnScroll()
                }, 600)
            }, 450)
        } else {
            c.$htmlBody.animate({
                scrollTop: a
            }, d, "easieEaseOutQuad", function() {
                setTimeout(function() {
                    c.returnScroll()
                }, 600)
            })
        }
    },
    scheduleAccordion: function() {
        var a = $(".arrow");
        a.click(function(c) {
            var b = $("#main_menu li").children("ul");
            if ($(b).css("opacity") == 0) {
                $(b).animate({
                    height: "136px",
                    opacity: "1"
                })
            } else {
                $(b).animate({
                    height: "0px",
                    opacity: "0"
                })
            }
        })
    },
    openAnmRemove: function() {
        $(".bg-wrap").remove()
    },
    heightMix: function() {
        $(".mix").matchHeight({
            byRow: false
        });
        $(window).on("resize", function() {
            $(".mix").matchHeight({
                byRow: false
            })
        })
    },
    mainVisualAnm: function() {
        var d = this;
        var b = "";
        var a = "";
        var e = "";
        var c = "";
        if (this.DEVICE == "PC") {
            $(window).on("scroll resize onMaximize onMinimize", function() {
                b = $(".js-first-section").innerHeight();
                a = $(window).scrollTop();
                var f = $(".js-bg");
                if ((b - a * 1.8) / b >= 0.1) {
                    e = (b - a * 1.8) / b
                } else {
                    e = 0.1
                }
                if ((b - a / 3) / b > 0.83) {
                    c = (b - a / 3) / b
                } else {
                    c = 0.83
                }
                if (d.PAGE_KIND == "page-top-page") {
                    f.css({
                        opacity: e,
                        "margin-top": (1 - c) * (400) + "px"
                    })
                } else {
                    f.css({
                        opacity: e,
                        "-mos-transform": "scale(" + c * 1 + ")",
                        "-webkit-transform": "scale(" + c * 1 + ")",
                        transform: "scale(" + c * 1 + ")"
                    })
                }
            })
        }
    },
    bubble: function() {
        var a = this;
        if (this.BUBBLE_FLAG2 == 0) {
            var b = '<div id="bg-wrap" class="bg-wrap"><div class="bubble-wrap"><p class="load-logo"><!--<img src="../Artista/The_Elements/Images/Icons/Logos/Isambo.svg" width="114" height="77" alt="Isambo Blog">--></p></div></div>';
            this.$body.prepend(b);
            if (!this.BUBBLE_FLAG) {
                setTimeout(function() {
                    var f = "";
                    var f = [];
                    var c = [4, 6, 8, 10, 12];
                    for (var e = 0; e < $(".bubble-wrap").width(); e++) {
                        f.push(e)
                    }

                    function d(g) {
                        return g[Math.floor(Math.random() * g.length)]
                    }
                    setInterval(function() {
                        var g = d(c);
                        $(".bubble-wrap").append('<div class="individual-bubble" style="left: ' + d(f) + "px; width: " + g + "px; height:" + g + 'px;"></div>');
                        $(".individual-bubble").animate({
                            bottom: "100%",
                            opacity: "-=1"
                        }, 600, function() {
                            $(this).remove()
                        });
                        a.BUBBLE_FLAG = true
                    }, 250)
                }, 100)
            }
        }
        this.BUBBLE_FLAG2++
    },
    imgRelaod: function(g, c, b) {
        var f = this;
        if (this.UA = "firefox") {
            var e = $("#contents").find("img");
            var a = e.length;
            var d = 0;
            e.each(function() {
                var h = $(this).attr("src");
                $(this).attr("src", h + "?" + (new Date()).getTime());
                d++;
                if (a <= d) {
                    g();
                    setTimeout(function() {
                        f.openingEnd(b)
                    }, 600)
                }
            })
        } else {
            g();
            setTimeout(function() {
                f.openingEnd(b)
            }, 600)
        }
    },
    ageCheck: function() {
        if (this.PAGE_KIND == "page-corona-escape-campaign") {
            var f = $(".modal");
            var e = $(".close_modal");
            var a = 120;
            var d = $.cookie("modal");
            if (d !== "off") {
                var b = $("<div></div>");
                b.css({
                    position: "fixed",
                    "z-index": 99999,
                    top: 0,
                    left: 0,
                    height: 100 + "%",
                    width: 100 + "%",
                    "background-color": "rgba(13, 34, 63,0.9)"
                });
                this.body.append(b);
                f.stop().delay(500).fadeIn(400);
                $(".modal p").css({
                    opacity: 1
                });
                $(".modal a").css({
                    opacity: 1
                })
            }
            e.click(function() {
                $(b).fadeOut("slow");
                $(".modal p").hide();
                $(".modal a").hide();
                $(f).hide();
                var g = new Date();
                g.setTime(g.getTime() + (a * 60 * 1000));
                $.cookie("modal", "off", {
                    expires: g,
                    path: "/"
                })
            });
            $(".remove_cookie").click(function() {
                $.removeCookie("modal", {
                    expires: -1,
                    path: "/"
                });
                location.reload()
            })
        } else {
            var c = $("select").val();
            $("select").on("change", function() {
                c = $(this).val()
            });
            $("#btn_yes").on("click", function() {
                sessionStorage.clear();
                $.ageCheck({
                    minAge: c
                })
            });
            $.ageCheck({
                minAge: c
            })
        }
    },
    metaTW: function() {
        var a = '<meta class="js-tw-meta" name="twitter:card" content="summary" /><meta class="js-tw-meta" name="twitter:site" content="Corona Extra - コロナ・エキストラ / コロナビール公式サイト" />';
        switch (this.PAGE_KIND) {
            case "page-corona-session":
                a += '<meta class="js-tw-meta" name="twitter:title" content="CORONA SUNSETS SESSIONS | Corona Extra - コロナ・エキストラ / コロナビール公式サイト" /><meta class="js-tw-meta" name="twitter:description" content="Corona Extra - コロナ・エキストラ / コロナビール公式サイト" /><meta class="js-tw-meta" name="twitter:image" content="http://corona-extra.jp/image/og-session.png" /><meta class="js-tw-meta" name="twitter:url" content="http://corona-extra.jp/event/corona-session/" />';
                break;
            case "page-corona-winter":
                a += '<meta class="js-tw-meta" name="twitter:title" content="CORONA WINTER ESCAPE | Corona Extra - コロナ・エキストラ / コロナビール公式サイト" /><meta class="js-tw-meta" name="twitter:description" content="この冬コロナが提案するのは冬を満喫しまくる様々な過ごし方。仲間を誘って外に出て、冬をとことん味わおう。" /><meta class="js-tw-meta" name="twitter:image" content="http://corona-extra.jp/image/og-winter.png" /><meta class="js-tw-meta" name="twitter:url" content="http://corona-extra.jp/event/corona-winter/" />';
                break;
            case "page-corona-escape-campaign":
                a += '<meta class="js-tw-meta" name="twitter:title" content="CORONA ESCAPE CAMPAIGN | Corona Extra - コロナ・エキストラ / コロナビール公式サイト" /><meta class="js-tw-meta" name="twitter:description" content="CORONA ESCAPE LODGEに5組をご招待するプレゼントキャンペーンがスタート！" /><meta class="js-tw-meta" name="twitter:image" content="http://corona-extra.jp/image/og-campaign.png" /><meta class="js-tw-meta" name="twitter:url" content="http://corona-extra.jp/event/corona-escape-campaign/" />';
                break;
            case "page-thisisliving-detail_01":
                a += '<meta class="js-tw-meta" name="twitter:title" content="THIS IS LIVING | 宮原秀雄 〜ボーダーレスなワークスタイル〜" /><meta class="js-tw-meta" name="twitter:description" content="THIS IS LIVING | 宮原秀雄 〜ボーダーレスなワークスタイル〜" /><meta class="js-tw-meta" name="twitter:image" content="http://corona-extra.jp/image/thisisliving/detail_01/og.png" /><meta class="js-tw-meta" name="twitter:url" content="http://corona-extra.jp/thisisliving/detail_01/" />';
                break;
            case "page-summejourney":
                a += '<meta class="js-tw-meta" name="twitter:title" content="CORONA SUMMER JOURNEY | Corona Extra - コロナ・エキストラ / コロナビール公式サイト" /><meta class="js-tw-meta" name="twitter:description" content="本格的な夏の到来。暑さから逃れてエアコンの効いた部屋に籠るより、気の合う仲間と、ビーチやアウトドアで、思いきり夏を楽しむのが「Corona Summer Journey」。" /><meta class="js-tw-meta" name="twitter:image" content="http://corona-extra.jp/image/og-journey.png" /><meta class="js-tw-meta" name="twitter:url" content="http://corona-extra.jp/event/summer-journey/" />';
                break;
            default:
                a += '<meta class="js-tw-meta" name="twitter:title" content="Corona Extra - コロナ・エキストラ / コロナビール公式サイト" /><meta class="js-tw-meta" name="twitter:description" content="世界で最も飲まれているリゾートビール、Corona Extra公式サイト。" /><meta class="js-tw-meta" name="twitter:image" content="http://corona-extra.jp/image/og.png" /><meta class="js-tw-meta" name="twitter:url" content="http://corona-extra.jp/" />'
        }
        $(".js-tw-meta").remove();
        $("head").append(a)
    },
    gaSet: function() {
        if (!window.ga) {
            (function(d, e, j, h, f, c, b) {
                d.GoogleAnalyticsObject = f;
                d[f] = d[f] || function() {
                    (d[f].q = d[f].q || []).push(arguments)
                }, d[f].l = 1 * new Date();
                c = e.createElement(j), b = e.getElementsByTagName(j)[0];
                c.async = 1;
                c.src = h;
                b.parentNode.insertBefore(c, b)
            })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
            ga("create", "UA-63836587-1", "auto");
            ga("send", "pageview")
        }
        ga("send", "pageview", window.location.pathname.replace(/^\/?/, "/") + window.location.search)
    },
    snsLogFBC: function() {
        if (!window.fbq) {
            ! function(h, a, i, c, j, d, g) {
                if (h.fbq) {
                    return
                }
                j = h.fbq = function() {
                    j.callMethod ? j.callMethod.apply(j, arguments) : j.queue.push(arguments)
                };
                if (!h._fbq) {
                    h._fbq = j
                }
                j.push = j;
                j.loaded = !0;
                j.version = "2.0";
                j.queue = [];
                d = a.createElement(i);
                d.async = !0;
                d.src = c;
                g = a.getElementsByTagName(i)[0];
                g.parentNode.insertBefore(d, g)
            }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
            fbq("init", "1918761921685228");
            fbq("track", "PageView")
        }
        fbq("track", "PageView", window.location.pathname.replace(/^\/?/, "/") + window.location.search)
    },
    setTracking01: function() {
        (function() {
            var a = window,
                e = document;
            var b = e.createElement("script");
            b.setAttribute("async", "true");
            b.setAttribute("type", "text/javascript");
            b.setAttribute("src", "//c1.rfihub.net/js/tc.min.js");
            var c = e.getElementsByTagName("script")[0];
            c.parentNode.insertBefore(b, c);
            if (typeof a._rfi !== "function") {
                a._rfi = function() {
                    a._rfi.commands = a._rfi.commands || [];
                    a._rfi.commands.push(arguments)
                }
            }
            _rfi("setArgs", "ver", "9");
            _rfi("setArgs", "rb", "29754");
            _rfi("setArgs", "ca", "20761891");
            _rfi("setArgs", "_o", "29754");
            _rfi("setArgs", "_t", "20761891");
            _rfi("track")
        })()
    },
    setLine: function() {
        var a = a || {};
        if (a.segment === void 0) {
            a.segment = {}
        }
        if (a.segment.queue === void 0) {
            a.segment.queue = []
        }
        a.segment.queue.push({
            user_id: 13867,
            advertiser_id: 3194,
            contractor_id: 5
        });
        (function() {
            var c = document.createElement("script");
            c.type = "text/javascript";
            c.async = true;
            c.src = (("https:" == document.location.protocol) ? "https://" : "http://") + "js.fout.jp/segmentation.js";
            var b = document.getElementsByTagName("script")[0];
            b.parentNode.insertBefore(c, b)
        })()
    },
    init01: function() {
        this.setInview();
        this.scheduleAccordion()
    },
    init02: function() {
        this.menuClose();
        this.pageKind()
    },
    initAnmEnd: function() {
        this.setInview();
        this.heightMix();
        this.scheduleAccordion()
    },
    modalExtra: function() {
        var current_scrollY;
        $('.modal-syncer').on("click", function() {
            console.log('modal-click');
            current_scrollY = $(window).scrollTop();
            $('body').css({
                transition: 'none',
                position: 'fixed',
                width: '100%',
                top: -1 * current_scrollY
            });
            var selector = $(this).attr('data-modal');
            $('.modal_wrap').addClass('open');
            $('.modal_cnts').fadeIn('normal');
            $(selector).addClass('current');
            $('#youtube-mov-03').attr('src', '//www.youtube.com/embed/' + $('.mSRC-03').data('src') + '?showinfo=0');
            $('#youtube-mov-02').attr('src', '//www.youtube.com/embed/' + $('.mSRC-02').data('src') + '?showinfo=0');
            $('#youtube-mov-01').attr('src', '//www.youtube.com/embed/' + $('.mSRC-01').data('src') + '?showinfo=0');
        });

        function modal_close() {
            $(".modal_cnts").fadeOut('normal');
            $(".modal_cnts").removeClass('current');
            $('.modal_wrap').removeClass('open');
            $('body').attr({ style: ' transition: none;' });
            $('html, body').prop({ scrollTop: current_scrollY });
            $('#youtube-mov-03').attr('src', '');
            $('#youtube-mov-02').attr('src', '');
            $('#youtube-mov-01').attr('src', '');
        }
        $(".btn_close, .ovrly").on("click", function() {
            modal_close();
        })
    },

    topBnr: function() {
        $(window).on('load scroll', function() {
            if ($('.top-contents #section01').length) {
                var scrTop = $(window).scrollTop();
                var offSet = $('.top-contents #section01').offset().top;
                if (scrTop > (offSet + 100)) {
                    $('.ticket-bnr').addClass('none');
                } else {
                    $('.ticket-bnr').removeClass('none');
                }
            } else {
                return false;
            }
        });

    },

    // sample: function() {
    //     $(window).on('scroll load', function() {
    //         if($('#top #section01').length) {
    //             console.log('find');
    //         } else {
    //             console.log('not');
    //         }
    //     });
    // },

    topBnrSp: function() {
        $('body.sp .side-default').on('click', function() {
            if ($('body.sp .ticket-bnr').hasClass('spActive')) {
                $('body.sp .ticket-bnr').removeClass('spActive');
                $('body.sp .ticket-bnr a').velocity(
                    'fadeOut', {
                        duration: 500,
                        easing: [.27, 0, .26, 1],
                        complete: function() {
                            $('body.sp .ticket-bnr').velocity({
                                width: 46,
                                duration: 100,
                                easing: [.27, 0, .26, 1]
                            });
                        }
                    });
            } else {
                $('body.sp .ticket-bnr').addClass('spActive');
                $('body.sp .ticket-bnr').velocity({
                    width: 326,
                    duration: 100,
                    easing: [.27, 0, .26, 1],
                    complete: function() {
                        $('body.sp .ticket-bnr a').velocity(
                            'fadeIn', {
                                delay: 800,
                            });
                    }
                });
            }
        });
    },

    // CTS function


    ctsStart: function() {
        setTimeout(function() {
            $('#cts-cont').css('opacity', '1');
        }, 2000);
        setTimeout(function() {
            $('.bnr-event').addClass('bouce');
        }, 4500);
    },
    ctsVh: function() {
        var H = window.innerHeight;
        // console.log(H);
        $('.sp .sec-mv').css('height', H);
    },

    ctsMenu: function() {
        $('#cts-cont #triggerMenu').on('click', function() {
            var $this = $(this).find('.menu-trigger');
            if ($this.hasClass('active')) {
                $this.stop().removeClass('active');
                $("body").stop().removeClass('menu_on');
                menuEfCl();
            } else {
                $this.stop().addClass('active');
                $("body").stop().addClass('menu_on');
                menuEf();
            }
        });

        $('.sp #cts-cont nav li a').on('click', function() {
            $('#cts-cont #triggerMenu .menu-trigger').stop().removeClass('active');
            $("body").stop().removeClass('menu_on');
            menuEfCl();
            // console.log('click');
        });

        function menuEf() {
            $('#page-cts nav').velocity(
                'fadeIn', {
                    duration: 200,
                    easing: [.27, 0, .26, 1],
                    complete: function() {
                        var i = 1;
                        $('#page-cts nav li').each(function(i) {
                            $(this).delay(50 * i).velocity({
                                translateX: 0,
                                opacity: 1
                            }, {
                                duration: 400,
                                easing: [.27, 0, .26, 1]
                            });
                            i++;
                        });
                    }
                });
        }

        function menuEfCl() {
            $('#page-cts nav').velocity(
                'fadeOut', {
                    duration: 200,
                    easing: [.27, 0, .26, 1],
                    complete: function() {
                        var i = 1;
                        $('#page-cts nav li').each(function(i) {
                            $(this).delay(0 * i).velocity({
                                translateX: -10,
                                opacity: 0
                            }, {
                                duration: 400,
                                easing: [.27, 0, .26, 1]
                            });
                            i++;
                        });
                    }
                });
        }
    },

    ctsMenusc: function() {
        if ($('body.pc #cts-cont').length) {
            $(window).scroll(function() {
                //セクション２から３の間はこれ
                if ($(window).scrollTop() > $('#about').offset().top && 　$(window).scrollTop() < $('#event').offset().top) {
                    $("#cts-cont nav li a").css("color", "#fff");
                } //セクション３より進んだらこれ
                else if ($(window).scrollTop() > $('#event').offset().top) {
                    $("#cts-cont nav li a").css("color", "#00295f");
                } else //それ以外（つまりセクション１である場合）はこれ
                    $("#cts-cont nav li a").css("color", "#fff");
            });

        }
    },

    ctsSmscrl: function() {
        // $("a[href^=#]").on('click', function() {
        //     var targetY = $(this.hash).offset().top;
        //     $("html,body").animate({ scrollTop: targetY }, 400);
        //     return false;
        // });
        $("a").on('click', function(event) {
            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 400, function() {
                    window.location.hash = hash;
                });
            }
        });
    },

    setPjax: function() {
        var a = this;
        $.pjax({
            area: "#contents",
            link: ".link-pjax:not([target])",
            cache: {
                click: false,
                submit: false,
                popstate: false
            },
            ajax: {
                timeout: 2700
            },
            wait: 1650,
            load: {
                head: "base, meta, link",
                css: false,
                script: false
            }
        });
        $(document).bind("pjax:fetch", function() {
            a.openingStart();
        });
        $(document).bind("pjax:render", function() {
            a.modalExtra();
            a.setLine();
            a.metaTW();
            a.ua();
            a.init02();
            switch (a.PAGE_KIND) {
                case "page-top-page":
                    a.topBnr();
                    a.topBnrSp();
                    break;
                case "page-corona-session":
                    a.snsLogFBC();
                    a.setTracking01();
                    break;
                case "page-corona-winter":
                    a.snsLogFBC();
                    a.setTracking01();
                    // a.winterAnchor();
                    // a.winterNavFixed();
                    break;
                case "page-corona-escape-campaign":
                    a.snsLogFBC();
                    a.setTracking01();
                    break;
                case "page-summer-journey":
                    a.snsLogFBC();
                    a.setTracking01();
                    break
            }
            a.smoothSCR();
            a.imgRelaod(b, a.openingEnd, a.initAnmEnd);
            setTimeout(function() {
                $("#contents,nav").css({
                    opacity: 1
                })
            }, 200);

            function b() {
                if ($("#contents").hasClass("top-contents")) {
                    if (a.SWIPER_FLAG == 1) {
                        a.SWIPER_FLAG = 1
                    } else {
                        a.SWIPER_FLAG = -1
                    }
                } else {
                    a.SWIPER_FLAG = 0
                }
                if (a.SWIPER_FLAG == 1) {
                    setTimeout(function() {
                        a.mainSlider()
                    }, 50)
                }
                if (a.SWIPER_FLAG == -1) {
                    a.mainSlider()
                }
                if ($("#contents").hasClass("schedule-contents-top")) {
                    if (a.SWIPER_FLAG2 == 1) {
                        a.SWIPER_FLAG2 = 1
                    } else {
                        a.SWIPER_FLAG2 = -1
                    }
                } else {
                    a.SWIPER_FLAG2 = 0
                }
                if (a.SWIPER_FLAG2 == 1) {
                    setTimeout(function() {
                        a.mainSlider02()
                    }, 50)
                }
                if (a.SWIPER_FLAG2 == -1) {
                    a.mainSlider02()
                }
                if ($("#contents").hasClass("thisisliving-top-contents")) {
                    if (a.SWIPER_FLAG3 == 1) {
                        a.SWIPER_FLAG3 = 1
                    } else {
                        a.SWIPER_FLAG3 = -1
                    }
                } else {
                    a.SWIPER_FLAG3 = 0
                }
                if (a.SWIPER_FLAG3 == 1) {
                    setTimeout(function() {
                        a.mainSlider03()
                    }, 50)
                }
                if (a.SWIPER_FLAG3 == -1) {
                    a.mainSlider03()
                }
            }
        })
    }
};
$(window).on("load", function() {
    CORONA.common = new CORONA.Common()
});