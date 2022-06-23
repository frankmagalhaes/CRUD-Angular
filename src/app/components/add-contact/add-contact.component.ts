import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  public loading = false;
  public contact : IContact = {} as IContact; 
  public errorMessage: string | null = null;
  public groups : IGroup[] = [] as IGroup[];



  constructor(
    private contactService : ContactService,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.selectGroup();
  }

  selectGroup( ) {
    this.contactService.getAllGroups().subscribe((a : IGroup[]) => {
       this.groups = a;
    }, (error) =>{
      this.errorMessage = error;
    });
  }

  public createSubmit( ){
    this.contactService.createContact(this.contact).subscribe((data: IContact) => {
      this.router.navigate(['/']).then();
    }, (error) => {
      this.errorMessage = error;
      this.router.navigate(['/contacts/add']).then();
    });  
  }
}