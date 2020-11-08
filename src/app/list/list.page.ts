import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'src/models/List';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  public listas: List[]= new Array<List>();

  constructor(
    private _router: Router
  ) {}

  ngOnInit() {
  }
  cadastrarLista(){
    this._router.navigate(['/register-list']) 
  }



}
