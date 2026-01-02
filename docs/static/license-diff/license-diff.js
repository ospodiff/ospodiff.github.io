// Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//
// This file handles the UI interaction for the license-diff page.

// It relies on myLicenseLookup having been filled with data by license-list.js

var base_url = '/static/license-diff';

// Put license/CLA text into a textarea
function updateText(licenseInput, textarea) {
    if(licenseInput.attr('list') == 'licenses') {
      $.getJSON(base_url + '/license-list-data-3.27.0/json/details/' + licenseInput.val() + '.json', function(license_data) {
        textarea.val(license_data['licenseText']);
      }); 
    } else
    if(licenseInput.attr('list') == 'clas') {
      $.ajax({
        url : base_url + '/clas/details/' + licenseInput.val() + '.txt',
        dataType: "text",
        success : function (data) {
          textarea.val(data);
        }
      });
    }
}

// Switch an input field between CLAs and Licenses
function switchInputTo(input, datalist) {
    $('#'+input).attr('list', datalist);
}

// By default a text input with a datalist has to be defocused to
// trigger a changed event. We cheat by checking if an spdx-id has been completed.
// If it has, we load the license text.
$('#license1').on('input', function() { 
  if(myLicenseLookup.has($('#license1').val())) {
    updateText($('#license1'), $('#licensearea1'));
  }
});
$('#license2').on('input', function() { 
  if(myLicenseLookup.has($('#license2').val())) {
    updateText($('#license2'), $('#licensearea2'));
  }
});

// Compare the two textareas and display the diff
function showDiff() {
  diff = getDiff($('#licensearea1').val(), $('#licensearea2').val());
  $('#diffArea').html(diff);
  $('#diffArea').show();
}

