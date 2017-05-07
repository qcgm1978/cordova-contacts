// Take a photo and retrieve the image's file location:
const callCamera = function () {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
    });
};

function onSuccess(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
    alert(imageURI)
}

function onFail(message) {
    alert('Failed because: ' + message);
}