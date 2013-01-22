# jQuery.inlinesearch.js

## Instructions
1. Have some data worth having searchable -- a list or a table is best.
2. Create a "searching context" with $(".list-parent").inlinesearch("create", settings);. See below for what settings should be.
3. You're pretty much done. Search will work magically. It's all about getting settings correct.

## Parameters

The settings here are super important. Here are the options, along with their defaults.

```javascript
icon: false, // set this to $("<div>").attr( {"class":"icon-search","type":"text"} ) in order to integrate a Bootstrap search
form: $("<form>").attr( {"class":"inline-filter","action":"#"} ), // required, the search form
input: $("<input>").attr( {"class":"inline-search","type":"text"} ), // required, the input box 
header: false,	// optional location (prepended) to embed the form stuff -- if left out, will be embedded before the list
list: false,	// non-optional, the list to be filtered, if it is not specified, assumed from selector
searchPath: ['tr>td'], // an array of paths (from the list) to use as "potential matches", see the StackOverflow example before
matchElement: 'tr' // the parent element to hide/display on (probably a parent of searchPath)
```

## Screenshot
![Example](http://i.imgur.com/BUMNgQG.png)

Here I have run the following on a Stackoverflow listings page to put a search box (and searched for IE, hiding all non-IE related listings) on the sidebar related list:

$(".related").inlineSearch("create", {
	header:$('#h-related'), 		// use the header (prepended, it would look better if it was appended or styled here)
	searchPath:['div.spacer>a'], 	// the elements we want to match are in the .related list inside a div and an immediate anchor
	matchElement:'div.spacer'		// the parent we want to match/hide/display is the div.spacer
});

## Known Issues
* We only support one-layer of search path hide/show at the moment. This is a gotcha likely to catch many people. This means its good for hiding rows in tables, but not anything deeper (say tables in tables, or really any more structure than one deep)... around lines 55 and 56, I invite pull requests that fix this.
* Searches way too frequently -- on key down fires fast. This makes it slow. Should wait till user has stopped typing for a second.

## License 

Please retain this notice in ALL redistributions as well as a link back to the original repository.

Copyright 2013 Giuseppe Burtini      https://github.com/gburtini

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this library except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
