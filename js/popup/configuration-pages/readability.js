/**
 *
 * Discogs Enhancer
 *
 * @author: Matthew Salcido
 * @website: http://www.msalcido.com
 * @github: https://github.com/salcido
 *
 */

document.addEventListener('DOMContentLoaded', async () => {

  let { featureData } = await chrome.storage.sync.get(['featureData']),
      initialConfig = featureData.readability,
      nth = document.getElementById('nth'),
      otherMedia = document.getElementById('toggleOtherMedia'),
      otherThreshold = document.getElementById('otherMediaThreshold'),
      size = document.getElementById('size'),
      vc = document.getElementById('toggleVCreleases'),
      vcThreshold = document.getElementById('vcThreshold');

  // ========================================================
  // Functions
  // ========================================================

  /**
   * Appends options to select elements
   *
   * @method   addOptions
   * @param    {object}   targetId
   * @param    {number}   total
   * @return   {object}
   */
  function addOptions(targetId, total) {

    let fragment = document.createDocumentFragment();

    for (let i = 1; i <= total; i++) {

      let option = document.createElement('option');

      option.text = i;
      option.value = i;
      fragment.appendChild(option);
    }

    return targetId.appendChild(fragment.cloneNode(true));
  }

  // ========================================================
  // DOM setup
  // ========================================================

  // Set values based on config
  vc.checked = initialConfig.vcReadability;
  otherMedia.checked = initialConfig.otherMediaReadability;
  size.value = initialConfig.size;

  addOptions(vcThreshold, 30);
  vcThreshold.value = initialConfig.vcThreshold;

  addOptions(otherThreshold, 30);
  otherThreshold.value = initialConfig.otherMediaThreshold;

  addOptions(nth, 30);
  nth.value = initialConfig.nth;

  // ==============================================
  // UI functionality
  // ==============================================

  // Vinyl, cassette, box sets, etc ...

  document.getElementById('toggleVCreleases').addEventListener('click', function(event) {

    chrome.storage.sync.get(['featureData']).then(({ featureData }) => {
      featureData.readability.vcReadability = event.target.checked;
      chrome.storage.sync.set({ featureData });
    })
  });

  // Single CD, digital, etc ...
  document.getElementById('toggleOtherMedia').addEventListener('click', function(event) {

    chrome.storage.sync.get(['featureData']).then(({ featureData }) => {
      featureData.readability.otherMediaReadability = event.target.checked;
      chrome.storage.sync.set({ featureData });
    })
  });

  // Value changes
  [...document.getElementsByTagName('select')].forEach(function(select) {

    select.addEventListener('change', function(event) {

      chrome.storage.sync.get(['featureData']).then(({ featureData }) => {
        featureData.readability[event.target.id] = JSON.parse(event.target.value);
        chrome.storage.sync.set({ featureData });
      })
    });
  });
});
