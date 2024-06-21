import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from '../../interfaces/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalViewUserComponent } from './modal-view-user/modal-view-user.component';
import { ModalFormUserComponent } from './modal-form-user/modal-form-user.component';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent {

  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'beneficios', 'actions'];
  listUsers: User[]= [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<any>(this.listUsers)
    
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (response: any) =>{
        console.log('lista de usuarios', response);
        this.listUsers = response;
        this.dataSource = new MatTableDataSource<any>(this.listUsers)
        this.dataSource.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel = 'Itens por página';
      },
      error: (error: any) => {
        console.log('erro', error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModalViewUser(user : User){
    this.dialog.open(ModalViewUserComponent,{
      width: '700px',
      height: '330px',
      data: user
    })
  }

  openModalAddUser(){
    this.dialog.open(ModalFormUserComponent,{
      width: '700px',
      height: '400px',
    }).afterClosed().subscribe(() => this.userService.getAllUsers()) 
  }

  openModalEditUser(user : User){
    this.dialog.open(ModalFormUserComponent,{
      width: '700px',
      height: '400px',
      data: user
    }).afterClosed().subscribe(() => this.userService.getAllUsers()) 
  }

  delete(userId: string){
    this.userService.deleteUser(userId).then(() => this.userService.getAllUsers())
  }

}
