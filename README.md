# Work Email Domain Blocker for Webflow

Client-side script to block submissions from free, disposable, and consumer email providers on Webflow native forms.

## What it does

- Blocks over 100 known free/public email domains
- Shows an inline error message under the email field
- Works with Webflow’s native form submission
- Clears the error automatically as the user edits the email

Examples:

- `user@gmail.com` → blocked  
- `user@mail.gmail.com` → blocked  
- `user@company.com` → allowed  (Although, there are so many free email providers, i only added about 100)

## How it works

- Uses a JavaScript `Set` for fast domain lookups
- Intercepts the `submit` event in capture phase
- Calls:
  - `preventDefault()` to stop submission
  - `stopImmediatePropagation()` to prevent Webflow’s handler from running
- Supports subdomains by progressively stripping leftmost labels from the domain

## Installation (Webflow)

1. Go to **Site Settings → Custom Code → Footer Code**  
   or **Page Settings → Footer Code**
2. Paste the script into the Footer section
3. Publish the site

It will not work in Designer preview. You must publish to test.

## Why Footer placement

- Ensures all forms exist in the DOM
- Avoids race conditions with Webflow’s form initialisation
- Does not require `Webflow.push(...)`

## Performance notes

- Exact domain matches use fast `Set.has()` lookup
- Subdomain handling loops only through domain labels, not the entire blocklist
- No full blocklist scan occurs per submission

## Limitations

- This is client-side only
- Users can bypass via DevTools, or by disabling JavaScript


## Customisation

### Restrict to specific forms only

Instead of targeting all forms:

    e.target.querySelector('input[type="email"]')

You can scope to a specific form:

    document.querySelector('form[data-work-email-only]')
