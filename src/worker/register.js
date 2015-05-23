if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/worker.js').then(function(reg) {
        console.log('Registered service worker, congrats!');
    }, function(err) {
        console.log('Service worker failure.', err);
    });
}
