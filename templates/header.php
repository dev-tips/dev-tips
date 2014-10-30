<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
        <?php if($page->template() == 'post'): ?>
        <meta name="description" content="<?php
        $text = get_text($page->text());
        $text = strip_tags($text);
        $text = htmlspecialchars_decode($text);
        $text = preg_replace('/\r|\n/', ' ', $text);
        $text = preg_replace('/\s+/', ' ', $text);
        if(mb_strlen($text) > 300) {
            $text = trim(mb_substr($text, 0, 300)).'…';
        }
        $text = get_html($text);
        $text = trim($text);
        echo $text;
        ?>">
        <?php else: ?>
        <meta name="description" content="JS-Tricks.com provides tips, tricks, and techniques on JavaScript running on node.js and the browser in the form of snippets and tutorials.">
        <?php endif ?>
        <?php if($page->template() == 'home'): ?>
        <title>JS-Tricks.com</title>
        <?php else: ?>
        <title><?php html($page->title()) ?></title>
        <?php endif ?>
        <link rel="shortcut icon" href="<?php url('favicon.ico') ?>">
        <?php css('css/style.css') ?>
        <link rel="image_src" href="<?php url('img/share.png') ?>">
    </head>
    <body>
        <header>
            <div class="center">
                <h1><a href="<?php url() ?>" id="logo">JS-Tricks.com</a></h1>
            </div>
        </header>
