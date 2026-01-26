import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/user/login';
  private companyId = 'bc74fb70-b187-4d36-912a-09367767988d';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'companyId': this.companyId,
      'Content-Type': 'application/json'
    });

    const body = { email, password };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
