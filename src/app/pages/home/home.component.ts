import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  

  lastUser : User;
  arrayUsers: any[];
  constructor(private userService: UserService){
  }




  userName: string | null;
  ngOnInit() {
   

    this.userService.getAllUsers().subscribe(users => {
      this.arrayUsers = users;
      this.lastUser = this.arrayUsers[this.arrayUsers.length - 1];
    });

    this.userName = sessionStorage.getItem('user');
    
  }
}
