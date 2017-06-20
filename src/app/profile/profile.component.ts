import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Profile } from './profile.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  currentProfile: Profile;

  displayEdit: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.displayEdit = false;

    this.currentProfile = {
      name: 'Mrs Tod',
      email: 'tod@example.com',
      gender: 'female',
      occupation: 'Professor',
      company: 'JetLab'
    };

    this.createForm();
    this.setFormValues();
  }


  ngOnInit() { }


  createForm(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      occupation: ['', [Validators.required, Validators.minLength(3)]],
      company: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.profileForm.valueChanges.subscribe(data => this.onValueChanged());

    this.onValueChanged();
  }


  setFormValues() {
    this.profileForm.reset({
      name: this.currentProfile.name,
      email: this.currentProfile.email,
      gender: this.currentProfile.gender,
      occupation: this.currentProfile.occupation,
      company: this.currentProfile.company
    });
  }


  onValueChanged(): void {
    if (!this.profileForm) { return; }
    const form = this.profileForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }


  toggleDisplay(): void {
    this.displayEdit = !this.displayEdit;
  }

  onSubmit(): void {
    console.log(this.profileForm.value, this.profileForm.valid);
    this.currentProfile = this.profileForm.value;
    this.setFormValues();
    this.toggleDisplay();
  }

  clear() {
    this.profileForm.reset({
      name: '',
      email: '',
      gender: '',
      occupation: '',
      company: ''
    });
  }

  cancel(): void {
    this.setFormValues();
    this.toggleDisplay();
  }

  formErrors: Profile = {
    name: '',
    email: '',
    gender: '',
    occupation: '',
    company: ''
  }

  validationMessages: object = {
    'name': {
      'required':     '*Name is required.',
      'minlength':    '*Name must be at least 2 characters long.'
    },
    'email': {
      'required':      '*Email is required.',
      'email':         '*Email must be of a proper format.'
    },
    'gender': {
      'required':      '*Gender is required.'
    },
    'occupation': {
      'required':      '*Occupation is required.',
      'minlength':     '*Occupation must be at least 3 characters long.'
    },
    'company': {
      'required':      '*Company is required.',
      'minlength':     '*Company must be at least 3 characters long.'
    }
  }
}
