import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Supplier } from '../../core/model/supplier';
import { SupplierService } from '../../core/service/supplier.service';

@Component({
  selector: 'app-supplier-search',
  templateUrl: './supplier-search.component.html',
  styleUrls: ['./supplier-search.component.scss']
})
export class SupplierSearchComponent {

  suppliers$!: Observable<Supplier[]>;
  private searchTerms = new Subject<string>();

  constructor(private supplierService: SupplierService) {}
  
  ngOnInit(): void {
    this.suppliers$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.supplierService.searchSupplieres(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
