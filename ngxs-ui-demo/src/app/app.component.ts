import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {CourseState} from './course/store/course.state';
import {Observable, of, Subscription} from 'rxjs';
import {Course} from './course/model/course.model';
import {flatMap, switchMap, tap} from 'rxjs/operators';
import {GetCourses} from './course/store/course.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
