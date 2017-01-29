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

    var first = true;
    collapseBtn.click(function(){
        first = false;

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
            showFilenamesBox();

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


    var showFilenamesBox = function() {
        var rows = $(".file-title").find("strong");
        $(".file-title").find("strong").text();
        var filenames = [];
        rows.each(function() {
            var text = $(this).text().trim();
            if (text !== "") {
                filenames.push(text);
            }
        });
        filenames = unique(filenames.sort());

        var files = '<div class="mr-state-widget">';
        files += '  <ul>';
        $(filenames).each(function() {
            files += '    <li>' + this + '</li>';
        });
        files += '  </ul>';
        files += '</div>';
        $(files).insertAfter($(".emoji-list-container"));
    };

    function unique(array){
        return array.filter(function(el, index, arr) {
            return index === arr.indexOf(el);
        });
    }

})();