import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../../servicios/contact-service';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Contact } from '../../model/contact.interface';
import { ContactDTO } from '../../dtos/contact-dto';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export default class ContactListComponent implements OnInit {

  // private contactService = inject(ContactService);
  contactsList: ContactDTO[] = [];
  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.loadAll();
  }

  public loadAll() {
    this.contactService.listAll().subscribe(contacts => {

      this.contactsList = contacts;
    });
  }

  public deleteContact(contactoDTO: ContactDTO) {
    this.contactService.deleteContact(contactoDTO.id)
      .subscribe(contacts => {
        this.loadAll();
      });
  }


}
