export class Version {
  public date() : string { // eslint-disable-line class-methods-use-this
    return '20191031';
  }

  public version() : string { // eslint-disable-line class-methods-use-this
    return '0.1.5';
  }

  public toString() : string { // eslint-disable-line class-methods-use-this
    return `Version ${this.version()} (${this.date()})`;
  }
}

export default {
};
