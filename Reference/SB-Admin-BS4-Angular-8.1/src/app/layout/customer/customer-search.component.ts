import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Customer } from '../../core/model/customer';
import { CustomerService } from '../../core/service/customer.service';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent {

  customers$!: Observable<Customer[]>;
  private searchTerms = new Subject<string>();

  constructor(private customerService: CustomerService) {}
  
  ngOnInit(): void {
    this.customers$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.customerService.searchCustomeres(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}