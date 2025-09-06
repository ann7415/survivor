/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** news-detail.component
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../Header/header.component';
import { FooterComponent } from '../../Footer/footer';
import { Button } from '../../Components/Button/button.component';
import { NewsService } from '../../services/news.service';
import { AuthService } from '../../services/auth.service';
import { News } from '../../models/news';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css'],
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    Button
  ],
})
export class NewsDetailComponent implements OnInit {
  news: News | null = null;
  loading = true;
  error: string | null = null;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = true; //this.authService.hasRole('Admin');
    this.loadNewsDetail();
  }

  private loadNewsDetail(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'Invalid news ID';
      this.loading = false;
      return;
    }

    this.newsService.getNewsById(id).subscribe({
      next: (news) => {
        this.news = news;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading news details:', error);
        this.error = 'Failed to load news details';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/news']);
  }

  editNews(): void {
    if (this.news) {
      this.router.navigate(['/news', this.news.id, 'edit']);
    }
  }

  deleteNews(): void {
    if (!this.news) return;

    if (confirm('Are you sure you want to delete this news?')) {
      this.newsService.deleteNews(this.news.id).subscribe({
        next: () => {
          this.router.navigate(['/news']);
        },
        error: (error) => {
          console.error('Error deleting news:', error);
          this.error = 'Failed to delete news';
        }
      });
    }
  }

  getImageUrl(): string {
    if (!this.news) return '/assets/images/default.png';

    if (this.news.imageUrls && this.news.imageUrls.length > 0) {
      return `http://localhost:5000${this.news.imageUrls[0]}`;
    }

    return '/assets/images/default.png';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
