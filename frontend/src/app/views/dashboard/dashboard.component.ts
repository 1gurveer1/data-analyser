import { Component } from '@angular/core';
import { SocketService } from '../../socket.service';
import { Chart, registerables } from 'chart.js'
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component'


@Component({
  selector: 'app-root',
  templateUrl: './graph.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent   {

  lists: any;
  temp: any = [];
  humidity: any;
  pressure: any;
  date: any;
  chart: any = [];
  

  constructor(private srv: SocketService) {
    Chart.register(...registerables)
    
    
  }

  ngOnInit() {

    WidgetsDropdownComponent
    

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


      this.chart = new Chart('chart', {
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
            {
              label: 'Humidity',
              data: this.humidity,
              borderColor: 'green',
              backgroundColor: 'lightgreen',
              fill: true
            },
            {
              label: 'Pressure',
              data: this.pressure,
              borderColor: 'red',
              backgroundColor: 'lightpink',
              fill: true
            },


          ]
        },

      })

    })
  }


}
