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

    $('[data-tab]').click(function(){
        console.log('start animate');
        var xtab = $('.xtab');
        xtab.stop(true, true);
        $('[data-tab]').removeClass('active');
        $(this).addClass('active');

        var data_tab = $(this).attr('data-tab');
        xtab.animate({"opacity": 0.2}, 300, function() {
            console.log('in animate');
            xtab.removeClass('active');
            xtab.animate({"opacity": 1});
            console.log('in animate 2');
            $(data_tab).addClass('active');
        });
        console.log('stop animate');
        return false;
    }); 

    $('[data-toggle]').on('click', function (e) {
        e.preventDefault();

        $(this).toggleClass('active');
        var selector = $(this).attr('data-toggle');
        console.log('toggle  '+selector);
        $(selector).slideToggle();
        //$(this).toggleClass('active');
    });

    $('body').on('click', '.header-menu a, .mobile-menu a', function() {
        link = $(this);
        setTimeout(function(){
            return !setActivePriceTabs(link.attr('href'));
        }, 500);
    });

    $('g.city').hover(function () {
        var district = $(this).attr('data-district');
        //$('title').text(district);
        $('text[data-district-name="'+district+'"]').addClass('hover');
        $(this).find('*').addClass('bgHoverSVG');
    }, function () {
        $('text[data-district-name]').removeClass('hover');
        $(this).find('*').removeClass('bgHoverSVG');
    });

    $('g.city, text.district-name').on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('data-href');
        if (typeof(href) != 'undefined' && href != '') {
            document.location.href = href;
        }
    });

    $('text.district-name').hover(function () {
        $(this).addClass('hover');
        var district = $(this).attr('data-district-name');
        //$('title').text(district);
        var g = $('g[data-district="'+district+'"]');
        g.addClass('bgHoverSVG');
        g.find('*').addClass('bgHoverSVG');
    }, function () {
        $(this).removeClass('hover');
    });

    $('.review-form__star').hover(
        function(){
            star = $(this).attr('data-star');
            $('.review-form__stars').attr("data-star", star);
        },
        function(){
            //$('.review-form__stars').attr("data-star", 0);
        }
    );
    $('.review-form__star').on('click', function() {
        $('.review-form__stars').addClass('checked');    
        $(this).parents('form').find('[name="rating"]').val($(this).attr('data-star'));
    });
    $('.review-form__stars').hover(
        function(){
        },
        function(){
            star = $(this).parents('form').find('[name="rating"]').val();
            $('.review-form__stars').attr("data-star", star);
        }
    );

    $('body').on('click', '.catalog-menu__title', function(e) {
        e.preventDefault();
        $(this).parents('.catalog-menu__item').toggleClass('catalog-menu__item--active');
    });
    $('body').on('click', '.catalog-menu__title a', function(e) {
        e.stopPropagation();
    }

    initPartnersSlider();
    initGratefulSlider();
    initMainNewsSlider();
    initMainReviewsSlider();
    setActivePriceTabs();
    initAboutGratefulSlider();
});

setActivePriceTabs = function(link='') {
    let isLinkClick = true;
    if (link=='') {
        link = document.location.href; 
        isLinkClick = false;
    }
    if (link.indexOf("/prices/#funeral")!=-1) {
        $('[data-tab=".xtab-burial"]').trigger('click');
        if (isLinkClick) {
            $('body').removeClass('open-mobile-menu');
        }
        return true;
    }
    if (link.indexOf("/prices/#cremation")!=-1) {
        $('[data-tab=".xtab-cremation"]').trigger('click');
        if (isLinkClick) {
            $('body').removeClass('open-mobile-menu');
        }
        return true;
    }

    let xtab_index = link.indexOf("#xtab-");
    if (xtab_index != -1) {
        xtab_anc = link.substr(xtab_index+1);
        $('[data-tab=".'+xtab_anc+'"]').trigger('click');
        if (isLinkClick) {
            $('body').removeClass('open-mobile-menu');
        }
        return true;
    }

    return false;
}


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

var slider_about_grateful = false;
initAboutGratefulSlider  = function() {
    if (!slider_about_grateful) {
        $('.about-grateful-slider').slick({
            'autoplay': false,
            'arrows': true,
            'dots': false,
            'slidesToShow': 5,
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
        slider_about_grateful = true;
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

