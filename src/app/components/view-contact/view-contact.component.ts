import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';
import { IGroup } from 'src/app/models/IGroup';
@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit {
  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public groups: IGroup = {} as IGroup;



  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService) {
  }

  ngOnInit() {
    this.routerActive();
    this.conditionIf();
  }

  routerActive() {
    this.activatedRoute.paramMap.subscribe((a: ParamMap) => {
      this.contactId = a.get('contactId');
    });
  }

  conditionIf() {
    if (this.contactId) {
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe((data: IContact) => {
        this.contact = data;
        this.loading = false;
        this.contactService.getGroup(data).subscribe((data: IGroup) => {
          this.groups = data;
        });
      }, (error) => {
        this.errorMessage = error;
        this.loading = false;
      });
    }
  }

  public isNotEmpty() {
    return Object.keys(this.contact).length > 0 && Object.keys(this.groups).length > 0 ;
  }

}

