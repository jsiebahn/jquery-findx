jQuery.findX
============

A jQuery plugin to find elements relative to others with a single string.

Visit [jQuery.findX on Github](https://github.com/jsiebahn/jquery-findx) for sources and examples.


Why?
----

Of course you can do anything jQuery.findX supports with plain JavaScript when jQuery is used. So
a new Syntax would just add new complexity to basic jQuery features.

The intention is to support the advantages jQuery gives developers in a single String. The
advanced selectors may be used in Html attributes to identify relative elements without writing
JavaScript as shown in [`example.html`](example/example.html) to create generic behaviour by markup.


Usage
-----

Include `jquery.findx.js` or `jquery.findx.min.js` after [jQuery](http://jquery.com) and call
`findX('selectors')` on any jQuery element. jQuery.findX has been tested with jQuery 1.10.1 but
should work with other jQuery versions as well.


Syntax and examples
-------------------

First the drawback: Currently it is not possible to pass multiple selectors like 
`div.foo, div.bar` to jQuery.findX.

jQuery.findX is always used on at least one element and not globally. That should be 
obvious, because jQuery findX is used to find other elements relative to a given element.
Don't use `$.findX('..')`. Of course it may be used on `body`.

jQuery.findX supports these new selectors:

- Parent selector

  `<` will find the direct parent of the element. It is used without another selector.

  `$('.foo').findX('< .bar')` translates to `$('.foo').parent().find('.bar')`
  
- Parents selector
  
  `..` will find any parent in the hierarchy identified by the next selector.

  `$('.foo').findX('.. .bar')` translates to `$('.foo').parents('.bar')`

- Root selector

  `/` finds the root element. The root element may be specified as second parameter when `findX`
   is called. If not it will be the `document`.

   `$('.foo').findX('/ .bar')` translates to `$(document).find('.bar')`

   `$('.foo').findX('/ .bar', myRoot)` translates to `myRoot.find('.bar')`

- Prev selector

  `-` finds the direct previous sibling identified by the next selector.

  `$('.foo').findX('- .bar')` translates to `$('.foo').prev('.bar')`

- PrevAll selector

  `~-` finds all previous siblings identified by next selector.

  `$('.foo').findX('~- .bar')` translates to `$('.foo').prevAll('.bar')`

- Current element selector

  `.` returns the current element.

  `$('.foo').findX('.')` translates to `$('foo')`


License
-------

jQuery.findX is released under the terms of the [MIT License](LICENSE).


Authors
-------

[Jörg Siebahn](https://github.com/jsiebahn)