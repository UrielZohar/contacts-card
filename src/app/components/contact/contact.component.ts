import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @Input('details') contactDetails;
  @Output('deleteMe') deleteMe = new EventEmitter<string>();
  @Output('editMe') editMe = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  deleteContact() {
    this.deleteMe.emit(this.contactDetails.id);
  }

  editContact() {
    this.editMe.emit(this.contactDetails.id);
  }

}
