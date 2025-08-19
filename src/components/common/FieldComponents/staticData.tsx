
// Sample data for the BarChart
export const dataBarChart = {
    labels: ['Center -1', 'Center -2', 'Center -3', 'Center -4', 'Center -5', 'Center -6'], // X-axis labels
    datasets: [
      {
        data: [35, 45, 28, 80, 99, 43], // Y-axis data
      },
    ],
  };




export const barChartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0, // Remove decimals
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
    style: {
      borderRadius: 16,
      borderColor: '#dcdcdc',
      borderWidth: 1,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffeb3b',
    },
   
  };
 export const dataLineChat = {
    labels: ['PAR in 30 Days', 'PAR in 60 Days', 'PAR in 90 Days',], // X-axis labels
    datasets: [
      {
        data: [50, 85, 28], // Data for the first line
        strokeWidth: 2, // Line thickness
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Line color (Red)
      },
      {
        data: [ 120, 50, 70], // Data for the second line
        strokeWidth: 2, // Line thickness
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Line color (Blue)
      },
    ],
  };

  export const lineChartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: 'pink',
    decimalPlaces: 0, // Remove decimals
    color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeHeight: '22',
      stroke: '#ffa726',
    },
   
  };


export const pieData = [
    {
        name: "Center PAR 30 Days",  // Label for 30 Days
        population: 29,  // Rupees in actual value (29K rupees)
        color: "rgba(131, 167, 234, 1)",  // Color for this segment
        legendFontColor: "#7F7F7F",  // Color of the legend text
        legendFontSize: 15,  // Font size for legend
        displayValue: "29K"  // Displayed value as "29K"
      },
      {
        name: "Center PAR 60 Days",
        population: 30,
        color: "#4CAF50",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Center PAR 90 Days",
        population: 30,
        color: "#2196F3",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
    
  
  ];

 export const pieChartConfig = {
    backgroundColor: 'transparent',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };