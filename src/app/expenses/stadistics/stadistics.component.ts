import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IncomeOutcome } from 'src/app/models/income-outcome.model';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-stadistics',
  templateUrl: './stadistics.component.html',
  styles: []
})
export class StadisticsComponent implements OnInit, AfterViewInit {

  income = 0;
  outcome = 0;
  totalIncome = 0;
  totalOutcome = 0;
  expenses: IncomeOutcome[] = [];

  @ViewChild('myCanvas', {static: false }) canvasRef: ElementRef;
  context: any;
  barChart: Chart;

  constructor( private store: Store<AppState>, private elementRef: ElementRef) { }

  ngOnInit() {
    this.getAllExpenses();
  }

  /**
   * getAllExpenses
   */
  public getAllExpenses() {
    this.store.select('expenses').subscribe( (exp) => {
      this.expenses = [...exp.items];
      this.generateStadistics( this.expenses );
    });
  }
  /**
   * generateStadistics
   */
  public generateStadistics( expensesList) {
    if (expensesList.length > 0) {
      expensesList.forEach(exp => {
      if (exp.type === 'i') {
          this.income++;
          this.totalIncome += exp.amount;
        }
        if (exp.type === 'o') { 
          this.outcome++;
          this.totalOutcome += exp.amount;
        }
    });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.barChartMethod();
    }, 2000);
  }

  barChartMethod() {
    this.context = this.canvasRef.nativeElement.getContext('2d');
    this.barChart = new Chart(this.context, {
      type: 'bar',
      data: {
        labels: ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'],
        datasets: [{
          label: '# of Votes',
          data: [200, 50, 30, 15, 20, 34],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
