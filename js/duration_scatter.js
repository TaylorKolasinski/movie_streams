var movieLengthScatter = function() {	
	var margin = 50,
			width = 960,
			height = 500;

	var movie_length_tooltip = d3.select("#duration").append("div")
	  .attr("class", "tooltip")
	  .style("opacity", 0);

	d3.json("data/imdb_250.json", function(data){
		var movie_lengths = d3.select("#duration")
							.append("svg")
							.attr("width", width)
							.attr("height", height);
				
		var y_scale = d3.scale.linear()
			.range([height-margin, margin])
			.domain([d3.min(data, function(d) {return d.total_views}), d3.max(data, function(d) {return d.total_views}) ]);

		var x_scale = d3.scale.linear()
			.range([margin, width-margin])
			.domain([d3.min(data, function(d) {return parseInt(d.movie_length)}), d3.max(data, function(d) {return parseInt(d.movie_length)}) ]);

		var x_axis = d3.svg.axis().scale(x_scale).tickFormat(d3.format("d"));
		var y_axis = d3.svg.axis().scale(y_scale).orient("left");

		movie_lengths.selectAll('circle')
						.data(data)
						.enter()
						.append("circle")
			.attr('cy', function(d) {return y_scale(d.total_views)})
			.attr('cx', function(d) {
				var t = parseInt(d.movie_length);
				console.log(typeof t);
				return x_scale(t);
			})
			.attr("r", 5)
			.on("mouseover", function(d){
				movie_length_tooltip.transition()
					.duration(200)
					.style("opacity", .9);
				movie_length_tooltip.html(d.movie_name + "<br/>" + "(" + d.total_views + ", " + parseInt(d.movie_length) +")");
			})
			.on("mouseout", function(d) {
				movie_length_tooltip.transition()
					.duration(500)
					.style("opacity", 0);
			});

		d3.select("#duration svg")
			.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + (height-margin) + ")")
			.call(x_axis);

		d3.select("#duration svg")
			.append("g")
				.attr("class", "y axis")
				.attr("transform", "translate(" + (margin) + ", 0)")
			.call(y_axis);

	});
};
