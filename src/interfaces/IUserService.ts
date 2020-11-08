import { Observable } from 'rxjs';
import { User } from 'src/models/User';

export interface IUser {
    cadastrar(user: User): Observable<User>
    atualizar(user: User) : Observable<User>;
    logar(user: User) : void;
    retornarUsuarioLogado() : User;
    buscarUsuario(): Observable<User>;
    logout(): void;
}   