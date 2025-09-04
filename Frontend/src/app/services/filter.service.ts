import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Startup } from '../models/startup';
import { Event } from '../models/event';
import { EventsService } from './events.service';

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

  constructor(private eventsService: EventsService) {}

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

  applyFilters(startups: Startup[]): Observable<Startup[]> {
    return this.filterState$.pipe(
      map(filters => {
        let filteredStartups = [...startups];

        if (filters.locations.length > 0) {
          filteredStartups = filteredStartups.filter(startup => {
            const startupCountry = this.extractCountryFromLocation(startup.location);
            return filters.locations.includes(startupCountry);
          });
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

  private extractCountryFromLocation(location: string): string {
    if (!location) return '';
    
    // Supprimer les espaces en début et fin
    const trimmed = location.trim();
    
    // Séparer par virgule et prendre le dernier élément (généralement le pays)
    const parts = trimmed.split(',');
    let country = parts[parts.length - 1].trim();
    
    // Nettoyer le pays : supprimer les numéros, codes postaux, etc.
    country = country
      .replace(/\d+/g, '') // Supprimer tous les chiffres
      .replace(/\s+/g, ' ') // Remplacer les espaces multiples par un seul
      .trim(); // Supprimer les espaces en début/fin
    
    // Si le pays est vide après nettoyage, essayer l'avant-dernier élément
    if (!country && parts.length > 1) {
      country = parts[parts.length - 2].trim()
        .replace(/\d+/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    }
    
    return country;
  }

  getAllCountries(startups: Startup[]): Observable<string[]> {
    return this.eventsService.getEvents().pipe(
      map(events => {
        // Récupérer les locations des startups et extraire les pays
        const startupCountries = startups
          .map(s => this.extractCountryFromLocation(s.location))
          .filter(Boolean);
        
        // Récupérer les locations des events et extraire les pays
        const eventCountries = events
          .map(e => this.extractCountryFromLocation(e.location))
          .filter(Boolean);
        
        // Combiner et supprimer les doublons
        const allCountries = [...new Set([...startupCountries, ...eventCountries])];
        
        return allCountries.sort();
      })
    );
  }

  getAllSectors(startups: Startup[]): Observable<string[]> {
    return this.eventsService.getEvents().pipe(
      map(events => {
        // Récupérer les secteurs des startups
        const startupSectors = startups
          .map(s => s.sector)
          .filter(Boolean);
        
        // Récupérer les types des events (qui correspondent aux secteurs)
        const eventSectors = events
          .map(e => e.type)
          .filter(Boolean);
        
        // Combiner et supprimer les doublons
        const allSectors = [...new Set([...startupSectors, ...eventSectors])];
        
        return allSectors.sort();
      })
    );
  }
}
