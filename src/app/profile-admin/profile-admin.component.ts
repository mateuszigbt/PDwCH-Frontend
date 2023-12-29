import { Component } from '@angular/core';
import { Profile } from '../domain/profile';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss']
})
export class ProfileAdminComponent {
    profile: Profile[] = [
      { id: 0, name: 'first', category: 'nocategory', points: 10, rating: 3 },
      { id: 1, name: 'first', category: 'nocategory', points: 5, rating: 3 },
      { id: 2, name: 'first', category: 'nocategory', points: 3, rating: 3 },
      { id: 3, name: 'first', category: 'nocategory', points: 10, rating: 3 },
      { id: 4, name: 'first', category: 'nocategory', points: 5, rating: 3 },
      { id: 5, name: 'first', category: 'nocategory', points: 3, rating: 3 },
      { id: 6, name: 'first', category: 'nocategory', points: 10, rating: 3 },
      { id: 7, name: 'first', category: 'nocategory', points: 5, rating: 3 },
      { id: 8, name: 'first', category: 'nocategory', points: 3, rating: 3 },
      { id: 8, name: 'first', category: 'nocategory', points: 3, rating: 3 },
    ];
}
