var config = {
    'backHomeTimer': 10000,
}

$( function () {
    startTime();
} );

function startTime() {
    var today = new Date();
    var d = today.getDate();
    var mo = today.getMonth();
    var y = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    d = checkTime( d );
    mo = checkTime( mo );
    h = checkTime( h );
    m = checkTime( m );
    s = checkTime( s );
    $( '#date' ).html( d + '/' + mo + '/' + y + ' ' + h + ':' + m + ':' + s );
    var t = setTimeout( startTime, 1000 );
}

function checkTime( i ) {
    if ( i < 10 ) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}

// locale
var locale = $( '#locale' ).html();

// toggle sexe
$( '#male_Unchecked' ).click( function () {
    $( this ).addClass( 'undisplayed' );
    $( '#male_Checked' ).removeClass( 'undisplayed' );
    $( '#female_Checked' ).addClass( 'undisplayed' );
    $( '#female_Unchecked' ).removeClass( 'undisplayed' );
} );
$( '#male_Checked' ).click( function () {
    $( this ).addClass( 'undisplayed' );
    $( '#male_Unchecked' ).removeClass( 'undisplayed' );
} );
$( '#female_Unchecked' ).click( function () {
    $( this ).addClass( 'undisplayed' );
    $( '#female_Checked' ).removeClass( 'undisplayed' );
    $( '#male_Checked' ).addClass( 'undisplayed' );
    $( '#male_Unchecked' ).removeClass( 'undisplayed' );
} );
$( '#female_Checked' ).click( function () {
    $( this ).addClass( 'undisplayed' );
    $( '#female_Unchecked' ).removeClass( 'undisplayed' );
} );

// age
var upTimeout, up = $( '#up' );
var downTimeout, down = $( '#down' );
var age = $( '#age' ).html();

// up.click( function () {
//     age++;
//     $( '#age' ).html( age );
// } );
// down.click( function () {
//     if ( age > 16 ) age--;
//     $( '#age' ).html( age );
// } );

// up.mousedown( function () {
//     upTimeout = setInterval( function () {
//         age++;
//         $( '#age' ).html( age );
//     }, 100 );
// } );
// down.mousedown( function () {
//     downTimeout = setInterval( function () {
//         if ( age > 16 ) $( '#age' ).html( age-- );
//     }, 100 );
// } );

// $( document ).mouseup( function () {
//     clearInterval( upTimeout );
//     clearInterval( downTimeout );
// } );

$( '#versCertif' ).click( function () {
    let input = [];
    $( '.nom' ).each( function () {
        if ( $( this ).val() != "" ) input.push( $( this ).val() );
        else {
            $( this ).css( {
                'border': 'solid 1px red'
            } );
        }

    } )
    let sexe = $( '.active' ).not( '.undisplayed' );
    if ( sexe.length == 1 )
        input.push( sexe.attr( 'id' ).split( '_' )[ 0 ] );
    let age = $( '#age' ).val();
    if ( age < 16 ) {
        $( '#age' ).val( '' );
    } else input.push( age );
    if ( input.length == 4 ) {
        $.ajax( {
            url: '/getDonneesUtilisateur',
            method: 'POST',
            data: {
                input: input
            },
            success: ( data ) => {
                if ( data == 0 ) {
                    window.location.href = `/${ locale }/certif`;
                }
            }
        } )
    } else {
        $( '#error' ).css( {
            'visibility': 'visible',
            'opacity': 1
        } );
        setTimeout( function () {
            $( '#error' ).css( {
                'visibility': 'hidden',
                'opacity': 0
            } );
        }, 5000 );
    };
} );

$( '.greenCheck' ).click( function () {
    $( this ).addClass( 'undisplayed' );
    $( this ).next().removeClass( 'undisplayed' );
    $( $( this ).siblings()[ 3 ] ).addClass( 'undisplayed' );
    $( $( this ).siblings()[ 2 ] ).removeClass( 'undisplayed' );
} )

$( '.unChecked' ).click( function () {
    $( this ).addClass( 'undisplayed' );
    $( this ).next().removeClass( 'undisplayed' );
    $( $( this ).siblings()[ 1 ] ).addClass( 'undisplayed' );
    $( $( this ).siblings()[ 0 ] ).removeClass( 'undisplayed' );
} )

$( '#versDeclare' ).click( function () {
    if ( $( '.active' ).not( '.undisplayed' ).length == 8 ) {
        $.ajax( {
            url: `/${ locale }/declaration`,
            success: () => {
                window.location.href = `/${ locale }/declaration`;
            }
        } )
    } else {
        window.location.href = `/${ locale }/nOk`;
    };
} );

$( '#versOk' ).click( function () {
    if ( $( '.active' ).not( '.undisplayed' ).length == 1 ) {
        window.location.href = `/${ locale }/ok`;
    } else {
        window.location.href = `/${ locale }/nOk`;
    };
} );

$( '#securite' ).click( function () {
    $( '#securitePDF' ).removeClass( 'undisplayed' );
    $( '#fermer' ).css( 'display', 'block' );
    $( '#accepte>.unactive' ).addClass( 'declarationCheck' ).removeClass( 'unactive' );
    $( '#accepte>.declarationCheck' ).bind( "click", function () {
        $( this ).addClass( 'undisplayed' );
        $( this ).siblings().removeClass( 'undisplayed' );
    } );
} );

$( '#fermer' ).click( function () {
    $( '#securitePDF' ).addClass( 'undisplayed' );
    $( '#donneePDF' ).addClass( 'undisplayed' );
    $( '#fermer' ).css( 'display', 'none' );
} )

$( '#deso' ).click( function () {
    window.location.href = `/`;
} );

$( '.keyboard' ).keyboard( {
    layout: 'custom',
    position: {
        // null = attach to input/textarea;
        // use $(sel) to attach elsewhere
        of: null,
        my: 'center top',
        at: 'center top',
        // used when "usePreview" is false
        at2: 'center bottom'
    },
    reposition: true,
    usePreview: false,
    autoAccept: true,
    keyBinding: 'mousedown touchstart',
    customLayout: {
        'normal': [ 'q w e r t y u i o p', 'a s d f g h j k l', 'z x c v b n m', '{s} {b} {a}' ],
        'shift': [ 'Q W E R T Y U I O P', 'A S D F G H J K L', 'Z X C V B N M', '{s} {b} {a}' ],
    }
} );

$( '.keypad' ).keyboard( {
    layout: 'custom',
    position: {
        // null = attach to input/textarea;
        // use $(sel) to attach elsewhere
        of: null,
        my: 'center top',
        at: 'center top',
        // used when "usePreview" is false
        at2: 'center bottom'
    },
    reposition: true,
    usePreview: false,
    autoAccept: true,
    keyBinding: 'mousedown touchstart',
    maxLength: 2,
    customLayout: {
        'default': [
            '7 8 9',
            '4 5 6',
            '1 2 3',
            '{b} 0 {a}'
        ]
    },
} );
