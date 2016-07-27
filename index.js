/**
 * @module Browser
 * @author lzhengms <lzhengms@gmail.com>
 */

'use strict';

export default (function(navigator) {

  var userAgent = navigator.userAgent,
    temp,
    match = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [],
    match2 = userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|IEMobile/);

  if (/trident/i.test(match[1])) {
    temp = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
    return {
      browser: 'IE',
      version: temp[1] || ''
    };
  }

  if (match[1] === 'Chrome') {
    temp = userAgent.match(/\bOPR\/(\d+)/);

    if (temp !== null) {
      return {
        browser: 'Opera',
        version: temp[1] || ''
      };
    }
  }

  match = match[2] ? [match[1], match[2]] : [navigator.appName, navigator.appVersion, '-?'];

  if ((temp = userAgent.match(/version\/(\d+)/i)) !== null) {
    match.splice(1, 1, temp[1]);
  }

  return {
    browser: match[0] === 'MSIE' ? 'IE' : match[0],
    version: match[1],
    mobile: match2 && match2[0]
  };

})(navigator);
