import { Component, OnInit } from '@angular/core';
import { Window } from 'selenium-webdriver';
import { Location } from '@angular/common';
import { ViewChild, ViewChildren, AfterViewInit, TemplateRef, ViewContainerRef, QueryList , ElementRef } from '@angular/core';
import { LeftDivDirective } from '../left-div.directive';
import { RightDivDirective } from '../right-div.directive';


@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  level: number = 5;
  imgSourceLeft: Array<number> =[];
  imgSourceRight: Array<number> =[];
  
  leftImageIndex: number= -1;
  rightImageIndex: number= -1;

  successCount:number = 0;
  constructor() { }
  //@ViewChild("leftGameDiv", {read: ElementRef}) leftGameDiv: ElementRef;
  //@ViewChild("rightGameDiv", {read: ElementRef}) rightGameDiv: ElementRef;

  @ViewChild('leftTemp')
  private leftTempRef : TemplateRef<any>

  @ViewChild('rightTemp')
  private rightTempRef : TemplateRef<any>

  @ViewChildren(LeftDivDirective)
  private leftList: QueryList<LeftDivDirective>

  @ViewChildren(RightDivDirective)
  private rightList: QueryList<RightDivDirective>


  ngOnInit() {
    this.constructLeftAndRightArray();    
  }
  constructLeftAndRightArray(){
    
    for(var i=1;i <= this.level;i++){
      this.imgSourceLeft.push(i);
    }
    this.shuffle(this.imgSourceLeft);

    for(var i=1;i <= this.level;i++){
      this.imgSourceRight.push(i);
    }
    this.shuffle(this.imgSourceRight);
  }
  ngAfterViewInit(){
    //this.createNextLevel();
    //console.log(this.leftGameDiv.nativeElement);
    this.createUI();
    
  }
  createUI(){
    this.leftList.map(leftDivDirective =>
      leftDivDirective.viewContainerRef.createEmbeddedView(this.leftTempRef));
    this.rightList.map(rightDivDirective =>
      rightDivDirective.viewContainerRef.createEmbeddedView(this.rightTempRef));
  }
  createNextLevel(){
    this.rightList.destroy();
    /*for(var i=0;i<this.leftGameDiv.nativeElement.childElementCount;i++){
      this.leftGameDiv.nativeElement.removeChild(this.leftGameDiv.nativeElement.children[i]);
    }
    for(var i=0;i<this.rightGameDiv.nativeElement.childElementCount;i++){
      this.rightGameDiv.nativeElement.removeChild(this.rightGameDiv.nativeElement.children[i]);
    }*/

  }
  leftImageClick(e){
    if(this.leftImageIndex == -1){
      var previousRandomNum = e.target.parentElement.lastElementChild.innerHTML;
      e.target.src = "./assets/animals/"+previousRandomNum+".png";
      
      this.leftImageIndex = previousRandomNum;
      if(this.rightImageIndex != -1 && this.leftImageIndex == this.rightImageIndex ){
        this.successCount++;
        var openElements = document.getElementsByClassName("open");
        for(var i=0;i<openElements.length;i++){
          openElements[i].className = "done";        
        }
        e.target.className = "done";
        var compRef = this;
        if(this.successCount == this.level){
          setTimeout(function(){
            alert("you won");
            compRef.level++;
            compRef.createNextLevel();
          },1000);
        }
        this.leftImageIndex = -1;
        this.rightImageIndex = -1;
      }else if(this.rightImageIndex != -1 && this.leftImageIndex != this.rightImageIndex ){
        var openElements = document.getElementsByClassName("open");
        for(var i=0;i<openElements.length;i++){
          openElements[i].setAttribute("src","./assets/animals/back.png");
          openElements[i].className="";
        }
        setTimeout(function(){
          e.target.setAttribute("src","./assets/animals/back.png");
          e.target.className="";
        },1000);
        
        this.rightImageIndex = -1;
        this.leftImageIndex = -1;
      }else{
        e.target.className = "open";
      }
    }
  }
  rightImageClick(e){
    if(this.rightImageIndex == -1)   {
      var previousRandomNum = e.target.parentElement.lastElementChild.innerHTML;
      e.target.src = "./assets/animals/"+previousRandomNum+".png";
      this.rightImageIndex = previousRandomNum;
      if(this.leftImageIndex != -1 && this.leftImageIndex == this.rightImageIndex ){
        this.successCount++;
        var openElements = document.getElementsByClassName("open");
        for(var i=0;i<openElements.length;i++){
          openElements[i].className = "done";        
        }
        e.target.className = "done";
        if(this.successCount == this.level){
          setTimeout(function(){
            alert("you won");
            this.level++;
            this.createNextLevel();
          },1000);
        }
        this.leftImageIndex = -1;
        this.rightImageIndex = -1;
      }else if(this.leftImageIndex != -1 && this.leftImageIndex != this.rightImageIndex ){
        var openElements = document.getElementsByClassName("open");
        for(var i=0;i<openElements.length;i++){
          openElements[i].setAttribute("src","./assets/animals/back.png");
          openElements[i].className="";
        }
        setTimeout(function(){ 
          e.target.setAttribute("src","./assets/animals/back.png");
          e.target.className = "";
        },1000);
        this.leftImageIndex = -1;
        this.rightImageIndex = -1;
      }else{
        e.target.className = "open";
      }
    }
  }
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
}
