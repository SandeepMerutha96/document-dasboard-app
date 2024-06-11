import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AddUserFormService } from '../services/add-user-from.service';
import {
  UserFormsList,
  UserListRsponse,
  UserlistResponseModel,
} from '../model/add-user-form.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteUserFormComponent } from '../delete-user-form/delete-user-form.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  userList!: UserListRsponse;
  totalPages: number = 1;
  currentPage: number = 1;
  userListModel: UserlistResponseModel = {
    page: 1,
    limit: 5,
  };

  constructor(
    private userFormService: AddUserFormService,
    private router: Router,
    private modalService: NgbModal,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getUsersList();
    // this.getPageCount();
  }

  addUserForm() {
    this.router.navigate(['/users/userform']);
  }

  getUsersList() {
    this.userFormService
      .getUsersList(this.userListModel)
      .subscribe((resp: UserListRsponse) => {
        this.userList = resp;
        this.totalPages = this.getPageCount();
        this.cd.detectChanges();
      });
  }

  getPageCount() {
     return this.totalPages = Math.ceil(this.userList?.total / this.userListModel.limit);
  }

  delete(item: any) {
    console.log('Delete called');
    const modalRef = this.modalService.open(DeleteUserFormComponent, {
      centered: true,
      // size: "confirm-size",
    });
    modalRef.componentInstance.id = item.id;
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      () => {
        return this.getUsersList();
      },
      () => {
        return this.getUsersList();
      }
    );
    this.cd.detectChanges();
  }

  generatePDF(): void {
    const data = document.getElementById('data-table');

    if (data) {
      html2canvas(data).then((canvas) => {
        const imgWidth = 210; // Width in mm for an A4 paper
        const pageHeight = 295; // Height in mm for an A4 paper
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const position = 0;

        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('table-data.pdf');
      });
    }
  }

  onPageChange(page: number) {
    this.userListModel.page = page;
    // this.reviewsService.all(this.reviewsModelObject).subscribe((resp) => {
    //   this.reviewsList = resp;
    // });
    this.getUsersList();
  }
}
