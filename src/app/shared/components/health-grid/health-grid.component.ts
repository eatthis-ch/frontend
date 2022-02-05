import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-grid',
  templateUrl: './health-grid.component.html',
  styleUrls: ['./health-grid.component.scss'],
})
export class HealthGridComponent{
  @Input() cal = 0;
  @Input() protein = 0;
  @Input() fat = 0;
  @Input() carbs = 0;

  constructor() {}

}
