import { Observable } from 'rxjs';
import { IUser } from 'src/interfaces/IUserService';
import { User } from 'src/models/User';
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Global } from 'src/shared/Global';

/* 
    SEMPRE IR PRO APP.MODULES DENTRO DO PROVIDER PRA COLOCAR NOSSO SERVICE
    CRIAR AS REGRAS DE NEGÓCIOS
*/

//VINCULANDO O PROVIDER(APP.MODULES) A NOSSA APLICAÇÃO
@Injectable({ 
    'providedIn': 'root'
})

export class UserService implements IUser {
    
    public apiUrl: string = Global.ApiUrl+"user"
    
    constructor ( private _http : HttpClient){}

    // MÉTODO PARA CRIAÇÃO DO USUÁRIO
    cadastrar({name, email, password, confirmPassword}: User): Observable<User> {
     
        // VERIFICANDO SE OS CAMPOS FORAM PREENCHIDOS
        if(!name ) throw new Error("Preencha o campo nome.");
        if(!email) throw new Error("Preencha o campo email!.");
        if(!password ) throw new Error("Preencha o campo senha!.");
        if(password != confirmPassword) throw new Error("As senhas não coincidem!.");

        // CRIANDO USUÁRIO
        return this._http.post<User>(this.apiUrl,{name,email,password,confirmPassword})
        
    }
    
    atualizar(user: User): Observable<User> {
        throw new Error('Method not implemented.');
    }
    
    logar(user: User): void {
        // LOCALSTORAGE PARA ARMAZENAR DADOS DO USUÁRIO LOGADO
        localStorage.setItem('userlogado',JSON.stringify(user))
    }

    retornarUsuarioLogado(): User {
        // PEGANDO DADOS DO LOCALSTORAGE E RETORNANDO USUÁRIO
        const user: User = JSON.parse(localStorage.getItem('userlogado'))
        return user;
    }

    buscarUsuario(): Observable<User> {
        // BUSCANDO USUÁRIO LOGADO NO MOMENTO
        const usuario: User = this.retornarUsuarioLogado();
        return this._http.get<User>(`${this.apiUrl}/${usuario.id}`);
    }

    logout(): void {
        localStorage.clear();
    }
}   
