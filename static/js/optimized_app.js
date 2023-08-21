// Assigning the URL to a constant value for future use
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Function to fetch data from the specified URL
function fetchData() {
  return d3.json(url);
}

// BarChart Function
function barChart(testId, data) {
  console.log(data);

  // Finding the samples and metadata for the given testId
  let samples = data.samples.find(d => d.id == testId);
  let metadataNames = data.names.find(d => d.id == testId);

  // Extracting necessary data for the chart
  let values = samples.sample_values;
  let otu_ids = samples.otu_ids;
  let otu_labels = samples.otu_ids;

  // Selecting the top 10 values and reversing the order
  let x_data = values.slice(0, 10).reverse();
  let y_data = otu_ids.slice(0, 10).reverse();
  let y_label = y_data.map(y_label => "OTU " + y_label);

  // Creating the bar chart data object
  let bardata = [{
    x: x_data,
    y: y_label,
    type: 'bar',
    orientation: 'h'
  }];

  // Creating the layout for the bar chart
  let layout = {
    title: "my Title"
  };

  Plotly.newPlot("bar", bardata, layout);
}

// Bubble Chart Function 

function createBubbleChart(data) {
  console.log(data);

  // Extracting necessary data for the chart
  // let samples = data.samples.find(d => d.id == testId);
  let samples = data.samples[0];
  let values = samples.sample_values;
  let otu_ids = samples.otu_ids;
  let otu_labels = samples.otu_ids;

  // Setting the x and y data for the bubble chart
  let y_data = values;
  let x_data = otu_ids;

  // Creating the bubble chart data object
  let bubbledata = [{
    x: x_data,
    y: y_data,
    mode: 'markers',
    showlegend: true,
    marker: {
      size: y_data,
      colorscale: 'Earth',
      color: x_data,
      text: otu_labels
    }
  }];

  // Creating the layout for the bubble chart
  let layout = {
    title: "my Title",
    xaxis: {
      title: 'OTU ID'
    }
  };

  Plotly.newPlot("bubble", bubbledata, layout);
}

// Function to update demographic information
function updateDemogInfo(newId, data) {
  console.log(data);

  // Find the index of the newId in the 'names' array
  let indexId = data.names.indexOf(newId);
  console.log(data.names.indexOf(newId));

  // Clear existing content in the '#sample-metadata' element
  d3.select("#sample-metadata").html("");

  // Iterate over the key-value pairs of the metadata for the selected indexId
  for (const [j, i] of Object.entries(data.metadata[indexId])) {
    d3.select("#sample-metadata").append('div').text(`${j} : ${i}`).exit().remove();
  }

  // Update the dropdown options with the latest data names
  d3.select("#selDataset").selectAll('option').data(data.names).join('option').text(d => d);
}

// Function to handle option change event
function optionChanged(newValue) {
  fetchData().then(function(data) {
    barChart(newValue, data);
    updateDemogInfo(newValue, data);
  });
}

// Initialize the page
function init() {
  fetchData().then(function(data) {
    let TestId = "940";
    barChart(TestId, data);
    updateDemogInfo(TestId, data);
  });
}

init();