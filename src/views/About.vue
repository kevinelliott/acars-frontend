<template>
  <div class="about container text-center">
    <div class="d-flex justify-content-center">
      <div class="w-75">
        <h1>About</h1>
        <div class="mb-4 text-justify">
          This is an ACARS aggregation server. The data here is comprised of volunteer feeders.
          In order to see the roadmap or submit a feature request, visit the
          <a href="https://trello.com/b/1vq5pHNq/acars-server-public-board" target="_blank">
            Acars Server Public Trello Board
          </a>.
        </div>
        <br>
        <h1>Feeding</h1>
        <div class="mb-4 text-justify">
          The more data we receive, the more benefit to development and to other users there is.
          Consider sending in your ACARS and VDL2 traffic.
        </div>
        <h4>ACARS</h4>
        <div class="mb-3 text-justify">
          We currently support <a href="https://github.com/TLeconte/acarsdec" target="_blank">acarsdec</a>
          by <a href="https://github.com/TLeconte" target="_blank">Thierry Leconte</a>. Follow the
          directions at his GitHub repository to download/install it. Alternatively, if you wish to
          have station idents longer than 8 characters, use the
          <a href="https://github.com/TanerH/acarsdec" target="_blank">acarsdec</a> fork
          maintained by <a href="https://github.com/TanerH" target="_blank">Taner H</a>.
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
          in the same locale).
        </div>
        <div class="mb-2 text-justify">
          You are welcome to add additional identifiers to the end of it (such as
          <code>-ACARS</code> or <code>-VDL2</code>) to further clarify your station identification,
          as long as you are using the acarsdec fork by Taner mentioned above.
        </div>
        <div class="mb-4 text-justify">
          Be sure to use the correct values for gain, output (your local terminal), and the
          frequencies to scan. They may be very different from the ones I provide in the example
          above.
        </div>
        <div class="mb-4 text-justify">
          Support for additional ACARS decoder clients and protocols are in development and will
          be available soon.
        </div>

        <br>
        <h4>VDL Mode 2</h4>
        <div class="mb-2 text-justify">
          Documentation for using vdlm2dec is coming soon, but if you are savvy you may use it
          now following a similar syntax as above.
        </div>
      </div>
    </div>
  </div>
</template>
