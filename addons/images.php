<?php

use Pronto\ShortcodeContainer;
use Pronto\ConfigContainer;
use Pronto\GlobalContainer;
use Pronto\HelperContainer;

ShortcodeContainer::add('image', function($attributes) {
    $page = GlobalContainer::get('page');
    $image = array_shift($attributes);
    if(HelperContainer::relative($image)) {
        $image = $page->folder().$image;
    }
    $defaults = array(
        'alt' => ''
    );
    $options = array_merge($defaults, $attributes);
    $xhtml = ConfigContainer::get('xtml') ? ' /' : '';
    if(isset($options['url'])) {
        $url = $options['url'];
        if(HelperContainer::relative($url)) {
            $url = $page->folder().$url;
        }
        return '<img src="'.$image.'" alt=""'.$xhtml.'>';
    }
    return '<img src="'.$image.'" alt=""'.$xhtml.'>';
});

?>
