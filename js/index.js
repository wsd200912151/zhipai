$(function() {

    function play(){
    function makePoker() {
        var poker = [];
        var table = {};
        var colors = ['h', 's', 'c', 'd'];
        while (poker.length != 52) {
            var index = colors[Math.floor(Math.random() * 4)];
            var num = Math.ceil(Math.random() * 13);
            var v = {
                color: index,
                number: num
            };
            if (!table[index + num]) {
                poker.push(v);
                table[index + num] = true;
            }
        }
        return poker;
    }

    var poker = makePoker();

    function setPoker() {
        var biao = {1: 'A', 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 'T', 11: 'J', 12: 'Q', 13: 'K'};
        var poke;
        var u = 0;
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < i + 1; j++) {
                poke = poker[u];
                u++;
                $('<div>').appendTo('.screen')
                    .addClass('pai')
                    .css('background-image', 'url(image/' + biao[poke.number] + poke.color + '.png)')
                    .attr({'num': poke.number, 'id': i + '-' + j})
                    .delay(u * 50)
                    .animate({left: j * 110 + (6 - i) * 55, top: i * 40, opacity: 1});
            }
        }
        for (; u < poker.length; u++) {
            poke = poker[u];
            $('<div>').appendTo('.screen')
                .addClass('pai left')
                .css('background-image', 'url(image/' + biao[poke.number] + poke.color + '.png)')
                .attr({'num': poke.number})
                .delay(u * 50)
                .animate({left: 110, top: 430, opacity: 1});
        }

    }

    setPoker();

    function isCanClick(el) {
        if (!$(el).attr('id')) {
            return true;
        }
        var h = parseInt($(el).attr('id').split('-')[0]);
        var s = parseInt($(el).attr('id').split('-')[1]);
        if ($('#' + (h + 1) + '-' + s).length || $('#' + (h + 1) + '-' + (s + 1)).length) {
            return false;
        } else {
            return true;
        }
    }

    function pokeNum(el) {
        return parseInt($(el).attr('num'));
    }

        var prev;
        var  scorespan=parseInt($('.score span').text());
        var  overplusspan=parseInt($('.overplus span').text());
    function setClick() {
        $('.screen').on('click', '.pai', function () {
            if (!isCanClick(this)) {
                return;
            }
            var pokeclick = pokeNum(this);
            $(this).css({'margin-top': '-10px'});
            if (!prev && pokeclick === 13) {
                $(this).delay(10)
                    .animate({'left': 900, 'top': 0})
                    .queue(function () {
                        $(this).detach().dequeue()
                    });
                $('.score span').text(scorespan+=10);
                $('.overplus span').text(overplusspan-=1);
                if(overplusspan==0){
                    alert("恭喜你！游戏成功！")
                }
                return;
            }

            if (prev) {
                if (pokeNum(prev) + pokeclick === 13) {
                    prev.add(this)
                        .animate({'left': 900, 'top': 0})
                        .queue(function () {
                            $(this).detach().dequeue()
                        });
                    $('.score span').text(scorespan+=10);
                    $('.overplus span').text(overplusspan-=2);
                    if(overplusspan==0){
                        alert("恭喜你！游戏成功！")
                    }
                } else {
                    prev.add(this).animate({'margin-top': '0'})
                }
                prev = null;
            } else {
                prev = $(this);
            }

        })


    }

    setClick();

    var leftbtn = $('.screen .btnleft');
    var rightbtn = $('.screen .btnright');

    function btn() {
        var index = 0;
        var rightclick = 0;
        leftbtn.on('click', function () {
            $('.left').last()
                .css({'zIndex': index++})
                .animate({left: 550, 'margin-top': 0})
                .queue(function () {
                    $(this).removeClass('left')
                        .addClass('right')
                        .dequeue();
                })
        })
        rightbtn.on('click', function () {
            if ($('.left').length) {
                return;
            }
            rightclick++;
            if (rightclick > 3) {
                return;
            } else {
                $('.right').each(function (i, v) {
                    $(v).delay(i * 100)
                        .animate({left: 110, zIndex: 0})
                        .queue(function () {
                            $(this).removeClass('right')
                                .addClass('left')
                                .dequeue();
                        })
                })
            }
        })
    }

    btn();

    }
    play();


    $('.restart').on('click',function(){
        $('.pai').detach();
        $('.score span').text(0);
        $('.overplus span').text(52);
        play();
    })

    $('.end').on('click',function(){
        $('.score span').text(0);
        $('.overplus span').text(52);
        $('.pai').detach();
    })












})