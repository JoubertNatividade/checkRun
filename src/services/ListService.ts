import { Observable } from 'rxjs';
import { List } from 'src/models/List';
import { IListService } from './../interfaces/IListService';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from 'src/shared/Global';
import { User } from 'src/models/User';
import { UserService } from './UserServices';

@Injectable({ 
    'providedIn': 'root'
})

export class ListService implements IListService{

    public apiUrl: string = Global.ApiUrl+"list";

    private _userLogado: User = new User();

    constructor ( 
        private _http : HttpClient,
        private _userService: UserService
    ){
        // VERIFICANDO QUAL USUÁRIO LOGADO
        this._userLogado = this._userService.retornarUsuarioLogado()
    }
    
    // MÉTODO PARA CRIAÇÃO DA LISTA
    cadastrar(dados: List): Observable<List> {
   
        // VERIFICANDO SE OS CAMPOS FORAM PREENCHIDOS
        if( !dados.name ) throw new Error('Preencha o nome da lista');
        if( !dados.days ) throw new Error('Preencha os dias da lista');
        if( !dados.hour ) throw new Error('Preencha o horário da lista');
        if( !dados.category_id ) throw new Error('Preencha a categoria da lista');
        if( !dados.questions.length) throw new Error('Preencha as questões');
        
        // PEGANDO O ID DO USUARIO COM O MÉTODO CRIADO ABAIXO
        dados.user_id = this._userLogado.id
        
        // CRIANDO LISTA
        return this._http.post<List>(this.apiUrl,dados) 
    }

    atualizar(list : List): Observable<List>{
        throw new Error('Precisa ser implementada')
    }  

    excluir(list : List): void{
        throw new Error('Precisa ser implementada')
    }

    retornarIdLista():void{
        throw new Error('Precisa ser implementada')
    }

    // MÉTODO PARA LISTAR TODAS AS LISTAS DO USUÁRIO
    listar(): Promise<List[]> {
        const promise = new Promise<List[]>(async (resolve, reject) => {
            try { 
                const usuario = await this._userService.buscarUsuario().toPromise();
                resolve(usuario.listqs);
            } catch(e) {
               reject(e); 
            }
        });
        return promise;
    }
    
    buscar(list_id: number): Observable<List> {
        throw new Error('Method not implemented.');
    }

}