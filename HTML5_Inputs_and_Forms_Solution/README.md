# HTML5 Inputs & Forms + Media Queries — Assessment Solution

## Files
- `index.html`, `css/style.css`, `js/script.js`
  Completed HTML5 Input Forms Demo (Name/URL/Number/Search/Datetime/Range/Color/Month/Week/
  Datalist/Multiple-file from class) **plus** the 4 required Use Cases, each validated on the
  `input` event using `addEventListener` (no inline `onclick`/`onchange` attributes):

  | Use Case | Field       | Rule                                                             |
  |----------|-------------|-------------------------------------------------------------------|
  | UC1      | First Name  | Starts with a capital letter, minimum 3 characters                |
  | UC2      | Email       | `abc.xyz@bl.co.in` — 3 mandatory parts (abc, bl, co) + 2 optional (xyz, in) with precise `@` and `.` positions |
  | UC3      | Mobile      | Country code + space + 10 digit number, e.g. `91 9919819801`      |
  | UC4      | Password    | Rule1: min 8 chars · Rule2: ≥1 uppercase · Rule3: ≥1 digit · Rule4: exactly 1 special char — **all rules must pass** |

  Open `index.html` in a browser and type into each field to see live validation
  (error text / rule checklist updates on every keystroke via `input` event listeners).
  Submitting re-validates all four Use Cases with a `submit` event listener.

- `media-queries/media-queries.html`, `media-queries/media-queries.css`
  Six worked examples of the **Anatomy of a Media Query** (`@media`, media type, media
  feature, operators `and`/`or`/`not`): min-width/max-width mobile-first cards, an OR
  (comma-separated) example, a NOT example, `orientation`, and `print` media type.
  Resize the browser window to see each section react.

## Note on UC numbering
The source deck's "UC 1..UC 5" labels are offset by one slide due to how the label graphic
sits at the *end* of each use-case's content block. The 4 distinct requirements actually
described (First Name, Email, Mobile, Password) are implemented above as UC1–UC4.
