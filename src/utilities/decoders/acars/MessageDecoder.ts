import { Store } from 'vuex';

export class MessageDecoder {
  store : Store<any>;

  constructor(store: Store<any>) {
    this.store = store;
  }

  decodeMessage(message: any) : string {
    let decodedString = '';

    if (message.label === ':;') {
      decodedString += '<div>Aircraft Transceiver Frequency Change</div>';
      const frequency = Number(message.text) / 1000;
      decodedString += `${frequency} MHz`;
    }

    if (message.label === 'H1') {
      if (message.text.includes('#M1BPOS')) {
        console.log('DECODER: #M1BPOS detected');
        const parts = message.text.replace('#M1BPOS', '').split('/')[0].split(',');
        // console.log(parts);

        const coordsRegex = /(?<lac>[NS])(?<la>\d+)(?<lnc>[EW])(?<ln>\d+)/;
        const results = parts[0].match(coordsRegex);
        // console.log(results);

        const latitude = results.groups.la / 1000;
        const longitude = results.groups.ln / 1000;
        let route = parts.slice(1).filter((part: any) => !/^\d(.+)$/.test(part));
        route = route.map((hop: any) => hop || '?');

        decodedString += '<div>Position Report</div>';
        decodedString += `<div>Coordinates: ${latitude} ${results.groups.lac}, ${longitude} ${results.groups.lnc}</div>`;
        decodedString += `<div>Route: ${route.join(' > ')}</div>`;
      }

      if (message.text.includes('#M1BPRG')) {
        console.log('DECODER: #M1BPRG detected');
        const parts = message.text.split('/');
        for (const part of parts) { // eslint-disable-line no-restricted-syntax
          if (part.includes('#M')) {
            const regex = /#M(?<fms>\w+)PRG/;
          }

          if (part.includes('DT')) {
            const regex = /DT(?<dest>\w+),(?<rway>.+),(?<fuel>.+),(?<eta>.+),(?<rem>.+)/;
            const result = message.text.match(regex);
            // console.log('DT result');
            // console.log(result);
          }

          if (part.includes('FN')) {
            const regex = /FN(?<flight>\w+)/;
          }
        }
      }
    }

    if (message.label === 'SQ') {
      const preamble = message.text.substring(0, 4);
      const version = message.text[1];
      let network = this.store.state.acarsData.labels.SQ.decoderHints.brands[message.text[3]];
      let airport;
      let iataCode;
      let icaoCode;
      let latitude;
      let longitude;
      let stationNumber;
      let vdlFrequency;

      if (!network) {
        network = 'Unknown';
      }

      if (preamble === '02XA') {
        const regex = /0(\d)X(?<org>\w)(?<iata>\w\w\w)(?<icao>\w\w\w\w)(?<station>\d)(?<lat>\d+)(?<latd>[NS])(?<lng>\d+)(?<lngd>[EW])V(?<vfreq>\d+)\/ARINC/;
        const result = message.text.match(regex);

        if (result.length >= 8) {
          iataCode = result.groups.iata;
          icaoCode = result.groups.icao;
          stationNumber = result.groups.station;
          airport = this.lookupAirportByIata(iataCode);
          latitude = `${Number(result.groups.lat) / 100} ${result.groups.latd}`;
          longitude = `${Number(result.groups.lng) / 100} ${result.groups.lngd}`;
          vdlFrequency = result.groups.vfreq;
        }
      }

      const decodedMessage = {
        description: 'Ground Station Squitter',
        preamble,
        version,
        network,
        iataCode,
        icaoCode,
        stationNumber,
        airport,
        latitude,
        longitude,
        vdlFrequency,
      };
      console.log(decodedMessage);

      decodedString = `
        <div>${decodedMessage.description}</div>
        <div>Network: ${decodedMessage.network}</div>
      `;

      if (decodedMessage.stationNumber) {
        decodedString += `<div>Ground Station: ${decodedMessage.icaoCode}${decodedMessage.stationNumber}</div>`;
      }

      if (iataCode) {
        decodedString += `<div>IATA: ${iataCode}</div>`;
      }

      if (icaoCode) {
        decodedString += `<div>ICAO: ${icaoCode}</div>`;
      }

      if (decodedMessage.airport) {
        decodedString += `<div>Airport: ${decodedMessage.airport.name} (${decodedMessage.airport.icao}) in ${decodedMessage.airport.location}</div>`;
      }

      if (decodedMessage.latitude) {
        decodedString += `<div>Coordinates: ${decodedMessage.latitude}, ${decodedMessage.longitude}`;
      }
    }

    return decodedString;
  }

  lookupAirportByIata(iata: string) : any {
    const airportsArray : Array<any> = this.store.state.acarsData.airports;
    // console.log(airportsArray);
    const airport = airportsArray.find(e => e.iata === iata);

    return airport;
  }
}

export default {
};
