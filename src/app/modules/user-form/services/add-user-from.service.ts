import { Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { UserFormRequestModel, UserFormsList } from '../model/add-user-form.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddUserFormService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  saveUserForm(userformRequestModel: UserFormRequestModel) {
    return this.http.post<UserFormRequestModel>(
      `${this.baseUrl}`,
      userformRequestModel
    );
  }

  updateUserForm(id: number,userFormUpdated:UserFormRequestModel): Observable<void> {
      return this.http.put<void>(`${this.baseUrl}/${id}`,userFormUpdated );
  }

  getItemById(id: number): Observable<any> {
      return this.http.get<UserFormRequestModel>(`${this.baseUrl}/${id}`);
  }

    getUsersList(): Observable<any> {
      return this.http.get<UserFormsList[]>(`${this.baseUrl}`);
  }

  // masters() {
  //     return this.http.get<IStartupMasterResposne>(`${this.baseUrl}/v1/masters`);
  // }

  // edit(id: number, startupDetails: IStartupDetails) {
  //     return this.http.patch<IStartupDetails>(`${this.baseUrl}/v1/${id}`, startupDetails);
  // }

  // add(startupDetails: IStartupDetails) {
  //     return this.http.post<IStartupDetails>(`${this.baseUrl}/v1/add`, startupDetails);
  // }
  delete(deleteID: number) {
      return this.http.delete<void>(`${this.baseUrl}/${deleteID}`);
  }
}
