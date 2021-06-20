$( function () {
    let backHomeTimeout = () => {
        let backHomeTimeout = setTimeout( function () {
            window.location.href = `/`;
            window.clearTimeout( backHomeTimeout );
        }, config.backHomeTimer );
    }
    backHomeTimeout();
} )
