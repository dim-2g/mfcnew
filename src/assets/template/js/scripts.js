$(function() {

    $('[data-mask]').each(function() {
        input = $(this);
        mask = input.attr('data-mask');
        input.inputmask({"mask": mask});
    });
    
    $('body').on('click', '[data-goto]', function(e) {
        e.preventDefault();
        var selector = $(this).attr('data-goto');
        $('.mobile-menu').slideUp();
        $('html, body').animate({ scrollTop: $(selector).offset().top}, 1200);
    });

    $('body').on('click', '.footer-menu__caption', function (e) {
       $(this).parents('.footer-menu__block').toggleClass('open');
    });

    $('body').on('click', '.mobile-menu__arrow', function (e) {
        e.preventDefault();
        $(this).parent().addClass('open');
     });

    $('.toggle-menu').on('click', function () {
        $('.mobile-menu').slideToggle();
    });

    $('body').on('click', '.mobile-menu__arrow', function (e) {
        e.preventDefault();
        $(this).parents('li').toggleClass('open');
    });

    $('body').on('click', '.toggle-mobil-menu', function(e) {
        e.preventDefault();
        $('body').toggleClass('open-mobile-menu');
        setMobileMenuHeight();
    });
    
    $('body').on('click', '.main-about__more', function (e) {
        e.preventDefault();
        console.log('click');
        $('.main-about__content').toggleClass('open');
    });

     

    $('[data-toggle]').on('click', function (e) {
        e.preventDefault();

        $(this).toggleClass('active');
        var selector = $(this).attr('data-toggle');
        console.log('toggle  '+selector);
        $(selector).slideToggle();
        //$(this).toggleClass('active');
    });

    initPartnersSlider();
    initGratefulSlider();
    initMainNewsSlider();
    initMainReviewsSlider();
});

setMobileMenuHeight = function() {
    var height = $(window).height();
    var topMenuHeight = $('.mobile-menu__top').outerHeight();
    $('.mobile-menu__list').css({"max-height": height-topMenuHeight})
    console.log(height);
}

var partners_slider = false;
initPartnersSlider = function() {
    selector = '.partners-slider';
    if ($(window).width()<1150) {
        if (!partners_slider) {
            $(selector).slick({
                'autoplay': false,
                'arrows': true,
                'dots': false,
                'slidesToShow': 5,
                'slidesToScroll': 1,
                'initialSlide': 1,
                'infinite': true,
                'responsive': [
                    {
                        breakpoint: 1000,
                        settings: {
                            slidesToShow: 4,
                        }
                    },
                    {
                        breakpoint: 750,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 550,
                        settings: {
                            slidesToShow: 2,
                        }
                    }
                ]
            });
            partners_slider = true;
        }
    } else {
        if (partners_slider) {
            $(selector).slick('unslick');
            partners_slider = false;
        }
    }
};

var slider_grateful = false;
initGratefulSlider  = function() {
    if (!slider_grateful) {
        $('.grateful-slider').slick({
            'autoplay': false,
            'arrows': true,
            'dots': false,
            'slidesToShow': 2,
            'slidesToScroll': 1,
            'adaptiveHeight': false,
            'responsive': [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        });
        slider_grateful = true;
    }
};

var main_news_slider = false;
initMainNewsSlider = function() {
    selector = '.main-news-slider';
    if ($(window).width()<1000) {
        if (!main_news_slider) {
            $(selector).slick({
                'autoplay': false,
                'arrows': true,
                'dots': false,
                'slidesToShow': 2,
                'slidesToScroll': 1,
                'initialSlide': 1,
                'infinite': true,
                'adaptiveHeight': true
            });
            main_news_slider = true;
        }
    } else {
        if (main_news_slider) {
            $(selector).slick('unslick');
            main_news_slider = false;
        }
    }
};

var main_reviews_slider = false;
initMainReviewsSlider = function() {
    selector = '.main-reviews-slider';
    if ($(window).width()<1000) {
        if (!main_reviews_slider) {
            $(selector).slick({
                'autoplay': false,
                'arrows': true,
                'dots': false,
                'slidesToShow': 1,
                'slidesToScroll': 1,
                'initialSlide': 1,
                'infinite': true,
                'adaptiveHeight': true
            });
            main_reviews_slider = true;
        }
    } else {
        if (main_reviews_slider) {
            $(selector).slick('unslick');
            main_reviews_slider = false;
        }
    }
};

var doit;
$(window).resize(function(){
    clearTimeout(doit);
    doit = setTimeout(resizedw, 100);
});

function resizedw(){
    var width = $(window).width();

    initPartnersSlider();
    initGratefulSlider();
    initMainNewsSlider();
    initMainReviewsSlider();
}


$(document).scroll(function(){
    //setFixedHeader();
});

