#!/usr/bin/env bash

set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "${script_dir}/.." && pwd)"
config_path="${repo_root}/spdx-license-list-data.json"
output_root="${repo_root}/docs/static/license-diff"
target_dir="${output_root}/license-list-data"
tmp_dir="$(mktemp -d)"

cleanup() {
  rm -rf "${tmp_dir}"
}

trap cleanup EXIT

version="$(
  python3 - "${config_path}" <<'PY'
import json
import sys

with open(sys.argv[1], "r", encoding="utf-8") as f:
    print(json.load(f)["version"])
PY
)"

archive_url="https://github.com/spdx/license-list-data/archive/refs/tags/v${version}.tar.gz"
archive_path="${tmp_dir}/license-list-data.tar.gz"
staging_dir="${tmp_dir}/staging"

mkdir -p "${staging_dir}"
curl --fail --location --silent --show-error "${archive_url}" --output "${archive_path}"
tar -xzf "${archive_path}" -C "${staging_dir}"

source_dir="$(find "${staging_dir}" -maxdepth 1 -mindepth 1 -type d -name 'license-list-data-*' | head -n 1)"

if [[ -z "${source_dir}" ]]; then
  echo "Unable to locate extracted SPDX license-list-data directory." >&2
  exit 1
fi

if [[ ! -d "${source_dir}/json" ]]; then
  echo "Extracted SPDX license-list-data archive does not contain a json directory." >&2
  exit 1
fi

rm -rf "${target_dir}"
mkdir -p "${target_dir}"
cp -R "${source_dir}/json" "${target_dir}/"

python3 - "${target_dir}/json/licenses.json" "${target_dir}/json/license-ids.json" <<'PY'
import json
import sys

licenses_path, output_path = sys.argv[1], sys.argv[2]

with open(licenses_path, "r", encoding="utf-8") as f:
    licenses = json.load(f)["licenses"]

with open(output_path, "w", encoding="utf-8") as f:
    json.dump({"data": [license["licenseId"] for license in licenses]}, f, indent=2)
    f.write("\n")
PY

echo "Fetched SPDX license-list-data ${version} into ${target_dir}."
