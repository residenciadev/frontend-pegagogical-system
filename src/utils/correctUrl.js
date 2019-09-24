const correctUrl = url =>
  url.substring(0, url.indexOf('?dl=0')).concat('?dl=1');

export default correctUrl;
