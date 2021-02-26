import {State, Action, StateContext, Selector} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Course} from '../model/course.model';
import {CourseService} from '../services/course.service';
import {
  AddCourse,
  UpdateCourse,
  GetCourses,
  DeleteCourse,
} from './course.action';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export class CourseStateModel {
  constructor(public courses: Course[], public areCoursesLoaded: boolean) {
  }
}

@State<CourseStateModel>({
  name: 'courses',
  defaults: {
    courses: [],
    areCoursesLoaded: false,
  },
})
@Injectable()
export class CourseState {
  constructor(private courseService: CourseService, private router: Router) {
  }

  @Selector()
  static getCoursesList(state: CourseStateModel): Course[] {
    return state.courses;
  }

  @Selector()
  static areCoursesLoaded(state: CourseStateModel): boolean {
    return state.areCoursesLoaded;
  }

  @Action(GetCourses)
  getCourses({getState, setState}: StateContext<CourseStateModel>): Observable<Course[]> {
    return this.courseService.getAllCourses().pipe(
      tap((result: Course[]) => {
        const state = getState();
        setState({
          ...state,
          courses: result,
          areCoursesLoaded: true,
        });
      })
    );
  }

  @Action(DeleteCourse)
  deleteCourse(
    {getState, setState}: StateContext<CourseStateModel>,
    {id}: DeleteCourse): Observable<any> {
    return this.courseService.deleteCourse(id).pipe(
      tap((result) => {
        const state = getState();
        const filteredArray = state.courses.filter(
          (item: Course) => item.id !== id
        );
        setState({
          ...state,
          courses: filteredArray,
        });
      })
    );
  }

  @Action(UpdateCourse)
  updateCourse(
    {getState, setState}: StateContext<CourseStateModel>,
    {payload, id}: UpdateCourse): Observable<any> {
    return this.courseService.updateCourse(id, payload).pipe(
      tap((result) => {
        const state = getState();
        const coursesList = [...state.courses];
        const courseIndex = coursesList.findIndex(
          (item: Course) => item.id === id
        );
        coursesList[courseIndex] = result;

        setState({
          ...state,
          courses: coursesList,
        });
      })
    );
  }

  @Action(AddCourse)
  addTodo(
    {getState, patchState}: StateContext<CourseStateModel>,
    {payload}: AddCourse): Observable<Course> {
    return this.courseService.createCourse(payload).pipe(
      tap((result) => {
        const state = getState();
        patchState({
          courses: [...state.courses, result],
        });
        this.router.navigateByUrl('/courses');
      })
    );
  }
}
