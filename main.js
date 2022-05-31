Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "' + data_uri + '"/> ';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/QibExlwZv/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded');
}

function check() {
    img =  document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error,results) {
    if (error) {
        console.error(error);
    }

    else {
        console.log(results);

        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction1 = results[0].label;

        toSpeak = "";

        if(prediction1 == "Okay") {
            toSpeak = "This is looking okay.";
            document.getElementById("update_gesture").innerHTML = "&#128076;";
        }

        else if(prediction1 == "Thumbs Up") {
            toSpeak = "All the best!";
            document.getElementById("update_gesture").innerHTML = "&#128077;"; 
        }  
        
        else if(prediction1 == "Fist") {
            toSpeak = "Awesome!";
            document.getElementById("update_gesture").innerHTML = "&#9994;";
        }

        else if(prediction1 == "Two Fingers") {
            toSpeak = "Amazing work!";
            document.getElementById("update_gesture").innerHTML = "&#9996;";
        }
        
        else if(prediction1 == "Hand") {
            toSpeak = "Good job!";
            document.getElementById("update_gesture").innerHTML = "&#9995;";
        }

        speak();
    }
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = toSpeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}