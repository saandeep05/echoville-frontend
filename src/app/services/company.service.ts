import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Community, ApiResponse } from '../models/community.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  // Use relative path for proxy
  private baseUrl = '';

  constructor(private http: HttpClient) {}

  getCommunities(companyId?: string): Observable<Community[]> {
    // Prefer provided companyId, otherwise try to read from localStorage user object
    let compId = companyId;
    if (!compId) {
      try {
        const user = localStorage.getItem('user');
        if (user) compId = JSON.parse(user)?.userDTO?.companyId;
      } catch (e) {
        // ignore
      }
    }

    const token = localStorage.getItem('authToken');

    const headersObj: { [k: string]: string } = {};
    if (compId) headersObj['companyId'] = compId;
    if (token) headersObj['Authorization'] = `Bearer ${token}`;

    const headers = new HttpHeaders(headersObj);

    return this.http.get<ApiResponse<Community[]>>('/community', { headers }).pipe(
      map(res => res?.data || []),
      catchError(err => {
        console.error('Failed to load communities', err);
        return of([]);
      })
    );
  }

  createCommunity(name: string, location: string): Observable<Community | null> {
    let companyId = '';
    try {
      const user = localStorage.getItem('user');
      if (user) companyId = JSON.parse(user)?.userDTO?.companyId;
    } catch {}
    const token = localStorage.getItem('authToken');
    const headersObj: { [k: string]: string } = { 'Content-Type': 'application/json' };
    if (token) headersObj['Authorization'] = `Bearer ${token}`;
    const headers = new HttpHeaders(headersObj);
    const body = { name, location, companyId };
    return this.http.post<Community>('/community/', body, { headers }).pipe(
      catchError(err => {
        console.error('Failed to create community', err);
        return of(null);
      })
    );
  }
}
