import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class About extends Component {
  render() {
    return (
      <div className="container">
        <h1>About</h1>
        <Helmet title="About this project"/>
        <p>
          This is a specific tool I've created to assist Garmin Connect IQ developers when creating user interfaces (views). This tool enables developers to create a user interface in an editor while previewing the end result in the simulator app.
        </p>
        <p>
          While this tool is fully usable now, the intention is to be able to deploy this to a web server, making it far more accessible to all Connect IC developers.
        </p>
        <p>This project is based on
          (<a
            href="https://github.com/erikras/react-redux-universal-hot-example" target="_blank">Erik Rasmussen - React Redux Example</a>.
        </p>
      </div>
    );
  }
}
