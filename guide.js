(function () {
  "use strict";

  const STORAGE_KEY = "grl-concept-guide-v2";
  const DATA_VERSION = 4;
  const CHECKED_DATE = "2026-11-20";
  const GRL_WEEKEND_URL = "https://www.instagram.com/p/Df6zjpSFMKI/";
  const GRL_WEEKEND_SOURCE = {
    label: "GRL November 20–22 weekend guide",
    url: GRL_WEEKEND_URL,
  };
  const TOLBERTS_SOURCE = {
    label: "Tolbert’s official calendar",
    url: "https://tolbertsrestaurant.com/calendar/",
  };
  const HARVEST_EVENTS_SOURCE = {
    label: "Harvest Hall official events",
    url: "https://www.harvesthall.com/events",
  };
  const CHEZ_SOURCE = {
    label: "Chez Fabien official calendar",
    url: "https://chezfabienbistro.com/",
  };
  const PIAF_SOURCE = {
    label: "PIAF official live-music calendar",
    url: "https://piafkitchen.com/the-perch-rooftop-patio/",
  };

  function publishedEvent(data) {
    const sources = data.sources || [GRL_WEEKEND_SOURCE];
    const defaultSummary =
      sources.length > 1
        ? "Listed in GRL’s weekend guide and on the venue’s official calendar."
        : sources[0].url === GRL_WEEKEND_URL
          ? "Listed in GRL’s November 20–22 weekend guide."
          : "Listed on the venue’s official calendar.";
    return {
      endTime: "",
      genres: "Live music",
      cover: "Unlisted by source",
      summary: defaultSummary,
      link: sources[0].url,
      sourceUrl: sources[0].url,
      sourceName: sources.map((source) => source.label).join(" + "),
      sourceStatus:
        sources.length > 1
          ? "GRL + venue"
          : sources[0].url === GRL_WEEKEND_URL
            ? "GRL guide"
            : "Venue-published",
      sources,
      verifiedAt: CHECKED_DATE,
      status: "approved",
      concept: false,
      ...data,
    };
  }

  const initialState = {
    version: DATA_VERSION,
    revision: 0,
    venues: [
      {
        id: "tolberts",
        name: "Tolbert’s Restaurant & Chili Parlor",
        address: "423 South Main Street, Grapevine, TX 76051",
        url: "https://tolbertsrestaurant.com/",
        description:
          "A Main Street restaurant and concert room with a published live-music calendar.",
        features: ["Live music", "Food + bar", "Main Street"],
        context:
          "Venue profile seeded from official or municipal references; verify before publication.",
      },
      {
        id: "willhoites",
        name: "Willhoite’s Restaurant",
        address: "432 South Main Street, Grapevine, TX 76051",
        url: "https://www.willhoites.com/",
        description:
          "A long-running Grapevine restaurant and bar whose official site advertises live music Wednesday through Sunday.",
        features: ["Live music", "Food + bar", "Late night"],
        context:
          "Venue profile seeded from official or municipal references; verify before publication.",
      },
      {
        id: "ajs-on-main",
        name: "AJ’s on Main",
        address: "651 South Main Street, Grapevine, TX 76051",
        url: "https://www.ajsonmaintx.com/",
        description:
          "A Main Street barbecue destination listed in the City of Grapevine’s downtown guide.",
        features: ["Barbecue", "Main Street", "Local venue"],
        context:
          "Venue profile seeded from official or municipal references; verify before publication.",
      },
      {
        id: "third-rail",
        name: "Third Rail at Harvest Hall",
        address: "815 South Main Street, Grapevine, TX 76051",
        url: "https://www.harvesthall.com/about",
        description:
          "Harvest Hall’s intimate event space with a year-round mix of bands, DJs, comedy and community programming.",
        features: ["Live music", "Events", "Food hall"],
        context:
          "Venue profile seeded from an official source; verify before publication.",
      },
      {
        id: "glass-cactus",
        name: "Glass Cactus",
        address: "1501 Gaylord Trail, Grapevine, TX 76051",
        url: "https://glasscactus.gaylordtexan.com/nightlife",
        description:
          "A large lakeside nightlife venue at Gaylord Texan with live music, DJs and a dance floor.",
        features: ["Live music", "Nightlife", "21+"],
        context:
          "Venue profile seeded from an official source; verify before publication.",
      },
      {
        id: "napolis",
        name: "Napoli’s Italian Restaurant",
        address: "309 South Main Street, Grapevine, TX 76051",
        url: "https://www.napolisgrapevine.com/",
        description:
          "A family-run Italian restaurant and bar in historic downtown Grapevine.",
        features: ["Restaurant", "Full bar", "Main Street"],
        context:
          "Venue profile seeded from GRL’s guide and an official or municipal reference; verify before publication.",
      },
      {
        id: "hop-and-sting",
        name: "Hop & Sting Brewing Co.",
        address: "906 Jean Street, Grapevine, TX 76051",
        url: "https://hopandsting.myshopify.com/pages/food-truck-schedule",
        description:
          "A Grapevine brewery and taproom whose official site lists live music among its regular events.",
        features: ["Brewery", "Live music", "Family friendly"],
        context:
          "Venue profile seeded from GRL’s guide and an official or municipal reference; verify before publication.",
      },
      {
        id: "hotel-vin-lobby",
        name: "Hotel Vin Lobby Lounge",
        address: "215 East Dallas Road, Grapevine, TX 76051",
        url: "https://www.hotelvin.com/",
        description:
          "The lobby lounge at Hotel Vin, next to Grapevine Main Station and Harvest Hall.",
        features: ["Hotel lounge", "Live music", "Downtown"],
        context:
          "Venue profile seeded from GRL’s guide and an official or municipal reference; verify before publication.",
      },
      {
        id: "rock-and-brews",
        name: "Rock & Brews Grapevine",
        address: "520 West State Highway 114, Grapevine, TX 76051",
        url: "https://www.rockandbrews.com/grapevine",
        description:
          "A rock-themed restaurant and sports bar whose official site promotes regular live music.",
        features: ["Live music", "Restaurant", "All ages"],
        context:
          "Venue profile seeded from GRL’s guide and an official or municipal reference; verify before publication.",
      },
      {
        id: "chez-fabien",
        name: "Chez Fabien Bistro",
        address: "316 South Main Street, Grapevine, TX 76051",
        url: "https://chezfabienbistro.com/",
        description:
          "A French-inspired Main Street bistro with an official live-music calendar.",
        features: ["Live music", "Bistro", "Main Street"],
        context:
          "Venue profile seeded from GRL’s guide and an official or municipal reference; verify before publication.",
      },
      {
        id: "piaf",
        name: "PIAF Kitchen + Wine + Bar",
        address: "129 South Main Street, Suite 130, Grapevine, TX 76051",
        url: "https://piafkitchen.com/the-perch-rooftop-patio/",
        description:
          "A Mediterranean restaurant whose rooftop Perch publishes a live-music calendar.",
        features: ["Live music", "Rooftop", "Main Street"],
        context:
          "Venue profile seeded from GRL’s guide and an official or municipal reference; verify before publication.",
      },
      {
        id: "grapevine-elks",
        name: "Grapevine Elks Lodge #2483",
        address: "909 Bushong Road, Grapevine, TX 76051",
        url: "https://www.grapevineelks.org/",
        description:
          "The Grapevine lodge of the Benevolent and Protective Order of Elks.",
        features: ["Lodge", "Community", "Live music"],
        context:
          "Venue profile seeded from GRL’s guide and an official or municipal reference; verify before publication.",
      },
      {
        id: "airport-cities-vfw",
        name: "Airport Cities VFW Post 10454",
        address: "221 North Main Street, Grapevine, TX 76051",
        url: "https://www.vfw10454.net/",
        description: "A VFW post and public canteen on North Main Street.",
        features: ["VFW post", "Open to public", "Live music"],
        context:
          "Venue profile seeded from GRL’s guide and an official or municipal reference; verify before publication.",
      },
      {
        id: "chill",
        name: "Chill Bar & Grill",
        address: "814 South Main Street, Grapevine, TX 76051",
        url: "https://chilldfw.com/",
        description:
          "A late-night Main Street bar and restaurant whose official site promotes DJs, live music and themed events.",
        features: ["DJ", "Karaoke", "Late night"],
        context:
          "Venue profile seeded from GRL’s guide and an official or municipal reference; verify before publication.",
      },
      {
        id: "bohemian-bull",
        name: "Bohemian Bull Grapevine",
        address: "1112 West Northwest Highway, Grapevine, TX 76051",
        url: "https://www.bohemianbull.com/index.html?draft=grapevine",
        description:
          "A neighborhood restaurant and beer garden with live-music programming.",
        features: ["Live music", "Open jam", "Restaurant"],
        context:
          "Venue profile seeded from GRL’s guide and an official or municipal reference; verify before publication.",
      },
      {
        id: "grape-vine-springs",
        name: "Grape Vine Springs Winery",
        address: "409 South Main Street, Grapevine, TX 76051",
        url: "https://www.grapevinespringswinery.com/",
        description:
          "A Main Street winery with an official calendar for upcoming events.",
        features: ["Winery", "Live music", "Main Street"],
        context:
          "Venue profile seeded from GRL’s guide and an official or municipal reference; verify before publication.",
      },
    ],
    events: [
      publishedEvent({
        id: "napolis-dathan-martin-2026-11-20",
        title: "Dathan Martin",
        artist: "Dathan Martin",
        venueId: "napolis",
        date: "2026-11-20",
        time: "15:30",
      }),
      publishedEvent({
        id: "hop-sting-bobby-falk-2026-11-20",
        title: "Bobby Falk Group",
        artist: "Bobby Falk Group",
        venueId: "hop-and-sting",
        date: "2026-11-20",
        time: "18:00",
        endTime: "21:00",
        genres: "Taps & Tracks",
      }),
      publishedEvent({
        id: "third-rail-dusty-moats-2026-11-20",
        title: "Dusty Moats",
        artist: "Dusty Moats",
        venueId: "third-rail",
        date: "2026-11-20",
        time: "19:00",
        endTime: "21:00",
        sources: [
          GRL_WEEKEND_SOURCE,
          {
            label: "Harvest Hall official event page",
            url: "https://www.harvesthall.com/events/tarrant-county/dusty-moats--live-at-third-rail",
          },
        ],
      }),
      publishedEvent({
        id: "hotel-vin-corey-breedlove-2026-11-20",
        title: "Corey Breedlove",
        artist: "Corey Breedlove",
        venueId: "hotel-vin-lobby",
        date: "2026-11-20",
        time: "19:00",
        endTime: "22:00",
        genres: "Live in the Living Room",
      }),
      publishedEvent({
        id: "rock-brews-chasing-angels-2026-11-20",
        title: "Chasing Angels",
        artist: "Chasing Angels",
        venueId: "rock-and-brews",
        date: "2026-11-20",
        time: "19:00",
      }),
      publishedEvent({
        id: "grapevine-elks-brent-rozell-2026-11-20",
        title: "Brent Rozell & The Soulmates",
        artist: "Brent Rozell & The Soulmates",
        venueId: "grapevine-elks",
        date: "2026-11-20",
        time: "19:15",
      }),
      publishedEvent({
        id: "ajs-josh-ingram-2026-11-20",
        title: "Josh Ingram",
        artist: "Josh Ingram",
        venueId: "ajs-on-main",
        date: "2026-11-20",
        time: "19:30",
      }),
      publishedEvent({
        id: "chez-fabien-ford-nelson-2026-11-20",
        title: "Ford Nelson",
        artist: "Ford Nelson",
        venueId: "chez-fabien",
        date: "2026-11-20",
        time: "19:30",
        endTime: "22:30",
        sourceStatus: "Times differ — recheck",
        sourceNote:
          "GRL’s guide lists 7–10 PM. Chez Fabien’s calendar lists 7:30–10:30 PM, which this row displays.",
        sources: [GRL_WEEKEND_SOURCE, CHEZ_SOURCE],
      }),
      publishedEvent({
        id: "piaf-aautumn-2026-11-20",
        title: "Aautumn",
        artist: "Aautumn",
        venueId: "piaf",
        date: "2026-11-20",
        time: "19:30",
        endTime: "22:30",
        sourceStatus: "Times differ — recheck",
        sourceNote:
          "GRL’s guide lists 7–9:30 PM. PIAF’s calendar lists 7:30–10:30 PM, which this row displays.",
        sources: [GRL_WEEKEND_SOURCE, PIAF_SOURCE],
      }),
      publishedEvent({
        id: "vfw-dan-shinedling-2026-11-20",
        title: "Dan Shinedling",
        artist: "Dan Shinedling",
        venueId: "airport-cities-vfw",
        date: "2026-11-20",
        time: "20:00",
      }),
      publishedEvent({
        id: "tolberts-alternatives-2026-11-20",
        title: "The Alternatives",
        artist: "The Alternatives",
        venueId: "tolberts",
        date: "2026-11-20",
        time: "21:00",
        endTime: "23:59",
        genres: "Nineties • Alternative",
        summary:
          "Tolbert’s identifies The Alternatives as a nineties and alternative act.",
        sourceNote:
          "GRL rounds the end time to midnight. Tolbert’s lists 11:59 PM, the time shown here.",
        sources: [GRL_WEEKEND_SOURCE, TOLBERTS_SOURCE],
      }),
      publishedEvent({
        id: "willhoites-strangle-love-2026-11-20",
        title: "Strangle Love",
        artist: "Strangle Love",
        venueId: "willhoites",
        date: "2026-11-20",
        time: "21:00",
        endTime: "01:00",
        genres: "Monsters of Rock show",
        sourceStatus: "GRL guide — recheck",
        sourceNote:
          "GRL’s guide lists Strangle Love at Willhoite’s on both Friday and Saturday. Recheck the night with Willhoite’s before going.",
      }),
      publishedEvent({
        id: "chill-dj-mike-b-2026-11-20",
        title: "DJ Mike B",
        artist: "DJ Mike B",
        venueId: "chill",
        date: "2026-11-20",
        time: "22:00",
        genres: "DJ",
      }),

      publishedEvent({
        id: "third-rail-halftones-2026-11-21",
        title: "The Halftones",
        artist: "The Halftones",
        venueId: "third-rail",
        date: "2026-11-21",
        time: "19:00",
        endTime: "21:00",
        sources: [
          GRL_WEEKEND_SOURCE,
          {
            label: "Harvest Hall official event page",
            url: "https://www.harvesthall.com/events/tarrant-county/the-halftones--live-at-third-rail",
          },
        ],
      }),
      publishedEvent({
        id: "bohemian-bull-shannon-morales-2026-11-21",
        title: "Shannon Morales & The Max",
        artist: "Shannon Morales & The Max",
        venueId: "bohemian-bull",
        date: "2026-11-21",
        time: "19:00",
        endTime: "22:00",
      }),
      publishedEvent({
        id: "rock-brews-8-tracks-2026-11-21",
        title: "The 8 Tracks",
        artist: "The 8 Tracks",
        venueId: "rock-and-brews",
        date: "2026-11-21",
        time: "19:00",
      }),
      publishedEvent({
        id: "grape-vine-springs-road-trip-2026-11-21",
        title: "Road Trip",
        artist: "Road Trip",
        venueId: "grape-vine-springs",
        date: "2026-11-21",
        time: "19:00",
      }),
      publishedEvent({
        id: "ajs-christian-haworth-2026-11-21",
        title: "Christian Haworth",
        artist: "Christian Haworth",
        venueId: "ajs-on-main",
        date: "2026-11-21",
        time: "19:30",
      }),
      publishedEvent({
        id: "chez-fabien-sylvester-jones-2026-11-21",
        title: "Sylvester Jones Jr.",
        artist: "Sylvester Jones Jr.",
        venueId: "chez-fabien",
        date: "2026-11-21",
        time: "19:30",
        endTime: "22:30",
        sourceStatus: "Details differ — recheck",
        sourceNote:
          "GRL’s guide lists Sylvester Jones Jr. from 7–10 PM. Chez Fabien’s calendar lists Sylvester Jones from 7:30–10:30 PM, which supplies the time shown here.",
        sources: [GRL_WEEKEND_SOURCE, CHEZ_SOURCE],
      }),
      publishedEvent({
        id: "piaf-aautumn-2026-11-21",
        title: "Aautumn",
        artist: "Aautumn",
        venueId: "piaf",
        date: "2026-11-21",
        time: "19:30",
        endTime: "22:30",
        sourceStatus: "Times differ — recheck",
        sourceNote:
          "GRL’s guide lists 7–9:30 PM. PIAF’s calendar lists 7:30–10:30 PM, which this row displays.",
        sources: [GRL_WEEKEND_SOURCE, PIAF_SOURCE],
      }),
      publishedEvent({
        id: "vfw-jd-monson-2026-11-21",
        title: "JD Monson",
        artist: "JD Monson",
        venueId: "airport-cities-vfw",
        date: "2026-11-21",
        time: "20:00",
      }),
      publishedEvent({
        id: "tolberts-cherry-bomb-2026-11-21",
        title: "Cherry Bomb",
        artist: "Cherry Bomb",
        venueId: "tolberts",
        date: "2026-11-21",
        time: "21:00",
        endTime: "23:59",
        genres: "Women of rock tribute",
        summary:
          "Tolbert’s describes Cherry Bomb as a tribute to the women of rock.",
        sourceNote:
          "GRL rounds the end time to midnight. Tolbert’s lists 11:59 PM, the time shown here.",
        sources: [GRL_WEEKEND_SOURCE, TOLBERTS_SOURCE],
      }),
      publishedEvent({
        id: "willhoites-strangle-love-2026-11-21",
        title: "Strangle Love",
        artist: "Strangle Love",
        venueId: "willhoites",
        date: "2026-11-21",
        time: "21:00",
        endTime: "01:00",
        genres: "Monsters of Rock show",
        sourceStatus: "GRL guide — recheck",
        sourceNote:
          "GRL’s guide lists Strangle Love at Willhoite’s on both Friday and Saturday. Recheck the night with Willhoite’s before going.",
      }),
      publishedEvent({
        id: "chill-dj-junior-2026-11-21",
        title: "DJ Junior in the Mix",
        artist: "DJ Junior in the Mix",
        venueId: "chill",
        date: "2026-11-21",
        time: "22:00",
        genres: "DJ",
      }),

      publishedEvent({
        id: "ajs-brendon-preece-2026-11-22",
        title: "Brendon Preece",
        artist: "Brendon Preece",
        venueId: "ajs-on-main",
        date: "2026-11-22",
        time: "13:00",
      }),
      publishedEvent({
        id: "tolberts-country-dead-2026-11-22",
        title: "The Country Dead",
        artist: "The Country Dead",
        venueId: "tolberts",
        date: "2026-11-22",
        time: "14:30",
        endTime: "17:30",
        genres: "Grateful Dead • Country",
        summary:
          "Tolbert’s bills The Country Dead as Grateful Dead gone country.",
        sources: [GRL_WEEKEND_SOURCE, TOLBERTS_SOURCE],
      }),
      publishedEvent({
        id: "bohemian-bull-blues-jam-2026-11-22",
        title: "Blues at the Bull",
        artist: "Open blues jam hosted by Mister Fantastic Blues Band",
        venueId: "bohemian-bull",
        date: "2026-11-22",
        time: "17:00",
        endTime: "20:00",
        genres: "Open blues jam",
      }),
      publishedEvent({
        id: "tolberts-jordan-whitmore-2026-11-22",
        title: "Jordan Whitmore",
        artist: "Jordan Whitmore",
        venueId: "tolberts",
        date: "2026-11-22",
        time: "19:00",
        endTime: "21:00",
        genres: "Texas songwriter • Storyteller",
        summary:
          "Tolbert’s identifies Jordan Whitmore as a Texas songwriter and storyteller.",
        sources: [GRL_WEEKEND_SOURCE, TOLBERTS_SOURCE],
      }),
      publishedEvent({
        id: "willhoites-guy-patrick-2026-11-22",
        title: "Guy Patrick",
        artist: "Guy Patrick",
        venueId: "willhoites",
        date: "2026-11-22",
        time: "19:00",
      }),
      publishedEvent({
        id: "chill-sunday-karaoke-2026-11-22",
        title: "Sunday Karaoke",
        artist: "Sing with Shag, hosted by Shannon Cobb",
        venueId: "chill",
        date: "2026-11-22",
        time: "22:00",
        genres: "Karaoke",
      }),

      publishedEvent({
        id: "tolberts-andrea-venezio-2026-11-23",
        title: "Andrea Venezio",
        artist: "Andrea Venezio",
        venueId: "tolberts",
        date: "2026-11-23",
        time: "19:00",
        endTime: "21:30",
        genres: "Acoustic solo",
        summary: "Tolbert’s lists an acoustic solo set by Andrea Venezio.",
        sources: [TOLBERTS_SOURCE],
      }),
      publishedEvent({
        id: "tolberts-chaz-marie-band-2026-11-24",
        title: "Chaz Marie Band",
        artist: "Chaz Marie Band",
        venueId: "tolberts",
        date: "2026-11-24",
        time: "19:30",
        endTime: "22:00",
        genres: "Blues • Classic rock • Soul",
        summary:
          "Tolbert’s describes Chaz Marie Band as blues, classic rock and soul.",
        sources: [TOLBERTS_SOURCE],
      }),
      publishedEvent({
        id: "tolberts-miller-jam-2026-11-25",
        title: "The Miller Jam",
        artist: "The Miller Jam",
        venueId: "tolberts",
        date: "2026-11-25",
        time: "20:00",
        endTime: "23:30",
        genres: "Annual family jam",
        summary: "Tolbert’s lists The Miller Family Annual Jam.",
        sources: [TOLBERTS_SOURCE],
      }),
      publishedEvent({
        id: "chez-fabien-michael-2026-11-26",
        title: "Michael",
        artist: "Michael",
        venueId: "chez-fabien",
        date: "2026-11-26",
        time: "19:30",
        endTime: "21:30",
        sources: [CHEZ_SOURCE],
      }),
    ],
    submissions: [],
  };

  const handledRoutes = new Set([
    "guide",
    "venues",
    "venue",
    "show",
    "submit",
    "desk",
  ]);

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function isValidState(value) {
    return Boolean(
      value &&
      value.version === DATA_VERSION &&
      Number.isInteger(value.revision) &&
      Array.isArray(value.venues) &&
      Array.isArray(value.events) &&
      Array.isArray(value.submissions),
    );
  }

  function readStoredState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (isValidState(parsed)) return parsed;
    } catch (error) {
      console.warn(
        "GRL concept data could not be loaded; using the preview defaults.",
        error,
      );
    }
    return null;
  }

  function loadState() {
    return readStoredState() || clone(initialState);
  }

  function saveState(state, expectedRevision = state.revision ?? 0) {
    try {
      const current = readStoredState();
      const currentRevision = current?.revision ?? 0;
      if (currentRevision !== expectedRevision)
        return { ok: false, reason: "stale" };
      state.version = DATA_VERSION;
      state.revision = currentRevision + 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      window.dispatchEvent(
        new CustomEvent("grl:datachange", { detail: { source: "guide" } }),
      );
      return { ok: true, reason: "saved" };
    } catch (error) {
      console.warn(
        "GRL concept data could not be saved in this browser.",
        error,
      );
      return { ok: false, reason: "blocked" };
    }
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function safeURL(value) {
    if (!value) return "";
    try {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol) ? url.href : "";
    } catch (error) {
      return "";
    }
  }

  function getVenue(state, venueId) {
    return state.venues.find((venue) => venue.id === venueId);
  }

  function approvedEvents(state) {
    return state.events
      .filter((event) => event.status === "approved")
      .sort((a, b) =>
        `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`),
      );
  }

  function formatDate(date, includeYear = false) {
    const parsed = new Date(`${date}T12:00:00`);
    if (Number.isNaN(parsed.valueOf())) return date;
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      ...(includeYear ? { year: "numeric" } : {}),
    }).format(parsed);
  }

  function formatTime(time) {
    if (!time) return "Time TBA";
    const [hours, minutes] = time.split(":").map(Number);
    const parsed = new Date(2000, 0, 1, hours, minutes);
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(parsed);
  }

  function eventSignature(event) {
    const venueKey =
      event.venueId === "other" ? event.otherVenue : event.venueId;
    return [event.artist, venueKey, event.date, event.time]
      .map((value) =>
        String(value || "")
          .trim()
          .toLocaleLowerCase(),
      )
      .join("|");
  }

  function eventSources(event) {
    const sources = Array.isArray(event.sources) ? event.sources : [];
    const normalized = sources
      .map((source) => ({
        label: String(source.label || "Published source"),
        url: safeURL(source.url),
      }))
      .filter((source) => source.url);
    if (normalized.length) return normalized;
    const fallback = safeURL(event.sourceUrl);
    return fallback
      ? [{ label: event.sourceName || "Published source", url: fallback }]
      : [];
  }

  function listingStatus(event, detail = false) {
    const sources = eventSources(event);
    if (!event.concept && sources.length) {
      const needsCheck = /recheck|differ/i.test(event.sourceStatus || "");
      const sourceControl =
        sources.length > 1
          ? detail
            ? '<span class="grl-source-count">' +
              sources.length +
              " sources below</span>"
            : '<a class="grl-source-link" href="#show/' +
              encodeURIComponent(event.id) +
              '">' +
              sources.length +
              " sources</a>"
          : '<a class="grl-source-link" href="' +
            escapeHTML(sources[0].url) +
            '" target="_blank" rel="noreferrer">Source</a>';
      return `<span class="${needsCheck ? "grl-check-label" : "grl-source-label"}">${escapeHTML(event.sourceStatus || "Published listing")}</span>${sourceControl}`;
    }
    if (event.localEdited) {
      return `<span class="grl-local-label">Local edit</span>${sources.length ? `<a class="grl-source-link" href="${escapeHTML(sources[0].url)}" target="_blank" rel="noreferrer">Original source</a>` : ""}`;
    }
    return '<span class="grl-concept-label">Local demo</span>';
  }

  function eventRow(event, state, options = {}) {
    const venue = getVenue(state, event.venueId);
    const compact = options.compact ? " grl-event-row--compact" : "";
    const artistLine =
      event.artist && event.artist !== event.title
        ? `<strong>${escapeHTML(event.artist)}</strong> · `
        : "";
    return `
      <article class="grl-event-row${compact}" data-event-id="${escapeHTML(event.id)}">
        <div class="grl-event-date" aria-label="${escapeHTML(formatDate(event.date, true))}">
          <span>${escapeHTML(formatDate(event.date).split(",")[0])}</span>
          <strong>${escapeHTML(new Date(`${event.date}T12:00:00`).getDate())}</strong>
        </div>
        <div class="grl-event-copy">
          <div class="grl-event-kicker">${listingStatus(event)} <span>${escapeHTML(event.genres)}</span></div>
          <h3><a href="#show/${encodeURIComponent(event.id)}">${escapeHTML(event.title)}</a></h3>
          <p>${artistLine}${escapeHTML(formatTime(event.time))}${event.endTime ? `–${escapeHTML(formatTime(event.endTime))}` : ""}</p>
          <p class="grl-event-venue"><a href="#venue/${encodeURIComponent(event.venueId)}">${escapeHTML(venue?.name || "Venue TBA")}</a></p>
        </div>
        <a class="grl-row-link" href="#show/${encodeURIComponent(event.id)}" aria-label="Open ${escapeHTML(event.title)} details">Details</a>
      </article>`;
  }

  function emptyState(title, copy) {
    return `<div class="grl-empty"><h3>${escapeHTML(title)}</h3><p>${escapeHTML(copy)}</p></div>`;
  }

  function homeRows() {
    const state = loadState();
    const events = approvedEvents(state).slice(0, 3);
    return events.length
      ? events
          .map((event) => eventRow(event, state, { compact: true }))
          .join("")
      : emptyState(
          "No preview listings",
          "Add an approved show in the GRL Desk to see it here.",
        );
  }

  function guideView(state) {
    const venues = state.venues
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
    const dates = [
      ...new Set([
        "2026-11-20",
        "2026-11-21",
        "2026-11-22",
        "2026-11-23",
        "2026-11-24",
        "2026-11-25",
        "2026-11-26",
        ...approvedEvents(state).map((event) => event.date),
      ]),
    ].sort();
    const publishedCount = approvedEvents(state).filter(
      (event) => !event.concept,
    ).length;
    return `
      <section class="grl-page grl-guide-page" aria-labelledby="guide-title">
        <header class="grl-page-head grl-page-head--split">
          <div>
            <p class="grl-eyebrow">The week in live music</p>
            <h1 id="guide-title">Find your next set.</h1>
          </div>
          <p class="grl-head-note"><strong>Preview window</strong><br>Fri, Nov 20–Thu, Nov 26, 2026</p>
        </header>
        <div class="grl-concept-notice" role="note">
          <strong>${publishedCount} published listings from GRL and venue calendars are captured for this week.</strong>
          <span>The linked sources were checked on November 20, 2026. Schedules can change, and cover information is marked unlisted unless a source publishes it. <a href="https://www.instagram.com/p/Df6zjpSFMKI/" target="_blank" rel="noreferrer">See GRL’s own November 20–22 weekend guide on Instagram</a>. Listings confirmed by a venue also link that venue source, and differences are flagged for a recheck.</span>
        </div>
        <form class="grl-filters" id="grl-guide-filters" aria-label="Filter live music guide">
          <label>
            <span>Artist or show</span>
            <input id="grl-filter-query" type="search" placeholder="Try Cherry Bomb" autocomplete="off">
          </label>
          <label>
            <span>Date</span>
            <select id="grl-filter-date">
              <option value="">All dates</option>
              ${dates.map((date) => `<option value="${escapeHTML(date)}">${escapeHTML(formatDate(date, true))}</option>`).join("")}
            </select>
          </label>
          <label>
            <span>Venue</span>
            <select id="grl-filter-venue">
              <option value="">All venues</option>
              ${venues.map((venue) => `<option value="${escapeHTML(venue.id)}">${escapeHTML(venue.name)}</option>`).join("")}
            </select>
          </label>
          <button type="reset" class="grl-text-button">Clear filters</button>
        </form>
        <p class="grl-results-summary" id="grl-results-summary" aria-live="polite"></p>
        <div class="grl-event-list" id="grl-guide-results"></div>
        <aside class="grl-guide-cta">
          <div><p class="grl-eyebrow">Every week, one email</p><h2>Get the Grapevine live music guide in your inbox.</h2></div>
          <a class="grl-button grl-button--cream" href="#newsletter">Join the list</a>
        </aside>
      </section>`;
  }

  function bindGuide(state) {
    const form = document.querySelector("#grl-guide-filters");
    const results = document.querySelector("#grl-guide-results");
    const summary = document.querySelector("#grl-results-summary");
    if (!form || !results || !summary) return;

    const draw = () => {
      const query = form
        .querySelector("#grl-filter-query")
        .value.trim()
        .toLocaleLowerCase();
      const date = form.querySelector("#grl-filter-date").value;
      const venueId = form.querySelector("#grl-filter-venue").value;
      const matches = approvedEvents(state).filter((event) => {
        const venue = getVenue(state, event.venueId);
        const searchText =
          `${event.artist} ${event.title} ${event.genres} ${venue?.name || ""}`.toLocaleLowerCase();
        return (
          (!query || searchText.includes(query)) &&
          (!date || event.date === date) &&
          (!venueId || event.venueId === venueId)
        );
      });
      summary.textContent = `${matches.length} ${matches.length === 1 ? "listing" : "listings"} in this dated preview`;
      results.innerHTML = matches.length
        ? matches.map((event) => eventRow(event, state)).join("")
        : emptyState(
            "No listings match",
            "Clear a filter or choose another date.",
          );
    };

    form.addEventListener("input", draw);
    form.addEventListener("change", draw);
    form.addEventListener("reset", () => requestAnimationFrame(draw));
    draw();
  }

  function venueCard(venue, state) {
    const count = approvedEvents(state).filter(
      (event) => event.venueId === venue.id,
    ).length;
    return `
      <article class="grl-venue-card">
        <div class="grl-venue-card-top"><span>Grapevine venue</span><span>${count} ${count === 1 ? "listing" : "listings"} this week</span></div>
        <h2><a href="#venue/${encodeURIComponent(venue.id)}">${escapeHTML(venue.name)}</a></h2>
        <p class="grl-address">${escapeHTML(venue.address)}</p>
        <p>${escapeHTML(venue.description)}</p>
        <ul class="grl-chip-list" aria-label="Venue features">${venue.features.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
        <div class="grl-card-actions">
          <a href="#venue/${encodeURIComponent(venue.id)}">View profile</a>
          <a href="${escapeHTML(safeURL(venue.url))}" target="_blank" rel="noreferrer">Official site</a>
        </div>
      </article>`;
  }

  function venuesView(state) {
    return `
      <section class="grl-page" aria-labelledby="venues-title">
        <header class="grl-page-head">
          <p class="grl-eyebrow">${state.venues.length} Grapevine music venues</p>
          <h1 id="venues-title">Grapevine venues.</h1>
          <p class="grl-page-intro">Explore restaurants, bars, wineries, taprooms, nightlife destinations and community spaces. Open a venue for this week’s captured listings, its address and official website.</p>
        </header>
        <div class="grl-venue-grid">${state.venues.map((venue) => venueCard(venue, state)).join("")}</div>
      </section>`;
  }

  function venueView(state, id) {
    const venue = getVenue(state, id);
    if (!venue)
      return notFoundView(
        "Venue not found",
        "That venue is not in this preview directory.",
        "#venues",
        "Back to venues",
      );
    const events = approvedEvents(state).filter(
      (event) => event.venueId === venue.id,
    );
    return `
      <section class="grl-page" aria-labelledby="venue-title">
        <a class="grl-back-link" href="#venues">Back to all venues</a>
        <header class="grl-page-head grl-venue-hero">
          <p class="grl-eyebrow">Venue guide</p>
          <h1 id="venue-title">${escapeHTML(venue.name)}</h1>
          <p class="grl-page-intro">${escapeHTML(venue.description)}</p>
          <div class="grl-venue-meta"><span>${escapeHTML(venue.address)}</span><a href="${escapeHTML(safeURL(venue.url))}" target="_blank" rel="noreferrer">Visit official site</a></div>
        </header>
        <section class="grl-section" aria-labelledby="venue-shows-title">
          <div class="grl-section-heading"><p class="grl-eyebrow">In the dated guide</p><h2 id="venue-shows-title">This week’s listings</h2></div>
          <div class="grl-event-list">${events.length ? events.map((event) => eventRow(event, state)).join("") : emptyState("No verified listings for this week", "A venue can still be part of the directory when no show is captured in the selected window.")}</div>
        </section>
      </section>`;
  }

  function showView(state, id) {
    const event = approvedEvents(state).find((item) => item.id === id);
    if (!event)
      return notFoundView(
        "Show not found",
        "That listing may have been edited or removed.",
        "#guide",
        "Back to the guide",
      );
    const venue = getVenue(state, event.venueId);
    const eventLink = safeURL(event.link);
    const sources = eventSources(event);
    const sourceLink = sources[0]?.url || "";
    const isPublished = !event.concept && sources.length;
    return `
      <section class="grl-page grl-show-page" aria-labelledby="show-title">
        <a class="grl-back-link" href="#guide">Back to the live music guide</a>
        <div class="grl-show-poster">
          <div class="grl-show-date-block"><span>${escapeHTML(formatDate(event.date).split(",")[0])}</span><strong>${escapeHTML(new Date(`${event.date}T12:00:00`).getDate())}</strong><span>${escapeHTML(new Date(`${event.date}T12:00:00`).toLocaleString("en-US", { month: "short" }))}</span></div>
          <div>
            <p class="grl-eyebrow">${listingStatus(event, true)} ${escapeHTML(event.genres)}</p>
            <h1 id="show-title">${escapeHTML(event.title)}</h1>
            ${event.artist !== event.title ? `<p class="grl-show-artist">${escapeHTML(event.artist)}</p>` : ""}
          </div>
        </div>
        <div class="grl-show-grid">
          <div>
            <p class="grl-show-lede">${escapeHTML(event.summary)}</p>
            <div class="grl-concept-notice" role="note">${isPublished ? `<strong>Checked against ${sources.length === 1 ? "the linked source" : `${sources.length} linked sources`} on ${escapeHTML(formatDate(event.verifiedAt, true))}.</strong> ${event.sourceNote ? escapeHTML(event.sourceNote) : "Follow the source for updates and recheck the listing before heading out."}` : `<strong>This is a browser-local demo listing.</strong> Confirm the artist, date, time, cover, age policy and ticket link with the venue before publishing.`}</div>
          </div>
          <dl class="grl-show-facts">
            <div><dt>Date</dt><dd>${escapeHTML(formatDate(event.date, true))}</dd></div>
            <div><dt>Time</dt><dd>${escapeHTML(formatTime(event.time))}${event.endTime ? `–${escapeHTML(formatTime(event.endTime))}` : ""}</dd></div>
            <div><dt>Venue</dt><dd><a href="#venue/${encodeURIComponent(event.venueId)}">${escapeHTML(venue?.name || "Venue TBA")}</a></dd></div>
            <div><dt>Cover</dt><dd>${escapeHTML(event.cover)}</dd></div>
            <div><dt>Status</dt><dd>${escapeHTML(event.sourceStatus || "Local demo")}</dd></div>
            ${sources.length ? `<div><dt>Provenance</dt><dd>${sources.map((source) => `<a href="${escapeHTML(source.url)}" target="_blank" rel="noreferrer">${escapeHTML(source.label)}</a>`).join("<br>")}${event.verifiedAt ? `<br><small>Checked ${escapeHTML(formatDate(event.verifiedAt, true))}</small>` : ""}</dd></div>` : ""}
            ${eventLink && eventLink !== sourceLink ? `<div><dt>More</dt><dd><a href="${escapeHTML(eventLink)}" target="_blank" rel="noreferrer">Official event link</a></dd></div>` : ""}
          </dl>
        </div>
      </section>`;
  }

  function submitView(state) {
    return `
      <section class="grl-page grl-submit-page" aria-labelledby="submit-title">
        <header class="grl-page-head">
          <p class="grl-eyebrow">Venue + artist submissions</p>
          <h1 id="submit-title">Put a show on our radar.</h1>
          <p class="grl-page-intro">The production form would send new shows to GRL for review. This local preview keeps entries only in this browser.</p>
        </header>
        <div class="grl-privacy-note" role="note"><strong>Preview safety</strong><span>Use fictional details only. The demo does not upload or retain photos, send email or create a public listing. Contact accepts only a demo alias or an address on an example domain.</span></div>
        <form class="grl-submit-form" id="grl-show-submission">
          <div class="grl-form-grid">
            <label><span>Artist or band *</span><input name="artist" required maxlength="80" placeholder="Example artist 08"></label>
            <label><span>Show title</span><input name="title" maxlength="100" placeholder="Optional billing title"></label>
            <label><span>Venue *</span><select name="venueId" required><option value="">Choose a venue</option>${state.venues.map((venue) => `<option value="${escapeHTML(venue.id)}">${escapeHTML(venue.name)}</option>`).join("")}<option value="other">Another Grapevine venue</option></select></label>
            <label class="grl-other-venue" hidden><span>Venue name *</span><input name="otherVenue" maxlength="100" placeholder="Example venue"></label>
            <label><span>Date *</span><input name="date" type="date" min="2026-11-20" required></label>
            <label><span>Start time *</span><input name="time" type="time" required></label>
            <label><span>Event link</span><input name="link" type="url" placeholder="https://example.com/show"></label>
            <label><span>Contact reference</span><input name="contact" maxlength="100" placeholder="demo-booker or booker@example.com"><small>Optional. Use a demo-/sample- alias or @example.com, .net or .org.</small></label>
            <label class="grl-form-wide"><span>Photo for review</span><input name="photo" type="file" accept="image/jpeg,image/png,image/webp"><small>The demo does not upload, read or retain the image or its filename.</small></label>
            <label class="grl-form-wide"><span>Notes</span><textarea name="notes" rows="4" maxlength="500" placeholder="Set times, cover, age policy or accessibility details to confirm"></textarea></label>
          </div>
          <label class="grl-check"><input name="previewConfirm" type="checkbox" required><span>I’m using fictional information to test this local concept.</span></label>
          <button class="grl-button" type="submit">Send to review queue</button>
          <p class="grl-form-status" id="grl-submit-status" aria-live="polite"></p>
        </form>
      </section>`;
  }

  function bindSubmit(state) {
    const form = document.querySelector("#grl-show-submission");
    const status = document.querySelector("#grl-submit-status");
    if (!form || !status) return;
    const venueSelect = form.elements.venueId;
    const otherLabel = form.querySelector(".grl-other-venue");
    const syncOther = () => {
      const enabled = venueSelect.value === "other";
      otherLabel.hidden = !enabled;
      form.elements.otherVenue.required = enabled;
    };
    venueSelect.addEventListener("change", syncOther);
    syncOther();

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const venueId = data.get("venueId");
      const otherVenue = String(data.get("otherVenue") || "").trim();
      const contact = String(data.get("contact") || "").trim();
      const candidate = {
        artist: String(data.get("artist") || "").trim(),
        venueId,
        otherVenue,
        date: data.get("date"),
        time: data.get("time"),
      };
      if (
        !candidate.artist ||
        !candidate.venueId ||
        !/^\d{4}-\d{2}-\d{2}$/.test(candidate.date) ||
        !/^\d{2}:\d{2}$/.test(candidate.time) ||
        (candidate.venueId === "other" && !otherVenue)
      ) {
        status.textContent =
          "Complete the artist, venue, date and time with more than whitespace.";
        status.dataset.tone = "warning";
        return;
      }
      const contactIsAllowed =
        !contact ||
        /^(demo|sample)-[a-z0-9][a-z0-9 ._-]{1,60}$/i.test(contact) ||
        /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@example\.(com|net|org)$/i.test(contact);
      if (!contactIsAllowed) {
        status.textContent =
          "Use a demo-/sample- alias or an address ending in @example.com, @example.net or @example.org.";
        status.dataset.tone = "warning";
        return;
      }
      const rawLink = String(data.get("link") || "").trim();
      const cleanLink = safeURL(rawLink);
      if (rawLink && !cleanLink) {
        status.textContent = "Enter a complete http or https event link.";
        status.dataset.tone = "warning";
        return;
      }
      const submission = {
        id: `submission-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        title: String(data.get("title") || "").trim() || candidate.artist,
        artist: candidate.artist,
        venueId,
        otherVenue,
        date: candidate.date,
        time: candidate.time,
        link: cleanLink,
        contact,
        notes: String(data.get("notes") || "").trim(),
        status: "pending",
        createdAt: new Date().toISOString(),
        concept: true,
      };
      let saveResult = { ok: false, reason: "stale" };
      for (let attempt = 0; attempt < 2 && !saveResult.ok; attempt += 1) {
        const latest = loadState();
        const duplicate =
          latest.events.some(
            (item) => eventSignature(item) === eventSignature(candidate),
          ) ||
          latest.submissions.some(
            (item) =>
              ["pending", "approved"].includes(item.status) &&
              eventSignature(item) === eventSignature(candidate),
          );
        if (duplicate) {
          status.textContent =
            "That artist, venue, date and time already exist in the current preview. The duplicate was not added.";
          status.dataset.tone = "warning";
          return;
        }
        latest.submissions.unshift(submission);
        saveResult = saveState(latest, latest.revision);
      }
      if (!saveResult.ok) {
        status.textContent =
          saveResult.reason === "stale"
            ? "The review queue changed in another tab. Try submitting once more."
            : "This browser blocked local storage, so the submission could not be added to the review queue.";
        status.dataset.tone = "warning";
        return;
      }
      form.reset();
      syncOther();
      status.innerHTML =
        'Saved to this browser’s review queue. <a href="#desk">Open the GRL Desk</a> to approve or reject it.';
      status.dataset.tone = "success";
    });
  }

  function statusCount(state, status) {
    return state.submissions.filter((item) => item.status === status).length;
  }

  function deskView(state) {
    const pending = state.submissions.filter(
      (item) => item.status === "pending",
    );
    const reviewed = state.submissions.filter(
      (item) => item.status !== "pending",
    );
    return `
      <section class="grl-page grl-desk-page" aria-labelledby="desk-title">
        <header class="grl-page-head grl-page-head--split">
          <div><p class="grl-eyebrow">Browser-local preview</p><h1 id="desk-title">GRL Desk</h1><p class="grl-page-intro">Edit one record, then see it update across the guide, venue profile, show detail and homepage listings.</p></div>
          <button class="grl-text-button" id="grl-reset-preview" type="button">Reset preview data</button>
        </header>
        <div class="grl-desk-stats" aria-label="Submission status">
          <div><strong>${pending.length}</strong><span>Pending</span></div>
          <div><strong>${statusCount(state, "approved")}</strong><span>Approved</span></div>
          <div><strong>${statusCount(state, "rejected")}</strong><span>Declined</span></div>
          <div><strong>${approvedEvents(state).length}</strong><span>Guide listings</span></div>
        </div>
        <div class="grl-privacy-note" role="note"><strong>Local concept only</strong><span>Changes persist in this browser. They do not reach a server, charge a card, send an email or publish to a live website. Avoid real personal information.</span></div>
        <section class="grl-desk-section" aria-labelledby="queue-title">
          <div class="grl-section-heading"><p class="grl-eyebrow">Review queue</p><h2 id="queue-title">Pending show submissions</h2></div>
          <div class="grl-submission-list" id="grl-submission-list">
            ${pending.length ? pending.map((item) => submissionRow(item, state)).join("") : emptyState("Queue is clear", "Submit a fictional show to test the approval flow.")}
          </div>
          ${reviewed.length ? `<details class="grl-history"><summary>Reviewed submissions (${reviewed.length})</summary><div>${reviewed.map((item) => submissionRow(item, state, true)).join("")}</div></details>` : ""}
        </section>
        <section class="grl-desk-section" aria-labelledby="show-editor-title">
          <div class="grl-section-heading"><p class="grl-eyebrow">Single-source show data</p><h2 id="show-editor-title">Edit an approved listing</h2></div>
          ${eventEditor(state)}
        </section>
        <section class="grl-desk-section" aria-labelledby="venue-editor-title">
          <div class="grl-section-heading"><p class="grl-eyebrow">Directory data</p><h2 id="venue-editor-title">Edit a venue profile</h2></div>
          ${venueEditor(state)}
        </section>
      </section>`;
  }

  function submissionRow(item, state, readOnly = false) {
    const venue = getVenue(state, item.venueId);
    const venueName =
      item.venueId === "other" ? item.otherVenue : venue?.name || "Venue TBA";
    return `
      <article class="grl-submission" data-submission-id="${escapeHTML(item.id)}">
        <div><span class="grl-status grl-status--${escapeHTML(item.status)}">${escapeHTML(item.status)}</span><h3>${escapeHTML(item.title)}</h3><p><strong>${escapeHTML(item.artist)}</strong> · ${escapeHTML(venueName)}</p><p>${escapeHTML(formatDate(item.date, true))} at ${escapeHTML(formatTime(item.time))}</p></div>
        ${readOnly ? `<span class="grl-reviewed-label">Reviewed</span>` : `<div class="grl-submission-actions"><button type="button" data-action="approve">Approve</button><button type="button" data-action="reject">Decline</button></div>`}
      </article>`;
  }

  function eventEditor(state) {
    const events = approvedEvents(state);
    if (!events.length)
      return emptyState(
        "No approved listings",
        "Approve a submission to create a listing.",
      );
    return `
      <form class="grl-editor" id="grl-event-editor">
        <label class="grl-form-wide"><span>Choose listing</span><select name="eventId">${events.map((event) => `<option value="${escapeHTML(event.id)}">${escapeHTML(event.title)} — ${escapeHTML(formatDate(event.date))}</option>`).join("")}</select></label>
        <div class="grl-form-grid">
          <label><span>Show title</span><input name="title" maxlength="100" required></label>
          <label><span>Artist</span><input name="artist" maxlength="80" required></label>
          <label><span>Venue</span><select name="venueId">${state.venues.map((venue) => `<option value="${escapeHTML(venue.id)}">${escapeHTML(venue.name)}</option>`).join("")}</select></label>
          <label><span>Date</span><input name="date" type="date" required></label>
          <label><span>Start</span><input name="time" type="time" required></label>
          <label><span>End</span><input name="endTime" type="time"></label>
          <label><span>Genres</span><input name="genres" maxlength="80"></label>
          <label><span>Cover note</span><input name="cover" maxlength="80"></label>
          <label class="grl-form-wide"><span>Summary</span><textarea name="summary" rows="3" maxlength="500"></textarea></label>
          <label class="grl-form-wide"><span>Official event link</span><input name="link" type="url"></label>
        </div>
        <div class="grl-editor-actions"><button class="grl-button" type="submit">Save listing</button><button class="grl-text-button" type="button" id="grl-delete-event">Remove listing</button></div>
        <p class="grl-form-status" id="grl-event-status" aria-live="polite"></p>
      </form>`;
  }

  function venueEditor(state) {
    return `
      <form class="grl-editor" id="grl-venue-editor">
        <label class="grl-form-wide"><span>Choose venue</span><select name="venueId">${state.venues.map((venue) => `<option value="${escapeHTML(venue.id)}">${escapeHTML(venue.name)}</option>`).join("")}</select></label>
        <div class="grl-form-grid">
          <label><span>Name</span><input name="name" maxlength="120" required></label>
          <label><span>Address</span><input name="address" maxlength="180" required></label>
          <label class="grl-form-wide"><span>Official site</span><input name="url" type="url" required></label>
          <label class="grl-form-wide"><span>Description</span><textarea name="description" rows="3" maxlength="500" required></textarea></label>
          <label class="grl-form-wide"><span>Directory context</span><input name="context" maxlength="180" required></label>
        </div>
        <button class="grl-button" type="submit">Save venue</button>
        <p class="grl-form-status" id="grl-venue-status" aria-live="polite"></p>
      </form>`;
  }

  function fillEventEditor(form, state) {
    const item = state.events.find(
      (event) => event.id === form.elements.eventId.value,
    );
    if (!item) return;
    [
      "title",
      "artist",
      "venueId",
      "date",
      "time",
      "endTime",
      "genres",
      "cover",
      "summary",
      "link",
    ].forEach((field) => {
      form.elements[field].value = item[field] || "";
    });
  }

  function fillVenueEditor(form, state) {
    const item = getVenue(state, form.elements.venueId.value);
    if (!item) return;
    ["name", "address", "url", "description", "context"].forEach((field) => {
      form.elements[field].value = item[field] || "";
    });
  }

  function bindDesk(state) {
    const reset = document.querySelector("#grl-reset-preview");
    reset?.addEventListener("click", () => {
      if (
        !window.confirm(
          "Reset this browser-only preview to its original venues, shows and empty submission queue?",
        )
      )
        return;
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.warn("GRL preview data could not be reset.", error);
        announce("This browser blocked the preview reset.");
        return;
      }
      render("desk");
      announce("Preview data reset.");
    });

    document
      .querySelectorAll(".grl-submission-actions button")
      .forEach((button) => {
        button.addEventListener("click", () => {
          const row = button.closest("[data-submission-id]");
          const submissionId = row?.dataset.submissionId;
          let saveResult = { ok: false, reason: "stale" };
          let finalStatus = "pending";
          for (let attempt = 0; attempt < 2 && !saveResult.ok; attempt += 1) {
            const latest = loadState();
            const submission = latest.submissions.find(
              (item) => item.id === submissionId,
            );
            if (!submission || submission.status !== "pending") {
              render("desk");
              announce("That submission was already reviewed in another tab.");
              return;
            }
            if (button.dataset.action === "approve") {
              let venueId = submission.venueId;
              if (venueId === "other") {
                const existingVenue = latest.venues.find(
                  (venue) =>
                    venue.name.trim().toLocaleLowerCase() ===
                    submission.otherVenue.trim().toLocaleLowerCase(),
                );
                if (existingVenue) {
                  venueId = existingVenue.id;
                } else {
                  const slugBase =
                    submission.otherVenue
                      .toLocaleLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-|-$/g, "") || "submitted-venue";
                  venueId = `${slugBase}-${Date.now().toString(36)}`;
                  latest.venues.push({
                    id: venueId,
                    name: submission.otherVenue,
                    address: "Address to verify before publication",
                    url: "https://example.com/",
                    description:
                      "Submitted venue profile awaiting editorial verification.",
                    features: ["Submitted venue"],
                    context:
                      "Created from a fictional preview submission. Verify all information before publication.",
                  });
                }
              }
              const duplicate = latest.events.some(
                (event) =>
                  eventSignature(event) ===
                  eventSignature({ ...submission, venueId }),
              );
              if (duplicate) {
                submission.status = "duplicate";
              } else {
                latest.events.push({
                  id: `approved-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                  submissionId: submission.id,
                  title: submission.title,
                  artist: submission.artist,
                  venueId,
                  date: submission.date,
                  time: submission.time,
                  endTime: "",
                  genres: "Genre to confirm",
                  cover: "Cover to confirm",
                  summary:
                    submission.notes ||
                    "Approved from the browser-only concept submission queue.",
                  link: submission.link,
                  sourceUrl: "",
                  sourceName: "Local demo submission",
                  sourceStatus: "Local demo",
                  status: "approved",
                  concept: true,
                });
                submission.status = "approved";
              }
            } else {
              submission.status = "rejected";
            }
            submission.reviewedAt = new Date().toISOString();
            finalStatus = submission.status;
            saveResult = saveState(latest, latest.revision);
          }
          if (!saveResult.ok)
            announce(
              saveResult.reason === "stale"
                ? "The queue kept changing in another tab. Refresh and try again."
                : "This browser blocked the review change.",
            );
          render("desk");
          if (saveResult.ok) announce(`Submission ${finalStatus}.`);
        });
      });

    const eventForm = document.querySelector("#grl-event-editor");
    if (eventForm) {
      fillEventEditor(eventForm, state);
      eventForm.elements.eventId.addEventListener("change", () =>
        fillEventEditor(eventForm, state),
      );
      eventForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const status = eventForm.querySelector("#grl-event-status");
        const latest = loadState();
        if (latest.revision !== state.revision) {
          status.textContent =
            "The preview changed in another tab. Reload the GRL Desk before saving this edit.";
          status.dataset.tone = "warning";
          return;
        }
        const item = latest.events.find(
          (entry) => entry.id === eventForm.elements.eventId.value,
        );
        if (!item) {
          status.textContent =
            "This listing was removed in another tab. Reload the GRL Desk.";
          status.dataset.tone = "warning";
          return;
        }
        const requiredValues = [
          "title",
          "artist",
          "venueId",
          "date",
          "time",
        ].map((field) => eventForm.elements[field].value.trim());
        if (requiredValues.some((value) => !value)) {
          status.textContent =
            "Complete the title, artist, venue, date and start time with more than whitespace.";
          status.dataset.tone = "warning";
          return;
        }
        const rawLink = eventForm.elements.link.value.trim();
        const cleanLink = safeURL(rawLink);
        if (rawLink && !cleanLink) {
          status.textContent = "Enter a complete http or https event link.";
          status.dataset.tone = "warning";
          return;
        }
        const hadPublishedSource = eventSources(item).length > 0;
        [
          "title",
          "artist",
          "venueId",
          "date",
          "time",
          "endTime",
          "genres",
          "cover",
          "summary",
        ].forEach((field) => {
          item[field] = eventForm.elements[field].value.trim();
        });
        item.link = cleanLink;
        item.updatedAt = new Date().toISOString();
        if (hadPublishedSource) {
          item.concept = true;
          item.localEdited = true;
          item.sourceStatus = "Local edit of published listing";
        }
        const saved = saveState(latest, latest.revision);
        if (!saved.ok) {
          status.textContent =
            saved.reason === "stale"
              ? "The preview changed in another tab while you were saving. Reload the GRL Desk and try again."
              : "This browser blocked local storage, so the edit will not survive a reload.";
          status.dataset.tone = "warning";
          return;
        }
        Object.assign(state, clone(latest));
        status.textContent = hadPublishedSource
          ? "Saved as a local edit. Every related view uses the update, while the original sources remain linked for comparison."
          : "Saved. Every related view now uses the updated local demo listing.";
        status.dataset.tone = "success";
      });
      eventForm
        .querySelector("#grl-delete-event")
        .addEventListener("click", () => {
          const latest = loadState();
          if (latest.revision !== state.revision) {
            render("desk");
            announce(
              "The preview changed in another tab. The GRL Desk was refreshed before removing anything.",
            );
            return;
          }
          const item = latest.events.find(
            (entry) => entry.id === eventForm.elements.eventId.value,
          );
          if (
            !item ||
            !window.confirm(
              `Remove “${item.title}” from this browser-only concept?`,
            )
          )
            return;
          latest.events = latest.events.filter((entry) => entry.id !== item.id);
          if (item.submissionId) {
            const submission = latest.submissions.find(
              (entry) =>
                entry.id === item.submissionId && entry.status === "approved",
            );
            if (submission) {
              submission.status = "removed";
              submission.removedAt = new Date().toISOString();
            }
          }
          const saved = saveState(latest, latest.revision);
          if (!saved.ok) {
            render("desk");
            announce(
              saved.reason === "stale"
                ? "The preview changed in another tab. Nothing was removed."
                : "This browser blocked the listing removal.",
            );
            return;
          }
          render("desk");
          announce("Listing removed from this browser preview.");
        });
    }

    const venueForm = document.querySelector("#grl-venue-editor");
    if (venueForm) {
      fillVenueEditor(venueForm, state);
      venueForm.elements.venueId.addEventListener("change", () =>
        fillVenueEditor(venueForm, state),
      );
      venueForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const status = venueForm.querySelector("#grl-venue-status");
        const latest = loadState();
        if (latest.revision !== state.revision) {
          status.textContent =
            "The preview changed in another tab. Reload the GRL Desk before saving this venue.";
          status.dataset.tone = "warning";
          return;
        }
        const item = getVenue(latest, venueForm.elements.venueId.value);
        if (!item) {
          status.textContent =
            "This venue is no longer in the current preview. Reload the GRL Desk.";
          status.dataset.tone = "warning";
          return;
        }
        const requiredValues = [
          "name",
          "address",
          "description",
          "context",
        ].map((field) => venueForm.elements[field].value.trim());
        if (requiredValues.some((value) => !value)) {
          status.textContent =
            "Complete every venue field with more than whitespace.";
          status.dataset.tone = "warning";
          return;
        }
        ["name", "address", "description", "context"].forEach((field) => {
          item[field] = venueForm.elements[field].value.trim();
        });
        const url = safeURL(venueForm.elements.url.value.trim());
        if (!url) {
          status.textContent = "Enter an http or https official-site URL.";
          status.dataset.tone = "warning";
          return;
        }
        item.url = url;
        item.updatedAt = new Date().toISOString();
        const saved = saveState(latest, latest.revision);
        if (!saved.ok) {
          status.textContent =
            saved.reason === "stale"
              ? "The preview changed in another tab while you were saving. Reload the GRL Desk and try again."
              : "This browser blocked local storage, so the venue edit will not survive a reload.";
          status.dataset.tone = "warning";
          return;
        }
        Object.assign(state, clone(latest));
        status.textContent =
          "Saved. The directory, venue profile and every related show now use this venue record.";
        status.dataset.tone = "success";
      });
    }
  }

  function announce(message) {
    const target = document.querySelector("#site-announcer");
    if (target) target.textContent = message;
  }

  function notFoundView(title, copy, href, label) {
    return `<section class="grl-page"><div class="grl-empty grl-empty--page"><h1>${escapeHTML(title)}</h1><p>${escapeHTML(copy)}</p><a class="grl-button" href="${escapeHTML(href)}">${escapeHTML(label)}</a></div></section>`;
  }

  function render(route, id) {
    if (!handledRoutes.has(route)) return false;
    const main = document.querySelector("#main");
    if (!main) return false;
    const state = loadState();
    const decodedId = id ? decodeURIComponent(id) : "";
    if (route === "guide") main.innerHTML = guideView(state);
    if (route === "venues") main.innerHTML = venuesView(state);
    if (route === "venue") main.innerHTML = venueView(state, decodedId);
    if (route === "show") main.innerHTML = showView(state, decodedId);
    if (route === "submit") main.innerHTML = submitView(state);
    if (route === "desk") main.innerHTML = deskView(state);
    if (route === "guide") bindGuide(state);
    if (route === "submit") bindSubmit(state);
    if (route === "desk") bindDesk(state);
    document.title = `${main.querySelector("h1")?.textContent || "Grapevine Rocks Live"} | GRL Concept`;
    const heading = main.querySelector("h1");
    if (heading) heading.tabIndex = -1;
    heading?.focus({ preventScroll: true });
    return true;
  }

  window.addEventListener?.("storage", (event) => {
    if (event.key !== STORAGE_KEY || typeof location === "undefined") return;
    const route = location.hash.slice(1).split("/")[0];
    if (!["desk", "submit"].includes(route)) return;
    const status =
      document.querySelector("#grl-event-status") ||
      document.querySelector("#grl-venue-status") ||
      document.querySelector("#grl-submit-status");
    if (status) {
      status.textContent =
        "This preview changed in another tab. Reload this page before editing existing records. A new submission will merge with the latest queue.";
      status.dataset.tone = "warning";
    }
    announce("The browser-local preview changed in another tab.");
  });

  window.GRLGuide = Object.freeze({
    dataVersion: DATA_VERSION,
    render,
    homeRows,
    handles: (route) => handledRoutes.has(route),
    getShows: () => clone(approvedEvents(loadState())),
    getVenues: () => clone(loadState().venues),
    resetPreview: () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
      } catch (error) {
        return false;
      }
    },
  });
})();
