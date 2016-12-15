/**
 *
 * Discogs Enhancer
 *
 * @author: Matthew Salcido
 * @url: http://www.msalcido.com
 * @github: https://github.com/salcido
 *
 */

$(document).ready(function() {

  let
      href = window.location.href,
      params = href.indexOf('?') > -1 ? href.split('?')[1].split('&') : null,
      currency,
      enabled = false,
      prefs = JSON.parse(localStorage.getItem('filterByCountry'));

  // add to window object so it can be called by other features in
  // the extension
  window.filterByCountry = function filterByCountry() {

    let listings = $('.seller_info ul li:nth-child(3)'),
        countries = listings.toArray();

    if (enabled) {

      $(countries).each(function() {

        if ( $(this).text().indexOf(prefs.country) === -1 &&
            !$(this).parent().parent().parent().hasClass('de-hide-country') ) {

          $(this).parent().parent().parent().addClass('de-hide-country');
        }
      });
    }
  };

  // Make sure the user is in the marketplace before doing all this shit
  if (href.indexOf('/sell/mywants') > -1 || href.indexOf('/sell/list') > -1) {

    // if the current url has `currency` as a query param...
    if (params) {

      // find currency query param value
      params.forEach(param => {

        if (param.indexOf('currency') > -1) {

          currency = param.split('=')[1];

          // if the user has a prefs object and the query param for currency matches
          // the value set in the extension's popup set `enabled` to `true`. This seems
          // a round about way of doing things but I did it this way so that all these
          // if-statements only have to be checked once. Afterwards, only the `enabled`
          // boolean value determins when filterByCountry() runs
          if (prefs && prefs.country && prefs.currency && currency === prefs.currency) {

            enabled = true;
          }
        }
      });
    }

    // Finally, call filterByCountry();
    window.filterByCountry();
  }
});
