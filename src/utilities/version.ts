export class Version {
  public date() : string { // eslint-disable-line class-methods-use-this
    return '20191030';
  }

  public version() : string { // eslint-disable-line class-methods-use-this
    return '0.1.2';
  }

  public toString() : string { // eslint-disable-line class-methods-use-this
    return `Version ${this.version()} (${this.date()})`;
  }
}

export default {
};
