const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const sharp = require("sharp");
const cors = require("cors");
const port = 3120; 

app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use(express.static('public'));

process.env.TZ = "Africa/Lagos";
const now = new Date(new Date().toLocaleString());
console.log("Date: ", now);
const imageBase64 = require("./img_base");

function dateDiff(get_item)
{
  var currentDate = new Date()
  let confDate = new Date(2024, 10, 7);
  
  var Difference_In_Time = confDate.getTime() - currentDate.getTime();
  switch (get_item) {
      case 'month':
          return Math.round(Difference_In_Time / (1000 * 3600 * 24 * 30));
      case 'day':
          return Math.round(Difference_In_Time / (1000 * 3600 * 24));
      case 'hour':
          return Math.round(Difference_In_Time / (1000 * 3600));
      case 'minute':
          return Math.round(Difference_In_Time / (1000 * 60));
      case 'second':
          return Math.round(Difference_In_Time / 1000);    
      default:
          break;
  }
}

async function addTextOnImage(imageBase64) {
 try {
  const todayDate = new Date() // today
  const currentDateIStr = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`;
  console.log(currentDateIStr);
  const currentDate = new Date(`${currentDateIStr}T00:00:01`);
  console.log(currentDate);
  //console.log(`${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`);
  const secondDate = new Date("2024-11-07T00:00:01") // 7th Nov, 2024
  console.log(secondDate);
  const millisecondsDiff = secondDate.getTime() - currentDate.getTime()

  const daysDiff = Math.round(
    millisecondsDiff / (24 * 60 * 60 * 1000)
  )

  //const daysDiff = dateDiff('day')

  //console.log(daysDiff);

  const svgImage = `
    <svg width="100%" height="100%" viewBox="0 0 3334 3334" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(5.55556,0,0,5.55556,0,0)">
        <use id="Background" xlink:href="#_Image1" x="0" y="0" width="600px" height="600px"/>
        <g transform="matrix(1.20548,0,0,1.20548,-28.9937,-57.5784)">
            <text x="124.181px" y="278.219px" style="font-family:'MicrogrammaD-BoldExte', 'Microgramma D';font-weight:700;font-size:30.358px;fill:white;">${daysDiff}</text>
        </g>
    </g>
    <defs>
      ${imageBase64}
    </defs>
</svg>
    `;
   const svgBuffer = Buffer.from(svgImage);
   await sharp(svgBuffer).toFile('public/svg-image.png');
   //const bufferImage = await sharp(svgBuffer).toBuffer();
   //Buffer.from("Hello World").toString('base64')
   //const base64Image = Buffer.from(bufferImage).toString('base64');
   return {daysToGo: daysDiff};
 } catch (error) {
  console.error(error);
   return {daysToGo: null};
 }
}

app.get("/hello", imageBase64, async (req, res) => {
  console.log("Hello...");
  try {
    const resp = await addTextOnImage(imageBase64);
    console.log(resp);
    if(resp.daysToGo != null) {
      var msgDday;
      if(resp.daysToGo > 1) {
        msgDday = `Destiny International Conference 2024 is ${resp.daysToGo} Days To Go`;
      } else {
        msgDday = `Destiny International Conference 2024 is ${resp.daysToGo} Days To Go`;
      }
        
      const respData = { daysToGo:  msgDday };
      res.end(JSON.stringify(respData));
    } else {
      const respData = { daysToGo: null };
      res.end(JSON.stringify(respData));
    }
    
  } catch (error) {
    const respData = { daysToGo: null };
    res.end(JSON.stringify(respData));
  }
  
});

app.get("/", async (req, res) => {
  res.end("DIC Countdown DP - It works");
});

server.listen(port, async () => {
  console.log(`DIC Countdown DP Server is listening on port ${port}!`);
});