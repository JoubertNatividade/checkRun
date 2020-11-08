import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginService } from 'src/interfaces/ILoginService';
import { Login } from 'src/models/Login';
import { User } from 'src/models/User';
import { Global } from 'src/shared/Global';



@Injectable({
    'providedIn':'root'
})


export class LoginServices implements ILoginService {

    public apiUrl: string = Global.ApiUrl+"user/login"


    constructor ( private _http : HttpClient){}

    login( { email, password }: Login): Observable<User> {

        // VERIFICANDO SE OS CAMPOS FORAM PREENCHIDOS
        if(!email) throw new Error('Preencha o campo Email')
        if(!password) throw new Error('Preencha o campo Senha')
        
        // FAZENDO LOGIN
        return this._http.post<User>(this.apiUrl,{email,password})

    }

    
    
}