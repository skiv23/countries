$(document).ready(() => {
  const margin = ({top: 30, right: 0, bottom: 30, left: 40});
  const color = '#00AEC7';
  const data = window.chartData;

  const svg = d3.select('svg');
  const width = svg.node().getBoundingClientRect().width;
  const height = svg.node().getBoundingClientRect().height;

  const tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset(() => [-10, 0])
    .html(d => `${d.name}: ${d.borders.length}`)
  svg.call(tip);
  svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.5)

  const y =  d3.scaleLinear()
    .domain([0, d3.max(data, d => d.borders.length)])
    .range([height - margin.bottom, margin.top])

  svg.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d.borders.length))
    .attr("height", d => y(0) - y(d.borders.length))
    .attr("width", x.bandwidth())
    .style("fill", color)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

  const xAxis = d3.axisBottom(x)
    .tickFormat(i => data[i].alpha3Code)
    .scale(x)

  const yAxis = d3.axisLeft(y).scale(y)

  svg.append("g")
    .attr('transform', 'translate(' + [0, height - margin.top] + ')')
    .call(xAxis);

  svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(yAxis);
})
