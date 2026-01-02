// Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
//
// This file loads the license and cla lists into <datalist> tags

// SPDX ids are remembered to use as a lookup for a better experience in the spdx-id drop down
var myLicenseLookup = new Set();
var base_url = '/static/license-diff';

$(document).ready(function() {
    // Load the SPDX license drop down data
    $.getJSON(base_url + '/license-list-data-3.27.0/json/license-ids.json', function(resp) {
       licenses = resp["data"];
       licenses.sort().forEach(function(license) {
         $('#licenses').append('<option>' + license + '</option>');
         myLicenseLookup.add(license);
       });
    });

    // Load the CLA drop down data
    $.getJSON(base_url + '/clas/cla-ids.json', function(resp) {
       clas = resp["data"];
       clas.sort().forEach(function(cla) {
         $('#clas').append('<option>' + cla + '</option>');
         myLicenseLookup.add(cla);
       });
    });
});

// Check that a valid license has been entered, and then go to that url
function gotoLicense(spdxId) {
  window.location.href = base_url + '/license-list-data-3.27.0/json/details/' + spdxId + '.html';
}

// By default a text input with a datalist has to be defocused to
// trigger a changed event. We cheat by checking if an spdx-id has been completed.
// If it has, we load the license text.
$('#search-license').on('input', function() {
  if(myLicenseLookup.has($('#search-license').val())) {
    let tmp = myLicenseLookup.has($('#search-license').val())
    setTimeout(function() {
        if(tmp == myLicenseLookup.has($('#search-license').val())) {
            gotoLicense($('#search-license').val());
	}
    }, 1000);
  }
});
