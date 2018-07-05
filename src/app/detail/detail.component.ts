import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../_models';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() empl: Employee;

  constructor() { }

  ngOnInit() {
  }

}
