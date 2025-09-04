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

  /**
   * Met à jour les localisations sélectionnées
   */
  updateLocationFilter(locations: string[]): void {
    const currentState = this.filterState.value;
    this.filterState.next({
      ...currentState,
      locations
    });
  }

  /**
   * Met à jour les secteurs sélectionnés
   */
  updateSectorFilter(sectors: string[]): void {
    const currentState = this.filterState.value;
    this.filterState.next({
      ...currentState,
      sectors
    });
  }

  /**
   * Met à jour l'option de tri
   */
  updateSortOption(sortOption: 'none' | 'alphabetical' | 'reverse-alphabetical'): void {
    const currentState = this.filterState.value;
    this.filterState.next({
      ...currentState,
      sortOption
    });
  }

  /**
   * Met à jour le texte de recherche
   */
  updateSearchText(searchText: string): void {
    const currentState = this.filterState.value;
    this.filterState.next({
      ...currentState,
      searchText
    });
  }

  /**
   * Réinitialise tous les filtres
   */
  resetFilters(): void {
    this.filterState.next({
      locations: [],
      sectors: [],
      sortOption: 'none',
      searchText: ''
    });
  }

  /**
   * Applique les filtres et le tri à une liste de startups
   */
  applyFilters(startups: StartupDto[]): Observable<StartupDto[]> {
    return this.filterState$.pipe(
      map(filters => {
        let filteredStartups = [...startups];

        // Appliquer le filtre de localisation
        if (filters.locations.length > 0) {
          filteredStartups = filteredStartups.filter(startup => 
            filters.locations.includes(startup.location)
          );
        }

        // Appliquer le filtre de secteur
        if (filters.sectors.length > 0) {
          filteredStartups = filteredStartups.filter(startup => 
            filters.sectors.includes(startup.sector)
          );
        }

        // Appliquer le filtre de recherche textuelle
        if (filters.searchText.trim()) {
          const searchLower = filters.searchText.toLowerCase();
          filteredStartups = filteredStartups.filter(startup => 
            startup.name.toLowerCase().includes(searchLower) ||
            startup.description.toLowerCase().includes(searchLower) ||
            startup.sector.toLowerCase().includes(searchLower)
          );
        }

        // Appliquer le tri
        switch (filters.sortOption) {
          case 'alphabetical':
            filteredStartups.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'reverse-alphabetical':
            filteredStartups.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case 'none':
          default:
            // Garder l'ordre original (ou tri par date de création par défaut)
            filteredStartups.sort((a, b) => 
              new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
            );
            break;
        }

        return filteredStartups;
      })
    );
  }

  /**
   * Obtient l'état actuel des filtres
   */
  getCurrentFilters(): FilterState {
    return this.filterState.value;
  }
}
