var stacked = function() {
	var st_margin = 100,
			st_height = 650,
			st_width  = 960;

	var stack_tooltip = d3.select("#stack").append("div")
		.attr("class", "stack_tooltip")
		.style("opacity", 0);

	d3.json("data/stacked_data_rating.json", function(data){
		ratings_index = data.ratings;
		data2 = data.stats;
		console.log(data2);
		
		var stack = d3.layout.stack();
		data2 = stack(data2);
		var rating_scale = d3.scale.ordinal()
			.rangeRoundBands([0, st_width], .1);

		var x_scale = d3.scale.ordinal()
				.domain(d3.range(data2[0].length))
				.rangeRoundBands([0, st_height], 0.05);
		
		var y_scale = d3.scale.linear()
			.domain([0,				
				d3.max(data2, function(d) {
					return d3.max(d, function(d) {
						return d.y0 + d.y;
					});
				})
			])
			.range([0, st_width]);
		var colors = d3.scale.category10();

		//Create SVG element
		var svg = d3.select("#stacked")
			.append("svg")
			.attr("width", st_width)
			.attr("height", st_height);
		
		var xAxis = d3.svg.axis()
      .scale(x_scale)
      .orient("left")
      .tickFormat(function(d, i){
          return ratings_index[i];
      });

		var groups = svg.selectAll("g")
			.data(data2)
			.enter()
			.append("g")
			.style("fill", function(d, i) {
				return colors(i);
			});

		var rects = groups.selectAll("rect")
			.data(function(d) { return d; })
			.enter()
			.append("rect")
			.attr("y", function(d, i) {
				return x_scale(i);
			})
			.attr("x", function(d) {
				return y_scale(d.y0) + st_margin;
			})
			.attr("width", function(d) {
				return y_scale(d.y);
			})
			.attr("height", x_scale.rangeBand());

		// var stack_svg = d3.select("#stacked")
		// 	.append("svg")
		// 	.attr("width", st_width)
		// 	.attr("height", st_height);

		// var groups = stack_svg.selectAll('g')
		// 	.data(data)
		// 	.enter()
		// 	.append('g')
		// 	.style("fill", function(d,i){
		// 		return colors(i);
		// 	});

		// var rects = groups.selectAll("rect")
		// 	.data(function(d){return d.y})
		// 	.enter()
		// 	.append("rect")
		// 	.attr('x', function(d){
		// 		return rating_scale(d.x);
		// 	})
		// 	.attr('y', function(d){
		// 		return y_scale(d.y);
		// 	})
		// 	.attr('height', function(d){ return y_scale(d.y)})
		// 	.attr('width', function(d){return rating_scale(d.x)});
		 svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + 80 + ", -20)")
        .call(xAxis);

	}); 
};