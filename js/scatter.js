var scatter = function() {
	var s_margin = 60,
			s_height = 500,
			s_width  = 960;

	var s_tooltip = d3.select('#scatter').append("div")
			.attr("class", "s_tooltip")
			.style("opactiy", 0);

	d3.json("data/imdb_250.json", function(data){
		var s_svg = d3.select("#scatter")
				.append("svg")
				.attr("width", s_width)
				.attr("height", s_height);

		var y_scale = d3.scale.linear()
				.range([s_height-s_margin, s_margin])
				.domain([d3.min(data, function(d){return d.total_views}) - 20000, d3.max(data, function(d) {return d.total_views }) + 20000]);

		var year_scale = d3.scale.linear()
				.range([s_margin, s_width-s_margin])
				.domain([d3.min(data, function(d){return d.year}) -1, d3.max(data, function(d){ return d.year})]);

		var duration_scale = d3.scale.linear()
			 .range([s_margin, s_width - s_margin])
			 .domain([d3.min(data, function(d){return  parseInt(d.movie_length)}) - 10, d3.max(data, function(d){return  parseInt(d.movie_length)})]);

		var y_axis = d3.svg.axis().scale(y_scale).orient("left");
		var duration_axis = d3.svg.axis().scale(duration_scale);
		var year_axis = d3.svg.axis().scale(year_scale).tickFormat(d3.format('d'));


		s_svg.selectAll('circle')
				.data(data)
				.enter()
				.append('circle')
				.attr('cy', function(d) {return y_scale(d.total_views)})
				.attr('cx', function(d) {return year_scale(d.year)})
				.attr('r', 5);

		d3.select("#scatter").select('svg')
			.append('g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + (s_height-s_margin) + ')')
			.call(year_axis);

		d3.select("#scatter").select('svg')
			.append('g')
			.attr('class', 'y axis')
			.attr('transform', 'translate(' + s_margin + ', 0)')
			.call(y_axis);

		d3.select('#duration')
			.on("click", function(){
				s_svg.selectAll('circle')
					.data(data)
					.transition()
					.duration(2000)
					.attr('cy', function(d) {return y_scale(d.total_views)})
					.attr('cx', function(d) {
						var x =  parseInt(d.movie_length);
						return duration_scale(x)}
					);

				d3.select("#scatter").select('.x.axis')
					.transition()
					.duration(2000)
					.call(duration_axis);
			});

		d3.select('#yearsbutton')
			.on("click", function(){
				s_svg.selectAll('circle')
					.data(data)
					.transition()
					.duration(2000)
					.attr('cy', function(d) {return y_scale(d.total_views)})
					.attr('cx', function(d) {return year_scale(d.year)});

				d3.select("#scatter").select('.x.axis')
					.transition()
					.duration(2000)
					.call(year_axis);
			});
		d3.selectAll(".filter_button")
			.on('change', function(){
				console.log(typeof this.id);
				var genre = this.id;
				s_svg.selectAll('circle')
					.filter(function(d) { return d.genre !== genre})
						.transition()
						.duration(1000)
						.style('opacity', 0)
					.filter(function(d) { return d.genre === genre})
						.transition()
						.duration(1000)
						.style('opacity', 0);
			});
	})
};