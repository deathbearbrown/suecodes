---
layout: post
title: Color Palettes
cover: gradient.png
date:   2015-04-24 12:00:00
categories:
  - math-art
  - color
  - code
---

## Chosing Color Palettes

I'm currently taking a real media painting class, and color palettes are a recent topic that we've started to cover. This current painting we are trying to use a Split-complimentary palette:  yellow, ultramarine blue, and carbazoa violet. Any colors used in this painting will be either a mixture of those colors, or the pigment applied straight from the tube.

Real media color palettes are in the RYB color space. Computers use RGB, which is more mathematically sound, but less pleasing to the human eye. Also, unlike RGB, RYB is a subtractive color model, which means if I mix all these colors together, I will get a muddy brown black. From Wikipedia:
> Subtractive color systems start with light, presumably white light. Colored inks, paints, or filters between the viewer and the light source or reflective surface subtract wavelengths from the light, giving it color. If the incident light is other than white, our visual mechanisms are able to compensate well, but not perfectly, often giving a flawed impression of the "true" color of the surface.



## How do we perceive colors?

When picking out a color palette, it's helpful to know how a little about how human vision works. I found the following information in a paper by Achim Zeileis and Kurt Hornik and Paul Murrell called [Escaping RGBland: Selecting Colors for Statistical Graphics](http://epub.wu.ac.at/1692/1/document.pdf):

> It has been hypothesized that the human eye evolved in three distinct stages: 
	<ol>
	 <li>perception of light/dark contrasts (monochrome only)</li>li>
	 <li>yellow/blue contrasts (usually associated with our notion of warm/cold colors)</li> 
	 <li>green/red contrasts (helpful for assessing the ripeness of fruit)</li>
	</ol>


My teacher commented in class yesterday when handing out photos of forsythia "the yellows are all different because the computer never gets the yellow right." I haven't found a paper that outright says this, but the reason humans find the RYB color space more appealing may be due to how we evolved in particular to how we see warm and cold colors. Math (computers) doesn't have to care about that. 


The dimensions people precieve and describe color can be categorized in 3 ways:
<ul>
	<li>hue (dominant wavelength)</li>
	<li>chroma (colorfulness, intensity of color as compared to gray)</li>
	<li>luminance / lightness (brightness, amount of gray)</li>
</ul>


<a class="jsbin-embed" href="http://jsbin.com/qileju/42/embed?js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>


http://vis.computer.org/vis2004/DVD/infovis/papers/gossett.pdf

http://www.tigercolor.com/color-lab/color-theory/color-theory-intro.htm
http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3929610/

http://www.easyrgb.com/index.php?X=WEEL

http://www.huevaluechroma.com/081.php

