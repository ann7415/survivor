import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { StartupDto } from './startup.service';

export interface FilterState {
  locations: string[];
  sectors: string[];
  sortOption: 'none' | 'alphabetical' | 'reverse-alphabetical';
  searchText: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterState = new BehaviorSubject<FilterState>({
    locations: [],
    sectors: [],
    sortOption: 'none',
    searchText: ''
  });

  public filterState$ = this.filterState.asObservable();

  constructor() {}

  updateLocationFilter(locations: string[]): void {
    const currentState = this.filterState.value;
    this.filterState.next({
      ...currentState,
      locations
    });
  }

  updateSectorFilter(sectors: string[]): void {
    const currentState = this.filterState.value;
    this.filterState.next({
      ...currentState,
      sectors
    });
  }

  updateSortOption(sortOption: 'none' | 'alphabetical' | 'reverse-alphabetical'): void {
    const currentState = this.filterState.value;
    this.filterState.next({
      ...currentState,
      sortOption
    });
  }

  updateSearchText(searchText: string): void {
    const currentState = this.filterState.value;
    this.filterState.next({
      ...currentState,
      searchText
    });
  }

  resetFilters(): void {
    this.filterState.next({
      locations: [],
      sectors: [],
      sortOption: 'none',
      searchText: ''
    });
  }

  applyFilters(startups: StartupDto[]): Observable<StartupDto[]> {
    return this.filterState$.pipe(
      map(filters => {
        let filteredStartups = [...startups];

        if (filters.locations.length > 0) {
          filteredStartups = filteredStartups.filter(startup => 
            filters.locations.includes(startup.location)
          );
        }

        if (filters.sectors.length > 0) {
          filteredStartups = filteredStartups.filter(startup => 
            filters.sectors.includes(startup.sector)
          );
        }

        if (filters.searchText.trim()) {
          const searchLower = filters.searchText.toLowerCase();
          filteredStartups = filteredStartups.filter(startup => 
            startup.name.toLowerCase().includes(searchLower) ||
            startup.description.toLowerCase().includes(searchLower) ||
            startup.sector.toLowerCase().includes(searchLower)
          );
        }

        switch (filters.sortOption) {
          case 'alphabetical':
            filteredStartups.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'reverse-alphabetical':
            filteredStartups.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case 'none':
          default:
            filteredStartups.sort((a, b) => 
              new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
            );
            break;
        }

        return filteredStartups;
      })
    );
  }

  getCurrentFilters(): FilterState {
    return this.filterState.value;
  }
}
