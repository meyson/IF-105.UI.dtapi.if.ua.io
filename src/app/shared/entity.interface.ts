
export interface Group {
  group_id: number;
  group_name: string;
  speciality_id: number;
  faculty_id: number;
}

export interface Speciality {
  speciality_id: number;
  speciality_code: string;
  speciality_name: string;
}

export interface Faculty {
  faculty_id: number;
  faculty_name: string;
  faculty_description: string;
}

export enum tableActionsType {
  edit = 'edit',
  delete = 'delete',
  route = 'route',
}
export interface Column {
  columnDef: string;
  header: string;
  actions?: Action[];
}
export interface Action {
  edit: string;
  delete: string;
  route: string;

}
export interface DialogData {
  data: any;
}

export interface TimeTable {
  timetable_id: number;
  group_id: number;
  group_name?: string;
  subject_id: number;
  start_date: number;
  start_time: number;
  end_date: number;
  end_time: number;
}

export interface ResponseInterface {
  response: string;
}

export interface Student {
  user_id: string;
  gradebook_id: string;
  student_surname: string;
  student_name: string;
  student_fname: string;
  group_id: number;
  plain_password: string;
  photo: string;
}

export interface StudentInfo extends Student, Group, Speciality, Faculty {
}

export interface TestsForStudent {
  subject_id: number;
  subject_name: string;
  start_date: number;
  start_time: number;
  end_date: number;
  end_time: number;
  test_id: number;
  test_name: string;
  tasks: number;
  time_for_test: number;
  enabled: number;
  attempts: number;
  can_be_start: boolean;
}

export interface User {
  roles: string [];
  id: number;
  username: string;
  response: string;
}

