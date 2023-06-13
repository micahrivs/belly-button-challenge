# belly-button-challengeBelly Button Biodiversity Dashboard
Welcome to the Belly Button Biodiversity Dashboard! This interactive dashboard allows you to explore the fascinating world of microbes that colonize human navels. By analyzing the Belly Button Biodiversity dataset, we can uncover valuable insights into the microbial species present in different individuals.

## 1. Horizontal Bar Chart
The dashboard presents a horizontal bar chart that showcases the top 10 operational taxonomic units (OTUs) found in an individual's belly button. To explore different individuals, you can use the dropdown menu provided.

The bar chart uses sample_values as the values for the bars.
The labels for the bars are derived from otu_ids.
Hovering over the bars reveals additional information from otu_labels.

## 2. Bubble Chart
The dashboard includes a bubble chart that visualizes each sample from the dataset. This chart provides a comprehensive view of the microbial composition in the belly buttons.

The X-axis represents otu_ids.
The Y-axis represents sample_values.
The size of each bubble corresponds to the sample_values.
The color of each bubble is determined by the otu_ids.
Hovering over the bubbles displays the specific otu_labels for each sample.

## 3. Sample Metadata
The dashboard displays the demographic information of the selected individual in the sample metadata section. This provides additional context about the individual being analyzed. Each key-value pair from the metadata JSON object is presented on the page.

## 4. Automatic Updates
Whenever you select a new sample from the dropdown menu, all the plots and information on the dashboard will automatically update to reflect the data for the selected individual.
