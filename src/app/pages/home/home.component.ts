import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  numvar: number = 10;
  bigint: bigint = 9007199254740991n;
  json: { oid?: string, nombre?: string } = {};

  constructor() { }

  ngOnInit(): void {
    console.log(this.bigint + BigInt(this.numvar))
    this.json.oid = (this.bigint + BigInt(this.numvar)).toString();
    this.json.nombre = "prueba";
  }

}
