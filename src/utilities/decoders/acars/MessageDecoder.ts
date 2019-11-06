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

    if (message.label === '15') {
      // General Aviation Position Report
      decodedString += '<div>Position Report</div>';

      const twoZeeRegex = /^\(2(?<between>.+)\(Z$/;
      const results = message.text.match(twoZeeRegex);
      if (results) {
        // Style: (2N38111W 82211266 76400-64(Z
        console.log(`Label 15 Position Report: between = ${results.groups.between}`);
      }
    }

    if (message.label === '5Z') {
      decodedString += '<div>Airline Designated Downlink</div>';

      const uaRegex = /^\/(?<type>\w+) (?<remainder>.+)/;
      let results = message.text.match(uaRegex);

      if (results && results.length >= 2) {
        // Successful match: United Airlines 5Z message
        const type = results.groups.type.split('/')[0];
        const { remainder } = results.groups;
        console.log(results);
        console.log(`DECODER: Matched 'United Airlines 5Z': type = ${type}, remainder = ${remainder}`);

        let typeDescription;
        switch (type) {
          case 'B1':
            typeDescription = 'Request Weight and Balance';
            break;
          case 'B3':
            typeDescription = 'Request Departure Clearance';
            break;
          case 'CD':
            typeDescription = 'Weight and Balance';
            break;
          case 'CG':
            typeDescription = 'Request Pre-departure clearance, PDC';
            break;
          case 'CM':
            typeDescription = 'Crew Scheduling';
            break;
          case 'C3':
            typeDescription = 'Off Message';
            break;
          case 'C4':
            typeDescription = 'Flight Dispatch';
            break;
          case 'C5':
            typeDescription = 'Maintenance Message';
            break;
          case 'C6':
            typeDescription = 'Customer Service';
            break;
          case '10':
            typeDescription = 'PIREP';
            break;
          case 'C11':
            typeDescription = 'International PIREP';
            break;
          case 'DS':
            typeDescription = 'Late Message';
            break;
          case 'D3':
            typeDescription = 'Holding Pattern Message';
            break;
          case 'D6':
            typeDescription = 'From-To + Date';
            break;
          case 'D7':
            typeDescription = 'From-To + Alternate + Time';
            break;
          case 'EO':
            typeDescription = 'In Range';
            break;
          case 'PW':
            typeDescription = 'Position Weather';
            break;
          case 'RL':
            typeDescription = 'Request Release';
            break;
          case 'R3':
            typeDescription = 'Request HOWGOZIT Message';
            break;
          case 'R4':
            typeDescription = 'Request the Latest POSBD';
            break;
          case 'TC':
            typeDescription = 'From-To Fuel';
            break;
          case 'WB':
            typeDescription = 'From-To';
            break;
          case 'W1':
            typeDescription = 'Request Weather for City';
            break;
          default:
            typeDescription = 'Unknown';
        }

        decodedString += '<div>Airline: United Airlines</div>';
        decodedString += `<div>Message Type: ${typeDescription} (${type})</div>`;

        if (type === 'B3') {
          const rdcRegex = /^(?<from>\w\w\w)(?<to>\w\w\w) (?<unknown1>\d\d) R(?<runway>.+) G(?<unknown2>.+)$/;
          results = remainder.match(rdcRegex);

          if (results) {
            decodedString += `<div>Origin: ${results.groups.from}</div>`;
            decodedString += `<div>Destination: ${results.groups.to}</div>`;
            decodedString += `<div>Unknown Field 1: ${results.groups.unknown1}</div>`;
            decodedString += `<div>Runway: ${results.groups.runway}</div>`;
            decodedString += `<div>Unknown FIeld 2: ${results.groups.unknown2}</div>`;
          } else {
            console.log(`Unkown 5Z RDC format: ${remainder}`);
          }
        } else {
          decodedString += `<div>Remainder: ${remainder} (Will analyze and decode in the future)</div>`;
        }
      } else {
        // Unknown
        console.log(`Unknown 5Z message: ${message.text}`);
      }
    }

    if (message.label === 'H1') {
      if (message.text.includes('#M1BPOS')) {
        console.log('DECODER: #M1BPOS detected');
        const parts = message.text.replace('#M1BPOS', '').split('/')[0].split(',');
        // console.log(parts);

        decodedString += '<div>Position Report</div>';

        const coordsRegex = /(?<lac>[NS])(?<la>\d+)(?<lnc>[EW])(?<ln>\d+)/;
        const results = parts[0].match(coordsRegex);
        // console.log(results);

        if (results && results.length >= 4) {
          const latitude = results.groups.la / 1000;
          const longitude = results.groups.ln / 1000;
          let route = parts.slice(1).filter((part: any) => !/^\d(.+)$/.test(part));
          route = route.map((hop: any) => hop || '?');

          decodedString += `<div>Coordinates: ${latitude} ${results.groups.lac}, ${longitude} ${results.groups.lnc}</div>`;
          decodedString += `<div>Route: ${route.join(' > ')}</div>`;
        }
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

    if (message.label === 'SA') {
      // Media Report
      // Example: 0EV021358VSH/
      // 0      = Version Number
      // E      = Establishment/Loss flag (1)
      // V      = Media Identification (2)
      // 021358 = UTC Timestamp
      // V      = Current Media Available
      // S      = Current Media Available
      // H      = Current Media Available
      // /      = Delimiter (May contain free text after the delimiter)
      //
      // (1) Flags:
      // E = Media Established
      // L = Media Lost
      //
      // (2) Media Types:
      // V = VHF-ACARS
      // S = Default Satcom
      // H = HF
      // G = Global Star Satcom
      // C = ICO Satcom
      // 2 = VDL Mod 2
      // X = Inmarsat Aero H/H+/I/L
      // I = Iridium Satcom
      const parts = message.text.split('/');
      const version = parts[0].text[0];
      const linkState = parts[0].text[1];
      const mediaId = parts[0].text[2];
      const timestamp = parts[0].text.substr(3, 8);
      const availableMedia = parts[0].text.substr(8).split('');
      const freeText = parts[1];

      decodedString += '<div>Media Report</div>';
      decodedString += `<div>Version: ${version}</div>`;
      decodedString += `<div>Link State: ${linkState}</div>`;
      decodedString += `<div>Media Identification: ${mediaId}</div>`;
      decodedString += `<div>Timestamp: ${timestamp.substr(0, 2)}:${timestamp.substr(2, 4)}:${timestamp.substr(4, 6)} UTC</div>`;
      decodedString += `<div>Available Media: ${availableMedia.join(', ')}</div>`;
      if (freeText) {
        decodedString += `<div>Free Text: ${freeText}</div>`;
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

      if (version === '2') {
        const regex = /0(\d)X(?<org>\w)(?<iata>\w\w\w)(?<icao>\w\w\w\w)(?<station>\d)(?<lat>\d+)(?<latd>[NS])(?<lng>\d+)(?<lngd>[EW])V(?<vfreq>\d+)\/.*/;
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
