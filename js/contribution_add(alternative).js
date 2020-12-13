$(document).ready(function () {

    $(window).on('resize', function () {

        $(".multi_part").on('mouseenter', function () {
// $(".uploadimage").css('display', 'block');
        });
        $(".multi_part").on('mouseleave', function () {
// $(".uploadimage").css('display', 'none');
        });
        $(".carousel_multi").on('mouseover', '.multi-element', function () {

            $(this).children().find(".hoverable").css({'display': 'block'});
        });
        $(".carousel_multi").on('mouseout', '.multi-element', function () {

            $(this).children().find(".hoverable").css({'display': 'none'});
        });


    });

    $(".multi_part").on('mouseenter', function () {
// $(".uploadimage").css('display', 'block');
    });

    $(".multi_part").on('mouseleave', function () {
// $(".uploadimage").css('display', 'none');
    });

    $(".carousel_multi").on('mouseover', '.multi-element', function () {

        $(this).children().find(".hoverable").css({'display': 'block'});
    });

    $(".carousel_multi").on('mouseout', '.multi-element', function () {

        $(this).children().find(".hoverable").css({'display': 'none'});
    });

    $(".wrapper").on('click', '#disagree', function (e) {
        n = parseInt($('.carousel li').length);

        console.log($(".carousel li").length);
        $(".load-more").hide();
        $(".prev-load-more").hide();
        Contri_string = "<div class='show'><img src='css/exm.jpg' alt='Paris' style='border:none ; border-radius:50%; background-color: white ; width:70px ;height:70px; position: relative; margin-top:20px; margin-left: 20px'><div class='contributions'><textarea name='text' id='text' style='top:-740px;'></textarea><div class='bs'><button type='submit' name='submit' id='contribute'>Contribute</button></div></div></div>";
        if ($(".carousel li").length == 0) {

            $(".mainc").css("display", "none");

        } else {
            $(".all-items").css("display", "none");
        }
        $("#itemtitletext").after(Contri_string);
        $("#disagree").hide();
        $('textarea').each(function () {
            this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
        }).on('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

        $(".wrapper").on('click', '#contribute', function () {
            list_number = parseInt($('.carousel li').length);
            $(".all-items").show();

            n = n + 1;
            list_number = list_number + 1;

            total_width = parseInt($('.carousel').width()) + n * ($(".all-items").width() - 85) + n * 10;
            console.log(parseInt($('.carousel').width()))
            $('.carousel').css('width', total_width + 'px');

            $(".show").hide();
            var text = $('#text').val();
            console.log(text);
            var user_id = $('.user').attr('id');
            console.log(user_id);
            var lists_pointer = $('.check-con').attr('id');
            console.log(lists_pointer);
            var content_user_id = $(".content_user").attr("content-user-id");
            console.log(content_user_id);

            if ($('#text').val() == '') {
// $("#contribute").attr("disabled", true);

            } else {

                $("#disagree").show();
                $.ajax({
                    type: 'POST',
                    url: 'ajax/contribution.php',
                    dataType: 'text',
                    data: {text: text, user_id: user_id, lists_pointer: lists_pointer},
                    success: function (data) {
                        console.log(data);
                        var objects = JSON.parse(data);

                        sorted_load = Object.values(objects);
                        console.log(Object.keys(objects).length)

                        index_sel = sorted_load.findIndex((item) => item.selected === 1);
                        if (index_sel != -1) {
                            var shifted = sorted_load.shift(index_sel);
                            sorted_load.sort(function (a, b) {
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
                            sorted_load.unshift(shifted);
                        } else {
                            sorted_load.sort(function (a, b) {

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
                        console.log(sorted_load);
                        id_index = parseInt(Object.keys(objects).length - 1);
                        console.log(objects[id_index]['id']);
                        index = sorted_load.findIndex((item) => item.id === objects[id_index]['id']);

                        listrings = "<li class='element' id='elem_" + sorted_load[index]['id'] + "' data_elem_id=" + sorted_load[index]['id'] + " data-score=" + sorted_load[index]['score'] + " data_id=" + sorted_load[index]['id'] + " data-select-at=" + sorted_load[index]['selected'] + " ><div class='content-part'><a href='../content_with_image.php/" + sorted_load[index]['user_id'] + "'><img src='css/exm.jpg' alt='Paris' style='border:none ; border-radius:50%; background-color: white ; width:70px ;height:70px; position: relative; margin-top:20px; margin-left: 20px'></a><div class='main-content'><span class='contributor_name'>" + sorted_load[index]['username'] + " </span><div class='descrip' id='des_" + sorted_load[index]['id'] + "'><p class='para' id='para_" + sorted_load[index]['id'] + "'>" + sorted_load[index]['text'] + " </p></div></div>";
                        if (sorted_load[index]['like_before'] === true) {
                            var like_str = "</div><div class='opinion'><div class='contributionslikedislike'><div class='likebutton liked_before' id='sel_" + sorted_load[index]['id'] + "' data_field_id=" + sorted_load[index]['id'] + "></div><span class='point' id='span_" + sorted_load[index]['id'] + "' >" + sorted_load[index]['total_likes'] + "</span>";
                        } else {
                            like_str = "</div><div class='opinion'><div class='contributionslikedislike'><div class='likebutton like'  id='sel_" + sorted_load[index]['id'] + "' data_field_id=" + sorted_load[index]['id'] + "></div><span class='point' id='span_" + sorted_load[index]['id'] + "' >" + sorted_load[index]['total_likes'] + "</span></div>";
                        }
                        if (sorted_load[index]['dislike_before'] === true) {
                            var dislike_str = "<div class='dislikebutton disliked_before'  id='sel_dis_" + sorted_load[index]['id'] + "' data_field_id =" + sorted_load[index]['id'] + "></div><span class='point' id='span_dis_" + sorted_load[index]['id'] + "' > " + sorted_load[index]['total_dislikes'] + " </span>";
                        } else {
                            dislike_str = "<div class='dislikebutton dislike'  id='sel_dis_" + sorted_load[index]['id'] + "' data_field_id =" + sorted_load[index]['id'] + "></div><span class='point' id='span_dis_" + sorted_load[index]['id'] + "' > " + sorted_load[index]['total_dislikes'] + " </span>";
                        }
                        score_str = "</div><div class='itemoptionmorebutton_delete' id=" + sorted_load[index]['id'] + "></div><div class='itemoptionmoreoptionholder_delete' id=" + sorted_load[index]['id'] + " style='display: none'><div class='itemdeletetextparentholder' id=" + sorted_load[index]['id'] + "><div class='itemdeleteicon'></div><div class='deletetextforitem'>Delete</div></div></div><div class='score_count' style='display: none'> Score: <span id='span_score_" + sorted_load[index]['id'] + "'>" + sorted_load[index]['score'] + "</span></div></li>";

                        strings = listrings + like_str + dislike_str + score_str;


                        if ($(".carousel li").length == 0 && !$.trim($('.mainc').html()).length == true) {
                            $(".mainc").show();
                            $(".carousel").append(strings);
                            $("#elem_" + sorted_load[index]['id']).css('width', ($(".main").width() - 85) + 'px');
                            $("#elem_" + sorted_load[index]['id']).css('height', ($(".main").height()) + 'px');
                        } else if ($(".carousel li").length == 0 && !$.trim($('.mainc').html()).length == false) {
                            $(".mainc").show();
                            $(".carousel").append(strings);
                            $("#elem_" + sorted_load[index]['id']).css('width', ($(".all-items").width() - 85) + 'px');
                            $("#elem_" + sorted_load[index]['id']).css('height', ($(".all-items").height() - $(".bs").height()) + 'px');
                            $(".load-more").show();

                        } else if ($(".carousel li").length > 0) {
                            $(".prev-load-more").show();
                            $(".mainc").show();
                            $('.carousel li').last().after(strings);
                            $(".element").css('width', ($(".all-items").width() - 85) + 'px');
                            $(".element").css('height', 196 + 'px');
                        }

                        $(".carousel").attr('data-count', list_number);

                        var add_count = parseInt($(".carousel").attr('data-count'));
                        var addleft_width = parseInt($('.element').width());
                        var add_distance = add_count * addleft_width + add_count * 10;
                        $('.all-items').animate({'margin-left': -add_distance + 'px'}, {
                            "duration": 1000,
                            "easing": "linear"
                        });
                        $(window).resize(function () {
                            var add_count = parseInt($(".carousel").attr('data-count'));
                            var addleft_width = parseInt($('.element').width());
                            var add_distance = add_count * addleft_width + add_count * 10;
                            $('.all-items').css('margin-left', -add_distance + 'px');
                        });


                        $("#all").val(sorted_load.length);
                        $("#row").val(Number($('#row').val()) + 1);

                        if (add_count === 0) {
                            $(".prev-load-more").hide()
                        }

                        if (add_count == sorted_load.length) {
                            $(".load-more").hide();
                        }
                        else {
                            $(".load-more").show();
                        }

                        height = $("#para_" + sorted_load[index]['id']).height();
                        console.log(height);
                        if (height > 200) {
                            $("#des_" + sorted_load[index]['id'])
                                .jScrollPane()
                                .bind(
                                    'mousewheel',
                                    function (e) {
                                        e.preventDefault();
                                    }
                                );


                            api = $("#des_" + sorted_load[index]['id'])
                                .jScrollPane()
                                .bind(
                                    'mousewheel',
                                    function (e) {
                                        e.preventDefault();
                                    }
                                );


                            api = $("#des_" + load_array[i]['id']).data('jsp');
                            var throttleTimeout;
                            api.reinitialise();
                            $(window).on('resize', function () {


                                    if (!throttleTimeout) {
                                        throttleTimeout = setTimeout(
                                            function () {
                                                api.reinitialise();
                                                throttleTimeout = null;
                                            },
                                            10
                                        );
                                    }
                                }
                            );
                        }

                    }
                });
            }
            $('#text').val('');
// last = last_id;
        });
    });

    $(".uploadimage").on('click', function (e) {

        $(".imageuploadpopupphoto").css('width', '').css('height', '');
        $('body').css('overflow', 'hidden');
// $(".uploadimage").css('display', 'none');
        $(".multiload-more").css('display', 'none');
        $(".multiprev-load-more").css('display', 'none');
        $("#imageselectiondivbackground").css({'display': 'block'})
        $(".imageuploadpopup").css('display', 'none');

        $(".imageselectiondiv").css('display', 'block');
// preventing page from redirecting
        $("html").on("dragover", function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        $("html").on("drop", function (e) {
            e.preventDefault();
            e.stopPropagation();
        });

        reset_form_element($('.imageuploadpopupuploadbutton'));
// e.preventDefault();
        $("#imageuploadpopupbuttonselect").removeClass('imageuploadpopupbuttondisabled');
        $("#imageuploadpopupbuttonselect").addClass('imageuploadpopupbutton');
        $("#imageuploadpopupbuttonselect").prop('disabled', false);
        $(".loading").css('display', 'none');
// $(".imageuploadfromyourdeviceholder").siblings().css({'display': 'none'});
// $(".imageuploadfromyourdeviceholder").css({'display': 'block'});
        $(".imageuploadpopupphoto").attr("src", 'images/fallbackimages/itemimage.png');
// $("#imageuploadpopup").css({'display': 'block'});
        $(".createlistrawimageurl").val('');
        $(".imageuploadpopupfeedback").text('');
        $(".imageuploadpopupuploadtext").text("Select new image");
        $(".imageuploadpopupuploadtext").css('color', 'rgb(153, 153, 153');
        $(".imageuploadfromyourdevice").siblings().removeClass('multiselected');
        $(".imageuploadfromyourdevice").addClass('multiselected');
        $(".imagefromgiphyimage").val('');
        $(".imagefromgfycatimage").val('');
        $(".imagefromgettyimages").val('');
        $(".imageselectiondiv").removeClass("notdraggable");

    });

//for resetting input file on change
    function reset_form_element(e) {
        e.wrap('<form>').parent('form').trigger('reset');
        e.unwrap();
    }


    function adjustmargins(orientclass) {

        var currentimagewidth = $(".imageuploadpopupphoto").width();
        var currentimageheight = $(".imageuploadpopupphoto").height();
        // if ($(".imageuploadpopupphoto").hasClass('ninetydeg') || $(".imageuploadpopupphoto").hasClass('twoseventydeg')) {
        if (orientclass === 'zerodeg' || orientclass === 'flipzerodeg' || orientclass === 'oneeightydeg' || orientclass === 'fliponeeightydeg') {
            console.log("not working in if case");
            // if ($(".imageuploadpopupphoto").hasClass('zerodeg') || $(".imageuploadpopupphoto").hasClass('oneeightydeg')) {
            if (!($.browser.msie && $.browser.version < 9)) {
                $(".imageuploadpopupphoto").css('margin', 0);
            } else {
                $(".imageuploadpopupphoto").css('margin-bottom', 0);
            }
            if ($.browser.msie) {
                var wrapperleftiewidth = $(".imageuploadpopupphoto").width();
                $(".imageuploadpopupphotowrapperleft").css('width', wrapperleftiewidth).css('margin-right', 10);
            }

        }
        else {


            if (!($.browser.msie && $.browser.version < 9)) {
                console.log("browser version is 9");
                var marginratioceil = Math.ceil((currentimagewidth - currentimageheight) / 2);
                var marginratiofloor = Math.floor(currentimagewidth - currentimageheight) / 2;
                console.log(marginratioceil);
                console.log(marginratiofloor);
                $(".imageuploadpopupphoto").css('margin-top', +marginratioceil);
                $(".imageuploadpopupphoto").css('margin-bottom', +marginratiofloor);
                $(".imageuploadpopupphoto").css('margin-left', -marginratioceil);
                $(".imageuploadpopupphoto").css('margin-right', -marginratiofloor);
            } else {
                console.log("browser version is less");
                $(".imageuploadpopupphoto").css('margin-bottom', -(currentimagewidth - currentimageheight));
            }
            if ($.browser.msie) {
                console.log($.browser.msie);
                if ($.browser.version >= 9) {
                    console.log("another version")
                    var wrapperleftiewidth = $(".imageuploadpopupphoto").height();
                    $(".imageuploadpopupphotowrapperleft").css('width', wrapperleftiewidth).css('margin-right', 10);
                } else {
                    console.log("The else browser version")
                    var wrapperleftiewidth = $(".imageuploadpopupphotowrapperleft").width();
                    $(".imageuploadpopupphotowrapperleft").css('width', wrapperleftiewidth).css('margin-right', 10);
                }
            }


        }
    }


    function display_new_image(img, imagesrc) {
        console.log(imagesrc)
        console.log($('.imageuploadpopupphoto').get(0).complete)
        // console.log($('.imageuploadpopupphoto').get(0).complete
        $('.imageuploadpopupphoto').imgAreaSelect({remove: true});
        // if (!window.atob) window.atob = base64.decode;
        if (!($.browser.msie && $.browser.version < 10)) {

            var b64 = img.src;
            var bin = atob(b64.split(',')[1]);
            var binaryFile = new EXIF.BinaryFile(bin, 0, bin.length);
            var exif = EXIF.findEXIFinJPEG(binaryFile);
            console.log(exif.Orientation);


            if (exif.Orientation == '6') {
                orientclass = "ninetydeg";
            } else if (exif.Orientation == '8') {
                orientclass = "twoseventydeg";
            } else if (exif.Orientation == '3') {
                orientclass = "oneeightydeg";
            }
            else if (exif.Orientation == '2') {
                orientclass = "flipzerodeg";
            }
            else if (exif.Orientation == '4') {
                orientclass = "fliponeeightydeg";
            }
            else if (exif.Orientation == '5') {
                orientclass = "flipninetydeg";
            }
            else if (exif.Orientation == '7') {
                orientclass = "fliptwoseventydeg";
            }
            else {
                orientclass = "zerodeg";
            }
            uploadedimg = new Image();
            uploadedimg.onload = function () {
                var maxdisplaywidth = $("#listimageuploadpopuptitle").width();
                var maxdisplayheight = 400;
                console.log()
                upsrc = this.src
                // $(".imageuploadpopupphoto").attr('src', upsrc);
                $('.imageuploadpopupphoto').removeClass('zerodeg').removeClass('ninetydeg').removeClass('oneeightydeg').removeClass('twoseventydeg').removeClass('flipzerodeg').removeClass('flipninetydeg').removeClass('fliponeeightydeg').removeClass('fliptwoseventydeg')
                $('.imageuploadpopupphoto').attr('src', this.src).addClass(orientclass);

                if ($.browser.msie && $.browser.version < 9) {
                    console.log( $.browser.version)

                    if (orientclass === 'zerodeg' || orientclass === 'flipzerodeg' || orientclass === 'oneeightydeg' || orientclass === 'fliponeeightydeg') {
                        console.log("zero");

                        var naturalwidth = $(".imageuploadpopupphoto").width();
                        var naturalheight = $(".imageuploadpopupphoto").height();
                    }
                    else {

                        var naturalwidth = $(".imageuploadpopupphoto").height();
                        var naturalheight = $(".imageuploadpopupphoto").width();

                    }

                }
                else{

                    var naturalwidth = this.width;
                    var naturalheight = this.height;
                }
                var finalimagewidth = naturalwidth;
                var finalimageheight = naturalheight;


                if (orientclass === 'zerodeg' || orientclass === 'flipzerodeg' || orientclass === 'oneeightydeg' || orientclass === 'fliponeeightydeg') {

                    var currentnaturalwidth = naturalwidth;
                    var currentnaturalheight = naturalheight;
                    var availableaspectratio = maxdisplaywidth / maxdisplayheight;
                    var imageaspectratio = currentnaturalwidth / currentnaturalheight;

                    if (imageaspectratio < availableaspectratio) {
                        var scaleforimage = maxdisplayheight / currentnaturalheight;
                    }
                    else {
                        var scaleforimage = maxdisplaywidth / currentnaturalwidth;
                    }
                    var finalimagewidth = Math.floor(currentnaturalwidth * scaleforimage);
                    var finalimageheight = Math.floor(currentnaturalheight * scaleforimage);
                    console.log("finalwidth" + finalimagewidth)
                    console.log("finalheight" + finalimageheight)
                    $(".imageuploadpopupphoto").width(finalimagewidth);
                    $(".imageuploadpopupphoto").height(finalimageheight);
                }


                else {

                    console.log(naturalheight);
                    console.log(naturalwidth);

                    var currentnaturalwidth = naturalheight;
                    var currentnaturalheight = naturalwidth;

                    var availableaspectratio = maxdisplaywidth/maxdisplayheight;
                    var imageaspectratio = currentnaturalwidth/currentnaturalheight;
                    if(imageaspectratio<availableaspectratio){
                        var scaleforimage = maxdisplayheight/currentnaturalheight;
                    }
                    else{
                        var scaleforimage = maxdisplaywidth / currentnaturalwidth;
                    }
                    var finalimagewidth = Math.floor(currentnaturalheight*scaleforimage);
                    var finalimageheight = Math.floor(currentnaturalwidth*scaleforimage);


                    $(".imageuploadpopupphoto").width(finalimagewidth);
                    $(".imageuploadpopupphoto").height(finalimageheight);
                    // $(".imageuploadpopupphoto").width(finalimageheight);
                    // $(".imageuploadpopupphoto").height(finalimagewidth);


                }

                adjustmargins(orientclass);
                var minsize = Math.min(finalimagewidth, finalimageheight);
                console.log(img.width)
                console.log(img.height)
                // $('.imageuploadpopupphoto').imgAreaSelect({remove: true});

                if ($('.imageuploadpopupphoto').hasClass('zerodeg') == true || $('.imageuploadpopupphoto').hasClass('flipzerodeg') == true || $('.imageuploadpopupphoto').hasClass('oneeightydeg') == true || $('.imageuploadpopupphoto').hasClass('fliponeeightydeg') == true) {


                }

            }
            uploadedimg.src = imagesrc;
        }


    }



    function readURL(input) {
        if (input.files && input.files[0]) {

            var reader = new FileReader();
            reader.onload = function (e) {
                var img = new Image;
                img.onload = function () {

                    var b64 = img.src;
                    var bin = atob(b64.split(',')[1]);
                    var binaryFile = new EXIF.BinaryFile(bin, 0, bin.length);
                    var exif = EXIF.findEXIFinJPEG(binaryFile);
                    console.log(exif)

                    console.log(exif.Orientation);


                    if (exif.Orientation == '6') {
                        orientclass = "ninetydeg";
                    } else if (exif.Orientation == '8') {
                        orientclass = "twoseventydeg";
                    } else if (exif.Orientation == '3') {
                        orientclass = "oneeightydeg";
                    }
                    else if (exif.Orientation == '2') {
                        orientclass = "flipzerodeg";
                    }
                    else if (exif.Orientation == '4') {
                        orientclass = "fliponeeightydeg";
                    }
                    else if (exif.Orientation == '5') {

                        orientclass = "flipninetydeg";
                    }
                    else if (exif.Orientation == '7') {
                        orientclass = "fliptwoseventydeg";
                    }
                    else {
                        orientclass = "zerodeg";
                    }

                    $('.imageuploadpopupphoto').removeClass('zerodeg').removeClass('ninetydeg').removeClass('oneeightydeg').removeClass('twoseventydeg').removeClass('flipzerodeg').removeClass('flipninetydeg').removeClass('fliponeeightydeg').removeClass('fliptwoseventydeg')

                    $('.imageuploadpopupphoto').attr('src', this.src);


                    //    $(".imageuploadpopupphotocontainer").html("<div class='imagehell' style='width:auto; height:auto'><img src='" + this.src + "' class='imageuploadpopupphoto " + orientclass + "' /></div>");

                    //    $(".imageuploadpopupphotocontainer").html("<img src='" + this.src + "' class='imageuploadpopupphoto " + orientclass + "' />");
                    // adjustsize(orientclass);
                    // adjustmargins(orientclass);
                    var uploadedimg = $('.imageuploadpopupphoto')[0];
                    console.log($('.imageuploadpopupphoto')[0])
                    var finalimagewidth = uploadedimg.width;
                    var finalimageheight = uploadedimg.height;
                    var minsize = Math.min(finalimagewidth, finalimageheight);





                }
                img.src = reader.result;

                // $('.imageuploadpopupphoto').imgAreaSelect({remove: true});

                var uploadedimg = $('.imageuploadpopupphoto');
                console.log($('.imageuploadpopupphoto'))
                var finalimagewidth = uploadedimg.width();
                var finalimageheight = uploadedimg.height();
                console.log(finalimageheight)
                console.log(finalimagewidth)
                var minsize = Math.min(finalimagewidth, finalimageheight);
                console.log(minsize)

                ias =  $('.imageuploadpopupphoto').imgAreaSelect({
                    onInit: function (img, selection) {
                        document.iasselectionx1 = selection.x1;
                        document.iasselectiony1 = selection.y1;
                        document.iasselectionx2 = selection.x2;
                        document.iasselectiony2 = selection.y2;


                    },
                    movable: true,
                    instance:true,
                    handles: true,
                    persistent: true,
                    parent: $('.listimageareaselectcontainer'),

                    onSelectEnd: function (img, selection) {
                        document.iasselectionx1 = selection.x1;
                        document.iasselectiony1 = selection.y1;
                        document.iasselectionx2 = selection.x2;
                        document.iasselectiony2 = selection.y2;


                    }
                });
                console.log(ias)

                $(".imgareaselect-border1, .imgareaselect-border2").css('border', 'none');
                $(".imgareaselect-outer").css('background-color', 'unset');


                ias.setSelection(0, 0, minsize, minsize, true);
                // ias.setSelection(0, 0, 300, 300, true);
                ias.setOptions({show: true});
                ias.getSelection(false);


                adjustmargins('flipninetydeg');
                // $('.imageuploadpopupphoto').addClass('flipninetydeg');
                $('.imageuploadpopupphoto').css('transform', 'scaleX(-1) rotate(90deg)');
                console.log($('.imageuploadpopupphoto').width());
                console.log($('.imageuploadpopupphoto').height());

                var maxdisplaywidth = $("#listimageuploadpopuptitle").width();
                console.log("max width" + maxdisplaywidth);
                var maxdisplayheight = 400;
                console.log("max height" + maxdisplayheight);
                var loadedimage = $('.imageuploadpopupphoto');
                // loadedimage.width('auto');
                // loadedimage.height('auto');

                // if (orientclass === 'zerodeg' || orientclass === 'flipzerodeg' || orientclass === 'oneeightydeg' || orientclass === 'fliponeeightydeg') {

                var naturalwidth = $(".imageuploadpopupphoto").width();
                var naturalheight = $(".imageuploadpopupphoto").height();
                // }
                // else {
                //     var naturalwidth = $(".imageuploadpopupphoto").height();
                //     var naturalheight = $(".imageuploadpopupphoto").width();
                // }


                console.log("current width" + naturalwidth);
                console.log("current height" + naturalheight);

                // if (orientclass === 'zerodeg' || orientclass === 'flipzerodeg' || orientclass === 'oneeightydeg' || orientclass === 'fliponeeightydeg') {

                var currentnaturalwidth = naturalwidth;
                var currentnaturalheight = naturalheight;
                var availableaspectratio = maxdisplaywidth / maxdisplayheight;
                var imageaspectratio = currentnaturalwidth / currentnaturalheight;
                console.log("image actual aspect ratio_" + imageaspectratio)
                console.log("image actual avaiable aspect ratio_" + availableaspectratio)
                if (imageaspectratio < availableaspectratio) {
                    console.log("the aspect ration is small")
                    var scaleforimage = maxdisplayheight / currentnaturalheight;
                }
                else {
                    console.log("not")
                    var scaleforimage = maxdisplaywidth / currentnaturalwidth;
                }
                var finalimagewidth = Math.floor(currentnaturalwidth * scaleforimage);
                var finalimageheight = Math.floor(currentnaturalheight * scaleforimage);
                console.log("finalwidth" + finalimagewidth)
                console.log("finalheight" + finalimageheight)
                loadedimage.width(finalimagewidth);
                loadedimage.height(finalimageheight);
                // loadedimage.css('naturalWidth', finalimagewidth);
                // loadedimage.css('naturalHeight', finalimageheight);

                // }
                //
                //
                // else {
                //
                //     var currentnaturalwidth = naturalwidth;
                //     var currentnaturalheight = naturalheight;
                //     var availableaspectratio = maxdisplaywidth / maxdisplayheight;
                //     var imageaspectratio = currentnaturalwidth / currentnaturalheight;
                //
                //     if (imageaspectratio < availableaspectratio) {
                //         console.log("smaller")
                //         var scaleforimage = maxdisplayheight / currentnaturalheight;
                //     }
                //     else {
                //         console.log("greater")
                //         var scaleforimage = maxdisplaywidth / currentnaturalwidth;
                //     }
                //     var finalimagewidth = Math.floor(currentnaturalwidth * scaleforimage);
                //     var finalimageheight = Math.floor(currentnaturalheight * scaleforimage);
                //     console.log("finalwidth" + finalimagewidth)
                //     console.log("finalheight" + finalimageheight)
                //
                //
                //     loadedimage.width(finalimageheight);
                //     loadedimage.height(finalimagewidth);
                //
                // }













                // uploadedimg.addClass("rotateflipninetydeg")
                // adjustsize('flipninetydeg');
                // adjustmargins('flipninetydeg');
            };

            reader.readAsDataURL(input.files[0]);

        }

    }

    function mimecheck(input) {

        var fileReader = new FileReader();
        result = true;
        filesignature = "";
        fileReader.onload = function (e) {

            arr = (new Uint8Array(e.target.result)).subarray(0, 2);

            for (i = 0; i < arr.length; i++) {
                filesignature += arr[i].toString(16);
            }
            if (filesignature != "424d" && filesignature != "4749" && filesignature != "8950" && filesignature != "ffd8") {
                result = false
            }


        };
        fileReader.readAsArrayBuffer(input);
        return result;
    }

    function humanize(size) {
        var units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        var ord = Math.floor(Math.log(size) / Math.log(1024));
        ord = Math.min(Math.max(0, ord), units.length - 1);
        var s = Math.round((size / Math.pow(1024, ord)) * 100) / 100;
        return s + ' ' + units[ord];
    }

    function imgaxisdefinedtoraw(selectpopup, iasselectionx1, iasselectiony1, iasselectionx2, iasselectiony2) {

        var imageoriginalwidth = selectpopup[0].naturalWidth;
        var imageoriginalheight = selectpopup[0].naturalHeight;

        var imagedefinedwidth = selectpopup.width();
        var imagedefinedheight = selectpopup.height();

        console.log(imageoriginalwidth)
        console.log(imageoriginalheight)
        console.log(imagedefinedwidth)
        console.log(imagedefinedheight)
        var definedx1 = iasselectionx1;
        var definedy1 = iasselectiony1;
        var definedx2 = iasselectionx2;
        var definedy2 = iasselectiony2;


        var rawx1 = ((definedx1 * imageoriginalwidth) / imagedefinedwidth);
        var rawy1 = ((definedy1 * imageoriginalheight) / imagedefinedheight);
        var rawx2 = ((definedx2 * imageoriginalwidth) / imagedefinedwidth);
        var rawy2 = ((definedy2 * imageoriginalheight) / imagedefinedheight);

        console.log("The value of rawx1 is" + rawx1)
        console.log("The value of rawy1 is" + rawy1)
        console.log("The value of rawx2 is" + rawx2)
        console.log("The value of rawy2 is" + rawy2)

        var actual = [];

        actual['x1'] = rawx1;
        actual['y1'] = rawy1;
        actual['x2'] = rawx2;
        actual['y2'] = rawy2;
        return actual;
    }

    function adjustsize(orientclass) {

        console.log("the orient_" + orientclass)
        var maxdisplaywidth = $("#listimageuploadpopuptitle").width();
        console.log("max width" + maxdisplaywidth);
        var maxdisplayheight = 400;
        console.log("max height" + maxdisplayheight);
        var loadedimage = $('.imageuploadpopupphoto');
        loadedimage.width('auto');
        loadedimage.height('auto');

        if (orientclass === 'zerodeg' || orientclass === 'flipzerodeg' || orientclass === 'oneeightydeg' || orientclass === 'fliponeeightydeg') {

            var naturalwidth = $(".imageuploadpopupphoto").width();
            var naturalheight = $(".imageuploadpopupphoto").height();
        }
        else {
            var naturalwidth = $(".imageuploadpopupphoto").height();
            var naturalheight = $(".imageuploadpopupphoto").width();
        }


        console.log("current width" + naturalwidth)
        console.log("current height" + naturalheight)

        if (orientclass === 'zerodeg' || orientclass === 'flipzerodeg' || orientclass === 'oneeightydeg' || orientclass === 'fliponeeightydeg') {

            var currentnaturalwidth = naturalwidth;
            var currentnaturalheight = naturalheight;
            var availableaspectratio = maxdisplaywidth / maxdisplayheight;
            var imageaspectratio = currentnaturalwidth / currentnaturalheight;

            if (imageaspectratio < availableaspectratio) {
                var scaleforimage = maxdisplayheight / currentnaturalheight;
            }
            else {
                var scaleforimage = maxdisplaywidth / currentnaturalwidth;
            }
            var finalimagewidth = Math.floor(currentnaturalwidth * scaleforimage);
            var finalimageheight = Math.floor(currentnaturalheight * scaleforimage);
            console.log("finalwidth" + finalimagewidth)
            console.log("finalheight" + finalimageheight)
            loadedimage.width(finalimagewidth);
            loadedimage.height(finalimageheight);
        }


        else {

            var currentnaturalwidth = naturalwidth;
            var currentnaturalheight = naturalheight;
            var availableaspectratio = maxdisplaywidth / maxdisplayheight;
            var imageaspectratio = currentnaturalwidth / currentnaturalheight;

            if (imageaspectratio < availableaspectratio) {
                console.log("smaller")
                var scaleforimage = maxdisplayheight / currentnaturalheight;
            }
            else {
                console.log("greater")
                var scaleforimage = maxdisplaywidth / currentnaturalwidth;
            }
            var finalimagewidth = Math.floor(currentnaturalwidth * scaleforimage);
            var finalimageheight = Math.floor(currentnaturalheight * scaleforimage);
            console.log("finalwidth" + finalimagewidth)
            console.log("finalheight" + finalimageheight)


            loadedimage.width(finalimageheight);
            loadedimage.height(finalimagewidth);

        }
        // adjustmargins(orientclass);
    }

    function thirdpartyadjustsize(height, width) {
        console.log($('.imageuploadpopupphoto'))
        var maxdisplaywidth = $(".imageuploadpopupphotowrapperleftholder").width();
        console.log("max width" + maxdisplaywidth);
        var maxdisplayheight = 400;
        console.log("max height" + maxdisplayheight);
        var loadedimage = $('.imageuploadpopupphoto');
        loadedimage.width('auto');
        loadedimage.height('auto');
        var currentnaturalwidth = width;
        var currentnaturalheight = height;

        console.log("current width" + currentnaturalwidth)
        console.log("current height" + currentnaturalheight)


        var availableaspectratio = maxdisplaywidth / maxdisplayheight;
        var imageaspectratio = currentnaturalwidth / currentnaturalheight;

        if (imageaspectratio < availableaspectratio) {
            console.log("smaller")
            var scaleforimage = maxdisplayheight / currentnaturalheight;
        }
        else {
            console.log("greater")
            var scaleforimage = maxdisplaywidth / currentnaturalwidth;
        }
        finalimagewidth = Math.floor(currentnaturalwidth * scaleforimage);
        finalimageheight = Math.floor(currentnaturalheight * scaleforimage);
        // console.log("finalwidth" + finalimagewidth)
        // console.log("finalheight" + finalimageheight)
        // loadedimage.width(finalimagewidth);
        // loadedimage.height(finalimageheight);


        var lengtharray = {};
        lengtharray['width'] = finalimagewidth;
        lengtharray['height'] = finalimageheight;
        return lengtharray;
    }

    $('#imageuploadpopupwrapper').attr('aria-hidden', false);

    function thirdpartyupdateselectedimage(itemid) {

        var createlistimageuploadpopupphotowidth = $('.imageuploadpopupphoto')[0].naturalWidth;
        var createlistimageuploadpopupphotoheight = $('.imageuploadpopupphoto')[0].naturalHeight;
        console.log("The width of uploading photo" + createlistimageuploadpopupphotowidth);
        console.log("The height of uploading photo" + createlistimageuploadpopupphotoheight);

        var chosenimage = $('#content_' + itemid);
        var overflowelement = $("#multi_elem_" + itemid);
        var photo = $("#des_" + itemid);


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

        rawmarginleft = (fixedwidth - rawimagewidth) / 2;
        rawmargintop = (fixedheight - rawimageheight) / 2;


        chosenimage.css({
            width: Math.floor(rawimagewidth),
            height: Math.floor(rawimageheight),
            marginLeft: Math.floor(rawmarginleft),
            marginTop: Math.floor(rawmargintop)
        });


        overflowelement.css('overflow', 'hidden');
        if (photo.hasClass("photo") == false) {
            photo.css({'overflow': 'hidden', 'border-radius': '10px'});
        }
        $(".uploadimage").css('display', 'block');


    }

    function updateselectedimage(itemid) {

        var orientation = Orientation($(".imageuploadpopupphoto"));
        console.log(orientation);

        var selectionx1 = parseFloat($(".x1").val());
        var selectiony1 = parseFloat($(".y1").val());
        var selectionx2 = parseFloat($(".x2").val());
        var selectiony2 = parseFloat($(".y2").val());
        console.log(selectiony1)
        console.log(selectionx2)
        console.log(selectiony2)


        var createlistimageuploadpopupphotowidth = $('.imageuploadpopupphoto')[0].naturalWidth;
        var createlistimageuploadpopupphotoheight = $('.imageuploadpopupphoto')[0].naturalHeight;
        console.log("The width of uploading photo" + createlistimageuploadpopupphotowidth);
        console.log("The height of uploading photo" + createlistimageuploadpopupphotoheight);
        // var defined = imgaxisrawtodefined($('.imageuploadpopupphoto'), selectionx1, selectiony1, selectionx2, selectiony2);
        // console.log(defined);
        //
        // var selectionx1 = (defined['x1']);
        // var selectiony1 = (defined['y1']);
        // var selectionx2 = (defined['x2']);
        // var selectiony2 = (defined['y2']);

        console.log(selectionx1);
        console.log(selectiony1);
        console.log(selectionx2);
        console.log(selectiony2);


        var chosenimage = $('#content_' + itemid);
        chosenimage.addClass(orientation);
        var overflowelement = $("#multi_elem_" + itemid);
        var photo = $("#des_" + itemid);


        aspectratio = (selectionx2 - selectionx1) / (selectiony2 - selectiony1);
        console.log("The cropped aspect ratio is_" + aspectratio)

        fixedwidth = $('.multi-element').width();
        fixedheight = $('.multi-element').height();


        displayedaspectratio = fixedwidth / fixedheight;
        console.log("The display aspect ratio is_" + displayedaspectratio)

        if (aspectratio > displayedaspectratio) {
            console.log("greater");
            scale = fixedwidth / (selectionx2 - selectionx1);
        }

        else {
            console.log("smaller")
            scale = fixedheight / (selectiony2 - selectiony1);
        }


        rawimageheight = scale * createlistimageuploadpopupphotoheight;
        rawimagewidth = scale * createlistimageuploadpopupphotowidth;
        console.log("height of raw image" + rawimageheight)
        console.log("width of raw image" + rawimagewidth)

        croppedheight = scale * (selectiony2 - selectiony1);
        croppedwidth = scale * (selectionx2 - selectionx1);
        croppedmarginleft = (fixedwidth - croppedwidth) / 2;
        croppedmargintop = (fixedheight - croppedheight) / 2;

        displayedwidth = scale * (selectionx2 - selectionx1);
        displayedheight = scale * (selectiony2 - selectiony1);
        lmr = scale * selectionx1;
        tmr = scale * selectiony1;
        console.log(displayedwidth)

        photo.css({
            width: Math.floor(displayedwidth),
            height: Math.floor(displayedheight),
            marginLeft: Math.floor(croppedmarginleft),
            marginTop: Math.floor(croppedmargintop)
        });

        // chosenimage.css({
        //     width: Math.floor(rawimagewidth),
        //     height: Math.floor(rawimageheight),
        //     marginLeft: -Math.floor(lmr),
        //     marginTop: -Math.floor(tmr)
        // });

        if (chosenimage.attr('src').indexOf('images/fallbackimages/itemimage.png') !== 0) {

            // if (chosenimage.hasClass('zerodeg') || chosenimage.hasClass('oneeightydeg')) {


            if (chosenimage.hasClass('zerodeg') == true || chosenimage.hasClass('flipzerodeg') == true || chosenimage.hasClass('oneeightydeg') == true || chosenimage.hasClass('fliponeeightydeg') == true) {
                chosenimage.css({
                    width: Math.floor(rawimagewidth),
                    height: Math.floor(rawimageheight),
                    marginLeft: -Math.floor(lmr),
                    marginTop: -Math.floor(tmr)
                });
            }
            // else if (chosenimage.hasClass('ninetydeg') || chosenimage.hasClass('twoseventydeg')) {
            else {
                if (!($.browser.msie && $.browser.version < 9)) {
                    chosenimage.css({
                        width: Math.floor(rawimagewidth),
                        height: Math.floor(rawimageheight),
                        marginLeft: -Math.floor(scale * (selectionx1 + (createlistimageuploadpopupphotowidth - createlistimageuploadpopupphotoheight) / 2)),
                        marginTop: -Math.floor(scale * (selectiony1 - (createlistimageuploadpopupphotowidth - createlistimageuploadpopupphotoheight) / 2))
                    });
                } else {
                    chosenimage.css({
                        width: Math.floor(rawimagewidth),
                        height: Math.floor(rawimageheight),
                        marginLeft: -Math.floor(lmr),
                        marginTop: -Math.floor(tmr)
                    });
                }
            }

        }

        overflowelement.css('overflow', 'hidden');
        // if (photo.hasClass("photo") == false) {
        photo.css({'overflow': 'hidden', 'border-radius': '10px'});
        // }
        $(".uploadimage").css('display', 'block');
    }

    function windowresizeadjust() {

        var maxdisplaywidth = $("#listimageuploadpopuptitle").width();
        var maxdisplayheight = 400;
        var loadedimage = $('.imageuploadpopupphoto');
        var previouswidth = loadedimage.width();
        var previousheight = loadedimage.height();
        loadedimage.width('auto');
        loadedimage.height('auto');


        var currentnaturalwidth = $(".imageuploadpopupphoto").width();
        var currentnaturalheight = $(".imageuploadpopupphoto").height();

        var availableaspectratio = maxdisplaywidth / maxdisplayheight;
        var imageaspectratio = currentnaturalwidth / currentnaturalheight;
        if (imageaspectratio < availableaspectratio) {
            var scaleforimage = maxdisplayheight / currentnaturalheight;
        }
        else {
            var scaleforimage = maxdisplaywidth / currentnaturalwidth;
        }
        var finalimagewidth = Math.floor(currentnaturalwidth * scaleforimage);
        var finalimageheight = Math.floor(currentnaturalheight * scaleforimage);
        loadedimage.width(finalimagewidth);
        loadedimage.height(finalimageheight);


        var oldiasx1 = document.iasselectionx1;
        var oldiasy1 = document.iasselectiony1;
        var oldiasx2 = document.iasselectionx2;
        var oldiasy2 = document.iasselectiony2;


        var newiasx1 = ((oldiasx1 * finalimagewidth) / previouswidth);
        var newiasy1 = ((oldiasy1 * finalimageheight) / previousheight);
        var newiasx2 = ((oldiasx2 * finalimagewidth) / previouswidth);
        var newiasy2 = ((oldiasy2 * finalimageheight) / previousheight);


        document.iasselectionx1 = newiasx1;
        document.iasselectiony1 = newiasy1;
        document.iasselectionx2 = newiasx2;
        document.iasselectiony2 = newiasy2;

        var selectionx1 = (newiasx1);
        var selectiony1 = (newiasy1);
        var selectionx2 = (newiasx2);
        var selectiony2 = (newiasy2);


        if ($('.imageuploadpopupphoto').hasClass('zerodeg') == true || $('.imageuploadpopupphoto').hasClass('flipzerodeg') == true || $('.imageuploadpopupphoto').hasClass('oneeightydeg') == true || $('.imageuploadpopupphoto').hasClass('fliponeeightydeg') == true) {

            $(".imageuploadpopupphoto").imgAreaSelect({remove: true});
            var ias = $(".imageuploadpopupphoto").imgAreaSelect({
                onInit: function (img, selection) {
                    document.iasselectionx1 = selection.x1;
                    document.iasselectiony1 = selection.y1;
                    document.iasselectionx2 = selection.x2;
                    document.iasselectiony2 = selection.y2;
                },
                instance: true,
                // minWidth: 40, minHeight: 40,
                handles: true,
                movable: true,
                resizable: true,
                parent: $('.listimageareaselectcontainer'),
                persistent: true,
                onSelectEnd: function (img, selection) {
                    document.iasselectionx1 = selection.x1;
                    document.iasselectiony1 = selection.y1;
                    document.iasselectionx2 = selection.x2;
                    document.iasselectiony2 = selection.y2;
                }
            });

            $(".imgareaselect-border1, .imgareaselect-border2").css('border', 'none');
            $(".imgareaselect-outer").css('background-color', 'unset');

            // $(".imgareaselect-selection").parents(".listimageareaselectcontainer").children().css('position', 'absolute');
            ias.setSelection(selectionx1, selectiony1, selectionx2, selectiony2, true);
            ias.setOptions({show: true});
            ias.getSelection();

        }
        // if ($('.imageuploadpopupphoto').get(0).complete == true && $('.imageuploadpopupphoto').hasClass(orientclass) == true) {
        // if ($('.imageuploadpopupphoto').get(0).complete == true && $('.imageuploadpopupphoto').hasClass(orientclass) == true) {

        else {

            console.log( document.iasselectionx1)
            console.log( document.iasselectiony1)
            console.log( document.iasselectionx2)
            console.log( document.iasselectiony2)
            $(".imageuploadpopupphoto").imgAreaSelect({remove: true});

            var ias = $(".imageuploadpopupphoto").imgAreaSelect({
                onInit: function (img, selection) {
                    document.iasselectionx1 = selection.x1;
                    document.iasselectiony1 = selection.y1;
                    document.iasselectionx2 = selection.x2;
                    document.iasselectiony2 = selection.y2;
                },
                instance: true,
                // minWidth: 40, minHeight: 40,
                handles: true,
                movable: true,
                resizable: true,
                parent: $('.listimageareaselectcontainer'),
                persistent: true,
                onSelectEnd: function (img, selection) {
                    document.iasselectionx1 = selection.x1;
                    document.iasselectiony1 = selection.y1;
                    document.iasselectionx2 = selection.x2;
                    document.iasselectiony2 = selection.y2;
                }
            });

            $(".imgareaselect-border1, .imgareaselect-border2").css('border', 'none');
            $(".imgareaselect-outer").css('background-color', 'unset');

            ias.setSelection(selectionx1, selectiony1, selectionx2, selectiony2, true);
            ias.setOptions({show: true});
            ias.getSelection();

        }


        // $(".imageuploadpopupphoto").imgAreaSelect({remove: true});
        //
        // var ias = $(".imageuploadpopupphoto").imgAreaSelect({
        //     onInit: function (img, selection) {
        //         document.iasselectionx1 = selection.x1;
        //         document.iasselectiony1 = selection.y1;
        //         document.iasselectionx2 = selection.x2;
        //         document.iasselectiony2 = selection.y2;
        //     },
        //     instance: true,
        //     // minWidth: 40, minHeight: 40,
        //     handles: true,
        //     movable: true,
        //     resizable: true,
        //     parent: $('.listimageareaselectcontainer'),
        //     persistent: true,
        //     onSelectEnd: function (img, selection) {
        //         document.iasselectionx1 = selection.x1;
        //         document.iasselectiony1 = selection.y1;
        //         document.iasselectionx2 = selection.x2;
        //         document.iasselectiony2 = selection.y2;
        //     }
        // });
        //
        // $(".imgareaselect-border1, .imgareaselect-border2").css('border', 'none');
        // $(".imgareaselect-outer").css('background-color', 'unset');
        //
        // // $(".imgareaselect-selection").parents(".listimageareaselectcontainer").children().css('position', 'absolute');
        // ias.setSelection(selectionx1, selectiony1, selectionx2, selectiony2, true);
        // ias.setOptions({show: true});
        // ias.getSelection();


    }

    function Orientation(image) {

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
        else {
            return 'zerodeg';
        }
    }

    function adjustsizeforimagerotate() {

        var maxdisplaywidth = $("#listimageuploadpopuptitle").width();
        var maxdisplayheight = 400;
        var loadedimage = $('.imageuploadpopupphoto');

        loadedimage.width('auto');
        loadedimage.height('auto');

        if (!($.browser.msie && $.browser.version < 9)) {

            var naturalwidth = $(".imageuploadpopupphoto").width();
            var naturalheight = $(".imageuploadpopupphoto").height();
        }
        else {

            var orientation = Orientation($(".imageuploadpopupphoto"));

            if (orientation == 'ninetydeg' || orientation == 'twoseventydeg') {
                var naturalwidth = $(".imageuploadpopupphoto").height();
                var naturalheight = $(".imageuploadpopupphoto").width();
            } else {
                var naturalwidth = $(".imageuploadpopupphoto").width();
                var naturalheight = $(".imageuploadpopupphoto").height();
            }
        }

        if (loadedimage.hasClass('zerodeg') || loadedimage.hasClass('oneeightydeg')) {

            var currentnaturalwidth = naturalwidth;
            var currentnaturalheight = naturalheight;

            var availableaspectratio = maxdisplaywidth / maxdisplayheight;
            var imageaspectratio = currentnaturalwidth / currentnaturalheight;
            if (imageaspectratio < availableaspectratio) {
                var scaleforimage = maxdisplayheight / currentnaturalheight;
            }
            else {
                var scaleforimage = maxdisplaywidth / currentnaturalwidth;
            }
            var finalimagewidth = Math.floor(currentnaturalwidth * scaleforimage);
            var finalimageheight = Math.floor(currentnaturalheight * scaleforimage);
            loadedimage.width(finalimagewidth);
            loadedimage.height(finalimageheight);


        }
        if (loadedimage.hasClass('ninetydeg') || loadedimage.hasClass('twoseventydeg')) {
            var currentnaturalwidth = naturalheight;
            var currentnaturalheight = naturalwidth;

            var availableaspectratio = maxdisplaywidth / maxdisplayheight;
            var imageaspectratio = currentnaturalwidth / currentnaturalheight;
            if (imageaspectratio < availableaspectratio) {
                var scaleforimage = maxdisplayheight / currentnaturalheight;
            }
            else {
                var scaleforimage = maxdisplaywidth / currentnaturalwidth;
            }
            var finalimagewidth = Math.floor(currentnaturalheight * scaleforimage);
            var finalimageheight = Math.floor(currentnaturalwidth * scaleforimage);
            loadedimage.width(finalimagewidth);
            loadedimage.height(finalimageheight);
        }
    }

    function adjustmarginsforimagerotate() {

        var currentimagewidth = $(".imageuploadpopupphoto").width();
        var currentimageheight = $(".imageuploadpopupphoto").height();

        if ($(".imageuploadpopupphoto").hasClass('ninetydeg') || $(".imageuploadpopupphoto").hasClass('twoseventydeg')) {

            if (!($.browser.msie && $.browser.version < 9)) {
                var marginratioceil = Math.ceil((currentimagewidth - currentimageheight) / 2);
                var marginratiofloor = Math.floor(currentimagewidth - currentimageheight) / 2;
                $(".imageuploadpopupphoto").css('margin-top', +marginratioceil);
                $(".imageuploadpopupphoto").css('margin-bottom', +marginratiofloor);
                $(".imageuploadpopupphoto").css('margin-left', -marginratioceil);
                $(".imageuploadpopupphoto").css('margin-right', -marginratiofloor);
            } else {
                $(".imageuploadpopupphoto").css('margin-bottom', -(currentimagewidth - currentimageheight));
            }
            if ($.browser.msie) {
                if ($.browser.version >= 9) {
                    var wrapperleftiewidth = $(".imageuploadpopupphoto").height();
                    $(".imageuploadpopupphotowrapperleft").css('width', wrapperleftiewidth).css('margin-right', 10);
                } else {
                    var wrapperleftiewidth = $(".imageuploadpopupphoto").width();
                    $(".imageuploadpopupphotowrapperleft").css('width', wrapperleftiewidth).css('margin-right', 10);
                }
            }
        }
        if ($(".imageuploadpopupphoto").hasClass('zerodeg') || $(".imageuploadpopupphoto").hasClass('oneeightydeg')) {
            if (!($.browser.msie && $.browser.version < 9)) {
                $(".imageuploadpopupphoto").css('margin', 0);
            } else {
                $(".imageuploadpopupphoto").css('margin-bottom', 0);
            }
            if ($.browser.msie) {
                var wrapperleftiewidth = $(".imageuploadpopupphoto").width();
                $(".imageuploadpopupphotowrapperleft").css('width', wrapperleftiewidth).css('margin-right', 10);
            }
        }
    }

    // $(document).on('dragenter', function (e) {
    //     e.stopPropagation();
    //     e.preventDefault();
    // });
    //
    // $(document).on('dragover', function (e) {
    //
    //     e.stopPropagation();
    //     e.preventDefault();
    // });

    //for drag and dropping file
    $(".imageuploadpopup , .imageselectiondiv").on('dragover', function (e) {
        $(".imageuploadpopupphoto").addClass('zerodeg').removeClass('ninetydeg').removeClass('oneeightydeg').removeClass('twoseventydeg');
        $('.imageuploadpopupphoto').removeClass("thirdparty");
        // if ($(this).hasClass("notdraggable") == false) {
        $(".dragyourimageherefromyourdevice").css('display', 'block');


        // if ($('.imageuploadpopupphoto').hasClass('zerodeg') == true || $('.imageuploadpopupphoto').hasClass('flipzerodeg') == true || $('.imageuploadpopupphoto').hasClass('oneeightydeg') == true || $('.imageuploadpopupphoto').hasClass('fliponeeightydeg') == true) {

        // }
        // else{

        // }

        $('.imagehell').imgAreaSelect({remove: true});
        $('.imageuploadpopupphoto').imgAreaSelect({remove: true});
        $(".imagepart").css('display', 'none');
        $(".imageuploadpopup").css('display', 'block');

        $(".new_createlist_image_upload_button_one").click();
        // $(".imageuploadpopupphotowrapperleftholder").css('display','none');
        var dragboxheight = 400;
        var dragboxwidth = $('#listimageuploadpopuptitle').width();
        $(".dragyourimageherefromyourdevice").css("height", dragboxheight - 4);
        $(".dragyourimageherefromyourdevice").css("width", dragboxwidth - 4);
        $(".dragyourimageherefromyourdevicetext").css("top", Math.ceil((dragboxheight - 2) / 2 - 20));
        // }
    });


    $('.imageuploadpopup').on("drop", function (e) {


        // if ($(this).hasClass("notdraggable") == false) {
        $(".loading , .loadingtext").css('display', 'none');
        // $('.imageuploadpopupphoto').imgAreaSelect({remove: true});
        // $('.imageuploadpopupphoto,.imageuploadpopupphotowrapperleftholder').css('width', '').css('height', '');
        $(".dragyourimageherefromyourdevice").css('display', 'none');

        $(".imageuploadpopupphotowrapperright").children().css('display', 'none');
        $(".imagepart").css('display', 'block');
        // $("#imageuploadpopupuploadbuttoninput")[0].prop("files", e.originalEvent.dataTransfer.files).closest("form");
        $("#imageuploadpopupuploadbuttoninput").prop("files", e.originalEvent.dataTransfer.files).closest("form");

        console.log($("#imageuploadpopupuploadbuttoninput"));
        var url = e.originalEvent.dataTransfer.getData('url');
        console.log(e.originalEvent.dataTransfer.files.length);
        console.log($(".imageuploadpopupuploadbuttoninput"));
        if (e.originalEvent.dataTransfer.files.length > 0) {

            // $(".new_createlist_image_upload_button_one").click();
            // $(".createlistrawimageurl").trigger('propertychange');
            $(".imageuploadpopupuploadbuttoninput").change();
        }
        else {
            // $(".new_createlist_image_upload_button_two").click();

            $(".createlistrawimageurl").val(url);
            // $(".createlistrawimageurl").trigger('change');
            $(".createlistrawimageurl").trigger('propertychange');
        }

        // }
    });
    // imageuploadpopup.ondragover = imageuploadpopup.ondragenter = function(evt) {
    //     evt.preventDefault();
    //     console.log("gdfgdg")
    // };
    //
    // imageuploadpopup.ondrop = function(evt) {
    //     imageuploadpopupuploadbuttoninput.files = evt.dataTransfer.files;
    //     console.log( $("#imageuploadpopupuploadbuttoninput"));
    //     evt.preventDefault();
    //
    //
    // };

    // imageuploadpopup.ondrop = function(e) {
    //
    //     if ($(this).hasClass("notdraggable") == false) {
    //         $(".dragyourimageherefromyourdevice").css('display', 'none');
    //
    //         $(".imageuploadpopupphotowrapperright").children().css('display', 'none');
    //         $(".imagepart").css('display', 'block');
    //         console.log(e.originalEvent.dataTransfer.files);
    //         // $("input[type='file']").prop("files", e.originalEvent.dataTransfer.files).closest("#myForm_multi");
    //         // console.log($("input[type='file']"));
    //         // imageuploadpopupuploadbuttoninput.files = e.originalEvent.dataTransfer.files;
    //         //
    //         // console.log( $("#imageuploadpopupuploadbuttoninput"));
    //
    //         imageuploadpopupuploadbuttoninput.files = e.dataTransfer.files;
    //         console.log( $("#imageuploadpopupuploadbuttoninput"));
    //         // e.preventDefault();
    //         console.log(e.dataTransfer.files);
    //         var url = e.dataTransfer.getData('url');
    //         console.log(url);
    //         console.log(e.dataTransfer.files.length);
    //         if (e.dataTransfer.files.length > 0) {
    //             $(".new_createlist_image_upload_button_one").click();
    //
    //             $(".imageuploadpopupuploadbuttoninput").trigger('change');
    //         }
    //         else if(e.dataTransfer.files.length == 0){
    //             $(".new_createlist_image_upload_button_two").click();
    //
    //             $(".createlistrawimageurl").val(url);
    //             // $(".createlistrawimageurl").trigger('change');
    //             $(".createlistrawimageurl").trigger('propertychange');
    //         }
    //
    //     }
    // }

    $('html').on("drop", function (e) {
        // $('.imageselectiondivbackground').on("drop", function (e) {

        //if clicked element is not your element and parents aren't your div
        if (e.target.id != 'imageselectiondiv' && $(e.target).parents('#imageselectiondiv').length == 0) {
            if ($(".imageselectiondiv").hasClass('notdraggable') == false) {
                $(".dragyourimageherefromyourdevice").css('display', 'none');
                $(".imagepart").css('display', 'block');
                $(".imageuploadpopup").css('display', 'block');
                // $(".new_createlist_image_upload_button_one").click();
                var url = e.originalEvent.dataTransfer.getData('url');
                console.log(url);
                console.log(e.originalEvent.dataTransfer.files.length);

                if ((e.originalEvent.dataTransfer.files.length > 0) || (url == "")) {
                    // if (url == "") {

                    $(".new_createlist_image_upload_button_one").click();

                }
                else {

                    $(".new_createlist_image_upload_button_two").click();


                }

                $(".imageuploadpopupphoto").attr("src", 'images/fallbackimages/itemimage.png').css('width', '').css('height', '');
            }
        }

    });

    $("#imageuploadpopupuploadbuttoninput").on('change', function (e) {

        // $(".imageuploadpopupphoto").addClass('zerodeg').removeClass('ninetydeg').removeClass('oneeightydeg').removeClass('twoseventydeg');
        // $('.imageuploadpopupphoto').css('margin', 'unset');
        $(".imageuploadpopupphotowrapperleftholder").css('width', '').css('height', '');
        $(".imageuploadpopupphotocontainer").css({'width': 'auto', 'height': 'auto'});

        //mimetype file check
        var fp = $("#imageuploadpopupuploadbuttoninput");
        console.log(fp)
        console.log(fp[0])
        var filename = fp[0].files[0].name;
        var filesize = fp[0].files[0].size;
        var filetype = filename.split('.').pop().toLowerCase();


        if ($.inArray(filetype, ['gif', 'png', 'jpg', 'jpeg', 'bmp', 'x-png', 'pjpeg']) != -1 && filesize <= 4194304) {

            var blob = fp[0].files[0];
            if (mimecheck(blob)) {
                $(".loading").css('display', 'none');

                readURL(fp[0]);



                $(window).on("resize", function () {

                    windowresizeadjust();

                });


                $("#imageuploadpopupbuttonselect").removeClass('imageuploadpopupbuttondisabled');
                $("#imageuploadpopupbuttonselect").addClass('imageuploadpopupbutton');
                $("#imageuploadpopupbuttonselect").prop('disabled', false);

                $(".imageuploadpopupfeedback").text('');
                $(".imageuploadpopupuploadtext").text(filename);
                $(".imageuploadpopupuploadtext").css('color', 'rgb(17, 17, 17)');
                $(".imageuploadpopupfeedback").append("You have selected the file: " + "<strong style='color : rgb(102, 102, 102)'>" + filename + "</strong> of size " + "<strong>" + humanize(filesize) + "</strong>").css('color', '#888888');
            }
            else {
                console.log("false")
            }

        }
        else {
            // $('.imageuploadpopupphotocontainer').html("<div class='loading' id='loading'><img draggable='false' src='images/nav/rmlloadinglargedark.gif' class='loadimg'/><div class='loadingtext'>Loading...</div></div>");
            $('.imageuploadpopupphotocontainer').append("<div class='loadingtext'>Loading...</div><div class='loading' id='loading'><img draggable='false' src='images/nav/rmlloadinglargedark.gif' class='loadimg'/>");


            $(".imageuploadpopupphoto").attr("src", '');
            $(".imageuploadpopupphoto").css('width', 'auto').css('height', 'auto');
            $(".loading").css('display', 'block');
            $(".imageuploadpopupphotowrapperleftholder").css('height', '300px')
            $("#imageuploadpopupbuttonselect").removeClass('imageuploadpopupbutton');
            $("#imageuploadpopupbuttonselect").addClass('imageuploadpopupbuttondisabled');
            $("#imageuploadpopupbuttonselect").prop('disabled', true);
            $(".imageuploadpopupfeedback").text('');
            $(".imageuploadpopupuploadtext").text(filename);
            $(".imageuploadpopupuploadtext").css('color', 'rgb(17, 17, 17)');
            $(".imageuploadpopupfeedback").append("The file you have selected is  " + "<strong style='color : rgb(153, 0, 0)'>" + humanize(filesize) + "</strong>  in size and is too large. Please select an image that is  " + "<strong style='color : rgb(153, 0, 0)'>smaller than 4 MB. </strong>").css('color', 'rgb(153, 0, 0)');

        }
        // this.value = null;
        $(".imageselectiondiv").css('display', 'none');
        // $('body').css('overflow', 'auto');
    });

    $(".imageselectiondiv").on('click', '.new_createlist_image_upload_button_one', function (e) {
        $(".imageuploadpopupphoto").css({'width': 'auto', 'height': 'auto'});
        $('.imageuploadpopupphoto').imgAreaSelect({remove: true});
        $('.imageuploadpopupphoto').css('margin', 'unset');
        $("#imageuploadpopup").css({'display': 'block'});
        $("#listimageuploadpopuptitle").text("Upload an image");
        $(".imageselectiondiv").css('display', 'none');
        $(".imageuploadpopupoverall").css('display', 'block');
        $(".imagepart").find('.imageuploadfromyourdeviceholder').css('display', 'block');
        $(".imagepart").find('.imageuploadfromyourdeviceholder').siblings().css('display', 'none');
        $('.imageuploadpopupphoto').removeClass("thirdparty");
    });


    $(".imageselectiondiv").on('click', '.new_createlist_image_upload_button_two', function (e) {
        $(".imageuploadpopupphoto").css({'width': 'auto', 'height': 'auto'});

        $('.imageuploadpopupphoto').imgAreaSelect({remove: true});
        $('.imageuploadpopupphoto').css('margin', 'unset');
        $("#imageuploadpopup").css({'display': 'block'});
        $("#listimageuploadpopuptitle").text("Import image from web");
        $(".imageselectiondiv").css('display', 'none');
        $(".imageuploadpopupoverall").css('display', 'block');
        $(".imagepart").find('.imageuploadfromthewebholder').css('display', 'block');
        $(".imagepart").find('.imageuploadfromthewebholder').siblings().css('display', 'none');
        $('.imageuploadpopupphoto').removeClass("thirdparty");
    });

    $(".imageselectiondiv").on('click', '.new_createlist_image_upload_button_three', function (e) {
        $('.imageuploadpopupphoto').imgAreaSelect({remove: true});
        $(".imageuploadpopupphoto").addClass('zerodeg').removeClass('ninetydeg').removeClass('oneeightydeg').removeClass('twoseventydeg');
        $('.imageuploadpopupphoto').css('margin', 'unset');
        $("#imageuploadpopup").css({'display': 'block'});
        $(".imageuploadpopup").addClass("notdraggable");
        $("#listimageuploadpopuptitle").text("Search image in");
        $(".imageselectiondiv").css('display', 'none');
        $(".imageuploadpopupoverall").css('display', 'block');
        $(".imagepart").find('.imageuploadfromgettyholder').css('display', 'block');
        $(".imagepart").find('.imageuploadfromgettyholder').siblings().css('display', 'none');
    });

    $(".imageselectiondiv").on('click', '.new_createlist_image_upload_button_four', function (e) {
        $(".imageuploadpopupphoto").css({'width': 'auto', 'height': 'auto'});
        $('.imageuploadpopupphoto').imgAreaSelect({remove: true});
        $(".imageuploadpopupphoto").addClass('zerodeg').removeClass('ninetydeg').removeClass('oneeightydeg').removeClass('twoseventydeg');
        $('.imageuploadpopupphoto').css('margin', 'unset');
        $("#imageuploadpopup").css({'display': 'block'});
        $(".imageuploadpopup").addClass("notdraggable");
        $("#listimageuploadpopuptitle").text("Search gif in");
        $(".imageselectiondiv").css('display', 'none');
        $(".imageuploadpopupoverall").css('display', 'block');
        $(".imagepart").find('.imageuploadfromgiphyholder').css('display', 'block');
        $(".imagepart").find('.imageuploadfromgiphyholder').siblings().css('display', 'none');

    });

    $(".imageselectiondiv").on('click', '.new_createlist_image_upload_button_five', function (e) {
        $(".imageuploadpopupphoto").css({'width': 'auto', 'height': 'auto'});
        $('.imageuploadpopupphoto').imgAreaSelect({remove: true});
        $(".imageuploadpopupphoto").addClass('zerodeg').removeClass('ninetydeg').removeClass('oneeightydeg').removeClass('twoseventydeg');
        $('.imageuploadpopupphoto').css('margin', 'unset');
        $("#imageuploadpopup").css({'display': 'block'});
        $(".imageuploadpopup").addClass("notdraggable");
        $("#listimageuploadpopuptitle").text("Search gif in");
        $(".imageselectiondiv").css('display', 'none');
        $(".imageuploadpopupoverall").css('display', 'block');
        $(".imagepart").find('.imageuploadfromgfycatholder').css('display', 'block');
        $(".imagepart").find('.imageuploadfromgfycatholder').siblings().css('display', 'none');

    });

    $(".createlistrawimageurl").on('input propertychange', function (e) {
        // $('.imageuploadpopupphotocontainer').html("<div class='loading' id='loading'><img draggable='false' src='images/nav/rmlloadinglargedark.gif' class='loadimg'/><div class='loadingtext'>Loading...</div></div>");

        //checking the URL is valid or not
        $(".imageuploadpopupphoto").addClass('zerodeg').removeClass('ninetydeg').removeClass('oneeightydeg').removeClass('twoseventydeg');
        $('.imageuploadpopupphoto').css('margin', 'unset');
        $(".imageuploadpopupphotowrapperleftholder").css('width', '').css('height', '');

        function validateURL(textval) {
            var urlregex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
            return urlregex.test(textval);
        }

        function isDataURL(s) {
            return !!s.match(isDataURL.regex);
        }

        isDataURL.regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;

        url = $(".createlistrawimageurl").val();


        if (validateURL($(".createlistrawimageurl").val()) == true || isDataURL($(".createlistrawimageurl").val()) == true) {
            console.log("First validation done");
            let xhr = new XMLHttpRequest();
            // xhr.getResponseHeader('Content-Type')
            // xhr.onloadend = function() {
            //
            //     console.log(this.status)
            //     console.log(this.readyState)
            //     if (this.readyState == 4 || (this.status == 200 || this.status == 206)) {
            $.ajax({
                url: url,
                async: true,
                type: "GET",
                dataType: "jsonp",

                success: function (xhr) {
                    console.log(xhr);
                    console.log(result);
                },
                error: function (xhr) {
                    console.log(xhr);


                    $(".createlistrawimageurl").val('');
                    // $(".imageuploadpopupphoto").attr("src", 'images/fallbackimages/itemimage.png').css('width', '').css('height', '');
                    // $(".loadimg, .loadingtext ").css('display', 'none');
                    $(" #itempopupshowmediaerror, #deleteconfirmmessagebackground").css({'display': 'block'});
                    $("#deleteconfirmmessagebackground").css('z-index', '401');
                    $(".itempopuptext").text("Sorry! The link you provided is invalid. Please try another image.");

                }
            });


            if ((url.indexOf(".jpg") >= 0) || (url.indexOf(".jpe") >= 0) || (url.indexOf(".jpeg") >= 0) || (url.indexOf(".png") >= 0) || (url.indexOf(".bmp") >= 0) || (url.indexOf(".gif") >= 0) || (url.indexOf("gstatic.com") >= 0) || ((url.indexOf("data:image/jpg") >= 0) || (url.indexOf("data:image/jpe") >= 0) || (url.indexOf("data:image/jpeg") >= 0) || (url.indexOf("data:image/png") >= 0) || (url.indexOf("data:image/bmp") >= 0) || (url.indexOf("data:image/gif") >= 0) )) {
                console.log("second validation done");

                $('.imageuploadpopupphoto').imgAreaSelect({remove: true});
                $(".imageuploadpopupphoto").show();
                // $(".loading").css('display', 'none');
                $(".imageuploadpopupphotocontainer").css({'width': 'auto', 'height': 'auto'})

                var img = new Image();
                img.src = $(".createlistrawimageurl").val();
                console.log(jQuery.type(img));

                img.onload = function (e) {
                    console.log(img);
                    console.log(jQuery.type(img));
                    sizeofimage = img.width * img.height;
                    console.log(sizeofimage)


                    if (sizeofimage < 4194304) {
                        console.log("size validation done");
                        $(".loadimg, .loadingtext").css('display', 'none');

                        $(".imageuploadpopupphoto").attr("src", $(".createlistrawimageurl").val());
                        $(".imageuploadpopupuprotateimagewrapper").css('display', 'block');

                        adjustsize()

                        var uploadedimg = $('.imageuploadpopupphoto')[0];
                        var finalimagewidth = uploadedimg.width;
                        var finalimageheight = uploadedimg.height;
                        var minsize = Math.min(finalimagewidth, finalimageheight);

                        if ($('.imageuploadpopupphoto').hasClass('zerodeg') == true || $('.imageuploadpopupphoto').hasClass('flipzerodeg') == true || $('.imageuploadpopupphoto').hasClass('oneeightydeg') == true || $('.imageuploadpopupphoto').hasClass('fliponeeightydeg') == true) {

                            $(".imageuploadpopupphoto").imgAreaSelect({remove: true});
                        }
                        else {
                            $('.imageuploadpopupphotocontainer').imgAreaSelect({remove: true});

                        }

                        ias = $(".imageuploadpopupphoto").imgAreaSelect({
                            onInit: function (img, selection) {
                                document.iasselectionx1 = selection.x1;
                                document.iasselectiony1 = selection.y1;
                                document.iasselectionx2 = selection.x2;
                                document.iasselectiony2 = selection.y2;
                                console.log('width: ' + selection.width + '; height: ' + selection.height);

                            },
                            instance: true,
                            handles: true,
                            persistent: true,
                            // fadeSpeed : 1,
                            parent: $('.listimageareaselectcontainer'),

                            onSelectEnd: function (img, selection) {
                                document.iasselectionx1 = selection.x1;
                                document.iasselectiony1 = selection.y1;
                                document.iasselectionx2 = selection.x2;
                                document.iasselectiony2 = selection.y2;
                                console.log(selection.x1);
                                console.log(selection.y1);
                                console.log(selection.x2);
                                console.log(selection.y2);
                                console.log('width: ' + selection.width + '; height: ' + selection.height);
                            }
                        });
                        $(".imgareaselect-border1, .imgareaselect-border2").css('border', 'none');
                        $(".imgareaselect-outer").css('background-color', 'unset');
                        ias.setSelection(0, 0, minsize, minsize, true);
                        ias.setOptions({show: true});
                        ias.getSelection();

                        $(".loading").css('display', 'none');

                        $(window).on("resize", function () {

                            windowresizeadjust();

                        });
                    }
                    else {

                        $('.imageuploadpopupphotocontainer').html("<div class='loading' id='loading'><img draggable='false' src='images/nav/rmlloadinglargedark.gif' class='loadimg'/><div class='loadingtext'>Loading...</div></div>")
                        setTimeout(function () {
                            // $('.imageuploadpopupphotocontainer').html("<div class='loading' id='loading'><img draggable='false' src='images/nav/rmlloadinglargedark.gif' class='loadimg'/><div class='loadingtext'>Loading...</div></div>");
                            $(".createlistrawimageurl").val('');
                            $("#deleteconfirmmessagebackground , #itempopupshowmediaerror").css({'display': 'block'})
                            $(".imageuploadpopupphoto").attr("src", 'images/fallbackimages/itemimage.png');
                            $(".loading").css('display', 'none');
                            $(".itempopuptext").text("The file you have selected is" + humanize(sizeofimage) + "in size and is too large. Please select an image that is smaller than 4 MB.");
                        }, 1000);
                    }
                }
            }
            else {

                $('.imageuploadpopupphotocontainer').html("<div class='loading' id='loading'><img draggable='false' src='images/nav/rmlloadinglargedark.gif' class='loadimg'/><div class='loadingtext'>Loading...</div></div>")
                setTimeout(function () {
                    $(".createlistrawimageurl").val('');
                    $(".loadimg, .loadingtext ").css('display', 'none');
                    $(" #itempopupshowmediaerror, #deleteconfirmmessagebackground").css({'display': 'block'});
                    $("#deleteconfirmmessagebackground").css('z-index', '401');
                    $(".itempopuptext").text("Sorry! The link you provided is invalid. Please try another image.");
                }, 1000);
            }


        }
        else {
            $('.imageuploadpopupphotocontainer').html("<div class='loading' id='loading'><img draggable='false' src='images/nav/rmlloadinglargedark.gif' class='loadimg'/><div class='loadingtext'>Loading...</div></div>")
            setTimeout(function () {
                $(".createlistrawimageurl").val('');
                $(".loadimg, .loadingtext ").css('display', 'none');
                $(" #itempopupshowmediaerror, #deleteconfirmmessagebackground").css({'display': 'block'});
                $("#deleteconfirmmessagebackground").css('z-index', '401');
                $(".itempopuptext").text("Sorry! The link you provided is invalid. Please try another image.");
            }, 1000);
        }


    });

    $(".itempopup").on('click', ".itempopupclose, .itempopupbuttoncancel", function (e) {

        $(".itempopup , #deleteconfirmmessagebackground ,#imageuploadpopup,.imageuploadpopupoverall").css('display', 'none');
        $(".imageselectiondiv").css('display', 'block');

        $('.imageuploadpopupphoto').imgAreaSelect({remove: true});
        $('body').css('overflow', 'auto');
        $("#deleteconfirmmessagebackground").css('z-index', '9');
        $('.imageuploadpopupphotocontainer').html("<img draggable='false' src='images/fallbackimages/itemimage.png' class='imageuploadpopupphoto zerodeg' id='imageuploadpopupphoto'\>");
        $(".imageuploadpopupphoto").addClass('zerodeg').removeClass('ninetydeg').removeClass('oneeightydeg').removeClass('twoseventydeg');
    });

    $(".giphysearchbox").bind('keypress', function (e) {
        var code = e.keyCode;
        if (code == 13) {
            $('.giphysearchbutton').click();
            return false;
        }
    });

    $(".imageuploadfromgiphyholder").on('click', '.giphysearchbutton', function () {
        $('.imageuploadpopupphoto').imgAreaSelect({remove: true});
        $('.giphyloading').css("display", "block").css('height', '166px');

        // $(".imagefromgiphyimage").val('');
        $(".imagefromgfycatimage").val('');
        $(".imagefromgettyimages").val('');
        var searchphrase = $('.giphysearchbox').val();
        var previoussearchphrase = $('#giphysearchcheck').val();

        console.log(previoussearchphrase);

        $.ajax({
            type: 'GET',
            url: "https://api.giphy.com/v1/gifs/search?q=" + searchphrase + "&limit=100&api_key=4c7974638f414558af47da47eddeb5b6",
            contentType: 'text/plain',
            crossDomain: "true",
            dataType: "json",
            beforeSend: function () {
                $('.giphygallery').css('display', 'none');

            }
        }).done(function (data) {
            $('.giphyloading').fadeOut();

            var giphygalleryhtml = "";
            var datacount = data.data.length;
            console.log(data.data)
            console.log(data.data[0].id)

            if (datacount > 0) {
                if (datacount > 50) {
                    datacount = 50;
                }

                $('.giphyoutput').empty();
                $('.giphyoutput').show();
                $('.giphygallery').show();

                // $(".imageuploadpopupphoto").attr("src", 'https://media.giphy.com/media/' + data.data[0].id + '/200w_d.gif');


                for (var i = 0; i < datacount; i++) {
                    giphygalleryhtml = giphygalleryhtml + "<div class='giphyoutputgalleryimagewrapperouter'><div style='background-image: url(images/nav/rmlloadingdark.gif); background-repeat: no-repeat; background-position: center; min-width: 20px;' class='giphyoutputgalleryimagewrapper'><img class=giphyoutputgalleryimage src='https://media.giphy.com/media/" + data.data[i].id + "/200w_d.gif'/></div></div>";
                }

                $(".giphyoutput").append(giphygalleryhtml);
                var scrollPane = $('.giphygallery').jScrollPane({
                    autoReinitialise: true,
                    autoReinitialiseDelay: 2000
                }, function () {
                });
                scrollPane.data('jsp').scrollToX(0);

                scrollPane.bind(
                    'mousewheel',
                    function (event, delta, deltaY) {
                        scrollPane.data('jsp').scrollByX(delta * -30);
                        return false;
                    }
                );

                $('.giphygallery .jspPane').draggable({

                    axis: 'x',
                    cursor: 'e-resize',
                    drag: function (event, ui) {
                        var offsetXPos = parseInt(ui.position.left);
                        scrollPane.data('jsp').scrollToX(-offsetXPos, false);
                        var pos = ui.position.left;
                        // console.log(pos)

                        if ($('.giphyoutputcontainer').width() > $('#giphygallery  .jspContainer').width()) {
                            if (pos < -$('.giphyoutputcontainer').width() + $('#giphygallery  .jspContainer').width()) {
                                $('.giphygallery .jspPane .ui-draggable').css('left', -$('.giphyoutputcontainer').width() + $('#giphygallery .jspContainer').width());
                                return false;
                            }
                            if (pos >= 0) {
                                $('.giphygallery  .jspPane .ui-draggable').css('left', 0);
                                return false;
                            }
                        }
                        else {
                            $('.giphygallery  .jspPane').css('left', 0);
                            return false;
                        }
                    }
                });

                firstgiphyimage = 'https://i.giphy.com/' + data.data[0].id + '.gif';

                console.log(firstgiphyimage);
                var img = new Image();
                img.src = $(".giphyoutput").children().first().find(".giphyoutputgalleryimage").attr('src');
                img.onload = function () {

                    giphyadjustingsize = thirdpartyadjustsize(this.height, this.width);

                    $('.imageuploadpopupphotocontainer').html("<div class='loading' id='loading'><img draggable='false' src='images/nav/rmlloadinglargedark.gif' class='loadimg'/><div class='loadingtext'>Loading...</div></div>");

                    setTimeout(function () {
                        $(".loadimg, .loadingtext").css('display', 'none');

                        $('.imageuploadpopupphotocontainer').html("<img draggable='false' class='imageuploadpopupphoto zerodeg thirdparty'  id='imageuploadpopupphoto' src='" + firstgiphyimage + "' style='width:" + giphyadjustingsize['width'] + " ; height: " + giphyadjustingsize['height'] + "' />");

                    }, 500);
                };

                $(".imagefromgiphyimage").val(data.data[0].id);
                $(window).on("resize", function () {
                    adjustsize();
                });
            }


        }).fail(function (data) {

            // showmediaerror('Image Upload',"Oops! Connection lost. Please check your internet connection.");
            // $('#' + selecteduniqueid + ' #giphyloading').attr('aria-hidden', true);
        });
    });

    $(".imageuploadfromgiphyholder ").on('click', '.giphyoutputgalleryimagewrapperouter', function (e) {
        $('.imageuploadpopupphoto').imgAreaSelect({remove: true});
        orggiphyheight = $(this).children().find(".giphyoutputgalleryimage").height();
        orggiphywidth = $(this).children().find(".giphyoutputgalleryimage").width();

        giphyurl = $(this).children().find(".giphyoutputgalleryimage").attr('src');
        giphyid = giphyurl.split('/')[4];
        firstgiphyimage = 'https://i.giphy.com/' + giphyid + '.gif';
        $(".imagefromgiphyimage").val(giphyid);
        $('.imageuploadpopupphotocontainer').html("<div class='loading' id='loading'><img draggable='false' src='images/nav/rmlloadinglargedark.gif' class='loadimg'/><div class='loadingtext'>Loading...</div></div>");

        giphyadjustingsize = thirdpartyadjustsize(orggiphyheight, orggiphywidth);

        setTimeout(function () {
            $(".loadimg, .loadingtext").css('display', 'none');

            $('.imageuploadpopupphotocontainer').html("<img draggable='false' class='imageuploadpopupphoto zerodeg'  id='imageuploadpopupphoto' src='" + firstgiphyimage + "' style='width:" + giphyadjustingsize['width'] + " ; height: " + giphyadjustingsize['height'] + "' />");

        }, 500);


        // $(".imageuploadpopupphoto").attr("src", $(this).children().find(".giphyoutputgalleryimage").attr('src'));
        // $(".imagefromgiphyimage").val(giphyid);
    });

    $(".gettysearchbox").bind('keypress', function (e) {
        var code = e.keyCode;
        if (code == 13) {
            $('.gettyimagessearchbutton').click();
            return false;
        }
    });

    $(".imageuploadfromgettyholder").on('click', '.gettyimagessearchbutton', function () {
        $('.imageuploadpopupphoto').imgAreaSelect({remove: true});
        $('.gettyimagesloading').css("display", "block").css('height', '166px');

        $(".imagefromgiphyimage").val('');
        $(".imagefromgfycatimage").val('');
        // $(".imagefromgettyimages").val('');
        var searchphrase = $('.gettysearchbox').val();
        var previoussearchphrase = $('#gettyimagessearchcheck').val();
        var apiKey = 'je7hcr2f68a3xr64vrh38fz6';

        $.ajax({
            type: 'GET',
            url: "https://api.gettyimages.com/v3/search/images/editorial?phrase=" + encodeURIComponent(searchphrase) + "&fields=detail_set&embed_content_only=true&sort_order=most_popular",
            contentType: 'text/plain',
            dataType: "json",
            beforeSend: function (request) {

                request.setRequestHeader("Api-Key", apiKey);
                $('.gettyimagesgallery').css('display', 'none');

            }
        }).done(function (data) {


            $('.gettyimagesloading').fadeOut();
            var galleryhtml = "";
            var datacount = data.images.length;
            console.log(data.images);
            gettyarray = data.images;

            if (datacount > 0) {
                $('.gettyimagesoutput').empty();
                $('.gettyimagesoutput').show();
                $('.gettyimagesgallery').show();

                var galleryhtml = "";

                for (var i = 0; i < data.images.length; i++) {
                    if (data.images[i].referral_destinations[0].site_name == 'gettyimages') {

                        galleryhtml = galleryhtml + "<div class='gettyoutputgalleryimagewrapperouter'><div class='gettyoutputgalleryimagewrapper'><img class=gettyoutputgalleryimage src='" + data.images[i].display_sizes[2].uri + "'/></div></div>";
                    }
                }

                $(".gettyimagesoutput").append(galleryhtml);
                var scrollPane = $('.gettyimagesgallery').jScrollPane({
                    autoReinitialise: true,
                    autoReinitialiseDelay: 2000
                }, function () {
                });
                scrollPane.data('jsp').scrollToX(0);

                scrollPane.bind(
                    'mousewheel',
                    function (event, delta, deltaY) {
                        scrollPane.data('jsp').scrollByX(delta * -30);
                        return false;
                    }
                );

                $('.gettyimagesgallery .jspPane').draggable({

                    axis: 'x',
                    cursor: 'e-resize',
                    drag: function (event, ui) {
                        var offsetXPos = parseInt(ui.position.left);
                        scrollPane.data('jsp').scrollToX(-offsetXPos, false);
                        var pos = ui.position.left;
                        console.log(pos)

                        if ($('.gettyimagesoutputcontainer').width() > $('#gettyimagesgallery  .jspContainer').width()) {
                            if (pos < -$('.gettyimagesoutputcontainer').width() + $('#gettyimagesgallery  .jspContainer').width()) {
                                $('.gettyimagesgallery .jspPane .ui-draggable').css('left', -$('.gettyimagesoutputcontainer').width() + $('#gettyimagesgallery   .jspContainer').width());
                                return false;
                            }
                            if (pos >= 0) {
                                $('.gettyimagesgallery .gallery .jspPane .ui-draggable').css('left', 0);
                                return false;
                            }
                        }
                        else {
                            $('.gettyimagesgallery .gallery .jspPane').css('left', 0);
                            return false;
                        }

                    }
                });


                var img = new Image();
                img.src = $(".gettyimagesoutput").children().first().find(".gettyoutputgalleryimage").attr('src');
                img.onload = function () {

                    gettyadjustingsize = thirdpartyadjustsize(this.height, this.width);

                    $('.imageuploadpopupphotocontainer').html("<div class='loading' id='loading'><img draggable='false' src='images/nav/rmlloadinglargedark.gif' class='loadimg'/><div class='loadingtext'>Loading...</div></div>");

                    setTimeout(function () {
                        $(".loadimg, .loadingtext").css('display', 'none');

                        $('.imageuploadpopupphotocontainer').html("<img draggable='false'  class='imageuploadpopupphoto zerodeg thirdparty'  id='imageuploadpopupphoto' src='" + data.images[0].display_sizes[0].uri + "'  style='width:" + gettyadjustingsize['width'] + " ; height: " + gettyadjustingsize['height'] + "' />");

                    }, 500);

                    var gettyurl = data.images[0].display_sizes[0].uri;
                    var gettyid = (gettyurl.split('-id')[1]).split('?')[0];
                    console.log(gettyid);
                    var urlid = gettyarray.findIndex((item) => item.id === gettyid);
                    console.log(urlid)
                    var firstgettyimage = gettyarray[urlid].display_sizes[0].uri;
                    console.log((firstgettyimage.split('/')[4]).split('?')[0]);
                    $(".imagefromgettyimages").val((firstgettyimage.split('/')[4]).split('?')[0]);
                };


                $(window).on("resize", function () {
                    adjustsize();
                });
            }


        }).fail(function (data) {

            // showmediaerror('Image Upload',"Oops! Connection lost. Please check your internet connection.");
            // $('#' + selecteduniqueid + ' #giphyloading').attr('aria-hidden', true);
        });
    });

    $(".imageuploadfromgettyholder").on('click', '.gettyoutputgalleryimagewrapperouter', function (e) {

        $('.imageuploadpopupphoto').imgAreaSelect({remove: true});
        orgheight = $(this).children().find(".gettyoutputgalleryimage").height();
        orgwidth = $(this).children().find(".gettyoutputgalleryimage").width();

        gettyurl = $(this).children().find(".gettyoutputgalleryimage").attr('src');
        gettyid = (gettyurl.split('-id')[1]).split('?')[0];
        console.log(gettyid);
        var urlid = gettyarray.findIndex((item) => item.id === gettyid);
        console.log(urlid)
        firstgettyimage = gettyarray[urlid].display_sizes[0].uri;
        console.log((firstgettyimage.split('/')[4]).split('?')[0]);
        $(".imagefromgettyimages").val((firstgettyimage.split('/')[4]).split('?')[0]);

        $('.imageuploadpopupphotocontainer').html("<div class='loading' id='loading'><img draggable='false' src='images/nav/rmlloadinglargedark.gif' class='loadimg'/><div class='loadingtext'>Loading...</div></div>");

        gettyadjustingsize = thirdpartyadjustsize(orgheight, orgwidth);

        setTimeout(function () {
            $(".loadimg, .loadingtext").css('display', 'none');

            $('.imageuploadpopupphotocontainer').html("<img draggable='false' class='imageuploadpopupphoto zerodeg'  id='imageuploadpopupphoto' src='" + gettyarray[urlid].display_sizes[0].uri + "'style='width:" + gettyadjustingsize['width'] + " ; height: " + gettyadjustingsize['height'] + "' />");
        }, 500);

    });

    $(".gfycatsearchbox").bind('keypress', function (e) {
        var code = e.keyCode;
        if (code == 13) {
            $('.gfycatsearchbutton').click();
            return false;
        }
    });

    $(".imageuploadfromgfycatholder").on('click', '.gfycatsearchbutton', function () {
        $('.imageuploadpopupphoto').imgAreaSelect({remove: true});
        $('.gfycatloading').css("display", "block").css('height', '166px');
        $(".imagefromgiphyimage").val('');
        // $(".imagefromgfycatimage").val('');
        $(".imagefromgettyimages").val('');
        var searchphrase = $('.gfycatsearchbox').val();
        var previoussearchphrase = $('#gettyimagessearchcheck').val();
        console.log(searchphrase);
        if (searchphrase != "") {
            searchphrase = searchphrase.split(' ').join('+');
            $.ajax({
                type: 'GET',
                url: "https://api.gfycat.com/v1/gfycats/search?search_text=" + encodeURIComponent(searchphrase) + "&count=50",
                contentType: 'text/plain',
                crossDomain: "true",
                dataType: "json",
                beforeSend: function (request) {

                    $('.gfycatgallery').css('display', 'none');

                }
            }).done(function (data) {


                $('.gfycatloading').fadeOut();

                gfycatarray = data.gfycats;
                //
                if (data.gfycats.length > 0) {
                    $('.gfycatoutput').empty();
                    $('.gfycatoutput').show();
                    $('.gfycatgallery').show();

                    var gfycatgalleryhtml = "";
                    var datacount = data.gfycats.length;
                    for (var i = 0; i < datacount; i++) {
                        gfycatgalleryhtml = gfycatgalleryhtml + "<div class='gfycatoutputgalleryimagewrapperouter'><div style='background-image: url(images/nav/rmlloadingdark.gif); background-repeat: no-repeat; background-position: center; min-width: 20px;' class='gfycatoutputgalleryimagewrapper'><img class=gfycatoutputgalleryimage src='" + data.gfycats[i].miniPosterUrl + "'/></div></div>";


                    }
                    $(".gfycatoutput").append(gfycatgalleryhtml);
                    var scrollPane = $('.gfycatgallery').jScrollPane({
                        autoReinitialise: true,
                        autoReinitialiseDelay: 2000
                    }, function () {
                    });
                    scrollPane.data('jsp').scrollToX(0);
                    scrollPane.bind(
                        'mousewheel',
                        function (event, delta, deltaY) {
                            scrollPane.data('jsp').scrollByX(delta * -30);
                            return false;
                        }
                    );


                    $('.gfycatgallery .jspPane').draggable({

                        axis: 'x',
                        cursor: 'e-resize',
                        drag: function (event, ui) {
                            var offsetXPos = parseInt(ui.position.left);
                            scrollPane.data('jsp').scrollToX(-offsetXPos, false);
                            var pos = ui.position.left;
                            console.log(pos)

                            if ($('.gfycatoutputcontainer').width() > $('#gfycatgallery  .jspContainer').width()) {
                                if (pos < -$('.gfycatoutputcontainer').width() + $('#gfycatgallery  .jspContainer').width()) {
                                    $('.gfycatgallery .jspPane .ui-draggable').css('left', -$('.gfycatoutputcontainer').width() + $('#gfycatgallery .jspContainer').width());
                                    return false;
                                }
                                if (pos >= 0) {
                                    $('.gfycatgallery  .jspPane .ui-draggable').css('left', 0);
                                    return false;
                                }
                            }
                            else {
                                $('.gfycatgallery  .jspPane').css('left', 0);
                                return false;
                            }
                        }
                    });

                    var img = new Image();
                    img.src = $(".gfycatoutput").children().first().find(".gfycatoutputgalleryimage").attr('src');
                    img.onload = function () {

                        gyfcatadjustingsize = thirdpartyadjustsize(this.height, this.width);

                        $('.imageuploadpopupphotocontainer').html("<div class='loading' id='loading'><img draggable='false' src='images/nav/rmlloadinglargedark.gif' class='loadimg'/><div class='loadingtext'>Loading...</div></div>");

                        setTimeout(function () {

                            $(".loadimg, .loadingtext").css('display', 'none');

                            $('.imageuploadpopupphotocontainer').html("<img draggable='false' class='imageuploadpopupphoto zerodeg thirdparty'  id='imageuploadpopupphoto' src='" + data.gfycats[0]['max2mbGif'] + "' style='width:" + gyfcatadjustingsize['width'] + " ; height: " + gyfcatadjustingsize['height'] + "' />");

                        }, 500);
                    };
                    var gfycaturl = data.gfycats[0]['max2mbGif'];
                    console.log(gfycaturl)
                    var gfycatid = (gfycaturl.split('/')[3]).split('.')[0];
                    console.log(gfycatid)
                    $(".imagefromgfycatimage").val(gfycatid.split('-')[0]);

                    $(window).on("resize", function () {
                        adjustsize();
                    });
                }

            }).fail(function (data) {
                // showmediaerror('Image Upload',"Oops! Connection lost. Please check your internet connection.");
                // $('#' + selecteduniqueid + ' #gfycatloading').attr('aria-hidden', true);
            });
        }

    });

    $(".imageuploadfromgfycatholder").on('click', '.gfycatoutputgalleryimagewrapperouter', function (e) {
        $('.imageuploadpopupphoto').imgAreaSelect({remove: true});
        orggyfcatheight = $(this).children().find(".gfycatoutputgalleryimage").height();
        orggyfcatwidth = $(this).children().find(".gfycatoutputgalleryimage").width();
        console.log(orggyfcatheight)
        console.log(orggyfcatwidth)


        gfycaturl = $(this).children().find(".gfycatoutputgalleryimage").attr('src');
        var processedimageurl = gfycatarray.findIndex((item) => item.miniPosterUrl === gfycaturl);

        gfycatid = (gfycaturl.split('/')[3]).split('.')[0];
        console.log(gfycatid)
        $(".imagefromgfycatimage").val(gfycatid.split('-')[0]);
        // $(".imageuploadpopupphoto").attr("src", gfycatarray[processedimageurl].gifUrl);
        gyfcatadjustingsize = thirdpartyadjustsize(orggyfcatheight, orggyfcatwidth);

        $('.imageuploadpopupphotocontainer').html("<div class='loading' id='loading'><img draggable='false' src='images/nav/rmlloadinglargedark.gif' class='loadimg'/><div class='loadingtext'>Loading...</div></div>");

        setTimeout(function () {
            $(".loadimg, .loadingtext").css('display', 'none');

            $('.imageuploadpopupphotocontainer').html("<img draggable='false' class='imageuploadpopupphoto zerodeg'  id='imageuploadpopupphoto' src='" + gfycatarray[processedimageurl].gifUrl + "' style='width:" + gyfcatadjustingsize['width'] + " ; height: " + gyfcatadjustingsize['height'] + "' />");

        }, 500);
    });

    rotation = 0;
    $(".imageuploadpopupphotowrapperleftholder").on('click', '.imageuploadpopupuprotateimageleft', function (e) {

        $('.imageuploadpopupphoto').imgAreaSelect({remove: true});
        // rotation = (rotation -90) % 360;
        // console.log(rotation);
        // $(".imageuploadpopupphoto").css({'transform': 'rotate('+rotation+'deg)'});
        if ($(".imageuploadpopupphoto").hasClass('zerodeg')) {

            $(".imageuploadpopupphoto").removeClass('zerodeg').removeClass('ninetydeg').removeClass('oneeightydeg').addClass('twoseventydeg');

        } else if ($(".imageuploadpopupphoto").hasClass('twoseventydeg')) {

            $(".imageuploadpopupphoto").removeClass('zerodeg').removeClass('ninetydeg').addClass('oneeightydeg').removeClass('twoseventydeg');

        } else if ($(".imageuploadpopupphoto").hasClass('oneeightydeg')) {

            $(".imageuploadpopupphoto").removeClass('zerodeg').addClass('ninetydeg').removeClass('oneeightydeg').removeClass('twoseventydeg');

        } else if ($(".imageuploadpopupphoto").hasClass('ninetydeg')) {

            $(".imageuploadpopupphoto").addClass('zerodeg').removeClass('ninetydeg').removeClass('oneeightydeg').removeClass('twoseventydeg');

        }


        adjustsizeforimagerotate();
        adjustmarginsforimagerotate();
        setTimeout(function () {

            var uploadedimg = $(".imageuploadpopupphoto")[0];
            var finalimagewidth = uploadedimg.width;
            var finalimageheight = uploadedimg.height;

            var minsize = Math.min(finalimagewidth, finalimageheight);
            console.log(minsize);
            $(".imageuploadpopupphoto").imgAreaSelect({remove: true});
            var ias = $(".imageuploadpopupphoto").imgAreaSelect({
                onInit: function (img, selection) {
                    document.iasselectionx1 = selection.x1;
                    document.iasselectiony1 = selection.y1;
                    document.iasselectionx2 = selection.x2;
                    document.iasselectiony2 = selection.y2;
                },
                instance: true,
                minWidth: 40,
                minHeight: 40,
                // handles: true, aspectRatio: '1:1',
                handles: true,
                movable: true, resizable: true,
                parent: $('.listimageareaselectcontainer'),
                persistent: true,

                onSelectEnd: function (img, selection) {
                    document.iasselectionx1 = selection.x1;
                    document.iasselectiony1 = selection.y1;
                    document.iasselectionx2 = selection.x2;
                    document.iasselectiony2 = selection.y2;
                }
            });
            $(".imgareaselect-border1, .imgareaselect-border2").css('border', 'none');
            $(".imgareaselect-outer").css('background-color', 'unset');

            ias.setSelection(0, 0, minsize, minsize, true);
            ias.setOptions({show: true});
        }, 100);


        $(window).on("resize", function () {

            adjustsizeforimagerotate();
            adjustmarginsforimagerotate();
            setTimeout(function () {

                var uploadedimg = $(".imageuploadpopupphoto")[0];
                var finalimagewidth = uploadedimg.width;
                var finalimageheight = uploadedimg.height;

                var minsize = Math.min(finalimagewidth, finalimageheight);
                console.log(minsize)
                $(".imageuploadpopupphoto").imgAreaSelect({remove: true});
                var ias = $(".imageuploadpopupphoto").imgAreaSelect({
                    onInit: function (img, selection) {
                        document.iasselectionx1 = selection.x1;
                        document.iasselectiony1 = selection.y1;
                        document.iasselectionx2 = selection.x2;
                        document.iasselectiony2 = selection.y2;
                    },
                    instance: true,
                    minWidth: 40,
                    minHeight: 40,
                    // handles: true, aspectRatio: '1:1',
                    handles: true,
                    movable: true, resizable: true,
                    parent: $('.listimageareaselectcontainer'),
                    persistent: true,

                    onSelectEnd: function (img, selection) {
                        document.iasselectionx1 = selection.x1;
                        document.iasselectiony1 = selection.y1;
                        document.iasselectionx2 = selection.x2;
                        document.iasselectiony2 = selection.y2;
                    }
                });
                $(".imgareaselect-border1, .imgareaselect-border2").css('border', 'none');
                $(".imgareaselect-outer").css('background-color', 'unset');

                ias.setSelection(0, 0, minsize, minsize, true);
                ias.setOptions({show: true});
            }, 100);


        });

    });

    $(".imageuploadpopupphotowrapperleftholder").on('click', '.imageuploadpopupuprotateimageright', function (e) {

        if ($(".imageuploadpopupphoto").hasClass('zerodeg')) {
            $(".imageuploadpopupphoto").removeClass('zerodeg').addClass('ninetydeg').removeClass('oneeightydeg').removeClass('twoseventydeg');
        } else if ($(".imageuploadpopupphoto").hasClass('ninetydeg')) {
            $(".imageuploadpopupphoto").removeClass('zerodeg').removeClass('ninetydeg').addClass('oneeightydeg').removeClass('twoseventydeg');
        } else if ($(".imageuploadpopupphoto").hasClass('oneeightydeg')) {
            $(".imageuploadpopupphoto").removeClass('zerodeg').removeClass('ninetydeg').removeClass('oneeightydeg').addClass('twoseventydeg');
        } else if ($(".imageuploadpopupphoto").hasClass('twoseventydeg')) {
            $(".imageuploadpopupphoto").addClass('zerodeg').removeClass('ninetydeg').removeClass('oneeightydeg').removeClass('twoseventydeg');
        }
        adjustsizeforimagerotate();
        adjustmarginsforimagerotate();
        setTimeout(function () {

            var uploadedimg = $(".imageuploadpopupphoto")[0];
            var finalimagewidth = uploadedimg.width;
            var finalimageheight = uploadedimg.height;

            var minsize = Math.min(finalimagewidth, finalimageheight);
            $(".imageuploadpopupphoto").imgAreaSelect({remove: true});
            var ias = $(".imageuploadpopupphoto").imgAreaSelect({
                onInit: function (img, selection) {
                    document.iasselectionx1 = selection.x1;
                    document.iasselectiony1 = selection.y1;
                    document.iasselectionx2 = selection.x2;
                    document.iasselectiony2 = selection.y2;
                },
                instance: true,
                minWidth: 40, minHeight: 40,
                // handles: true, aspectRatio: '1:1',
                handles: true,
                movable: true, resizable: true,
                parent: $('.listimageareaselectcontainer'),
                persistent: true,
                onSelectEnd: function (img, selection) {
                    document.iasselectionx1 = selection.x1;
                    document.iasselectiony1 = selection.y1;
                    document.iasselectionx2 = selection.x2;
                    document.iasselectiony2 = selection.y2;
                }
            });
            $(".imgareaselect-border1, .imgareaselect-border2").css('border', 'none');
            $(".imgareaselect-outer").css('background-color', 'unset');

            ias.setSelection(0, 0, minsize, minsize, true);
            ias.setOptions({show: true});
        }, 100);
    });

    $(".imageuploadpopupphotowrapper").on('click', '#imageuploadpopupbuttonselect', function (e) {
        // var selectpopup = '#imageuploadpopupoverall-' + itemid + '-img' + imgnum;

        if ($('.imageuploadpopupphoto ').length > 0) {

            if ($('.imageuploadpopupphoto ').attr('src').indexOf('images/fallbackimages/itemimage.png') !== 0) {

                console.log($('.imageuploadpopupphoto').hasClass("thirdparty"))

                if (($('.imageuploadpopupphoto').hasClass("thirdparty") == false)) {

                    var actual = imgaxisdefinedtoraw($('.imageuploadpopupphoto '), document.iasselectionx1, document.iasselectiony1, document.iasselectionx2, document.iasselectiony2);
                    console.log(actual);

                    $(".x1").val(actual['x1']);
                    $(".y1").val(actual['y1']);
                    $(".x2").val(actual['x2']);
                    $(".y2").val(actual['y2']);
                }
                carousel_child = parseInt($(".carousel_multi li").length);
                carousel_child = carousel_child + 1;
                multitotal_width = parseInt($('.carousel_multi').width()) + carousel_child * ($(".all-items-multi").width() - 85) + carousel_child * 10;
                $('.carousel_multi').css('width', multitotal_width + 'px');
                image = $('.imageuploadpopupuploadbuttoninput').val();
                $("#deleteconfirmmessagebackground").css('display', 'none');
                $('#myForm_multi').ajaxForm({
                    url: 'ajax/multimedia.php',
                    type: 'POST',
                    success: function (data) {
                        console.log(data);
                        var objects = JSON.parse(data);
                        sorted_load = [];

                        if (typeof objects !== "undefined") {
                            for (i = 0; i < Object.keys(objects).length; i++) {
                                sorted_load.push(objects[i]);
                            }
                            console.log(sorted_load);
                            index_sel = sorted_load.findIndex((item) => item.selected === 1);
                            if (index_sel != -1) {
                                var shifted = sorted_load.shift(index_sel);
                                sorted_load.sort(function (a, b) {
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
                                sorted_load.unshift(shifted);
                            } else {
                                sorted_load.sort(function (a, b) {

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
                            console.log(sorted_load);
                            id_index = parseInt(Object.keys(objects).length - 1);
                            console.log(objects[id_index]['id']);
                            index = sorted_load.findIndex((item) => item.id === objects[id_index]['id']);
                            // console.log(index);
                            // console.log(sorted_load[index]);

                            multistr = "<li class='multi-element' id='multi_elem_" + sorted_load[index]['id'] + "' data_multi_elem_id='" + sorted_load[index]['id'] + "' data-score=" + sorted_load[index]['score'] + " data_id=" + sorted_load[index]['id'] + " data-select-at=" + sorted_load[index]['selected'] + "><div class='multicontent-part' id='multicontent_" + sorted_load[index]['id'] + "'><div class='photo' id='des_" + sorted_load[index]['id'] + "'>";

                            if (sorted_load[index]['image'] != 'rml' && sorted_load[index]['gettyimageid'] == null && sorted_load[index]['giphyid'] == null && sorted_load[index]['gfycatid'] == null) {

                                image_str = "<img src='images/raw/" + sorted_load[index]['image'] + "' class='multicontent' alt='No Image' id='content_" + sorted_load[index]['id'] + "' >";

                            }
                            else if (sorted_load[index]['image'] == 'rml' && sorted_load[index]['gettyimageid'] != null && sorted_load[index]['giphyid'] == null && sorted_load[index]['gfycatid'] == null) {
                                image_str = "<img src='https://media.gettyimages.com/photos/" + sorted_load[index]['gettyimageid'] + "' class='multicontent thirdparty' alt='No Image' id='content_" + sorted_load[index]['id'] + "' >";
                            }
                            else if (sorted_load[index]['image'] == 'rml' && sorted_load[index]['gettyimageid'] == null && sorted_load[index]['giphyid'] != null && sorted_load[index]['gfycatid'] == null) {
                                image_str = "<img src='https://i.giphy.com/" + sorted_load[index]['giphyid'] + ".gif'  class='multicontent thirdparty' alt='No Image' id='content_" + sorted_load[index]['id'] + "'>";
                            }
                            else if (sorted_load[index]['image'] == 'rml' && sorted_load[index]['gettyimageid'] == null && sorted_load[index]['giphyid'] == null && sorted_load[index]['gfycatid'] != null) {

                                image_str = "<img src='https://thumbs.gfycat.com/" + sorted_load[index]['gfycatid'] + "-size_restricted.gif' class='multicontent thirdparty' alt='No Image' id='content_" + sorted_load[index]['id'] + "' >";

                            }
                            second_multistr = "</div><div class='hoverable' style='display: none'><a href='../content_with_image.php/" + sorted_load[index]['user_id'] + "'><img src='css/exm.jpg' alt='Paris' style='border:none ; border-radius:50%; background-color: white ; width:51px ;height:51px; position: relative; margin-top:20px; margin-left: 20px;'></a><div class='cont' style='display: none'>" + sorted_load[index]['id'] + "</div><div class='multimain-content'><span class='multicontributor_name'>" + sorted_load[index]['username'] + "</span></div><div class='multiopinion'><div class='multicontributionslikedislike'>";

                            if (sorted_load[index]['like_before'] === true) {
                                var like_str = "<div id='multisel_" + sorted_load[index]['id'] + "' data_field_id='" + sorted_load[index]['id'] + "' class='multilikebutton multiliked_before'></div><span id='loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_" + sorted_load[index]['id'] + "'>" + sorted_load[index]['total_likes'] + "</span>"
                            } else {
                                like_str = "<div id='multisel_" + sorted_load[index]['id'] + "' data_field_id='" + sorted_load[index]['id'] + "' class='multilikebutton multilike'></div><span id='loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_" + sorted_load[index]['id'] + "'>" + sorted_load[index]['total_likes'] + "</span>"

                            }
                            if (sorted_load[index]['dislike_before'] === true) {
                                var dislike_str = "<div id='multisel_dis_" + sorted_load[index]['id'] + "' data_field_id='" + sorted_load[index]['id'] + "' class='multidislikebutton multidisliked_before'></div><span id='dis_loader' style='display: none'><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_dis_" + sorted_load[index]['id'] + "'>" + sorted_load[index]['total_likes'] + "</span>"
                            } else {
                                dislike_str = "<div id='multisel_dis_" + sorted_load[index]['id'] + "' data_field_id='" + sorted_load[index]['id'] + "' class='multidislikebutton multidislike'></div><span id='dis_loader' style='display: none' ><img src='images/loadermini.gif'></span><span class='multipoint' id='multispan_dis_" + sorted_load[index]['id'] + "'>" + sorted_load[index]['total_likes'] + "</span>"

                            }
                            delete_str = "</div></div><div class='imageitemoptionmorebutton_delete' id=" + sorted_load[index]['id'] + "></div><div class='imageitemoptionmoreoptionholder_delete' id=" + sorted_load[index]['id'] + " style='display: none'><div class='imageitemdeletetextparentholder' id=" + sorted_load[index]['id'] + "> <div class='imageitemdeleteicon'></div><div class='imagedeletetextforitem'>Delete</div></div></div><div class='multiscore_count' style='display: none'> Score: <span id='multispan_score_" + sorted_load[index]['id'] + "'>" + sorted_load[index]['score'] + "</span></div></li>";
                            multistrings = multistr + image_str + second_multistr + like_str + dislike_str + delete_str;
                            if ($(".carousel_multi li").length == 0) {

                                $(".carousel_multi").append(multistrings);

                                $("#multi_elem_" + sorted_load[index]['id']).css('width', ($(".all-items-multi").width() - 85) + 'px');
                                $("#multi_elem_" + sorted_load[index]['id']).css('height', ($(".content").height()) + 'px');


                                console.log($("#content_" + sorted_load[index]['id']))
                                if ($("#content_" + sorted_load[index]['id']).hasClass("thirdparty") == true) {

                                    thirdpartyupdateselectedimage(sorted_load[index]['id'])
                                }
                                else {
                                    updateselectedimage(sorted_load[index]['id']);
                                }
                                $(window).on("resize", function () {

                                    if ($("#content_" + sorted_load[index]['id']).hasClass("thirdparty") == true) {

                                        thirdpartyupdateselectedimage(sorted_load[index]['id'])
                                    }
                                    else {
                                        updateselectedimage(sorted_load[index]['id']);
                                    }

                                });

                            } else if ($(".carousel_multi li").length > 0) {

                                $(".multiprev-load-more").show();
                                $('.carousel_multi li').last().after(multistrings);

                                console.log($("#content_" + sorted_load[index]['id']));
                                console.log($("#content_" + sorted_load[index]['id']).hasClass("thirdparty"));
                                $("#multi_elem_" + sorted_load[index]['id']).css('width', ($(".all-items-multi").width() - 85) + 'px');
                                $("#multi_elem_" + sorted_load[index]['id']).css('height', ($(".content").height()) + 'px');
                                if ($("#content_" + sorted_load[index]['id']).hasClass("thirdparty") == true) {

                                    thirdpartyupdateselectedimage(sorted_load[index]['id'])
                                }
                                else {
                                    updateselectedimage(sorted_load[index]['id']);
                                }

                                $(window).on("resize", function () {

                                    if ($("#content_" + sorted_load[index]['id']).hasClass("thirdparty") == true) {

                                        thirdpartyupdateselectedimage(sorted_load[index]['id'])
                                    }
                                    else {
                                        updateselectedimage(sorted_load[index]['id']);
                                    }

                                });
                            }
                            $(".carousel_multi").attr('data-count', carousel_child);

                            var add_count = parseInt($(".carousel_multi").attr('data-count'));
                            var addleft_width = parseInt($('.multi-element').width());
                            var add_distance = add_count * addleft_width + add_count * 10;
                            $('.all-items-multi').animate({'margin-left': -add_distance + 'px'}, {
                                "duration": 1000,
                                "easing": "linear"
                            });


                            $(window).resize(function () {
                                var add_count = parseInt($(".carousel_multi").attr('data-count'));
                                var addleft_width = parseInt($('.multi-element').width());
                                var add_distance = add_count * addleft_width + add_count * 10;
                                $('.all-items-multi').css('margin-left', -add_distance + 'px');


                            });

                            if (add_count === 0) {
                                $(".multiprev-load-more").hide()
                            }

                            if (add_count == sorted_load.length) {
                                $(".multiload-more").hide();
                            }
                            $("#multirow").val(Number($('#multirow').val()) + 1);
                        }
                    }
                });
                // }
                // else{
                //         alert("The file size is greater than 4 MB");
                //     }
            }
        }
        $('.imageuploadpopupphoto').imgAreaSelect({remove: true});

        $(".uploadimage").css('display', 'block');
        $(".multiload-more").css('display', 'block');
        $(".multiprev-load-more").css('display', 'block');
        $(".imageuploadpopup,.imageselectiondiv,#imageselectiondivbackground,.imageuploadpopupoverall").css('display', 'none');
        $('body').css('overflow', 'auto');
        $(".imageuploadpopupphotowrapperright").children().css('display', 'none');
        // $(".imagefromgiphyimage").val('');
        // $(".imagefromgfycatimage").val('');
        // $(".imagefromgettyimages").val('');
        $(".imageuploadpopupuprotateimagewrapper").css('display', 'none');
        $('.giphyoutput').empty();
        $('.gettyimagesoutput').empty();
        $('.gfycatoutput').empty();
        $('.gfycatgallery').removeAttr("style");
        $('.giphygallery').removeAttr("style");
        $('.gettyimagesgallery').removeAttr("style");
        $(".imageuploadpopup").removeClass("notdraggable");
        $(".gfycatsearchbox").val('');
        $(".gettysearchbox").val('');
        $(".giphysearchbox").val('');
        // $(".imageuploadpopupphoto").addClass('zerodeg').removeClass('ninetydeg').removeClass('oneeightydeg').removeClass('twoseventydeg');
        $(".imageselectiondiv").addClass("notdraggable")

    });

    $("#imageuploadpopup").on('click', '#imageuploadpopupbuttoncancel,#listimageuploadpopupclose', function (e) {
        e.preventDefault();
        $(".imageselectiondiv").css('display', 'block');
        $(".uploadimage").css('display', 'block');
        $(".multiload-more").css('display', 'block');
        $(".multiprev-load-more").css('display', 'block');
        $(".createlistrawimageurl").val('');
        $('.imageuploadpopupphoto').imgAreaSelect({remove: true});
        $('.imageuploadpopupphotocontainer').html("<img draggable='false' src='images/fallbackimages/itemimage.png' class='imageuploadpopupphoto zerodeg' id='imageuploadpopupphoto'\>");
        $('body').css('overflow', 'auto');
        // $("#imageuploadpopup , #deleteconfirmmessagebackground").css('display', 'none');
        $(".imageuploadpopupoverall , #deleteconfirmmessagebackground ").css('display', 'none');
        $(".loading , .loadingtext").css('display', 'none');
        $(".giphysearchbox").val('');
        $(".gettysearchbox").val('');
        $(".gfycatsearchbox").val('');
        $('.giphyoutput').empty();
        $('.gettyimagesoutput').empty();
        $('.gfycatoutput').empty();
        $('.gfycatgallery').removeAttr("style");
        $('.giphygallery').removeAttr("style");
        $('.gettyimagesgallery').removeAttr("style");
        $(".imageuploadpopup").removeClass("notdraggable");
        $('.imageuploadpopupphoto,.imageuploadpopupphotowrapperleftholder').css('width', '').css('height', '');
        $(".dragyourimageherefromyourdevice").css('display', 'none');
        $(".imageuploadpopup").css('display', 'block');
        $(".imageuploadpopupphoto").addClass('zerodeg').removeClass('ninetydeg').removeClass('oneeightydeg').removeClass('twoseventydeg');

        $("#deleteconfirmmessagebackground").css('z-index', '9');
        $(".loadimg, .loadingtext").css('display', 'none');
        $(".imageuploadpopupphotowrapperright").children().css('display', 'none');
        $(".imagefromgiphyimage").val('');
        $(".imagefromgfycatimage").val('');
        $(".imagefromgettyimages").val('');
        $('.imageuploadpopupphoto').removeClass("thirdparty");
        $(".itempopupshowmediaerror").css('display', 'none');
        $("#imageuploadpopupbuttonselect").prop('disabled', false);
        $("#imageuploadpopupbuttonselect").removeClass('imageuploadpopupbuttondisabled');
        $(".imageuploadpopupphotowrapperleftholder").css('width', '').css('height', '');
        $(".imageuploadpopupuprotateimagewrapper").css('display', 'none');


    });

    $(".imageselectiondiv").on('click', '.cancelpopup', function (e) {
        $(".imageuploadpopup").removeClass("notdraggable");
        $(".imageselectiondiv , #imageselectiondivbackground").css('display', 'none');
        $('body').css('overflow', 'auto');
        $('.imageuploadpopupphoto').imgAreaSelect({remove: true});
        $(".imageuploadpopupphotowrapperright").children().css('display', 'none');
        $(".imagefromgiphyimage").val('');
        $(".imagefromgfycatimage").val('');
        $(".imagefromgettyimages").val('');
        $('.imageuploadpopupphoto').removeClass("thirdparty");
        $(".imageuploadpopupuprotateimagewrapper").css('display', 'none');

        $(".imageuploadpopupphoto").addClass('zerodeg').removeClass('ninetydeg').removeClass('oneeightydeg').removeClass('twoseventydeg');

    })

});



