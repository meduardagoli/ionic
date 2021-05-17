import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private colecaoClientes: AngularFirestoreCollection<Cliente>;

  constructor(
    private afs: AngularFirestore) {
      this.colecaoClientes = this.afs.collection<Cliente>('Clientes');
     }

     listarCliente(){
      return this.colecaoClientes.snapshotChanges().pipe(
        map(actions =>{
          return actions.map(a=>{
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id,...data};
          });
        })
      );
    }

    addCliente(cliente:Cliente){
        return this.colecaoClientes.add(cliente);
    }

    mostrarCliente(id:string){
      return this.colecaoClientes.doc<Cliente>(id).valueChanges();
    }

    editarCliente(id:string, cliente:Cliente){
      return this.colecaoClientes.doc<Cliente>(id).update(cliente);
    }

    excluirCliente(id:string){
      return this.colecaoClientes.doc(id).delete();
    }

}
