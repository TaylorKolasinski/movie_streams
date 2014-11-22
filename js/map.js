var map = function() {
	var width = 960,
      height = 500;

	var projection = d3.geo.mercator()
	    .center([0, 25])
	    .scale(150)
	    .rotate([0,0]);

	var svg = d3.select("#map").append("svg")
	    .attr("width", width)
	    .attr("height", height);

	var path = d3.geo.path()
	    .projection(projection);

	var g = svg.append("g");

	// load and display the World
	d3.json("world.json", function(error, topology) {

	// load and display the cities
	d3.csv("cities.csv", function(error, data) {
	    g.selectAll("circle")
	       .data(data)
	       .enter()
	       .append("a")
					  .attr("xlink:href", function(d) {
						  return "https://www.google.com/search?q="+d.city;}
					  )
	       .append("circle")
	       .attr("cx", function(d) {
	               return projection([d.lon, d.lat])[0];
	       })
	       .attr("cy", function(d) {
	               return projection([d.lon, d.lat])[1];
	       })
	       .attr("r", 5)
	       .style("fill", "red");
	});


	g.selectAll("path")
	      .data(topojson.object(topology, topology.objects.countries)
	          .geometries)
	    .enter()
	      .append("path")
	      .attr("d", path)
	});
}