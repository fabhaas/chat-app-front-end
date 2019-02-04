import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable()
export class AccountService {
    constructor(private http: HttpClient, private configService: ConfigService) { }

    handleError(error: HttpErrorResponse) {
        if (error.status === 409) {
            return throwError('Username is already in use! Please choose another name!');
        }
        if (error.status === 400) {
            return throwError('Old password is wrong');
        } else {
            return throwError('Server error, please contact the server admin');
        }
    }

    changeUsername(newname: string) {
        return this.http.patch(this.configService.userNameURL + '/' + newname, { }, {
            headers: {
                'authorization': this.configService.getAuthHeader()
            }
        }).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    changePassword(oldPassword: string, newPassword: string) {
        return this.http.patch(this.configService.userPasswordURL, { oldpassword: oldPassword, newpassword: newPassword }, {
            headers: {
                'authorization': this.configService.getAuthHeader()
            }
        }).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }
}
