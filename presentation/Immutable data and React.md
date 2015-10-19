title: Immutable data and React
author: Babis Karypidis (xabikos)
description: An introduction on immutable data structures in JavaScript and how we can use these in React
date: <%= Date.today %>
% available themes: Default - Sky - Beige - Simple - Serif - Night - Moon - Solarized
theme: simple
% available transitions: // default/cube/page/concave/zoom/linear/fade/none
transition: linear
custom_css: presentation
% code-engine: coderay


!SLIDE
## Immutable data and React
<p>&nbsp;</p>
<p>&nbsp;</p>
An introduction to immutable data structures in JavaScript and their usage in React
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<a href="http://www.meetup.com/ReactJS-Belgium/">Brussels Reactjs meetup </a> 
<p>&nbsp;</p>
<a href="https://philos.io">Philos.io</a>

!SLIDE
## Who am I?
<p>&nbsp;</p>
<h3>
  Babis Karypidis (<strong>xabikos</strong>)
</h3>
<p>&nbsp;</p>
<p>
  Software Engineer
</p>
<p>&nbsp;</p>
<p>
  Freelance JavaSript and React developer for European Commission 
</p>
<p>&nbsp;</p>
<p>
  <a href="http://github.com/xabikos">github.com/xabikos</a>
  <br>
  <a href="http://twitter.com/xabikos">twitter.com/xabikos</a>
  <br>
  <a href="http://xabikos.com">xabikos.com</a>
</p>

!SLIDE
## Agenda

<p>&nbsp;</p>

* Immutable data structures in JavaScript
* Why to use Immutable data structures
* How can we benefit in React development

!SLIDE
## Available libraries

<p>&nbsp;</p>

* <a href="https://facebook.github.io/immutable-js/"> Immutable.js </a> by facebook 
* <a href="http://swannodette.github.io/mori/"> Mori </a>
* <a href="https://github.com/rtfeldman/seamless-immutable">seamless-immutable </a>
* Probably many more that I don't know about

!SLIDE
## How it looks like - Creation

<p>&nbsp;</p>
The well known plain JS object
<% code do %>
let plainJSObject = {
  title: 'Immutablejs',
  creator: 'Facebook' 
};
<% end %>
<p>&nbsp;</p>
The equivalent immutable Map
<% code do %>
let immutalbeObject = Immutable.Map({
  title: 'Immutablejs',
  creator: 'Facebook' 
});
<% end %>

!SLIDE
## How it looks like - Mutation

<p>&nbsp;</p>
The well known plain JS object
<% code do %>
plainJSObject.title = 'another title';
plainJSObject.creator = 'another creator';
<% end %>
<p>&nbsp;</p>
The equivalent immutable Map
<% code do %>
let mutatedObject = immutableObject.set('title', 'another title');
let mutatedObjectAgain = mutatedObject.set('creator', 'antoher creator');
<% end %>

!SLIDE
## The reasons behind using Immutable data structures

<p>&nbsp;</p>

* Mutating state is evil
* Undo and redo
* No defensive copying
* Thread safety (not in JavaScript's single thread world)
* And a last one... Performance (mainly in React)

!SLIDE
## Mutating state

<p>&nbsp;</p>
The well known plain JS object
<% code do %>
plainJSObject.title = 'another title';
plainJSObject.creator = 'another creator';
<% end %>
<p>&nbsp;</p>
The equivalent immutable Map
<% code do %>
let mutatedObject = immutableObject.set('title', 'another title');
let mutatedObjectAgain = mutatedObject.set('creator', 'antoher creator');
<% end %>