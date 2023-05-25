let points = [[-2, 0], [-1,-1], [0, -1],[1,0],[1,2],[0,3],[-1,3],[-2,2],[-3,2],[-4,1],[-4,-2],[-5,-4],[-4,-4],[-3,-2],[-2,-1],[-2,-3], [-2,-4], [-1, -4],[0,-4],[0,-2],[2,-2],[2,-4], [4, -4],[4,1],[3,2],[1,2],[1,2]]; //list資料，
var fill_colors = "006d77-83c5be-edf6f9-ffddd2-e29578".split("-").map(a=>"#"+a)
var line_colors = "ffd6ff-e7c6ff-c8b6ff-b8c0ff-bbd0ff".split("-").map(a=>"#"+a)

//------畫points所有"點"的物件變數---------
var ball  //目前要處理的物件，暫時放在ball變數內
var balls =[]  //把產生的"所有"的物件，為物件的倉庫，所有的物件資料都在此
//-------飛彈物件定義--------
var bullet //
var bullets = []
//-------怪物物件定義--------
var monster 
var monsters = []
//---------------
var shipP
//--------------------------------


var score = 0 //基礎分

function preload(){  //在程式碼執行前，比setup更早執行
  elephant_sound =  loadSound("sound/elephant.wav")
  bullet_sound = loadSound("sound/Launching wire.wav")
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP = createVector(width/2,height/2)
  for(var i=0;i<5;i=i+1){  //i=0,1,2,3,4,5,6,7,8,9
    ball = new obj({})  //產生一個obj class元件
    balls.push(ball)  //把ball物件放到balls陣列內
  }
  for(var i=0;i<10;i=i+1){  //i=0,1,2,3,4,5,6,7,8,9
    monster = new Monster({})  //產生一個Monster class元件
    monsters.push(monster)  //把ball物件放到balls陣列內
  }
}



function draw() {
  background("#d6ccc2");
  // for(var j=0;j<balls.length;j=j+1){
  //   ball = balls[j]
  //   ball.draw()
  //   ball.update()
  // }

  if(keyIsPressed){ //按鍵當下
    if(key=="ArrowLeft" || key =="a"){ //鍵盤左鍵
      shipP.x = shipP.x - 5
   }
   if(key=="ArrowRight"|| key =="d"){ //鍵盤右鍵
     shipP.x = shipP.x + 5
   }
   if(key=="ArrowUp"|| key =="w"){ //鍵盤上鍵
     shipP.y = shipP.y - 5
   }
   if(key=="ArrowDown"|| key =="s"){ //鍵盤下鍵
     shipP.y = shipP.y + 5
   }
 

  }
  for(let ball of balls) //只要是陣列的方式，都可以用此方法處裡
  {
    ball.draw()
    ball.update()
    for(let bullet of bullets){ //檢查每一個飛彈物件
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){  //飛彈物件有沒有接觸現在的ball
      balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball))
      bullets.splice(bullets.indexOf(bullet),1)
      score = score-1
      elephant_sound.play()
      }
    }
  }
//----------飛彈顯示----------
  for(let bullet of bullets) //只要是陣列的方式，都可以用此方法處裡
  {
    bullet.draw()
    bullet.update()
  }
  //----------怪物顯示----------
  for(let monster of monsters) //只要是陣列的方式，都可以用此方法處裡
  {
    if(monster.dead == true && monster.timenum==4){
      monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()
    for(let bullet of bullets){ //檢查每一個飛彈物件
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){  //飛彈物件有沒有接觸現在的ball
      // monsters.splice(monsters.indexOf(monster),1) //從倉庫monter取出被滑鼠按到的物件編號(balls.indexOf(ball))
      bullets.splice(bullets.indexOf(bullet),1)
      score = score+1
      monster.dead = true 
      }
    }
  }

  textSize(50)
  text(score,50,50) //在座標(50,50)上顯示score內容
  //-----------中間砲台---------
  push() //重新規劃原點(0,0)，在視窗的中間
    let dx = mouseX-width/2
    let dy = mouseY-height/2
    let angle = atan2(dy,dx)
    translate(shipP.x,shipP.y)
    fill("#2a9d8f")
    noStroke()
    rotate(angle)
    triangle(-25,25,-25,-25,50,0) //設定三個點，畫成一個三角形
    ellipse(0,0,50)
  pop() //恢復原本設定，原點(0,0)在視窗左上角
  //-------------------------------
}

function mousePressed(){

  // //-------按下產生物件----------
  // ball = new obj({
  //   p:{x:mouseX,y:mouseY}
  // })  //在滑鼠按下的地方，產生一個obj class元件
  // balls.push(ball)  //把ball物件放到balls陣列內(丟到倉庫)
  // //---------------------------

  //在物件上按下滑鼠，物件消失，分數數值+1
  // for(let ball of balls){ //檢查每一個物件
  //   if(ball.isBallInRanger(mouseX,mouseY)){
  //     balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball))
  //     score = score+1
  //   }
  // }
  //---------------------------------

  //-----------按下產生一個飛彈-------
  bullet = new Bullet({}) //在滑鼠按下的地方，產生一個新的Bullet class物件(產生一個飛彈)
  bullets.push(bullet) //把bullet的物件放到bullets陣列內(丟到倉庫)
  bullet_sound.play()
}

function keyPressed(){
  if(key==" "){ //按下空白鍵
    bullet = new Bullet({}) //在滑鼠按下的地方，產生一個新的Bullet class物件(產生一個飛彈)
  bullets.push(bullet) //把bullet的物件放到bullets陣列內(丟到倉庫)
  bullet_sound.play()
  }
  // if(key=="ArrowLeft"){ //鍵盤左鍵
  //    shipP.x = shipP.x - 5
  // }
  // if(key=="ArrowRight"){ //鍵盤右鍵
  //   shipP.x = shipP.x + 5
  // }
  // if(key=="ArrowUp"){ //鍵盤上鍵
  //   shipP.y = shipP.y - 5
  // }
  // if(key=="ArrowDown"){ //鍵盤下鍵
  //   shipP.y = shipP.y + 5
  // }


}