import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  numvar: number = 10;
  json: { oid?: string, nombre?: string } = {};

  constructor() { }

  ngOnInit(): void {

  }

}
