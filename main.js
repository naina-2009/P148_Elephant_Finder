objects = [];
alarm = "";
img = "";
status = "";

function preload()
{
    alarm = loadSound("alert.mp3");
    img = loadImage("elephant.png");
}

function setup()
{
    canvas = createCanvas(350,350);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Searching Elephant(s)";
}

function modelLoaded()
{
    console.log("Model is successfully Loaded!");
    status = true;
}

function gotResults(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(img, 0,0,350,350);
    if(status != "")
    {
        objectDetector.detect(img, gotResults);
        for(i=0; i<objects.length; i++)
        {
            for(i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Elephant Found!";
            fill("#000000");
            text(objects[i].label, objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#000000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "elephant")
            {
                document.getElementById("status").innerHTML = "Elephant Found";
                alarm.start();
            }
            else 
            {
                document.getElementById("status").innerHTML = "No Elephants, happy farming!";
                alarm.stop();
            }
        }
    }
}
}