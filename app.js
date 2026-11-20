(() => {
  "use strict";
  const main = document.getElementById("main");
  const nav = document.getElementById("primary");
  const menu = document.querySelector(".menu-toggle");
  const social = window.GRLSocial;
  const series = [
    {
      id: "garys-rock-run",
      name: "Gary’s Rock Run",
      art: "rock-run",
      label: "GRL original",
    },
    {
      id: "melissa-on-main",
      name: "Melissa On Main",
      art: "main-street",
      label: "GRL original",
    },
    {
      id: "real-bartenders",
      name: "The Real Bartenders of Grapevine",
      art: "bartenders",
      label: "GRL original",
    },
    {
      id: "live-music-guide",
      name: "Live Music Guide",
      art: null,
      label: "Two editions a week",
    },
    {
      id: "late-night-lauren",
      name: "Late Night Lauren",
      art: null,
      label: "GRL original",
    },
    {
      id: "band-of-the-month",
      name: "Band of the Month",
      art: null,
      label: "Music feature",
    },
  ];
  const plans = [
    [
      "community",
      "Community",
      "Venue profile and partner recognition in the twice-weekly music guides, alongside regular music coverage.",
    ],
    [
      "featured",
      "Featured",
      "Community benefits plus a dedicated promotional social post each month and opportunities for a coordinated feature.",
    ],
    [
      "premier",
      "Premier",
      "Featured benefits with priority placement, two dedicated promotional posts per month and planning for special campaigns.",
    ],
  ];
  const businesses = [
    {
      id: "guitar-loft",
      name: "Grapevine Guitar Loft",
      kind: "Music shop",
      address: "1641 W. Northwest Hwy",
      text: "Head upstairs at the Grapevine Antique Market for acoustic and electric guitars, ukuleles and accessories.",
      url: "https://www.guitarasaur.com/",
      video: [
        "Shop video on YouTube",
        "https://www.youtube.com/watch?v=_GDRWvdhpC8",
      ],
    },
    {
      id: "vetro",
      name: "Vetro Glassblowing Studio & Fine Art Gallery",
      kind: "Arts & makers",
      address: "701 S. Main St., Suite 103",
      text: "A working glass studio and gallery on South Main. Its Help Create events invite visitors to assist a glass artist with a piece of their own.",
      url: "https://vetroartglass.com/",
    },
    {
      id: "antique-market",
      name: "Grapevine Antique Market",
      kind: "Records & antiques",
      address: "1641 W. Northwest Hwy",
      text: "Record bins, antiques and collectibles share a roof with a guitar shop and Coco’s Tea Room.",
      url: "https://www.grapevineantiquemarket.com/",
    },
  ];
  const esc = (s = "") =>
    String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const external = (label, url) =>
    '<a href="' + esc(url) + '" rel="external noopener">' + esc(label) + "</a>";
  const button = (label, to, style = "") =>
    '<a class="btn ' + style + '" href="' + to + '">' + label + "</a>";
  const header = (k, title, sub, color = "") =>
    '<section class="pagehead ' +
    color +
    '"><div class="wrap"><p class="kicker">' +
    k +
    '</p><h1 class="big-title">' +
    title +
    "</h1>" +
    (sub ? '<p class="sub">' + sub + "</p>" : "") +
    "</div></section>";
  const card = (s) =>
    '<a class="series-card" href="#series/' +
    s.id +
    '"><img src="assets/' +
    s.art +
    '.webp" width="724" height="724" loading="lazy" alt=""><div class="card-body"><span class="tag">' +
    s.label +
    "</span><h3>" +
    s.name +
    "</h3></div></a>";
  const profileLinks = () =>
    social.profiles.map((p) => external(p.label, p.url)).join(" · ");
  function reader(e) {
    if (
      e.platform !== "Instagram" ||
      !/^https:\/\/www\.instagram\.com\/(p|reel)\/[\w-]+\/?$/.test(e.url)
    )
      return "";
    return (
      '<details class="post-reader"><summary>View Instagram post here</summary><div data-embed="' +
      esc(e.url.replace(/\/$/, "") + "/embed/") +
      '" data-caption="' +
      esc(e.title) +
      '"></div><small>Instagram loads when opened. The original post also opens via the link above.</small></details>'
    );
  }
  function bindReaders() {
    main.querySelectorAll(".post-reader").forEach((box) =>
      box.addEventListener("toggle", () => {
        const host = box.querySelector("[data-embed]");
        if (!box.open) {
          host.replaceChildren();
          return;
        }
        if (host.firstChild) return;
        const frame = document.createElement("iframe");
        frame.src = host.dataset.embed;
        frame.title = "Instagram post: " + host.dataset.caption;
        frame.allowFullscreen = true;
        frame.setAttribute(
          "allow",
          "encrypted-media; fullscreen; picture-in-picture",
        );
        frame.referrerPolicy = "strict-origin-when-cross-origin";
        host.append(frame);
      }),
    );
  }
  const episodeList = (list) =>
    list
      .map(
        (e) =>
          '<article class="story"><span class="meta">' +
          esc(e.platform) +
          (e.date ? " · " + esc(e.date) : "") +
          "</span><h2>" +
          esc(e.title) +
          "</h2><p>" +
          esc(e.description) +
          "</p>" +
          external("Open original on " + e.platform, e.url) +
          reader(e) +
          "</article>",
      )
      .join("");
  function home() {
    return (
      '<section class="hero"><div class="wrap hero-in"><div class="hero-copy"><p class="eyebrow edition">The weekend edition · Nov 20–22, 2026</p><h1>Grapevine<br><span>After Dark.</span></h1><p>Find a band, pick a room, and make a night of it. Your field guide to live music in Grapevine, Texas.</p><div class="hero-actions">' +
      button("Explore the music guide", "#guide") +
      '<a class="text-link" href="#tv">Explore GRL TV</a></div></div><figure class="poster"><img src="assets/hero.webp" fetchpriority="high" width="1350" height="900" alt="An illustrated guitarist in a fringed jacket under a hot-pink and orange stage sun."><figcaption><span>GRAPEVINE ROCKS LIVE</span><span><span class="poster-star" aria-hidden="true">★</span> TEXAS</span></figcaption></figure></div></section>' +
      '<div class="music-strip"><div class="wrap" aria-label="Music covered">Rock <i aria-hidden="true">✦</i> Country <i aria-hidden="true">✦</i> Blues <i aria-hidden="true">✦</i> Americana <i aria-hidden="true">✦</i> Pop <i aria-hidden="true">✦</i> Live in Grapevine</div></div>' +
      '<section class="band"><div class="wrap"><div class="top-line"><div><p class="kicker">November 2026 · Venue listings</p><h2 class="display">On the bill</h2></div><a class="text-link" href="#guide">See the full guide</a></div><div class="home-guide">' +
      window.GRLGuide.homeRows() +
      '</div><p class="home-original">Read the original <a href="https://www.instagram.com/p/Df6zjpSFMKI/">GRL weekend guide on Instagram</a> or explore <a href="#events">community events</a>.</p></div></section>' +
      '<section class="band tv-band"><div class="wrap"><div class="top-line"><div><p class="kicker">Original programming</p><h2 class="display">GRL TV</h2></div><a class="text-link" href="#tv">Browse all series</a></div><div class="card-grid">' +
      series.slice(0, 3).map(card).join("") +
      "</div></div></section>" +
      '<section class="band newsletter-call"><div class="wrap"><div><p class="eyebrow">The music newsletter</p><h2 class="display">The guide in your inbox.</h2><p>Choose the music and local stories you want to hear about.</p></div>' +
      button("Preview newsletter signup", "#newsletter", "ink") +
      "</div></section>"
    );
  }
  function television() {
    const feature =
      social.episodes.find((e) => e.series === "real-bartenders") ||
      social.episodes[0];
    let featured = "";
    if (feature) {
      const program = series.find((s) => s.id === feature.series);
      featured =
        '<section class="tv-feature"><img src="assets/' +
        (program?.art || "rock-run") +
        '.webp" alt=""><div><p class="eyebrow">From the GRL archive · ' +
        esc(feature.date) +
        "</p><h2>" +
        esc(feature.title) +
        "</h2><p>" +
        esc(feature.description) +
        "</p>" +
        external("Open original on " + feature.platform, feature.url) +
        "</div></section>";
    }
    return (
      header(
        "Original programming",
        "GRL TV",
        "Find the music guides, familiar faces and recurring series in the Grapevine Rocks Live lineup.",
        "lav",
      ) +
      '<div class="wrap compact">' +
      featured +
      '<p class="archive-invite"><a class="btn ink" href="#archive">Search the Instagram archive</a> <span>' +
      window.GRLPostIndex.length +
      ' posts · June–November 2026</span></p><section><h2 class="section-title">The series</h2><div class="card-grid">' +
      series.slice(0, 3).map(card).join("") +
      '</div><div class="tv-more">' +
      series
        .slice(3)
        .map(
          (s) =>
            '<article class="story"><span class="meta">' +
            s.label +
            '</span><h3 class="box-title"><a href="#series/' +
            s.id +
            '">' +
            s.name +
            "</a></h3></article>",
        )
        .join("") +
      "</div></section>" +
      (social.episodes.length
        ? '<section class="archive-list"><h2 class="section-title">Selected posts and episodes</h2>' +
          episodeList(social.episodes) +
          "</section>"
        : "") +
      (social.profiles.length
        ? '<p class="notice">Find GRL on ' + profileLinks() + ".</p>"
        : "") +
      "</div>"
    );
  }
  function seriesView(id) {
    const s = series.find((item) => item.id === id);
    if (!s) return missing();
    const eps = social.episodes.filter((e) => e.series === id);
    const description = {
      "garys-rock-run": "Follow Gary and his camera between Grapevine shows.",
      "melissa-on-main": "Music on Main through Melissa’s GRL coverage.",
      "real-bartenders": "GRL’s series on the people behind Grapevine’s bars.",
      "live-music-guide":
        "The Monday–Thursday and Friday–Sunday guides bring Grapevine’s show listings together in two editions each week.",
      "late-night-lauren":
        "Lauren takes the microphone out into Grapevine’s music scene.",
      "band-of-the-month":
        "A series named in GRL’s programming lineup. An episode link will appear here once GRL confirms a release.",
    };
    return (
      header("GRL TV · Series", s.name, description[id], "lav") +
      '<div class="wrap compact"><a class="trail" href="#tv">All GRL TV series</a><div class="' +
      (s.art ? "series-layout" : "") +
      '">' +
      (s.art
        ? '<img src="assets/' +
          s.art +
          '.webp" alt="" width="724" height="724">'
        : "") +
      '<section><h2 class="section-title">' +
      (eps.length ? "From the series" : "Series archive") +
      "</h2>" +
      (eps.length
        ? episodeList(eps)
        : "<p>Episode links for this series are awaiting confirmation from GRL.</p>") +
      (id === "live-music-guide"
        ? button("Browse the music guide", "#guide")
        : "") +
      (social.profiles.length
        ? "<p>Find Grapevine Rocks Live on " + profileLinks() + ".</p>"
        : "") +
      "</section></div></div>"
    );
  }
  function local() {
    return (
      header(
        "Around Grapevine",
        "Local business",
        "Dig for a record, try out a guitar or meet the artists working on South Main.",
        "org",
      ) +
      '<div class="wrap compact"><p class="demo-note">Independent directory selections. Each profile links to the business’s own information.</p>' +
      businesses
        .map(
          (b) =>
            '<article class="story"><span class="meta">' +
            b.kind +
            " · " +
            b.address +
            '</span><h2><a href="#business/' +
            b.id +
            '">' +
            b.name +
            "</a></h2><p>" +
            b.text +
            "</p></article>",
        )
        .join("") +
      '<a class="text-link" href="#partners">Explore business spotlights and production</a></div>'
    );
  }
  function business(id) {
    const b = businesses.find((b) => b.id === id);
    if (!b) return missing();
    return (
      header(
        "Local business · " + b.kind,
        b.name,
        b.address + ", Grapevine, TX",
        "org",
      ) +
      '<div class="wrap compact stack"><a class="trail" href="#local">All local businesses</a><p class="sub">' +
      b.text +
      '</p><p class="inline-links">' +
      external("Official business website", b.url) +
      (b.video ? external(b.video[0], b.video[1]) : "") +
      (b.id === "guitar-loft"
        ? external(
            "GRL’s Guitar Joe feature on Instagram",
            "https://www.instagram.com/p/Dd7zZY7NKOb/",
          )
        : "") +
      "</p></div>"
    );
  }
  function events() {
    return (
      header(
        "Community calendar",
        "Around town",
        "Two dates from Grapevine’s published community calendar. Follow the organizer for updates.",
        "org",
      ) +
      '<div class="wrap compact"><article class="story"><span class="meta">Monday · November 23, 2026 · 4–8 PM</span><h2>38th Annual Carol of Lights</h2><p>Historic Main Street hosts the city’s holiday kickoff. GRL’s guide lists the Zack King Band at 5:45 PM and Sleigher at 7 PM on the South Pole Stage near AJ’s on Main.</p><div class="inline-links">' +
      external(
        "Organizer schedule and locations",
        "https://gograpevine.com/event/carol-of-lights-presented-by-grapevine-dodge-chrysler-jeep-ram/",
      ) +
      external(
        "Read GRL’s event guide on Instagram",
        "https://www.instagram.com/p/Df73A3YFM9f/",
      ) +
      '</div></article><article class="story"><span class="meta">Friday · December 4, 2026 · Palace Theatre</span><h2>Big Band Holiday Swing Thing</h2><p>A holiday concert at 300 S. Main Street. The Grapevine Convention &amp; Visitors Bureau lists the performance and ticket information.</p>' +
      external(
        "Official concert listing",
        "https://www.grapevinetexasusa.com/event/big-band-holiday-swing-thing/41907/",
      ) +
      "</article></div>"
    );
  }
  function partners() {
    return (
      header(
        "Partnerships & production",
        "Work with GRL",
        "Bring a venue, a local business or a program idea to Grapevine Rocks Live.",
        "rose",
      ) +
      '<div class="wrap compact"><section><h2 class="section-title">Monthly venue partnerships</h2><p class="sub">Three proposed options for rooms that host live music. All local venues can submit shows for editorial review.</p><div class="plan-grid">' +
      plans
        .map(
          ([id, n, d]) =>
            '<article class="plan"><h3>' +
            n +
            "</h3><p>" +
            d +
            '</p><a href="#inquiry/' +
            id +
            '">Explore ' +
            n +
            "</a></article>",
        )
        .join("") +
      "</div></section>" +
      '<section class="show-sections split-panel"><article class="story"><span class="meta">For businesses & venues</span><h2>Production and spotlights</h2><p>Plan an owner interview, a behind-the-scenes feature or coverage of a special event. Each project can be scoped by filming, editing and promotion. Paid media is a separate expense.</p>' +
      button("Plan a project", "#inquiry/production") +
      '</article><article class="story"><span class="meta">For sponsors</span><h2>Advertising and sponsorship</h2><p>Explore a program, a newsletter placement or an event sponsorship. Placement, timing and creative can be discussed for each campaign.</p>' +
      button("Explore sponsorship", "#inquiry/sponsorship", "light") +
      '</article></section><section class="coverage"><p class="kicker">From GRL’s coverage</p><h2 class="box-title">See the work</h2><p>Meet a local guitar repairer or step behind the bar with Alister King. These published stories show the kinds of people a business feature can introduce.</p><div class="inline-links"><a href="https://www.instagram.com/p/Dd7zZY7NKOb/">Guitar Joe at the Guitar Loft</a><a href="https://www.instagram.com/reel/Df3BniVt2Sc/">Alister King on Real Bartenders</a></div></section><p class="notice">This is the partnership preview. Individual quotes and payment links are shared privately after terms are agreed.</p></div>'
    );
  }
  const tracks = [
    ...plans.map(([id, name]) => [id, name + " venue partnership"]),
    ["custom", "Custom venue arrangement"],
    ["production", "One-time production project"],
    ["sponsorship", "Advertising or sponsorship"],
  ];
  function inquiry(id) {
    const track = tracks.find((a) => a[0] === id) || tracks[0];
    return (
      header(
        "Work with GRL",
        "Plan an inquiry",
        "Try the steps a venue or business would take to request terms.",
        "rose",
      ) +
      '<div class="wrap compact"><a href="#partners" class="trail">Partnerships and services</a><div class="content-form"><p class="demo-note">Practice form. Use example details. This preview shows the inquiry locally and does not send it to GRL.</p><form id="inquiry-form"><label for="service">What would you like to discuss?</label><select id="service" name="service">' +
      tracks
        .map(
          ([k, n]) =>
            '<option value="' +
            k +
            '" ' +
            (k === track[0] ? "selected" : "") +
            ">" +
            n +
            "</option>",
        )
        .join("") +
      '</select><label for="business-name">Example business name</label><input id="business-name" name="business" type="text" maxlength="100" placeholder="Example Music Room" required><label for="project">What do you have in mind?</label><textarea name="project" id="project" maxlength="700" placeholder="A spotlight on our weekly songwriter night." required></textarea><button class="btn">Review inquiry</button></form><div id="inquiry-result" role="status"></div></div></div>'
    );
  }
  function bindInquiry() {
    const f = document.getElementById("inquiry-form");
    if (!f) return;
    f.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const data = new FormData(f);
      const who = String(data.get("business")).trim(),
        what = String(data.get("project")).trim();
      if (!who || !what) {
        document.getElementById("inquiry-result").innerHTML =
          '<p class="notice">Add an example business name and project description.</p>';
        return;
      }
      const kind = tracks.find((t) => t[0] === data.get("service"));
      const subscription =
        plans.some((p) => p[0] === kind[0]) || kind[0] === "custom";
      document.getElementById("inquiry-result").innerHTML =
        '<div class="notice stack"><h2 class="box-title">Inquiry preview</h2><p><strong>' +
        esc(who) +
        "</strong> · " +
        esc(kind[1]) +
        "</p><p>" +
        esc(what) +
        "</p><p>" +
        (subscription
          ? "After private agreement, a venue would receive a hosted signup link for recurring billing."
          : "After private agreement, the business would receive its scoped quote and a hosted payment link or invoice.") +
        "</p><p>This practice inquiry ends here. No inquiry was sent or payment taken.</p></div>";
    });
  }
  function newsletter() {
    return (
      header(
        "Newsletter",
        "The guide in your inbox.",
        "Music picks, event announcements and dispatches from around Grapevine.",
        "org",
      ) +
      '<div class="wrap compact"><div class="content-form"><p class="demo-note">Try signup with an example address such as fan@example.com. This preview sends no email and saves no contact details.</p><form id="newsletter-form"><label for="reader-name">First name <span>(optional)</span></label><input type="text" id="reader-name" maxlength="60" autocomplete="off" placeholder="Example name"><label for="reader-email">Example email</label><input type="email" id="reader-email" placeholder="fan@example.com" autocomplete="off" required><label for="reader-role">I’m here as <span>(optional)</span></label><select id="reader-role"><option value="">Choose an option</option><option>Music fan</option><option>Musician</option><option>Venue or business owner</option></select><label for="favorite-venue">Favorite venue <span>(optional)</span></label><select id="favorite-venue"><option value="">Choose a venue</option>' +
      window.GRLGuide.getVenues()
        .map((v) => "<option>" + esc(v.name) + "</option>")
        .join("") +
      "</select><fieldset><legend>Interests <span>(optional)</span></legend>" +
      [
        "Live music guides",
        "GRL TV and interviews",
        "Special events",
        "Merchandise and partner offers",
      ]
        .map(
          (x) =>
            '<label class="choice"><input type="checkbox" name="interest" value="' +
            x +
            '">' +
            x +
            "</label>",
        )
        .join("") +
      '</fieldset><label class="choice"><input type="checkbox" id="consent" required> I opt in to the selected GRL email updates for this demonstration.</label><button class="btn">Preview signup</button></form><div id="newsletter-result" role="status"></div></div></div>'
    );
  }
  function bindNewsletter() {
    const f = document.getElementById("newsletter-form");
    if (!f) return;
    const email = document.getElementById("reader-email"),
      result = document.getElementById("newsletter-result");
    email.addEventListener("input", () => email.setCustomValidity(""));
    f.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (!/@example\.(com|org|net)$/i.test(email.value.trim())) {
        email.setCustomValidity(
          "Please use a sample address ending in @example.com, @example.net or @example.org.",
        );
        email.reportValidity();
        return;
      }
      f.hidden = true;
      result.innerHTML =
        '<div class="notice stack"><h2 class="box-title">Signup preview complete</h2><p>In the live service, you would confirm your address by email. This demonstration has no mailing list.</p><button id="unsub" class="btn light">Try unsubscribing</button></div>';
      document.getElementById("unsub").focus();
      document.getElementById("unsub").addEventListener("click", () => {
        f.reset();
        f.hidden = false;
        result.innerHTML =
          '<p class="notice">Demo unsubscribe complete. You can try the form again.</p>';
        email.focus();
      });
    });
  }
  function about() {
    return (
      header(
        "Grapevine, Texas",
        "About this preview",
        "A website concept for Grapevine Rocks Live, built around the local music guide.",
      ) +
      '<div class="wrap compact about-copy"><h2 class="box-title">Listings and corrections</h2><p>This edition is a dated snapshot assembled from public venue calendars. Open a show for its source and check the venue before heading out. Updates in the demo editor stay in the browser where you make them.</p><h2 class="box-title">The artwork</h2><p>The concert poster and GRL TV illustrations were created for this concept. They depict imagined scenes. Original performance photography, episode art and credits can be added with contributor approval.</p><h2 class="box-title">About GRL</h2><p>Grapevine Rocks Live covers local music and entertainment. The Grapevine Chamber lists the organization under Event and Entertainment Productions.</p><p>' +
      external(
        "Grapevine Chamber listing",
        "https://business.grapevinechamber.org/list/member/grapevine-rocks-live-15383",
      ) +
      "</p>" +
      (social.profiles.length
        ? '<h2 class="box-title">GRL on social</h2><p>' +
          profileLinks() +
          "</p>"
        : "") +
      '<h2 class="box-title">Trying the site</h2><p>The signup, inquiry and editorial tools are demonstrations. Use example information. The live venue and media links open externally.</p></div>'
    );
  }
  function missing() {
    return (
      header(
        "Navigation",
        "Page not found",
        "Try the music guide or browse the GRL TV lineup.",
      ) +
      '<div class="wrap compact">' +
      button("Open the guide", "#guide") +
      "</div>"
    );
  }
  const routes = {
    home,
    events,
    archive: window.GRLArchive.render,
    tv: television,
    series: seriesView,
    local,
    business,
    partners,
    inquiry,
    newsletter,
    about,
  };
  function closeMenu() {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  }
  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      closeMenu();
      menu.focus();
    }
  });
  document.querySelector(".skip").addEventListener("click", (e) => {
    e.preventDefault();
    main.focus();
    main.scrollIntoView();
  });
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeMenu();
  });
  document.getElementById("social-links").innerHTML = profileLinks();
  function render() {
    closeMenu();
    let [route, id = ""] = location.hash.slice(1).split("/");
    route = route || "home";
    if (!/^[\w-]+$/.test(id) && id) id = "";
    const family =
      {
        show: "guide",
        venue: "venues",
        series: "tv",
        archive: "tv",
        business: "local",
        inquiry: "partners",
      }[route] || route;
    nav.querySelectorAll("a").forEach((a) => {
      if (a.hash === "#" + family) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    if (!window.GRLGuide.handles(route)) {
      main.innerHTML = Object.hasOwn(routes, route)
        ? routes[route](id)
        : missing();
      document.title =
        (main.querySelector("h1")?.innerText.replace(/\s+/g, " ") ||
          "Music guide") + " | Grapevine Rocks Live";
      bindInquiry();
      bindNewsletter();
      bindReaders();
      window.GRLArchive.bind();
    } else {
      window.GRLGuide.render(route, id);
    }
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", () => {
    render();
    main.focus({ preventScroll: true });
  });
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) render();
  });
  render();
})();
