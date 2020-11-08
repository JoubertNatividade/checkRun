import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { UserService } from 'src/services/UserServices';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-created-user',
  templateUrl: './created-user.page.html',
  styleUrls: ['./created-user.page.scss'],
})
export class CreatedUserPage implements OnInit {

  public user: User = new User()

  constructor(
    private _userService: UserService,
    private _menu: MenuController,
    private _router: Router, 
  )    
  {
    this._menu.enable(false); 
  }

  ngOnInit() {
  }

  criarUsuario(){
    this._userService.cadastrar(this.user).subscribe(response => {
      return response
    })
    this._router.navigate(['/login']);
  }

  termosCondicoes(){
    this._router.navigate(['/terms-and-conditions'])
  }
}
