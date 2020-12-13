$(document).ready(function () {

    $(".carousel").on('click', '.itemoptionmorebutton_flag', function (e) {
        if ($(this).parent().siblings().find(".itemoptionmorebutton_flag").hasClass('clicked') == true) {
            $(this).addClass('clicked');
            $(this).parent().siblings().find(".itemoptionmorebutton_flag").removeClass('clicked');
            $(this).parent().siblings().find(".itemflagas").css('display', 'none')
            $(this).parent().find(".itemflagas").slideDown("slow", function () {
                $(this).parent().find(".itemflagas").css('display', 'block');
            });
        } else if ($(this).hasClass('clicked') == true) {
            $(this).removeClass('clicked');
            $(this).parent().find(".itemflagas").slideUp("slow", function () {
                $(this).parent().find(".itemflagas").css('display', 'none')
            });
        } else {
            $(this).addClass("clicked");
            $(this).parent().find(".itemflagas").slideDown("slow", function () {
                $(this).parent().find(".itemflagas").css('display', 'block');
            });

        }
    });
    $(".carousel").on("click", ".flagasoptions", function (event) {
        flag_item_id = parseInt($(this).attr('data_id'));
        console.log("hell" + $(this).attr('checked'));
        if ($(this).attr('data_val') == 1) {
            $(this).attr('data_val', 0);
            $(this).removeClass('checked');

        } else {
            $(this).attr('data_val', 1);
            $(this).addClass('checked');

        }


    });


    $(".carousel").on("click", ".flagreportobutton", function (event) {
        console.log($(this).parent().parent().find(".abusive"))
        abusive = parseInt($(this).parent().parent().find(".abusive").attr("data_val"));
        spam = parseInt($(this).parent().parent().find(".spam").attr("data_val"));
        listflagip = parseInt($(this).parent().parent().find(".listflagip").attr("data_val"));

        prev_abusive = parseInt($(this).parent().parent().find(".abusive").attr("prev_abusive"));
        prev_spam = parseInt($(this).parent().parent().find(".spam").attr("prev_spam"));
        prev_listflagip = parseInt($(this).parent().parent().find(".listflagip").attr("prev_iip"));


        console.log(abusive)
        console.log(prev_abusive);
        flag_item_id = parseInt($(this).attr('id'));
        // console.log(flag_item_id);
        $(this).parent().parent().parent().parent().parent().find(".itemoptionmorebutton_flag").removeClass('clicked')
        $(this).parent().slideDown("fast", function () {
            $(this).parent().parent().css('display', 'none')
        });

        if (($(this).parent().parent().find(".flagasoptions").hasClass('exist') == false) && ($(this).parent().parent().find(".flagasoptions").hasClass('checked') == false)) {
            console.log("first if")
            $("#flagconfirmmessagebackground  , #flagerrormessage").css({'display': 'block'});

            $("#flagconfirmmessagebackground").css({'display': 'block'})

            $("#flagerrormessageclose , #flagerrormessagebuttonok").on('click', function (e) {
                $("#flagconfirmmessagebackground  , #flagerrormessage").css({'display': 'block'})
                    .css('display', 'none');

            });
        } else if ((abusive === prev_abusive && spam === prev_spam && listflagip === prev_listflagip)) {
            console.log("second if")
            $("#flagconfirmmessagebackground  , #flagexistmessage").css({'display': 'block'});
            $("#flagexistmessageclose , #flagexistmessagebuttonok").on('click', function (e) {
                $("#flagconfirmmessagebackground  , #flagexistmessage").css({'display': 'block'})
                    .css('display', 'none');

            });
        } else {

            $("#flagconfirmmessagebackground  , #flagconfirmmessage").css({'display': 'block'});

            $("#flagconfirmmessageclose").on('click', function (e) {
                $("#flagconfirmmessagebackground  , #flagconfirmmessage").css({'display': 'block'})
                    .css('display', 'none');

            });

        }
        console.log($(this).parent().parent().hasClass(".nowabusive"))
        if($(this).parent().parent().hasClass(".nowabusive") == true){
            $(this).parent().parent().removeClass(".nowabusive")

        }
        $(this).parent().parent().find(".abusive").addClass("nowabusive");
        $(this).parent().parent().find(".spam").addClass("nowspam");
        $(this).parent().parent().find(".listflagip").addClass("nowlistflagip");
        // $(this).parent().parent().find(".nowabusive").attr("prev_abusive", abusive);
        // $(this).parent().parent().find(".nowspam").attr("prev_spam", spam);
        // $(this).parent().parent().find(".nowlistflagip").attr("prev_iip", listflagip);
    });

    $("#flagconfirmmessage").on('click', '#flagconfirmmessagebuttonok', function (e) {
        $("#flagconfirmmessagebackground  , #flagconfirmmessage").css({'display': 'block'})
            .css('display', 'none');

        //ajax call will be here
        // console.log(abusive);
        // console.log(spam);
        // console.log(listflagip);

        lists_pointer = $(".check-con").attr('id');
        // console.log(lists_pointer);

        $.ajax({
            type: 'POST',
            url: 'ajax/item_flag_ajax.php',
            data: {
                abusive: abusive,
                spam: spam,
                listflagip: listflagip,
                contributions_pointer: flag_item_id,
                lists_pointer: lists_pointer
            },

            success: function (data) {
                console.log(data);
                var objects = JSON.parse(data);
                console.log(objects);
                console.log(objects['abusive']);
               //  $("#abusive").attr("prev_abusive", objects['abusive']);
               //  $("#spam").attr("prev_spam", objects['spam']);
               // $("#listflagip").attr("prev_iip", objects['listflagip'] );
            }
        })
        // $(this).parent().parent().find(".abusive").attr("prev_abusive", abusive);
        // $(this).parent().parent().find(".spam").attr("prev_spam", spam);
        // $(this).parent().parent().find(".listflagip").attr("prev_iip", listflagip);
        $(".nowabusive").attr("prev_abusive", abusive);
        $(".nowspam").attr("prev_spam", spam);
        $(".nowlistflagip").attr("prev_iip", listflagip);
    });


});
