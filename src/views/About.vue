<template>
  <div class="about text-center">
    <div id="nav" class="mt-0 pt-3 pb-3 bg-white border-bottom">
      <h3 class="m-0">About</h3>
    </div>
    <div class="mb-4 p-4 border-bottom">
      <div class="container">
        <div class="text-center">
          This is an ACARS aggregation server architected, designed and built by
          <a href="https://github.com/kevinelliott">Kevin Elliott</a>.
          The data available here is collected from volunteer feeders, aggregated, and processed.
          In order to see the roadmap or submit a feature request, visit the
          <a href="https://trello.com/b/1vq5pHNq/acars-server-public-board" target="_blank">
            Acars Server Public Trello Board</a>.
        </div>
      </div>
    </div>

    <div class="mb-4 container p-4 bg-white text-left">
      <div class="text-left">
        <h1>Feeding</h1>
      </div>
      <div class="mb-3 text-justify">
        The more data we receive, the more benefit to development and to other users there is.
        Consider sending in your ACARS and VDL2 traffic. Development areas that strongly benefit
        from collecting data from more feeders are:
      </div>
      <ul class="mb-4 text-left">
        <li>Message Decoders (making sense of the text in ACARS messages)</li>
        <li>Scalability (optimizing aggregator, database, API, and UI based on high load)</li>
        <li>Flight Positions (more data == more positions)</li>
        <li>Flight Continuity (more feeders == receive all data from a flight from A to B)</li>
      </ul>
      <h2 class="mb-4">Current Ingests</h2>
      <table class="mb-0 table table-sm">
        <tr>
          <th>Feeder App</th>
          <th>Source</th>
          <th>Availability</th>
          <th>Transport</th>
          <th>Port</th>
          <th>Format</th>
        <tr>
          <td>acarsdec</td>
          <td>ACARS</td>
          <td>Enabled</td>
          <td>UDP</td>
          <td>5550</td>
          <td>TLeconte JSON</td>
        </tr>
        <tr>
          <td>acarsdeco2</td>
          <td>ACARS</td>
          <td>Not yet available</td>
          <td>TCP</td>
          <td>5551</td>
          <td>SBS</td>
        </tr>
        <tr>
          <td>dumpvdl2</td>
          <td>VDL</td>
          <td>Not yet available</td>
          <td>UDP</td>
          <td>5552</td>
          <td>PlanePlotter</td>
        </tr>
        <tr>
          <td>JAERO C-Band</td>
          <td>SATCOM ACARS</td>
          <td>Enabled</td>
          <td>UDP</td>
          <td>5561</td>
          <td>Custom</td>
        </tr>
        <tr>
          <td>JAERO C-Band</td>
          <td>SATCOM ADS-C</td>
          <td>Enabled</td>
          <td>TCP</td>
          <td>5562</td>
          <td>SBS</td>
        </tr>
        <tr>
          <td>JAERO L-Band</td>
          <td>SATCOM ACARS</td>
          <td>Enabled</td>
          <td>UDP</td>
          <td>5571</td>
          <td>Custom</td>
        </tr>
        <tr>
          <td>vdlm2dec</td>
          <td>VDL</td>
          <td>Enabled</td>
          <td>UDP</td>
          <td>5555</td>
          <td>TLeconte JSON</td>
        </tr>
      </table>
    </div>
    <div class="mb-4 container p-4 bg-white text-left">
      <h4>ACARS</h4>
      <div class="mb-3 text-justify">
        We currently support <a href="https://github.com/TLeconte/acarsdec" target="_blank">acarsdec</a>
        by <a href="https://github.com/TLeconte" target="_blank">Thierry Leconte</a>. Follow the
        directions at his GitHub repository to download/install it. Thanks to
        <a href="https://github.com/TanerH" target="_blank">Taner H</a> for his contribution that allows
        us to have station idents longer than 8 characters.
      </div>
      <div class="mb-2 font-weight-bold text-muted">Example Usage</div>
      <div class="alert alert-info">
        acarsdec -v -o 4 -g 40 <strong>-i XX-YYYYZ -j feed.acars.io:5550</strong>
        -r 0 131.550 131.525 131.725 131.825 130.025 130.425 130.450 131.125
      </div>
      <div class="mb-2 text-justify">
        The important stuff is marked in bold.
      </div>
      <div class="mb-2 text-justify">
        Your identifier (indicated by the <code>-i</code> parameter) can be whatever you want it
        to be. Our recommendation is to use the <code>XX-YYYYZ</code> format, where
        <code>XX</code> is a two-digit representation of your initials or other personal id
        (mine is <code>KE</code>), <code>YYYY</code> is the nearest airport to you (mine is
        <code>KMHR</code>) and <code>Z</code> is the receiver number (in case you have multiple
        in the same locale). You are welcome to add additional identifiers to the end of it (such as
        <code>-ACARS</code> or <code>-VDL2</code>) to further clarify your station identification,
        as long as you are using the acarsdec fork by Taner mentioned above.
      </div>
      <div class="text-justify">
        Be sure to use the correct values for gain, output (your local terminal), and the
        frequencies to scan. They may be very different from the ones I provide in the example
        above.
      </div>
    </div>
    <div class="mb-4 container p-4 bg-white text-left">
      <h4>VDL</h4>
      <div class="mb-3 text-justify">
        We currently support <a href="https://github.com/TLeconte/vdlm2dec" target="_blank">vdlm2dec</a>
        by <a href="https://github.com/TLeconte" target="_blank">Thierry Leconte</a>. Follow the
        directions at his GitHub repository to download/install it.
      </div>
      <div class="mb-2 font-weight-bold text-muted">Example Usage</div>
      <div class="alert alert-info">
        vdlm2dec -v -J -G -E -U -g 200 <strong>-i XX-YYYYZ -j feed.acars.io:5550</strong>
        -r 0 136.650 136.800 136.975
      </div>
      <div class="mb-2 text-justify">
        The important stuff is marked in bold.
      </div>
      <div class="mb-2 text-justify">
        Your identifier (indicated by the <code>-i</code> parameter) can be whatever you want it
        to be. Our recommendation is to use the <code>XX-YYYYZ</code> format, where
        <code>XX</code> is a two-digit representation of your initials or other personal id
        (mine is <code>KE</code>), <code>YYYY</code> is the nearest airport to you (mine is
        <code>KMHR</code>) and <code>Z</code> is the receiver number (in case you have multiple
        in the same locale). You are welcome to add additional identifiers to the end of it (such as
        <code>-ACARS</code> or <code>-VDL2</code>) to further clarify your station identification,
        as long as you are using the acarsdec fork by Taner mentioned above.
      </div>
      <div class="text-justify">
        Be sure to use the correct values for gain, output (your local terminal), and the
        frequencies to scan. They may be very different from the ones I provide in the example
        above.
      </div>
    </div>
    <div class="mb-4 container p-4 bg-white text-left">
      <div class="text-left">
        <h4>Need Help?</h4>
      </div>
      <div class="text-justify">
        If you need help getting set up, join the very active <strong>ADSBExchange</strong> Discord
        server. On the <strong>#project-acars</strong> channel there are other volunteer feeders who
        can share their configurations and help you squash any issues you may have.
      </div>
    </div>
  </div>
</template>
