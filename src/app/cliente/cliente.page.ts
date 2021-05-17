import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs'; 

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  private clienteId:string;
  public  cliente:Cliente ={};
  private carregar:any;
  private clienteSubsCription: Subscription;

  constructor(
    private clienteService:ClienteService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController

  ) {
    this.clienteId = this.activatedRoute.snapshot.params['id'];

    if(this.clienteId)
    this.carregar();
   }

  ngOnInit() {
  }
  
   listarCliente(){
    this.clienteSubsCription = this.clienteService.mostrarCliente
    (this.clienteId).subscribe(data =>{this.cliente = data});
  }

  async salvarCliente(){
    if(this.clienteId){
      try{
        await this.clienteService.editarCliente(this.clienteId,this.cliente);
        this.navCtrl.navigateRoot('/home');
      }catch(error){
        this.presentToast('Erro ao salvar');
      }
    }else{
      this.cliente.dataCadastro = new Date().getTime();
      try{
        await this.clienteService.addCliente(this.cliente);
        this.navCtrl.navigateRoot('/home');
      }catch(error){
        this.presentToast('Erro ao Salvar');
      }
    }
  }
  async presentToast(mensagem:string){
    const toast = await this.toastCtrl.create({
      message: mensagem,duration:2000
    });
    toast.present();
  }


}