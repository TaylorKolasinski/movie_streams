var yearScatter = function() {	
	var margin = 50,
			width = 960,
			height = 500;

	var year_tooltip = d3.select("#year").append("div")
	  .attr("class", "tooltip")
	  .style("opacity", 0);

	d3.json("data/imdb_250.json", function(data){
		var years = d3.select("#year")
							.append("svg")
							.attr("width", width)
							.attr("height", height);
						
		
		var y_scale = d3.scale.linear()
			.range([height-margin, margin])
			.domain([d3.min(data, function(d) {return d.total_views}), d3.max(data, function(d) {return d.total_views}) ]);

		var x_scale = d3.scale.linear()
			.range([margin, width-margin])
			.domain([d3.min(data, function(d) {return d.year}), d3.max(data, function(d) {return d.year}) ]);

		var x_axis = d3.svg.axis().scale(x_scale).tickFormat(d3.format("d"));
		var y_axis = d3.svg.axis().scale(y_scale).orient("left");

		var year_circles = years.selectAll('circle')
						.data(data)
						.enter()
						.append("circle")
			.attr('cy', function(d) {return y_scale(d.total_views)})
			.attr('cx', function(d) {
				var t = d.year;
				console.log(typeof t);
				return x_scale(t);
			})
			.attr("r", 5)
			.on("mouseover", function(d){
				tooltip.transition()
					.duration(200)
					.style("opacity", .9);
				tooltip.html(d.movie_name + "<br/>" + "(" + d.total_views + ", " + d.year +")");
			})
			.on("mouseout", function(d) {
				tooltip.transition()
					.duration(500)
					.style("opacity", 0);
			});

		d3.select("svg")
			.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + (height-margin) + ")")
			.call(x_axis);

		d3.select("svg")
			.append("g")
				.attr("class", "y axis")
				.attr("transform", "translate(" + (margin) + ", 0)")
			.call(y_axis);

	});
};
