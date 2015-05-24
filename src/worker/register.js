if (navigator.serviceWorker) {
    var opts = {
        scope: window.location.pathname
    };
    navigator.serviceWorker.register('./worker.js', opts)
        .then(function(reg) {
            console.log('Registered service worker, congrats!');
        }, function(err) {
            console.log('Service worker failure.', err);
        });
}
