export class Version {
  public date() : string { // eslint-disable-line class-methods-use-this
    return '20191105';
  }

  public version() : string { // eslint-disable-line class-methods-use-this
    return '0.1.7';
  }

  public toString() : string { // eslint-disable-line class-methods-use-this
    return `Version ${this.version()} (${this.date()})`;
  }
}

export default {
};
