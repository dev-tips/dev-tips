<?php template('header') ?>
<?php use Pronto\GlobalContainer ?>
<?php $cache = GlobalContainer::get('page') ?>
<?php foreach($pages->visible()->flip() as $page): ?>
<?php GlobalContainer::set('page', $page) ?>
<?php if ($page->template() === 'question'): ?>
<article itemscope itemtype="http://schema.org/BlogPosting" class="question">
    <div class="center">
        <h2 itemprop="name"><a href="<?php echo $page->url() ?>"><?php html($page->title()) ?></a></h2>
        <div class="asker">
            <?php text($page->asker()) ?>
        </div>
        <div itemprop="articleBody" class="answer">
            <?php text($page->answer()) ?>
        </div>
        <a href="<?php echo $page->url() ?>" class="permalink"><time datetime="<?php echo date('c', $page->date()) ?>" itemprop="datePublished"><?php echo date('M j', $page->date()) ?><span><?php echo date('S', $page->date()) ?></span> <?php echo date('Y', $page->date()) ?></time></a>
    </div>
</article>
<?php else: ?>
<article itemscope itemtype="http://schema.org/BlogPosting" class="post">
    <div class="center">
        <h2 itemprop="name"><a href="<?php echo $page->url() ?>"><?php html($page->title()) ?></a></h2>
        <div itemprop="articleBody">
            <?php text($page->text()) ?>
        </div>
        <a href="<?php echo $page->url() ?>" class="permalink"><time datetime="<?php echo date('c', $page->date()) ?>" itemprop="datePublished"><?php echo date('M j', $page->date()) ?><span><?php echo date('S', $page->date()) ?></span> <?php echo date('Y', $page->date()) ?></time></a>
    </div>
</article>
<?php endif ?>
<?php endforeach ?>
<?php GlobalContainer::set('page', $cache) ?>
<?php template('footer') ?>
