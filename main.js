prediction_1 = "";
prediction_2 = "";

Webcam.set ({
    width:350,
    height:300,
    img_format:'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id = "captured_img" src ="'+data_uri+'"/>';
    });
    
}
console.log('ml5 version',ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/lyqSsejrb/model.json',modelLoaded);

function modelLoaded() {
    console.log('model loaded');
}
function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "First prediction is"+prediction_1;
    var utterthis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterthis);
}
function check() {
    img = document.getElementById('captured_img');
    classifier.classify(img, gotResult);
}

function gotResult(error,results) {
    if(error) {
        console.error(error);
    }
    else{
        console.log(results);
    }
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    prediction_1 = results[0].label;
    speak();
    if(results[0].label == "victory"){
        document.getElementById("update_emoji").innerHTML = "&#9996";

    }
    if(results[0].label == "amazing"){
        document.getElementById("update_emoji").innerHTML = "&#128076";
        
    }
    if(results[0].label == "best"){
        document.getElementById("update_emoji").innerHTML = "&#128077";
        
    }


    if(results[1].label == "victory"){
        document.getElementById("update_emoji2").innerHTML = "&#9996";

    }
    if(results[1].label == "best"){
        document.getElementById("update_emoji2").innerHTML = "&#128077";
        
    }
    if(results[1].label == "amazing"){
        document.getElementById("update_emoji2").innerHTML = "&#128076";
        
    }

}