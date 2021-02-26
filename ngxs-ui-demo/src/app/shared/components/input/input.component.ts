import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {CourseFieldNamesEnum} from '../../../course/model/CourseFieldNames.enum';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() isSingleLine = true;
  @Input() inputValue = '';
  @Input() fieldName!: CourseFieldNamesEnum;
  @Output() textChange = new EventEmitter<{fieldName: CourseFieldNamesEnum, formControl: FormControl}>();
  formControl = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit(): void {
    if (!this.placeholder) {
      this.placeholder = this.label;
    }
    this.formControl.setValue(this.inputValue);
  }

  getErrorMessage(): string {
    if (this.formControl.hasError('required')) {
      return this.label + ' is required!';
    }

    return this.formControl.hasError('email') ? 'Not a valid email' : '';
  }

  onTextChange(): void {
    this.textChange.emit({fieldName: this.fieldName, formControl: this.formControl});
  }
}
