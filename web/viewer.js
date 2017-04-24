/* Copyright 2016 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* globals chrome */

'use strict';

var DEFAULT_URL = null;

if (typeof PDFJSDev !== 'undefined' && PDFJSDev.test('CHROME')) {
  (function rewriteUrlClosure() {
    // Run this code outside DOMContentLoaded to make sure that the URL
    // is rewritten as soon as possible.
    var queryString = document.location.search.slice(1);
    var m = /(^|&)file=([^&]*)/.exec(queryString);
    DEFAULT_URL = m ? decodeURIComponent(m[2]) : '';

    // Example: chrome-extension://.../http://example.com/file.pdf
    var humanReadableUrl = '/' + DEFAULT_URL + location.hash;
    history.replaceState(history.state, '', humanReadableUrl);
    if (top === window) {
      chrome.runtime.sendMessage('showPageAction');
    }
  })();
}

var pdfjsWebApp;
if (typeof PDFJSDev !== 'undefined' && PDFJSDev.test('PRODUCTION')) {
  pdfjsWebApp = require('./app.js');
}

if (typeof PDFJSDev !== 'undefined' && PDFJSDev.test('FIREFOX || MOZCENTRAL')) {
  // FIXME the l10n.js file in the Firefox extension needs global FirefoxCom.
  window.FirefoxCom = require('./firefoxcom.js').FirefoxCom;
  require('./firefox_print_service.js');
}
if (typeof PDFJSDev !== 'undefined' && PDFJSDev.test('CHROME')) {
  require('./chromecom.js');
}
if (typeof PDFJSDev !== 'undefined' && PDFJSDev.test('CHROME || GENERIC')) {
  require('./pdf_print_service.js');
}

	function completeViewerConfiguration(configuration) {
	  var prefix = prefix || '';

	  function defaultToTag(value, defaultTag) {
	    return value || document.createElement(defaultTag || "div");
	  }

	  function defaultToTag_withChild(value) {
	    if (value) {
	      return value;
	    }

	    var div = document.createElement("div");
	    div.appendChild(document.createElement("div"));
	    return div;
	  }

	  function defaultToTag_withParent(value) {
		if (value) {
		  return value;
		}
		
	    var div = document.createElement("div");
	    var child = document.createElement("div");
	    div.appendChild(child);
	    return child;
	  }

	 return {
	  appContainer: configuration.appContainer,
	  mainContainer: defaultToTag(configuration.mainContainer),
	  viewerContainer: defaultToTag(configuration.viewerContainer),
	  eventBus: configuration.eventBus,
	  toolbar: {
	   container:defaultToTag(configuration.toolbar.container),
	   numPages: defaultToTag(configuration.toolbar.numPages),
	   pageNumber: defaultToTag(configuration.toolbar.pageNumber),
	   scaleSelectContainer: defaultToTag(configuration.toolbar.scaleSelectContainer),
	   scaleSelect: defaultToTag(configuration.toolbar.scaleSelect, 'select'),
	   customScaleOption: defaultToTag(configuration.toolbar.customScaleOption),
	   previous: defaultToTag(configuration.toolbar.previous),
	   next: defaultToTag(configuration.toolbar.next),
	   zoomIn: defaultToTag(configuration.toolbar.zoomIn),
	   zoomOut: defaultToTag(configuration.toolbar.zoomOut),
	   viewFind: defaultToTag(configuration.toolbar.viewFind),
	   openFile: defaultToTag(configuration.toolbar.openFile),
	   print: defaultToTag(configuration.toolbar.print),
	   presentationModeButton: defaultToTag(configuration.toolbar.presentationModeButton),
	   download: defaultToTag(configuration.toolbar.download),
	   viewBookmark: defaultToTag(configuration.toolbar.viewBookmark)
	  },
	  secondaryToolbar: {
	   toolbar: defaultToTag(configuration.secondaryToolbar.toolbar),
	   toggleButton:  defaultToTag(configuration.secondaryToolbar.toggleButton), //taka ta sipka uplne napravo co otvara dropdown menu
	   toolbarButtonContainer:  defaultToTag(configuration.secondaryToolbar.secondaryToolbarButtonContainer),
	   presentationModeButton:  defaultToTag(configuration.secondaryToolbar.presentationModeButton),
	   openFileButton:  defaultToTag(configuration.secondaryToolbar.openFileButton),
	   printButton:  defaultToTag(configuration.secondaryToolbar.printButton),
	   downloadButton:  defaultToTag(configuration.secondaryToolbar.downloadButton),
	   viewBookmarkButton:  defaultToTag(configuration.secondaryToolbar.viewBookmarkButton),
	   firstPageButton: defaultToTag(configuration.secondaryToolbar.firstPageButton),
	   lastPageButton: defaultToTag(configuration.secondaryToolbar.lastPageButton),
	   pageRotateCwButton: defaultToTag(configuration.secondaryToolbar.pageRotateCwButton),
	   pageRotateCcwButton: defaultToTag(configuration.secondaryToolbar.pageRotateCcwButton),
	   toggleHandToolButton: defaultToTag(configuration.secondaryToolbar.toggleHandToolButton),
	   documentPropertiesButton: defaultToTag(configuration.secondaryToolbar.documentPropertiesButton)
	  },
	  fullscreen: {
	   contextFirstPage: defaultToTag(configuration.fullscreen.contextFirstPage),
	   contextLastPage: defaultToTag(configuration.fullscreen.contextLastPage),
	   contextPageRotateCw: defaultToTag(configuration.fullscreen.contextPageRotateCw),
	   contextPageRotateCcw: defaultToTag(configuration.fullscreen.contextPageRotateCcw)
	  },
	  sidebar: { // this is visible on the left if the page outline is open
	   mainContainer: defaultToTag(configuration.sidebar.mainContainer),
	   outerContainer: defaultToTag(configuration.sidebar.outerContainer),
	   toggleButton: defaultToTag(configuration.sidebar.toggleButton),
	   thumbnailButton: defaultToTag(configuration.sidebar.thumbnailButton),
	   outlineButton: defaultToTag(configuration.sidebar.outlineButton),
	   attachmentsButton: defaultToTag(configuration.sidebar.attachmentsButton),
	   thumbnailView: defaultToTag(configuration.sidebar.thumbnailView),
	   outlineView: defaultToTag(configuration.sidebar.outlineView),
	   attachmentsView: defaultToTag(configuration.sidebar.attachmentsView)
	  },
	  findBar: {
	   bar: defaultToTag_withChild(configuration.findBar.bar),
	   toggleButton: defaultToTag(configuration.findBar.toggleButton),
	   findField: defaultToTag(configuration.findBar.findField, 'input'),
	   highlightAllCheckbox: defaultToTag(configuration.findBar.highlightAllCheckbox),
	   caseSensitiveCheckbox: defaultToTag(configuration.findBar.caseSensitiveCheckbox),
	   findMsg: defaultToTag(configuration.findBar.findMsg),
	   findResultsCount: defaultToTag(configuration.findBar.findResultsCount),
	   findStatusIcon: defaultToTag(configuration.findBar.findStatusIcon),
	   findPreviousButton: defaultToTag(configuration.findBar.findPreviousButton),
	   findNextButton: defaultToTag(configuration.findBar.findNextButton)
	  },
	  passwordOverlay: {
	   overlayName: configuration.passwordOverlay.overlayName || 'passwordOverlay',
	   container: defaultToTag_withParent(configuration.passwordOverlay.container),
	   label: defaultToTag(configuration.passwordOverlay.label),
	   input: defaultToTag(configuration.passwordOverlay.input),
	   submitButton: defaultToTag(configuration.passwordOverlay.submitButton),
	   cancelButton: defaultToTag(configuration.passwordOverlay.cancelButton)
	  },
	  documentProperties: {
	   overlayName: configuration.documentProperties.overlayName || 'documentPropertiesOverlay',
	   container: defaultToTag_withParent(configuration.documentProperties.container),
	   closeButton: defaultToTag(configuration.documentProperties.closeButton),
	   fields: {
	    'fileName': defaultToTag(configuration.documentProperties.fields.fileName),
	    'fileSize': defaultToTag(configuration.documentProperties.fields.fileSize),
	    'title': defaultToTag(configuration.documentProperties.fields.title),
	    'author': defaultToTag(configuration.documentProperties.fields.author),
	    'subject': defaultToTag(configuration.documentProperties.fields.subject),
	    'keywords': defaultToTag(configuration.documentProperties.fields.keywords),
	    'creationDate': defaultToTag(configuration.documentProperties.fields.creationDate),
	    'modificationDate': defaultToTag(configuration.documentProperties.fields.modificationDate),
	    'creator': defaultToTag(configuration.documentProperties.fields.creator),
	    'producer': defaultToTag(configuration.documentProperties.fields.producer),
	    'version': defaultToTag(configuration.documentProperties.fields.version),
	    'pageCount': defaultToTag(configuration.documentProperties.fields.pageCount)
	   }
	  },
	  printing: {
        printServiceOverlay: defaultToTag_withParent(configuration.printing.printServiceOverlay),
        printCancel: defaultToTag(configuration.printing.printCancel),
      },
	  errorWrapper: {
	   container: defaultToTag(configuration.errorWrapper.container),
	   errorMessage: defaultToTag(configuration.errorWrapper.errorMessage),
	   closeButton: defaultToTag(configuration.errorWrapper.closeButton),
	   errorMoreInfo: defaultToTag(configuration.errorWrapper.errorMoreInfo),
	   moreInfoButton: defaultToTag(configuration.errorWrapper.moreInfoButton),
	   lessInfoButton: defaultToTag(configuration.errorWrapper.lessInfoButton)
	  },
	  progressBar: defaultToTag(configuration.progressBar),
	  printContainer: defaultToTag(configuration.printContainer),
	  openFileInputName: configuration.openFileInputName || 'fileInput',
	  debuggerScriptPath: configuration.debuggerScriptPath || './debugger.js',
	  defaultUrl: configuration.defaultUrl || DEFAULT_URL,
	 };
	}

function webViewerLoad(configuration) {
  var config = completeViewerConfiguration(configuration);
  pdfjsWebApp.PDFViewerApplication.run(config);

  return pdfjsWebApp;
}

exports.webViewerLoad = webViewerLoad;