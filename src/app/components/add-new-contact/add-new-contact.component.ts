import { Contact } from './../contact-manager/contact-manager.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Component({
  selector: 'app-add-new-contact',
  templateUrl: './add-new-contact.component.html',
  styleUrls: ['./add-new-contact.component.scss']
})
export class AddNewContactComponent implements OnInit {
  private contactData: Contact | {} = {};
  private phoneNumberCtrl;

  constructor(
    public dialogRef: MatDialogRef<AddNewContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onAddClick() {
    this.dialogRef.close(this.contactData);
  }

}
