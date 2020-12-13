$(document).ready(function () {
    lists_pointer = parseInt($('.cont').text());

    $(".carousel_multi").css('visibility', 'visible');

    mk = 0;
    mn = parseInt($('.carousel_multi li').length);
    $(window).on('resize', function () {
        // $(".multicontent").css('width', ($(".all-items-multi").width() - 85) + 'px');
        // $(".multicontent").css('height', ($(".content").height()) + 'px');
        // $(".multicontent-part").css('height', ($(".content").height()) + 'px');
        // $(".multicontent-part").css('width', ($(".all-items-multi").width() - 85) + 'px');

        if(parseInt($('.carousel_multi li').length) > 0) {

            if (parseInt($('.carousel_multi li').length) < 2) {
                child_number = 2;
            }
            else {
                child_number = 3;
            }
            for (var i = 1; i < child_number; i++) {

                var lis = ($('.carousel_multi li:nth-child(' + i + ')').find(".photo").attr('id'))

                console.log(lis);

                updateimage(lis.split('_')[1]);
                $("#des_" + lis.split('_')[1]).addClass(GetOrientation($('.imageuploadpopupphoto')))


            }

        }


    });

    function loadexif(itemid){
        var img = new Image();
        img.onload = function () {
            var b64 = img.src;
            var bin = atob(b64.split(',')[1]);
            var binaryFile = new EXIF.BinaryFile(bin, 0, bin.length);
            var exif = EXIF.findEXIFinJPEG(binaryFile);
            console.log(exif)

            console.log(exif.Orientation);

        }

        img.src = $("#content_" + itemid).attr('src');

    }

    function GetOrientation(image) {
        if (image.hasClass('ninetydeg')) {

            return 'ninetydeg';

        } else if (image.hasClass('oneeightydeg')) {

            return 'oneeightydeg';

        } else if (image.hasClass('twoseventydeg')) {

            return 'twoseventydeg';
        }
        else if (image.hasClass("flipzerodeg")) {

            return "flipzerodeg";
        }
        else if (image.hasClass("fliponeeightydeg")) {

            return "fliponeeightydeg";
        }
        else if (image.hasClass("flipninetydeg")) {

            return "flipninetydeg";
        }
        else if (image.hasClass("fliptwoseventydeg")) {

            return "fliptwoseventydeg";
        }
        else if (image.hasClass("rotateninetydeg")) {

            return "rotateninetydeg";
        }
        else if (image.hasClass("rotatetwoseventydeg")) {

            return "rotatetwoseventydeg";
        }
        else if (image.hasClass("rotateoneeightydeg")) {

            return "rotateoneeightydeg";
        }
        else if (image.hasClass("rotatefliponeeightydeg")) {

            return "rotatefliponeeightydeg";
        }
        else if (image.hasClass("rotatefliptwoseventydeg")) {

            return "rotatefliptwoseventydeg";
        }
        else {
            return 'zerodeg';
        }
    }

if(parseInt($('.carousel_multi li').length) > 0) {
    if (parseInt($('.carousel_multi li').length) < 2) {
        child_number = 2;
    }
    else {
        child_number = 3;
    }
    for (var i = 1; i < child_number; i++) {

        var lis = ($('.carousel_multi li:nth-child(' + i + ')').find(".photo").attr('id'))

        console.log(lis);

        updateimage(lis.split('_')[1]);
        // $("#des_" + lis.split('_')[1]).addClass(GetOrientation($('.imageuploadpopupphoto')))
        // loadexif(lis.split('_')[1]);

        console.log($("#content_" + lis.split('_')[1]).attr('src'))
    }
}
    // $(".multicontent").css('width', ($(".all-items-multi").width() - 85) + 'px');
    // $(".multicontent").css('height', ($(".content").height()) + 'px');
    // $(".multicontent-part").css('height', ($(".content").height()) + 'px');
    // $(".multicontent-part").css('width', ($(".all-items-multi").width() - 85) + 'px');

    (function ($) {
        var oldresize = window.onresize;

        window.onresize = function () {
            if (CallPageResize)
                return oldresize.call(this);
        };
    })(jQuery);


    function updateimage(itemid) {
        console.log(itemid);

        $("<img/>").attr("src", $('#content_' + itemid).attr("src"))
            .load(function () {

                createlistimageuploadpopupphotowidth = this.width;   // Note: $(this).width() will not
                createlistimageuploadpopupphotoheight = this.height; // work for in memory images


                console.log(createlistimageuploadpopupphotowidth)
                console.log(createlistimageuploadpopupphotoheight)



                var chosenimage = $('#content_' + itemid);
                var overflowelement = $("#multi_elem_" + itemid);
                var photo = $("#des_" + itemid);
                var contentframe = $('#contentframe_' + itemid);


                aspectratio = createlistimageuploadpopupphotowidth / createlistimageuploadpopupphotoheight;
                console.log("The cropped aspect ratio is_" + aspectratio)

                fixedwidth = $('.multi-element').width();
                fixedheight = $('.multi-element').height();


                displayedaspectratio = fixedwidth / fixedheight;
                console.log("The display aspect ratio is_" + displayedaspectratio)

                if (aspectratio > displayedaspectratio) {
                    console.log("greater");
                    scale = fixedwidth / createlistimageuploadpopupphotowidth;
                }

                else {
                    console.log("smaller")
                    scale = fixedheight / createlistimageuploadpopupphotoheight;
                }


                rawimageheight = scale * createlistimageuploadpopupphotoheight;
                rawimagewidth = scale * createlistimageuploadpopupphotowidth;
                // console.log("height of raw image" + rawimageheight)
                // console.log("width of raw image" + rawimagewidth)


                croppedmarginleft = (fixedwidth - rawimagewidth) / 2;
                croppedmargintop = (fixedheight - rawimageheight) / 2;


                photo.css({
                    width: Math.floor(rawimagewidth),
                    height: Math.floor(rawimageheight),
                    marginLeft: Math.floor(croppedmarginleft),
                    marginTop: Math.floor(croppedmargintop)
                });

                contentframe.css({
                    width: Math.floor(rawimagewidth),
                    height: Math.floor(rawimageheight),

                });

                chosenimage.css({
                    width: Math.floor(rawimagewidth),
                    height: Math.floor(rawimageheight),

                });

                overflowelement.css('overflow', 'hidden');
                // photo.css({'overflow': 'hidden', 'border-radius': '10px'});
                photo.css({'border-radius': '10px'});

                // $(".uploadimage").css('display', 'block');
            });
    }

    function loadmoreupdateimage(itemid) {
        console.log(itemid)
console.log("I am in")

        $("<img/>").attr("src", $('#content_' + itemid).attr("src")).load(function () {
            createlistimageuploadpopupphotowidth = this.width;   // Note: $(this).width() will not
            createlistimageuploadpopupphotoheight = this.height; // work for in memory images.
            // console.log(this.width)
            // console.log(this.height)
            // console.log("The width of uploading photo" + createlistimageuploadpopupphotowidth);
            // console.log("The height of uploading photo" + createlistimageuploadpopupphotoheight);
            var chosenimage = $('.multicontent');
            var overflowelement = $(".multi-element");
            var photo = $(".photo");


            aspectratio = createlistimageuploadpopupphotowidth / createlistimageuploadpopupphotoheight;
            console.log("The cropped aspect ratio is_" + aspectratio)

            fixedwidth = $('.multi-element').width();
            fixedheight = $('.multi-element').height();


            displayedaspectratio = fixedwidth / fixedheight;
            console.log("The display aspect ratio is_" + displayedaspectratio)

            if (aspectratio > displayedaspectratio) {
                console.log("greater");
                scale = fixedwidth / createlistimageuploadpopupphotowidth;
            }

            else {
                console.log("smaller")
                scale = fixedheight / createlistimageuploadpopupphotoheight;
            }


            rawimageheight = scale * createlistimageuploadpopupphotoheight;
            rawimagewidth = scale * createlistimageuploadpopupphotowidth;
            console.log("height of raw image" + rawimageheight)
            console.log("width of raw image" + rawimagewidth)


            croppedmarginleft = (fixedwidth - rawimagewidth) / 2;
            croppedmargintop = (fixedheight - rawimageheight) / 2;



            photo.css({
                width: Math.floor(rawimagewidth),
                height: Math.floor(rawimageheight),
                marginLeft: Math.floor(croppedmarginleft),
                marginTop: Math.floor(croppedmargintop)
            });

            chosenimage.css({
                width: Math.floor(rawimagewidth),
                height: Math.floor(rawimageheight),
                // marginLeft: -Math.floor(lmr),
                // marginTop: -Math.floor(tmr)
            });

            overflowelement.css('overflow', 'hidden');
            // photo.css({'overflow': 'hidden', 'border-radius': '10px'});
            photo.css({'border-radius': '10px'});

            // $(".uploadimage").css('display', 'block');
        });
    }

    $(".multi_part").on('click', '.multiload-more', function (e) {
        checkanimate = 2;
        e.preventDefault();
        multi_count = parseInt($(".carousel_multi").attr('data-count'));
        $("#multiload_loader").show();
        var multi_sorted_load = [];

        $(".multi-element").css('height', ($(".content").height()) + 'px');

        arraylength = parseInt($('.arraylength').val());
        mk = mk + 1;

        $(".multi-element").css('width', ($(".all-items-multi").width() - 85) + 'px');
        $(".multi-element").css('height', ($(".content").height()) + 'px');
        mn = parseInt($('.carousel_multi li').length);
        mn = mn + 1;
        multi_left = parseInt($('.all-items-multi').css("margin-left"));
        multi_left_width = parseInt($('.all-items-multi').width());
        multi_left_next = multi_left - (multi_left_width - 85 + 10);
        $('.all-items-multi').animate({'margin-left': multi_left_next + 'px'}, {"duration": 1000, "easing": "linear"});

        number = [];
        $('.carousel_multi').children().each(function () {
            number.push(parseInt($(this).attr("data_multi_elem_id")));
        });

        console.log(number);
        $('.multiprev-load-more').show();
        user = parseInt($('.user_id').attr("id"));
        multirow = parseInt($('#multirow').val());
        // console.log(multirow)
        rowperpage = 1;
        multirow_count = multirow + rowperpage;

        $("#multirow").val(multirow_count);

        if (checkanimate == 2) {
            $(window).resize(function () {

                multi_left_width = parseInt($('.multi-element').width());
                multi_left_next = multi_count * multi_left_width + multi_count * 10;
                console.log("amount of multi load more" + multi_left_next);
                $('.all-items-multi').css('margin-left', -multi_left_next + 'px');
                console.log($(this).siblings('.all-items-multi').length)
                //     $(this).siblings('.all-items-multi').css('margin-left', -multi_left_next + 'px');
                // }.bind(this));
            });
        }
        $.ajax({
            type: 'POST',
            url: 'ajax/multimedialoadmore.php',
            data: {lists_pointer: lists_pointer},

            success: function (data) {
                // console.log(data)
                var objects = JSON.parse(data);
                multiload = [];

                if (typeof objects !== "undefined") {
                    for (i = 0; i < Object.keys(objects).length; i++) {
                        multiload.push(objects[i]);
                    }
                    multi_sorted_load = Object.values(multiload);

                    console.log(multi_sorted_load)
                    index = multi_sorted_load.findIndex((item) => item.selected === 1);
                    console.log(index);
                    if (index != -1) {
                        var shifted = multi_sorted_load.splice(index, 1);
                        multi_sorted_load.sort(function (a, b) {
                            var avalue = a.score;
                            bvalue = b.score;
                            if (avalue > bvalue) {
                                return -1;
                            } else if (bvalue > avalue) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });
                        multi_sorted_load.unshift(shifted[0]);
                    } else {
                        multi_sorted_load.sort(function (a, b) {
                            var avalue = a.score;
                            bvalue = b.score;
                            if (avalue > bvalue) {
                                return -1;
                            } else if (bvalue > avalue) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });
                    }
                    array_load = [];
                    for (i = 0; i < number.length; i++) {
                        getmultiindexs = multi_sorted_load.findIndex((item) => item.id === number[i]);
                        array_load.push(multi_sorted_load[getmultiindexs])
                    }
                    console.log(multi_sorted_load.length)
                    var difference = [];

                    //for live value update
                    for (var i = 0; i < array_load.length; i++) {
                        $("#multispan_" + array_load[i]['id']).text(array_load[i]['total_likes']);
                        $("#multispan_score_" + array_load[i]['id']).text(array_load[i]['score']);
                        $("#multi_elem_" + array_load[i]['id']).attr('data-score', array_load[i]['score']);
                        $("#multi_elem_" + array_load[i]['id']).attr('data-select-at', array_load[i]['selected']);
                    }

                    $(".carousel_multi").each(function () {
                        $(this).html($(this).children('li').sort(function (a, b) {
                            if (($(a).data('select-at')) > ($(b).data('select-at'))) {
                                return ($(a).data('select-at')) - ($(b).data('select-at'));

                            } else if (($(a).data('select-at')) === ($(b).data('select-at'))) {
                                if (($(a).data('score')) === ($(b).data('score'))) {

                                    return ($(a).data('score')) - ($(b).data('score'));
                                } else {
                                    return ($(b).data('score')) - ($(a).data('score'));
                                }
                            }
                        }));
                    });

                    jQuery.grep(multi_sorted_load, function (el) {
                        if (jQuery.inArray(el, array_load) == -1) difference.push(el);
                    });
                    console.log(difference)

                    if (difference.length > 0) {
                        for (i = 0; i < 2; i++) {
                            if (i === difference.length) {
                                break;
                            }
                            if (user === difference[i]['content_user_id']) {
                                strings = "<li class='multi-element' id='multi_elem_" + difference[i]['id'] + "' data_multi_elem_id='" + difference[i]['id'] + "' data-score=" + difference[i]['score'] + " data_id=" + difference[i]['id'] + " data-select-at=" + difference[i]['selected'] + "><div class='multicontent-part' id='multicontent_" + difference[i]['id'] + "'><div class='photo' id='des_" + difference[i]['id'] + "'>";

                                if (difference[i]['image'] != 'rml' && difference[i]['gettyimageid'] == null && difference[i]['giphyid'] == null && difference[i]['gfycatid'] == null) {
                                    image_str = "<img src='images/contributionimages/" + difference[i]['image'] + "' class='multicontent' alt='No Image' id='content_" + difference[i]['id'] + "' >";
                                }
                                else if (difference[i]['image'] == '' && difference[i]['gettyimageid'] != null && difference[i]['giphyid'] == null && difference[i]['gfycatid'] == null) {
                                    image_str = "<img src='images/raw/" + difference[i]['imageraw'] + "' class='multicontent' alt='No Image' id='content_" + difference[i]['id'] + "' style='height: 100%'>";
                                }
                                else if (difference[i]['image'] == '' && difference[i]['gettyimageid'] == null && difference[i]['giphyid'] != null && difference[i]['gfycatid'] == null) {

                                    // image_str = "<img src='https://i.giphy.com/" + difference[i]['giphyid'] + ".gif'  class='multicontent' alt='No Image' id='content_" + difference[i]['id'] + "' style='height: 100%'>";

                                    image_str =  "<img src=images/raw/" + difference[i]['imageraw'] + "'  class='multicontent' alt='No Image' id='content_" + difference[i]['id'] + "' style='height: 100%, visibility: hidden;:none'><iframe  src='https://giphy.com/embed/" + difference[i]['giphyid'] + "' id='contentframe_" + difference[i]['id'] + "' class='multicontent thirdparty'  frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0' allowfullscreen></iframe>";


                                }
                                else if (difference[i]['image'] == '' && difference[i]['gettyimageid'] == null && difference[i]['giphyid'] == null && difference[i]['gfycatid'] != null) {

                                    image_str = "<img src='https://thumbs.gfycat.com/" + difference[i]['gfycatid'] + "-size_restricted.gif' class='multicontent' alt='No Image' id='content_" + difference[i]['id'] + "' style='height: 100%'>";



                                }
                                second_strings = "</div><div class='hoverable' style='display: none'><a href='../content_with_image.php/" + difference[i]['user_id'] + "'><img src='css/exm.jpg' alt='Paris' style='border:none ; border-radius:50%; background-color: white ; width:51px ;height:51px; position: relative; margin-top:20px; margin-left: 20px;'></a><div class='cont' style='display: none'>" + difference[i]['id'] + "</div><div class='multimain-content'><span class='multicontributor_name'>" + difference[i]['username'] + "</span></div><div class='multiopinion'><div class='multicontributionslikedislike'>";
                                if (difference[i]['like_before'] === true) {
                                    var like_str = "<div id='multisel_" + difference[i]['id'] + "' data_field_id='" + difference[i]['id'] + "' class='multilikebutton multiliked_before'></div><span id='loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_" + difference[i]['id'] + "'>" + difference[i]['total_likes'] + "</span>"
                                } else {
                                    like_str = "<div id='multisel_" + difference[i]['id'] + "' data_field_id='" + difference[i]['id'] + "' class='multilikebutton multilike'></div><span id='loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_" + difference[i]['id'] + "'>" + difference[i]['total_likes'] + "</span>"

                                }
                                if (difference[i]['dislike_before'] === true) {
                                    var dislike_str = "<div id='multisel_dis_" + difference[i]['id'] + "' data_field_id='" + difference[i]['id'] + "' class='multidislikebutton multidisliked_before'></div><span id='dis_loader' style='display: none'><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_dis_" + difference[i]['id'] + "'>" + difference[i]['total_dislikes'] + "</span>"
                                } else {
                                    dislike_str = "<div id='multisel_dis_" + difference[i]['id'] + "' data_field_id='" + difference[i]['id'] + "' class='multidislikebutton multidislike'></div><span id='dis_loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_dis_" + difference[i]['id'] + "'>" + difference[i]['total_dislikes'] + "</span>"

                                }
                                if (difference[i]['selected'] === 0) {
                                    var selection = "</div></div><div class='admin'><div class='multiselect_unselect'><span><div id='select_" + difference[i]['id'] + "'  class='multiselect not_selected'   data_field_id =" + difference[i]['id'] + "></span></div>";
                                } else {
                                    selection = "</div></div><div class='admin'><div class='multiselect_unselect'><span><div id='select_" + difference[i]['id'] + "'  class='multiselect selected'   data_field_id =" + difference[i]['id'] + "></span></div>";
                                }
                                if (user === difference[i]['user_id']) {
                                    delete_str = "</div></div><div class='imageitemoptionmorebutton_delete' id=" + difference[i]['id'] + "></div><div class='imageitemoptionmoreoptionholder_delete' id=" + difference[i]['id'] + " style='display: none'><div class='imageitemdeletetextparentholder' id=" + difference[i]['id'] + "> <div class='imageitemdeleteicon'></div><div class='imagedeletetextforitem'>Delete</div></div></div><div class='multiscore_count' style='display: none'> Score: <span id='multispan_score_" + difference[i]['id'] + "'>" + difference[i]['score'] + "</span></div></li>";
                                    $('.carousel_multi').append(strings + image_str + second_strings + like_str + dislike_str + selection + delete_str);

                                }

                                else {
                                    flag_str = "</div></div><div class='imageitemoptionmorebutton_flag' id=" + difference[i]['id'] + "></div><div class='imageitemoptionmoreoptionholder_flag'><div class='imageitemflagas' style='display: none'><span class='imageitemflagdescription'>Flag multimedia contribution as:</span><form class='imageflagasoptionslist' id=" + difference[i]['id'] + "><div class='imageflagasoptionswrapper' id=" + difference[i]['id'] + ">"

                                    if (difference[i]['abusive'] == 1) {
                                        var abusive_str = "<input type='checkbox' name='multiabusive'  class='flagasoptions abusive checked' label='Hateful or abusive' prev_abusive='" + difference[i]['abusive'] + "' data_val='1' data_id=" + difference[i]['id'] + "><span class='imageflagasoptionstext' checked='checked'>Hateful or abusive</span></div><div class='imageflagasoptionswrapper' id=" + difference[i]['id'] + " >"
                                    }
                                    else if (difference[i]['abusive'] == 0) {
                                        abusive_str = " <input type='checkbox' name='multiabusive'  class='flagasoptions abusive exist' label='Hateful or abusive' prev_abusive='" + difference[i]['abusive'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='imageflagasoptionstext'>Hateful or abusive</span></div><div class='imageflagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else {
                                        abusive_str = " <input type='checkbox' name='multiabusive'  class='flagasoptions abusive' label='Hateful or abusive' prev_abusive='" + difference[i]['abusive'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='imageflagasoptionstext'>Hateful or abusive</span></div><div class='imageflagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }

                                    if (difference[i]['spam'] == 1) {
                                        var spam_str = "<input type='checkbox' name='multispam'  class='flagasoptions spam checked' label='Spam or inappropriate' prev_spam='" + difference[i]['spam'] + "' data_val='1' data_id=" + difference[i]['id'] + "><span class='imageflagasoptionstext' checked='checked'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + " >"
                                    }
                                    else if (difference[i]['spam'] == 0) {
                                        var spam_str = "<input type='checkbox' name='multispam'  class='flagasoptions spam exist' label='Spam or inappropriate' prev_spam='" + difference[i]['spam'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='imageflagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else {

                                        var spam_str = "<input type='checkbox' name='multispam'  class='flagasoptions spam' label='Spam or inappropriate' prev_spam='" + difference[i]['spam'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='imageflagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }

                                    if (difference[i]['iip'] == 1) {
                                        var iip_str = "<input type='checkbox' name='ip'  class='flagasoptions listflagip checked' label='Infringment of intellectual property' prev_iip='" + difference[i]['iip'] + "' data_val='1' data_id=" + difference[i]['id'] + " checked='checked'><span class='imageflagasoptionstext'>Infringment of intellectual property</span>"
                                    }
                                    else if (difference[i]['iip'] == 0) {
                                        iip_str = "<input type='checkbox' name='ip'  class='flagasoptions listflagip exist' label='Infringment of intellectual property' prev_iip='" + difference[i]['iip'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='imageflagasoptionstext'>Infringment of intellectual property</span>"
                                    }
                                    else {
                                        iip_str = "<input type='checkbox' name='ip'  class='flagasoptions listflagip' label='Infringment of intellectual property' prev_spam='" + difference[i]['iip'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='imageflagasoptionstext'>Infringment of intellectual property</span>"
                                    }

                                    score_str = "</div><div class='imageflagreportbuttonholder' id=" + difference[i]['id'] + "><div class='imageflagreportobutton allcorners' id=" + difference[i]['id'] + "><input type='button' class='imagecommentflagreportbutton imageflagreportbutton iebutton' value='Report' id=" + difference[i]['id'] + "></div></form></div></div><div class='multiscore_count' style='display: none'> Score: <span id='multispan_score_" + difference[i][' id'] + "'>" + difference[i]['score'] + "</span></div></li>"

                                    $('.carousel_multi').append(strings + image_str + second_strings + like_str + dislike_str + selection + flag_str + abusive_str + spam_str + iip_str + score_str);
                                }

                            }


                            else {
                                strings = "<li class='multi-element' id='multi_elem_" + difference[i]['id'] + "' data_multi_elem_id='" + difference[i]['id'] + "' data-score=" + difference[i]['score'] + " data_id=" + difference[i]['id'] + " data-select-at=" + difference[i]['selected'] + "><div class='multicontent-part' id='multicontent_" + difference[i]['id'] + "'><div class='photo' id='des_" + difference[i]['id'] + "'>";

                                if (difference[i]['image'] != 'rml' && difference[i]['gettyimageid'] == null && difference[i]['giphyid'] == null && difference[i]['gfycatid'] == null) {
                                    image_str = "<img src='images/contributionimages/" + difference[i]['image'] + "' class='multicontent' alt='No Image' id='content_" + difference[i]['id'] + "' >";
                                }
                                else if (difference[i]['image'] == '' && difference[i]['gettyimageid'] != null && difference[i]['giphyid'] == null && difference[i]['gfycatid'] == null) {
                                    image_str = "<img src='images/raw/" + difference[i]['imageraw'] + "' class='multicontent thirdparty' alt='No Image' id='content_" + difference[i]['id'] + "' style='height: 100%'>";
                                }
                                else if (difference[i]['image'] == '' && difference[i]['gettyimageid'] == null && difference[i]['giphyid'] != null && difference[i]['gfycatid'] == null) {
                                    // image_str = "<img src='https://i.giphy.com/" + difference[i]['giphyid'] + ".gif'  class='multicontent thirdparty' alt='No Image' id='content_" + difference[i]['id'] + "' style='height: 100%'>";


                                    image_str =  "<img src='images/raw/" + difference[i]['imageraw'] + "'  class='multicontent thirdparty' alt='No Image' id='content_" + difference[i]['id'] + "' style='height: 100%; visibility: hidden;:none'><iframe  src='https://giphy.com/embed/" + difference[i]['giphyid'] + "' id='contentframe_" + difference[i]['id'] + "' class='multicontent thirdparty'  frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0' allowfullscreen></iframe>";
                                }
                                else if (difference[i]['image'] == 'rml' && difference[i]['gettyimageid'] == null && difference[i]['giphyid'] == null && difference[i]['gfycatid'] != null) {

                                    image_str = "<img src='https://thumbs.gfycat.com/" + difference[i]['gfycatid'] + "-size_restricted.gif' class='multicontent thirdparty' alt='No Image' id='content_" + difference[i]['id'] + "' style='height: 100%'>";

                                }
                                second_strings = "</div><div class='hoverable' style='display: none;'><a href='../content_with_image.php/" + difference[i]['user_id'] + "'><img src='css/exm.jpg' alt='Paris' style='border:none ; border-radius:50%; background-color: white ; width:51px ;height:51px; position: relative; margin-top:20px; margin-left: 20px;'></a><div class='cont' style='display: none'>" + difference[i]['id'] + "</div><div class='multimain-content'><span class='multicontributor_name'>" + difference[i]['username'] + "</span></div><div class='multiopinion'><div class='multicontributionslikedislike'>";
                                if (difference[i]['like_before'] === true) {
                                    var like_str = "<div id='multisel_" + difference[i]['id'] + "' data_field_id='" + difference[i]['id'] + "' class='multilikebutton multiliked_before'></div><span id='loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_" + difference[i]['id'] + "'>" + difference[i]['total_likes'] + "</span>"
                                } else {
                                    like_str = "<div id='multisel_" + difference[i]['id'] + "' data_field_id='" + difference[i]['id'] + "' class='multilikebutton multilike'></div><span id='loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_" + difference[i]['id'] + "'>" + difference[i]['total_likes'] + "</span>"

                                }
                                if (difference[i]['dislike_before'] === true) {
                                    var dislike_str = "<div id='multisel_dis_" + difference[i]['id'] + "' data_field_id='" + difference[i]['id'] + "' class='multidislikebutton multidisliked_before'></div><span id='dis_loader' style='display: none'><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_dis_" + difference[i]['id'] + "'>" + difference[i]['total_dislikes'] + "</span>"
                                } else {
                                    dislike_str = "<div id='multisel_dis_" + difference[i]['id'] + "' data_field_id='" + difference[i]['id'] + "' class='multidislikebutton multidislike'></div><span id='dis_loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_dis_" + difference[i]['id'] + "'>" + difference[i]['total_dislikes'] + "</span>"

                                }
                                if (user === difference[i]['user_id']) {
                                    delete_str = "</div></div><div class='imageitemoptionmorebutton_delete' id=" + difference[i]['id'] + "></div><div class='imageitemoptionmoreoptionholder_delete' id=" + difference[i]['id'] + " style='display: none'><div class='imageitemdeletetextparentholder' id=" + difference[i]['id'] + "> <div class='imageitemdeleteicon'></div><div class='imagedeletetextforitem'>Delete</div></div></div><div class='multiscore_count' style='display: none'> Score: <span id='multispan_score_" + difference[i]['id'] + "'>" + difference[i]['score'] + "</span></div></li>";
                                    $('.carousel_multi').append(strings + image_str + second_strings + like_str + dislike_str + delete_str);
                                } else {
                                    flag_str = "</div></div><div class='imageitemoptionmorebutton_flag' id=" + difference[i]['id'] + "></div><div class='imageitemoptionmoreoptionholder_flag'><div class='imageitemflagas' style='display: none'><span class='imageitemflagdescription'>Flag multimedia contribution as:</span><form class='imageflagasoptionslist' id=" + difference[i]['id'] + "><div class='imageflagasoptionswrapper' id=" + difference[i]['id'] + ">"

                                    if (difference[i]['abusive'] == 1) {
                                        var abusive_str = "<input type='checkbox' name='abusive'  class='flagasoptions abusive checked' label='Hateful or abusive' prev_abusive='" + difference[i]['abusive'] + "' data_val='1' data_id=" + difference[i]['id'] + " checked='checked'><span class='imageflagasoptionstext'>Hateful or abusive</span></div><div class='imageflagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else if (difference[i]['abusive'] == 0) {
                                        abusive_str = " <input type='checkbox' name='abusive'  class='flagasoptions abusive exist' label='Hateful or abusive' prev_abusive='" + difference[i]['abusive'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='imageflagasoptionstext'>Hateful or abusive</span></div><div class='imageflagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else {
                                        abusive_str = " <input type='checkbox' name='abusive'  class='flagasoptions abusive' label='Hateful or abusive' prev_abusive='" + difference[i]['abusive'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='imageflagasoptionstext'>Hateful or abusive</span></div><div class='imageflagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }

                                    if (difference[i]['spam'] == 1) {
                                        var spam_str = "<input type='checkbox' name='spam'  class='flagasoptions spam checked' label='Spam or inappropriate' prev_spam='" + difference[i]['spam'] + "' data_val='1' data_id=" + difference[i]['id'] + " checked='checked'><span class='imageflagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else if (difference[i]['spam'] == 0) {
                                        var spam_str = "<input type='checkbox' name='spam'  class='flagasoptions spam exist' label='Spam or inappropriate' prev_spam='" + difference[i]['spam'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='imageflagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }
                                    else {

                                        var spam_str = "<input type='checkbox' name='spam'  class='flagasoptions spam' label='Spam or inappropriate' prev_spam='" + difference[i]['spam'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='imageflagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + difference[i]['id'] + ">"
                                    }

                                    if (difference[i]['iip'] == 1) {
                                        var iip_str = "<input type='checkbox' name='ip'  class='flagasoptions listflagip checked' label='Infringment of intellectual property' prev_iip='" + difference[i]['iip'] + "' data_val='1' data_id=" + difference[i]['id'] + " checked='checked'><span class='imageflagasoptionstext'>Infringment of intellectual property</span>"
                                    }
                                    else if (difference[i]['iip'] == 0) {
                                        iip_str = "<input type='checkbox' name='ip'  class='flagasoptions listflagip exist' label='Infringment of intellectual property' prev_iip='" + difference[i]['iip'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='imageflagasoptionstext'>Infringment of intellectual property</span>"
                                    }
                                    else {
                                        iip_str = "<input type='checkbox' name='ip'  class='flagasoptions listflagip' label='Infringment of intellectual property' prev_spam='" + difference[i]['iip'] + "' data_val='0' data_id=" + difference[i]['id'] + "><span class='imageflagasoptionstext'>Infringment of intellectual property</span>"
                                    }

                                    score_str = "</div><div class='imageflagreportbuttonholder' id=" + difference[i]['id'] + "><div class='imageflagreportobutton allcorners' id=" + difference[i]['id'] + "><input type='button' class='imagecommentflagreportbutton imageflagreportbutton iebutton' value='Report' id=" + difference[i]['id'] + "></div></form></div></div><div class='multiscore_count' style='display: none'> Score: <span id='multispan_score_" + difference[i][' id'] + "'>" + difference[i]['score'] + "</span></div></li>";

                                    $('.carousel_multi').append(strings + image_str + second_strings + like_str + dislike_str + flag_str + abusive_str + spam_str + iip_str + score_str);
                                }
                            }
                            $(".multi-element").css('height', ($(".content").height()) + 'px');
                            $(".multi-element").css('width', ($(".all-items-multi").width() - 85) + 'px');


                            updateimage(difference[i]['id']);

                            $(window).resize(function () {
                                $(".multi-element").css('height', ($(".content").height()) + 'px');
                                $(".multi-element").css('width', ($(".all-items-multi").width() - 85) + 'px');
                                updateimage(difference[i]['id']);


                            });
                        }
                        var total_width = parseInt($('.carousel_multi').width()) + number.length * ($(".all-items-multi").width() - 85) + number.length * 10;
                        $('.carousel_multi').css('width', total_width + 'px');

                    }
                    selected_id = parseInt($(".selected").parent().parent().parent().parent().siblings().attr("data_multi_elem_id"));
                    for (j = 0; j < Object.keys(multi_sorted_load).length; j++) {
                        $(".carousel_multi li").each(function () {
                            $("#multi_elem_" + multi_sorted_load[j]['id']).attr('data-score', multi_sorted_load[j]['score']);
                        });
                        $("#multi_elem_" + multi_sorted_load[j]['id']).attr('data-select-at', multi_sorted_load[j]['selected']);
                        $("#span_" + multi_sorted_load[j]['id']).text(multi_sorted_load[j]['total_likes']);
                        $("#span_dis_" + multi_sorted_load[j]['id']).text(multi_sorted_load[j]['total_dislikes']);
                    }

                    index = multi_sorted_load.findIndex((item) => item.selected === 1);
                    if (index != -1) {
                        from = $("#multi_elem_" + multi_sorted_load[index]['id']).detach();
                        $(".carousel_multi li:nth-child(1)").before(from);
                        if (parseInt($(".content_user").attr("content-user-id")) != parseInt($(".user").attr("id"))) {
                            $(".admin").remove();
                            $(".carousel_multi li:nth-child(1)").append("<div class='admin'><div class='multiselect_unselect'><span><div class='users'></div></span></div></div>");
                        }
                    }
                    multi_left = multi_left_next;
                    multi_count = multi_count + 1;
                    $(".carousel_multi").attr('data-count', multi_count);

                    if (multi_count == multi_sorted_load.length) {
                        $(".multiload-more").hide()
                    }
                    setInterval(function () {
                        $("#multiload_loader").hide();
                        if (multi_count == multi_sorted_load.length) {
                            //     $(".multiprev-load-more").show();
                            //     $(".multiload-more").hide()
                            // } else {
                            //     $(".multiload-more").show();
                        }
                    }, 1000);
                }
            }

        });


    });


    $(".multi_part").on('click', '.multiprev-load-more', function (e) {
        user = parseInt($('.user_id').attr("id"));
        multi_count = parseInt($(".carousel_multi").attr('data-count'));
        $(".multiload-more").show()
        // var multi_count = parseInt($(".carousel_multi").attr('data-count'));
        // lists_pointer = parseInt($('.cont').text());
        var multi_sorted_load = [];
        multi_count = multi_count - 1;
        mk = mk - 1;
        // n = n - 1;

        $(".carousel_multi").attr('data-count', multi_count);
        var left = parseInt($('.all-items-multi').css("margin-left"));
        var left_next = left + ($(".all-items-multi").width() - 85 + 10);
        $('.all-items-multi').animate({'margin-left': left_next + 'px'}, {"duration": 1000, "easing": "linear"});
        number = [];
        $('.carousel_multi').children().each(function () {
            number.push(parseInt($(this).attr("data_multi_elem_id")));
        });

        $.ajax({
            type: 'POST',
            url: 'ajax/multimedialoadmore.php',
            data: {lists_pointer: lists_pointer},
            success: function (data) {
                console.log(data)
                var objects = JSON.parse(data);
                if (typeof objects !== "undefined") {
                    for (i = 0; i < Object.keys(objects).length; i++) {
                        multi_sorted_load.push(objects[i]);
                    }
                    multiindex = multi_sorted_load.findIndex((item) => item.selected === 1);
                    console.log(multiindex);
                    if (multiindex != -1) {
                        var shifted = multi_sorted_load.splice(multiindex, 1);
                        multi_sorted_load.sort(function (a, b) {
                            var avalue = a.score;
                            bvalue = b.score;
                            if (avalue > bvalue) {
                                return -1;
                            } else if (bvalue > avalue) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });
                        multi_sorted_load.unshift(shifted[0]);
                    } else {
                        multi_sorted_load.sort(function (a, b) {
                            var avalue = a.score;
                            bvalue = b.score;
                            if (avalue > bvalue) {
                                return -1;
                            } else if (bvalue > avalue) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });
                    }

                    multiarray_load = [];
                    for (i = 0; i < number.length; i++) {
                        getmultiindexs = multi_sorted_load.findIndex((item) => item.id === number[i]);
                        multiarray_load.push(multi_sorted_load[getmultiindexs])
                    }
                    // multi_sorted_load.splice(multiarray_load.length)
                    var difference = [];

                    //for live value update
                    for (var i = 0; i < multiarray_load.length; i++) {
                        $("#multispan_" + multiarray_load[i]['id']).text(multiarray_load[i]['total_likes']);
                        $("#multispan_score_" + multiarray_load[i]['id']).text(multiarray_load[i]['score']);
                        $("#multi_elem_" + multiarray_load[i]['id']).attr('data-score', multiarray_load[i]['score']);
                        $("#multi_elem_" + multiarray_load[i]['id']).attr('data-select-at', multiarray_load[i]['selected']);

                    }
                    console.log(multiarray_load)
                    $(".carousel_multi").each(function () {
                        $(this).html($(this).children('li').sort(function (a, b) {
                            if (($(a).data('select-at')) > ($(b).data('select-at'))) {
                                return ($(b).data('select-at')) - ($(a).data('select-at'));
                            } else if (($(a).data('select-at')) === ($(b).data('select-at'))) {
                                if (($(a).data('score')) === ($(b).data('score'))) {
                                    return ($(a).data('score')) - ($(b).data('score'));
                                } else {
                                    return ($(b).data('score')) - ($(a).data('score'));
                                }
                            }
                        }));
                    });


                    jQuery.grep(multi_sorted_load, function (el) {
                        if (jQuery.inArray(el, multiarray_load) == -1) difference.push(el);
                    });

                    if (difference.length > 0) {
                        // for (i = difference.length - 1; i >= 0; i--) {
                        console.log(difference[0])
                        getmultiindexs = multi_sorted_load.findIndex((item) => item.id === difference[0]['id']);
                        console.log(getmultiindexs)


                        if (user === multi_sorted_load[getmultiindexs]['content_user_id']) {
                            strings = "<li class='multi-element' id='multi_elem_" + multi_sorted_load[getmultiindexs]['id'] + "' data_multi_elem_id='" + multi_sorted_load[getmultiindexs]['id'] + "' data-score=" + multi_sorted_load[getmultiindexs]['score'] + " data_id=" + multi_sorted_load[getmultiindexs]['id'] + " data-select-at=" + multi_sorted_load[getmultiindexs]['selected'] + "><div class='multicontent-part' id='multicontent_" + multi_sorted_load[getmultiindexs]['id'] + "'><div class='photo' id='des_" + multi_sorted_load[getmultiindexs]['id'] + "'>";

                            if (multi_sorted_load[getmultiindexs]['image'] != 'rml' && multi_sorted_load[getmultiindexs]['gettyimageid'] == null && multi_sorted_load[getmultiindexs]['giphyid'] == null && multi_sorted_load[getmultiindexs]['gfycatid'] == null) {
                                image_str = "<img src='images/contributionimages/" + multi_sorted_load[getmultiindexs]['image'] + "' class='multicontent' alt='No Image' id='content_" + multi_sorted_load[getmultiindexs]['id'] + "' style='height: 100%'>";
                            }
                            else if (multi_sorted_load[getmultiindexs]['image'] == '' && multi_sorted_load[getmultiindexs]['gettyimageid'] != null && multi_sorted_load[getmultiindexs]['giphyid'] == null && multi_sorted_load[getmultiindexs]['gfycatid'] == null) {
                                image_str = "<img src='images/raw/" + multi_sorted_load[getmultiindexs]['imageraw'] + "' class='multicontent thirdparty' alt='No Image' id='content_" + multi_sorted_load[getmultiindexs]['id'] + "' style='height: 100%'>";
                            }
                            else if (multi_sorted_load[getmultiindexs]['image'] == '' && multi_sorted_load[getmultiindexs]['gettyimageid'] == null && multi_sorted_load[getmultiindexs]['giphyid'] != null && multi_sorted_load[getmultiindexs]['gfycatid'] == null) {
                                // image_str = "<img src='https://i.giphy.com/" + multi_sorted_load[getmultiindexs]['giphyid'] + ".gif'  class='multicontent thirdparty' alt='No Image' id='content_" + multi_sorted_load[getmultiindexs]['id'] + "' style='height: 100%'>";

                                image_str =  "<img src='images/raw/" + multi_sorted_load[getmultiindexs]['imageraw'] + "' class='multicontent thirdparty' alt='No Image' id='content_" + multi_sorted_load[getmultiindexs]['id'] + "' style='height: 100%; visibility:hidden;'><iframe  src='https://giphy.com/embed/" +multi_sorted_load[getmultiindexs]['giphyid'] + "' id='contentframe_" + multi_sorted_load[getmultiindexs]['id'] + "' class='multicontent thirdparty'  frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0' allowfullscreen></iframe>";
                            }
                            else if (multi_sorted_load[getmultiindexs]['image'] == 'rml' && multi_sorted_load[getmultiindexs]['gettyimageid'] == null && multi_sorted_load[getmultiindexs]['giphyid'] == null && multi_sorted_load[getmultiindexs]['gfycatid'] != null) {

                                image_str = "<img src='https://thumbs.gfycat.com/" + multi_sorted_load[getmultiindexs]['gfycatid'] + "-size_restricted.gif' class='multicontent thirdparty' alt='No Image' id='content_" + multi_sorted_load[getmultiindexs]['id'] + "' style='height: 100%'>";

                            }
                            second_strings = "</div><div class='hoverable' style='display: none'><a href='../content_with_image.php/" + multi_sorted_load[getmultiindexs]['user_id'] + "'><img src='css/exm.jpg' alt='Paris' style='border:none ; border-radius:50%; background-color: white ; width:51px ;height:51px; position: relative; margin-top:20px; margin-left: 20px;'></a><div class='cont' style='display: none'>" + multi_sorted_load[getmultiindexs]['id'] + "</div><div class='multimain-content'><span class='multicontributor_name'>" + multi_sorted_load[getmultiindexs]['username'] + "</span></div><div class='multiopinion'><div class='multicontributionslikedislike'>";

                            if (multi_sorted_load[getmultiindexs]['like_before'] === true) {
                                var like_str = "<div id='multisel_" + multi_sorted_load[getmultiindexs]['id'] + "' data_field_id='" + multi_sorted_load[getmultiindexs]['id'] + "' class='multilikebutton multiliked_before'></div><span id='loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_" + multi_sorted_load[getmultiindexs]['id'] + "'>" + multi_sorted_load[getmultiindexs]['total_likes'] + "</span>"
                            } else {
                                like_str = "<div id='multisel_" + multi_sorted_load[getmultiindexs]['id'] + "' data_field_id='" + multi_sorted_load[getmultiindexs]['id'] + "' class='multilikebutton multilike'></div><span id='loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_" + multi_sorted_load[getmultiindexs]['id'] + "'>" + multi_sorted_load[getmultiindexs]['total_likes'] + "</span>"

                            }
                            if (multi_sorted_load[getmultiindexs]['dislike_before'] === true) {
                                var dislike_str = "<div id='multisel_dis_" + multi_sorted_load[getmultiindexs]['id'] + "' data_field_id='" + multi_sorted_load[getmultiindexs]['id'] + "' class='multidislikebutton multidisliked_before'></div><span id='dis_loader' style='display: none'><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_dis_" + multi_sorted_load[getmultiindexs]['id'] + "'>" + multi_sorted_load[getmultiindexs]['total_dislikes'] + "</span>"
                            } else {
                                dislike_str = "<div id='multisel_dis_" + multi_sorted_load[getmultiindexs]['id'] + "' data_field_id='" + multi_sorted_load[getmultiindexs]['id'] + "' class='multidislikebutton multidislike'></div><span id='dis_loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_dis_" + multi_sorted_load[getmultiindexs]['id'] + "'>" + multi_sorted_load[getmultiindexs]['total_dislikes'] + "</span>"

                            }
                            if (multi_sorted_load[getmultiindexs]['selected'] === 0) {
                                var selection = "</div></div><div class='admin'><div class='multiselect_unselect'><span><div  id='select_" + multi_sorted_load[getmultiindexs]['id'] + "'  class='multiselect not_selected'   data_field_id =" + multi_sorted_load[getmultiindexs]['id'] + "></div></span></div>";
                            } else {
                                selection = "</div></div><div class='admin'><div class='multiselect_unselect'><span><div id='select_" + multi_sorted_load[getmultiindexs]['id'] + "' class='multiselect selected' data_field_id =" + multi_sorted_load[getmultiindexs]['id'] + "></div></span></div>";
                            }
                            if (user === multi_sorted_load[getmultiindexs]['user_id']) {
                                delete_str = "</div><div class='imageitemoptionmorebutton_delete' id=" + multi_sorted_load[getmultiindexs]['id'] + "></div><div class='imageitemoptionmoreoptionholder_delete' id=" + multi_sorted_load[getmultiindexs]['id'] + " style='display: none'><div class='imageitemdeletetextparentholder' id=" + multi_sorted_load[getmultiindexs]['id'] + "> <div class='imageitemdeleteicon'></div><div class='imagedeletetextforitem'>Delete</div></div></div><div class='multiscore_count' style='display: none'> Score: <span id='multispan_score_" + multi_sorted_load[getmultiindexs]['id'] + "'>" + multi_sorted_load[getmultiindexs]['score'] + "</span></div></li>";
                                $(".carousel_multi li").last().before(strings + image_str + second_strings + like_str + dislike_str + selection + delete_str);

                            }

                            else {
                                flag_str = "</div></div><div class='imageitemoptionmorebutton_flag' id=" + multi_sorted_load[getmultiindexs]['id'] + "></div><div class='imageitemoptionmoreoptionholder_flag'><div class='imageitemflagas' style='display: none'><span class='imageitemflagdescription'>Flag multimedia contribution as:</span><form class='imageflagasoptionslist' id=" + multi_sorted_load[getmultiindexs]['id'] + "><div class='imageflagasoptionswrapper' id=" + multi_sorted_load[getmultiindexs]['id'] + ">"

                                if (multi_sorted_load[getmultiindexs]['abusive'] == 1) {
                                    var abusive_str = "<input type='checkbox' name='abusive'  class='flagasoptions abusive checked' label='Hateful or abusive' prev_abusive='" + multi_sorted_load[getmultiindexs]['abusive'] + "' data_val='1' data_id=" + multi_sorted_load[getmultiindexs]['id'] + "><span class='imageflagasoptionstext' checked='checked'>Hateful or abusive</span></div><div class='imageflagasoptionswrapper' id=" + multi_sorted_load[getmultiindexs]['id'] + " >"
                                }
                                else if (multi_sorted_load[getmultiindexs]['abusive'] == 0) {
                                    abusive_str = " <input type='checkbox' name='abusive'  class='flagasoptions abusive exist' label='Hateful or abusive' prev_abusive='" + multi_sorted_load[getmultiindexs]['abusive'] + "' data_val='0' data_id=" + multi_sorted_load[getmultiindexs]['id'] + "><span class='imageflagasoptionstext'>Hateful or abusive</span></div><div class='imageflagasoptionswrapper' id=" + multi_sorted_load[getmultiindexs]['id'] + ">"
                                }
                                else {
                                    abusive_str = " <input type='checkbox' name='abusive'  class='flagasoptions abusive' label='Hateful or abusive' prev_abusive='" + multi_sorted_load[getmultiindexs]['abusive'] + "' data_val='0' data_id=" + multi_sorted_load[getmultiindexs]['id'] + "><span class='imageflagasoptionstext'>Hateful or abusive</span></div><div class='imageflagasoptionswrapper' id=" + multi_sorted_load[getmultiindexs]['id'] + ">"
                                }

                                if (multi_sorted_load[getmultiindexs]['spam'] == 1) {
                                    var spam_str = "<input type='checkbox' name='spam'  class='flagasoptions spam checked' label='Spam or inappropriate' prev_spam='" + multi_sorted_load[getmultiindexs]['spam'] + "' data_val='1' data_id=" + multi_sorted_load[getmultiindexs]['id'] + "><span class='imageflagasoptionstext' checked='checked'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + multi_sorted_load[getmultiindexs]['id'] + " >"
                                }
                                else if (multi_sorted_load[getmultiindexs]['spam'] == 0) {
                                    var spam_str = "<input type='checkbox' name='spam'  class='flagasoptions spam exist' label='Spam or inappropriate' prev_spam='" + multi_sorted_load[getmultiindexs]['spam'] + "' data_val='0' data_id=" + multi_sorted_load[getmultiindexs]['id'] + "><span class='imageflagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + multi_sorted_load[getmultiindexs]['id'] + ">"
                                }
                                else {

                                    var spam_str = "<input type='checkbox' name='spam'  class='flagasoptions spam' label='Spam or inappropriate' prev_spam='" + multi_sorted_load[getmultiindexs]['spam'] + "' data_val='0' data_id=" + multi_sorted_load[getmultiindexs]['id'] + "><span class='imageflagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + multi_sorted_load[getmultiindexs]['id'] + ">"
                                }

                                if (multi_sorted_load[getmultiindexs]['iip'] == 1) {
                                    var iip_str = "<input type='checkbox' name='ip'  class='flagasoptions listflagip checked' label='Infringment of intellectual property' prev_iip='" + multi_sorted_load[getmultiindexs]['iip'] + "' data_val='1' data_id=" + multi_sorted_load[getmultiindexs]['id'] + " checked='checked'><span class='imageflagasoptionstext'>Infringment of intellectual property</span>"
                                }
                                else if (multi_sorted_load[getmultiindexs]['iip'] == 0) {
                                    iip_str = "<input type='checkbox' name='ip'  class='flagasoptions listflagip exist' label='Infringment of intellectual property' prev_iip='" + multi_sorted_load[getmultiindexs]['iip'] + "' data_val='0' data_id=" + multi_sorted_load[getmultiindexs]['id'] + "><span class='imageflagasoptionstext'>Infringment of intellectual property</span>"
                                }
                                else {
                                    iip_str = "<input type='checkbox' name='ip'  class='flagasoptions listflagip' label='Infringment of intellectual property' prev_spam='" + multi_sorted_load[getmultiindexs]['iip'] + "' data_val='0' data_id=" + multi_sorted_load[getmultiindexs]['id'] + "><span class='imageflagasoptionstext'>Infringment of intellectual property</span>"
                                }

                                score_str = "</div><div class='imageflagreportbuttonholder' id=" + multi_sorted_load[getmultiindexs]['id'] + "><div class='imageflagreportobutton allcorners' id=" + multi_sorted_load[getmultiindexs]['id'] + "><input type='button' class='imagecommentflagreportbutton imageflagreportbutton iebutton' value='Report' id=" + multi_sorted_load[getmultiindexs]['id'] + "></div></form></div></div><div class='multiscore_count' style='display: none'> Score: <span id='multispan_score_" + multi_sorted_load[getmultiindexs][' id'] + "'>" + multi_sorted_load[getmultiindexs]['score'] + "</span></div></li>"

                                $(".carousel_multi li").last().before(strings + image_str + second_strings + like_str + dislike_str + selection + flag_str + abusive_str + spam_str + iip_str + score_str);
                            }

                        }
                        else {
                            strings = "<li class='multi-element' id='multi_elem_" + multi_sorted_load[getmultiindexs]['id'] + "' data_multi_elem_id='" + multi_sorted_load[getmultiindexs]['id'] + "' data-score=" + multi_sorted_load[getmultiindexs]['score'] + " data_id=" + multi_sorted_load[getmultiindexs]['id'] + " data-select-at=" + multi_sorted_load[getmultiindexs]['selected'] + "><div class='multicontent-part' id='multicontent_" + multi_sorted_load[getmultiindexs]['id'] + "'><div class='photo' id='des_" + multi_sorted_load[getmultiindexs]['id'] + "'>";

                            if (multi_sorted_load[getmultiindexs]['image'] != 'rml' && multi_sorted_load[getmultiindexs]['gettyimageid'] == null && multi_sorted_load[getmultiindexs]['giphyid'] == null && multi_sorted_load[getmultiindexs]['gfycatid'] == null) {
                                image_str = "<img src='images/contributionimages/" + multi_sorted_load[getmultiindexs]['image'] + "' class='multicontent' alt='No Image' id='content_" + multi_sorted_load[getmultiindexs]['id'] + "' style='height: 100%'>";
                            }
                            else if (multi_sorted_load[getmultiindexs]['image'] == '' && multi_sorted_load[getmultiindexs]['gettyimageid'] != null && multi_sorted_load[getmultiindexs]['giphyid'] == null && multi_sorted_load[getmultiindexs]['gfycatid'] == null) {
                                image_str = "<img src='images/raw/" + multi_sorted_load[getmultiindexs]['imageraw'] + "' class='multicontent thirdparty' alt='No Image' id='content_" + multi_sorted_load[getmultiindexs]['id'] + "' style='height: 100%'>";
                            }
                            else if (multi_sorted_load[getmultiindexs]['image'] == '' && multi_sorted_load[getmultiindexs]['gettyimageid'] == null && multi_sorted_load[getmultiindexs]['giphyid'] != null && multi_sorted_load[getmultiindexs]['gfycatid'] == null) {
                                // image_str = "<img src='https://i.giphy.com/" + multi_sorted_load[getmultiindexs]['giphyid'] + ".gif'  class='multicontent thirdparty' alt='No Image' id='content_" + multi_sorted_load[getmultiindexs]['id'] + "' style='height: 100%'>";


                                image_str =  "<img src='images/raw/" + multi_sorted_load[getmultiindexs]['imageraw'] + "'  class='multicontent thirdparty' alt='No Image' id='content_" + multi_sorted_load[getmultiindexs]['id'] + "' style='height: 100%; visibility:hidden;'><iframe  src='https://giphy.com/embed/" + multi_sorted_load[getmultiindexs]['giphyid'] + "' id='contentframe_" + multi_sorted_load[getmultiindexs]['id'] + "' class='multicontent thirdparty'  frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0' allowfullscreen></iframe>";
                            }
                            else if (multi_sorted_load[getmultiindexs]['image'] == 'rml' && multi_sorted_load[getmultiindexs]['gettyimageid'] == null && multi_sorted_load[getmultiindexs]['giphyid'] == null && multi_sorted_load[getmultiindexs]['gfycatid'] != null) {

                                image_str = "<img src='https://thumbs.gfycat.com/" + multi_sorted_load[getmultiindexs]['gfycatid'] + "-size_restricted.gif' class='multicontent thirdparty' alt='No Image' id='content_" + multi_sorted_load[getmultiindexs]['id'] + "' style='height: 100%'>";

                            }
                            second_strings = "</div><div class='hoverable' style='display: none'><a href='../content_with_image.php/" + multi_sorted_load[getmultiindexs]['user_id'] + "'><img src='css/exm.jpg' alt='Paris' style='border:none ; border-radius:50%; background-color: white ; width:51px ;height:51px; position: relative; margin-top:20px; margin-left: 20px;'></a><div class='cont' style='display: none'>" + multi_sorted_load[getmultiindexs]['id'] + "</div><div class='multimain-content'><span class='multicontributor_name'>" + multi_sorted_load[getmultiindexs]['username'] + "</span></div><div class='multiopinion'><div class='multicontributionslikedislike'>";

                            if (multi_sorted_load[getmultiindexs]['like_before'] === true) {
                                var like_str = "<div id='multisel_" + multi_sorted_load[getmultiindexs]['id'] + "' data_field_id='" + multi_sorted_load[getmultiindexs]['id'] + "' class='multilikebutton multiliked_before'></div><span id='loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_" + multi_sorted_load[getmultiindexs]['id'] + "'>" + multi_sorted_load[getmultiindexs]['total_likes'] + "</span>"
                            } else {
                                like_str = "<div id='multisel_" + multi_sorted_load[getmultiindexs]['id'] + "' data_field_id='" + multi_sorted_load[getmultiindexs]['id'] + "' class='multilikebutton multilike'></div><span id='loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_" + multi_sorted_load[getmultiindexs]['id'] + "'>" + multi_sorted_load[getmultiindexs]['total_likes'] + "</span>"

                            }
                            if (multi_sorted_load[getmultiindexs]['dislike_before'] === true) {
                                var dislike_str = "<div id='multisel_dis_" + multi_sorted_load[getmultiindexs]['id'] + "' data_field_id='" + multi_sorted_load[getmultiindexs]['id'] + "' class='multidislikebutton multidisliked_before'></div><span id='dis_loader' style='display: none'><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_dis_" + multi_sorted_load[getmultiindexs]['id'] + "'>" + multi_sorted_load[getmultiindexs]['total_dislikes'] + "</span>"
                            } else {
                                dislike_str = "<div id='multisel_dis_" + multi_sorted_load[getmultiindexs]['id'] + "' data_field_id='" + multi_sorted_load[getmultiindexs]['id'] + "' class='multidislikebutton multidislike'></div><span id='dis_loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_dis_" + multi_sorted_load[getmultiindexs]['id'] + "'>" + multi_sorted_load[getmultiindexs]['total_dislikes'] + "</span>"

                            }
                            if (user === multi_sorted_load[getmultiindexs]['user_id']) {
                                delete_str = "</div><div class='imageitemoptionmorebutton_delete' id=" + multi_sorted_load[getmultiindexs]['id'] + "></div><div class='imageitemoptionmoreoptionholder_delete' id=" + multi_sorted_load[getmultiindexs]['id'] + " style='display: none'><div class='imageitemdeletetextparentholder' id=" + multi_sorted_load[getmultiindexs]['id'] + "> <div class='imageitemdeleteicon'></div><div class='imagedeletetextforitem'>Delete</div></div></div><div class='multiscore_count' style='display: none'> Score: <span id='multispan_score_" + multi_sorted_load[getmultiindexs]['id'] + "'>" + multi_sorted_load[getmultiindexs]['score'] + "</span></div></li>";
                                $(".carousel_multi li").last().before(strings + image_str + second_strings + like_str + dislike_str + delete_str);
                            }
                            else {
                                flag_str = "</div></div><div class='imageitemoptionmorebutton_flag' id=" + multi_sorted_load[getmultiindexs]['id'] + "></div><div class='imageitemoptionmoreoptionholder_flag'><div class='imageitemflagas' style='display: none'><span class='imageitemflagdescription'>Flag multimedia contribution as:</span><form class='imageflagasoptionslist' id=" + multi_sorted_load[getmultiindexs]['id'] + "><div class='imageflagasoptionswrapper' id=" + multi_sorted_load[getmultiindexs]['id'] + ">"

                                if (multi_sorted_load[getmultiindexs]['abusive'] == 1) {
                                    var abusive_str = "<input type='checkbox' name='abusive'  class='flagasoptions abusive checked' label='Hateful or abusive' prev_abusive='" + multi_sorted_load[getmultiindexs]['abusive'] + "' data_val='1' data_id=" + multi_sorted_load[getmultiindexs]['id'] + " checked='checked'><span class='imageflagasoptionstext'>Hateful or abusive</span></div><div class='imageflagasoptionswrapper' id=" + multi_sorted_load[getmultiindexs]['id'] + ">"
                                }
                                else if (multi_sorted_load[getmultiindexs]['abusive'] == 0) {
                                    abusive_str = " <input type='checkbox' name='abusive'  class='flagasoptions abusive exist' label='Hateful or abusive' prev_abusive='" + multi_sorted_load[getmultiindexs]['abusive'] + "' data_val='0' data_id=" + multi_sorted_load[getmultiindexs]['id'] + "><span class='imageflagasoptionstext'>Hateful or abusive</span></div><div class='imageflagasoptionswrapper' id=" + multi_sorted_load[getmultiindexs]['id'] + ">"
                                }
                                else {
                                    abusive_str = " <input type='checkbox' name='abusive'  class='flagasoptions abusive' label='Hateful or abusive' prev_abusive='" + multi_sorted_load[getmultiindexs]['abusive'] + "' data_val='0' data_id=" + multi_sorted_load[getmultiindexs]['id'] + "><span class='imageflagasoptionstext'>Hateful or abusive</span></div><div class='imageflagasoptionswrapper' id=" + multi_sorted_load[getmultiindexs]['id'] + ">"
                                }

                                if (multi_sorted_load[getmultiindexs]['spam'] == 1) {
                                    var spam_str = "<input type='checkbox' name='spam'  class='flagasoptions spam checked' label='Spam or inappropriate' prev_spam='" + multi_sorted_load[getmultiindexs]['spam'] + "' data_val='1' data_id=" + multi_sorted_load[getmultiindexs]['id'] + " checked='checked'><span class='imageflagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + multi_sorted_load[getmultiindexs]['id'] + ">"
                                }
                                else if (multi_sorted_load[getmultiindexs]['spam'] == 0) {
                                    var spam_str = "<input type='checkbox' name='spam'  class='flagasoptions spam exist' label='Spam or inappropriate' prev_spam='" + multi_sorted_load[getmultiindexs]['spam'] + "' data_val='0' data_id=" + multi_sorted_load[getmultiindexs]['id'] + "><span class='imageflagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + multi_sorted_load[getmultiindexs]['id'] + ">"
                                }
                                else {

                                    var spam_str = "<input type='checkbox' name='spam'  class='flagasoptions spam' label='Spam or inappropriate' prev_spam='" + multi_sorted_load[getmultiindexs]['spam'] + "' data_val='0' data_id=" + multi_sorted_load[getmultiindexs]['id'] + "><span class='imageflagasoptionstext'>Spam or inappropriate</span></div><div class='flagasoptionswrapper' id=" + multi_sorted_load[getmultiindexs]['id'] + ">"
                                }

                                if (multi_sorted_load[getmultiindexs]['iip'] == 1) {
                                    var iip_str = "<input type='checkbox' name='ip'  class='flagasoptions listflagip checked' label='Infringment of intellectual property' prev_iip='" + multi_sorted_load[getmultiindexs]['iip'] + "' data_val='1' data_id=" + multi_sorted_load[getmultiindexs]['id'] + " checked='checked'><span class='imageflagasoptionstext'>Infringment of intellectual property</span>"
                                }
                                else if (multi_sorted_load[getmultiindexs]['iip'] == 0) {
                                    iip_str = "<input type='checkbox' name='ip'  class='flagasoptions listflagip exist' label='Infringment of intellectual property' prev_iip='" + multi_sorted_load[getmultiindexs]['iip'] + "' data_val='0' data_id=" + multi_sorted_load[getmultiindexs]['id'] + "><span class='imageflagasoptionstext'>Infringment of intellectual property</span>"
                                }
                                else {
                                    iip_str = "<input type='checkbox' name='ip'  class='flagasoptions listflagip' label='Infringment of intellectual property' prev_spam='" + multi_sorted_load[getmultiindexs]['iip'] + "' data_val='0' data_id=" + multi_sorted_load[getmultiindexs]['id'] + "><span class='imageflagasoptionstext'>Infringment of intellectual property</span>"
                                }

                                score_str = "</div><div class='imageflagreportbuttonholder' id=" + multi_sorted_load[getmultiindexs]['id'] + "><div class='imageflagreportobutton allcorners' id=" + multi_sorted_load[getmultiindexs]['id'] + "><input type='button' class='imagecommentflagreportbutton imageflagreportbutton iebutton' value='Report' id=" + multi_sorted_load[getmultiindexs]['id'] + "></div></form></div></div><div class='multiscore_count' style='display: none'> Score: <span id='multispan_score_" + multi_sorted_load[getmultiindexs][' id'] + "'>" + multi_sorted_load[getmultiindexs]['score'] + "</span></div></li>"

                                $(".carousel_multi li").last().before(strings + image_str + second_strings + like_str + dislike_str + flag_str + abusive_str + spam_str + iip_str + score_str);
                            }

                        }

                        $("#multi_elem_" + multi_sorted_load[getmultiindexs]['id']).css('width', ($(".all-items-multi").width() - 85) + 'px');
                        $("#multi_elem_" + multi_sorted_load[getmultiindexs]['id']).css('height', ($(".content").height()) + 'px');

                        updateimage(multi_sorted_load[getmultiindexs]['id']);

                        $(window).resize(function () {

                            // $("#multi_elem_" + multi_sorted_load[getmultiindexs]['id']).css('width', ($(".all-items-multi").width() - 85) + 'px');
                            // $("#multi_elem_" + multi_sorted_load[getmultiindexs]['id']).css('height', ($(".content").height()) + 'px');
                            loadmoreupdateimage(multi_sorted_load[getmultiindexs]['id']);
                        });

                        multi_total_width = parseInt($('.carousel_multi').width()) + number.length * ($(".all-items-multi").width() - 85) + number.length * 10;
                        $('.carousel_multi').css('width', multi_total_width + 'px');
                    }

                }
            }

        });
        if (multi_count == 0) {
            $('.multiload-more').show();
            $('.multiprev-load-more').hide();
        }


        multi_left = multi_left_next;
    });

})
