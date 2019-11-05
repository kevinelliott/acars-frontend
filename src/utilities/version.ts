const packageJson = require('../../package.json');
const versionJson = require('../../version.json');

export class Version {
  public date() : string { // eslint-disable-line class-methods-use-this
    return versionJson.date;
  }

  public version() : string { // eslint-disable-line class-methods-use-this
    return packageJson.version;
  }

  public toString() : string { // eslint-disable-line class-methods-use-this
    return `Version ${this.version()} (${this.date()})`;
  }
}

export default {
};
