var bars = function() {
	var b_margin = 60,
			b_height = 500,
			b_width = 1360;

	d3.json('data/sorted_imdb.json', function(data){
		var x_scale = d3.scale.ordinal()
			.domain(d3.range(data.length))
			.rangeRoundBands([0, b_width], 0.5);

		var y_scale = d3.scale.linear()
			.domain([0, d3.max(data, function(d){return d.total_views; })])
			.range([0, b_height]);

		var bar_svg = d3.select('#bars')
			.append('svg')
			.attr("width", b_width)
			.attr('height', b_height);

		var colors = d3.scale.category20();

		bar_svg.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr('x', function(d, i){
				return x_scale(i);
			})
			.attr('y', function(d){
				return b_height - y_scale(d.total_views);
			})
			.attr('width', 5)
			.attr('height', function(d){
				return y_scale(d.total_views);
			})
			.attr('fill', function(d, i){
				return colors(i);
			});


	});
	d3.select("#host_sites")
		.on('click', function(){
			d3.json('data/total_stream_final.json', function(data){
				var x_scale = d3.scale.ordinal()
					.domain(d3.range(data.length))
					.rangeRoundBands([0, b_width], 0.5);

				var y_scale = d3.scale.linear()
					.domain([0, d3.max(data, function(d){return d.count; })])
					.range([0, b_height]);

				var bar_svg = d3.select('#bars')
					.append('svg')
					.attr("width", b_width)
					.attr('height', b_height);

				var colors = d3.scale.category20();

				bar_svg.selectAll('rect')
					.data(data)
					.enter()
					.append('rect')
					.attr('x', function(d, i){
						return x_scale(i);
					})
					.attr('y', function(d){
						return b_height - y_scale(d.count);
					})
					.attr('width', 5)
					.attr('height', function(d){
						return y_scale(d.count);
					})
					.attr('fill', function(d, i){
						return colors(i);
					});
			});
		})
};