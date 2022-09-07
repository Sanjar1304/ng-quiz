import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {


  @Input() isCorrect: Boolean = false;

  

  constructor(private ref: ElementRef,
              private render: Renderer2) { }




  @HostListener('click') answer(){
    if(this.isCorrect){
      this.render.setStyle(this.ref.nativeElement, 'background', 'green')
      this.render.setStyle(this.ref.nativeElement, 'color', '#fff')
      this.render.setStyle(this.ref.nativeElement, 'border', '1px solid #ccc')
    }else{
      this.render.setStyle(this.ref.nativeElement, 'background', 'red')
      this.render.setStyle(this.ref.nativeElement, 'color', '#fff')
      this.render.setStyle(this.ref.nativeElement, 'border', '1px solid #ccc')
    }
  }




}
