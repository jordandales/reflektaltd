# Reflekta Ltd website

Static site for [reflektaltd.co.uk](https://reflektaltd.co.uk/). GitHub Pages serves it. The `CNAME` file must stay as `reflektaltd.co.uk`.

## Before-and-after photos

There are no job photos in the site yet. Do not add stock images or pictures that are not Reflekta’s own work.

The gallery reads a list in `gallery/manifest.js`. While that list is empty, the “Our work” item stays out of the menu and footer, and the homepage shows a short note with the existing Instagram and Facebook links.

To add a pair:

1. Save the two photos in `gallery/images/`. JPG or WebP is fine. Example names: `front-windows-before.jpg` and `front-windows-after.jpg`.
2. Add an entry to the array in `gallery/manifest.js`:

```js
window.REFLEKTA_GALLERY = [
  {
    before: "/gallery/images/front-windows-before.jpg",
    after: "/gallery/images/front-windows-after.jpg",
    caption: "Front windows, Seaton Carew"
  }
];
```

`before` and `after` are required. `caption` is the line under the slider. `beforeAlt` and `afterAlt` are optional. If you leave the alt text out, the caption is used.

3. Publish the site. The homepage section, the [gallery page](/gallery.html), and the “Our work” links appear on their own once the array has at least one pair. Each pair is a slider: drag to compare before and after.

## Search Console

Canonical URLs point at `https://reflektaltd.co.uk/...`. `robots.txt` allows crawling and names `sitemap.xml`. Add the verification tag in Search Console when you are ready. It is not in the site yet.
