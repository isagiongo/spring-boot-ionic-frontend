import { CidadeDTO } from './../../models/cidade.dto';
import { CidadeService } from './../../services/domain/cidade.service';
import { EstadoService } from './../../services/domain/estado.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoDTO } from '../../models/estado.dto';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public estadoService: EstadoService,
    public cidadeService: CidadeService) {

      this.formGroup = this.formBuilder.group({
        nome: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['', [Validators.required, Validators.email]],
        tipo: ['1', [Validators.required]],
        cpfOuCnpj: ['', [Validators.required, Validators.minLength(11)]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: ['', []],
        bairro: ['teste', [Validators.required]],
        cep: ['', [Validators.required]],
        telefone1: ['', [Validators.required]],
        telefone2: ['', []],
        telefone3: ['', []],
        estadoId: [null, [Validators.required]],
        cidadeId: [null, [Validators.required]]
      })
  }

  signupUser() { 
    console.log('enviou o form'); 
  }

  ionViewDidLoad(){
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      }, error => {});
  }

  updateCidades(){
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      }, error => {});
  }

}
