---
layout: post
title: PHP Autoloader
cover: gradient.png
date:   2015-06-25 12:00:00
categories:
  - php
  - code
---

## I made a php autoloader

The problem:  there were `require()` all over the place in our PHP project. Instead of managing that, and those paths incase we do any refactoring, let's autoload the classes. 

There are 2 assumptions here: 
1. There is only one class per file.
2. file names match the class name.  e.g.- Class CoolTimes{} lives in file CoolTimes.php

The autoloader has an array it's caching classes in, where the key is the class name and the value is the path. First it checks the cache array to find the path.  If it doesn't find it, then it traverses the directory looking for it. Every file that is not a match gets put into the cache until a match is found. 

```
class Autoloader {
  private $path_cache = array();
  protected $directories;
  public function loadClass ($class) {
    //All my classes and file names should match. THIS IS LAW.
    // lowercase all the things
    $lower_class = strtolower($class); //lololol
    $class_filename = $lower_class.'.php';
    $folder_root = __DIR__;
    //check if it's in the cache and the file still exists
    if (array_key_exists($lower_class, $this->path_cache) && file_exists($this->path_cache[$lower_class])) {
        require_once $this->path_cache[$lower_class];
    } else {
      $directories = new RecursiveDirectoryIterator($folder_root);
      foreach(new RecursiveIteratorIterator($directories) as $file) {
        if ($file->getExtension() !== 'php'){
          continue;
        }
        $full_path = $file->getRealPath();
        //if it's my file, then require it
        if (strtolower($file->getFilename()) == $class_filename) {
          require_once $full_path;
          $this->path_cache[$lower_class] = $full_path;
          return;
        } else {
          //if it's a php file get the class name, and if it's not in the array, cache it
          $lower_filename = strtolower($file->getBasename('.php'));
          $this->path_cache[$lower_filename] = $full_path;
        }
      }
    }
  }
  public function __construct() {
    // register it or it won't load a damn thing
    spl_autoload_register(array($this, 'loadClass'));
  }
}
$autoload = new Autoloader();

```

And that's it. 


