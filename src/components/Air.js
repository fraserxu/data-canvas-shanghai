var React = require('react');
var Sparkline = require('./Sparkline');
var AirLegend = require('./AirLegend');

var Air = React.createClass({

  displayName: 'Air',

  render() {
    return (
      <section className='container'>
        <Sparkline data={this.props.data} indicator={'airquality_raw'} type={'Air'} yDomain={[20, 40]}/>
        <AirLegend />
      </section>
    );
  }

});

module.exports = Air;