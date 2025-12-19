// Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
//

// https://stackoverflow.com/a/49236251
function copy_license_text() {
    var copyText = document.getElementById("license_text");
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
  }


function showContent(evt, block) {
  // Declare all variables
  let i, tabcontent, tablinks;

  // Get all elements with class="blocks" and hide them
  blocks = document.getElementsByClassName("block");
  for (i = 0; i < blocks.length; i++) {
    blocks[i].style.display = "none";
  }

  // Get all elements with class="menuitem" and remove the class "active"
  menuitems = document.getElementsByClassName("menuitem");
  for (i = 0; i < menuitems.length; i++) {
    menuitems[i].className = menuitems[i].className.replace(" active", "");
  }

  // Show the current menu, and add an "active" class to the link that opened the tab
  document.getElementById(block).style.display = "block";
  evt.currentTarget.className += " active";
}

// For the license detail page, Get the element with id="defaultOpen" and click on it
if (document.getElementById("defaultOpen")) {
    document.getElementById("defaultOpen").click();
}
