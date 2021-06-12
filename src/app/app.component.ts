import { Component } from '@angular/core';
import { SearchService } from './services/search.service';
import { debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stg';

  constructor(
    private searchService: SearchService
  ) { }

  suggestion: any = [];
  result: any = [];
  isListView: boolean = false;
  showSpinner: boolean = false;

  public searchInput = '';
  showSug: boolean = false;

  searchSugg() {
    this.suggestion = [];
    if (this.searchInput.length > 2) {
      this.showSpinner = true;
      this.searchService.search(this.searchInput)
        .pipe(
          debounceTime(500),
          distinctUntilChanged())
        .subscribe(
          (res) => {
            this.showSug = true;
            this.suggestion = res;
          },
          () => { },
          () => this.showSpinner = false
        );
    }
  }

  search() {
    this.showSug = false;
    if (this.searchInput.length > 2) {
      this.showSpinner = true;
      this.searchService.search(this.searchInput)
        .pipe(
          debounceTime(500),
          distinctUntilChanged())
        .subscribe(
          (res: any) => {
            this.result = res.map((x: any) => {
              return {
                ...x,
                body: x?.body?.length || 0 > 64 ? x.body.slice(0, 64) + '...' : x.body
              }
            })?.splice(0, 20);
          },
          () => { },
          () => this.showSpinner = false
        );
    }
  }
}
