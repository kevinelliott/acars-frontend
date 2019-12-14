export class MessageFilter {
  messages : Array<any> = [];

  constructor(messages: Array<any>) {
    this.messages = messages;
  }

  excludeByErrors(errorsToExclude: Array<string>) : MessageFilter {
    this.messages = this.messages.filter(message => !errorsToExclude.includes(message.error));
    return this;
  }

  excludeByLabels(labelsToExclude: Array<string>) : MessageFilter {
    this.messages = this.messages.filter(message => !labelsToExclude.includes(message.label));
    return this;
  }

  includeByLabels(labelsToInclude: Array<string>) : MessageFilter {
    if (labelsToInclude.length > 0) {
      this.messages = this.messages.filter(message => labelsToInclude.includes(message.label));
    }
    return this;
  }

  includeByAirframes(airframeIdsToInclude: Array<string>) : MessageFilter {
    if (airframeIdsToInclude.length > 0) {
      this.messages = this.messages.filter((message: any) => airframeIdsToInclude.includes(message.airframe.id)); // eslint-disable-line max-len
    }
    return this;
  }

  includeByStations(stationsIdsToInclude: Array<string>) : MessageFilter {
    if (stationsIdsToInclude.length > 0) {
      this.messages = this.messages.filter((message: any) => stationsIdsToInclude.includes(message.station.id)); // eslint-disable-line max-len
    }
    return this;
  }

  includeByText(textToInclude: string) : MessageFilter {
    if (textToInclude && textToInclude !== '') {
      this.messages = this.messages.filter(message => message.text.includes(textToInclude));
    }
    return this;
  }

  filter(): Array<any> {
    return this.messages;
  }

  limit(count: number) : MessageFilter {
    this.messages = this.messages.slice(0, count);
    return this;
  }
}

export default {
};
