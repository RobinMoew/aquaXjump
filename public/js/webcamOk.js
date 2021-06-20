$( function () {
    var count = 0;
    var shot = setInterval( function () {
        count++;
        $( '#textePhoto' ).html( count + '/5' );
        takeSnapshot();
        saveSnap();
        if ( count == 5 ) {
            upload();
            clearInterval( shot );
            setTimeout( function () {
                window.location.href = `/`
            }, 5000 );
        }
    }, 1000 )

    Webcam.set( {
        width: 320,
        height: 240,
        image_format: 'jpeg',
        jpeg_quality: 90
    } );
    Webcam.attach( '#cam' );
} );

function takeSnapshot() {
    Webcam.snap( function ( data_uri ) {
        $( '#result' ).html( '<img id="imageprev" src="' + data_uri + '"/>' );
    } );
}

var imgs = [];

function saveSnap() {
    var base64image = $( "#imageprev" ).attr( 'src' );
    imgs.push( base64image );
}

function upload() {
    $.ajax( {
        url: '/upload',
        method: 'POST',
        data: {
            imgs: imgs
        },
    } );
}
