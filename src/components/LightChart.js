import React from 'react';
import ChartistGraph from 'react-chartist';
import d3 from 'd3';
import moment from 'moment';
import $ from 'jquery';

const LightChart = React.createClass({

  displayName: 'LightChart',

  componentDidMount() {
    let el = this.getDOMNode();
    let $chart = $(el).find('.ct-chart');

    $chart.css({ position: 'relative'});

    let $toolTip = $chart
      .append('<div class="tooltip"></div>')
      .find('.tooltip')
      .hide();

    $chart.on('mouseenter', '.ct-point', function() {
      let $point = $(this),
        value = $point.attr('ct:value'),
        seriesName = $point.parent().attr('ct:series-name');
      $toolTip.html(seriesName + '<br>' + value).show();
    });

    $chart.on('mouseleave', '.ct-point', function() {
      $toolTip.hide();
    });

    $chart.on('mousemove', function(event) {
      $toolTip.css({
        left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
        top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 40
      });
    });
  },

  render() {
    var lightChart, lightData, _light, timestamp, high, low, biPolarLineChartOptions;
    if (this.props.data) {
      if (!this.props.multiple) {
        _light = this.props.data.data.map((d) => d['light'])
        timestamp = this.props.data.data.map((d) => d['timestamp'])
        high = d3.max(_light)
        low = d3.min(_light)
        _light = [ _light ]
        biPolarLineChartOptions = {
          high: high || 150,
          low: low || 0,
          showArea: true,
          showLine: false,
          showPoint: false,
          axisX: {
            showLabel: true,
            showGrid: false
          }
        }
      } else {
        _light = this.props.data.map((d) => {
          return {
            name: d.data[0].city,
            data: d.data.map((_d) => _d['light'])
          }
        })
        timestamp = this.props.data[0].data.map((d) => d['timestamp'])
        high = d3.max(_light.map((light) => d3.max(light.data)))
        low = d3.min(_light.map((light) => d3.min(light.data)))
        biPolarLineChartOptions = {
          high: high || 150,
          low: low || 0,
          showArea: false,
          showLine: true,
          showPoint: true,
          axisX: {
            showLabel: true,
            showGrid: true
          }
        }
      }

      let _labels = timestamp
      if (this.props.dataRange == 'day') {
        _labels = timestamp.map((d) => moment(d).format('HH'))
      } else if (this.props.dataRange == 'week') {
        _labels = timestamp.map((d) => moment(d).format('dd'))
      } else if (this.props.dataRange == 'month') {
        _labels = timestamp.map((d) => moment(d).format('DD'))
      }

      lightData = {
        labels: _labels,
        series: _light
      }

      lightChart = <ChartistGraph data={lightData} options={biPolarLineChartOptions} type={'Line'} />
    }

    const isLast = this.props.last
    const description = `The light sensor measures digital light, or illuminance. `

    return (
      <section className='indicator light'>
        Light (<span className={`help hint--${isLast ? 'left' : 'bottom'}`} data-hint={`${description}`}>?</span>) : {this.props.light} Lux
        { lightChart }
      </section>
    );
  }

});

export default LightChart;
