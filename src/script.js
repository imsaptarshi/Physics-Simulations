let sun
let planets
let G=7;

function generateRandomPlanets(){
  var n=random(3,6);
  const planets=[]
  for(var i=1;i<=n;i++){
    var r = random(sun.r+25, min(windowWidth/2,windowHeight/2));
    let theta = random(TWO_PI)
    let randomPos=createVector(r*cos(theta),r*sin(theta))
    var pl=new Planet(25,randomPos,createVector(random(0.5,1),random(0.5,1)),255)
    planets.push(pl);
  }
  return planets;
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  sun=new Planet(100, createVector(0,0),createVector(0,0),"#FFFF00")
  planets=generateRandomPlanets();
}

function draw(){
  translate(width/2,height/2)
  background("#000")
  sun.show();
  planets.forEach(planet=>{
    sun.attract(planet);
    planet.show();
    planet.update();
  })

}

function Planet(_mass,_pos,_vel,_color){

    this.mass=_mass;
    this.pos=_pos;
    this.vel=_vel;
    this.r=this.mass;
    this.color=_color;

  this.show=function(){
    noStroke();
    fill(this.color);
    ellipse(this.pos.x,this.pos.y,this.r,this.r)
  }

  this.update=function(){
    this.pos.x+=this.vel.x;
    this.pos.y+=this.vel.y;
  }

  this.attract=function(child){
    let r=dist(this.pos.x,this.pos.y,child.pos.x,child.pos.y)
    //newton's law of gravity
    let F=createVector(this.pos.x-child.pos.x,this.pos.y-child.pos.y);
    //let F=this.pos.copy().sub(child.pos);
    F.setMag((G*this.mass*child.mass)/(r*r))
    child.applyForce(F);
  }

  this.applyForce=function(F){
    this.vel.x+=F.x/this.mass;
    this.vel.y+=F.y/this.mass;
  }
}
