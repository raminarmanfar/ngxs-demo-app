import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CourseService } from './services/course.service';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import {MaterialsModule} from '../materials.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [CoursesListComponent, CreateCourseComponent],
  imports: [CommonModule, FormsModule, HttpClientModule, MaterialsModule, SharedModule, ReactiveFormsModule],
  exports: [CoursesListComponent, CreateCourseComponent],
  providers: [CourseService],
})
export class CourseModule {}
