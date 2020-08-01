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
        <li>
          Message Decoders
          <span class="text-muted">(making sense of the text in ACARS messages)</span>
        </li>
        <li>
          Scalability
          <span class="text-muted">
            (optimizing aggregator, database, API, and UI based on high load)
          </span>
        </li>
        <li>
          Flight Positions
          <span class="text-muted">(more data == more positions)</span>
        </li>
        <li>
          Flight Continuity
          <span class="text-muted">
            (more feeders == receive all data from a flight from A to B)
          </span>
        </li>
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
      <div class="text-left">
        <h4>Need Help?</h4>
      </div>
      <div class="text-justify">
        If you need help getting set up, join the very active
        <strong><a href="https://discord.gg/S6z64Gw">ADSBExchange</a></strong> Discord
        server. On the
        <strong><a href="https://discord.gg/3PEBAhY">#project-acars</a></strong> channel there are
        other volunteer feeders who can share their configurations and help you squash any issues
        you may have.
      </div>
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
        acarsdec -v -o 4 -g 280 <strong>-i XX-YYYYZ -j feed.acars.io:5550</strong>
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
      <div class="mb-4 text-justify">
        Be sure to use the correct values for gain, output (your local terminal), and the
        frequencies to scan. They may be very different from the ones I provide in the example
        above.
      </div>

      <div class="mb-2 font-weight-bold text-muted">
        Frequencies
      </div>
      <div class="mb-2">
        <table class="table table-sm">
          <thead>
            <tr>
              <th>Frequency</th>
              <th>Locations</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>129.125</td>
              <td>USA, Canada</td>
              <td>Essentially none</td>
            </tr>
            <tr>
              <td>130.025</td>
              <td>USA, Canada</td>
              <td>High</td>
            </tr>
            <tr>
              <td>130.425</td>
              <td>USA</td>
              <td>Low</td>
            </tr>
            <tr>
              <td>130.450</td>
              <td>USA, Canada</td>
              <td>High</td>
            </tr>
            <tr>
              <td>130.825</td>
              <td>Europe</td>
              <td>Low</td>
            </tr>
            <tr>
              <td>130.850</td>
              <td>Europe</td>
              <td>Unknown, need to test</td>
            </tr>
            <tr>
              <td>131.125</td>
              <td>USA, Canada</td>
              <td>Medium</td>
            </tr>
            <tr>
              <td>131.425</td>
              <td></td>
              <td>Very Low</td>
            </tr>
            <tr>
              <td>131.450</td>
              <td>Japan</td>
              <td>Low</td>
            </tr>
            <tr>
              <td>131.475</td>
              <td>Canada</td>
              <td>Medium</td>
            </tr>
            <tr>
              <td>131.525</td>
              <td>Europe</td>
              <td>Low</td>
            </tr>
            <tr>
              <td>131.550</td>
              <td>Worldwide</td>
              <td>High</td>
            </tr>
            <tr>
              <td>131.725</td>
              <td>Europe</td>
              <td>High</td>
            </tr>
            <tr>
              <td>131.825</td>
              <td></td>
              <td>Medium</td>
            </tr>
            <tr>
              <td>131.850</td>
              <td>Europe</td>
              <td>Low</td>
            </tr>
            <tr>
              <td>136.700</td>
              <td>USA</td>
              <td>Unknown, need to test</td>
            </tr>
            <tr>
              <td>136.750</td>
              <td>USA, Europe</td>
              <td>Unknown, need to test</td>
            </tr>
            <tr>
              <td>136.800</td>
              <td>USA</td>
              <td>Unknown, need to test</td>
            </tr>
            <tr>
              <td>136.850</td>
              <td>USA, Canada</td>
              <td>Unknown, need to test</td>
            </tr>
            <tr>
              <td>136.900</td>
              <td>Europe</td>
              <td>Unknown, need to test</td>
            </tr>
            <tr>
              <td>136.925</td>
              <td>Europe</td>
              <td>Unknown, need to test</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mb-2">
        We have collected these frequencies for ACARS from around the Internet from a variety
        of documents, augmented by high quantities of real incoming data. Activity levels are
        measured from a worldwide aggreagate and have not yet been measured according to where
        the stations are receiving the data. We will update this information regularly as new
        data continues to come in.
      </div>
      <div>
        Please help us by testing and identifying new or existing channels with untested
        activity and letting us know if you receive traffic.
      </div>
    </div>

    <div class="mb-4 container p-4 bg-white text-left">
      <h4>VDL (VHF Data Link)</h4>
      <div class="mb-3 text-justify">
        We currently support <a href="https://github.com/TLeconte/vdlm2dec" target="_blank">vdlm2dec</a>
        by <a href="https://github.com/TLeconte" target="_blank">Thierry Leconte</a>. Follow the
        directions at his GitHub repository to download/install it.
      </div>
      <div class="mb-2 font-weight-bold text-muted">Example Usage</div>
      <div class="alert alert-info">
        vdlm2dec -v -J -G -E -U -g 200 <strong>-i XX-YYYYZ -j feed.acars.io:5555</strong>
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
      <div class="mb-2 font-weight-bold text-muted">
        Frequencies
      </div>
      <div class="mb-2">
        <table class="table table-sm">
          <thead>
            <tr>
              <th>Frequency</th>
              <th>Locations</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>136.650</td>
              <td></td>
              <td>High</td>
            </tr>
            <tr>
              <td>136.725</td>
              <td></td>
              <td>Low</td>
            </tr>
            <tr>
              <td>136.775</td>
              <td></td>
              <td>Medium</td>
            </tr>
            <tr>
              <td>136.800</td>
              <td></td>
              <td>High</td>
            </tr>
            <tr>
              <td>136.825</td>
              <td></td>
              <td>Low</td>
            </tr>
            <tr>
              <td>136.875</td>
              <td></td>
              <td>Medium</td>
            </tr>
            <tr>
              <td>136.925</td>
              <td></td>
              <td>Essentially none</td>
            </tr>
            <tr>
              <td>136.975</td>
              <td>Europe</td>
              <td>Very High</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mb-2">
        Like ACARS, we have collected these frequencies for VDL from around the Internet from a
        variety of documents, augmented by high quantities of real incoming data. Activity levels
        are measured from a worldwide aggreagate and have not yet been measured according to where
        the stations are receiving the data. We will update this information regularly as new
        data continues to come in.
      </div>
      <div>
        Please help us by testing and identifying new or existing channels with untested
        activity and letting us know if you receive traffic.
      </div>
    </div>

    <div class="mb-4 container p-4 bg-white text-left">
      <h4>HFDL (High Frequency Data Link)</h4>
      <div class="mb-3 text-justify">
        We do not currently have an HFDL client that we support. We are evaluating the options
        and will update this section when we have a more definitive solution to receiving and
        processing ACARS from HF. If you are currently receiving HFDL, please be in touch
        with us on the #project-acars channel on the ADSBExchange Discord server.
      </div>
      <div class="mb-2 font-weight-bold text-muted">
        Frequencies
      </div>
      <div class="mb-2 text-nowrap">
        <table class="table table-sm table-responsive">
          <thead>
            <tr>
              <th>Ground Station ID</th>
              <th>Location</th>
              <th colspan="19">Frequencies (MHz)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GS01</td>
              <td>San Francisco, California</td>
              <td>21.934</td>
              <td>17.919</td>
              <td>12.276</td>
              <td>11.327</td>
              <td>10.081</td>
              <td>8.927</td>
              <td>6.559</td>
              <td>5.508</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>GS02</td>
              <td>Molokai, Hawaii</td>
              <td>21.937</td>
              <td>17.919</td>
              <td>13.324</td>
              <td>13.312</td>
              <td>13.276</td>
              <td>11.348</td>
              <td>11.312</td>
              <td>10.027</td>
              <td>8.936</td>
              <td>8.912</td>
              <td>6.565</td>
              <td>5.514</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>GS03</td>
              <td>Reykjavik, Iceland</td>
              <td>17.985</td>
              <td>15.025</td>
              <td>11.184</td>
              <td>8.977</td>
              <td>6.712</td>
              <td>5.720</td>
              <td>3.900</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>GS04</td>
              <td>Riverhead, New York</td>
              <td>21.931</td>
              <td>17.919</td>
              <td>13.276</td>
              <td>11.387</td>
              <td>8.912</td>
              <td>6.661</td>
              <td>5.652</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>GS05</td>
              <td>Auckland, New Zealand</td>
              <td>17.916</td>
              <td>13.351</td>
              <td>10.084</td>
              <td>8.921</td>
              <td>6.535</td>
              <td>5.583</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>GS06</td>
              <td>Hat Yai, Thailand</td>
              <td>21.949</td>
              <td>17.928</td>
              <td>13.270</td>
              <td>10.066</td>
              <td>8.825</td>
              <td>6.535</td>
              <td>5.655</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>GS07</td>
              <td>Shannon, Ireland</td>
              <td>11.384</td>
              <td>10.081</td>
              <td>8.942</td>
              <td>8.843</td>
              <td>6.532</td>
              <td>5.547</td>
              <td>3.455</td>
              <td>2.998</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>GS08</td>
              <td>Johannesburg, South Africa</td>
              <td>21.949</td>
              <td>17.922</td>
              <td>13.321</td>
              <td>11.321</td>
              <td>8.834</td>
              <td>5.529</td>
              <td>4.681</td>
              <td>3.016</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>GS09</td>
              <td>Barrow, Alaska</td>
              <td>21.937</td>
              <td>21.928</td>
              <td>17.934</td>
              <td>17.919</td>
              <td>11.354</td>
              <td>10.093</td>
              <td>10.027</td>
              <td>8.936</td>
              <td>8.927</td>
              <td>6.646</td>
              <td>5.544</td>
              <td>5.538</td>
              <td>5.529</td>
              <td>4.687</td>
              <td>4.654</td>
              <td>3.497</td>
              <td>3.007</td>
              <td>2.992</td>
              <td>2.944</td>
            </tr>
            <tr>
              <td>GS10</td>
              <td>Muan, South Korea</td>
              <td>21.931</td>
              <td>17.958</td>
              <td>13.342</td>
              <td>10.060</td>
              <td>8.939</td>
              <td>6.619</td>
              <td>5.502</td>
              <td>2.941</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>GS11</td>
              <td>Albrook, Panama</td>
              <td>17.901</td>
              <td>13.264</td>
              <td>10.063</td>
              <td>8.894</td>
              <td>6.589</td>
              <td>5.589</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>GS12</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>GS13</td>
              <td>Santa Cruz, Bolivia</td>
              <td>21.997</td>
              <td>17.916</td>
              <td>13.315</td>
              <td>11.318</td>
              <td>8.957</td>
              <td>6.628</td>
              <td>4.660</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>GS14</td>
              <td>Krasnoyarsk, Russia</td>
              <td>21.990</td>
              <td>17.912</td>
              <td>13.321</td>
              <td>10.087</td>
              <td>8.886</td>
              <td>6.596</td>
              <td>5.622</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>GS15</td>
              <td>Al Muharraq, Bahrain</td>
              <td>21.982</td>
              <td>17.967</td>
              <td>13.354</td>
              <td>10.075</td>
              <td>8.885</td>
              <td>5.544</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>GS16</td>
              <td>Agana, Guam</td>
              <td>21.928</td>
              <td>17.919</td>
              <td>13.312</td>
              <td>11.306</td>
              <td>8.927</td>
              <td>6.652</td>
              <td>5.451</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>GS17</td>
              <td>Telde, Gran Canaria, Spain</td>
              <td>21.955</td>
              <td>17.928</td>
              <td>13.303</td>
              <td>11.348</td>
              <td>8.948</td>
              <td>6.529</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mb-2">
        These frequencies for HFDL have been collected from posts on the Internet and we are
        not yet sure how active they are. Some of them have been reported to be recently active
        but until we have conclusive data we will not identify the channels which are most
        active.
      </div>
      <div>
        If you have an HF rig/SDR, please help us by testing and identifying new or existing
        channels with untested activity and letting us know if you receive traffic or see
        transmissions visually in the waterfall.
      </div>
    </div>
  </div>
</template>
