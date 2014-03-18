/** @license jQuery findX Plugin v0.1.0 Copyright 2014 J. Siebahn, Released under the MIT license
 *  https://github.com/jsiebahn/jquery-findx
 */
/**
 * A jQuery Plugin that extends the jquery.find by selectors to go up with parent and parents and
 * to go back with prev and prevAll.
 *
 * Requires jQuery.
 *
 * Tested with jQuery 1.10.1
 *
 * These new selectors are supported:
 *
 *   /   find from root element, should be the first selector
 *   ..  uses parents() with the next selector string to find any parent node
 *   <   uses parent()  to get the parent node
 *   -   uses prev() with the next selector string to find any previous sibling node
 *   ~-  uses prevAll() with the next selector string to find any previous sibling node
 *   .   the current element
 *
 */
(function($) {

    /**
     * Finds the elements identified by the given selector relative to the given elements.
     *
     * @param element {jQuery}
     *          the single current element from where the relative search starts
     * @param selector {string}
     *          the selector used to find elements relative to the current element
     * @param root {jQuery} optional
     *          the root element to use if the "/" selector is found. Will fall back to $(document)
     * @return the found elements
     */
    var findX = function(element, selector, root) {

        /**
         * The given selector split by space to handle the special selectors individually.
         *
         * @type {Array<string>}
         */
        var selectors = selector.split(/ +/);

        /**
         * The found elements that will be returned.
         * @type {jQuery}
         */
        var result = element;

        /**
         * The jQuery method used on the current element (result) when the next selector is not a
         * selector that identifies a method (parent, parents, next, nextAll, prev, prevAll,
         * children, find).
         *
         * @type {string} the name of the jQuery method
         */
        var nextFind = 'find';

        // execute all given selector parts
        for (var i = 0; i < selectors.length; i++) {

            /**
             * The current selector part of the selectors array.
             *
             * @type {string}
             */
            var currentSelector = selectors[i];

            if (currentSelector === '/') {
                // reset result to root element
                result = root;
                nextFind = 'find';
                continue;
            }
            if (currentSelector === '.') {
                // result we be the current result
                nextFind = 'find';
                continue;
            }
            if (currentSelector === '>') {
                // next selector will be children (jQuery default)
                nextFind = 'children';
                continue;
            }
            if (currentSelector === '<') {
                // next selector will be parent
                result = result.parent();
                nextFind = 'find';
                continue;
            }
            if (currentSelector === '..') {
                // next selector will be parents
                nextFind = 'parents';
                continue;
            }
            if (currentSelector === '+') {
                // next selector will be next (jQuery default)
                nextFind = 'next';
                continue;
            }
            if (currentSelector === '-') {
                // next selector will be prev
                nextFind = 'prev';
                continue;
            }
            if (currentSelector === '~') {
                // next selector will be nextAll (jQuery default)
                nextFind = 'nextAll';
                continue;
            }
            if (currentSelector === '~-') {
                // next selector will be prevAll
                nextFind = 'prevAll';
                continue;
            }

            // by default find something wth the next find method
            result = result[nextFind](currentSelector);
            // and reset to the default behaviour
            nextFind = 'find';

        }

        if (nextFind !== 'find') {
            result = result[nextFind]();
        }

        return result;

    };

    /**
     * Finds the elements identified by the given selector relative to current elements.
     *
     * @param selector {string}
     *          the selector used to find elements relative to the current element
     * @param root {jQuery} optional
     *          the root element to use if the "/" selector is found. Will fall back to $(document)
     * @return {jQuery} the found elements
     */
    $.fn.findX = function(selector) {

        // check for an optional given root element
        var args = Array.prototype.slice.call(arguments);
        var root;
        if (args.length > 1) {
            // set the given root element
            root = args[1];
        } else {
            // default root element is the document
            root = $(document);
        }

        // init results
        var results = $();

        // add results for each element
        this.each(function() {
            results = results.add(findX($(this), selector, root));
        });

        return results;

    };

})(jQuery);
