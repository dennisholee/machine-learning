// URL: https://beta.observablehq.com/@dennisholee/ordinary-least-square
// Title: Ordinary Least Square
// Author: dennisholee (@dennisholee)
// Version: 255
// Runtime version: 1

const m0 = {
  id: "565f6295d077ca31@255",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Ordinary Least Square`
)})
    },
    {
      from: "@dennisholee/math",
      name: "add",
      remote: "add"
    },
    {
      from: "@dennisholee/math",
      name: "mean",
      remote: "mean"
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require('d3')
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `Declare data as array of x y coordinates`
)})
    },
    {
      name: "data",
      value: (function(){return(
[
[1.1,39343.00],
[1.3,46205.00],
[1.5,37731.00],
[2.0,43525.00],
[2.2,39891.00],
[2.9,56642.00],
[3.0,60150.00],
[3.2,54445.00],
[3.2,64445.00],
[3.7,57189.00],
[3.9,63218.00],
[4.0,55794.00],
[4.0,56957.00],
[4.1,57081.00],
[4.5,61111.00],
[4.9,67938.00],
[5.1,66029.00],
[5.3,83088.00],
[5.9,81363.00],
[6.0,93940.00]
  /*,
[6.8,91738.00],
[7.1,98273.00],
[7.9,101302.00],
[8.2,113812.00],
[8.7,109431.00],
[9.0,105582.00],
[9.5,116969.00],
[9.6,112635.00],
[10.3,122391.00],
[10.5,121872.00]
*/
]
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `Plot scatter chart along with best fit line`
)})
    },
    {
      name: "chart",
      inputs: ["d3","DOM","width","height","xAxis","yAxis","data","x","y","bestfit","line"],
      value: (function(d3,DOM,width,height,xAxis,yAxis,data,x,y,bestfit,line)
{
  const svg = d3.select(DOM.svg(width, height));
  
  svg.append("g").call(xAxis)
  svg.append("g").call(yAxis)
  
  svg.append("g").attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("fill", "none")
    .selectAll("circle")
    .data(data)
    .enter().append("circle")
      .attr("cx", d => x(d[0]))
      .attr("cy", d => y(d[1]))
      .attr("r", 5);
  
  svg.append("path")
    .datum(bestfit)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", line);
  
  return svg.node();
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `Extract the X and Y values from the coordinates`
)})
    },
    {
      name: "data_x",
      inputs: ["data"],
      value: (function(data){return(
data.map(i => i[0])
)})
    },
    {
      name: "data_y",
      inputs: ["data"],
      value: (function(data){return(
data.map(i => i[1])
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `Calculate the mean values for both X and Y`
)})
    },
    {
      name: "meanX",
      inputs: ["mean","data_x"],
      value: (function(mean,data_x){return(
mean(data_x)
)})
    },
    {
      name: "meanY",
      inputs: ["mean","data_y"],
      value: (function(mean,data_y){return(
mean(data_y)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `Calculate the Ordinary Least Square (cofficient) i.e. y = Ax + b`
)})
    },
    {
      name: "ols",
      inputs: ["data","meanX","meanY","add"],
      value: (function(data,meanX,meanY,add){return(
() => {
  var numerator = data.map(i =>(i[0] - meanX) * (i[1] - meanY)).reduce(add)
  var denominator = data.map(i => Math.pow(i[0] - meanX, 2)).reduce(add)
  
  return numerator / denominator
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `Calculate the offset i.e. y = ax + B`
)})
    },
    {
      name: "offset",
      inputs: ["meanY","ols","meanX"],
      value: (function(meanY,ols,meanX){return(
meanY - ols() * meanX
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `Derive the best fit data to plot the best fit line`
)})
    },
    {
      name: "bestfit",
      inputs: ["data","offset","ols"],
      value: (function(data,offset,ols)
{
  return data.map(i => [i[0], offset + (ols() * i[0])])
}
)
    },
    {
      name: "height",
      value: (function(){return(
300
)})
    },
    {
      name: "width",
      value: (function(){return(
300
)})
    },
    {
      name: "margin",
      value: (function(){return(
{top: 20, right: 30, bottom: 30, left: 40}
)})
    },
    {
      name: "xAxis",
      inputs: ["height","margin","d3","x","width","data"],
      value: (function(height,margin,d3,x,width,data){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", width - margin.right)
        .attr("y", -4)
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text(data.x))
)})
    },
    {
      name: "yAxis",
      inputs: ["margin","d3","y","data"],
      value: (function(margin,d3,y,data){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 4)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))
)})
    },
    {
      name: "x",
      inputs: ["d3","data","margin","width"],
      value: (function(d3,data,margin,width){return(
d3.scaleLinear()
    .domain(d3.extent(data, d => d[0])).nice()
    .range([margin.left, width - margin.right])
)})
    },
    {
      name: "y",
      inputs: ["d3","data","height","margin"],
      value: (function(d3,data,height,margin){return(
d3.scaleLinear()
    .domain(d3.extent(data, d => d[1])).nice()
    .range([height - margin.bottom, margin.top])
)})
    },
    {
      name: "line",
      inputs: ["d3","x","y"],
      value: (function(d3,x,y){return(
d3.line()
    .defined(d => !isNaN(d[1]))
    .x(d => x(d[0]))
    .y(d => y(d[1]))
)})
    },
    {
      name: "predict_sample",
      inputs: ["offset","ols"],
      value: (function(offset,ols)
{
  var test_data = [[ 1.5],
       [10.3],
       [ 4.1],
       [ 3.9],
       [ 9.5],
       [ 8.7],
       [ 9.6],
       [ 4. ],
       [ 5.3],
       [ 7.9]]
  return test_data.map(i => [i[0], offset + (ols() * i[0])])
}
)
    }
  ]
};

const m1 = {
  id: "@dennisholee/math",
  variables: [
    {
      name: "add",
      value: (function(){return(
(var1, var2) => {return var1 + var2}
)})
    },
    {
      name: "mean",
      inputs: ["add"],
      value: (function(add){return(
values => {
  return values.reduce(add) / values.length
}
)})
    }
  ]
};

const notebook = {
  id: "565f6295d077ca31@255",
  modules: [m0,m1]
};

export default notebook;
