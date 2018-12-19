import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';

// LIB
import { SwitcherComponent } from './switcher/switcher.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IconsModule,
    FormsModule
  ],
  declarations: [
    MainNavigationComponent,
    SwitcherComponent,
  ],
  exports: [
    MainNavigationComponent,
    FormsModule,
    SwitcherComponent,
  ]
})
export class SharedModule { }
