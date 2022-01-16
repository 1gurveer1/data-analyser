import { Injectable } from '@angular/core';
import { SocketService } from '../../socket.service';
import { Chart, registerables  } from 'chart.js'


@Injectable({
  providedIn: 'any'
})
export class DashboardChartsData {


  constructor(private srv: SocketService) {
    Chart.register(...registerables)
  }



  lists: any;
  temp: any = [];
  humidity: any;
  pressure: any;
  date: any;
  chart: any = [];

  


  initMainChart() {

    


    this.srv.listen('tempdata').subscribe((res) => {



      this.lists = res;
      console.log(this.lists)

      this.temp = this.lists.map((item: any) => item.temp)
      this.humidity = this.lists.map((item: any) => item.humidity)
      this.pressure = this.lists.map((item: any) => item.pressure)

      let dates = this.lists.map((item: any) => item.date)
      let newdate: any = []

      dates.forEach((res: any) => {
        let realdate = new Date(res * 1000)
        newdate.push(realdate.toLocaleTimeString('en', { day: 'numeric', month: 'short' }))
        this.date = newdate
      })

      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.date,
          datasets: [

            {
              label: 'Current Temperature',
              data: this.temp,
              borderColor: 'green',
              backgroundColor: 'lightgreen'
            },
            {
              label: 'Current Temperature',
              data: this.humidity,
              borderColor: 'green',
              backgroundColor: 'lightgreen'
            },
            {
              label: 'Current Temperature',
              data: this.pressure,
              borderColor: 'green',
              backgroundColor: 'lightgreen'
            },


          ]
        },

      })

    })


  }

}
