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

up.click( function () {
    age++;
    $( '#age' ).html( age );
} );
down.click( function () {
    if ( age > 16 ) age--;
    $( '#age' ).html( age );
} );

up.mousedown( function () {
    upTimeout = setInterval( function () {
        age++;
        $( '#age' ).html( age );
    }, 100 );
} );
down.mousedown( function () {
    downTimeout = setInterval( function () {
        if ( age > 16 ) $( '#age' ).html( age-- );
    }, 100 );
} );

$( document ).mouseup( function () {
    clearInterval( upTimeout );
    clearInterval( downTimeout );
} );

$( '#versCertif' ).click( function () {
    let input = [];
    $( 'input' ).each( function () {
        if ( $( this ).val() != "" ) input.push( $( this ).val() );
    } )
    let sexe = $( '.active' ).not( '.undisplayed' );
    if ( sexe.length > 0 )
        input.push( sexe.attr( 'id' ).split( '_' )[ 0 ] );
    let age = $( '#age' ).text();
    input.push( age );
    if ( input.length == 4 ) {
        // localStorage.setItem( 'personne', input );
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
    } else alert( 'Champs manquants' );
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
            success: ( data ) => {
                window.location.href = `/${ locale }/declaration`;
            }
        } )
    } else {
        window.location.href = `/${ locale }/nOk`;
    };
} );

$( '.declarationCheck' ).click( function () {
    $( this ).addClass( 'undisplayed' );
    $( this ).siblings().removeClass( 'undisplayed' );
} )

$( '#versOk' ).click( function () {
    if ( $( '.active' ).not( '.undisplayed' ).length == 1 ) {
        window.location.href = `/${ locale }/ok`;
    } else {
        window.location.href = `/${ locale }/nOk`;
    };
} );
