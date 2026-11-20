(() => {
  "use strict";
  const posts = window.GRLPostIndex;
  const esc = (s) =>
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
  const textKey = (s) =>
    s
      .trim()
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9]/g, "");
  const formatDate = (iso, monthOnly = false) =>
    new Intl.DateTimeFormat(
      "en-US",
      monthOnly
        ? { month: "long", year: "numeric" }
        : { month: "short", day: "numeric", year: "numeric" },
    ).format(new Date(iso + "T12:00:00"));
  const months = [...new Set(posts.map((p) => p[1].slice(0, 7)))];
  const curated = new Map(
    window.GRLSocial.episodes.map((e) => [
      e.url.split("/").filter(Boolean).at(-1),
      e,
    ]),
  );
  const perPage = 16;
  const render = () =>
    '<section class="pagehead lav"><div class="wrap"><p class="kicker">GRL TV · Instagram</p><h1 class="big-title">The post archive.</h1><p class="sub">Explore ' +
    posts.length +
    ' public posts from the GRL Instagram account, captured November 20, 2026.</p></div></section><div class="wrap compact"><a class="trail" href="#tv">Back to GRL TV</a><form id="archive-filter" class="archive-controls"><label>Search archive<input type="search" name="q" placeholder="Try Tolbert’s, Ashmore or Gary"></label><label>Month<select name="month"><option value="">All months</option>' +
    months
      .map(
        (m) =>
          '<option value="' +
          m +
          '">' +
          formatDate(m + "-01", true) +
          "</option>",
      )
      .join("") +
    '</select></label><label>Format<select name="format"><option value="">All formats</option><option>Video</option><option>Photo</option><option>Carousel</option></select></label><button class="btn light" type="reset">Clear filters</button></form><p class="archive-help">Search tagged locations, selected names and topics, or featured titles. A mention in a caption gives context. Each record opens the original post.</p><p class="meta" id="archive-count" aria-live="polite"></p><div id="archive-rows"></div><div class="pages"><button type="button" class="btn light" id="prev-posts">Previous</button><span id="page-of" aria-live="polite"></span><button type="button" class="btn light" id="next-posts">Next</button></div></div>';
  function bind() {
    const f = document.querySelector("#archive-filter");
    if (!f) return;
    const count = document.querySelector("#archive-count"),
      rows = document.querySelector("#archive-rows"),
      prev = document.querySelector("#prev-posts"),
      next = document.querySelector("#next-posts"),
      position = document.querySelector("#page-of");
    let page = 0;
    function draw() {
      const q = textKey(f.elements.q.value),
        month = f.elements.month.value,
        format = f.elements.format.value;
      const selected = posts.filter(
        ([code, date, kind, place, tags]) =>
          (!month || date.startsWith(month)) &&
          (!format || kind === format) &&
          (!q ||
            textKey(
              [date, kind, place, ...tags, curated.get(code)?.title || ""].join(
                " ",
              ),
            ).includes(q)),
      );
      const pages = Math.ceil(selected.length / perPage);
      page = Math.max(0, Math.min(page, pages - 1));
      const start = page * perPage,
        items = selected.slice(start, start + perPage);
      count.textContent = selected.length
        ? "Showing " +
          (start + 1) +
          "–" +
          (start + items.length) +
          " of " +
          selected.length +
          " posts"
        : "No posts match these filters.";
      rows.innerHTML =
        items
          .map(([code, date, kind, place, tags]) => {
            const e = curated.get(code),
              title =
                e?.title || (place ? kind + " · " + place : kind + " from GRL");
            return (
              '<article class="archive-item"><p class="meta">' +
              formatDate(date) +
              '</p><div><h2><a href="https://www.instagram.com/p/' +
              encodeURIComponent(code) +
              '/">' +
              esc(title) +
              "</a></h2><p>" +
              [kind, ...(e && place ? [place] : []), ...tags.slice(0, 4)]
                .map(esc)
                .join(" · ") +
              "</p></div></article>"
            );
          })
          .join("") ||
        '<p class="notice">Try another name or month, or clear the filters to return to all posts.</p>';
      prev.disabled = page === 0;
      next.disabled = page + 1 >= pages;
      position.textContent = pages
        ? "Page " + (page + 1) + " of " + pages
        : "0 pages";
    }
    f.addEventListener("submit", (e) => e.preventDefault());
    for (const evt of ["input", "change"])
      f.addEventListener(evt, () => {
        page = 0;
        draw();
      });
    f.addEventListener("reset", () => {
      setTimeout(() => {
        page = 0;
        draw();
      }, 0);
    });
    const turn = (n) => {
      page += n;
      draw();
      count.scrollIntoView({ block: "start" });
    };
    prev.addEventListener("click", () => turn(-1));
    next.addEventListener("click", () => turn(1));
    draw();
  }
  window.GRLArchive = { render, bind };
})();
