import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  updateProfile(profileData: any): Observable<any> {
    const apiUrl = 'https://myfirebase-59e34-default-rtdb.asia-southeast1.firebasedatabase.app/';
    return this.http.put(apiUrl, profileData);
  }
}