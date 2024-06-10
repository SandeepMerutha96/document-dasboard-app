import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, throwError } from 'rxjs';
import { AddUserFormService } from '../services/add-user-from.service';
import { UserFormRequestModel } from '../model/add-user-form.model';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css'],
})
export class AddUserFormComponent implements OnInit {
  id!: number;
  userForm!: FormGroup;
  userFormValues!: UserFormRequestModel;
  // registerModel!:IUserBaseModel
  formSubmitted: boolean = false;
  isLoading$!: Observable<boolean>;
  isLoading: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private addUserFormService: AddUserFormService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadDocument();
  }

  loadDocument() {
    const sb = this.route.paramMap
      .pipe(
        switchMap((params: any) => {
          // get id from URL
          this.id = Number(params.get('id'));
          if (this.id || this.id > 0) {
            return this.addUserFormService.getItemById(this.id);
          } else
            return of({
              id: 0,
            });
        }),
        catchError(() => {
          return of(undefined);
        })
      )
      .subscribe((res: UserFormRequestModel) => {
        if (!res) {
          this.router.navigate(['/users/userList'], {
            relativeTo: this.route,
          });
        }
        this.userFormValues = res;
        this.addUserForm();
      });
    this.subscriptions.push(sb);
  }

  backToList() {
    this.router.navigate(['/users/userList']);
  }
  addUserForm() {
    if (!this.userFormValues) {
      return;
    }

    this.userForm = this.fb.group({
      name: [
        this.userFormValues.name,
        [Validators.required, Validators.minLength(2)],
      ],
      address: [this.userFormValues.address, [Validators.required]],

      email: [
        this.userFormValues.email,
        [
          Validators.required,
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(320),
          ]),
        ],
      ],
      phoneNumber: [
        this.userFormValues.phoneNumber,
        Validators.compose([
          Validators.required,
          Validators.pattern('[789][0-9]{9}'),
        ]),
      ],
    });
  }

  onSubmit(): void {
    if (this.id) {
      this.edit();
    } else {
      this.formSubmitted = true;
      if (this.userForm.valid) {
        // const formValue = Object(this.registerModel,this.userForm.value)
        console.log('Form Submitted!', this.userForm.value);
        this.isLoading = true;
        const sb = this.addUserFormService
          .saveUserForm(this.userForm.value)
          .subscribe(
            (resp: any) => {
              this.isLoading = false;
              this.router.navigate(['/users/userList']);
              this.userForm.reset();

              // this.alert.type = AppNotificationType.Success;
              // this.alert.message = AppMessages.ShippingAddressAddSuccess;
              // setTimeout(() => {
              //   this.router.navigate(['/shippingAddessService/verify-email'], {
              //     state: {
              //       userEmail: this.userForm.get('email')?.value,
              //     },
              //   });
              // }, 1500);
            },
            (error: any) => {
              console.log(error);

              // if (error instanceof HttpException) {
              //   this.alert.message = error.message;
              // } else {
              //   this.alert.message = AppMessages.ShippingAddressAddError;
              // }
            }
          );

        this.subscriptions.push(sb);
      } else {
        console.log('Form not valid');
      }
    }
  }

  edit() {
    this.formSubmitted = true;
    if (this.userForm.valid){
    const formValues = this.userForm.value;
    this.userFormValues = Object.assign(this.userFormValues, formValues);
    const sbUpdate = this.addUserFormService
    .updateUserForm(this.id,this.userFormValues)
    .subscribe((res) => {
      this.router.navigate(["/users/userList"], { relativeTo: this.route });
    },
  (error)=>{
throwError ;
  });
  this.subscriptions.push(sbUpdate);
}else{
  throwError ;
}
  }


  isControlValid(controlName: string): boolean {
    const control = this.userForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.userForm.controls[controlName];
    return control && control.invalid && (control.dirty || control.touched);
  }
  markAsTouched(controlName: string): boolean {
    const control = this.userForm.controls[controlName];
    control.markAsTouched();
    return this.formSubmitted;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
