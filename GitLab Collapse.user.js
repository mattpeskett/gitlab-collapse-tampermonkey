// ==UserScript==
// @name         GitLab Collapse
// @namespace    http://muhammmada.li
// @version      0.1
// @description  collapse all gitlab files in diff view
// @author       Muhammad Ali
// @match        https://git.sauniverse.com/*/merge_requests*
// @grant        none
// #@require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';

    /*var buttonHtml = '<div id="#collapse-all-button" class="award-menu-holder">' +
                     '  <button class="btn" type="button">' +
                     '    <i class="fa fa-compress award-control-icon-normal"></i>' +
                     '    <span class="award-control-text">' +
                     '      Collapse' +
                     '    </span>' +
                     '  </button>' +
                     '</div>';*/

    var buttonHtml2 = '<i id="collapse-all-button" class="fa fa-compress award-control-icon-normal"></i>';

    var parent = $(".awards")[0];
    //var parent = $(".commit-stat-summary");

    $(buttonHtml2).appendTo(parent);
    var collapseBtn = $("#collapse-all-button");

    collapseBtn.click(function(){
        var before = "fa-compress";
        var after = "fa-expand";
        var loading = "fa-spinner";
        var collapsing = true;
        if (collapseBtn.hasClass(after)) {
            var temp = before;
            before = after;
            after = temp;
            collapsing = false;
        }

        collapseBtn.removeClass(before).addClass(loading);

        setTimeout(function() {
            var buttons = $('.diff-toggle-caret');
            buttons.each(function() {
                if(collapsing) {
                    if($(this).hasClass("fa-caret-down")) {
                        $(this).click();
                    }
                } else {
                    if($(this).hasClass("fa-caret-right")) {
                        $(this).click();
                    }
                }
            });

            collapseBtn.removeClass(loading).addClass(after);
        }, 1);

    });
})();