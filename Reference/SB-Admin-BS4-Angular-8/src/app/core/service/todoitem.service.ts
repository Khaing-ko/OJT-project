import { Injectable } from '@angular/core';
import { Item } from '../../core/model/item';
import { Observable, of , tap, catchError  } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoitemService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private itemsUrl = 'http://localhost:3600/api/TodoItems';

  constructor(private http: HttpClient, private messageService: MessageService) { }


  getItem(id: number): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    // const hero = HEROES.find(h => h.Id === id)!;
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    return this.http.get<Item>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id = ${id}`)),
        catchError(this.handleError<Item>(`getHero id=${id}`))
      );
  }


  getItems(): Observable<Item[]> {
    // const heroes = of(HEROES);
    // this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Item[]>(this.itemsUrl)
      .pipe(
        tap(_ => this.log('fetched items')),
        catchError(this.handleError<Item[]>('getItems', []))
      );
  }

  /** PUT: update the hero on the server */
  updateItem(item: Item): Observable<any> {
    const url = `${this.itemsUrl}/${item.Id}`;
    return this.http.put(url, item, this.httpOptions).pipe(
      tap(_ => this.log(`updated item id = ${item.Id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }

  /** POST: add a new hero to the server */
  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, this.httpOptions).pipe(
      tap((newItem: Item) => this.log(`added item w / id=${ newItem.Id }`)),
      catchError(this.handleError<Item>('addItem'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteItem(id: number): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;

    return this.http.delete<Item>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted item id=${id}`)),
      catchError(this.handleError<Item>('deleteItem'))
    );
  }

  searchItem(item: string): Observable<Item[]> {
    const url = `${this.itemsUrl}/search/${item}`;

    return this.http.post<Item[]>(url,item, this.httpOptions)
            .pipe(
              tap(_ => this.log(`fetched  items`)),
              catchError(this.handleError<Item[]>('searchItems'))
            );
  }

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
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(` TodoItemService: ${message}`);
  }

}