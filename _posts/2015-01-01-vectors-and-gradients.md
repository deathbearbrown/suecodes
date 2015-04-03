---
layout: post
title: Vectors and Gradients
cover: gradient.png
date:   2015-01-01 12:00:00
categories:
  - math-art
  - color
  - code
---

## Applying linear algebra to life

So, I was playing around with canvas and randomly generated colors were just not cutting it for me. I wanted a gradient maker.



Here's the problem I had:

* Arguments: color 1, color2 n(integer),
* Returns: an array(n) of colors between those provided


If you look at an rgb value like:  rgb(255,255,255) there are 3 numbers that are between 0-255 that represent how much red, blue or green value is in the color.  If you substitute x,y,z for r,g,b, wait a second, that's vector.

This is what color space looks like on a 3D axis.


![3D color](/images/3dcolor.png)

Finding the color between 2 colors is easy. You take the average each R, G, And B value.

`rgb( Math.round((color1.r + color2.r)/2), Math.round((color1.g + color2.g)/2), Math.round((color1.b + color2.b)/2))`

i.e. - rgb(0, 0, 255) [blue] and rgb(255, 0, 0) [red]  will make rgb(128, 0, 128) [ purple ]


For my function what I want is n colors between color1 and color2 aka I want linearly spaced vectors between color1 &amp; color2.

The formula for that is:

{% highlight javascript %}
function linspace(a,b,n) {
  if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
  if(n<2) { return n===1?[a]:[]; }
  var i,vectors = Array(n);
  n--;
  for(i=n;i>=0;i--) {
    vectors[i] = (i*b+(n-i)*a)/n;
  }
  return vectors;
}
{% endhighlight %}


I made this which applies the logic of the linspace function to getting rgb values:


{% highlight javascript %}
  function _convertObjToRGB (obj){
    return 'rgb('+obj.r+','+obj.g+','+obj.b+')';
  }

  function _convertRGBtoObj (color){
    var digits = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return {
      r: parseInt(digits[1]),
      g: parseInt(digits[2]),
      b: parseInt(digits[3])
    };
  }


  function Gradient (color1, color2, steps){
    var rgb1 = _convertRGBtoObj(color1);
    var rgb2 = _convertRGBtoObj(color2);
    var i, colorArray = new Array(steps);
    var n = steps || 5;
    n--;
    if (steps == 1){
      return [];
    }
    for(i=n; i>=0; i--){
      colorArray[i]= _convertObjToRGB ({
        r:Math.round((i*rgb2.r+(n-i)*rgb1.r)/n),
        g:Math.round((i*rgb2.g+(n-i)*rgb1.g)/n),
        b:Math.round((i*rgb2.b+(n-i)*rgb1.b)/n)
      });
    }
    return colorArray;
  }

{% endhighlight %}
<span class="divider-blue"></span>

Play with the code here:

<a class="jsbin-embed" href="http://jsbin.com/peraqi/7/embed?js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

And now I can get my gradient colors to make pretty things.


Next todo: calculating analogous colors, complementary colors, &amp; color harmony.
