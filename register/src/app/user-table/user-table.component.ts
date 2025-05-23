import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
  this.userService.getAllUsers().subscribe({
    next: (data: User[]) => {
      // Sort by dob in descending order
      this.users = data.sort((a, b) => new Date(b.dob).getTime() - new Date(a.dob).getTime());
    },
    error: (err: any) => console.error('Error fetching users:', err)
  });
}

}
