/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** dashboard.component.ts
*/
// src/app/charts/line-demo.component.ts
import { Component, signal, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class dashboardPage {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  data = signal<ChartConfiguration<'line'>['data']>({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [120, 200, 150, 300, 280, 350, 400],
        tension: 0.3,
        fill: false
      }
    ]
  });
// data = signal<ChartConfiguration<'line'>['data']>({
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     datasets: [
//       {
//         label: 'Views per day',
//         data: [120, 200, 150, 300, 280, 350, 400],
//         tension: 0.3,
//         fill: false,
        
        // Dégradé dynamique (sera mis à jour dans ngAfterViewInit)
  //       borderColor: this.getCSSVariable('--color-primary'),
  //       backgroundColor: (context) => {
  //         const chart = context.chart;
  //         const { ctx } = chart;
  //         return this.createGradient(ctx);
  //       },
        
  //       pointBackgroundColor: this.getCSSVariable('--color-primary'),
  //       pointBorderColor: this.getCSSVariable('--color-surface'),
  //       pointHoverBackgroundColor: this.getCSSVariable('--color-secondary'),
  //       pointHoverBorderColor: this.getCSSVariable('--color-primary'),
  //       borderWidth: 3,
  //       pointRadius: 6,
  //       pointHoverRadius: 8,
  //       pointBorderWidth: 2,
  //     }
  //   ]
  // });

  options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: {display: false}, tooltip: { intersect: false, mode: 'index' } },
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
