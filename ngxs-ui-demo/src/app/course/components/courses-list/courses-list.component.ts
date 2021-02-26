import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {CourseState} from '../../store/course.state';
import {Observable, Subscription} from 'rxjs';
import {Course} from '../../model/course.model';
import {tap} from 'rxjs/operators';
import {AddCourse, DeleteCourse, GetCourses, UpdateCourse} from '../../store/course.action';
import {FormControl} from '@angular/forms';
import {CourseFieldNamesEnum} from '../../model/CourseFieldNames.enum';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationPopupComponent} from '../../../shared/components/confirmation-popup/confirmation-popup.component';
import {ConfirmationPopupData} from '../../model/confirmation-popup-data.model';
import {CreateCourseComponent} from '../create-course/create-course.component';
import {UtilService} from '../../../shared/services/util.service';
import {core} from '@angular/compiler';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy {
  @Select(CourseState.getCoursesList) courses$!: Observable<Course[]>;
  @Select(CourseState.areCoursesLoaded) areCoursesLoaded$!: Observable<boolean>;
  areCoursesLoadedSub!: Subscription;
  private courseToEdit = new Course('', '', '', '');

  displayedColumns = ['id', 'courseName', 'author', 'description', 'actions'];
  isEditMode = false;
  editColumnId!: string;

  public get courseFieldNames(): any {
    return CourseFieldNamesEnum;
  }

  // courses$: Observable<Course[]>;
  constructor(private store: Store, private dialog: MatDialog, private utilService: UtilService) {
    // this.courses$ = store.select(state => state.courses);
  }

  ngOnInit(): void {
    this.areCoursesLoadedSub = this.areCoursesLoaded$
      .pipe(
        tap((areCoursesLoaded: boolean) => {
          if (!areCoursesLoaded) {
            this.store.dispatch(new GetCourses());
          }
        })
      ).subscribe((loaded: boolean) => console.log('>>> Loaded:', loaded));
  }

  ngOnDestroy(): void {
    this.areCoursesLoadedSub.unsubscribe();
  }

  onEdit(course: Course): void {
    this.isEditMode = !this.isEditMode;
    this.editColumnId = course.id;

    let doUpdate = false;
    if (this.isInEditMode(course.id)) {
      console.log('in edit mode.');
    } else {
      console.log('in save mode');
      if (this.courseToEdit.courseName !== '') {
        doUpdate = true;
        course.courseName = this.courseToEdit.courseName;
      }
      if (this.courseToEdit.author !== '') {
        doUpdate = true;
        course.author = this.courseToEdit.author;
      }
      if (this.courseToEdit.description !== '') {
        doUpdate = true;
        course.description = this.courseToEdit.description;
      }

      if (doUpdate) {
        this.store.dispatch(new UpdateCourse(course, course.id)).subscribe(_ =>
        this.utilService.openSnackBar(`Course ${course.courseName} updated.`, 'Course update'));
      } else {
        this.utilService.openSnackBar('Nothing changed. No update needed.', 'Update Course')
      }

    }
  }

  onTextChange(value: { fieldName: CourseFieldNamesEnum, formControl: FormControl }): void {
    console.log(value.formControl.value);
    switch (value.fieldName) {
      case CourseFieldNamesEnum.id:
        this.courseToEdit.id = value.formControl.value;
        break;
      case CourseFieldNamesEnum.courseName:
        this.courseToEdit.courseName = value.formControl.value;
        break;
      case CourseFieldNamesEnum.author:
        this.courseToEdit.author = value.formControl.value;
        break;
      case CourseFieldNamesEnum.description:
        this.courseToEdit.description = value.formControl.value;
        break;
    }
  }

  isInEditMode(courseId: string): boolean {
    return this.isEditMode && courseId === this.editColumnId;
  }

  onDelete(course: Course): void {
    const dialogData: ConfirmationPopupData = {
      title: 'Delete Course',
      subtitle: 'Are you sure?',
      bodyMessage: 'Course will be deleted permanently.',
      confirmBtn: 'Yes',
      cancelBtn: 'No'
    };

    this.dialog.open(ConfirmationPopupComponent, {data: dialogData})
      .afterClosed().subscribe((result: string) => {
      if (result.toLowerCase() === 'yes') {
        this.store.dispatch(new DeleteCourse(course.id))
          .subscribe(_ =>
            this.utilService.openSnackBar(`Course ${course.courseName} deleted.`, 'Delete Course'));
      }
    });
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(CreateCourseComponent, {disableClose: true});
    dialogRef.afterClosed().subscribe((courseToAdd: Course) => {
      if (courseToAdd) {
        this.store.dispatch(new AddCourse(courseToAdd)).subscribe(_ => {
          this.utilService.openSnackBar(`Course ${courseToAdd.courseName} added.`, 'Add Course');
        });
      }
    });
  }
}
