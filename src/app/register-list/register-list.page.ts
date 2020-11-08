import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'src/models/List';
import { ListService } from 'src/services/ListService';
import { UserService } from 'src/services/UserServices';
import { AlertController } from '@ionic/angular';
import { Question } from 'src/models/Question';

@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.page.html',
  styleUrls: ['./register-list.page.scss'],
})

export class RegisterListPage implements OnInit {

  public listq:List = new List();

  public days:Array<string> = ['D','S','T','Q','Q','S','S'];
  
  constructor(
    private _router: Router,
    private _listService: ListService,
    private _userService: UserService,
    private _alertController:AlertController,
  )
  {
    console.log(this.listq)
  }

  ngOnInit() {
  }
  async addQuestao(){
    const alert = await this._alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cadastrar Questão!',
      inputs: [
        {
          name: 'question',
          type: 'text',
          placeholder: 'Nome da Questão'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Salvar',
          handler: ({question}) => {
            console.log(question);
            if(!question) throw new Error('Questão não informada');
            const q: Question = new Question();
            q.description = question;
            q.yes = 0;
            q.no = 0;

            this.listq.questions.push(q);
          }
        }
      ]
    });

    await alert.present();
  }

  removerQuestao(index){
    this.listq.questions.splice(index,1);
  }

  saveLista(){
    this._listService.cadastrar(this.listq).subscribe(response => {
      console.log(response);
    })
    this._router.navigate(['/show-list']);
  }
  
  setDays(day:number){
   
    const diasMarcados:Array<number> = this.listq.days ? JSON.parse(this.listq.days): [];
    if (diasMarcados.includes(day)){

      const indexDiasMarcados = diasMarcados.findIndex(d => d == day)
      diasMarcados.splice(indexDiasMarcados,1)    
    
    }else{  
      diasMarcados.push(day); 
    }

    this.listq.days = JSON.stringify(diasMarcados);   
    console.log(day)
  }

  verificarDiaMarcado(day:number){
    const diasMarcados:Array<number> = this.listq.days ? JSON.parse(this.listq.days): [];
    return diasMarcados.includes(day)
  }
  


}
