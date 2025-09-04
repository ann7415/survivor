/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** search.component
*/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, takeUntil, combineLatest } from 'rxjs';

import { HeaderComponent } from '../../Header/header.component';
import { FooterComponent } from '../../Footer/footer';
import { DropdownMenuComponent } from '../../Components/Menu/dropdown_menu';
import { SearchbarComponent } from '../../Components/SearchBar/searchbar';
import { HeroComponent } from '../../Components/Hero/hero.component';
import { ProjectComponent } from '../../Components/Project Card/project.component';
import { SortDropdownComponent, SortOption } from '../../Components/Menu/sort_dropdown';

import { StartupsService } from '../../services/startups.service';
import { EventsService } from '../../services/events.service';
import { Startup } from '../../models/startup';
import { Event } from '../../models/event';
import { FilterService } from '../../services/filter.service';

@Component({
    selector: 'app-search',
    standalone: true,
    styleUrls: ['./search.component.css'],
    templateUrl: './search.component.html',
    imports: [
        CommonModule,
        HttpClientModule,
        HeaderComponent, 
        DropdownMenuComponent, 
        SearchbarComponent, 
        FooterComponent, 
        HeroComponent, 
        ProjectComponent,
        SortDropdownComponent
    ],
    providers: [StartupsService, EventsService, FilterService]
})
export class SearchPage implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();
    
    allStartups: Startup[] = [];
    allEvents: Event[] = [];
    filteredStartups: Startup[] = [];
    filteredEvents: Event[] = [];
    
    locationOptions: string[] = [];
    sectorOptions: string[] = [];
    
    selectedLocations: string[] = [];
    selectedSectors: string[] = [];
    currentSort: SortOption = 'none';
    searchValue: string = '';
    
    isLoading = true;
    errorMessage = '';

    constructor(
        private startupService: StartupsService,
        private eventsService: EventsService,
        private filterService: FilterService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadData();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private loadData(): void {
        this.isLoading = true;
        
        combineLatest([
            this.startupService.getStartups(),
            this.eventsService.getEvents()
        ]).pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: ([startups, events]) => {
                this.allStartups = startups;
                this.allEvents = events;
                
                this.filterService.getAllCountries(startups).pipe(
                    takeUntil(this.destroy$)
                ).subscribe(locations => {
                    this.locationOptions = locations;
                });
                
                this.filterService.getAllSectors(startups).pipe(
                    takeUntil(this.destroy$)
                ).subscribe(sectors => {
                    this.sectorOptions = sectors;
                });
                
                this.isLoading = false;
                
                this.setupFilterSubscription();
                this.applyCurrentFilters();
            },
            error: (error) => {
                console.error('Error loading data:', error);
                this.errorMessage = 'Error loading data';
                this.isLoading = false;
            }
        });
    }

    private setupFilterSubscription(): void {
        this.filterService.filterState$
            .pipe(takeUntil(this.destroy$))
            .subscribe(filters => {
                this.searchValue = filters.searchText;
                this.applyCurrentFilters();
            });
    }

    private applyCurrentFilters(): void {
        const filters = this.filterService.getCurrentFilters();
        
        let filteredStartups = [...this.allStartups];
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
        
        let filteredEvents = [...this.allEvents];
        if (filters.locations.length > 0) {
            filteredEvents = filteredEvents.filter(event => {
                const eventCountry = this.extractCountryFromLocation(event.location);
                return filters.locations.includes(eventCountry);
            });
        }
        if (filters.sectors.length > 0) {
            filteredEvents = filteredEvents.filter(event => 
                filters.sectors.includes(event.type)
            );
        }
        if (filters.searchText.trim()) {
            const searchLower = filters.searchText.toLowerCase();
            filteredEvents = filteredEvents.filter(event => 
                event.title.toLowerCase().includes(searchLower) ||
                event.description.toLowerCase().includes(searchLower) ||
                event.type.toLowerCase().includes(searchLower)
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
        
        switch (filters.sortOption) {
            case 'alphabetical':
                filteredEvents.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'reverse-alphabetical':
                filteredEvents.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'none':
            default:
                filteredEvents.sort((a, b) => 
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                break;
        }

        this.filteredStartups = filteredStartups;
        this.filteredEvents = filteredEvents;
    }

    onSearchChange(value: string): void {
        this.searchValue = value;
        this.filterService.updateSearchText(value);
    }

    onLocationFilterChange(value: string | string[]): void {
        this.selectedLocations = Array.isArray(value) ? value : [value];
        this.filterService.updateLocationFilter(this.selectedLocations);
    }

    onSectorFilterChange(value: string | string[]): void {
        this.selectedSectors = Array.isArray(value) ? value : [value];
        this.filterService.updateSectorFilter(this.selectedSectors);
    }

    onSortChange(sortOption: SortOption): void {
        this.currentSort = sortOption;
        this.filterService.updateSortOption(sortOption);
    }

    resetAllFilters(): void {
        this.filterService.resetFilters();
        this.selectedLocations = [];
        this.selectedSectors = [];
        this.currentSort = 'none';
        this.searchValue = '';
    }

    retryLoadData(): void {
        this.errorMessage = '';
        this.loadData();
    }

    private extractCountryFromLocation(location: string): string {
        if (!location) return '';
        
        const trimmed = location.trim();
        
        const parts = trimmed.split(',');
        let country = parts[parts.length - 1].trim();
        
        country = country
          .replace(/\d+/g, '')
          .replace(/\s+/g, ' ')
          .trim();

        if (!country && parts.length > 1) {
          country = parts[parts.length - 2].trim()
            .replace(/\d+/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        }
        
        return country;
    }

    onCardClick(event: {id: number, type: 'startup' | 'event'}): void {
        if (event.type === 'startup') {
            this.router.navigate(['/startup', event.id]);
        } else if (event.type === 'event') {
            this.router.navigate(['/event', event.id]);
        }
    }
}
