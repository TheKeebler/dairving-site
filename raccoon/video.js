(function () {
  var loading = document.querySelector('.loading');
  function hide() { loading.style.display = 'none'; }
  document.querySelector('iframe').addEventListener('load', hide);
  // The video can finish loading before this script runs, so hide the label after a short wait either way.
  setTimeout(hide, 2500);
})();
