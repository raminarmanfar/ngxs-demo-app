import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialsModule} from '../materials.module';
import { ConfirmationPopupComponent } from './components/confirmation-popup/confirmation-popup.component';



@NgModule({
  declarations: [InputComponent, ConfirmationPopupComponent],
  exports: [
    InputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
