import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../interfaces/user';
import {DATABASE_KEY} from '../core/utils/global-variable';

const API_USER = environment.apiBaseLink + '/api/user/';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {


  constructor(
    private httpClient: HttpClient,
  ) {
  }

  /**
   * USER BASIC DATA
   */

  getLoggedInUserInfo(select?: string) {
    if (select) {
      let params = new HttpParams();
      params = params.append('select', select);
      return this.httpClient.get<{ data: User, message?: string }>(API_USER + 'logged-in-user-data', {params});
    } else {
      return this.httpClient.get<{ data: User, message?: string }>(API_USER + 'logged-in-user-data');
    }
  }



  getUserByUserID(id: string) {
    return this.httpClient.get<{data: User, message?: string}>(API_USER + 'get-user-by-user-id/' + id);
  }

}
