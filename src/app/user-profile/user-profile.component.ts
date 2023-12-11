import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileForm = new FormGroup({
    name: new FormControl(''),
    contact: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  updateProfile() {
    if (this.profileForm.valid) {
      this.userService.updateProfile(this.profileForm.value).subscribe(
        response => {
          // handle successful response
        },
        error => {
          // handle error response
        }
      );
    }
  }
}