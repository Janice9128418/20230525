// class 類別，粒子
class obj{ //宣告一個類別，針對一個畫的圖案
    constructor(args){  //預設值，基本資料(物件的顏色，移動的速度，大小，初始顯示位置)
      // this.p = args.p || {x: random(width),y:random(height)}  //描述為該物件的初始位置，當產生一個物件時，有傳給位置參數，
      this.p = args.p || createVector (random(width),random(height)) //把原本(x:...,y:...)改成向量
      // this.v = {x: random(-1,1),y:random(-1,1)}  //設定一個物件的移動速度
      this.v =createVector(random(-1,1,),random(-1,1))//把原本(x:...,y:...)改成向量
      this.size = random(10,30)  //一個物件的放大倍率
      this.color = random(fill_colors)
      this.stroke = random(line_colors)
    }
    draw(){  //畫出單一個物件形狀
      push()  //執行push後，按照我的設定，設定原點(0，0)的位置
        translate(this.p.x,this.p.y)  //該物件位置為原點
        scale(this.v.x<0?1:-1,-1) //x軸的放大倍率，如果this.v.x條件成立，值為1，否為-1，y的軸為-1，為上下翻轉
        fill(this.color)
        stroke(this.stroke)
        strokeWeight(4)
        beginShape()
        for(var k=0;k<points.length;k=k+1){
          // line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)
          // vertex(points[k][0]*this.size,points[k][1]*this.size)  //設定一個點，指令到endShape()，會把所有的點連接再一起
          curveVertex(points[k][0]*this.size,points[k][1]*this.size)
        }
        endShape()
      pop()  //執行pop()，原點(0，0)設定回到視窗左上方
    }
    update(){  //移動的程式碼內容
      //  this.p.x = this.p.x+this.v.x //x軸目前位置(this.p.x)加上x軸移動速度(this.v.x)
      //  this.p.y = this.p.y+this.v.y //y軸目前位置(this.p.y)加上x軸移動速度(this.v.y)
      this.p.add(this.v) //設定好向量後，使用add就可以與上面2行指令相同
      // 向量sub==>減號

//------隨滑鼠移動----------
      //知道滑鼠的位置，並建立一個滑鼠的向量
      // let mouseV = createVector(mouseX,mouseY) //把滑鼠的位置轉化成一個向量值
      // let delta = mouseV.sub(this.p).limit(this.v.mag()*2) //sub計算出滑鼠所在位置向量(mouseV)到物件向量(this.p)位置
      //this.v.mag()代表該物見的速度大小(一個向量值有大小與方向)
//------------------------
      // this.p.add(delta)

      if(this.p.x<=0 || this.p.x>=width){ //x軸碰到左邊(<=0)，或是碰到右邊(>=width)
        this.v.x = -this.v.x  //把x軸方向，速度方向改變
      }
      if(this.p.y<=0 || this.p.y>=height){ //y軸碰到上邊(<=0)，或是碰到下邊(>=hight)
        this.v.y = -this.v.y //把y軸方向，速度方向改變
      }
    }
    isBallInRanger(x,y){ //功能:判斷滑鼠按下的位置是否在物件範圍內
      let d = dist(x,y,this.p.x,this.p.y)  //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
      if(d<4*this.size){
        return true //滑鼠與物件的距離小於物件的寬度，代表觸碰了，則傳回true的值
      }else{
        return false //滑鼠與物件的距離大於物件的寬度，代表沒有觸碰，則傳回false的值
      }
    }

}