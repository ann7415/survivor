/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** news.component
*/

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardNewsComponent } from '../../Components/News Card/cardNews.component';
import { HeaderComponent } from '../../Header/header.component';
import { HeroComponent } from '../../Components/Hero/hero.component';
import { FooterComponent } from '../../Footer/footer';
import { NewsService } from '../../services/news.service';
import { AuthService } from '../../services/auth.service';
import { News, NewsCreate } from '../../models/news';
import {Button} from '../../Components/Button/button.component';

@Component({
  selector: 'app-news',
  standalone: true,
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    CardNewsComponent,
    HeaderComponent,
    HeroComponent,
    FooterComponent,
    Button,
    CardNewsComponent
  ],
})
export class NewsPage implements OnInit {

  news: News[] = [];
  filteredNews: News[] = [];

  loading = true;
  error: string | null = null;

  currentPage = 1;
  pageSize = 3;
  totalPages = 1;

  isAdmin = false;
  showCreateForm = false;
  newNews: NewsCreate = { title: '', description: '', location: '', startup_id: 0, category: '', isPublished: true, imageUrl: '' };

  constructor(
    private newsService: NewsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadNews();
  }

  private loadNews(): void {
    this.loading = true;
    this.error = null;

    this.newsService.getNews().subscribe({
      next: (news) => {
        this.news = news.map(n => ({
          ...n,
          publishDate: n.publishDate,
          category: n.category
        }));
        this.filteredNews = [...this.news];
        this.totalPages = Math.ceil(this.filteredNews.length / this.pageSize);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading news:', error);
        this.error = 'Failed to load news';
        this.loading = false;
      }
    });
  }

  getPaginatedNews(): News[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredNews.slice(start, start + this.pageSize);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  nextPage(): void { this.goToPage(this.currentPage + 1); }
  prevPage(): void { this.goToPage(this.currentPage - 1); }

  createNews(): void {
    if (!this.newNews.title || !this.newNews.category) return;

    this.newsService.createNews(this.newNews).subscribe({
      next: (created) => {
        this.news.unshift(created);
        this.filteredNews = [...this.news];
        this.totalPages = Math.ceil(this.filteredNews.length / this.pageSize);
        this.clearCreateForm();
      },
      error: (err) => console.error(err)
    });
  }

  private clearCreateForm(): void {
    this.newNews = { title: '', description: '', location: '', startup_id: 0, category: '', isPublished: true, imageUrl: '' };
    this.showCreateForm = false;
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
  }

  getImageUrl(news: any): string {
    if (news.imageUrl) {
      return `http://localhost:5000${news.imageUrl}`;
    }
    if (news.id) {
      return `http://localhost:5000/api/news/${news.id}/image`;
    }
    return 'assets/images/default-news.png';
  }

  getNewsCards(): News[] {
    return this.getPaginatedNews();
  }

  trackByNewsId(index: number, news: News): number {
    return news.id;
  }
}
