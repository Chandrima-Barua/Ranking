$(document).ready(function () {
    $(".carousel_multi").on('click', '.imageitemoptionmorebutton_flag', function (e) {
        lists_pointer = $(".check-con").attr('id');

        if ($(this).parent().parent().parent().siblings().children().find(".imageitemoptionmorebutton_flag").hasClass('clicked') == true) {
            $(this).addClass('clicked');
            $(this).parent().parent().parent().siblings().children().find(".imageitemoptionmorebutton_flag").removeClass('clicked');
            $(this).parent().parent().parent().siblings().children().find(".imageitemflagas").css('display', 'none')
            $(this).parent().find(".imageitemflagas").slideDown("slow", function () {
                $(this).parent().find(".imageitemflagas").css('display', 'block');
            });
        }
        else if ($(this).hasClass('clicked') == true) {
            $(this).removeClass('clicked');
            $(this).parent().find(".imageitemflagas").slideUp("slow", function () {
                $(this).parent().find(".imageitemflagas").css('display', 'none')
            });
        }
        else {
            $(this).addClass("clicked");
            $(this).parent().find(".imageitemflagas").slideDown("slow", function () {
                $(this).parent().find(".imageitemflagas").css('display', 'block');
            });

        }
    });

    $(".carousel_multi").on("click", ".flagasoptions", function (event) {
        multiflag_item_id = parseInt($(this).attr('data_id'));
        // console.log("hell" + $(this).attr('checked'));
        if ($(this).attr('data_val') == 1) {
            $(this).attr('data_val', 0);
            $(this).removeClass('checked');

        } else {
            $(this).attr('data_val', 1);
            $(this).addClass('checked');
        }
    });


    $(".carousel_multi").on("click", ".imageflagreportbutton ", function (event) {
        console.log($(this).parent().parent().parent().find(".abusive"))
        multiabusive = parseInt($(this).parent().parent().parent().find(".abusive").attr("data_val"));
        multispam = parseInt($(this).parent().parent().parent().find(".spam").attr("data_val"));
        multilistflagip =  parseInt($(this).parent().parent().parent().find(".listflagip").attr("data_val"));

        prev_multiabusive =   parseInt($(this).parent().parent().parent().find(".abusive").attr("prev_abusive"));
        prev_multispam = parseInt($(this).parent().parent().parent().find(".spam").attr("prev_spam"));
        prev_multilistflagip =parseInt($(this).parent().parent().parent().find(".listflagip").attr("prev_iip"));

        console.log(multispam)
        console.log(prev_multilistflagip)
        multiflag_item_id = parseInt($(this).attr('id'));
        // console.log( $(this).parents().find(".imageitemoptionmorebutton_flag"));
        $(this).parents().find(".imageitemoptionmorebutton_flag").removeClass('clicked')

        $(this).parents().find(".imageitemflagas").slideDown("fast", function () {
            $(this).parents().find(".imageitemflagas").css('display', 'none')
        });
        console.log($(this).parent().parent().parent().find(".flagasoptions"))
        if (($(this).parent().parent().parent().find(".flagasoptions").hasClass('exist') == false) && ($(this).parent().parent().parent().find(".flagasoptions").hasClass('checked') == false)) {
            console.log("first if")

            $("#imageflagconfirmmessagebackground  , #imageflagerrormessage").css({'display': 'block'});

            $("#imageflagconfirmmessagebackground").css({'display': 'block'})

            $("#imageflagerrormessageclose , #imageflagerrormessagebuttonok").on('click', function (e) {
                $("#imageflagconfirmmessagebackground  , #imageflagerrormessage").css({'display': 'block'})
                    .css('display', 'none');

            });
        } else if ((multiabusive === prev_multiabusive && multispam === prev_multispam && multilistflagip === prev_multilistflagip)) {

            //it is database related;
            //         alert("already existed");
            $("#imageflagconfirmmessagebackground  , #imageflagexistmessage").css({'display': 'block'});
            $("#imageflagexistmessageclose , #imageflagexistmessagebuttonok").on('click', function (e) {
                $("#imageflagconfirmmessagebackground  , #imageflagexistmessage").css({'display': 'block'})
                    .css('display', 'none');

            });
        } else {
            console.log("third if")
            $("#imageflagconfirmmessagebackground  , #imageflagconfirmmessage").css({'display': 'block'});

            $("#imageflagconfirmmessageclose").on('click', function (e) {
                $("#imageflagconfirmmessagebackground  , #imageflagconfirmmessage").css({'display': 'block'})
                    .css('display', 'none');

            });

        }
    });
    $("#imageflagconfirmmessage").on('click', '#imageflagconfirmmessagebuttonok', function (e) {
        $("#imageflagconfirmmessagebackground  , #imageflagconfirmmessage").css({'display': 'block'})
            .css('display', 'none');

        //ajax call will be here

        // console.log(multiabusive);
        // console.log(multispam);
        // console.log(multilistflagip);
        $.ajax({
            type: 'POST',
            url: 'ajax/imageitem_flag.php',
            data: {
                multiabusive: multiabusive,
                multispam: multispam,
                multilistflagip: multilistflagip,
                multimedia_pointer: multiflag_item_id,
                lists_pointer: lists_pointer
            },

            success: function (data) {
                console.log(data);

            }
        })

        $(".abusive").attr("prev_abusive", multiabusive);
        $(".spam").attr("prev_spam", multispam);
        $(".listflagip").attr("prev_iip", multilistflagip);
    });
});