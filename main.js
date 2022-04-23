Webcam.attach('#camera');

camera = document.getElementById("camera");

Webcam.set ({

    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90

});

function take_snapshot() {

    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });

}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Mzx4ID4rC/model.json',modelLoaded);

function modelLoaded() {

    console.log("model loaded");
    
}

function check() {

    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);

}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("person_span").innerHTML = results[0].label;
        document.getElementById("accuracy_span").innerHTML = results[0].confidence.toFixed(3);
    }
}