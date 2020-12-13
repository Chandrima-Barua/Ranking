$(document).ready(function () {

    $('.carousel').on('click', '.itemoptionmorebutton_delete', function (e) {
        console.log($(this).parent().siblings().children().find(".itemoptionmorebutton_delete").hasClass('clicked'))
        if ($(this).parent().siblings().children().find(".itemoptionmorebutton_delete").hasClass('clicked') == true) {

            $(this).parent().siblings().children().find(".itemoptionmorebutton_delete").removeClass('clicked');
            $(this).parent().siblings().children().find(".itemoptionmorebutton_delete").css('display', 'none')

        } else if ($(this).hasClass('clicked')) {

            $(this).removeClass('clicked');
            $(this).parent().find(".itemoptionmoreoptionholder_delete").slideUp("slow", function () {

                $(this).parent().find(".itemoptionmoreoptionholder_delete").css('display', 'none')

            });
        } else {

            $(this).addClass("clicked");

            $(this).parent().find(".itemoptionmoreoptionholder_delete").slideDown("slow", function () {
                $(this).parent().find(".itemoptionmoreoptionholder_delete").css('display', 'block');
            });

            console.log($(this).parent().find(".itemdeletetextparentholder"));
        }
    });
    $('.carousel').on('click', '.itemdeletetextparentholder', function (e) {
        count = parseInt($(".carousel").attr('data-count'));
        delete_item_id = parseInt($(this).attr('id'));
        $("#deleteconfirmmessagebackground  , #deleteconfirmmessage").css({'display': 'block'})

        $("#deleteconfirmmessageclose , #deleteconfirmmessagebuttonno").on('click', function (e) {
            $("#deleteconfirmmessagebackground  , #deleteconfirmmessage , .itemoptionmoreoptionholder_delete").css({'display': 'block'})
                .css('display', 'none');
        });
        });
        $("#deleteconfirmmessagebuttonyes").on('click', function (e) {

            if(count>0) {
                count = count - 1;
                console.log(count);
                $(".carousel").attr('data-count', count);
            }
            $("#deleteconfirmmessagebackground  , #deleteconfirmmessage , .itemoptionmoreoptionholder_delete").css({'display': 'block'})
                .css('display', 'none');
            console.log(delete_item_id);
            $("#elem_" + delete_item_id).remove();
            // if (delete_item_id == parseInt($(".carousel li").last().attr('data_elem_id'))) {
            var left = parseInt($('.all-items').css("margin-left"));
            var left_width = parseInt($('.all-items').width());
            // $('.load-more').show();
            $('.prev-load-more').show();
            left_next = left + (left_width - 85 + 10);
            if (!$.trim($('.mainc').html()).length == false) {
                $('.all-items').animate({'margin-left': left_next + 'px'}, {
                    "duration": 1000,
                    "easing": "linear"
                });

            }
            $(window).resize(function () {
                // var left = parseInt($('.all-items').css("margin-left"));
                // console.log(left);
                // var left_width = parseInt($('.all-items').width());
                // var left_next = left + (left_width - 85 + 10);
                // // var left_next =  (left_width - 85 + 10);
                // $('.all-items').css('margin-left', left_next + 'px');

            });
            // }
            if ($(".carousel li").length == 0) {
                $('.prev-load-more').hide();
            }

            recorded = 0;

            $.ajax({
                type: 'POST',
                url: 'ajax/item_delete_ajax.php',
                data: {delete_item_id: delete_item_id, recorded: recorded},

                success: function (data) {
                    console.log("sended ajax call");
                }
            })
        });

    // }
    // left = left_next;

});
