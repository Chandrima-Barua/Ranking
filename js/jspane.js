// $("#des_" + load_array[i]['id']).jScrollPane().bind(
    $(".descrip").jScrollPane().bind(
    'mousewheel',
    function (e) {
        e.preventDefault();
    }
);

// api = $("#des_" + load_array[i]['id']).data('jsp');
api =  $(".descrip").data('jsp');
var throttleTimeout;
// $(window).bind('resize', function () {
        if (!throttleTimeout) {
            throttleTimeout = setTimeout(
                function () {
                    api.reinitialise();
                    throttleTimeout = null;
                },
                50
            );
        }
//     }
// );