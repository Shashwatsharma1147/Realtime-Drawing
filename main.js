noseX = 0;
noseY = 0;
difference = 0;
leftWristX = 0;
rightWristX = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(400, 400);
    canvas.position(700, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', getPoses);
}

function getPoses(result){
    if(result.length > 0){
        console.log(result);
        noseX = result[0].pose.nose.x;
        noseY = result[0].pose.nose.y;
        console.log("noseX = "+noseX+" noseY = "+noseY);

        leftWristX = result[0].pose.leftWrist.x;
        rightWristX = result[0].pose.rightWrist.x;
        console.log("leftWristX = "+leftWristX+" rightWristX = "+rightWristX);
        difference = floor(leftWristX - rightWristX);
        
    }
    else{
        console.log("error");
    }
}

function modelLoaded(){
    console.log("Model is initialised");
}

function draw(){
    background(0, 157, 255);
    fill("black");
    stroke("crimson");
    square(noseX, noseY, difference);
    document.getElementById("squareSize").innerHTML = "Width and Height of the square will be: "+difference+"px";
}