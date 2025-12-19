// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//
// This file acts as a wrapper to the Google diff_match_patch library, handling
// our calls down into that library.
var dmp = new diff_match_patch();

function getRawDiff(left, right) {
  dmp.Diff_Timeout = 5.0;
  let rawDiff = dmp.diff_main(left, right);

  return rawDiff;
}

function getFormattedDiff(diffs) {
  let html = [];
  const
    pattern_amp = /&/g,
    pattern_lt = /</g,
    pattern_gt = />/g,
    pattern_para = /\n/g;

  for (let x = 0; x < diffs.length; x++) {
    let op = diffs[x][0];    // Operation (insert, delete, equal)
    let data = diffs[x][1];  // Text of change.
    let text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
        .replace(pattern_gt, '&gt;').replace(pattern_para, '<br>');

    let insStyle = '"background:#73B06B; margin-left:3px; margin-right:3px;"';
    let delStyle = '"background:#E3AAB4; margin-left:3px; margin-right:3px;"';
    switch (op) {
      case DIFF_INSERT:
        html[x] = `<ins class="img-rounded" style=${insStyle}>${text}</ins>`;
        break;
      case DIFF_DELETE:
        html[x] = `<del class="img-rounded" style=${delStyle}>${text}</del>`;
        break;
      case DIFF_EQUAL:
        html[x] = `<span>${text}</span>`;
        break;
    }
  }
  return html.join('');
}

function getDiff(left, right) {
  let rawDiff = getRawDiff(left, right);
  dmp.diff_cleanupSemantic(rawDiff);
  let diff = getFormattedDiff(rawDiff);

  return diff;
}
