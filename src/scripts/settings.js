export const set = function (settings) {
  try {
    localStorage.setItem("settings", JSON.stringify(settings));
  } catch (e) {
    console.error("localStorage not available in this browser.");
  }
};

export const get = function (cb) {
  try {
    cb(null, JSON.parse(localStorage.getItem("settings")));
  } catch (e) {
    cb(e);
  }
};
