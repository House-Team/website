(function ($) {
    'use strict';

    var browserWindow = $(window);

    // :: 1.0 Preloader Active Code
    browserWindow.on('load', function () {
        $('.preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    // :: 2.0 Nav Active Code
    if ($.fn.classyNav) {
        $('#alazeaNav').classyNav();
    }

    // :: 3.0 Search Active Code
    $('#searchIcon').on('click', function () {
        $('.search-form').toggleClass('active');
    });
    $('.closeIcon').on('click', function () {
        $('.search-form').removeClass('active');
    });

    // :: 4.0 Sliders Active Code
    if ($.fn.owlCarousel) {
        var welcomeSlide = $('.hero-post-slides');
        var testiSlides = $('.testimonials-slides');
        var portfolioSlides = $('.portfolio-slides');

        welcomeSlide.owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: false,
            dots: false,
            autoplay: true,
            center: true,
            autoplayTimeout: 9000,
            smartSpeed: 1000
        });

        testiSlides.owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 700,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut'
        });

        portfolioSlides.owlCarousel({
            items: 2,
            margin: 30,
            loop: true,
            nav: true,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            dots: true,
            autoplay: false,
            autoplayTimeout: 5000,
            smartSpeed: 900,
            center: true
        });
    }

    // :: 6.0 magnificPopup Active Code
    if ($.fn.magnificPopup) {
        $('.portfolio-img, .product-img').magnificPopup({
            gallery: {
                enabled: true
            },
            type: 'image'
        });
        $('.video-icon').magnificPopup({
            type: 'iframe'
        });
    }

    // :: 7.0 Barfiller Active Code
    if ($.fn.barfiller) {
        $('#bar1').barfiller({
            tooltip: true,
            duration: 1000,
            barColor: '#70c745',
            animateOnResize: true
        });
        $('#bar2').barfiller({
            tooltip: true,
            duration: 1000,
            barColor: '#70c745',
            animateOnResize: true
        });
        $('#bar3').barfiller({
            tooltip: true,
            duration: 1000,
            barColor: '#70c745',
            animateOnResize: true
        });
        $('#bar4').barfiller({
            tooltip: true,
            duration: 1000,
            barColor: '#70c745',
            animateOnResize: true
        });
    }

    // :: 8.0 ScrollUp Active Code
    if ($.fn.scrollUp) {
        browserWindow.scrollUp({
            scrollSpeed: 1500,
            scrollText: '<i class="fa fa-angle-up"></i>'
        });
    }

    // :: 9.0 CounterUp Active Code
    if ($.fn.counterUp) {
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        });
    }



    // :: 11.0 Tooltip Active Code
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip()
    }

    // :: 12.0 Price Range Active Code
    $('.slider-range-price').each(function () {
        var min = jQuery(this).data('min');
        var max = jQuery(this).data('max');
        var unit = jQuery(this).data('unit');
        var value_min = jQuery(this).data('value-min');
        var value_max = jQuery(this).data('value-max');
        var label_result = jQuery(this).data('label-result');
        var t = $(this);
        $(this).slider({
            range: true,
            min: min,
            max: max,
            values: [value_min, value_max],
            slide: function (event, ui) {
                var result = label_result + " " + unit + ui.values[0] + ' - ' + unit + ui.values[1];
                console.log(t);
                t.closest('.slider-range').find('.range-price').html(result);
            }
        });
    })

    // :: 13.0 prevent default a click
    $('a[href="#"]').on('click', function ($) {
        $.preventDefault();
    });


    if ($.fn.sticky) {
        $(".alazea-main-menu").sticky({
            topSpacing: 0,
            className: "is-sticky"
        });
    }
    // :: 14.0 wow Active Code
    if (browserWindow.width() > 767) {
        new WOW().init();
    }

    browserWindow.scroll(function(){

        let scrollVal = $(this).scrollTop();

        let elemText = document.getElementById('text-style-hash');

        $(elemText).css({
            'transform': 'translate(0, -'+ scrollVal / 2 +'px)',
        })

        if(scrollVal >= 90){
            $(elemText).css({
                'transition': 'all ease 200ms',
                'opacity': '0'
            })
        }else if(scrollVal <= 0){
            $(elemText).css({
                'opacity': '1'
            })
        }

        // :: 10.0 Sticky Active Code
        

    })

    // contact chatter
    let msgHelper = $('#msg-help');
    msgHelper.on('click', function(){
        $('.chat-wrapper').css({
            'display': 'block',
            'opacity': '1'
        })
        $(this).css({
            'opacity': '0',
            'display': 'none'
        })
    })

    $('#close-chat-wrapper').on('click', function(){
        $('.chat-wrapper').css({
            'display': 'none'
        })
        $(msgHelper).css({
            'display': 'none'
        }) 
    })

    $('#minimize-chat-wrapper').on('click', function(){
        $('.chat-wrapper').css({
            'display': 'none',
        })
        $(msgHelper).css({
            'display': 'block',
            'opacity': '1'
        })
    })

})(jQuery);
