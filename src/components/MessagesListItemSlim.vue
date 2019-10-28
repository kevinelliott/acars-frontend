<template>
  <div class="mb-4 border border-grey">
    <div class="bg-light">
      <div class="row">
        <div class="col-12">
          <div class="p-1 text-dark text-left">
            <small>
              <div class="p-1 float-left">
                {{ message.timestamp }}

                <span v-if="message.airframe.tail">
                  <span class="ml-1 text-muted">T:</span>
                  {{ message.airframe ? message.airframe.tail : 'N/A' }}
                </span>

                <span v-if="message.flight.flight">
                  <span class="ml-1 text-muted">F:</span>
                  {{ message.flight ? message.flight.flight : 'N/A' }}
                </span>
              </div>
              <div class="p-1 float-right">
                <span class="text-muted">ST:</span>
                {{ message.station ? message.station.ident : 'N/A' }}

                <span class="ml-1 text-muted">F: </span>
                <span v-if="message.frequency">
                  <a :id="`message-${message.id}-frequency`" href="#">{{ message.frequency }}</a>
                  <b-popover
                    :target="`message-${message.id}-frequency`"
                    triggers="hover"
                    placement="top"
                    >
                    <template v-slot:title>Frequency: {{ message.frequency }} MHz</template>
                    {{ frequencyName(message.frequency) }}
                  </b-popover>
                </span>
                <span v-else>
                  N/A
                </span>

                <span class="ml-1 text-muted">M: </span>
                <span v-if="message.mode">
                  <a :id="`message-${message.id}-mode`" href="#">{{ message.mode }}</a>
                  <b-popover
                    :target="`message-${message.id}-mode`"
                    triggers="hover"
                    placement="top"
                    >
                    <template v-slot:title>Mode: {{ message.mode }}</template>
                    Mode {{ message.mode }}
                  </b-popover>
                </span>
                <span v-else>
                  N/A
                </span>

                <span class="ml-1 text-muted">L: </span>
                <span v-if="message.label">
                  <a
                    :title="labelName(message.label)"
                    :id="`message-${message.id}-label`"
                    href="#">{{ message.label }}</a>
                  <b-popover
                    :target="`message-${message.id}-label`"
                    triggers="hover"
                    placement="top"
                    >
                    <template v-slot:title>Label: {{ message.label }}</template>
                    {{ labelName(message.label) }}
                  </b-popover>
                </span>
                <span v-else>
                  N/A
                </span>

                <span class="ml-1 text-muted">B:</span>
                {{ message.block_id ? message.block_id : 'N/A' }}

                <span class="ml-1 text-muted">M#:</span>
                {{ message.message_number ? message.message_number : 'N/A' }}

                <span v-if="message.error >= 1" class="ml-1 text-danger">
                  <strong>E:</strong>
                  {{ message.error }}
                </span>
                <span v-else>
                  <span class="text-muted">E:</span> 0
                </span>
              </div>
            </small>
          </div>
        </div>
      </div>
    </div>
    <div class="border-bottom text-black">
      <div class="row">
        <div class="col-12">
          <div class="d-flex flex-row">
            <div class="text-break text-left">
              <div class="p-3 bg-white">
                <span v-if="message.text">
                  <div v-html="highlightKnownCodesInText(convertNewlinesToBRs(message.text))"></div>
                  <div v-if="decodeMessage(message)">
                    <div class="mt-1 text-muted"><small>DECODED</small></div>
                    <div v-html="decodeMessage(message)"></div>
                  </div>
                </span>
                <span v-else class="text-muted">
                  No text.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MessagesListItem extends Vue {
  @Prop() private message!: Object;

  frequencyName(frequency: number) : string {
    const frequencyString = frequency.toFixed(3);
    const frequencyObj = this.$store.state.acarsData.frequencies[frequencyString];
    let frequencyName = 'Unknown';

    if (frequencyObj) {
      frequencyName = frequencyObj.name;
    }

    return frequencyName;
  }

  highlightKnownCodesInText(text: string) : string {
    const explodedWords : Array<string> = text.split(' ');

    const highlightedWords = explodedWords.map((word) => {
      console.log(`Word: ${word}`);
      const airport = this.lookupAirportByIata(word);
      if (airport) {
        console.log('Airport found');
      }
      return word;
    });

    return highlightedWords.join(' ');
  }

  labelName(label: string) : string {
    const labelObj = this.$store.state.acarsData.labels[label];
    let labelName = 'Unknown';

    if (labelObj) {
      labelName = labelObj.name;
    }

    return labelName;
  }

  lookupAirportByIata(iata: string) : any {
    const airportsArray : Array<any> = this.$store.state.acarsData.airports;
    // console.log(airportsArray);
    const airport = airportsArray.find(e => e.iata === iata);

    return airport;
  }

  convertNewlinesToBRs(text: string) : string {
    console.log(this.$store);
    return text.replace('\n', '<br>');
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
        console.log(parts);

        const coordsRegex = /(?<lac>[NS])(?<la>\d+)(?<lnc>[EW])(?<ln>\d+)/;
        const results = parts[0].match(coordsRegex);
        console.log(results);

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
            console.log('DT result');
            console.log(result);
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
      let network = this.$store.state.acarsData.labels.SQ.decoderHints.brands[message.text[3]];
      let airport;
      let iataCode;
      let icaoCode;
      let latitude;
      let longitude;
      let vdlFrequency;

      if (!network) {
        network = 'Unknown';
      }

      if (preamble === '02XA') {
        const regex = /0(\d)X(?<org>\w)(?<iata>\w\w\w)(?<icao>\w\w\w\w)(?<lat>\d+[NS])(?<lng>\d+[EW])V(?<vfreq>\d+)\/ARINC/;
        const result = message.text.match(regex);
        // console.log(result);

        if (result.length === 8) {
          iataCode = result.groups.iata;
          icaoCode = result.groups.icao;
          airport = this.lookupAirportByIata(iataCode);
          latitude = result.groups.lat;
          longitude = result.groups.lng;
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
        airport,
        latitude,
        longitude,
        vdlFrequency,
      };

      decodedString = `
        <div>${decodedMessage.description}</div>
        <div>Network: ${decodedMessage.network}</div>
      `;

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
}
</script>

<style scoped>
</style>
