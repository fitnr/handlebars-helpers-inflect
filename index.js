/**
 * Handlebars Formatting and Inflection Helpers
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */

/* jshint esversion: 6, node: true */

'use strict';

var helpers = {
    /**
     * {{inflect}}
     *
     * Convert intger to an English-language ordinal.
     * @param {Number} count [description]
     * @param {String} singular [description]
     * @param {String} plural [description]
     * @param {Object} options [description]
     * @returns {String} [description]
     */
    inflect: function(count, singular, plural, options) {
        var word = count > 1 || count === 0 ? plural : singular;
        if (options.hash && options.hash.include)
            return "" + count + " " + word;
        else
            return word;
    },

    /**
     * {{ordinalize}}
     *
     * Convert intger to an English-language ordinal.
     * @param {Number} number [description]
     * @returns {String} [description]
     */
    ordinalize: function(value) {
        var normal = Math.abs(Math.round(value));
        if (Array.prototype.indexOf.call([11, 12, 13], normal % 100) >= 0) {
            return "" + value + "th";
        } else {
            switch (normal % 10) {
                case 1:
                    return "" + value + "st";
                case 2:
                    return "" + value + "nd";
                case 3:
                    return "" + value + "rd";
                default:
                    return "" + value + "th";
            }
        }
    },

    /**
     * {{addCommas}}
     *
     * Add commas to numbers
     * @param {Number} number [description]
     */
    addCommas: function(number) {
        return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    },

    /**
     * {{toAbbr}}
     *
     * Abbreviate numbers
     * @param  {Number} number [description]
     * @param  {Number} digits [description]
     * @return {String}        [description]
     */
    toAbbr: function(number, digits, opts) {
        if (typeof opts === 'undefined') {
            opts = digits;
            digits = undefined;
        }

        if (typeof digits === 'undefined')
            digits = 2;

        // @default: 2 decimal places => 100, 3 => 1000, etc.
        digits = Math.pow(10, digits);
        var abbr = ["k", "m", "b", "t"];
        var i = abbr.length - 1;
        while (i >= 0) {
            var size = Math.pow(10, (i + 1) * 3);
            if (size <= number) {
                number = Math.round(number * digits / size) / digits;
                // Special case where we round up to the next abbreviation
                if ((number === 1000) && (i < abbr.length - 1)) {
                    number = 1;
                    i++;
                }
                number += abbr[i];
                break;
            }
            i--;
        }
        return number;
    },

    toExponential: function(number, fractions, options) {
        if (typeof fractions === 'undefined') {
            fractions = 0;
        }
        return number.toExponential(fractions);
    },

    toFixed: function(number, digits, options) {
        if (typeof digits === 'undefined') {
            digits = 0;
        }
        return number.toFixed(digits);
    },

    toFloat: function(number) {
        return parseFloat(number);
    },

    toInt: function(number) {
        return parseInt(number, 10);
    },

    toPrecision: function(number, precision, opts) {
        if (typeof opts === 'undefined') {
            opts = precision;
            precision = undefined;
        }
        if (typeof precision === 'undefined') {
            precision = 1;
        }
        return number.toPrecision(precision);
    },

    /**
     * {{capitalizeFirst}}
     * Capitalize first word in a sentence
     * @param  {String} str [description]
     * @return {String}     [description]
     */
    capitalizeFirst: function(str) {
        if (str && typeof str === "string") {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    },

    /**
     * {{title}}
     * Capitalize each word in a sentence
     * @param  {String} str [description]
     * @return {String}     [description]
     */
    title: function(str) {
        if (str && typeof str === "string") {
            return str.replace(/\w\S*/g, function(word) {
                return word.charAt(0).toUpperCase() + word.substr(1);
            });
        }
    },

    /**
     * {{center}}
     * Center a string using non-breaking spaces
     * @param  {String} str    [description]
     * @param  {Number} spaces [description]
     * @return {String}        [description]
     */
    center: function(str, spaces) {
        if (str && typeof str === "string") {
            var space = '';
            var i = 0;
            while (i < spaces) {
                space += '&nbsp;';
                i++;
            }
            return "" + space + str + space;
        }
    },

    /**
     * {{dashify}}
     * Replace periods in string with hyphens.
     * @param  {String} str [description]
     * @return {String}     [description]
     */
    dashify: function(str) {
        if (str && typeof str === "string") {
            return str.split(".").join("-");
        }
    },

    /**
     * {{hyphenate}}
     * Replace spaces in string with hyphens.
     * @param  {String} str [description]
     * @return {[type]}     [description]
     */
    hyphenate: function(str) {
        if (str && typeof str === "string") {
            return str.split(" ").join("-");
        }
    },

    /**
     * {{lowercase}}
     * Make all letters in the string lowercase
     * @param  {String} str [description]
     * @return {[type]}     [description]
     */
    lowercase: function(str) {
        if (str && typeof str === "string") {
            return str.toLowerCase();
        }
    },

    /**
     * {{plusify}}
     * Replace spaces in string with pluses.
     * @author: Stephen Way <https://github.com/stephenway>
     * @param  {String} str The input string
     * @return {[type]}     Input string with spaces replaced by plus signs
     */
    plusify: function(str) {
        if (str && typeof str === "string") {
            return str.split(" ").join("+");
        }
    },

    /**
     * {{sentence}}
     * Sentence case
     * @param  {String} str [description]
     * @return {[type]}     [description]
     */
    sentence: function(str) {
        if (str && typeof str === "string") {
            return str.replace(/((?:\S[^\.\?\!]*)[\.\?\!]*)/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
    },

    /**
     * {{titleize}}
     * Title case. "This is Title Case"
     * @param  {String} str [description]
     * @return {[type]}     [description]
     */
    titleize: function(str) {
        if (str && typeof str === "string") {
            var title = str.replace(/[ \-_]+/g, ' ');
            var words = title.match(/\w+/g);
            var capitalize = function(word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            };
            return ((function() {
                var i, len, results;
                results = [];
                for (i = 0, len = words.length; i < len; i++) {
                    var word = words[i];
                    results.push(capitalize(word));
                }
                return results;
            })()).join(' ');
        }
    },

    uppercase: function(options) {
        if (options && typeof options === "string") {
            return options.toUpperCase();
        } else if (options && typeof options === "object") {
            return options.fn(this).toUpperCase();
        }
    },

    reverse: function(str) {
        if (str && typeof str === "string") {
            return str.split('').reverse().join('');
        }
    },

    /**
     * {{count}}
     * Return the number of occurrances of a string, within a string
     * @author: Jon Schlinkert <http://github.com/jonschlinkert>
     * @param  {String} str       The haystack
     * @param  {String} substring The needle
     * @return {Number}           The number of times the needle is found in the haystack.
     */
    count: function(str, substring) {
        if (str && typeof str === "string") {
            var n = 0;
            var pos = 0;
            var l = substring.length;
            while (true) {
                pos = str.indexOf(substring, pos);
                if (pos > -1) {
                    n++;
                    pos += l;
                } else {
                    break;
                }
            }
            return n;
        }
    },

    /**
     * {{replace}}
     * Replace occurrences of string "A" with string "B"
     * @author: Jon Schlinkert <http://github.com/jonschlinkert>
     * @param  {String} str [description]
     * @param  {String} a   [description]
     * @param  {String} b   [description]
     * @return {String}     [description]
     */
    replace: function(str, a, b) {
        if (str && typeof str === "string") {
            return str.split(a).join(b);
        }
    },

    /**
     * {{truncate}}
     * Truncates a string given a specified `length`,
     * providing a custom string to denote an `omission`.
     * @param  {String} str      [description]
     * @param  {[type]} length   [description]
     * @param  {[type]} omission [description]
     * @return {[type]}          [description]
     */
    truncate: function(str, limit, omission, options) {
        if (typeof options === 'undefined') {
            options = omission;
            omission = undefined;
        }
        if (typeof omission === 'undefined')
            omission = '';

        if (str.length > limit)
            return str.substring(0, limit - omission.length) + omission;
        else
            return str;
    },

    /**
     * {{startsWith}}
     * @author: Dan Fox <http://github.com/iamdanfox>
     *
     * Tests whether a string begins with the given prefix.
     * Behaves sensibly if the string is null.
     * @param  {String} prefix     [description]
     * @param  {String} testString [description]
     * @param  {String} options    [description]
     * @return {String}            [description]
     *
     * @example:
     *   {{#startsWith "Goodbye" "Hello, world!"}}
     *     Whoops
     *   {{else}}
     *     Bro, do you even hello world?
     *   {{/startsWith}}
     */
    startsWith: function(prefix, str, options) {
        if (typeof str !== 'undefined' && str.indexOf(prefix) === 0) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
};

// Export helpers
module.exports.register = function(Handlebars) {
    for (var helper in helpers) {
        if (helpers.hasOwnProperty(helper)) {
            Handlebars.registerHelper(helper, helpers[helper]);
        }
    }
};