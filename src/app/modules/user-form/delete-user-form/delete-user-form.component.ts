import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, of } from 'rxjs';
import { delay, tap, catchError, finalize } from 'rxjs/operators';
import { AddUserFormService } from '../services/add-user-from.service';

@Component({
  selector: 'app-delete-user-form',
  templateUrl: './delete-user-form.component.html',
  styleUrls: ['./delete-user-form.component.css']
})
export class DeleteUserFormComponent implements OnInit {

  @Input() id!: number;
 

  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(private addUserFormService: AddUserFormService, public modal: NgbActiveModal) { }

  ngOnInit(): void {

  }

  delete() {
    this.isLoading = true;
    const sb = this.addUserFormService.delete(this.id).pipe(
      delay(1000), // Remove it from your code (just for showing loading)
      tap(() => this.modal.close()),
      catchError((err) => {
        this.modal.dismiss(err);
        return of(undefined);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe();
    this.subscriptions.push(sb);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
