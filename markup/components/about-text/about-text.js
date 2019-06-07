import ready from '../../static/js/documentReady.js';

ready(function () {
    (function ($) {
        $.extend($.easing, {
            spincrementEasing: function (x, t, b, c, d) {
                return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            }
        });

        $.fn.spincrement = function (opts) {

            let defaults = {
                from: 0,
                to: null,
                decimalPlaces: null,
                decimalPoint: '.',
                thousandSeparator: '',
                duration: 2000,
                leeway: 50,
                easing: 'spincrementEasing',
                fade: true,
                complete: null
            };
            let options = $.extend(defaults, opts);

            let re_thouSep = new RegExp(/^(-?[0-9]+)([0-9]{3})/);

            function format(num, dp) {
                num = num.toFixed(dp);

                if ((dp > 0) && (options.decimalPoint !== '.')) {
                    num = num.replace('.', options.decimalPoint);
                }

                if (options.thousandSeparator) {
                    while (re_thouSep.test(num)) {
                        num = num.replace(re_thouSep, '$1' + options.thousandSeparator + '$2');
                    }
                }
                return num;
            }

            return this.each(function () {

                let obj = $(this);

                let from = options.from;
                if (obj.attr('data-from')) {
                    from = parseFloat(obj.attr('data-from'));
                }

                let to;
                if (obj.attr('data-to')) {
                    to = parseFloat(obj.attr('data-to'));
                } else if (options.to !== null) {
                    to = options.to;
                } else {
                    let ts = $.inArray(options.thousandSeparator, ['\\', '^', '$', '*', '+', '?', '.']) > -1 ? '\\' + options.thousandSeparator : options.thousandSeparator;
                    let re = new RegExp(ts, 'g');
                    to = parseFloat(obj.text().replace(re, ''));
                }

                let duration = options.duration;
                if (options.leeway) {

                    duration += Math.round(options.duration * ((Math.random() * 2) - 1) * options.leeway / 100);
                }

                let dp;
                if (obj.attr('data-dp')) {
                    dp = parseInt(obj.attr('data-dp'), 10);
                } else if (options.decimalPlaces !== null) {
                    dp = options.decimalPlaces;
                } else {
                    let ix = obj.text().indexOf(options.decimalPoint);
                    dp = (ix > -1) ? obj.text().length - (ix + 1) : 0;
                }

                obj.css('counter', from);
                if (options.fade) {
                    obj.css('opacity', 0);
                }
                obj.animate(
                    {
                        counter: to,
                        opacity: 1
                    },
                    {
                        easing: options.easing,
                        duration: duration,

                        step: function (progress) {
                            obj.html(format(progress * to, dp));
                        },
                        complete: function () {

                            obj.css('counter', null);
                            obj.html(format(to, dp));

                            if (options.complete) {
                                options.complete(obj);
                            }
                        }
                    }
                );
            });
        };
    })(jQuery);


    $(window).on('load scroll resize', function () {

        let bodyHeight = $('body').outerHeight(),
            winPos = $(window).scrollTop(),
            height = winPos + bodyHeight;

        $('.about-text__top-num').each(function () {


            let $this = $(this),
                top = $this.offset().top;

            if (height >= top && !$this.hasClass('twisted')) {
                $this.addClass('twisted').find('span').spincrement();
            }
        });
    });

});

