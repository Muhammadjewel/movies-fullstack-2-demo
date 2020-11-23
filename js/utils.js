var $_ = function (selector, node = document) {
  return node.querySelector(selector);
};

var $$_ = function (selector, node = document) {
  return node.querySelectorAll(selector);
};

var createElement = function (tagName, className, text) {
  var element = document.createElement(tagName);
  element.setAttribute('class', className);

  if (text) {
    element.textContent = text;
  }

  return element;
};

var getYoutubeVideoLink = function (videoId) {
  return `https://youtube.com/watch?v=${videoId}`;
};

var getYoutubeVideoBigThumbnail = function (videoId) {
  return `http://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
};

var getYoutubeVideoThumbnail = function (videoId) {
  return `http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`;
};
