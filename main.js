song="";
rightwristx=0;
rightwristx=0;
leftwristy=0;
leftwristy=0;
scoreleftwrist=0;
scorerightwrist=0;
function preload()
{
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded)
    poseNet.on('pose',gotposes);
}
function modelLoaded()
{
  console.log('Posenet Is Initialized')
}
function gotposes(results)
{
  if(results.length>0)
  {
    console.log(results);
    scoreleftwrist=results[0].pose.keypoints[9].score;
    scorerightwrist=results[0].pose.keypoints[10].score;
    leftwristx=results[0].pose.leftWrist.x;
    leftwristy=results[0].pose.leftWrist.y;
    rightwristx=results[0].pose.rightWrist.x;
    rightwristy=results[0].pose.rightWrist.y;
  }
}
function draw()
{
image(video,0,0,600,500);
fill("#FF0000");
stroke("#FF0000");
if(scoreleftwrist >0.2)
{
  circle(leftwristx,leftwristy,20);
  nlw=Number(leftwristy)
  rd=floor(nlw);
  v=rd/500;
  document.getElementById("volume").innerHTML="volume="+ v;
  song1.setVolume(v);
}

if(scorerightwrist >0.2)
{
  circle(rightwristx,rightwristy,20);
  nlw1=Number(rightwristy)
  rd1=floor(nlw1);
  v1=rd1/500;
  document.getElementById("volume").innerHTML="volume="+ v1;
  song2.setVolume(v1);
}
}
function play()
{
  song.play();
  song.setVolume(1);
  song.rate(1);

}