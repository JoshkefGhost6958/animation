const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
let adjustX = 20;
let adjustY = 0;

//handle mouse interaction

const mouse = {
  x:null,
  y:null,
  radius: 150
}

window.addEventListener("mousemove",(event)=>{
  mouse.x = event.x;
  mouse.y = event.y;
})

ctx.fillStyle = "white";
ctx.font = "20px verdana";
ctx.fillText("KEFASON",0,30);
//ctx.strokeStyle = "white";
//ctx.strokeRect(0,0,100,100);
const textCoordinate = ctx.getImageData(0,0,100,100);

class Particle{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = 3
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = (Math.random() * 500) + 5;
  }
  draw(x,y){
    let radius = 0;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,radius,Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update(){
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.hypot(dy,dx);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance)/maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;
    if(distance < 300){
      this.x -= directionX;
      this.y -= directionY;
    }else{
      if(this.x !== this.baseX){
        let dx = this.x - this.baseX;
        this.x -= dx/10;
      };
      if(this.y !== this.baseY){
        let dy = this.y - this.baseY;
        this.y -= dy/10;
      };
    }
  }
}

function init(){
  particleArray = [];
  for(let y = 0,y2 = textCoordinate.height;y < y2;y++){
    for(let x = 0,x2 = textCoordinate.width;x < x2;x++){
      if(textCoordinate.data[(y *  4 * textCoordinate.width) + (x * 4) + 3 ] > 128){
        let positionX  = x + adjustX;
        let positionY = y + adjustY;
        particleArray.push(new Particle(positionX * 10,positionY * 10));
      }
    }
  }
  /*for(let i = 0;i < 1000;i++){
    let x = Math.random() * 500;
    let y = Math.random() * 500;  
    particleArray.push(new Particle(x,y));
  }
  */
  //particleArray.push(new Particle(50,50));
  //particleArray.push(new Particle(80,90));
}
init();

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let i = 0;i < particleArray.length;i++){
    particleArray[i].draw();
    particleArray[i].update();
  }
  connect();
  requestAnimationFrame(animate);
}
animate();

function connect(){
  for(let a = 0;a < particleArray.length;a++){
    for(let b = a;b < particleArray.length;b++ ){
      let dx = particleArray[a].x - particleArray[b].x;
      let dy = particleArray[a].y - particleArray[b].y;
      let distance = Math.hypot(dy,dx);
      if ( distance < 10){
        ctx.fillStyle = "white";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(particleArray[a].x,particleArray[a].y);
        ctx.lineTo(particleArray[b].x,particleArray[b].y);
        ctx.stroke()

      }
    }
  }
}
console.log(particleArray);