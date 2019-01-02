import { EditContactComponent } from './../edit-contact/edit-contact.component';
import { AddNewContactComponent } from './../add-new-contact/add-new-contact.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Contact {
  fullName: string,
  location: string,
  company: string,
  phoneNumner: string,
  id: string
}

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.scss']
})
export class ContactManagerComponent implements OnInit  {
  private contacts: Contact[] = [];
  constructor(
    public dialog: MatDialog,
    private http: HttpClient
  ) { }

  ngOnInit() {
    

  }

  async addNewContact() {
    // mobile or pc
    let width = '300px';
    if (window.document.documentElement.clientWidth > 600) {
      width = '400px';
    }

    const dialogRefAddContact = this.dialog.open(AddNewContactComponent, {
      width
    });

    dialogRefAddContact.afterClosed().subscribe(newContact => {
      if (newContact) {
        // add id ts
        newContact.id = new Date().getTime();
        this.contacts.push(newContact);

        this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${newContact.location}&key=AIzaSyDKvvBgAkSCugEbXckutuAFuqPzthsCnJ8`).subscribe( (res: any) => {
            if (!res.error_message) {
              newContact.lng = res.results[0].geometry.location.lng;
              newContact.lat = res.results[0].geometry.location.lat;
            }
        });
      }
      console.log('The dialog was closed');
      console.log(newContact);
    });
  }

  deleteContact(contactId) {
    debugger;
    this.contacts = this.contacts.filter(contact => {
      return contact.id != contactId;
    });
  }

  editContact(contactId) {
    // get the contact
    let contactToEdit = this.contacts.filter( contact => {
      return  contact.id == contactId;
    })[0];

    // mobile or pc
    let width = '300px';
    if (window.document.documentElement.clientWidth > 600) {
      width = '400px';
    }

    const dialogRefEditContact = this.dialog.open(EditContactComponent, {
      width,
      data: Object.assign({}, contactToEdit)
    });

    dialogRefEditContact.afterClosed().subscribe(editedContact => {
      // edit
      if (editedContact) {
        Object.assign(contactToEdit, editedContact);
      }
    });
  }

}
