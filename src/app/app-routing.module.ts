import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {MainLayoutComponent} from "./layouts/main-layout/main-layout.component";
import {UsersPageComponent} from "./modules/users/pages/users-page/users-page.component";
import {UserDetailsPageComponent} from "./modules/users/pages/user-details-page/user-details-page.component";
import {CarsPageComponent} from "./modules/cars/pages/cars-page/cars-page.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {
        path: '', redirectTo: 'users', pathMatch: 'full'
      },
      {
        path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'cars', loadChildren: () => import('./modules/cars/cars.module').then(m => m.CarsModule)
      }

      // {
      //   path: '', redirectTo: 'users', pathMatch: 'full'
      // },
      // {
      //   path: 'users', component: UsersPageComponent, children: [
      //     {
      //       path: ':id', component: UserDetailsPageComponent
      //     }
      //   ]
      // },
      // {
      //   path: 'cars', component: CarsPageComponent
      // }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
