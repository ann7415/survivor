// src/app/charts/line-demo.component.ts
import { Component, signal, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { HeaderComponent } from '../../Header/header.component';
import { FooterComponent } from '../../Footer/footer';
import { HeroComponent } from '../../Components/Hero/hero.component';

@Component({
  selector: 'app-line-demo',
  standalone: true,
  imports: [BaseChartDirective, HeaderComponent, FooterComponent, HeroComponent],
  templateUrl: './dashboard.component.html'
})
export class LineDemoComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  data = signal<ChartConfiguration<'line'>['data']>({
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      { label: 'Vues', data: [120, 200, 150, 300, 280, 350, 400], tension: 0.3, fill: true }
    ]
  });

  options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' }, tooltip: { intersect: false, mode: 'index' } },
    scales: { y: { beginAtZero: true } }
  };

  addPoint(label: string, value: number) {
    const next = structuredClone(this.data());
    next.labels!.push(label);
    next.datasets[0].data.push(value);
    this.data.set(next);
    this.chart?.update();
  }
}
