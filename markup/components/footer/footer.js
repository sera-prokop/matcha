// const $ = require('jquery');
import $ from 'jquery';
$(document).ready(function () {
    
    $(window).resize(function () {
        if (window.innerWidth < 768) {
            $('ul.akkordeon li > p').click(function () {
                if (!$(this).hasClass('active')) {	//если "кликнутый" пункт неактивный:
                    $('ul.akkordeon li > p').removeClass('active').next('div').slideUp(); //делаем неактивными все пункты и скрываем все блоки
                    $(this).addClass('active');	//активируем "кликнутый" пункт
                    $(this).next('div').slideDown(200);	//раскрываем следующий за ним блок с описанием
                } else {	//иначе:
                    $(this).removeClass('active').next('div').slideUp();	//скрываем данный пункт
                }
            });
        }else{
            rerurn
        }
    }).trigger('resize');
    
 });

