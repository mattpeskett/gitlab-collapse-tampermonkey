// ==UserScript==
// @name         GitLab Collapse
// @namespace    http://muhammmada.li
// @version      0.1
// @description  collapse all gitlab files in diff view
// @author       Muhammad Ali
// @match        https://git.sauniverse.com/*/merge_requests*
// @match        https://git.sauniverse.com/*/commit*
// @grant        none
// #@require     http://code.jquery.com/jquery-latest.js
// #@require     https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js
// #@require     https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css
// #@require     easyjstree.js
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
    if (parent === undefined) {
        parent = $(".commit-stat-summary")[0];
    }

    $(buttonHtml2).appendTo(parent);
    var collapseBtn = $("#collapse-all-button");

    var first = true;
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
            if (first) {
                first = false;
                showFilenamesBox();
            }

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


    var getFilenameGrouping = function(filePaths) {
        var bucket = {};
        var roots = [];

        for (var i = 0; i < filePaths.length; i++) {
            var items = filePaths[i].split("/");

            // TODO: handle case where items.length === 1
            for (var j = 0; j < items.length - 1; j++) {
                var currentItem = items[j];
                var nextItem = items[j + 1];
                if (j === 0) {
                    roots.push(currentItem);
                }
                if (currentItem in bucket) {
                    bucket[currentItem].push(nextItem);
                } else {
                    bucket[currentItem] = [nextItem];
                }
                bucket[currentItem] = unique(bucket[currentItem].sort());
            }
        }
        roots = unique(roots.sort());
        return {"roots": roots, "bucket" : bucket};
    };

    var showFilenamesBox = function() {
        var rows = $(".file-title").find("a");
        var filenames = {};
        rows.each(function() {
            var strongEle = $(this).find("strong");
            if (strongEle.length !== 0) {
                var text = strongEle.text().trim();
                if (text !== "") {
                    var link = $(this).attr("href");
                    if (link.startsWith("#")) {
                        filenames[text] = link;
                    }
                }
            }
        });
        var keys = Object.keys(filenames);
        keys = unique(keys.sort());

        var groups = getFilenameGrouping(keys);

        var concat = function(roots, bucket) {
            var htmlBuilder = '    <ul>';
            $(roots).each(function() {
//                htmlBuilder += '      <li><a href="' + bucket[this] + '">' + this + '</a></li>';
                htmlBuilder += '      <li>' + this + '</li>';
                if (this in bucket) {
                    htmlBuilder += concat(bucket[this], bucket);
                }
            });
            htmlBuilder += '    </ul>';
            return htmlBuilder;
        };

        var files = '<div class="mr-state-widget">';
        files += '  <div class="ui list">';
        files += concat(groups.roots, groups.bucket);
        files += '  </div>';
        files += '</div>';

        var parent = $(".emoji-list-container")[0];
        if (parent === undefined) {
            parent = $(".commit-stat-summary")[0];
        }
        $(files).insertAfter(parent);
    };

    function unique(array){
        return array.filter(function(el, index, arr) {
            return index === arr.indexOf(el);
        });
    }

})();
