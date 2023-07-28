import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Move the socket declaration inside the class
  private socket = io("http://192.168.1.36:3000");
  public chart: any;
  public chart2: any;
  public currentWaterLevel: number = 100; // Inicialmente el nivel de agua es 0
  temperatures: number[] = []; // Array para almacenar las temperaturas recibidas
  hours: string[] = []; // Array para almacenar las horas recibidas
  maxDataPoints = 10; // Máximo número de puntos de datos en el gráfico
  humedad: number[] = [];
  constructor() {
    // send a message to the server
    this.socket.emit("hello from client");

    // receive a message from the server
    this.socket.on('hello from server', (data: any) => {
      //console.log(data);
      this.updateChart(data); // Actualizar la gráfica con los nuevos datos
    });
  }

  ngOnInit(): void {
    this.createChart();
    this.createChart2();
  }
  createChart() {
    this.chart = new Chart("chart1", {
      type: 'line', // this denotes the type of chart
  
      data: {
        labels: this.hours,
        datasets: [
          {
            data: this.temperatures,
            label: "Temperatura",
            borderColor: "rgba(60, 186, 159, 1)", // Color de la línea (en formato RGBA)
            backgroundColor: "rgba(60, 186, 159, 0.2)", // Color del área debajo de la línea (en formato RGBA)
            fill: false, // Rellenar el área debajo de la línea
            tension: 0.4, // Controla la suavidad de las líneas del gráfico (0 es menos suave, 1 es más suave)
            borderWidth: 2, // Ancho del borde de la línea del gráfico
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Gráfico de Temperatura', // Título del gráfico
            font: {
              size: 20, // Tamaño de fuente del título
              weight: 'bold' // Grosor del título (normal, bold, etc.)
            }
          },
          legend: {
            display: false, // Ocultar la leyenda completa
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Hora', // Título del eje X
              font: {
                size: 15 // Tamaño de fuente del título del eje X
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)' // Color de las líneas verticales del fondo (en formato RGBA)
            }
          },
          y: {
            title: {
              display: true,
              text: 'Temperatura (°C)', // Título del eje Y
              font: {
                size: 15 // Tamaño de fuente del título del eje Y
              }
            },
            grid: {
              color: 'rgba(0, 0, 255, 0.1)' // Color de las líneas horizontales del fondo (en formato RGBA)
            },
            suggestedMin: 20, // Valor mínimo sugerido para el eje Y
            suggestedMax: 35 // Valor máximo sugerido para el eje Y
          }
        },
        elements: {
          point: {
            radius: 1 // Ocultar los puntos de los datos en la línea
          }
        }
      }
    });
  }
  
  createChart2() {   
    this.chart2 = new Chart("chart2",{
      type: 'line', // this denotes the type of chart
  
      data: {
        labels: this.hours,
        datasets: [
          {
            data: this.temperatures,
            label: "Humedad",
            borderColor: "rgba(60, 186, 159, 1)", // Color de la línea (en formato RGBA)
            fill: false, // Rellenar el área debajo de la línea
            tension: 0.4, // Controla la suavidad de las líneas del gráfico (0 es menos suave, 1 es más suave)
            borderWidth: 2, // Ancho del borde de la línea del gráfico
          }
        ]
      },
      
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Gráfico de Humedad', // Título del gráfico
            font: {
              size: 20, // Tamaño de fuente del título
              weight: 'bold' // Grosor del título (normal, bold, etc.)
            }
          },
          legend: {
            display: false, // Ocultar la leyenda completa
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Hora', // Título del eje X
              font: {
                size: 15 // Tamaño de fuente del título del eje X
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)' // Color de las líneas verticales del fondo (en formato RGBA)
            }
          },
          y: {
            title: {
              display: true,
              text: 'Humedad', // Título del eje Y
              font: {
                size: 15 // Tamaño de fuente del título del eje Y
              }
            },
            grid: {
              color: 'rgba(0, 0, 255, 0.1)' // Color de las líneas horizontales del fondo (en formato RGBA)
            },
            suggestedMin: 20, // Valor mínimo sugerido para el eje Y
            suggestedMax: 70 // Valor máximo sugerido para el eje Y
          }
        },
        elements: {
          point: {
            radius: 1 // Ocultar los puntos de los datos en la línea
          }
        }
      }
    });
  }
  updateChart(data: any) {
    // Obtener la hora y temperatura desde los datos recibidos
    const hour = data.dateHour.hour;
    const temperature = data.temp;
    const hum = data.hum;
    const waterLevel = data.waterLevel;
    // Agregar la hora y temperatura a los arrays
    this.hours.push(hour);
    this.temperatures.push(temperature);
    this.humedad.push(hum);
    // Verificar si se ha alcanzado el máximo número de puntos de datos
    if (this.hours.length > this.maxDataPoints) {
      // Si se alcanzó el máximo, eliminar el primer elemento de cada array
      this.hours.shift();
      this.temperatures.shift();
      this.humedad.shift();
    }
    //console.log("Actu: " + this.humedad);
    // Actualizar los datos del gráfico
    this.currentWaterLevel = waterLevel;
    this.chart.data.labels = this.hours;
    this.chart.data.datasets[0].data = this.temperatures;
    this.chart2.data.labels = this.hours;
    this.chart2.data.datasets[0].data = this.humedad;
    // Actualizar el gráfico
    this.chart.update();
    this.chart2.update();
  }
}
