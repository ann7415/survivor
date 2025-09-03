import { Component } from '@angular/core';
import { HeaderComponent } from '../../Header/header.component';
import { FooterComponent } from '../../Footer/footer';
import { DropdownMenuComponent } from '../../Components/Menu/dropdown_menu';
import { SearchbarComponent } from '../../Components/SearchBar/searchbar';
import { SearchService } from './search.service';

@Component({
    selector: 'app-search',
    standalone: true,
    styleUrls: ['./search.component.css'],
    templateUrl: './search.component.html',
    imports: [HeaderComponent, DropdownMenuComponent, SearchbarComponent, FooterComponent],
})
export class SearchPage {
    searchValue: string = '';
    selectedFilter1: string = '';
    selectedFilter2: string = '';
    results: any[] = [];

    constructor(private searchService: SearchService) {}

    onSearchChange(value: string) {
        this.searchValue = value;
        
        this.searchService.search(this.searchValue, this.selectedFilter1, this.selectedFilter2)
            .subscribe((results: any) => {
                this.results = results;
                console.log('Résultats:', results);
            });
        
        console.log('Recherche:', value, 'Filter1:', this.selectedFilter1, 'Filter2:', this.selectedFilter2);
    }

    onFilter1Change(value: string) {
        this.selectedFilter1 = value;
        console.log('Filter1 changé:', value);
    }

    onFilter2Change(value: string) {
        this.selectedFilter2 = value;
        console.log('Filter2 changé:', value);
    }
}
