import { Injectable } from '@angular/core';
import { UserData } from '../../../shared/interfaces/user-data';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SharedvalueService {
  userData: UserData | null = null
  constructor() {
    const token = localStorage.getItem('userToken');
    if (token) {
      this.userData = jwtDecode(token);
    }
  }
}
