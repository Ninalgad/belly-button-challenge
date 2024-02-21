function init() {
    d3.json("samples.json").then(function(data) {
        let sample = data.samples[0];
        let meta = data.metadata[0];

        d3.select('#metadata-id').text(`id: ${meta.id}`);
        d3.select('#metadata-ethnicity').text(`ethnicity: ${meta.ethnicity}`);
        d3.select('#metadata-gender').text(`gender: ${meta.gender}`);
        d3.select('#metadata-age').text(`age: ${meta.age}`);
        d3.select('#metadata-location').text(`location: ${meta.location}`);
        d3.select('#metadata-bbtype').text(`bbtype: ${meta.bbtype}`);
        d3.select('#metadata-wfreq').text(`wfreq: ${meta.wfreq}`);

        let sample_values = [];
        let otu_ids_names = [];
        let otu_ids = [];
        let otu_labels = [];

        for (i = 10; i > 0; i--) {
            otu_ids_names.push("OTU_" + String(sample.otu_ids[i]));
            otu_ids.push(sample.otu_ids[i]);
            sample_values.push(sample.sample_values[i]);
            otu_labels.push(sample.otu_labels[i]);
        }

        let barDataset = {
            x: sample_values,
            y: otu_ids_names,
            type: "bar",
            text: otu_labels,
            orientation: 'h'
        };
        let bubbleDataset = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                color: otu_ids,
                size: sample_values
            }
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", [barDataset])
        Plotly.newPlot("bubble", [bubbleDataset])

    });

}

init()


function optionChanged(id) {
    d3.json("samples.json").then(function(data) {
        let j = 0;
        for (i = 0; i < data.samples.length; i++) {
            if (data.samples[i].id == String(id)) {
                j = i;
            }
        }
        let sample = data.samples[j]
        let meta = data.metadata[j];

        d3.select('#metadata-id').text(`id: ${meta.id}`);
        d3.select('#metadata-ethnicity').text(`ethnicity: ${meta.ethnicity}`);
        d3.select('#metadata-gender').text(`gender: ${meta.gender}`);
        d3.select('#metadata-age').text(`age: ${meta.age}`);
        d3.select('#metadata-location').text(`location: ${meta.location}`);
        d3.select('#metadata-bbtype').text(`bbtype: ${meta.bbtype}`);
        d3.select('#metadata-wfreq').text(`wfreq: ${meta.wfreq}`);

        let sample_values = [];
        let otu_ids_names = [];
        let otu_ids = [];
        let otu_labels = [];

        for (i = 10; i > 0; i--) {
            otu_ids_names.push("OTU_" + String(sample.otu_ids[i]));
            otu_ids.push(sample.otu_ids[i]);
            sample_values.push(sample.sample_values[i]);
            otu_labels.push(sample.otu_labels[i]);
        }

        // Render the plot to the div tag with id "plot"
        Plotly.restyle('bar', "x", [sample_values])
        Plotly.restyle('bar', "y", [otu_ids_names])
        Plotly.restyle('bar', "text", [otu_labels])

        Plotly.restyle('bubble', "x", [otu_ids])
        Plotly.restyle('bubble', "y", [sample_values])
        Plotly.restyle('bubble', "text", [otu_labels])
        Plotly.restyle('bubble', "markers", [{
            color: otu_ids,
            size: sample_values
        }])
    });
};