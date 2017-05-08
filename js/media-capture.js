const communicateMedia = function () {
    var captureSuccess = function (mediaFiles) {
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            // do something interesting with the file
        }
        console.log('media data: ', mediaFiles, path)
    };
// capture error callback
    var captureError = function (error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };
// start audio capture
    navigator.device.capture.captureAudio(captureSuccess, captureError, {limit: 2});
};
