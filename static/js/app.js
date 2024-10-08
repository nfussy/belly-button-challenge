// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;
    console.log("Loaded Metadata:", metadata)

    // Filter the metadata for the object with the desired sample number
    let cleanedMeta = metadata.find(meta => meta.id == sample);
    console.log("Filtered Metadata for desired sample number", sample, ":", cleanedMeta)

    // Use d3 to select the panel with id of `#sample-metadata`
    let panelID = d3.select("#sample-metadata")
    console.log("Panel ID Selected", panelID)

    // Use `.html("") to clear any existing metadata
    panelID.html("");
    console.log("Cleared existing metadata");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(cleanedMeta).forEach(([key, value]) => {
      panelID.append("h6").text(`${key}: ${value}`);
      console.log(` Added in ${key}: ${value} to panel`)
    });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;
    console.log("Loaded samples:", samples)

    // Filter the samples for the object with the desired sample number
    let cleanedSamples = samples.find(s => s.id === sample);
    console.log("Filtered sample for the desired Sample Number", sample, ":", cleanedSamples);

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = cleanedSamples.otu_ids;
    let otu_labels = cleanedSamples.otu_labels;
    let sample_values = cleanedSamples.sample_values;

    console.log("OTU IDs:", otu_ids);
    console.log("OTU Labels:", otu_labels);
    console.log("Number of Bacteria:", sample_values);

    // Build a Bubble Chart
    let bubble_trace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
      }
    };

    // Render the Bubble Chart
    let bubble_data = [bubble_trace];

    let bubble_layout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: {title: 'OTU IDs'},
      yaxis: {title: 'Number of Bacteria'},
      hovermode: 'closest'
    };

    Plotly.newPlot('bubble', bubble_data, bubble_layout);
    console.log("Bubble Chart created");

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let bar_trace = {
      x: sample_values.slice(0, 10).reverse(),
      y: otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h'
    }

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let bar_data = [bar_trace];

    let bar_layout = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: {title: 'Number of Bacteria'}
    };
    
    // Render the Bar Chart
    Plotly.newPlot('bar', bar_data, bar_layout);
    console.log("Bar Chart created");
    
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field


    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
