import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformationComponent } from './shared/information/information.component';
const routes: Routes = [
  {
    path: '',
    component: InformationComponent,
  },
  {
    path: 'purchases',
    loadChildren: () =>
      import('src/app/Ui/purchase-module/purchase-module-routing.module').then((mod) => mod.PurchaseModuleRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
