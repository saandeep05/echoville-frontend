

import { Bill, BillsResponse } from '../models/bill.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Community, ApiResponse } from '../models/community.model';
import { House } from '../models/house.model';
import { Resident, ResidentsResponse } from '../models/resident.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  // Use relative path for proxy
  private baseUrl = '';

  constructor(private http: HttpClient) {}

  createBill(bill: {
    title: string;
    amount: number;
    dueDate: string;
    description?: string;
    status: string;
    houseId: number;
    communityId: number;
  }): Observable<Bill | null> {
    let companyId = '';
    try {
      const user = localStorage.getItem('user');
      if (user) companyId = JSON.parse(user)?.userDTO?.companyId;
    } catch {}
    const token = localStorage.getItem('authToken');
    const headersObj: { [k: string]: string } = { 'Content-Type': 'application/json' };
    if (companyId) headersObj['companyId'] = companyId;
    if (bill.communityId) headersObj['communityId'] = String(bill.communityId);
    if (token) headersObj['Authorization'] = `Bearer ${token}`;
    const headers = new HttpHeaders(headersObj);
    const body = {
      title: bill.title,
      amount: bill.amount,
      dueDate: bill.dueDate,
      description: bill.description,
      status: bill.status,
      houseId: bill.houseId,
      communityId: bill.communityId
    };
    return this.http.post<{ data: Bill }>(`/bill/`, body, { headers }).pipe(
      map(res => res?.data || null),
      catchError(err => {
        console.error('Failed to create bill', err);
        return of(null);
      })
    );
  }

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

  createCommunityAdmin(admin: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    communityId: number;
  }): Observable<any> {
    let companyId = '';
    try {
      const user = localStorage.getItem('user');
      if (user) companyId = JSON.parse(user)?.userDTO?.companyId;
    } catch {}
    const token = localStorage.getItem('authToken');
    const headersObj: { [k: string]: string } = { 'Content-Type': 'application/json' };
    if (token) headersObj['Authorization'] = `Bearer ${token}`;
    const headers = new HttpHeaders(headersObj);
    const { communityId, ...payload } = admin;
    return this.http.post<any>(
      `/user/createAdmin/${companyId}/${communityId}`,
      payload,
      { headers }
    ).pipe(
      catchError(err => {
        console.error('Failed to create community admin', err);
        return of(null);
      })
    );
  }

  getHousesForCommunity(communityId?: number): Observable<House[]> {
    let commId = communityId;
    if (!commId) {
      try {
        const user = localStorage.getItem('user');
        if (user) commId = JSON.parse(user)?.userDTO?.communityId;
      } catch {}
    }
    const token = localStorage.getItem('authToken');
    const companyId = (() => {
      try {
        const user = localStorage.getItem('user');
        if (user) return JSON.parse(user)?.userDTO?.companyId;
      } catch {}
      return '';
    })();
    const headersObj: { [k: string]: string } = {};
    if (companyId) headersObj['companyId'] = companyId;
    if (token) headersObj['Authorization'] = `Bearer ${token}`;
    const headers = new HttpHeaders(headersObj);
    return this.http.get<ApiResponse<House[]>>(`/house/${commId}`, { headers }).pipe(
      map(res => res?.data || []),
      catchError(err => {
        console.error('Failed to load houses', err);
        return of([]);
      })
    );
  }
  getResidentsForCommunity(communityId: number): Observable<Resident[]> {
    const token = localStorage.getItem('authToken');
    let companyId = '';
    try {
      const user = localStorage.getItem('user');
      if (user) companyId = JSON.parse(user)?.userDTO?.companyId;
    } catch {}
    const headersObj: { [k: string]: string } = {};
    if (companyId) headersObj['companyId'] = companyId;
    if (token) headersObj['Authorization'] = `Bearer ${token}`;
    const headers = new HttpHeaders(headersObj);
    return this.http.get<ResidentsResponse>(`/user/${communityId}`, { headers }).pipe(
      map(res => res?.data || []),
      catchError(err => {
        console.error('Failed to load residents', err);
        return of([]);
      })
    );
  }

  createResident(communityId: number, resident: { username: string; email: string; password: string; firstName: string; lastName: string; phone: string; }): Observable<Resident | null> {
    const token = localStorage.getItem('authToken');
    let companyId = '';
    try {
      const user = localStorage.getItem('user');
      if (user) companyId = JSON.parse(user)?.userDTO?.companyId;
    } catch {}
    const headersObj: { [k: string]: string } = { 'Content-Type': 'application/json' };
    if (companyId) headersObj['companyId'] = companyId;
    if (token) headersObj['Authorization'] = `Bearer ${token}`;
    const headers = new HttpHeaders(headersObj);
    return this.http.post<{ data: Resident }>(`/user/${communityId}`, resident, { headers }).pipe(
      map(res => res?.data || null),
      catchError(err => {
        console.error('Failed to create resident', err);
        return of(null);
      })
    );
  }

  assignHouseToResident(userId: number, houseId: number, communityId: number): Observable<any> {
    let companyId = '';
    try {
      const user = localStorage.getItem('user');
      if (user) companyId = JSON.parse(user)?.userDTO?.companyId;
    } catch {}
    const token = localStorage.getItem('authToken');
    const headersObj: { [k: string]: string } = {};
    if (companyId) headersObj['companyId'] = companyId;
    if (communityId) headersObj['communityId'] = String(communityId);
    if (token) headersObj['Authorization'] = `Bearer ${token}`;
    const headers = new HttpHeaders(headersObj);
    return this.http.post(`/user/${userId}/house/${houseId}`, {}, { headers }).pipe(
      catchError(err => {
        console.error('Failed to assign house', err);
        return of(null);
      })
    );
  }

  getBillsForCommunity(communityId: number): Observable<Bill[]> {
    const token = localStorage.getItem('authToken');
    let companyId = '';
    try {
      const user = localStorage.getItem('user');
      if (user) companyId = JSON.parse(user)?.userDTO?.companyId;
    } catch {}
    const headersObj: { [k: string]: string } = {};
    if (companyId) headersObj['companyId'] = companyId;
    if (communityId) headersObj['communityId'] = String(communityId);
    if (token) headersObj['Authorization'] = `Bearer ${token}`;
    const headers = new HttpHeaders(headersObj);
    return this.http.get<BillsResponse>(`/bill/`, { headers }).pipe(
      map(res => res?.data || []),
      catchError(err => {
        console.error('Failed to load bills', err);
        return of([]);
      })
    );
  }
}
