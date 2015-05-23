var set = function(settings){
    try{
        localStorage.setItem('settings', JSON.stringify(settings));
    } catch(e){
        console.error('localStorage not available in this browser.');
    }
};

var get = function(cb){
    try{
        cb(null, JSON.parse(localStorage.getItem('settings')));
    } catch(e){
        cb(e);
    }
};

module.exports = {
    set: set,
    get: get
};
