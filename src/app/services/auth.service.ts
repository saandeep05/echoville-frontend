import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/user/login';
  private companyId = '';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    try {
      const user = localStorage.getItem('user');
      if (user) this.companyId = JSON.parse(user)?.userDTO?.companyId;
    } catch (e) {
      // ignore
    }
    const headers = new HttpHeaders({
      'companyId': this.companyId,
      'Content-Type': 'application/json'
    });

    const body = { email, password };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
