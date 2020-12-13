$(document).ready(function () {

    $('.carousel_multi').on('click', '.imageitemoptionmorebutton_delete', function (e) {

        if ($(this).parent().parent().parent().siblings().children().find(".imageitemoptionmorebutton_delete").hasClass('clicked') == true) {
            $(this).addClass('clicked');
            $(this).parent().parent().parent().siblings().children().find(".imageitemoptionmorebutton_delete").removeClass('clicked');

            $(this).parent().parent().parent().siblings().children().find(".imageitemoptionmoreoptionholder_delete").css('display', 'none')
            $(this).parent().find(".imageitemoptionmoreoptionholder_delete").slideDown("slow", function () {
                $(this).parent().find(".imageitemoptionmoreoptionholder_delete").css('display', 'block');
            });

        }
        else if ($(this).hasClass('clicked')) {
            $(this).removeClass('clicked');
            $(this).parent().find(".imageitemoptionmoreoptionholder_delete").slideUp("slow", function () {

                $(this).parent().find(".imageitemoptionmoreoptionholder_delete").css('display', 'none')

            });
        }
        else {
            $(this).addClass("clicked");
            $(this).parent().find(".imageitemoptionmoreoptionholder_delete").slideDown("slow", function () {
                $(this).parent().find(".imageitemoptionmoreoptionholder_delete").css('display', 'block');
            });

        }
    });
        $('.carousel_multi').on('click', '.imageitemdeletetextparentholder', function (e) {
            count = parseInt($(".carousel_multi").attr('data-count'))
            // alert(count)
        // $(".imageitemdeletetextparentholder").on('click', function (e) {
            delete_item_id = parseInt($(this).attr('id'));

            $("#deleteconfirmmessagebackground  , #imagedeleteconfirmmessage").css({'display': 'block'})

            $("#imagedeleteconfirmmessageclose , #imagedeleteconfirmmessagebuttonno").on('click', function (e) {
                $("#deleteconfirmmessagebackground  , #imagedeleteconfirmmessage , .imageitemoptionmoreoptionholder_delete").css({'display': 'block'})
                    .css('display', 'none');
            });
            });

            $("#imagedeleteconfirmmessagebuttonyes").on('click', function (e) {
                if(count>0) {
                    count = count - 1;
                    console.log(count);
                    $(".carousel_multi").attr('data-count', count);
                }
                $("#deleteconfirmmessagebackground  , #imagedeleteconfirmmessage , .imageitemoptionmoreoptionholder_delete").css({'display': 'block'})
                    .css('display', 'none');
                // console.log(delete_item_id);
                $("#multi_elem_" + delete_item_id).remove();
               var deleteleft = parseInt($('.all-items-multi').css("margin-left"));
               var deleteleft_width = parseInt($('.all-items-multi').width());
                $('.multiprev-load-more').show();
                deleteleft_next = deleteleft + (deleteleft_width - 85 + 10);
                    $('.all-items-multi').animate({'margin-left': deleteleft_next + 'px'}, {
                        "duration": 1000,
                        "easing": "linear"
                    });

                $(window).resize(function () {
                   var deleteleft = parseInt($('.all-items-multi').css("margin-left"));
                   var deleteleft_width = parseInt($('.all-items-multi').width());
                   var deleteleft_next = deleteleft + (deleteleft_width - 85 + 10);
                    $('.all-items-multi').css('margin-left', deleteleft_next + 'px');

                });


                if ($(".carousel_multi li").length == 0) {
                    $('.multiprev-load-more').hide();
                }

                recorded = 0;

                $.ajax({
                    type: 'POST',
                    url: 'ajax/imageitem_delete.php',
                    data: {delete_item_id: delete_item_id, recorded: recorded},

                    success: function (data) {
                        console.log("sended ajax call");
                    }
                })
            // });
        });
        // }

        // left = left_next;

});
