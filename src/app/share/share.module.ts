import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareRoutingModule } from './share-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ShareRoutingModule
  ],
  exports: [
    ShareRoutingModule,
    SidebarComponent,
    FooterComponent,
    NavbarComponent
  ]
})
export class ShareModule { }
