import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  @Input()
  public startCount: number = 0;
  public count: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }

  reset(value: string) {
    const count = parseInt(value, 10);
    if(!Number.isNaN(count)) {
      this.count = count;
    }
  }

  ngOnChanges() {
    this.count = this.startCount;
  }
}
