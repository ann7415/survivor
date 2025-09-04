/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** projects.component
*/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Subject, takeUntil, combineLatest } from 'rxjs';

import { HeaderComponent } from '../../Header/header.component';
import { HeroComponent } from '../../Components/Hero/hero.component';
import { ProjectComponent } from '../../Components/Project Card/project.component';
import { FooterComponent } from '../../Footer/footer';
import { DropdownMenuComponent } from '../../Components/Menu/dropdown_menu';
import { SortDropdownComponent, SortOption } from '../../Components/Menu/sort_dropdown';

import { StartupsService } from '../../services/startups.service';
import { Startup } from '../../models/startup';
import { FilterService } from '../../services/filter.service';

@Component({
    selector: 'app-projects',
    standalone: true,
    styleUrls: ['./projects.component.css'],
    templateUrl: './projects.component.html',
    imports: [
        CommonModule,
        HttpClientModule,
        HeaderComponent, 
        HeroComponent, 
        ProjectComponent, 
        FooterComponent, 
        DropdownMenuComponent, 
        SortDropdownComponent
    ],
    providers: [StartupsService, FilterService]
})
export class ProjectsPage implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();
    
    allStartups: Startup[] = [];
    filteredStartups: Startup[] = [];
    
    locationOptions: string[] = [];
    sectorOptions: string[] = [];
    
    selectedLocations: string[] = [];
    selectedSectors: string[] = [];
    currentSort: SortOption = 'none';
    
    isLoading = true;
    errorMessage = '';

    constructor(
        private startupService: StartupsService,
        private filterService: FilterService
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
            this.startupService.getLocations(),
            this.startupService.getSectors()
        ]).pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: ([startups, locations, sectors]) => {
                this.allStartups = startups;
                this.locationOptions = locations;
                this.sectorOptions = sectors;
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
                this.applyCurrentFilters();
            });
    }

    private applyCurrentFilters(): void {
        const filters = this.filterService.getCurrentFilters();
        let filteredStartups = [...this.allStartups];

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

        this.filteredStartups = filteredStartups;
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
    }


    retryLoadData(): void {
        this.errorMessage = '';
        this.loadData();
    }
}
