
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {

  public loading = false;
  public contactId: string | null = null;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public groups: IGroup[] = [] as IGroup[];

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private router : Router) { }

  ngOnInit(): void {
    this.routerParam();
    this.getUser();
  }

  routerParam() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.contactId = param.get('contactId');
    });
  }

  getUser(){
    if (this.contactId) {
      this.contactService.getContact(this.contactId).subscribe ( (a : IContact) => { 
        this.contact = a ;
        this.loading = false; 
        this.contactService.getAllGroups().subscribe((a : IGroup[]) => {
          this.groups = a;
        })
      }, (error) => {
        this.errorMessage = error;
        this.loading = false;
      });
    }
  }

  public submitUpdate( ) {
    if(this.contactId){
      this.contactService.updateContact(this.contact, this.contactId).subscribe((data: IContact) => {
        this.router.navigate(['/']).then();
      }, (error) => {
        this.errorMessage = error;
        this.router.navigate(['/contacts/edit/&{this.contactId}']).then();
      });  
    }
  }
}

