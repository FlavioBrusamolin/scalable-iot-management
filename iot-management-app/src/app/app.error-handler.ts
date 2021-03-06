import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NotificationService } from 'src/app/core/services/notification/notification.service';

/* global error handler */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private notifier: NotificationService) { }

    handleError(error: any) {
        while (error.rejection) {
            error = error.rejection;
        }
        let errorMessage = '';
        if (error instanceof HttpErrorResponse) {
            // Server Error
            errorMessage = this.getServerMessage(error);
        } else {
            // Client Error
            errorMessage = this.getClientMessage(error);
        }
        this.notifier.showError('Error!', errorMessage);
    }

    private getClientMessage(error: Error): string {
        if (!navigator.onLine) {
            return 'Check your connection';
        }
        return error.message ? error.message : error.toString();
    }

    private getServerMessage(error: HttpErrorResponse): string {
        return error.error.message;
    }
}
