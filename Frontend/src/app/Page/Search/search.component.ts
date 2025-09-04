import { Component } from '@angular/core';
import { HeaderComponent } from '../../Header/header.component';
import { FooterComponent } from '../../Footer/footer';
import { DropdownMenuComponent } from '../../Components/Menu/dropdown_menu';
import { SearchbarComponent } from '../../Components/SearchBar/searchbar';
import { SearchService } from './search.service';
import { HeroComponent } from '../../Components/Hero/hero.component';
import { ProjectComponent } from '../../Components/Project Card/project.component';

@Component({
    selector: 'app-search',
    standalone: true,
    styleUrls: ['./search.component.css'],
    templateUrl: './search.component.html',
    imports: [HeaderComponent, DropdownMenuComponent, SearchbarComponent, FooterComponent, HeroComponent, ProjectComponent],
})
export class SearchPage {
    searchValue: string = '';
    selectedFilter1: string[] = [];
    selectedFilter2: string[] = [];
    results: any[] = [];

    constructor(private searchService: SearchService) {}

    onSearchChange(value: string) {
        this.searchValue = value;
        
        this.searchService.search(this.searchValue, this.selectedFilter1.join(','), this.selectedFilter2.join(','))
            .subscribe((results: any) => {
                this.results = results;
                console.log('Résultats:', results);
            });
        
        console.log('Recherche:', value, 'Filter1:', this.selectedFilter1, 'Filter2:', this.selectedFilter2);
    }

    onFilter1Change(value: string | string[]) {
        this.selectedFilter1 = Array.isArray(value) ? value : [value];
        console.log('Filter1 changé:', this.selectedFilter1);
    }

    onFilter2Change(value: string | string[]) {
        this.selectedFilter2 = Array.isArray(value) ? value : [value];
        console.log('Filter2 changé:', this.selectedFilter2);
    }
}
