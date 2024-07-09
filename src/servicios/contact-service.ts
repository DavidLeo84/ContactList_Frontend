import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ContactDTO } from '../dtos/contact-dto';
import { Contact } from '../model/contact.interface';
import ContactFormComponent from '../componentes/contact-form/contact-form.component';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // private http = inject(HttpClient);

  private agendaURL = "http://localhost:8080/api/agenda";

  constructor(private http: HttpClient) { }

  public listAll() {
    return this.http.get<ContactDTO[]>(`${this.agendaURL}`)
  }

  public getContact(id: number) {
    return this.http.get<ContactDTO>(`${this.agendaURL}/${id}`)
  }

  public createContact(contactDTO: ContactDTO) {
    return this.http.post<ContactDTO>(`${this.agendaURL}`, contactDTO);
  }

  public updateContact(id: number, contactDTO: ContactDTO) {
    return this.http.put<ContactDTO>(`${this.agendaURL}/${id}`, contactDTO);
  }

  public deleteContact(id: number) {
    return this.http.delete<void>(`${this.agendaURL}/${id}`);
  }
}
