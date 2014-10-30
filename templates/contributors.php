<?php template('header') ?>
<section>
    <div class="center">
        <?php text($page->preamble()) ?>
        <div id="contributors">
        <?php
        $contributors = array();
        foreach($pages->visible() as $post) {
            if ($post->contributors()) {
                foreach (explode(',', $post->contributors()) as $contributor) {
                    $contributors[] = trim($contributor);
                }
            }
        }
        $contributors = array_unique($contributors);
        sort($contributors);
        ?>
        <?php foreach($contributors as $contributor): ?>
            <div class="contributor">
                <img src="https://avatars.githubusercontent.com/<?php echo $contributor ?>" alt="">
                <h2><?php echo $contributor ?></h2>
                <a href="https://github.com/<?php echo $contributor ?>" target="_blank">@<?php echo $contributor ?> on GitHub</a>
            </div>
        <?php endforeach ?>
        </div>
        <?php text($page->epilogue()) ?>
    </div>
</section>
<?php template('footer') ?>
