---
layout: post
title: How I accidenatlly learned about color spaces
cover: color-spaces/complementary-colors.png
date:   2015-03-30 12:00:00
categories: math-art
---

# Originally I wanted to find a color's compliment

Here's a misguided idea I had for calculating a color's complement.

This is the formula for getting the midpoint between 2 vectors:

`M = (x1+x2/2, y1+y2/2, z1+z2/2)`

Lets say we know the midpoint because we know that we can get the center of the box by getting the midpoint between black and white, which is <span style="background-color: rgb(128, 128, 128); color:#fff; padding:5px 10px;">rgb(128, 128, 128).</span>

Lets try to get the complementary color of <span style="background-color: rgb(0, 0, 255); color:#fff; padding:5px 10px;">Blue rgb(0, 0, 255)</span>. Plug all these values into the midpoint formula:

```
(128, 128, 128) = (0+x2/2, 0+y2/2, 255+z2/2)

128 = 0+x2/2     128 = 0+y2/2      128 = 255+z2/2

(128*2)-0 = x2   (128*2)-0 = y2   (128*2)-255 = z2

(round to 255 because that's the max value you can have in rgb)

255-x1=x2        255-y1=y2         255-z1=z2
```

We have our color:

rgb(255, 255, 0); <span style="background-color: rgb(255, 255, 0); padding:10px;">And it's... yellow</span>

But.. the complement of blue is orange. That's what I learned in painting class, so this is wrong, right?

<span class="divider-sparklesStars"></span>

## RGB vs. RYB

I did some research and found that what I learned in art class was a RYB wheel, which is a subtractive color model (all colors mixed together create black).  What we have here is a RGB, an additive color model (colors added together create white).

![rgb ryb colors](/images/color-spaces/3wheels.gif)

Also according to wikipedia RYB is old school:
>RYB predates modern scientific color theory, which argues that magenta, yellow, and cyan are the best set of three colorants to combine, for the widest range of high-chroma colors.[1] Red can be produced by mixing magenta and yellow, blue can be produced by mixing cyan and magenta, and green can be produced by mixing yellow and cyan. In the RYB model, red takes the place of magenta, and blue takes the place of cyan.

But, to do the arts, I want an RYB color wheel. So how to I convert RGB to RYB?
I found this [paper](http://vis.computer.org/vis2004/DVD/infovis/papers/gossett.pdf) on the difference of color spaces, which has this rad graphic of the RYB interpolation cube.  That's what I'm going to use to convert RGB to RYB.

![rgb ryb colors](/images/color-spaces/rybcube.png)

Here are the normalized vectors for each of the corners of this color cube in RYB and RGB.

The paper also had the following formula for cubic interpolization: A + t²(3 − 2t)(B − A)
I used that formula to take a RYB value (taken from manipulating sliders) and then convert it to an RGB value that I could use in css. 

{% highlight javascript %}
//RYB interpolization cube values
// from this paper http://vis.computer.org/vis2004/DVD/infovis/papers/gossett.pdf
/*
    (x3)green +------+ black(ish) (x2)
             /|     /|     
 yellow(x3) +-+----+ |orange (x2)  
            | |    | |   
    blue(x0)| +----+-+ purple (x1)
            |/     |/    
    white   +------+ red  
    (x0)           (x1)

*/
  var ryb = {
    white: [1,1,1],
    red: [1, 0,0],
    orange: [1,0.5,0],
    yellow: [1, 1,0],
    green:[0.0, 0.66, 0.2],
    blue: [0.163, 0.373, 0.6],
    purple: [0.5, 0, 0.5],
    black: [0.2,0.094,0.0]  
  };

//this formula is from this paper  //http://vis.computer.org/vis2004/DVD/infovis/papers/gossett.pdf
//this has a bias towards A or B making a more vibrant color

  function interpolate(t, A, B){
    return A + (t * t)*(3 - (2 * t)) * (B - A);
  }

  function getR(R, Y, B) {
    var x0 = interpolate(B, ryb.white[0], ryb.blue[0]);
    var x1 = interpolate(B, ryb.red[0], ryb.purple[0]);
    var x2 = interpolate(B, ryb.orange[0], ryb.black[0]);
    var x3 = interpolate(B, ryb.yellow[0], ryb.green[0]);
    var y0 = interpolate(Y, x0, x3);
    var y1 = interpolate(Y, x1, x2);
    
    return interpolate(R, y0, y1);
  }

  function getG(R, Y, B) {
    var x0 = interpolate(B, ryb.white[1], ryb.blue[1]);
    var x1 = interpolate(B, ryb.red[1], ryb.purple[1]);
    var x2 = interpolate(B, ryb.orange[1], ryb.black[1]);
    var x3 = interpolate(B, ryb.yellow[1], ryb.green[1]);
    var y0 = interpolate(Y, x0, x3);
    var y1 = interpolate(Y, x1, x2);

    return interpolate(R, y0, y1);
  }

  function getB(R, Y, B) {
   
    var x0 = interpolate(B, ryb.white[2], ryb.blue[2]);
    var x1 = interpolate(B, ryb.red[2], ryb.purple[2]);
    var x2 = interpolate(B, ryb.orange[2], ryb.black[2]);
    var x3 = interpolate(B, ryb.yellow[2], ryb.green[2]);
    var y0 = interpolate(Y, x0, x3);
    var y1 = interpolate(Y, x1, x2);

    return interpolate(R, y0, y1);
  }

  function ryb2rgb(color) {

    var R = color[0] / 255;
    var Y = color[1] / 255;
    var B = color[2] / 255;
    
    var newR = getR(R,Y,B);
    var newG = getG(R,Y,B);
    var newB = getB(R,Y,B);
    
    return [
      Math.ceil(newR * 255),
      Math.ceil(newG * 255),
      Math.ceil(newB * 255)
    ];
  }

  function getRGB(colorArray){
    return "rgb("+colorArray[0]+","+colorArray[1]+","+colorArray[2]+")";   
  }

{% endhighlight %}

See example below:

<a class="jsbin-embed" href="http://jsbin.com/qileju/10/embed?js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>


The colors are kind of muddy compared to the RGB color space, but not bad. I think they are less harsh. 

<table>
  <thead>
    <tr>
      <td>
        Color
      </td>
      <td>
        RGB
      </td>
      <td>
        RYB
      </td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        White
      </td>
      <td style="background-color:rgb(255,255,255)">
        
      </td>
      <td style="background-color:rgb(255,255,255)">
     
      </td>
    </tr>
    <tr>
      <td>
        Red
      </td>
      <td style="background-color: rgb(255, 0, 0)">
        
      </td>
      <td style="background-color: rgb(255, 0, 0);">
        
      </td>
    </tr>
    <tr>
      <td>
        Orange
      </td>
      <td style="background-color: rgb(255, 102, 0)">
        
      </td>
      <td style="background: rgb(255, 128, 0);">
        
      </td>
    </tr>

    <tr>
      <td>
        Yellow
      </td>
      <td style="background-color: rgb(255,255,0)">
        
      </td>
      <td style="background-color: rgb(255, 255, 0)">
       
      </td>
    </tr>
    <tr>
      <td>
        Green
      </td>
      <td style="background-color: rgb(0, 255, 0)">
       
      </td>
      <td style="background-color: rgb(0, 169, 51);">
        
      </td>
    </tr>

    <tr>
      <td>
       Blue
      </td>
      <td style="background-color: rgb(0, 0, 255)">
      </td>
      <td style="background-color: rgb(42, 96, 153)">
      </td>
    </tr>

    <tr>
      <td>
        Purple
      </td>
      <td style="background-color: rgb(128,0,128)">
        
      </td>
      <td style="background-color: rgb(128, 1, 128);">
     
      </td>
    </tr>

    <tr>
      <td>
        Black (brown?)
      </td>
      <td style="background-color: rgb(0, 0, 0)">
        
      </td>
      <td style="background-color:rgb(51, 25, 1);">
        
      </td>
    </tr>
  </tbody>
</table>
<br>

## RYB and the color Black

I should probably note that there is no true black in RYB. It's more of a brown color. The reason for it is that RYB is an subtractive color model, so to create black you have to mix all the colors together.

Often art teachers won't let you buy black paint. You have to mix your own. Below is a color mixing table I made for a Watercolor pallette that had no black. Burnt Sienna + Ultramarine Blue make a pretty decent black.

![watercolor table](/images/color-spaces/color-table.jpg)


If you're into modern art, you might have heard of the artist Rothko, who has a series of giant black canvases. That sounds dumb right? I've seen these in person and they are overwhelming. Each canvas is a slightly different black, warm or cool. 

![rothko](/images/color-spaces/rothko-chapel.jpg)


Next I'll write something about calculating real compliments and other color harmonies. 

<span class="divider-sparkles"></span>
