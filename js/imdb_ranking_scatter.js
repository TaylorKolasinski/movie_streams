var rankingScatter = function() {
	var margin = 50,
			width = 960,
			height = 500;

	var tooltip = d3.select("#imdb_ranking").append("div")
	  .attr("class", "tooltip")
	  .style("opacity", 0);

	d3.json("data/imdb_250.json", function(data){
		var ranking = d3.select("#imdb_ranking")
				.append("svg")
				.attr("width", width)
				.attr("height", height)
		
		var y_scale = d3.scale.linear()
			.range([height-margin, margin])
			.domain([d3.min(data, function(d) {return d.total_views}) - 10000, d3.max(data, function(d) {return d.total_views}) + 100000 ]);

		var x_scale = d3.scale.linear()
			.range([margin, width-margin])
			.domain([d3.min(data, function(d) {return d.imdb_rating}) - 0.05, d3.max(data, function(d) {return d.imdb_rating}) ]);

		console.log(d3.min(data, function(d) {return d.imdb_rating}));
		var x_axis = d3.svg.axis().scale(x_scale);
		var y_axis = d3.svg.axis().scale(y_scale).orient("left");

		ranking.selectAll('circle')
			.data(data)
			.enter()
			.append("circle")
			.attr('cy', function(d) {return y_scale(d.total_views)})
			.attr('cx', function(d) {
				var t = parseFloat(d.imdb_rating);
				console.log(typeof t);
				return x_scale(t);
			})
			.attr("r", 5)
			.on("mouseover", function(d){
				tooltip.transition()
					.duration(200)
					.style("opacity", .9);
				tooltip.html(d.movie_name + "<br/>" + "(" + d.total_views + ")");
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
}
