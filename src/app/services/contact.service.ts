import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { API_PATH } from 'src/environments/environment';
import { IContact } from '../models/IContact';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }

  // GET All Contacts
  public getAllContacts():Observable<IContact[]> {
    let dataURL : string = `${API_PATH}/contacts`;
    return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError));
  }

  // GET Single Contacts
  public getContact(contactId: string):Observable<IContact> {
    let dataURL : string = `${API_PATH}/contacts/${contactId}`;
    return this.httpClient.get<IContact>(dataURL).pipe(catchError(this.handleError));
  }

  // Create a Contact
  public createContact(contact: IContact):Observable<IContact> {
    let dataURL : string = `${API_PATH}/contacts`;
    return this.httpClient.post<IContact>(dataURL, contact).pipe(catchError(this.handleError));
  }

  // Update a Contact
  public updateContact(contact: IContact, contactId: string):Observable<IContact> {
    let dataURL : string = `${API_PATH}/contacts/${contactId}`;
    return this.httpClient.put<IContact>(dataURL, contact).pipe(catchError(this.handleError));
  }

  // Delete a Contact
  public deleteContact(contactId: string):Observable<{}> {
    let dataURL: string = `${API_PATH}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(dataURL).pipe(catchError(this.handleError));
  }


  // Get All groups
  public getAllGroups():Observable<IGroup[]>{
    let dataURL: string = `${API_PATH}/groups`;
    return this.httpClient.get<IGroup[]>(dataURL).pipe(catchError(this.handleError));
  }

  // Get Single Group
public getGroup(contact: IContact):Observable<IGroup>{
  let dataURL: string = `${API_PATH}/groups/${contact.groupId}`;
  return this.httpClient.get<IGroup>(dataURL).pipe(catchError(this.handleError));
}
  // Error Handling 
  public handleError(error:HttpErrorResponse){
    let errorMessage:string = '';
    if(error.error instanceof ErrorEvent){
      // client Error
      errorMessage = `Error : ${error.error.message}`
    } 
    else{
      //serve error
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  
}
