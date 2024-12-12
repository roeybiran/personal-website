<?php
$id = $args['id'];
$permalink = untrailingslashit(get_the_permalink($id));
$slug = get_post_field('post_name', $id);
$store_id = get_field("store_id", $id);

$links = [
  ["", "Overview", true],
  ["/help", "Help", get_field('help', $id)],
  ["/release-notes", "Release Notes", get_field("release_notes", $id)],
  ["/privacy", "Privacy", get_field("privacy", $id)],
];

?>
<nav id="app-nav" class="app-nav">
  <div class="app-nav__main">
    <a class="app-nav-link app-nav-link--home" href="<?php echo $permalink  ?>"><?php echo get_the_title($id) ?></a>
    <span class="app-nav__section app-nav__section--buy">
      <a class="buy-button" href="<?php echo $permalink . "/download" ?>">Free Trial</a>
      <a class="buy-button" href="<?php echo $permalink . "/buy" ?>" data-js-buy="<?php echo $store_id ?>">Buy <span class="buy-button__price" data-js-price>$9.99</span></a>
    </span>
  </div>

  <span class="app-nav__section app-nav__section--help">
    <?php foreach ($links as $link): ?>
      <?php if ($link[2]): ?>
        <?php $uri = $permalink . $link[0] ?>
        <?php $is_current = str_ends_with(untrailingslashit($uri), untrailingslashit($_SERVER['REQUEST_URI'])); ?>
        <a class="app-nav-link" aria-current="<?php echo $is_current ? "page" : "false" ?>" href="<?php echo $uri ?>"><?php echo $link[1] ?></a>
      <?php endif ?>
    <?php endforeach ?>
  </span>
</nav>
