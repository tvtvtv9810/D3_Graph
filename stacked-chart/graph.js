$(function () {

// データセット
let dataset = [
  { advertisement: 50, commerce: 20, finance: 10 },
  { advertisement: 51, commerce: 22, finance: 11 },
  { advertisement: 52, commerce: 24, finance: 11 },
  { advertisement: 53, commerce: 27, finance: 12 },
  { advertisement: 54, commerce: 30, finance: 13 },
  { advertisement: 55, commerce: 35, finance: 13 },
  { advertisement: 56, commerce: 40, finance: 14 },
  { advertisement: 57, commerce: 46, finance: 14 },
  { advertisement: 58, commerce: 51, finance: 15 },
  { advertisement: 59, commerce: 64, finance: 15 },
  { advertisement: 60, commerce: 70, finance: 16 },
  { advertisement: 61, commerce: 86, finance: 16 },
  { advertisement: 91, commerce: 96, finance: 36 }
];

// グラフの幅
let width = 600; 
// グラフの高さ
let height = 400; 
// スペース設定　
let padding = 36; 

// スタックメソッド
let stack = d3.stack()
  .keys(["advertisement", "commerce", "finance"])
  .order(d3.stackOrderDescending); // 降順

// データ積み上げ配列
let series = stack(dataset);

// SVG
let svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

// X軸スケール
let xScale = d3.scaleBand()
  .rangeRound([padding, width - padding])
  .padding(0.2)
  .domain(d3.range(dataset.length));

// Y軸スケール
let yScale = d3.scaleLinear()
  .domain([0,
    d3.max(dataset, function(d) {
      return d.advertisement + d.commerce + d.finance;
    })
  ])
  .range([height - padding, padding]);

// カラーパレット
let colors = d3.scaleOrdinal()
  .range(["#FF0000", "#00FF00", "#0000FF"]);

// データ種類ごとにグループ作成
let groups = svg.selectAll("g")
  .data(series)
  .enter()
  .append("g")
  .style("fill", function(d, i) {
    return colors(i);
});

//　それぞれのデータのグラフを作成
let layers = groups.selectAll("rect")
  .data(function(d) { return d; })
  .enter()
  .append("rect")
  .attr("x", function(d, i) {
    return xScale(i);
  })
  .attr("y", function(d) {
    return yScale(d[1]); // バーの下辺のy座標
  })
  .attr("height", function(d) {
    return yScale(d[0]) - yScale(d[1]);  // 高さを計算
  })
  .attr("width", xScale.bandwidth());

// x,y軸の描画
svg.append("g")
  .attr("transform", "translate(" + 0 + "," + (height - padding) + ")")
  .call(d3.axisBottom(xScale));

svg.append("g")
  .attr("transform", "translate(" + padding + "," + 0 + ")")
  .call(d3.axisLeft(yScale));

});
