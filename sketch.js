var img;
var clr=null;
var myColorPicker;
var canvas;

function preload() {
  img = loadImage("assets/woman_in_red.jpg");
}

function color_distance(a, r, g, b) {
  var rr = (a[0] + r)/2;
  var dr = a[0] - r;
  var dg = a[1] - g;
  var db = a[2] - b;

  return sqrt(dr * dr + dg * dg + db * db);
}

function get_min_distance(r, g, b) {
  var min_distance = color_distance(clr[0], r, g, b);
  var set_to_color = 0;
  var current_distance;

  for (var i = 1; i < clr.length; i++) {
    current_distance = color_distance(clr[i], r, g, b);
    if (current_distance < min_distance) {
      min_distance = current_distance;
      set_to_color = i;
    }
  }

  return set_to_color;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var a = [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    return a
}

function setup() {
  canvas = createCanvas(img.width, img.height*2);

  myColorPicker = document.getElementById('colorPicker');

  myColorPicker.addEventListener("change",function(){
    console.log("1");
    clr[0] = hexToRgb(colorPicker.value)
    console.log(clr[0]);
    show_image();
    })

  myColorPicker2 = document.getElementById('colorPicker2');
  myColorPicker2.addEventListener("change",function(){
    console.log("2");
    clr[1] = hexToRgb(colorPicker2.value)
    console.log(clr[1]);
    show_image();
    })

  myColorPicker3 = document.getElementById('colorPicker3');
  myColorPicker3.addEventListener("change",function(){
    console.log("3");
    clr[2] = hexToRgb(colorPicker3.value)
    console.log(clr[2]);
    show_image();
    })

  myColorPicker4 = document.getElementById('colorPicker4');
  myColorPicker4.addEventListener("change",function(){
    console.log("4");
    clr[3] = hexToRgb(colorPicker4.value)
    console.log(clr[3]);
    show_image();
    })

  myColorPicker5 = document.getElementById('colorPicker5');
  myColorPicker5.addEventListener("change",function(){
    console.log("5");
    console.log(colorPicker5.value);
    clr[4] = hexToRgb(colorPicker5.value)
    console.log(clr[4]);
    show_image();
    })

  canvas.drop(gotFile);

  noLoop();

  var a = [205, 167, 20];
  var b = [77, 86, 59];
  var c = [42, 106, 105];
  var d = [165, 89, 20];
  var e = [146, 150, 127];

  clr = [
    a,
    b,
    c,
    d,
    e
  ];

  show_image();
}

function gotFile(file) {
  // debugger;
  
  if (file.type === 'image') {
    // Create an image DOM element but don't show it
    img =  createImg(file.data, "test", processFile).hide();
    // img = createImg(file.data, "test", processFile)
    // Draw the image onto the canvas

  } else {
    console.log('Not an image file!');
  }
}

function processFile() {
  image(img, 0, 0);
  show_image();
}

// function display_image(){
//   console.log(img.width, img.height);
//   image(img, 0, 0);
//   console.log(img.width, img.height);
// }

function show_image(){
  console.log(img.width, img.height);

  canvas = createCanvas(img.width, img.height*2);
  imageMode(CORNER);
  pixelDensity(1);
  background(255);
  image(img, 0, 0);
  // img.loadPixels();
  image(img, 0, 0);

  loadPixels();

  print(img.height*img.width);
  var offset = +img.height*img.width*4;

    for (var y = 0; y < img.height; y++) {
      // print(y);
      for (var x = 0; x < img.width; x++) {
        var index = (x + y * width)*4;
        var i = get_min_distance(pixels[index+0], pixels[index+1], pixels[index+2]);
        //
        // // print("hi" , i);
        pixels[offset+index+0] = clr[i][0];
        pixels[offset+index+1] = clr[i][1];
        pixels[offset+index+2] = clr[i][2];
        pixels[offset+index+3] = 255;
      }
    }

    print("ok");

   updatePixels();
}

// function draw() {
//
// }
