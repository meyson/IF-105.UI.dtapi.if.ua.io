import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort } from '@angular/material';
import { SubjectsCreateModalComponent } from './subjects-create-modal/subjects-create-modal.component';
import { ISubjects } from './subjects.interface';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { SubjectConfirmComponent } from './subject-confirm/subject-confirm.component';
import { ApiService } from 'src/app/shared/services/api.service';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  result: any;
  public subjectTableList: Array<ISubjects> = [];
  public displayedColumns: string[] = ['subject_number', /*'subject_id',*/ 'subject_name', 'subject_description', 'subject_menu'];
  public dataSource = new MatTableDataSource<ISubjects>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,

    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.showSubjects();
  }
  showSubjects() {
    this.apiService.getEntity('Subject')
      .subscribe((data: Array<ISubjects>) => {
        this.subjectTableList = data;
        console.log(this.subjectTableList);
        this.dataSource.sort = this.sort;
      }
      );
  }

  createNewSubject() {
    const newDialogSubject = this.dialog.open(SubjectsCreateModalComponent, {
      width: '500px',
      disableClose: true,
    });
    newDialogSubject.afterClosed()
      .pipe(
        mergeMap((data) => {
          console.log(data);
          if (data) {
            return this.apiService.createEntity('Subject', data);
          }
          return of(null);
        })
      )
      .subscribe((newData: Array<ISubjects> | null) => {
        if (newData) {
          this.subjectTableList = [...this.subjectTableList, ...newData];
          this.dataSource.sort = this.sort;
        }
      });
  }
  edit(row: ISubjects): void {
    const newDialogSubject = this.dialog.open(SubjectsCreateModalComponent, {
      width: '500px',
      disableClose: true,
    });
    newDialogSubject.afterClosed()
      .pipe(
        mergeMap((data) => {
          if (data) {
            return this.apiService.updEntity('Subject', data, row.subject_id);
          }
          return of(null);
        })
      )
      .subscribe((newData: Array<ISubjects> | null) => {
        if (newData) {
          this.showSubjects();
          this.dataSource.sort = this.sort;
        }
      });
  }

  delete(row: ISubjects): void {
    const dialogData = `Ви видаляєте ${row.subject_name}, ви впевнені?`;
    const dialogRef = this.dialog.open(SubjectConfirmComponent, {
      maxWidth: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result) {
        this.delSubject(row.subject_id);
      }
    });
  }
  delSubject(id: number) {
    this.apiService.delEntity('Subject', id)
      .subscribe((response) => {
        this.subjectTableList = this.subjectTableList.filter(item => item.subject_id !== id);
      });
  }
}
