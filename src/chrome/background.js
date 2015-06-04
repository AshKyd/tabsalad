chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    id: 'tabsalad'+chrome.app.window.getAll().length,
    minWidth: 600,
    minHeight:350
  });
});
