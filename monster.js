var monster_colors = "cad2c5-84a98c-52796f-354f52-2f3e46".split("-").map(a=>"#"+a)

class Monster{  //建立一個怪物類別，名稱為Monster
    constructor(args){  //預設值，基本資料
        this.r = args.r || random(50,100)  //設計怪物有大有小時，就傳參數args.r來設定怪物大小，沒有傳參數就以100為準
        this.p = args.p || createVector(random(width),random(height)) //建立一個向量，由亂數抽取
        this.v = args.v || createVector(random(-1,1),random(-1,1)) //移動的速度，如果沒有傳args參數就會利用亂數(-1,1) 
        this.color = args.color || random (monster_colors)
        this.mode = random(["happy","bad"])
        this.dead = false //代表活著
        this.timenum = 0 //延長時間，死亡後的畫面
  
    }
    draw(){  //畫出元件
      if(this.dead == false ){
        push()  //重新設定原點位置
            translate(this.p.x,this.p.y) //把原點(0,0)座標移動到物件正中央
            fill(this.color)
            noStroke()
            ellipse(0,0,this.r)
            // stroke(this.color)
            // strokeWeight(4)
            // line(this.r/2,this.r,0)

            if(this.mode == "happy"){
                fill(255)
                ellipse(0,0,this.r/2)
                fill(0)
                ellipse(0,0,this.r/3)
            }else{
                fill(255)
                arc(0,0,this.r/2,this.r/2,0,PI)
                fill(0)
                arc(0,0,this.r/3,this.r/3,0,PI)
            }

            stroke(this.color)
            strokeWeight(4)
            noFill()

            // line(this.r/2,this.r,0)
            for(var j=0;j<8;j++){
                rotate(PI/4)
                beginShape()
                for(var i=0;i<(this.r/2);i++){
                    vertex(this.r/2+i,sin(i/5+frameCount/10)*10)
                }
            endShape()
          }
          pop() //恢復原點到整個視窗的左上角
      }
      else{
       this.timenum=this.timenum+1
        push()  //重新設定原點位置
          translate(this.p.x,this.p.y) //把原點(0,0)座標移動到物件正中央
          fill(this.color)
          noStroke()
          ellipse(0,0,this.r)
          stroke(255)
          line(-this.r/2,0,this.r/2,0)
          stroke(this.color)
          strokeWeight(4)
          noFill()
          for(var j=0;j<8;j++){
            rotate(PI/4)
            line(this.r/2,0,this.r,0)
          }
        pop()
      }   
    }

    update(){ //計算出移動後的位置
        this.p.add(this.v)

        if(this.p.x<=0 || this.p.x>=width){ //x軸碰到左邊(<=0)，或是碰到右邊(>=width)
            this.v.x = -this.v.x  //把x軸方向，速度方向改變
          }
          if(this.p.y<=0 || this.p.y>=height){ //y軸碰到上邊(<=0)，或是碰到下邊(>=hight)
            this.v.y = -this.v.y //把y軸方向，速度方向改變
          }

    }
    isBallInRanger(x,y){ //功能:判斷滑鼠按下的位置是否在物件範圍內
        let d = dist(x,y,this.p.x,this.p.y)  //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
        if(d<this.r/2){
          return true //滑鼠與物件的距離小於物件的寬度，代表觸碰了，則傳回true的值
        }else{
          return false //滑鼠與物件的距離大於物件的寬度，代表沒有觸碰，則傳回false的值
        }
      }
    }