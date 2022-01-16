import { Component } from '@angular/core';
import { SocketService } from '../../../socket.service';
import { Chart, registerables } from 'chart.js'

@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.css'],

})
export class WidgetsDropdownComponent   {

  constructor(private srv: SocketService) {
    Chart.register(...registerables)
  }

  lists: any;
  temp: any = [];
  humidity: any;
  pressure: any;
  date: any;
  chart1: any = [];
  chart2: any = [];
  chart3: any = [];

  ngOnInit() {
    this.srv.listen('tempdata').subscribe((res) => {


      this.lists = res;

      console.log(this.lists)

      this.temp = this.lists.map((item: any) => item.temp - 273)
      this.humidity = this.lists.map((item: any) => item.humidity)
      this.pressure = this.lists.map((item: any) => item.pressure - 900)

      let dates = this.lists.map((item: any) => item.date)
      let newdate: any = []

      dates.forEach((res: any) => {
        let realdate = new Date(res * 1000)
        newdate.push(realdate.toLocaleTimeString('en', { day: 'numeric', month: 'short' }))
        this.date = newdate
      })


      this.chart1 = new Chart('temp', {
        type: 'line',
        data: {
          labels: newdate,
          datasets: [

            {
              label: 'Temperature',
              data: this.temp,
              borderColor: 'blue',
              backgroundColor: 'lightblue',
              fill: true
            },

          ]
        },

      })

      this.chart2 = new Chart('humidity', {
        type: 'line',
        data: {
          labels: newdate,
          datasets: [

            {
              label: 'Humidity',
              data: this.temp,
              borderColor: 'blue',
              backgroundColor: 'lightblue',
              fill: true
            },

          ]
        },

      })

      this.chart3 = new Chart('Pressure', {
        type: 'line',
        data: {
          labels: newdate,
          datasets: [

            {
              label: 'Pressure',
              data: this.temp,
              borderColor: 'blue',
              backgroundColor: 'lightblue',
              fill: true
            },

          ]
        },

      })

    })

    
  }
  
}
