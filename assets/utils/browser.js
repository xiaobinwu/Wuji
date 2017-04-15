/*
 * 判断浏览器 工具
 */

var Browser = {
    isIE9: function() {
        return !window.atob;
    },
    isIE10: function() {
        return !document.__proto__;
    },
    isIE: function() {
        return !!window.ActiveXObject;
    },
    checkVideo: function() {
        if (!!document.createElement('video').canPlayType) {
            var vidTest = document.createElement("video");
            oggTest = vidTest.canPlayType('video/ogg; codecs="theora, vorbis"');
            if (!oggTest) {
                h264Test = vidTest.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
                if (!h264Test) {
                    return false;
                } else {
                    if (h264Test == "probably") {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                if (oggTest == "probably") {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }
}

module.exports = Browser;
