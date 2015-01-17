var React = require('react');
var Sparkline = require('./Sparkline');

var Light = React.createClass({

  displayName: 'Light',

  render() {
    return (
      <section className='container'>
        <Sparkline data={this.props.data} indicator={'light'} type={'Light'} />
      </section>
    );
  }

});

module.exports = Light;
