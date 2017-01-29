# GitLab Collapse All Button for Merge Requests

![Screenshot](https://github.com/maliKobo/gitlab-collapse-tampermonkey/raw/master/readme.png)


Add a button to GitLab merge request pages, to allow collapsing or expanding all the diffs. Works with TamperMonkey Chrome extension

Additinally shows a list of all the files in the diff (with links) when clicking on the collapse button as well.

## How to use

1. Use TamperMonkey and create a new user script (https://hibbard.eu/tampermonkey-tutorial/)
2. Put the code from https://github.com/maliKobo/gitlab-collapse-tampermonkey/blob/master/GitLab%20Collapse.user.js in to the editor for the new script
3. Modify the `// @match` line in the code to match the url to your gitlab instance
