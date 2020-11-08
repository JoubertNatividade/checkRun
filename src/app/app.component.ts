import { Component, OnInit } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from 'src/services/UserServices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inicio',
      url: 'home',
      icon: 'home'
    }, 
    {
      title: 'Perfil',
      url: 'profile',
      icon: 'person-circle'
    },  
    {
      title: 'Cadastrar Lista',
      url: 'register-list',
      icon: 'add'
    },
    {
      title: 'Minhas Listas',
      url: 'show-list',
      icon: 'list-circle'
    },
    {
      title: 'Meu Desempenho',
      url: 'my-performance',
      icon: 'stats-chart'
    },
    {
      title: 'Ajuda',
      url: 'help',
      icon: 'help-circle'
    },
    {
      title: 'Sair',
      url: 'login',
      icon: 'close'
    },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _usuarioService: UserService,
    private _menu: MenuController,
    private _router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  logout() {
    this._usuarioService.logout();
    this._menu.swipeGesture(false);
    this._router.navigate(['/login']);
  }
}
