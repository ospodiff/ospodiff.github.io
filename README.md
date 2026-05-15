# diff-js

The SPDX `license-list-data` version is configured in `spdx-license-list-data.json`.

Run `./scripts/fetch-spdx-license-list-data.sh` to download the configured SPDX release and extract its `json/` directory into `docs/static/license-diff/license-list-data/`.

GitHub Pages deployment runs that same fetch step in `.github/workflows/deploy.yml`, so the published site always uses the configured SPDX version without exposing the versioned directory name in the website.
