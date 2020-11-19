import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { Employee } from './iemployee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.mainUrl);
  }

  getEmployee(id: number): Observable<Employee>{
    const url = `${this.mainUrl}/${id}`;
    console.log(url);
    return this.http.get<Employee>(url).pipe(
      tap(_ => this.log(`fetched employee id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  updateEmployee(employee: Employee): Observable<any>{
    return this.http.put(this.mainUrl, employee, this.httpOptions);
  }

  addEmployee(employee: any){
    
    return this.http.post<any>(this.mainUrl, employee, this.httpOptions).pipe(
      tap((newEmploy: Employee) => this.log(`added employee w/ id=${newEmploy.userid}`)),
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  private log(message: string) {
    console.log(`employeeService: ${message}`);
  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  private mainUrl = 'http://localhost:52979/api/Employee'
}
