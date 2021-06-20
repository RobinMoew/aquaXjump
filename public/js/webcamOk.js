$( function () {
    var count = 0;
    var shot = setInterval( function () {
        count++;
        $( '#textePhoto' ).html( count + '/5' );
        if ( count == 5 ) {
            clearInterval( shot );
            setTimeout( function () {
                window.location.href = `/`
            }, 5000 );
        }
        takeSnapshot();
        saveSnap();
    }, 3000 )

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

function saveSnap() {
    var base64image = $( "#imageprev" ).attr( 'src' );

    $.ajax( {
        url: '/upload',
        method: 'POST',
        data: {
            img: base64image
        },
    } );
}
