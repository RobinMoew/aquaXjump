$( function () {
  Webcam.set( {
    // live preview size
    width: 320,
    height: 240,

    // device capture size
    dest_width: 320,
    dest_height: 240,

    // final cropped size
    crop_width: 240,
    crop_height: 240,

    // format and quality
    image_format: 'jpeg',
    jpeg_quality: 90
  } );
  Webcam.attach( '#cam' );
  setTimeout( function () {
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
          window.location.href = `/${ locale }/bravo`;
        }, 5000 );
      }
    }, 1000 )
  }, 5000 )
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
  let idP = $( '#idP' ).text();
  $.ajax( {
    url: '/upload',
    method: 'POST',
    data: {
      imgs: imgs,
      idP: idP
    },
  } );
}
