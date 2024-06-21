import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrl: './modal-form-user.component.scss'
})
export class ModalFormUserComponent {
  formUser: FormGroup;
  userData: User;
  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<ModalFormUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService  ) {
    this.userData = data;
  }

  planosSaude = 
  [
  {
    id: 1, 
    descricao: "Amil"
  },
  {
    id: 2, 
    descricao: "Bradesco"
  },
  {
    id: 3, 
    descricao: "Sulamérica"
  },
  {
    id: 4, 
    descricao: "Unimed"
  },
  {
    id: 5, 
    descricao: "Outro"
  }
  ]

  planosOdonto =[{id: 1, descricao: "Basic"}, {id: 2, descricao: "Medium"}, {id: 3, descricao: "Pro"}]

  ngOnInit() {
    this.buildFomr();
  }

  closeModal(){this.dialogRef.close()};
  buildFomr(){
    this.formUser = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      role: [null, [Validators.required]],
      sector: [null, [Validators.required]],
      healthPlan: [null],
      dentalPlan: [null]
    })

    if(this.data)
      this.fillForm();

  }

  fillForm(){
    this.formUser.patchValue({
      name: this.userData.name,
      email: this.userData.email,
      role: this.userData.role,
      sector: this.userData.sector,
      healthPlan: this.userData.healthPlan,
      dentalPlan: this.userData.dentalPlan
    })
  }

  saveUser(){
    const objUserForm: User = this.formUser.getRawValue();

    if(this.data && this.data.name){
      this.userService.updateUser(this.userData.firebaseId, objUserForm).then((response: any)=> {
        window.alert('usuário atualizado com sucesso');
        this.closeModal();
      })
      .catch(err =>{
        window.alert('erro ao editar usuário');
        console.error(err)
      });
    }else{

      this.userService.addUser(objUserForm).then((response: any)=> {
        window.alert('usuário cadastrado com sucesso');
        this.closeModal();
      }).catch(err =>{
        window.alert('erro ao cadastrar usuário');
        console.error(err)
      });
      
    }

    
    
  }


}
