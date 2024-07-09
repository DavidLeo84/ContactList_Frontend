import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactService } from '../../servicios/contact-service';
import { Contact } from '../../model/contact.interface';
import { ContactDTO } from '../../dtos/contact-dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export default class ContactFormComponent implements OnInit {


  form!: FormGroup;
  contact?: ContactDTO;
  errors: string[];

  constructor(private fb: FormBuilder, private contactService:
    ContactService, private router: Router, private route: ActivatedRoute) { 

      this.errors = [];
    }

  

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.contactService.getContact(parseInt(id)).subscribe(c => {

        this.contact = c;
        this.form = this.fb.group({
          name: [c.name, [Validators.required]],
          email: [c.email, [Validators.required, Validators.email]],
          phone: [c.phone, [Validators.required]]

        })
      });
    } else {
      this.form = this.fb.group({

        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]]

      })
    }
  }

  public save() {

    if (this.form?.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const contactForm = this.form!.value;
    let request: Observable<ContactDTO>

    if (this.contact) {
      request = this.contactService.updateContact(this.contact.id, contactForm);
    } else {
      request = this.contactService.createContact(contactForm);
    }

    request.subscribe({
      next: () => {
        this.errors = [];
        this.router.navigate(['/']);
      },
      error: response => {
        this.errors = response.error.errors;
      }
    });
  }
}