

// Assigning the url to a constant calue for future use 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch data from the specified URL and assigns the returned promise to the dataDemographic variable. 
// Then, it logs a message to the console, printing the value of dataDemographic for debugging purpose only
const dataDemographic = d3.json(url);
console.log("Demographic data: ", dataDemographic);



// BarChart Function
function barChart(testId) {
    d3.json(url).then(function(data) {
    console.log(data);

    // Finding the samples and metadata for the given testId
    let samples = data.samples.find(d => d.id == testId);
    
    // Extracting necessary data for the chart
    let values = samples.sample_values;
    let otu_ids = samples.otu_ids;
    let otu_labels = samples.otu_labels;

    // Selecting the top 10 values and reversing the order
    let x_data = values.slice(0,10).reverse();
    let y_data = otu_ids.slice(0,10).reverse();
    let y_label = y_data.map(y_label => "OTU " + y_label) 
    
    // Creating the bar chart data object
    let bardata = [{
      x: x_data,
      y: y_label,
      type: 'bar',
      orientation:'h',
      hovertext: otu_labels
    }];

  // Creating the layout for the bar chart 
  // let layout = {
  //   /title: "my Title"
    
  // };
  
  Plotly.newPlot("bar", bardata);
    
})};

// Bubble Chart 
function bubbleChart(testId) { 
d3.json(url).then(function(data) {
  console.log(data);

  // Extracting necessary data for the chart
  let samples = data.samples.find(d => d.id == testId);
  console.log(testId)
  let values = samples.sample_values;
  let otu_ids = samples.otu_ids;
  let otu_labels = samples.otu_labels;

  // Setting the x and y data for the bubble chart
  let y_data = values;
  let x_data = otu_ids;

  // Creating the bubble chart data object    
let bubbledata = [{
    x: x_data,
    y: y_data,
    mode: 'markers',
    showlegend: false,
    hovertext: otu_labels,    
    marker: { size: y_data,
              colorscale: 'Earth',
              color: x_data,
              text: otu_labels          
              }
    
}];

  // Creating the layout for the bubble chart 
  let layout = {
    // title: "my Title",
    xaxis: {
      title: 'OTU ID'
      
    },
    height: 1000,
    width: 1000
  };
  
  Plotly.newPlot("bubble", bubbledata, layout);

})
};

// Select Data 

function changeDemogInfo(newId) {
d3.json(url).then(function(data) {
  console.log(data);

  // Find the index of the newId in the 'names' array
  let indexId = data.names.indexOf(newId);
  // console.log(data.names.indexOf(newId));

  // Clear existing content in the '#sample-metadata' element
  d3.select("#sample-metadata").html("");

  // Iterate over the key-value pairs of the metadata for the selected indexId
  for (const [j,i] of Object.entries(data.metadata[indexId])) {
    d3.select("#sample-metadata").append('div').text(`${j} : ${i}`).exit().remove();
   
  }
  // Update the dropdown options with the latest data names
  d3.json(url).then(function(data) {
      
    d3.select("#selDataset").selectAll('option').data(data.names).join('option').text( d => d);
        
  });
})
};


function optionChanged(newValue){
  
  barChart(newValue); // Update the bar chart with the new value
  bubbleChart(newValue); // Update the bar chart with the new value
  changeDemogInfo(newValue)  // Update the bar chart with the new value
};


// Initi function
// Initialize the page with the default or initial value
function init(){
let testId = "940";
barChart(testId);
changeDemogInfo(testId);
bubbleChart(testId)
};

init();