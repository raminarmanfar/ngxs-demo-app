import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Course} from '../../model/course.model';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent {
  courseGroup = new FormGroup({
    courseName: new FormControl('', [Validators.required]),
    author: new FormControl(),
    description: new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<CreateCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: null) {
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onAddClick(): void {
    const course: Course = {...this.courseGroup.value};
    this.dialogRef.close(this.courseGroup.value);
  }
}
