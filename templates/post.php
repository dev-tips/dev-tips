<?php template('header') ?>
<article itemscope itemtype="http://schema.org/BlogPosting" class="post">
    <div class="center">
        <h2 itemprop="name"><?php html($page->title()) ?></h2>
        <div itemprop="articleBody">
            <?php text($page->text()) ?>
        </div>
        <a href="<?php echo $page->url() ?>" class="permalink"><time datetime="<?php echo date('c', $page->date()) ?>" itemprop="datePublished"><?php echo date('M j', $page->date()) ?><span><?php echo date('S', $page->date()) ?></span> <?php echo date('Y', $page->date()) ?></time></a>
    </div>
</article>
<?php template('footer') ?>
