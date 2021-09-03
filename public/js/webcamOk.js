var count = 0;
$( function () {
  Webcam.set( {
    // live preview size
    width: 320,
    height: 240,

    // device capture size
    dest_width: 640,
    dest_height: 480,

    // final cropped size
    crop_width: 240,
    crop_height: 240,

    // format and quality
    image_format: 'jpeg',
    jpeg_quality: 90
  } );
  Webcam.attach( '#cam' );
  setTimeout( function () {
    var shot = setInterval( function () {
      count++;
      // $( '#textePhoto' ).html( count + '/5' );
      takeSnapshot();
      saveSnap();
      if ( count == 5 ) {
        upload();
        clearInterval( shot );
        setTimeout( function () {
          window.location.href = `/${ locale }/bravo`;
        }, 7000 );
      }
    }, 1000 )
  }, 7000 )
} );

function takeSnapshot() {
  $( '#result' ).html( `<span id="countImg">${count}</span>` );
  // Webcam.snap( function ( data_uri ) {
  //   $( '#result' ).html( '<img id="imageprev" src="' + data_uri + '"/>' );
  // } );
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
    }
  } );
}
