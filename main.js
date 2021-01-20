let c = document.getElementById("wheel");
let ctx = c.getContext("2d");

let arr = [];

//init
ctx.beginPath();
ctx.arc(250, 250, 230, 0, 2 * Math.PI);
ctx.closePath();
ctx.fillStyle = "#000";
ctx.fill();
ctx.beginPath();
ctx.arc(250, 250, 20, 0, 2 * Math.PI);
ctx.closePath();
ctx.fillStyle = "white";
ctx.fill();

ctx.beginPath();
ctx.moveTo(0, 220);
ctx.lineTo(0, 240);
ctx.lineTo(40, 235);
ctx.fillStyle = "white";
ctx.fill();

//the wheel
let deg = 0;
function drawText(text) {
  ctx.save();
  ctx.translate(250, 250);
  ctx.rotate((deg * Math.PI) / 180);
  ctx.textAlign = "right";
  ctx.fillStyle = "#000";
  ctx.font = "bold 14px Arial";
  ctx.fillText(text, 200, 10);
  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, c.width, c.height);

  const pieAngle = (2 * Math.PI) / arr.length;
  for (let i = 0; i < arr.length; i++) {
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 230, i * pieAngle, (i + 1) * pieAngle, false);
    ctx.lineWidth = 2;
    ctx.fillStyle = arr[i].color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000";
    ctx.stroke();

    drawText(arr[i].text);
    deg += 360 / arr.length;
  }

  //center of the wheel
  ctx.beginPath();
  ctx.arc(250, 250, 20, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fillStyle = "white";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(0, 220);
  ctx.lineTo(0, 240);
  ctx.lineTo(40, 235);
  ctx.fillStyle = "white";
  ctx.fill();
}

function rotateCir() {
  const rand = Math.floor(Math.random() * arr.length);
  const winner = arr[rand];
  const winnerIndex = Math.floor(arr.length / 2);
  console.log("winner:", rand, winner);
  let count = 5 * arr.length;

  let i = 0;
  time = 50;
  let inter = setInterval(() => {
    if (i >= count - 2 && arr[winnerIndex - 1].color === winner.color) {
      started = false;
      document.querySelector(".color").style.backgroundColor = winner.color;
      document.querySelector(".winner p").innerText = winner.text;
      document.querySelector(".winner").style.display = "block";
      clearInterval(inter);
    }

    if (
      (i == arr.length / 2 && time >= 150) ||
      (i < arr.length / 2 && time >= 150)
    ) {
      time = 150;
    } else if (time >= 20) {
      time -= 5;
    }
    let x = arr.pop();
    arr.unshift(x);

    draw();
    i++;
  }, time);
}

const input = document.querySelector("textarea");
input.addEventListener("input", () => {
  arr = [];
  input.value
    .trim()
    .split("\n")
    .map((x, i) => {
      if (x.trim() != "") {
        arr.push({
          text: x,
          color: "hsl(" + i * 35 + ",70%, 60%)",
        });
      }
    });
  deg = 360 / arr.length / 2;
  draw();
});

let started = false;
c.addEventListener("click", () => {
  if (!started) {
    started = true;
    rotateCir();
  }
});
