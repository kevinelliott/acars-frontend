export class HostUtils {
  public ipMask(ipAddress: string) : string { // eslint-disable-line class-methods-use-this
    const pieces = ipAddress.split('.');
    if (pieces.length === 4) {
      pieces[1] = 'x'.repeat(pieces[1].length);
      pieces[2] = 'x'.repeat(pieces[1].length);
    }
    return pieces.join('.');
  }
}

export default {
};
