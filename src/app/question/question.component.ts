import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name: string = '';
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  incorrectAnswer:number = 0
  interval$:any
  progress: string = '0'
  isFinished: boolean = false;


  constructor(private qstnService: QuestionService) { }

  ngOnInit(): void {
    this.getFromStorage();
    this.getAllQuestions();
    this.startCounter()
  }


  getFromStorage(){
   this.name = localStorage.getItem('name')!;
  }



  getAllQuestions(){
    return this.qstnService.getJson().subscribe(res => {
      this.questionList = res.questions;
    })
  }



  nextQuestion(){
    this.currentQuestion++;
  }



  previousQuestion(){
    this.currentQuestion--;
  }




  answer(currentQuestion:number, option: any){

    if(currentQuestion === this.questionList.length){
      this.isFinished = true;
      this.stopCounter();
    }else{
      this.isFinished = false;
    }

    if(option.correct){
      setTimeout(() => {
        
        this.currentQuestion++; 
        this.correctAnswer++;
        this.progresBar();
        this.resetCounter();
      }, 500);
      this.points += 10;
      
    }else{
      setTimeout(() => {
        this.currentQuestion++
        this.incorrectAnswer++;
        this.progresBar();
      }, 1000)
      this.points -=10;
    }
  }




  startCounter(){
    this.interval$ = interval(1000).subscribe(val => {
      this.counter--;

      if(this.counter === 0){
        this.currentQuestion++
        this.counter = 60;
        this.points -= 10;
        this.incorrectAnswer++;
      }
    });

    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000)
  }




  stopCounter(){
    this.interval$.unsubscribe();
    this.counter = 0;
  }




  resetCounter(){
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }




  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = '0';
  }



  progresBar(){
    this.progress = ((this.currentQuestion / this.questionList.length)*100).toString();
    return this.progress;
  }



}
