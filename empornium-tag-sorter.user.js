// ==UserScript==
// @name        Empornium Tag Sorter
// @description Sorts tags below titles on Browse Torrents, Top 10, Requests, Collages.
// @namespace   Empornium Scripts
// @version     2.0.0
// @author      vandenium
// @grant       none

// ---
// @include /^https://www\.empornium\.(me|sx|is)\/torrents.php/
// @include /^https://www\.empornium\.(me|sx|is)\/top10.php/
// @include /^https://www\.empornium\.(me|sx|is)\/requests.php/
// @include /^https://www\.empornium\.(me|sx|is)\/collages.php/

// ==/UserScript==

// Changelog:
// Version 2.0.0
//  - Sort tags below title names in torrents, top10, requests, collages.
// Todo:

const getAllTitles = () => {
  // torrents, top10, requests
  const titles = document.querySelectorAll('.torrent, #torrent_table tr.rowa, #torrent_table tr.rowb, #request_table tr.rowa, #request_table tr.rowb');

  // collages
  const allTitles = titles.length > 0 ? titles : document.querySelectorAll('table tr.rowa, table tr.rowb');
  return Array.from(allTitles);
}

const getAllTags = (el) => Array.from(el.querySelector('.tags').children);
const sortTags = (tagList) => tagList.sort((el1, el2) => {
  const text1 = el1.textContent;
  const text2 = el2.textContent;
  if (text1 > text2) return 1;
  if (text2 > text1) return -1;
  return 0;
});

getAllTitles().forEach(title => {
  const tagsParent = title.querySelector('.tags');
  const tags = getAllTags(title);
  tagsParent.innerHTML = '';
  sortTags(tags).forEach(tag => {
    tagsParent.appendChild(tag);
    const space = document.createElement('text');
    space.innerText = ' ';
    tagsParent.appendChild(space);
  })
});
