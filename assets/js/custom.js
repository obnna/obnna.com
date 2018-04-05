(function($) {
    $(window).load(function() {
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
    });
    $(document).ready(function() {
        $('a[href*=#]').bind("click", function(e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 1000);
            e.preventDefault();
        });
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });
        $('.header').sticky({
            topSpacing: 0
        });
        $('body').scrollspy({
            target: '.navbar-custom',
            offset: 90
        })
        $(".js-height-full").height($(window).height());
        $(window).resize(function() {
            $(".js-height-full").height($(window).height());
        });
        var twitterConfig = {
            id: '880987781438349313',
            domId: '',
            maxTweets: 6,
            enableLinks:false,
            showUser: false,
            customCallback: handleTweets
        };
        twitterFetcher.fetch(twitterConfig);

        function handleTweets(tweets) {
            var x = tweets.length;
            var n = 0;
            var html = '';
            while (n < x) {
                html += '<div class="owl-item">' + tweets[n] + '</div>';
                n++;
            }
            $('.testimonials').html(html);
            $('.twitter_retweet_icon').html('<i class="fa fa-retweet"></i>');
            $('.twitter_reply_icon').html('<i class="fa fa-reply"></i>');
            $('.twitter_fav_icon').html('<i class="fa fa-star"></i>');
            $('.testimonials').owlCarousel({
                singleItem: true,
                navigation: false,
                pagination: false,
                slideSpeed: 700,
                paginationSpeed: 200,
                autoPlay: 5000,
                navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
            });
        }
        var $portfolioContainer = $('.portfolio-items-container');
        $('#filter li').on('click', function(e) {
            e.preventDefault();
            $('#filter li').removeClass('active');
            $(this).addClass('active');
            group = $(this).attr('data-group');
            var groupName = $(this).attr('data-group');
            $portfolioContainer.shuffle('shuffle', groupName);
        });
        $('.simple-ajax-popup').magnificPopup({
            type: 'ajax',
            callbacks: {
                parseAjax: function(mfpResponse) {
                    $.getScript('assets/js/jquery.fitvids.js');
                    $.getScript('assets/js/custom-portfolio.js');
                },
            }
        });
        wow = new WOW({
            mobile: false
        });
        wow.init();
        $('body').fitVids();

        function isValidEmailAddress(emailAddress) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            return pattern.test(emailAddress);
        };
        $('#contact-form').submit(function(e) {
            e.preventDefault();
            var c_name = $('#c_name').val();
            var c_email = $('#c_email').val();
            var c_message = $('#c_message ').val();
            var responseMessage = $('#contact-form .ajax-response');
            if ((c_name == '' || c_email == '' || c_message == '') || (!isValidEmailAddress(c_email))) {
                responseMessage.fadeIn(500);
                responseMessage.html('<i class="fa fa-warning"></i> Please fix the errors and try again.');
            } else {
                $.ajax({
                    type: 'POST',
                    url: 'assets/php/contactForm.php',
                    dataType: 'json',
                    data: {
                        c_email: c_email,
                        c_name: c_name,
                        c_message: c_message
                    },
                    beforeSend: function(result) {
                        $('#contact-form button').empty();
                        $('#contact-form button').append('<i class="fa fa-cog fa-spin"></i> Wait...');
                    },
                    success: function(result) {
                        if (result.sendstatus == 1) {
                            $('#contact-form .ajax-hidden').fadeOut(500);
                            responseMessage.html(result.message).fadeIn(500);
                        } else {
                            $('#contact-form button').empty();
                            $('#contact-form button').append('<i class="fa fa-retweet"></i> Try again.');
                            responseMessage.html(result.message).fadeIn(1000);
                        }
                    }
                });
            }
            return false;
        });
        var mapLocation = new google.maps.LatLng(34.031428, -118.2071542, 17);
        map = new GMaps({
            streetViewControl: false,
            overviewMapControl: false,
            mapTypeControl: false,
            zoomControl: false,
            panControl: false,
            scrollwheel: false,
            center: mapLocation,
            el: '#map',
            zoom: 16,
            styles: [{
                "featureType": "landscape",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 65
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 51
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.highway",
                "stylers": [{
                    "saturation": -100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.arterial",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 30
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "road.local",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 40
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "transit",
                "stylers": [{
                    "saturation": -100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "administrative.province",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "lightness": -25
                }, {
                    "saturation": -100
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#ffff00"
                }, {
                    "lightness": -25
                }, {
                    "saturation": -97
                }]
            }]
        });
        var image = new google.maps.MarkerImage('assets/images/map-icon.png', new google.maps.Size(80, 80), new google.maps.Point(0, 0), new google.maps.Point(40, 40));
        map.addMarker({
            position: mapLocation,
            icon: image,
            animation: google.maps.Animation.BOUNCE,
        });
    });
})(jQuery);