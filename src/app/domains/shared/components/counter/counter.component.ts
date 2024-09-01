import { Component, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
    @Input({required: true}) duration = 0;
    @Input({required: true}) message = '';

    constructor(){
      console.log("constructor")
      console.log("-".repeat(10))
    }

    ngOnChange(changes: SimpleChange){
      //before and during render
      console.log("ngOnChange")
      console.log(changes)
    }

    ngOnInit(){
      // after render
      //one time
      console.log('ngOnInit');
      console.log("-".repeat(10))
      console.log('duration =>', this.duration)
      console.log('message =>', this.message);
    }

    ngAfterViewInit(){
      //after render
      //if sons was render
      console.log('ngAfterViewInit');
      console.log("-".repeat(10))
    }

    ngOnDestroy(){
      //before destroy
      console.log('ngOnDestroy');
      console.log("-".repeat(10))
    }

    doSomething(){
        console.log('')
    }
    
}
